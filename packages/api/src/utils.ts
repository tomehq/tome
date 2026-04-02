/**
 * Shared utility functions for Tome Cloud API.
 */

/**
 * Base64url encoding helper (RFC 4648 section 5).
 * Accepts a string or ArrayBuffer and returns URL-safe base64 without padding.
 */
export function base64url(input: string | ArrayBuffer): string {
  const bytes = typeof input === "string"
    ? new TextEncoder().encode(input)
    : new Uint8Array(input);
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Convert base64url back to standard base64 (with padding).
 */
export function base64urlToBase64(input: string): string {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4 !== 0) s += "=";
  return s;
}
