import { describe, it, expect, vi, afterEach } from "vitest";
import { createSsoSession, validateSsoSession } from "./session";
import { base64url } from "../utils";

const SECRET = "test-secret-key-for-hmac-signing";

describe("SSO session tokens", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("createSsoSession", () => {
    it("returns a JWT with 3 dot-separated parts", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
      });
      const parts = token.split(".");
      expect(parts).toHaveLength(3);
    });

    it("contains correct header", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
      });
      const header = JSON.parse(atob(b64urlToB64(token.split(".")[0])));
      expect(header.alg).toBe("HS256");
      expect(header.typ).toBe("JWT");
    });

    it("contains slug, email, iat, and exp in payload", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
      });
      const payload = decodePayload(token);
      expect(payload.slug).toBe("my-project");
      expect(payload.email).toBe("user@example.com");
      expect(payload.iat).toBeTypeOf("number");
      expect(payload.exp).toBeTypeOf("number");
      expect(payload.exp).toBeGreaterThan(payload.iat);
    });

    it("includes groups when provided", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
        groups: ["admin", "dev"],
      });
      const payload = decodePayload(token);
      expect(payload.groups).toEqual(["admin", "dev"]);
    });

    it("omits groups when not provided", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
      });
      const payload = decodePayload(token);
      expect(payload.groups).toBeUndefined();
    });

    it("defaults to 8-hour expiry", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "s",
        email: "a@b.com",
      });
      const payload = decodePayload(token);
      const diff = payload.exp - payload.iat;
      expect(diff).toBe(8 * 60 * 60); // 8 hours in seconds
    });

    it("supports custom expiry", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "s",
        email: "a@b.com",
        expiresInMs: 60 * 60 * 1000, // 1 hour
      });
      const payload = decodePayload(token);
      const diff = payload.exp - payload.iat;
      expect(diff).toBe(60 * 60); // 1 hour in seconds
    });
  });

  describe("validateSsoSession", () => {
    it("validates a fresh token successfully", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
        groups: ["admin"],
      });

      const result = await validateSsoSession(SECRET, token, "my-project");
      expect(result).not.toBeNull();
      expect(result!.email).toBe("user@example.com");
      expect(result!.groups).toEqual(["admin"]);
    });

    it("returns null for expired token", async () => {
      // Create a token that's already expired (negative expiry)
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
        expiresInMs: -10_000, // Already expired 10 seconds ago
      });

      const result = await validateSsoSession(SECRET, token, "my-project");
      expect(result).toBeNull();
    });

    it("returns null for wrong slug", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "project-a",
        email: "user@example.com",
      });

      const result = await validateSsoSession(SECRET, token, "project-b");
      expect(result).toBeNull();
    });

    it("returns null for tampered payload", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
      });

      // Tamper with payload
      const parts = token.split(".");
      const payload = JSON.parse(atob(b64urlToB64(parts[1])));
      payload.email = "hacker@evil.com";
      parts[1] = base64url(JSON.stringify(payload));
      const tampered = parts.join(".");

      const result = await validateSsoSession(SECRET, tampered, "my-project");
      expect(result).toBeNull();
    });

    it("returns null for invalid signature", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
      });

      // Replace signature with garbage
      const parts = token.split(".");
      parts[2] = base64url("invalid-signature-data");
      const invalid = parts.join(".");

      const result = await validateSsoSession(SECRET, invalid, "my-project");
      expect(result).toBeNull();
    });

    it("returns null for wrong secret", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
      });

      const result = await validateSsoSession("wrong-secret", token, "my-project");
      expect(result).toBeNull();
    });

    it("returns null for malformed token (not 3 parts)", async () => {
      const result = await validateSsoSession(SECRET, "not.a.valid.jwt.token", "slug");
      expect(result).toBeNull();

      const result2 = await validateSsoSession(SECRET, "just-one-part", "slug");
      expect(result2).toBeNull();
    });

    it("returns null for empty token", async () => {
      const result = await validateSsoSession(SECRET, "", "slug");
      expect(result).toBeNull();
    });

    it("returns claims without groups when none were set", async () => {
      const token = await createSsoSession(SECRET, {
        slug: "my-project",
        email: "user@example.com",
      });

      const result = await validateSsoSession(SECRET, token, "my-project");
      expect(result).not.toBeNull();
      expect(result!.email).toBe("user@example.com");
      expect(result!.groups).toBeUndefined();
    });
  });
});

// ── Test helpers ──────────────────────────────────────

function b64urlToB64(input: string): string {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4 !== 0) s += "=";
  return s;
}

function decodePayload(jwt: string): Record<string, any> {
  const parts = jwt.split(".");
  return JSON.parse(atob(b64urlToB64(parts[1])));
}
