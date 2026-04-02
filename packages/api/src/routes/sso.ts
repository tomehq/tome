/**
 * SSO routes for SAML 2.0 and OIDC authentication.
 *
 * Public routes (site-level, no Bearer auth):
 *   GET  /sso/sites/:slug/initiate       — Start SSO flow
 *   POST /sso/sites/:slug/saml/acs       — SAML Assertion Consumer Service
 *   GET  /sso/sites/:slug/oidc/callback   — OIDC authorization code callback
 *   GET  /sso/sites/:slug/metadata        — SP metadata XML
 *
 * Authenticated routes (dashboard, team plan):
 *   POST   /sso/config         — Create SSO config
 *   GET    /sso/config/:slug   — Get SSO config
 *   PUT    /sso/config/:slug   — Update SSO config
 *   DELETE /sso/config/:slug   — Remove SSO config
 */

import { Hono } from "hono";
import type { Env, User } from "../types.js";
import { buildAuthnRequest, buildSamlRedirectUrl, parseSamlResponse, extractSamlClaims, buildSpMetadata } from "../sso/saml.js";
import { buildAuthorizationUrl, exchangeCode, validateIdToken, generateCodeVerifier, generateCodeChallenge, discoverOidcEndpoints } from "../sso/oidc.js";
import { createSsoSession } from "../sso/session.js";

// ── Types ───────────────────────────────────────────────

interface SsoConfig {
  id: string;
  project_id: string;
  sso_type: "saml" | "oidc";
  enabled: number;
  saml_idp_sso_url: string | null;
  saml_idp_certificate: string | null;
  saml_entity_id: string | null;
  oidc_issuer: string | null;
  oidc_client_id: string | null;
  oidc_client_secret: string | null;
  allowed_domains: string | null;
  auto_provision: number;
}

// ── Routes ──────────────────────────────────────────────

const sso = new Hono<{ Bindings: Env; Variables: { user: User } }>();

// ── Public: Initiate SSO flow ───────────────────────────

sso.get("/sites/:slug/initiate", async (c) => {
  const slug = c.req.param("slug");

  const project = await c.env.TOME_DB.prepare(
    "SELECT p.sso_config_id, s.* FROM projects p LEFT JOIN sso_configs s ON p.sso_config_id = s.id WHERE p.slug = ? AND p.sso_enabled = 1",
  ).bind(slug).first<SsoConfig & { sso_config_id: string }>();

  if (!project || !project.sso_config_id) {
    return c.json({ error: "SSO not configured for this site" }, 404);
  }

  const host = c.req.header("host") || "api.tome.center";
  const baseUrl = `https://${host}`;

  if (project.sso_type === "saml") {
    if (!project.saml_idp_sso_url) {
      return c.json({ error: "SAML IdP SSO URL not configured" }, 500);
    }
    const entityId = `${baseUrl}/api/sso/sites/${slug}/metadata`;
    const acsUrl = `${baseUrl}/api/sso/sites/${slug}/saml/acs`;
    const authnRequest = buildAuthnRequest(entityId, acsUrl, project.saml_idp_sso_url);
    const redirectUrl = buildSamlRedirectUrl(project.saml_idp_sso_url, authnRequest);
    return c.redirect(redirectUrl);
  }

  if (project.sso_type === "oidc") {
    if (!project.oidc_issuer || !project.oidc_client_id) {
      return c.json({ error: "OIDC configuration incomplete" }, 500);
    }
    const endpoints = await discoverOidcEndpoints(project.oidc_issuer);
    const redirectUri = `${baseUrl}/api/sso/sites/${slug}/oidc/callback`;
    const state = crypto.randomUUID();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Store state + verifier in a short-lived cookie
    const statePayload = btoa(JSON.stringify({ state, codeVerifier, slug }));
    const headers = new Headers();
    headers.set("Set-Cookie", `tome_sso_state=${statePayload}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`);

    const authUrl = buildAuthorizationUrl({
      authorizationEndpoint: endpoints.authorization_endpoint,
      clientId: project.oidc_client_id,
      redirectUri,
      state,
      codeChallenge,
      scope: "openid email profile",
    });

    headers.set("Location", authUrl);
    return new Response(null, { status: 302, headers });
  }

  return c.json({ error: "Unknown SSO type" }, 500);
});

// ── Public: SAML ACS (Assertion Consumer Service) ───────

