import { describe, it, expect, vi } from "vitest";
import { Hono } from "hono";
import { roles } from "./roles.js";
import type { Env, User } from "../types.js";

// ── Helpers ──────────────────────────────────────────────

const mockOwner: User = {
  id: "u1",
  email: "owner@acme.com",
  name: "Owner",
  avatar_url: null,
  api_token: "tome_owner",
  stripe_customer_id: null,
  plan: "team",
  created_at: "2025-01-01",
  updated_at: "2025-01-01",
};

const mockNonOwner: User = {
  id: "u2",
  email: "viewer@acme.com",
  name: "Viewer",
  avatar_url: null,
  api_token: "tome_viewer",
  stripe_customer_id: null,
  plan: "team",
  created_at: "2025-01-01",
  updated_at: "2025-01-01",
};

function mockDb(queryResults: Record<string, any> = {}) {
  return {
    prepare: vi.fn().mockImplementation((sql: string) => ({
      bind: vi.fn().mockReturnValue({
        first: vi.fn().mockImplementation(async () => {
          // Project lookup
          if (sql.includes("SELECT") && sql.includes("projects") && sql.includes("slug")) {
            return queryResults.project || null;
          }
          // Role lookup for authorization check
          if (sql.includes("SELECT") && sql.includes("project_roles")) {
            return queryResults.callerRole || null;
          }
          return null;
        }),
        run: vi.fn().mockResolvedValue({ success: true }),
        all: vi.fn().mockResolvedValue({
          results: queryResults.rolesList ?? [],
        }),
      }),
    })),
  } as unknown as D1Database;
}

function makeApp(db: D1Database, user: User = mockOwner) {
  const app = new Hono<{ Bindings: Env; Variables: { user: User } }>();
  app.use("*", async (c, next) => {
    (c.env as any) = { TOME_DB: db };
    c.set("user", user);
    await next();
  });
  app.route("/api/roles", roles);
  return app;
}

// ── Tests ────────────────────────────────────────────────

describe("roles routes", () => {
  describe("POST /api/roles — assign role", () => {
    it("assigns a role to an email", async () => {
      const db = mockDb({ project: { id: "p1", user_id: "u1" } });
      const app = makeApp(db);

      const res = await app.request("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectSlug: "acme-docs",
          email: "dev@acme.com",
          role: "editor",
        }),
      });

      expect(res.status).toBe(200);
      const body = await res.json();
      expect((body as any).ok).toBe(true);
      expect((body as any).id).toBeDefined();
    });

    it("rejects invalid role names", async () => {
      const db = mockDb({ project: { id: "p1", user_id: "u1" } });
      const app = makeApp(db);

      const res = await app.request("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectSlug: "acme-docs",
          email: "dev@acme.com",
          role: "superadmin",
        }),
      });

      expect(res.status).toBe(400);
      const body = await res.json();
      expect((body as any).error).toContain("Invalid role");
    });

    it("rejects missing fields", async () => {
      const db = mockDb();
      const app = makeApp(db);

      const res = await app.request("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectSlug: "acme-docs" }),
      });

      expect(res.status).toBe(400);
    });

    it("rejects non-owner/admin users", async () => {
      // project.user_id !== u2, and no admin role entry
      const db = mockDb({ project: { id: "p1", user_id: "u1" }, callerRole: null });
      const app = makeApp(db, mockNonOwner);

      const res = await app.request("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectSlug: "acme-docs",
          email: "dev@acme.com",
          role: "viewer",
        }),
      });

      expect(res.status).toBe(403);
    });

    it("allows admin-role users to assign roles", async () => {
      // project.user_id !== u2, but u2 has admin role
      const db = mockDb({
        project: { id: "p1", user_id: "u1" },
        callerRole: { role: "admin" },
      });
      const app = makeApp(db, mockNonOwner);

      const res = await app.request("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectSlug: "acme-docs",
          email: "new@acme.com",
          role: "editor",
        }),
      });

      expect(res.status).toBe(200);
    });
  });

  describe("GET /api/roles/:slug — list roles", () => {
    it("lists roles for a project", async () => {
      const db = mockDb({
        project: { id: "p1", user_id: "u1" },
        rolesList: [
          { id: "r1", email: "dev@acme.com", role: "editor", created_at: "2025-06-01" },
          { id: "r2", email: "admin@acme.com", role: "admin", created_at: "2025-06-01" },
        ],
      });
      const app = makeApp(db);

      const res = await app.request("/api/roles/acme-docs");
      expect(res.status).toBe(200);
      const body = await res.json();
      expect((body as any).roles).toHaveLength(2);
      expect((body as any).roles[0].email).toBe("dev@acme.com");
    });

    it("returns 403 for non-owner/admin", async () => {
      const db = mockDb({ project: { id: "p1", user_id: "u1" }, callerRole: null });
      const app = makeApp(db, mockNonOwner);

      const res = await app.request("/api/roles/acme-docs");
      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /api/roles — remove role", () => {
    it("removes a role assignment", async () => {
      const db = mockDb({ project: { id: "p1", user_id: "u1" } });
      const app = makeApp(db);

      const res = await app.request("/api/roles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectSlug: "acme-docs",
          email: "dev@acme.com",
        }),
      });

      expect(res.status).toBe(200);
      const body = await res.json();
      expect((body as any).ok).toBe(true);
    });

    it("rejects missing fields", async () => {
      const db = mockDb();
      const app = makeApp(db);

      const res = await app.request("/api/roles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectSlug: "acme-docs" }),
      });

      expect(res.status).toBe(400);
    });

    it("rejects non-owner/admin users", async () => {
      const db = mockDb({ project: { id: "p1", user_id: "u1" }, callerRole: null });
      const app = makeApp(db, mockNonOwner);

      const res = await app.request("/api/roles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectSlug: "acme-docs",
          email: "dev@acme.com",
        }),
      });

      expect(res.status).toBe(403);
    });
  });
});
