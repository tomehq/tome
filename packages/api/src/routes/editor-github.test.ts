/**
 * Tests for GitHub sync module (syncToGitHub).
 *
 * Mocks fetch and getInstallationToken to validate:
 * - Early return when GitHub App env vars are missing
 * - Correct Contents API calls for creating and updating files
 * - Base64 encoding of content
 * - SHA inclusion when updating existing files
 * - Graceful null return on API errors
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the github-app module so getInstallationToken is controlled
vi.mock("../github-app.js", () => ({
  getInstallationToken: vi.fn().mockResolvedValue("ghs_mock_token_123"),
}));

import { syncToGitHub } from "./editor-github.js";
import { getInstallationToken } from "../github-app.js";
import type { Env } from "../types.js";

const mockedGetInstallationToken = vi.mocked(getInstallationToken);

// Minimal Env with GitHub App credentials present
function makeEnv(overrides: Partial<Env> = {}): Env {
  return {
    TOME_BUCKET: {} as any,
    TOME_DB: {} as any,
    STRIPE_SECRET_KEY: "sk_test",
    STRIPE_WEBHOOK_SECRET: "whsec_test",
    CLOUDFLARE_API_TOKEN: "cf_test",
    CLOUDFLARE_ZONE_ID: "zone_test",
    GITHUB_CLIENT_ID: "gh_client",
    GITHUB_CLIENT_SECRET: "gh_secret",
    GOOGLE_CLIENT_ID: "g_client",
    GOOGLE_CLIENT_SECRET: "g_secret",
    GITHUB_APP_ID: "12345",
    GITHUB_APP_PRIVATE_KEY: "fake-test-key-not-real",
    GITHUB_APP_WEBHOOK_SECRET: "whsec_gh",
    SSO_SESSION_SECRET: "sso_secret",
    ENVIRONMENT: "test",
    ...overrides,
  };
}

const baseOptions = {
  owner: "tomehq",
  repo: "docs",
  branch: "main",
  installationId: 42,
  filePath: "docs/getting-started.md",
  content: "# Getting Started\n\nHello world.",
  commitMessage: "Update getting-started.md via Tome editor",
};

beforeEach(() => {
  vi.restoreAllMocks();
  mockedGetInstallationToken.mockResolvedValue("ghs_mock_token_123");
});

describe("syncToGitHub", () => {
  it("returns null when GITHUB_APP_ID is missing", async () => {
    const env = makeEnv({ GITHUB_APP_ID: "" });
    const result = await syncToGitHub({ ...baseOptions, env });
    expect(result).toBeNull();
    expect(mockedGetInstallationToken).not.toHaveBeenCalled();
  });

  it("returns null when GITHUB_APP_PRIVATE_KEY is missing", async () => {
    const env = makeEnv({ GITHUB_APP_PRIVATE_KEY: "" });
    const result = await syncToGitHub({ ...baseOptions, env });
    expect(result).toBeNull();
  });

  it("calls getInstallationToken with correct args", async () => {
    const env = makeEnv();

    // Mock fetch: GET (file not found), PUT (success)
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 404 }) // GET contents
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ content: { sha: "abc123" } }),
      }); // PUT contents
    vi.stubGlobal("fetch", mockFetch);

    await syncToGitHub({ ...baseOptions, env });

    expect(mockedGetInstallationToken).toHaveBeenCalledWith(
      42,
      "12345",
      expect.stringContaining("fake-test-key"),
    );

    vi.unstubAllGlobals();
  });

  it("creates a new file when it does not exist", async () => {
    const env = makeEnv();

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 404 }) // GET — not found
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ content: { sha: "new_sha_456" } }),
      });
    vi.stubGlobal("fetch", mockFetch);

    const result = await syncToGitHub({ ...baseOptions, env });

    expect(result).toEqual({ sha: "new_sha_456" });

    // Verify PUT call
    const putCall = mockFetch.mock.calls[1];
    expect(putCall[0]).toContain("/contents/docs/getting-started.md");
    expect(putCall[1].method).toBe("PUT");

    const body = JSON.parse(putCall[1].body);
    expect(body.message).toBe(baseOptions.commitMessage);
    expect(body.branch).toBe("main");
    // Should NOT have sha for new file
    expect(body.sha).toBeUndefined();

    vi.unstubAllGlobals();
  });

  it("includes SHA in PUT body when file already exists", async () => {
    const env = makeEnv();

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ sha: "existing_sha_789" }),
      }) // GET — found
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ content: { sha: "updated_sha_012" } }),
      }); // PUT — updated
    vi.stubGlobal("fetch", mockFetch);

    const result = await syncToGitHub({ ...baseOptions, env });

    expect(result).toEqual({ sha: "updated_sha_012" });

    const putCall = mockFetch.mock.calls[1];
    const body = JSON.parse(putCall[1].body);
    expect(body.sha).toBe("existing_sha_789");

    vi.unstubAllGlobals();
  });

  it("base64 encodes the content in the PUT body", async () => {
    const env = makeEnv();

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ content: { sha: "sha_b64" } }),
      });
    vi.stubGlobal("fetch", mockFetch);

    await syncToGitHub({ ...baseOptions, env });

    const putCall = mockFetch.mock.calls[1];
    const body = JSON.parse(putCall[1].body);

    // Decode the base64 content and verify it matches original
    const decoded = decodeURIComponent(escape(atob(body.content)));
    expect(decoded).toBe(baseOptions.content);

    vi.unstubAllGlobals();
  });

  it("returns null on PUT API error", async () => {
    const env = makeEnv();

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 404 }) // GET
      .mockResolvedValueOnce({
        ok: false,
        status: 422,
        text: async () => "Unprocessable Entity",
      }); // PUT fails
    vi.stubGlobal("fetch", mockFetch);

    const result = await syncToGitHub({ ...baseOptions, env });
    expect(result).toBeNull();

    vi.unstubAllGlobals();
  });

  it("returns null when getInstallationToken throws", async () => {
    const env = makeEnv();
    mockedGetInstallationToken.mockRejectedValueOnce(new Error("Token error"));

    const result = await syncToGitHub({ ...baseOptions, env });
    expect(result).toBeNull();
  });

  it("sends correct headers including User-Agent and API version", async () => {
    const env = makeEnv();

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ content: { sha: "sha_hdr" } }),
      });
    vi.stubGlobal("fetch", mockFetch);

    await syncToGitHub({ ...baseOptions, env });

    // Check GET call headers
    const getHeaders = mockFetch.mock.calls[0][1].headers;
    expect(getHeaders.Authorization).toBe("Bearer ghs_mock_token_123");
    expect(getHeaders["User-Agent"]).toBe("Tome-Editor");
    expect(getHeaders["X-GitHub-Api-Version"]).toBe("2022-11-28");

    // Check PUT call headers
    const putHeaders = mockFetch.mock.calls[1][1].headers;
    expect(putHeaders.Authorization).toBe("Bearer ghs_mock_token_123");
    expect(putHeaders["Content-Type"]).toBe("application/json");

    vi.unstubAllGlobals();
  });
});
