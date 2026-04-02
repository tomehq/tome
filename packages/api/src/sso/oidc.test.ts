import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  generateCodeVerifier,
  generateCodeChallenge,
  buildAuthorizationUrl,
  decodeJwtPayload,
  discoverOidcEndpoints,
  exchangeCode,
} from "./oidc";
import { base64url } from "../utils";

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe("OIDC utilities", () => {
  describe("generateCodeVerifier", () => {
    it("returns a string of valid length (43+)", () => {
      const verifier = generateCodeVerifier();
      expect(verifier.length).toBeGreaterThanOrEqual(43);
    });

    it("contains only base64url characters", () => {
      const verifier = generateCodeVerifier();
      expect(verifier).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    it("generates unique values", () => {
      const v1 = generateCodeVerifier();
      const v2 = generateCodeVerifier();
      expect(v1).not.toBe(v2);
    });
  });

  describe("generateCodeChallenge", () => {
    it("returns a base64url-encoded string", async () => {
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      expect(challenge).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    it("produces different challenges for different verifiers", async () => {
      const c1 = await generateCodeChallenge("verifier-one");
      const c2 = await generateCodeChallenge("verifier-two");
      expect(c1).not.toBe(c2);
    });

    it("produces consistent challenge for same verifier", async () => {
      const c1 = await generateCodeChallenge("same-verifier");
      const c2 = await generateCodeChallenge("same-verifier");
      expect(c1).toBe(c2);
    });
  });

  describe("buildAuthorizationUrl", () => {
    const baseParams = {
      authorizationEndpoint: "https://idp.example.com/authorize",
      clientId: "my-client-id",
      redirectUri: "https://app.example.com/callback",
      state: "random-state",
      codeChallenge: "challenge123",
    };

    it("includes all required PKCE params", () => {
      const url = buildAuthorizationUrl(baseParams);
      const parsed = new URL(url);

      expect(parsed.searchParams.get("response_type")).toBe("code");
      expect(parsed.searchParams.get("client_id")).toBe("my-client-id");
      expect(parsed.searchParams.get("redirect_uri")).toBe("https://app.example.com/callback");
      expect(parsed.searchParams.get("state")).toBe("random-state");
      expect(parsed.searchParams.get("code_challenge")).toBe("challenge123");
      expect(parsed.searchParams.get("code_challenge_method")).toBe("S256");
    });

    it("uses default scope openid email profile", () => {
      const url = buildAuthorizationUrl(baseParams);
      const parsed = new URL(url);
      expect(parsed.searchParams.get("scope")).toBe("openid email profile");
    });

    it("allows custom scope", () => {
      const url = buildAuthorizationUrl({ ...baseParams, scope: "openid groups" });
      const parsed = new URL(url);
      expect(parsed.searchParams.get("scope")).toBe("openid groups");
    });
  });

  describe("decodeJwtPayload", () => {
    it("decodes a valid JWT payload", () => {
      const header = base64url(JSON.stringify({ alg: "RS256" }));
      const payload = base64url(JSON.stringify({ sub: "123", email: "a@b.com" }));
      const jwt = `${header}.${payload}.fakesig`;

      const result = decodeJwtPayload(jwt);
      expect(result.sub).toBe("123");
      expect(result.email).toBe("a@b.com");
    });

    it("throws on invalid JWT format (not 3 parts)", () => {
      expect(() => decodeJwtPayload("only.two")).toThrow("Invalid JWT format");
      expect(() => decodeJwtPayload("one")).toThrow("Invalid JWT format");
    });

    it("throws on invalid base64 payload", () => {
      expect(() => decodeJwtPayload("a.!!!.c")).toThrow();
    });
  });

  describe("exchangeCode", () => {
    it("sends correct POST request to token endpoint", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          access_token: "at_123",
          id_token: "idt_456",
          token_type: "Bearer",
        }),
      });

      const result = await exchangeCode({
        tokenEndpoint: "https://idp.example.com/token",
        clientId: "client-id",
        clientSecret: "client-secret",
        code: "auth-code",
        redirectUri: "https://app.example.com/callback",
        codeVerifier: "verifier",
      });

      expect(result.access_token).toBe("at_123");
      expect(result.id_token).toBe("idt_456");

      // Verify fetch was called correctly
      expect(mockFetch).toHaveBeenCalledWith("https://idp.example.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: expect.stringContaining("grant_type=authorization_code"),
      });

      const body = new URLSearchParams(mockFetch.mock.calls[0][1].body);
      expect(body.get("client_id")).toBe("client-id");
      expect(body.get("code")).toBe("auth-code");
      expect(body.get("code_verifier")).toBe("verifier");
    });

    it("throws on non-ok response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => "invalid_grant",
      });

      await expect(
        exchangeCode({
          tokenEndpoint: "https://idp.example.com/token",
          clientId: "c",
          clientSecret: "s",
          code: "bad",
          redirectUri: "https://app.example.com/callback",
          codeVerifier: "v",
        }),
      ).rejects.toThrow("Token exchange failed (400)");
    });

    it("throws when response missing required fields", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: "at" }), // missing id_token
      });

      await expect(
        exchangeCode({
          tokenEndpoint: "https://idp.example.com/token",
          clientId: "c",
          clientSecret: "s",
          code: "code",
          redirectUri: "https://app.example.com/callback",
          codeVerifier: "v",
        }),
      ).rejects.toThrow("missing required fields");
    });
  });

  describe("discoverOidcEndpoints", () => {
    it("fetches and returns endpoints from well-known config", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          authorization_endpoint: "https://idp.example.com/authorize",
          token_endpoint: "https://idp.example.com/token",
          userinfo_endpoint: "https://idp.example.com/userinfo",
          jwks_uri: "https://idp.example.com/.well-known/jwks.json",
        }),
      });

      const endpoints = await discoverOidcEndpoints("https://idp.example.com");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://idp.example.com/.well-known/openid-configuration",
      );
      expect(endpoints.authorization_endpoint).toBe("https://idp.example.com/authorize");
      expect(endpoints.jwks_uri).toBe("https://idp.example.com/.well-known/jwks.json");
    });

    it("strips trailing slash from issuer", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          authorization_endpoint: "a",
          token_endpoint: "b",
          userinfo_endpoint: "c",
          jwks_uri: "d",
        }),
      });

      await discoverOidcEndpoints("https://idp.example.com/");
      expect(mockFetch).toHaveBeenCalledWith(
        "https://idp.example.com/.well-known/openid-configuration",
      );
    });

    it("throws on non-ok response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "not found",
      });

      await expect(discoverOidcEndpoints("https://bad.example.com")).rejects.toThrow(
        "OIDC discovery failed (404)",
      );
    });

    it("throws when required field is missing", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          authorization_endpoint: "a",
          // missing token_endpoint, userinfo_endpoint, jwks_uri
        }),
      });

      await expect(discoverOidcEndpoints("https://idp.example.com")).rejects.toThrow(
        "missing required field",
      );
    });
  });
});
