import { describe, it, expect } from "vitest";
import { verifyWebhookSignature, parseRepoUrl } from "./github-app.js";

// ── parseRepoUrl ────────────────────────────────────────

describe("parseRepoUrl", () => {
  it("parses owner/repo format", () => {
    const result = parseRepoUrl("tomehq/tome");
    expect(result).toEqual({ owner: "tomehq", repo: "tome" });
  });

  it("parses full GitHub URL", () => {
    const result = parseRepoUrl("https://github.com/tomehq/tome");
    expect(result).toEqual({ owner: "tomehq", repo: "tome" });
  });

  it("parses GitHub URL with .git suffix", () => {
    const result = parseRepoUrl("https://github.com/tomehq/tome.git");
    expect(result).toEqual({ owner: "tomehq", repo: "tome" });
  });

  it("handles repos with dots and dashes", () => {
    const result = parseRepoUrl("my-org/my-docs.io");
    expect(result).toEqual({ owner: "my-org", repo: "my-docs.io" });
  });

  it("returns null for invalid formats", () => {
    expect(parseRepoUrl("not a repo")).toBeNull();
    expect(parseRepoUrl("")).toBeNull();
    expect(parseRepoUrl("https://gitlab.com/owner/repo")).toBeNull();
  });
});

// ── verifyWebhookSignature ──────────────────────────────

describe("verifyWebhookSignature", () => {
  it("verifies a valid HMAC-SHA256 signature", async () => {
    const secret = "test-secret";
    const payload = '{"action":"push"}';

    // Generate the expected signature using Web Crypto
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
    const hex = Array.from(new Uint8Array(mac))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const signature = `sha256=${hex}`;

    const result = await verifyWebhookSignature(payload, signature, secret);
    expect(result).toBe(true);
  });

  it("rejects invalid signature", async () => {
    const result = await verifyWebhookSignature(
      '{"action":"push"}',
      "sha256=0000000000000000000000000000000000000000000000000000000000000000",
      "test-secret",
    );
    expect(result).toBe(false);
  });

  it("rejects missing sha256= prefix", async () => {
    const result = await verifyWebhookSignature(
      '{"action":"push"}',
      "invalid-signature",
      "test-secret",
    );
    expect(result).toBe(false);
  });

  it("rejects empty signature", async () => {
    const result = await verifyWebhookSignature('{}', "", "secret");
    expect(result).toBe(false);
  });
});
