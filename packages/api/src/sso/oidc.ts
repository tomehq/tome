/**
 * OpenID Connect utilities for Tome Cloud SSO.
 * Uses Web Crypto API (Cloudflare Workers compatible, no Node.js crypto).
 */

/**
 * Discover OIDC endpoints from the issuer's well-known configuration.
 */
export async function discoverOidcEndpoints(issuer: string): Promise<{
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  jwks_uri: string;
}> {
  const url = `${issuer.replace(/\/$/, "")}/.well-known/openid-configuration`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`OIDC discovery failed (${res.status}): ${await res.text()}`);
  }

  const config = (await res.json()) as Record<string, unknown>;
  const required = ["authorization_endpoint", "token_endpoint", "userinfo_endpoint", "jwks_uri"] as const;
  for (const key of required) {
    if (typeof config[key] !== "string") {
      throw new Error(`OIDC discovery missing required field: ${key}`);
    }
  }

  return {
    authorization_endpoint: config.authorization_endpoint as string,
    token_endpoint: config.token_endpoint as string,
    userinfo_endpoint: config.userinfo_endpoint as string,
    jwks_uri: config.jwks_uri as string,
  };
}

/**
 * Generate a PKCE code verifier (43-128 character random string).
 */
export function generateCodeVerifier(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return base64url(bytes.buffer as ArrayBuffer);
}

/**
 * Generate a PKCE code challenge (SHA-256 hash of verifier, base64url encoded).
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return base64url(hash);
}

/**
 * Build the OIDC authorization URL with PKCE parameters.
 */
export function buildAuthorizationUrl(params: {
  authorizationEndpoint: string;
  clientId: string;
  redirectUri: string;
  state: string;
  codeChallenge: string;
  scope?: string;
}): string {
  const url = new URL(params.authorizationEndpoint);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", params.clientId);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("state", params.state);
  url.searchParams.set("code_challenge", params.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("scope", params.scope ?? "openid email profile");
  return url.toString();
}

/**
 * Exchange an authorization code for tokens.
 */
export async function exchangeCode(params: {
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
  codeVerifier: string;
}): Promise<{ access_token: string; id_token: string; token_type: string }> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: params.clientId,
    client_secret: params.clientSecret,
    code: params.code,
    redirect_uri: params.redirectUri,
    code_verifier: params.codeVerifier,
  });

  const res = await fetch(params.tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${err}`);
  }

  const data = (await res.json()) as Record<string, unknown>;
  if (typeof data.access_token !== "string" || typeof data.id_token !== "string") {
    throw new Error("Token response missing required fields");
  }

  return {
    access_token: data.access_token as string,
    id_token: data.id_token as string,
    token_type: (data.token_type as string) ?? "Bearer",
  };
}

/**
 * Validate a JWT id_token: decode, verify RS256 signature via JWKS, check claims.
 */
export async function validateIdToken(
  idToken: string,
  jwksUri: string,
  clientId: string,
  issuer: string,
): Promise<{ sub: string; email: string; name?: string; groups?: string[] }> {
  const parts = idToken.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT format");

  const header = JSON.parse(atob(base64urlToBase64(parts[0]))) as { alg: string; kid?: string };
  if (header.alg !== "RS256") throw new Error(`Unsupported JWT algorithm: ${header.alg}`);

  const payload = JSON.parse(atob(base64urlToBase64(parts[1]))) as Record<string, unknown>;

  // Validate standard claims
  if (payload.iss !== issuer) throw new Error(`Invalid issuer: expected ${issuer}, got ${payload.iss}`);
  if (payload.aud !== clientId) throw new Error(`Invalid audience: expected ${clientId}, got ${payload.aud}`);

  const now = Math.floor(Date.now() / 1000);
  if (typeof payload.exp === "number" && payload.exp < now) {
    throw new Error("Token expired");
  }

  // Fetch JWKS and verify signature
  const jwksRes = await fetch(jwksUri);
  if (!jwksRes.ok) throw new Error(`Failed to fetch JWKS (${jwksRes.status})`);

  const jwks = (await jwksRes.json()) as { keys: JwkKey[] };
  const matchingKey = header.kid
    ? jwks.keys.find((k) => k.kid === header.kid)
    : jwks.keys.find((k) => k.kty === "RSA" && k.use === "sig");

  if (!matchingKey) throw new Error("No matching key found in JWKS");

  const cryptoKey = await crypto.subtle.importKey(
    "jwk",
    matchingKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );

  const sigBytes = Uint8Array.from(atob(base64urlToBase64(parts[2])), (c) => c.charCodeAt(0));
  const dataBytes = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);

  const valid = await crypto.subtle.verify(
    { name: "RSASSA-PKCS1-v1_5" },
    cryptoKey,
    sigBytes,
    dataBytes,
  );

  if (!valid) throw new Error("Invalid JWT signature");

  if (typeof payload.sub !== "string") throw new Error("Missing sub claim");
  if (typeof payload.email !== "string") throw new Error("Missing email claim");

  return {
    sub: payload.sub,
    email: payload.email as string,
    ...(typeof payload.name === "string" && { name: payload.name }),
    ...(Array.isArray(payload.groups) && { groups: payload.groups as string[] }),
  };
}

/**
 * Decode a JWT payload without verification (for inspection only).
 */
export function decodeJwtPayload(jwt: string): Record<string, unknown> {
  const parts = jwt.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT format");
  try {
    return JSON.parse(atob(base64urlToBase64(parts[1])));
  } catch {
    throw new Error("Invalid JWT payload encoding");
  }
}

// ── Helpers ──────────────────────────────────────

interface JwkKey {
  kty: string;
  kid?: string;
  use?: string;
  n?: string;
  e?: string;
  [key: string]: unknown;
}

export function base64url(input: string | ArrayBuffer): string {
  const bytes = typeof input === "string"
    ? new TextEncoder().encode(input)
    : new Uint8Array(input);
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlToBase64(input: string): string {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4 !== 0) s += "=";
  return s;
}
