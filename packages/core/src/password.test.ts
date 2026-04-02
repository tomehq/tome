import { describe, it, expect } from "vitest";
import {
  hashPassword,
  verifyPassword,
  generateSessionToken,
  validateSessionToken,
} from "./password.js";

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
  it("returns a base64-encoded string", () => {
    const token = generateSessionToken("my-docs");
    expect(() => atob(token)).not.toThrow();
  });

  it("includes the slug in the payload", () => {
    const token = generateSessionToken("my-docs");
    const payload = JSON.parse(atob(token));
    expect(payload.slug).toBe("my-docs");
  });

  it("includes an expiry timestamp", () => {
    const token = generateSessionToken("my-docs");
    const payload = JSON.parse(atob(token));
    expect(payload.exp).toBeGreaterThan(Date.now());
  });

  it("respects custom expiry duration", () => {
    const token = generateSessionToken("my-docs", 1000); // 1 second
    const payload = JSON.parse(atob(token));
    expect(payload.exp).toBeLessThanOrEqual(Date.now() + 1500);
  });
});

describe("validateSessionToken", () => {
  it("returns slug for a valid token", () => {
    const token = generateSessionToken("my-docs");
    const slug = validateSessionToken(token);
    expect(slug).toBe("my-docs");
  });

  it("returns null for expired token", () => {
    const token = generateSessionToken("my-docs", -1000); // Already expired
    const slug = validateSessionToken(token);
    expect(slug).toBeNull();
  });

  it("returns null for invalid base64", () => {
    const slug = validateSessionToken("not-base64!!!@@@");
    expect(slug).toBeNull();
  });

  it("returns null for empty string", () => {
    const slug = validateSessionToken("");
    expect(slug).toBeNull();
  });

  it("returns null for token missing slug", () => {
    const token = btoa(JSON.stringify({ exp: Date.now() + 10000 }));
    const slug = validateSessionToken(token);
    expect(slug).toBeNull();
  });

  it("returns null for token missing exp", () => {
    const token = btoa(JSON.stringify({ slug: "test" }));
    const slug = validateSessionToken(token);
    expect(slug).toBeNull();
  });
});
