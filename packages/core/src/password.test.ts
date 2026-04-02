import { describe, it, expect } from "vitest";
import {
  hashPassword,
  verifyPassword,
  generateSessionToken,
  validateSessionToken,
} from "./password.js";

const TEST_SECRET = "test-secret-key-for-hmac-signing";

// ── hashPassword / verifyPassword ────────────────────────

describe("hashPassword", () => {
  it("returns a pbkdf2-formatted hash string", async () => {
    const hash = await hashPassword("mysecret");
    expect(hash).toMatch(/^pbkdf2:\d+:[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+$/);
  });

  it("generates different hashes for same password (different salt)", async () => {
    const hash1 = await hashPassword("same-password");
    const hash2 = await hashPassword("same-password");
    expect(hash1).not.toBe(hash2);
  });

  it("uses 100000 iterations", async () => {
    const hash = await hashPassword("test");
    const iterations = hash.split(":")[1];
    expect(iterations).toBe("100000");
  });
});

describe("verifyPassword", () => {
  it("returns true for correct password", async () => {
    const hash = await hashPassword("correct-horse");
    const result = await verifyPassword("correct-horse", hash);
    expect(result).toBe(true);
  });

  it("returns false for incorrect password", async () => {
    const hash = await hashPassword("correct-horse");
    const result = await verifyPassword("wrong-password", hash);
    expect(result).toBe(false);
  });

  it("returns false for malformed hash", async () => {
    const result = await verifyPassword("test", "not-a-valid-hash");
    expect(result).toBe(false);
  });

  it("returns false for empty hash", async () => {
    const result = await verifyPassword("test", "");
    expect(result).toBe(false);
  });

  it("handles empty password", async () => {
    const hash = await hashPassword("");
    const result = await verifyPassword("", hash);
    expect(result).toBe(true);
  });
});

// ── Session tokens ───────────────────────────────────────

describe("generateSessionToken", () => {
  it("returns a payload.signature format string", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET);
    const parts = token.split(".");
    expect(parts).toHaveLength(2);
    // Payload part should be valid base64
    expect(() => atob(parts[0])).not.toThrow();
  });

  it("includes the slug in the payload", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET);
    const payloadB64 = token.split(".")[0];
    const payload = JSON.parse(atob(payloadB64));
    expect(payload.slug).toBe("my-docs");
  });

  it("includes an expiry timestamp", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET);
    const payloadB64 = token.split(".")[0];
    const payload = JSON.parse(atob(payloadB64));
    expect(payload.exp).toBeGreaterThan(Date.now());
  });

  it("respects custom expiry duration", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET, 1000); // 1 second
    const payloadB64 = token.split(".")[0];
    const payload = JSON.parse(atob(payloadB64));
    expect(payload.exp).toBeLessThanOrEqual(Date.now() + 1500);
  });
});

describe("validateSessionToken", () => {
  it("returns slug for a valid token", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET);
    const slug = await validateSessionToken(token, TEST_SECRET);
    expect(slug).toBe("my-docs");
  });

  it("returns null for expired token", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET, -1000); // Already expired
    const slug = await validateSessionToken(token, TEST_SECRET);
    expect(slug).toBeNull();
  });

  it("returns null for invalid format (no signature)", async () => {
    const slug = await validateSessionToken("not-base64!!!@@@", TEST_SECRET);
    expect(slug).toBeNull();
  });

  it("returns null for empty string", async () => {
    const slug = await validateSessionToken("", TEST_SECRET);
    expect(slug).toBeNull();
  });

  it("returns null for token with wrong secret", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET);
    const slug = await validateSessionToken(token, "wrong-secret");
    expect(slug).toBeNull();
  });

  it("returns null for tampered payload", async () => {
    const token = await generateSessionToken("my-docs", TEST_SECRET);
    const [, sig] = token.split(".");
    // Create a different payload
    const tamperedPayload = btoa(JSON.stringify({ slug: "hacked", exp: Date.now() + 100000 }));
    const slug = await validateSessionToken(`${tamperedPayload}.${sig}`, TEST_SECRET);
    expect(slug).toBeNull();
  });

  it("returns null for unsigned token (old format)", async () => {
    // Simulate old unsigned token format (plain base64, no signature)
    const oldToken = btoa(JSON.stringify({ slug: "my-docs", exp: Date.now() + 100000 }));
    const slug = await validateSessionToken(oldToken, TEST_SECRET);
    expect(slug).toBeNull();
  });
});
