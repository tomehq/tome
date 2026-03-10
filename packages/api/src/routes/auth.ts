import { Hono } from "hono";
import type { Env, User } from "../types.js";

const authRoutes = new Hono<{ Bindings: Env; Variables: { user: User } }>();

// ── GET /providers — list available OAuth providers ────
authRoutes.get("/providers", async (c) => {
  const providers: Array<{ id: string; name: string; authorizeUrl: string }> = [];

  // Build redirect URI from request origin, falling back to production
  const origin = c.req.header("origin") || c.req.header("referer")?.replace(/\/+$/, "") || "https://tome.center";
  const redirectUri = `${origin}/dashboard`;
  const encodedRedirect = encodeURIComponent(redirectUri);

  if (c.env.GITHUB_CLIENT_ID) {
    providers.push({
      id: "github",
      name: "GitHub",
      authorizeUrl: `https://github.com/login/oauth/authorize?client_id=${c.env.GITHUB_CLIENT_ID}&redirect_uri=${encodedRedirect}&scope=user:email&state=github`,
    });
  }

  if (c.env.GOOGLE_CLIENT_ID) {
    providers.push({
      id: "google",
      name: "Google",
      authorizeUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${c.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodedRedirect}&response_type=code&scope=email+profile&state=google`,
    });
  }

  return c.json({ providers, emailEnabled: true });
});

// ── POST /oauth/callback — exchange OAuth code for API token ────
authRoutes.post("/oauth/callback", async (c) => {
  const { provider, code, redirectUri } = await c.req.json<{
    provider: string;
    code: string;
    redirectUri: string;
  }>();

  if (!provider || !code) {
    return c.json({ error: "Missing provider or code" }, 400);
  }

  let email: string;
  let name: string | null = null;
  let avatarUrl: string | null = null;

  try {
    if (provider === "github") {
      if (!c.env.GITHUB_CLIENT_ID || !c.env.GITHUB_CLIENT_SECRET) {
        return c.json({ error: "GitHub OAuth not configured" }, 501);
      }

      // Exchange code for access token
      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: c.env.GITHUB_CLIENT_ID,
          client_secret: c.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: redirectUri,
        }),
      });
      const tokenData = await tokenRes.json() as { access_token?: string; error?: string; error_description?: string };

      if (tokenData.error || !tokenData.access_token) {
        return c.json({ error: tokenData.error_description || "GitHub auth failed" }, 400);
      }

      // Fetch user profile
      const userRes = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${tokenData.access_token}`, "User-Agent": "Tome/1.0" },
      });
      const userData = await userRes.json() as { email?: string; name?: string; login?: string; avatar_url?: string };

      // Fetch primary email if not public
      if (!userData.email) {
        const emailRes = await fetch("https://api.github.com/user/emails", {
          headers: { Authorization: `Bearer ${tokenData.access_token}`, "User-Agent": "Tome/1.0" },
        });
        const emails = await emailRes.json() as Array<{ email: string; primary: boolean; verified: boolean }>;
        const primary = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified) || emails[0];
        if (!primary) {
          return c.json({ error: "No verified email found on GitHub account" }, 400);
        }
        email = primary.email;
      } else {
        email = userData.email;
      }

      name = userData.name || userData.login || null;
      avatarUrl = userData.avatar_url || null;

    } else if (provider === "google") {
      if (!c.env.GOOGLE_CLIENT_ID || !c.env.GOOGLE_CLIENT_SECRET) {
        return c.json({ error: "Google OAuth not configured" }, 501);
      }

      // Exchange code for access token
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: c.env.GOOGLE_CLIENT_ID,
          client_secret: c.env.GOOGLE_CLIENT_SECRET,
          code,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });
      const tokenData = await tokenRes.json() as { access_token?: string; error?: string; error_description?: string };

      if (tokenData.error || !tokenData.access_token) {
        return c.json({ error: tokenData.error_description || "Google auth failed" }, 400);
      }

      // Fetch user info
      const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const userData = await userRes.json() as { email?: string; name?: string; picture?: string };

      if (!userData.email) {
        return c.json({ error: "No email found on Google account" }, 400);
      }

      email = userData.email;
      name = userData.name || null;
      avatarUrl = userData.picture || null;

    } else {
      return c.json({ error: "Unknown provider" }, 400);
    }

    // Find or create user by email
    const existingUser = await c.env.TOME_DB.prepare(
      "SELECT * FROM users WHERE email = ?"
    ).bind(email).first<User>();

    if (existingUser) {
      // Update name and avatar if missing
      const updates: string[] = [];
      const values: (string | null)[] = [];
      if (name && !existingUser.name) {
        updates.push("name = ?");
        values.push(name);
      }
      if (avatarUrl && !existingUser.avatar_url) {
        updates.push("avatar_url = ?");
        values.push(avatarUrl);
      }
      if (updates.length > 0) {
        updates.push("updated_at = datetime('now')");
        await c.env.TOME_DB.prepare(
          `UPDATE users SET ${updates.join(", ")} WHERE id = ?`
        ).bind(...values, existingUser.id).run();
      }

      return c.json({
        token: existingUser.api_token,
        userId: existingUser.id,
        email: existingUser.email,
      });
    }

    // Create new user
    const id = crypto.randomUUID();
    const token = `tome_${crypto.randomUUID().replace(/-/g, "")}`;

    await c.env.TOME_DB.prepare(
      "INSERT INTO users (id, email, name, avatar_url, api_token) VALUES (?, ?, ?, ?, ?)"
    ).bind(id, email, name, avatarUrl, token).run();

    return c.json({ token, userId: id, email });

  } catch (err) {
    console.error("OAuth callback error:", err);
    return c.json({ error: "Authentication failed" }, 500);
  }
});

// ── POST /token — validate an existing API token (CLI auth check) ────
authRoutes.post("/token", async (c) => {
  const { token } = await c.req.json<{ token?: string }>();

  if (!token) {
    return c.json({ error: "Sign in with GitHub or Google to create an account" }, 400);
  }

  // Validate an existing token (CLI uses this to verify their saved token)
  if (!token.startsWith("tome_")) {
    return c.json({ error: "Invalid token format" }, 400);
  }

  const user = await c.env.TOME_DB.prepare(
    "SELECT * FROM users WHERE api_token = ?"
  )
    .bind(token)
    .first<User>();

  if (!user) {
    return c.json({ error: "Invalid token" }, 401);
  }

  return c.json({ token: user.api_token, userId: user.id, email: user.email });
});

// ── GET /me — return current user info (requires auth) ──
authRoutes.get("/me", async (c) => {
  const user = c.get("user");

  return c.json({
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatar_url,
    plan: user.plan,
    createdAt: user.created_at,
  });
});

export { authRoutes };
