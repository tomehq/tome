import { describe, it, expect, vi, beforeEach } from "vitest";
import { Hono } from "hono";
import { github } from "./github.js";
import type { Env, User } from "../types.js";

// ── Helpers ──────────────────────────────────────────────

const mockUser: User = {
  id: "u1",
  email: "test@example.com",
  name: "Test User",
  avatar_url: null,
  api_token: "tome_test123",
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
          // Match on SQL keywords to return different results
          if (sql.includes("github_repo") && sql.includes("SELECT")) {
            return queryResults.projectStatus || null;
          }
          if (sql.includes("SELECT") && sql.includes("projects")) {
            return queryResults.project || null;
          }
          return null;
        }),
        run: vi.fn().mockResolvedValue({ success: true }),
      }),
    })),
  } as unknown as D1Database;
}

function makeApp(db: D1Database, env: Partial<Env> = {}) {
  const app = new Hono<{ Bindings: Env; Variables: { user: User } }>();

  // Inject env and user for authenticated routes
  app.use("*", async (c, next) => {
    (c.env as any) = {
      TOME_DB: db,
      GITHUB_APP_WEBHOOK_SECRET: "test-webhook-secret",
      GITHUB_APP_ID: "12345",
      GITHUB_APP_PRIVATE_KEY: "",
      ...env,
    };
    c.set("user", mockUser);
    await next();
  });

  app.route("/api/github", github);
  return app;
}

// ── Helper to generate valid HMAC signature ──────────────

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const hex = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `sha256=${hex}`;
}

// ── Webhook tests ───────────────────────────────────────

describe("GitHub webhook handler", () => {
  it("rejects requests without valid signature", async () => {
    const app = makeApp(mockDb());
    const res = await app.request("/api/github/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-github-event": "push",
        "x-hub-signature-256": "sha256=invalid",
      },
      body: JSON.stringify({ ref: "refs/heads/main" }),
    });
    expect(res.status).toBe(401);
  });

  it("accepts requests with valid signature", async () => {
    const payload = JSON.stringify({
      ref: "refs/heads/main",
      repository: { full_name: "test/repo", default_branch: "main" },
      installation: { id: 999 },
    });
    const sig = await signPayload(payload, "test-webhook-secret");

    const app = makeApp(mockDb());
    const res = await app.request("/api/github/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-github-event": "push",
        "x-hub-signature-256": sig,
      },
      body: payload,
    });
    expect(res.status).toBe(200);
  });

  it("ignores unhandled events", async () => {
    const payload = JSON.stringify({ action: "created" });
    const sig = await signPayload(payload, "test-webhook-secret");

    const app = makeApp(mockDb());
    const res = await app.request("/api/github/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-github-event": "installation",
        "x-hub-signature-256": sig,
      },
      body: payload,
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).message).toContain("Ignored");
  });

  it("returns 503 when GitHub App not configured", async () => {
    const app = makeApp(mockDb(), { GITHUB_APP_WEBHOOK_SECRET: "" });
    // Override env to remove webhook secret
    const appNoSecret = new Hono<{ Bindings: Env }>();
    appNoSecret.use("*", async (c, next) => {
      (c.env as any) = { TOME_DB: mockDb(), GITHUB_APP_WEBHOOK_SECRET: "" };
      await next();
    });
    appNoSecret.route("/api/github", github);

    const res = await appNoSecret.request("/api/github/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-github-event": "push",
      },
      body: "{}",
    });
    expect(res.status).toBe(503);
  });
});

// ── Connect/Disconnect tests ────────────────────────────

describe("GitHub connect/disconnect", () => {
  it("connects a repository to a project", async () => {
    const db = mockDb({ project: { id: "p1" } });
    const app = makeApp(db);

    const res = await app.request("/api/github/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: "my-docs",
        repository: "tomehq/tome",
        installationId: 12345,
      }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).repository).toBe("tomehq/tome");
    expect((body as any).branch).toBe("main");
  });

  it("connects with custom branch", async () => {
    const db = mockDb({ project: { id: "p1" } });
    const app = makeApp(db);

    const res = await app.request("/api/github/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: "my-docs",
        repository: "https://github.com/tomehq/tome",
        installationId: 12345,
        branch: "develop",
      }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).branch).toBe("develop");
  });

  it("rejects invalid repository format", async () => {
    const db = mockDb({ project: { id: "p1" } });
    const app = makeApp(db);

    const res = await app.request("/api/github/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: "my-docs",
        repository: "not a valid repo",
        installationId: 12345,
      }),
    });

    expect(res.status).toBe(400);
  });

  it("rejects when project not found", async () => {
    const db = mockDb({ project: null });
    const app = makeApp(db);

    const res = await app.request("/api/github/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: "nonexistent",
        repository: "tomehq/tome",
        installationId: 12345,
      }),
    });

    expect(res.status).toBe(404);
  });

  it("disconnects a repository", async () => {
    const db = mockDb({ project: { id: "p1" } });
    const app = makeApp(db);

    const res = await app.request("/api/github/connect", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: "my-docs" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).ok).toBe(true);
  });
});

// ── Status endpoint tests ───────────────────────────────

describe("GitHub status", () => {
  it("returns connected status when repo is linked", async () => {
    const db = mockDb({
      projectStatus: {
        github_repo: "tomehq/tome",
        github_installation_id: 12345,
        github_branch: "main",
      },
    });
    const app = makeApp(db);

    const res = await app.request("/api/github/status/my-docs");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).connected).toBe(true);
    expect((body as any).repository).toBe("tomehq/tome");
  });

  it("returns disconnected status when no repo linked", async () => {
    const db = mockDb({
      projectStatus: {
        github_repo: null,
        github_installation_id: null,
        github_branch: null,
      },
    });
    const app = makeApp(db);

    const res = await app.request("/api/github/status/my-docs");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).connected).toBe(false);
  });
});
