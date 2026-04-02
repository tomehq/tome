/**
 * Password protection utilities for Tome Cloud sites.
 * Uses Web Crypto API (available in Cloudflare Workers and Node 18+).
 */

/**
 * Hash a password using PBKDF2 with SHA-256.
 * Returns a string format: "pbkdf2:iterations:salt:hash" (all base64).
 */
export async function hashPassword(password: string): Promise<string> {
  const iterations = 100_000;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  const saltB64 = btoa(String.fromCharCode(...salt));
  const hashB64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
  return `pbkdf2:${iterations}:${saltB64}:${hashB64}`;
}

/**
 * Verify a password against a stored hash.
 */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(":");
  if (parts[0] !== "pbkdf2" || parts.length !== 4) return false;

  const iterations = parseInt(parts[1], 10);
  const salt = Uint8Array.from(atob(parts[2]), (c) => c.charCodeAt(0));
  const expectedHash = parts[3];

  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  const hashB64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
  return hashB64 === expectedHash;
}

/**
 * Generate a signed session token for password-protected site access.
 * Uses HMAC-SHA256 to prevent token forgery.
 * Returns "payloadB64.signatureB64" format.
 */
export async function generateSessionToken(slug: string, secret: string, expiresInMs: number = 24 * 60 * 60 * 1000): Promise<string> {
  const payload = {
    slug,
    exp: Date.now() + expiresInMs,
    nonce: Math.random().toString(36).slice(2),
  };
  const payloadB64 = btoa(JSON.stringify(payload));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return `${payloadB64}.${sigB64}`;
}

/**
 * Validate a signed session token. Returns the slug if valid, null if expired/invalid/tampered.
 */
export async function validateSessionToken(token: string, secret: string): Promise<string | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payloadB64, sigB64] = parts;

    // Verify HMAC signature
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const sig = Uint8Array.from(atob(sigB64), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify("HMAC", key, sig, new TextEncoder().encode(payloadB64));
    if (!valid) return null;

    const payload = JSON.parse(atob(payloadB64));
    if (!payload.slug || !payload.exp) return null;
    if (Date.now() > payload.exp) return null;
    return payload.slug;
  } catch {
    return null;
  }
}
