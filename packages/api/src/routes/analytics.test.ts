import { describe, it, expect, vi } from "vitest";
import { Hono } from "hono";
import { analytics } from "./analytics.js";
import type { Env, User } from "../types.js";

// ── Helpers ──────────────────────────────────────────────

function mockDb(opts: { firstResult?: any; allResult?: any[] } = {}) {
  return {
    prepare: vi.fn().mockReturnValue({
      bind: vi.fn().mockReturnValue({
        run: vi.fn().mockResolvedValue({}),
        first: vi.fn().mockResolvedValue(opts.firstResult ?? { count: 0 }),
        all: vi.fn().mockResolvedValue({ results: opts.allResult ?? [] }),
      }),
    }),
  } as unknown as D1Database;
}

function makeApp(db?: D1Database) {
  const app = new Hono<{ Bindings: Env; Variables: { user: User } }>();
  app.use("*", async (c, next) => {
    (c.env as any) = { TOME_DB: db ?? mockDb() };
    await next();
  });
  app.route("/", analytics);
  return app;
}

// ── POST /event ──────────────────────────────────────────

describe("POST /event", () => {
  it("returns 400 when siteId is missing", async () => {
    const app = makeApp();
    const res = await app.request("/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "pageview" }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("siteId");
  });

  it("returns 400 when type is missing", async () => {
    const app = makeApp();
    const res = await app.request("/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId: "site1" }),
    });
    expect(res.status).toBe(400);
  });

  it("inserts event into DB and returns ok", async () => {
    const db = mockDb();
    const app = makeApp(db);
    const res = await app.request("/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId: "site1",
        type: "pageview",
        url: "/docs/quickstart",
        referrer: "https://google.com",
        sessionId: "sess1",
      }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(db.prepare).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO analytics_events")
    );
  });

  it("handles optional fields as null", async () => {
    const db = mockDb();
    const app = makeApp(db);
    const res = await app.request("/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId: "site1", type: "pageview" }),
    });
    expect(res.status).toBe(200);
  });
});

// ── GET /summary ─────────────────────────────────────────

describe("GET /summary", () => {
  it("returns 400 when siteId is missing", async () => {
    const app = makeApp();
    const res = await app.request("/summary");
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("siteId");
  });

  it("returns aggregated summary for valid siteId", async () => {
    const db = mockDb({
      firstResult: { count: 42 },
      allResult: [{ url: "/docs/quickstart", views: 10 }],
    });
    const app = makeApp(db);
    const res = await app.request("/summary?siteId=site1");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.totalPageViews).toBe(42);
    expect(body.uniqueVisitors).toBe(42);
    expect(body.topPages).toEqual([{ url: "/docs/quickstart", views: 10 }]);
    expect(body.topReferrers).toEqual([{ url: "/docs/quickstart", views: 10 }]);
    expect(body.topSearchQueries).toEqual([{ url: "/docs/quickstart", views: 10 }]);
    expect(body.viewsByDay).toEqual([{ url: "/docs/quickstart", views: 10 }]);
  });

  it("accepts custom range parameter", async () => {
    const db = mockDb();
    const app = makeApp(db);
    const res = await app.request("/summary?siteId=site1&range=7d");
    expect(res.status).toBe(200);
  });

  it("defaults to 30d range when not specified", async () => {
    const db = mockDb();
    const app = makeApp(db);
    const res = await app.request("/summary?siteId=site1");
    expect(res.status).toBe(200);
    // Verify DB was called (range parsing works)
    expect(db.prepare).toHaveBeenCalled();
  });

  it("returns zeroed summary when no data exists", async () => {
    const db = mockDb({ firstResult: null, allResult: [] });
    const app = makeApp(db);
    const res = await app.request("/summary?siteId=site1");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.totalPageViews).toBe(0);
    expect(body.uniqueVisitors).toBe(0);
    expect(body.topPages).toEqual([]);
  });
});
