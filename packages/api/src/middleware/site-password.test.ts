import { describe, it, expect, vi } from "vitest";
import { checkSitePassword } from "./site-password.js";
import { Hono } from "hono";
import type { Env } from "../types.js";
import { generateSessionToken } from "../password.js";

const TEST_SECRET = "test-secret-key-for-hmac-signing";

// ── Helpers ──────────────────────────────────────────────

function mockDb(passwordRequired: boolean = false) {
  return {
    prepare: vi.fn().mockReturnValue({
      bind: vi.fn().mockReturnValue({
        first: vi.fn().mockResolvedValue(
          { password_required: passwordRequired ? 1 : 0 },
        ),
      }),
    }),
  } as unknown as D1Database;
}

function makeApp(slug: string, db: D1Database) {
  const app = new Hono<{ Bindings: Env }>();
  app.use("*", async (c, next) => {
    (c.env as any) = { TOME_DB: db, SSO_SESSION_SECRET: TEST_SECRET };
    await next();
  });
  app.use("*", checkSitePassword(slug));
  app.get("/*", (c) => c.text("OK"));
  return app;
}

// ── Tests ────────────────────────────────────────────────

describe("site-password middleware", () => {
  it("allows access when site is not password protected", async () => {
    const app = makeApp("my-docs", mockDb(false));
    const res = await app.request("/");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
  });

  it("redirects to password page when protected and no cookie", async () => {
    const app = makeApp("my-docs", mockDb(true));
    const res = await app.request("/");
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toContain("/api/sites/my-docs/password");
  });

  it("allows access with valid session cookie", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET);
    const app = makeApp("my-docs", mockDb(true));
    const res = await app.request("/", {
      headers: { cookie: `tome_site_session=${token}` },
    });
    expect(res.status).toBe(200);
  });

  it("redirects with expired session cookie", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET, -1000); // already expired
    const app = makeApp("my-docs", mockDb(true));
    const res = await app.request("/", {
      headers: { cookie: `tome_site_session=${token}` },
    });
    expect(res.status).toBe(302);
  });

  it("redirects with cookie for wrong slug", async () => {
    const token = await generateSessionToken("other-docs", TEST_SECRET);
    const app = makeApp("my-docs", mockDb(true));
    const res = await app.request("/", {
      headers: { cookie: `tome_site_session=${token}` },
    });
    expect(res.status).toBe(302);
  });

  it("allows API endpoints through even when protected", async () => {
    const app = makeApp("my-docs", mockDb(true));
    const res = await app.request("/api/sites/my-docs/authenticate");
    expect(res.status).toBe(200);
  });
});
