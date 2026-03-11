import { Hono } from "hono";
import type { Env, User } from "../types.js";
import { PLAN_LIMITS, PLAN_NAMES } from "../plan-limits.js";

const domains = new Hono<{ Bindings: Env; Variables: { user: User } }>();

// ── POST / — register custom domain for a project ─────
domains.post("/", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{
    domain: string;
    projectSlug: string;
  }>();

  // Normalize domain — strip protocol and trailing slashes
  const domain = (body.domain || "").replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const projectSlug = body.projectSlug;

  if (!domain || !projectSlug) {
    return c.json({ error: "Missing domain or projectSlug" }, 400);
  }

  // ── Plan enforcement: custom domain limits ──────────
  const planLimits = PLAN_LIMITS[user.plan] ?? PLAN_LIMITS.community;

  if (planLimits.customDomains === 0) {
    return c.json(
      {
        error: "Custom domains require the Cloud plan or higher",
        requiredPlan: "cloud",
        currentPlan: user.plan,
      },
      403,
    );
  }

  if (planLimits.customDomains > 0) {
    const domainCount = await c.env.TOME_DB.prepare(
      `SELECT COUNT(*) as count FROM domains d
       JOIN projects p ON d.project_id = p.id
       WHERE p.user_id = ?`
    )
      .bind(user.id)
      .first<{ count: number }>();

    if ((domainCount?.count ?? 0) >= planLimits.customDomains) {
      return c.json(
        {
          error: `Domain limit reached (${planLimits.customDomains} for ${PLAN_NAMES[user.plan] ?? user.plan} plan)`,
          limit: planLimits.customDomains,
          requiredPlan: "team",
          currentPlan: user.plan,
        },
        403,
      );
    }
  }

  // Verify project belongs to user
  const project = await c.env.TOME_DB.prepare(
    "SELECT id FROM projects WHERE slug = ? AND user_id = ?"
  )
    .bind(projectSlug, user.id)
    .first<{ id: string }>();

  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  // Check domain isn't already registered
  const existing = await c.env.TOME_DB.prepare(
    "SELECT id FROM domains WHERE domain = ?"
  )
    .bind(domain)
    .first();

  if (existing) {
    return c.json({ error: "Domain already registered" }, 409);
  }

  // Register custom hostname via Cloudflare API
  let cfHostnameId: string | null = null;
  try {
    const cfRes = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${getZoneId(c)}/custom_hostnames`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${c.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hostname: domain,
          ssl: {
            method: "http",
            type: "dv",
            settings: { min_tls_version: "1.2" },
          },
        }),
      }
    );

    if (cfRes.ok) {
      const cfData = (await cfRes.json()) as { result: { id: string } };
      cfHostnameId = cfData.result.id;
    }
  } catch {
    // Continue without CF — will be retried on verify
  }

  const domainId = crypto.randomUUID();
  await c.env.TOME_DB.prepare(
    "INSERT INTO domains (id, project_id, domain, cloudflare_hostname_id) VALUES (?, ?, ?, ?)"
  )
    .bind(domainId, project.id, domain, cfHostnameId)
    .run();

  return c.json({
    domain,
    verified: false,
    sslStatus: "pending",
    dnsRecords: [
      { type: "CNAME", name: "docs", value: `${projectSlug}.tome.center`, verified: false },
      { type: "TXT", name: "_tome-verify.docs", value: `tome-verify=${projectSlug}`, verified: false },
    ],
  });
});

// ── DELETE /:domain — remove domain ────────────────────
domains.delete("/:domain", async (c) => {
  const user = c.get("user");
  const domain = c.req.param("domain");

  const row = await c.env.TOME_DB.prepare(
    `SELECT d.id, d.cloudflare_hostname_id FROM domains d
     JOIN projects p ON d.project_id = p.id
     WHERE d.domain = ? AND p.user_id = ?`
  )
    .bind(domain, user.id)
    .first<{ id: string; cloudflare_hostname_id: string | null }>();

  if (!row) {
    return c.json({ error: "Domain not found" }, 404);
  }

  // Remove from Cloudflare if we have a hostname ID
  if (row.cloudflare_hostname_id) {
    try {
      await fetch(
        `https://api.cloudflare.com/client/v4/zones/${getZoneId(c)}/custom_hostnames/${row.cloudflare_hostname_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${c.env.CLOUDFLARE_API_TOKEN}` },
        }
      );
    } catch {
      // Best-effort cleanup
    }
  }

  await c.env.TOME_DB.prepare("DELETE FROM domains WHERE id = ?")
    .bind(row.id)
    .run();

  return c.json({ removed: true });
});

