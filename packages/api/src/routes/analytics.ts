import { Hono } from "hono";
import type { Env, User } from "../types.js";

const analytics = new Hono<{ Bindings: Env; Variables: { user: User } }>();

// ── POST /event — receive beacon payload (public, no auth) ────
analytics.post("/event", async (c) => {
  const body = await c.req.json<{
    type: string;
    url?: string;
    referrer?: string;
    query?: string;
    resultsCount?: number;
    timestamp?: number;
    sessionId?: string;
    siteId?: string;
    userAgent?: string;
    screenWidth?: number;
  }>();

  if (!body.siteId || !body.type) {
    return c.json({ error: "Missing siteId or type" }, 400);
  }

  const id = crypto.randomUUID();
  await c.env.TOME_DB.prepare(
    `INSERT INTO analytics_events
     (id, site_id, type, url, referrer, query, results_count, session_id, screen_width, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      body.siteId,
      body.type,
      body.url ?? null,
      body.referrer ?? null,
      body.query ?? null,
      body.resultsCount ?? null,
      body.sessionId ?? null,
      body.screenWidth ?? null,
      body.userAgent ?? null
    )
    .run();

  return c.json({ ok: true });
});

// ── GET /summary — return aggregated summary (auth required) ──
analytics.get("/summary", async (c) => {
  const siteId = c.req.query("siteId");
  const range = c.req.query("range") ?? "30d";

  if (!siteId) {
    return c.json({ error: "Missing siteId query parameter" }, 400);
  }

  // Calculate date cutoff from range
  const days = parseInt(range) || 30;
  const cutoff = new Date(Date.now() - days * 86_400_000).toISOString();

  // Total page views
  const pvCount = await c.env.TOME_DB.prepare(
    "SELECT COUNT(*) as count FROM analytics_events WHERE site_id = ? AND type = 'pageview' AND created_at >= ?"
  )
    .bind(siteId, cutoff)
    .first<{ count: number }>();

  // Unique visitors (by session_id)
  const uvCount = await c.env.TOME_DB.prepare(
    "SELECT COUNT(DISTINCT session_id) as count FROM analytics_events WHERE site_id = ? AND type = 'pageview' AND created_at >= ?"
  )
    .bind(siteId, cutoff)
    .first<{ count: number }>();

  // Top pages
  const { results: topPages } = await c.env.TOME_DB.prepare(
    "SELECT url, COUNT(*) as views FROM analytics_events WHERE site_id = ? AND type = 'pageview' AND created_at >= ? GROUP BY url ORDER BY views DESC LIMIT 10"
  )
    .bind(siteId, cutoff)
    .all();

  // Top referrers
  const { results: topReferrers } = await c.env.TOME_DB.prepare(
    "SELECT referrer, COUNT(*) as count FROM analytics_events WHERE site_id = ? AND type = 'pageview' AND referrer IS NOT NULL AND referrer != '' AND created_at >= ? GROUP BY referrer ORDER BY count DESC LIMIT 10"
  )
    .bind(siteId, cutoff)
    .all();

  // Top search queries
  const { results: topSearchQueries } = await c.env.TOME_DB.prepare(
    "SELECT query, COUNT(*) as count FROM analytics_events WHERE site_id = ? AND type = 'search' AND created_at >= ? GROUP BY query ORDER BY count DESC LIMIT 10"
  )
    .bind(siteId, cutoff)
    .all();

  // Views by day
  const { results: viewsByDay } = await c.env.TOME_DB.prepare(
    "SELECT DATE(created_at) as date, COUNT(*) as views FROM analytics_events WHERE site_id = ? AND type = 'pageview' AND created_at >= ? GROUP BY DATE(created_at) ORDER BY date ASC"
  )
    .bind(siteId, cutoff)
    .all();

  return c.json({
    totalPageViews: pvCount?.count ?? 0,
    uniqueVisitors: uvCount?.count ?? 0,
    topPages: topPages ?? [],
    topReferrers: topReferrers ?? [],
    topSearchQueries: topSearchQueries ?? [],
    viewsByDay: viewsByDay ?? [],
  });
});

export { analytics };
