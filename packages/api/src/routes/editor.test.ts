import { describe, it, expect, vi } from "vitest";
import { Hono } from "hono";
import { editor } from "./editor.js";
import type { Env, User } from "../types.js";

// ── Helpers ──────────────────────────────────────────────

const mockUser: User = {
  id: "u1",
  email: "test@example.com",
  name: "Test User",
  avatar_url: null,
  api_token: "tome_test",
  stripe_customer_id: null,
  plan: "cloud",
  created_at: "2025-01-01",
  updated_at: "2025-01-01",
};

function mockDb(queryResults: Record<string, any> = {}) {
  return {
    prepare: vi.fn().mockImplementation((sql: string) => ({
      bind: vi.fn().mockReturnValue({
        first: vi.fn().mockImplementation(async () => {
          if (sql.includes("editor_pages") && sql.includes("SELECT")) {
            return queryResults.page || null;
          }
          if (sql.includes("projects") && sql.includes("SELECT")) {
            return queryResults.project || null;
          }
          return null;
        }),
        all: vi.fn().mockResolvedValue({ results: queryResults.pages || [] }),
        run: vi.fn().mockResolvedValue({ success: true }),
      }),
    })),
  } as unknown as D1Database;
}

function mockBucket() {
  return {
    put: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
  } as unknown as R2Bucket;
}

function makeApp(db: D1Database, bucket?: R2Bucket) {
  const app = new Hono<{ Bindings: Env; Variables: { user: User } }>();
  app.use("*", async (c, next) => {
    (c.env as any) = { TOME_DB: db, TOME_BUCKET: bucket || mockBucket() };
    c.set("user", mockUser);
    await next();
  });
  app.route("/api/editor", editor);
  return app;
}

// ── Tests ────────────────────────────────────────────────

describe("editor routes", () => {
  it("GET /pages requires projectSlug", async () => {
    const app = makeApp(mockDb());
    const res = await app.request("/api/editor/pages");
    expect(res.status).toBe(400);
  });

  it("GET /pages returns pages for project", async () => {
    const db = mockDb({
      project: { id: "p1" },
      pages: [
        { id: "pg1", path: "getting-started", title: "Getting Started", status: "published" },
        { id: "pg2", path: "quickstart", title: "Quickstart", status: "draft" },
      ],
    });
    const app = makeApp(db);
    const res = await app.request("/api/editor/pages?projectSlug=my-docs");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(2);
  });

  it("POST /pages creates a new page", async () => {
    const db = mockDb({ project: { id: "p1" } });
    const app = makeApp(db);
    const res = await app.request("/api/editor/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectSlug: "my-docs", path: "new-page", title: "New Page" }),
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect((body as any).path).toBe("new-page");
    expect((body as any).status).toBe("draft");
  });

  it("POST /pages rejects missing path", async () => {
    const db = mockDb({ project: { id: "p1" } });
    const app = makeApp(db);
    const res = await app.request("/api/editor/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectSlug: "my-docs" }),
    });
    expect(res.status).toBe(400);
  });

  it("PUT /pages/:id saves draft", async () => {
    const db = mockDb({ page: { id: "pg1", project_id: "p1" } });
    const app = makeApp(db);
    const res = await app.request("/api/editor/pages/pg1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "# Updated content", title: "Updated" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).ok).toBe(true);
  });

  it("PUT /pages/:id returns 404 for unknown page", async () => {
    const db = mockDb({ page: null });
    const app = makeApp(db);
    const res = await app.request("/api/editor/pages/nonexistent", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "test" }),
    });
    expect(res.status).toBe(404);
  });

  it("POST /pages/:id/publish writes to R2 for non-Git projects", async () => {
    const bucket = mockBucket();
    const db = mockDb({
      page: {
        id: "pg1", project_id: "p1", path: "quickstart",
        title: "Quickstart", content: "# Quickstart\nGet started.",
        frontmatter: "{}", project_slug: "my-docs", proj_id: "p1",
      },
    });
    const app = makeApp(db, bucket);
    const res = await app.request("/api/editor/pages/pg1/publish", { method: "POST" });
    expect(res.status).toBe(200);
    const body = await res.json() as any;
    expect(body.status).toBe("published");
    expect(body.method).toBe("direct");
    expect(bucket.put).toHaveBeenCalled();
  });

  it("POST /pages/:id/publish does NOT write to R2 for Git-connected projects", async () => {
    const bucket = mockBucket();
    // Mock DB returns page + project with GitHub connection
    const db = {
      prepare: vi.fn().mockImplementation((sql: string) => ({
        bind: vi.fn().mockReturnValue({
          first: vi.fn().mockImplementation(async () => {
            if (sql.includes("editor_pages") && sql.includes("project_slug")) {
              return {
                id: "pg1", project_id: "p1", path: "quickstart",
                title: "Quickstart", content: "# Quickstart",
                frontmatter: "{}", project_slug: "my-docs", proj_id: "p1",
              };
            }
            if (sql.includes("github_repo")) {
              return {
                github_repo: "tomehq/docs",
                github_installation_id: 12345,
                github_branch: "main",
              };
            }
            if (sql.includes("projects")) return { id: "p1" };
            return null;
          }),
          run: vi.fn().mockResolvedValue({ success: true }),
        }),
      })),
    } as unknown as D1Database;
    const app = makeApp(db, bucket);
    const res = await app.request("/api/editor/pages/pg1/publish", { method: "POST" });
    // Git sync will fail (no real GitHub App credentials) but R2 should NOT be written
    const body = await res.json() as any;
    // Either fails (500 from GitHub) or succeeds — but bucket.put should NOT be called
    expect(bucket.put).not.toHaveBeenCalled();
  });

  it("DELETE /pages/:id removes page and versions", async () => {
    const db = mockDb({ page: { id: "pg1", path: "old-page", project_slug: "my-docs" } });
    const bucket = mockBucket();
    const app = makeApp(db, bucket);
    const res = await app.request("/api/editor/pages/pg1", { method: "DELETE" });
    expect(res.status).toBe(200);
    expect(bucket.delete).toHaveBeenCalled();
  });

  it("GET /pages/:id/versions returns 404 for unknown page", async () => {
    const db = mockDb({ page: null });
    const app = makeApp(db);
    const res = await app.request("/api/editor/pages/nonexistent/versions");
    expect(res.status).toBe(404);
  });
});