// ── GET / — list domains for authenticated user ────────
domains.get("/", async (c) => {
  const user = c.get("user");

  const { results } = await c.env.TOME_DB.prepare(
    `SELECT d.*, p.slug as project_slug FROM domains d
     JOIN projects p ON d.project_id = p.id
     WHERE p.user_id = ?`
  )
    .bind(user.id)
    .all();

  return c.json(
    (results ?? []).map((d: Record<string, unknown>) => ({
      domain: d.domain,
      verified: d.verified === 1,
      sslStatus: d.ssl_status,
      dnsRecords: [
        { type: "CNAME", name: "docs", value: `${d.project_slug}.tome.center`, verified: d.verified === 1 },
        { type: "TXT", name: "_tome-verify.docs", value: `tome-verify=${d.project_slug}`, verified: d.verified === 1 },
      ],
    }))
  );
});

// ── GET /:domain/verify — check DNS + SSL status ──────
domains.get("/:domain/verify", async (c) => {
  const user = c.get("user");
  const domain = c.req.param("domain");

  const row = await c.env.TOME_DB.prepare(
    `SELECT d.*, p.slug as project_slug FROM domains d
     JOIN projects p ON d.project_id = p.id
     WHERE d.domain = ? AND p.user_id = ?`
  )
    .bind(domain, user.id)
    .first<{
      id: string;
      domain: string;
      verified: number;
      ssl_status: string;
      cloudflare_hostname_id: string | null;
      project_slug: string;
    }>();

  if (!row) {
    return c.json({ error: "Domain not found" }, 404);
  }

  let verified = row.verified === 1;
  let sslStatus = row.ssl_status;

  // Check Cloudflare custom hostname status
  if (row.cloudflare_hostname_id) {
    try {
      const cfRes = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${getZoneId(c)}/custom_hostnames/${row.cloudflare_hostname_id}`,
        {
          headers: { Authorization: `Bearer ${c.env.CLOUDFLARE_API_TOKEN}` },
        }
      );

      if (cfRes.ok) {
        const cfData = (await cfRes.json()) as {
          result: { status: string; ssl: { status: string } };
        };
        verified = cfData.result.status === "active";
        sslStatus = cfData.result.ssl.status === "active" ? "active" : "pending";

        // Update D1 with latest status
        await c.env.TOME_DB.prepare(
          "UPDATE domains SET verified = ?, ssl_status = ?, updated_at = datetime('now') WHERE id = ?"
        )
          .bind(verified ? 1 : 0, sslStatus, row.id)
          .run();
      }
    } catch {
      // Fall through with cached status
    }
  }

  return c.json({
    domain: row.domain,
    verified,
    sslStatus,
    dnsRecords: [
      { type: "CNAME", name: "docs", value: `${row.project_slug}.tome.center`, verified },
      { type: "TXT", name: "_tome-verify.docs", value: `tome-verify=${row.project_slug}`, verified },
    ],
  });
});

// Helper — reads Cloudflare Zone ID from Worker env secrets
function getZoneId(c: { env: Env }): string {
  return c.env.CLOUDFLARE_ZONE_ID;
}

export { domains };
