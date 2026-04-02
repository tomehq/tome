import { describe, it, expect, vi } from "vitest";
import { Hono } from "hono";
import { siteAuth } from "./site-auth.js";
import type { Env } from "../types.js";
import { hashPassword } from "../password.js";

// ── Helpers ──────────────────────────────────────────────

function mockDb(passwordHash: string | null = null) {
  return {
    prepare: vi.fn().mockReturnValue({
      bind: vi.fn().mockReturnValue({
        first: vi.fn().mockResolvedValue(
          passwordHash ? { password_hash: passwordHash } : null
        ),
      }),
    }),
  } as unknown as D1Database;
}

function makeApp(db: D1Database) {
  const app = new Hono<{ Bindings: Env }>();
  app.use("*", async (c, next) => {
    (c.env as any) = { TOME_DB: db };
    await next();
  });
  app.route("/api/sites", siteAuth);
  return app;
}

// ── Tests ────────────────────────────────────────────────

describe("site-auth routes", () => {
  it("GET /api/sites/:slug/password returns password page", async () => {
    const app = makeApp(mockDb());
    const res = await app.request("/api/sites/my-docs/password");
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Password Required");
    expect(html).toContain('name="password"');
  });

  it("POST /api/sites/:slug/authenticate rejects missing password", async () => {
    const app = makeApp(mockDb());
    const formData = new FormData();
    const res = await app.request("/api/sites/my-docs/authenticate", {
      method: "POST",
      body: formData,
    });
    expect(res.status).toBe(400);
    const html = await res.text();
    expect(html).toContain("Password is required");
  });

  it("POST /api/sites/:slug/authenticate rejects when site is not protected", async () => {
    const app = makeApp(mockDb(null));
    const formData = new FormData();
    formData.set("password", "secret");
    const res = await app.request("/api/sites/my-docs/authenticate", {
      method: "POST",
      body: formData,
    });
    expect(res.status).toBe(400);
    const html = await res.text();
    expect(html).toContain("not password-protected");
  });

  it("POST /api/sites/:slug/authenticate rejects wrong password", async () => {
    const hash = await hashPassword("correct-password");
    const app = makeApp(mockDb(hash));
    const formData = new FormData();
    formData.set("password", "wrong-password");
    const res = await app.request("/api/sites/my-docs/authenticate", {
      method: "POST",
      body: formData,
    });
    expect(res.status).toBe(401);
    const html = await res.text();
    expect(html).toContain("Incorrect password");
  });

  it("POST /api/sites/:slug/authenticate accepts correct password and redirects", async () => {
    const hash = await hashPassword("correct-password");
    const app = makeApp(mockDb(hash));
    const formData = new FormData();
    formData.set("password", "correct-password");
    const res = await app.request("/api/sites/my-docs/authenticate", {
      method: "POST",
      body: formData,
    });
    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toBe("/");
    const setCookie = res.headers.get("Set-Cookie");
    expect(setCookie).toContain("tome_site_session=");
    expect(setCookie).toContain("HttpOnly");
  });
});