sso.post("/sites/:slug/saml/acs", async (c) => {
  const slug = c.req.param("slug");
  const body = await c.req.parseBody();
  const samlResponse = body.SAMLResponse as string;

  if (!samlResponse) {
    return c.json({ error: "Missing SAMLResponse" }, 400);
  }

  const project = await c.env.TOME_DB.prepare(
    "SELECT s.* FROM projects p JOIN sso_configs s ON p.sso_config_id = s.id WHERE p.slug = ? AND p.sso_enabled = 1",
  ).bind(slug).first<SsoConfig>();

  if (!project) {
    return c.json({ error: "SSO not configured" }, 404);
  }

  try {
    const parsed = parseSamlResponse(samlResponse);
    const claims = extractSamlClaims(parsed.attributes);

    if (!claims.email) {
      return c.json({ error: "No email in SAML response" }, 400);
    }

    // Check allowed domains
    if (project.allowed_domains) {
      const domains = JSON.parse(project.allowed_domains) as string[];
      const emailDomain = claims.email.split("@")[1];
      if (domains.length > 0 && !domains.includes(emailDomain)) {
        return c.json({ error: "Email domain not allowed" }, 403);
      }
    }

    // Create SSO session
    const secret = c.env.SSO_SESSION_SECRET;
    const sessionToken = await createSsoSession(secret, {
      slug,
      email: claims.email,
      groups: claims.groups,
    });

    const headers = new Headers();
    headers.set("Set-Cookie", `tome_sso_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`);
    headers.set("Location", "/");
    return new Response(null, { status: 302, headers });
  } catch (err) {
    return c.json({ error: `SAML validation failed: ${(err as Error).message}` }, 401);
  }
});

// ── Public: OIDC Callback ───────────────────────────────

sso.get("/sites/:slug/oidc/callback", async (c) => {
  const slug = c.req.param("slug");
  const code = c.req.query("code");
  const state = c.req.query("state");
  const error = c.req.query("error");

  if (error) {
    return c.json({ error: `OIDC error: ${error}` }, 400);
  }

  if (!code || !state) {
    return c.json({ error: "Missing code or state" }, 400);
  }

  // Retrieve state cookie
  const cookieHeader = c.req.header("cookie") || "";
  const stateMatch = cookieHeader.match(/tome_sso_state=([^;]*)/);
  if (!stateMatch) {
    return c.json({ error: "Missing state cookie" }, 400);
  }

  let storedState: { state: string; codeVerifier: string; slug: string };
  try {
    storedState = JSON.parse(atob(stateMatch[1]));
  } catch {
    return c.json({ error: "Invalid state cookie" }, 400);
  }

  if (storedState.state !== state || storedState.slug !== slug) {
    return c.json({ error: "State mismatch" }, 400);
  }

  const project = await c.env.TOME_DB.prepare(
    "SELECT s.* FROM projects p JOIN sso_configs s ON p.sso_config_id = s.id WHERE p.slug = ? AND p.sso_enabled = 1",
  ).bind(slug).first<SsoConfig>();

  if (!project || !project.oidc_issuer || !project.oidc_client_id || !project.oidc_client_secret) {
    return c.json({ error: "OIDC not configured" }, 404);
  }

  try {
    const endpoints = await discoverOidcEndpoints(project.oidc_issuer);
    const host = c.req.header("host") || "api.tome.center";
    const redirectUri = `https://${host}/api/sso/sites/${slug}/oidc/callback`;

    const tokens = await exchangeCode({
      tokenEndpoint: endpoints.token_endpoint,
      clientId: project.oidc_client_id,
      clientSecret: project.oidc_client_secret,
      code,
      redirectUri,
      codeVerifier: storedState.codeVerifier,
    });

    const claims = await validateIdToken(
      tokens.id_token,
      endpoints.jwks_uri,
      project.oidc_client_id,
      project.oidc_issuer,
    );

    if (!claims.email) {
      return c.json({ error: "No email in ID token" }, 400);
    }

    // Check allowed domains
    if (project.allowed_domains) {
      const domains = JSON.parse(project.allowed_domains) as string[];
      const emailDomain = claims.email.split("@")[1];
      if (domains.length > 0 && !domains.includes(emailDomain)) {
        return c.json({ error: "Email domain not allowed" }, 403);
      }
    }

    // Create SSO session
    const secret = c.env.SSO_SESSION_SECRET;
    const sessionToken = await createSsoSession(secret, {
      slug,
      email: claims.email,
      groups: claims.groups,
    });

    const headers = new Headers();
    headers.set("Set-Cookie", `tome_sso_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`);
    // Clear state cookie
    headers.append("Set-Cookie", "tome_sso_state=; Path=/; Max-Age=0");
    headers.set("Location", "/");
    return new Response(null, { status: 302, headers });
  } catch (err) {
    return c.json({ error: `OIDC validation failed: ${(err as Error).message}` }, 401);
  }
});

