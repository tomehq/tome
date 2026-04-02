import { describe, it, expect, vi } from "vitest";
import { Hono } from "hono";
import { sso } from "./sso.js";
import type { Env, User } from "../types.js";

// ── Helpers ──────────────────────────────────────────────

const mockUser: User = {
  id: "u1",
  email: "admin@acme.com",
  name: "Admin",
  avatar_url: null,
  api_token: "tome_test",
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
          if (sql.includes("sso_configs") && sql.includes("SELECT")) {
            return queryResults.ssoConfig || null;
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

function makeApp(db: D1Database) {
  const app = new Hono<{ Bindings: Env; Variables: { user: User } }>();
  app.use("*", async (c, next) => {
    (c.env as any) = {
      TOME_DB: db,
      SSO_SESSION_SECRET: "test-sso-secret-key-32chars-long!",
    };
    c.set("user", mockUser);
    await next();
  });
  app.route("/api/sso", sso);
  return app;
}

// ── SSO Config Management Tests ─────────────────────────

describe("SSO config routes", () => {
  it("POST /config creates SSO configuration", async () => {
    const db = mockDb({ project: { id: "p1" } });
    const app = makeApp(db);

    const res = await app.request("/api/sso/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectSlug: "acme-docs",
        ssoType: "oidc",
        oidcIssuer: "https://accounts.google.com",
        oidcClientId: "client-123",
        oidcClientSecret: "secret-456",
        allowedDomains: ["acme.com"],
      }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).ok).toBe(true);
    expect((body as any).configId).toBeDefined();
  });

  it("POST /config rejects missing projectSlug", async () => {
    const db = mockDb();
    const app = makeApp(db);

    const res = await app.request("/api/sso/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ssoType: "saml" }),
    });

    expect(res.status).toBe(400);
  });

  it("POST /config returns 404 for non-existent project", async () => {
    const db = mockDb({ project: null });
    const app = makeApp(db);

    const res = await app.request("/api/sso/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectSlug: "nonexistent",
        ssoType: "oidc",
      }),
    });

    expect(res.status).toBe(404);
  });

  it("GET /config/:slug returns SSO config", async () => {
    const db = mockDb({
      ssoConfig: {
        id: "sso-1",
        sso_type: "oidc",
        enabled: 1,
        saml_idp_sso_url: null,
        saml_entity_id: null,
        oidc_issuer: "https://accounts.google.com",
        oidc_client_id: "client-123",
        allowed_domains: '["acme.com"]',
      },
    });
    const app = makeApp(db);

    const res = await app.request("/api/sso/config/acme-docs");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).ssoType).toBe("oidc");
    expect((body as any).oidcIssuer).toBe("https://accounts.google.com");
    expect((body as any).allowedDomains).toEqual(["acme.com"]);
  });

  it("GET /config/:slug returns 404 when not configured", async () => {
    const db = mockDb({ ssoConfig: null });
    const app = makeApp(db);

    const res = await app.request("/api/sso/config/no-sso");
    expect(res.status).toBe(404);
  });

  it("DELETE /config/:slug removes SSO config", async () => {
    const db = mockDb({ project: { id: "p1", sso_config_id: "sso-1" } });
    const app = makeApp(db);

    const res = await app.request("/api/sso/config/acme-docs", {
      method: "DELETE",
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect((body as any).ok).toBe(true);
  });
});

// ── SSO Site-Level Route Tests ──────────────────────────

describe("SSO site-level routes", () => {
  it("GET /sites/:slug/metadata returns SP metadata XML", async () => {
    const db = mockDb();
    const app = makeApp(db);

    const res = await app.request("/api/sso/sites/acme-docs/metadata");
    expect(res.status).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("EntityDescriptor");
    expect(xml).toContain("AssertionConsumerService");
    expect(xml).toContain("acme-docs");
  });

  it("GET /sites/:slug/initiate returns 404 when SSO not configured", async () => {
    const db = mockDb({ project: null });
    const app = makeApp(db);

    const res = await app.request("/api/sso/sites/no-sso/initiate");
    expect(res.status).toBe(404);
  });

  it("POST /sites/:slug/saml/acs rejects missing SAMLResponse", async () => {
    const db = mockDb();
    const app = makeApp(db);

    const res = await app.request("/api/sso/sites/acme-docs/saml/acs", {
      method: "POST",
      body: new FormData(),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect((body as any).error).toContain("SAMLResponse");
  });

  it("GET /sites/:slug/oidc/callback rejects missing code", async () => {
    const db = mockDb();
    const app = makeApp(db);

    const res = await app.request("/api/sso/sites/acme-docs/oidc/callback?state=abc");
    expect(res.status).toBe(400);
  });

  it("GET /sites/:slug/oidc/callback passes through OIDC errors", async () => {
    const db = mockDb();
    const app = makeApp(db);

    const res = await app.request("/api/sso/sites/acme-docs/oidc/callback?error=access_denied");
    expect(res.status).toBe(400);
    const body = await res.json();
    expect((body as any).error).toContain("access_denied");
  });
});
