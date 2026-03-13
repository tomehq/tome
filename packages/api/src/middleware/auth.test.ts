import { describe, it, expect, vi } from "vitest";
import { Hono } from "hono";
import { auth } from "./auth.js";
import type { Env, User } from "../types.js";

// ── Helpers ──────────────────────────────────────────────

const mockUser: User = {
  id: "u1",
  email: "test@example.com",
  name: "Test User",
  avatar_url: null,
  api_token: "tome_validtoken",
  stripe_customer_id: null,
  plan: "cloud",
  created_at: "2025-01-01",
  updated_at: "2025-01-01",
};

function mockDb(row: User | null = null) {
  return {
    prepare: vi.fn().mockReturnValue({
      bind: vi.fn().mockReturnValue({
        first: vi.fn().mockResolvedValue(row),
      }),
    }),
  } as unknown as D1Database;
}

function makeApp(db: D1Database) {
  const app = new Hono<{ Bindings: Env; Variables: { user: User } }>();
  app.use("*", async (c, next) => {
    (c.env as any) = { TOME_DB: db };
    await next();
  });
  app.use("*", auth);
  app.get("/test", (c) => c.json({ user: c.get("user") }));
  return app;
}

// ── Tests ────────────────────────────────────────────────

describe("auth middleware", () => {
  it("returns 401 when no Authorization header", async () => {
    const app = makeApp(mockDb());
    const res = await app.request("/test");
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toContain("Authorization");
  });

  it("returns 401 for non-Bearer authorization", async () => {
    const app = makeApp(mockDb());
    const res = await app.request("/test", {
      headers: { Authorization: "Basic abc123" },
    });
    expect(res.status).toBe(401);
  });

  it("returns 401 for empty Bearer token that matches no user", async () => {
    const app = makeApp(mockDb(null));
    const res = await app.request("/test", {
      headers: { Authorization: "Bearer bad_token" },
    });
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toContain("Invalid API token");
  });

  it("sets user on context for valid token", async () => {
    const db = mockDb(mockUser);
    const app = makeApp(db);
    const res = await app.request("/test", {
      headers: { Authorization: "Bearer tome_validtoken" },
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user.id).toBe("u1");
    expect(body.user.email).toBe("test@example.com");
    expect(body.user.plan).toBe("cloud");
  });

  it("queries DB with extracted token", async () => {
    const db = mockDb(mockUser);
    const app = makeApp(db);
    await app.request("/test", {
      headers: { Authorization: "Bearer my_secret_token" },
    });
    expect(db.prepare).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE api_token = ?"
    );
  });

  it("passes through to next handler on success", async () => {
    const db = mockDb(mockUser);
    const app = makeApp(db);
    const res = await app.request("/test", {
      headers: { Authorization: "Bearer tome_validtoken" },
    });
    expect(res.status).toBe(200);
  });
});