// ── Public: SP Metadata ─────────────────────────────────

sso.get("/sites/:slug/metadata", async (c) => {
  const slug = c.req.param("slug");
  const host = c.req.header("host") || "api.tome.center";
  const baseUrl = `https://${host}`;
  const entityId = `${baseUrl}/api/sso/sites/${slug}/metadata`;
  const acsUrl = `${baseUrl}/api/sso/sites/${slug}/saml/acs`;

  const metadata = buildSpMetadata(entityId, acsUrl);
  return new Response(metadata, {
    headers: { "Content-Type": "application/xml" },
  });
});

// ── Authenticated: SSO Config Management ────────────────

sso.post("/config", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{
    projectSlug: string;
    ssoType: "saml" | "oidc";
    samlIdpSsoUrl?: string;
    samlIdpCertificate?: string;
    samlEntityId?: string;
    oidcIssuer?: string;
    oidcClientId?: string;
    oidcClientSecret?: string;
    allowedDomains?: string[];
  }>();

  if (!body.projectSlug || !body.ssoType) {
    return c.json({ error: "Missing projectSlug or ssoType" }, 400);
  }

  const project = await c.env.TOME_DB.prepare(
    "SELECT id FROM projects WHERE slug = ? AND user_id = ?",
  ).bind(body.projectSlug, user.id).first<{ id: string }>();

  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  const configId = crypto.randomUUID();
  await c.env.TOME_DB.prepare(
    `INSERT INTO sso_configs (id, project_id, sso_type, enabled, saml_idp_sso_url, saml_idp_certificate, saml_entity_id, oidc_issuer, oidc_client_id, oidc_client_secret, allowed_domains)
     VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    configId,
    project.id,
    body.ssoType,
    body.samlIdpSsoUrl || null,
    body.samlIdpCertificate || null,
    body.samlEntityId || null,
    body.oidcIssuer || null,
    body.oidcClientId || null,
    body.oidcClientSecret || null,
    body.allowedDomains ? JSON.stringify(body.allowedDomains) : null,
  ).run();

  await c.env.TOME_DB.prepare(
    "UPDATE projects SET sso_enabled = 1, sso_config_id = ? WHERE id = ?",
  ).bind(configId, project.id).run();

  return c.json({ ok: true, configId });
});

sso.get("/config/:slug", async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug");

  const config = await c.env.TOME_DB.prepare(
    `SELECT s.* FROM sso_configs s
     JOIN projects p ON s.project_id = p.id
     WHERE p.slug = ? AND p.user_id = ?`,
  ).bind(slug, user.id).first<SsoConfig>();

  if (!config) {
    return c.json({ error: "SSO not configured" }, 404);
  }

  return c.json({
    id: config.id,
    ssoType: config.sso_type,
    enabled: config.enabled === 1,
    samlIdpSsoUrl: config.saml_idp_sso_url,
    samlEntityId: config.saml_entity_id,
    oidcIssuer: config.oidc_issuer,
    oidcClientId: config.oidc_client_id,
    allowedDomains: config.allowed_domains ? JSON.parse(config.allowed_domains) : [],
  });
});

sso.delete("/config/:slug", async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug");

  const project = await c.env.TOME_DB.prepare(
    "SELECT id, sso_config_id FROM projects WHERE slug = ? AND user_id = ?",
  ).bind(slug, user.id).first<{ id: string; sso_config_id: string | null }>();

  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  if (project.sso_config_id) {
    await c.env.TOME_DB.prepare("DELETE FROM sso_configs WHERE id = ?").bind(project.sso_config_id).run();
  }

  await c.env.TOME_DB.prepare(
    "UPDATE projects SET sso_enabled = 0, sso_config_id = NULL WHERE id = ?",
  ).bind(project.id).run();

  return c.json({ ok: true });
});

export { sso };
