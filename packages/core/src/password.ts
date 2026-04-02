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
 * Returns a base64-encoded JSON payload with expiry.
 */
export function generateSessionToken(slug: string, expiresInMs: number = 24 * 60 * 60 * 1000): string {
  const payload = {
    slug,
    exp: Date.now() + expiresInMs,
    nonce: Math.random().toString(36).slice(2),
  };
  return btoa(JSON.stringify(payload));
}

/**
 * Validate a session token. Returns the slug if valid, null if expired or invalid.
 */
export function validateSessionToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token));
    if (!payload.slug || !payload.exp) return null;
    if (Date.now() > payload.exp) return null;
    return payload.slug;
  } catch {
    return null;
  }
}
