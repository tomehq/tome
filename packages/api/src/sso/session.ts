/**
 * SSO session tokens using HMAC-SHA256 for Tome Cloud.
 * Uses Web Crypto API (Cloudflare Workers compatible, no Node.js crypto).
 *
 * Unlike the unsigned base64 tokens in password.ts, these are
 * cryptographically signed JWTs suitable for SSO sessions.
 */

import { base64url, base64urlToBase64 } from "../utils.js";

const DEFAULT_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 hours

/**
 * Create a signed JWT session token using HMAC-SHA256.
 */
export async function createSsoSession(
  secret: string,
  payload: {
    slug: string;
    email: string;
    groups?: string[];
    expiresInMs?: number;
  },
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiresInSec = Math.floor((payload.expiresInMs ?? DEFAULT_EXPIRY_MS) / 1000);

  const header = { alg: "HS256", typ: "JWT" };
  const body = {
    slug: payload.slug,
    email: payload.email,
    ...(payload.groups && { groups: payload.groups }),
    iat: now,
    exp: now + expiresInSec,
  };

  const headerB64 = base64url(JSON.stringify(header));
  const bodyB64 = base64url(JSON.stringify(body));
  const signingInput = `${headerB64}.${bodyB64}`;

  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signingInput));

  return `${signingInput}.${base64url(sig)}`;
}

/**
 * Validate a signed SSO session token.
 * Returns the claims if valid, null if invalid/expired/wrong slug.
 */
export async function validateSsoSession(
  secret: string,
  token: string,
  slug: string,
): Promise<{ email: string; groups?: string[] } | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const signingInput = `${parts[0]}.${parts[1]}`;

  // Verify HMAC signature
  let valid: boolean;
  try {
    const key = await importHmacKey(secret);
    const expectedSig = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(signingInput),
    );
    const actualSig = base64urlDecode(parts[2]);
    valid = timingSafeEqual(new Uint8Array(expectedSig), actualSig);
  } catch {
    return null;
  }

  if (!valid) return null;

  // Decode and validate payload
  let payload: Record<string, unknown>;
  try {
    const payloadJson = atob(base64urlToBase64(parts[1]));
    payload = JSON.parse(payloadJson);
  } catch {
    return null;
  }

  // Check required fields
  if (typeof payload.slug !== "string" || typeof payload.email !== "string") return null;
  if (typeof payload.exp !== "number") return null;

  // Check slug match
  if (payload.slug !== slug) return null;

  // Check expiry
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) return null;

  return {
    email: payload.email as string,
    ...(Array.isArray(payload.groups) && { groups: payload.groups as string[] }),
  };
}

// ── Internal helpers ──────────────────────────────────────

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

function base64urlDecode(input: string): Uint8Array {
  return Uint8Array.from(atob(base64urlToBase64(input)), (c) => c.charCodeAt(0));
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }
  return mismatch === 0;
}
