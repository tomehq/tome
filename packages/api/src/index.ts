import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./types.js";
import { auth } from "./middleware/auth.js";
import { requirePlan } from "./middleware/plan-gate.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { deploy } from "./routes/deploy.js";
import { domains } from "./routes/domains.js";
import { billing } from "./routes/billing.js";
import { webhooks } from "./routes/webhooks.js";
import { analytics } from "./routes/analytics.js";
import { authRoutes } from "./routes/auth.js";
import { isApiHost, resolveHostname, serveFromR2 } from "./serve.js";
import { siteAuth } from "./routes/site-auth.js";
import { github } from "./routes/github.js";
import { validateSessionToken } from "./password.js";

const app = new Hono<{ Bindings: Env }>();

// ── Site-serving middleware (runs before everything) ─────
// Intercepts requests to hosted sites based on the Host header.
// API hosts (*.workers.dev, localhost, api.tome.center) pass through.
// Platform hosts (www.tome.center, tome.center) proxy to origin (Vercel).
app.use("*", async (c, next) => {
  const host = c.req.header("host") ?? "";
  if (isApiHost(host)) return next();

  // Platform hostnames — proxy to origin (Vercel landing page).
  const bare = host.replace(/:\d+$/, "");
  if (bare === "www.tome.center" || bare === "tome.center") {
    return fetch(c.req.raw);
  }

  const slug = await resolveHostname(host, c.env.TOME_DB);
  if (!slug) return c.text("Site not found", 404);

  // Password protection check
  const row = await c.env.TOME_DB.prepare(
    "SELECT password_required FROM projects WHERE slug = ? LIMIT 1"
  ).bind(slug).first<{ password_required: number }>();

  if (row?.password_required === 1) {
    // Allow auth endpoints through
    if (c.req.path.startsWith("/api/sites/")) {
      return next();
    }

    // Check session cookie
    const cookieHeader = c.req.header("cookie") ?? "";
    const match = cookieHeader.match(/(?:^|;\s*)tome_site_session=([^;]*)/);
    const sessionToken = match ? match[1] : null;

    if (!sessionToken || validateSessionToken(sessionToken) !== slug) {
      return c.redirect(`/api/sites/${slug}/password`);
    }
  }

  return serveFromR2(slug, c.req.path, c.env.TOME_BUCKET);
});

// ── Analytics CORS (permissive — public endpoint, any site can send events) ──
app.use("/api/analytics/event", cors({
  origin: "*",
  allowMethods: ["POST", "OPTIONS"],
  allowHeaders: ["Content-Type"],
  maxAge: 86400,
}));

// ── Global middleware ────────────────────────────────────
app.use("*", cors({
  origin: (origin) => {
    if (!origin) return "*"; // Allow non-browser requests (CLI, cURL)
    const allowedOrigins = [
      "https://tome.center",
      "https://www.tome.center",
    ];
    const allowedPatterns = [
      /^https:\/\/.*\.tome\.center$/,
      /^https:\/\/.*\.vercel\.app$/,
      /^http:\/\/localhost(:\d+)?$/,
      /^http:\/\/127\.0\.0\.1(:\d+)?$/,
    ];
    if (allowedOrigins.includes(origin)) return origin;
    if (allowedPatterns.some((p) => p.test(origin))) return origin;
    return null as unknown as string;
  },
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "X-Deployment-Id", "X-File-Path", "X-File-Hash"],
  maxAge: 86400,
}));

// ── Health check (no auth) ───────────────────────────────
app.get("/health", (c) =>
  c.json({ status: "ok", timestamp: new Date().toISOString() })
);

// ── Public routes (no auth, with rate limiting) ─────────
app.use("/api/auth/token", rateLimit({ maxRequests: 20, windowMs: 60_000 }));
app.use("/api/auth/oauth/callback", rateLimit({ maxRequests: 20, windowMs: 60_000 }));
app.use("/api/auth/providers", rateLimit({ maxRequests: 60, windowMs: 60_000 }));
app.use("/api/analytics/event", rateLimit({ maxRequests: 100, windowMs: 60_000 }));

app.route("/api/webhooks", webhooks);

// GitHub App webhook (public, uses HMAC signature verification)
app.use("/api/github/webhook", rateLimit({ maxRequests: 100, windowMs: 60_000 }));

// Analytics: event ingestion is public, summary requires auth + Cloud plan
app.use("/api/analytics/summary", auth);
app.use("/api/analytics/summary", requirePlan("cloud"));
app.route("/api/analytics", analytics);

// ── Authenticated routes ─────────────────────────────────
// Auth middleware only on protected routes (not on /token, /providers, /oauth/callback)
app.use("/api/deploy/*", auth);
app.use("/api/domains/*", auth);
app.use("/api/billing/*", auth);
app.use("/api/auth/me", auth);
app.use("/api/github/connect", auth);
app.use("/api/github/status/*", auth);

app.route("/api/deploy", deploy);
app.route("/api/domains", domains);
app.route("/api/billing", billing);
app.route("/api/auth", authRoutes);
app.route("/api/sites", siteAuth);
app.route("/api/github", github);

// ── R2 static site serving ───────────────────────────────
// Serves deployed sites: GET /sites/{slug}/{path}
app.get("/sites/:slug/*", async (c) => {
  const slug = c.req.param("slug");
  const path = c.req.path.replace(`/sites/${slug}/`, "") || "index.html";
  return serveFromR2(slug, path, c.env.TOME_BUCKET);
});

// ── Global error handler ─────────────────────────────────
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json(
    { error: err.message || "Internal server error" },
    500
  );
});

// ── 404 fallback ─────────────────────────────────────────
app.notFound((c) =>
  c.json({ error: "Not found" }, 404)
);

export default app;
