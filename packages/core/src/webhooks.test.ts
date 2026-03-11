import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  formatSlackPayload,
  formatDiscordPayload,
  formatHttpPayload,
  formatEventTitle,
  maskUrl,
  sendWebhook,
  dispatchWebhooks,
  createDeployPayload,
  createDeployFailedPayload,
  createPreviewPayload,
  createDomainVerifiedPayload,
} from "./webhooks.js";
import type { WebhookConfig, WebhookPayload } from "./webhooks.js";

const basePayload: WebhookPayload = {
  event: "deploy.succeeded",
  timestamp: "2025-06-15T12:00:00Z",
  project: "my-docs",
  url: "https://my-docs.tome.dev",
  deploymentId: "dep-123",
  fileCount: 42,
  size: 102400,
};

// ── formatSlackPayload ─────────────────────────────────

describe("formatSlackPayload", () => {
  it("returns an object with blocks array", () => {
    const result = formatSlackPayload(basePayload);
    expect(result.blocks).toBeDefined();
    expect(Array.isArray(result.blocks)).toBe(true);
  });

  it("includes header block with event title", () => {
    const result = formatSlackPayload(basePayload);
    const blocks = result.blocks as any[];
    const header = blocks.find((b: any) => b.type === "header");
    expect(header).toBeDefined();
    expect(header.text.text).toContain("Deploy Succeeded");
  });

  it("includes project name in fields", () => {
    const result = formatSlackPayload(basePayload);
    const blocks = result.blocks as any[];
    const section = blocks.find((b: any) => b.type === "section" && b.fields);
    const projectField = section.fields.find((f: any) => f.text.includes("my-docs"));
    expect(projectField).toBeDefined();
  });

  it("includes error message for failed events", () => {
    const failPayload: WebhookPayload = {
      ...basePayload,
      event: "deploy.failed",
      error: "Build failed: missing dep",
    };
    const result = formatSlackPayload(failPayload);
    const blocks = result.blocks as any[];
    const errorBlock = blocks.find(
      (b: any) => b.type === "section" && b.text?.text?.includes("Error"),
    );
    expect(errorBlock).toBeDefined();
  });

  it("includes branch for preview events", () => {
    const previewPayload: WebhookPayload = {
      ...basePayload,
      event: "preview.deployed",
      branch: "feature/auth",
    };
    const result = formatSlackPayload(previewPayload);
    const blocks = result.blocks as any[];
    const section = blocks.find((b: any) => b.type === "section" && b.fields);
    const branchField = section.fields.find((f: any) => f.text.includes("feature/auth"));
    expect(branchField).toBeDefined();
  });

  it("includes context block with Tome attribution", () => {
    const result = formatSlackPayload(basePayload);
    const blocks = result.blocks as any[];
    const context = blocks.find((b: any) => b.type === "context");
    expect(context).toBeDefined();
  });
});

// ── formatDiscordPayload ───────────────────────────────

describe("formatDiscordPayload", () => {
  it("returns an object with embeds array", () => {
    const result = formatDiscordPayload(basePayload);
    expect(result.embeds).toBeDefined();
    expect(Array.isArray(result.embeds)).toBe(true);
  });

  it("uses green color for success events", () => {
    const result = formatDiscordPayload(basePayload);
    const embed = (result.embeds as any[])[0];
    expect(embed.color).toBe(0x22c55e);
  });

  it("uses red color for failure events", () => {
    const failPayload: WebhookPayload = { ...basePayload, event: "deploy.failed" };
    const result = formatDiscordPayload(failPayload);
    const embed = (result.embeds as any[])[0];
    expect(embed.color).toBe(0xef4444);
  });

  it("includes project name in fields", () => {
    const result = formatDiscordPayload(basePayload);
    const embed = (result.embeds as any[])[0];
    const projectField = embed.fields.find((f: any) => f.name === "Project");
    expect(projectField).toBeDefined();
    expect(projectField.value).toBe("my-docs");
  });

  it("includes timestamp", () => {
    const result = formatDiscordPayload(basePayload);
    const embed = (result.embeds as any[])[0];
    expect(embed.timestamp).toBe("2025-06-15T12:00:00Z");
  });

  it("includes error in description for failures", () => {
    const failPayload: WebhookPayload = {
      ...basePayload,
      event: "deploy.failed",
      error: "Build broke",
    };
    const result = formatDiscordPayload(failPayload);
    const embed = (result.embeds as any[])[0];
    expect(embed.description).toContain("Build broke");
  });
});

// ── formatHttpPayload ──────────────────────────────────

describe("formatHttpPayload", () => {
  it("returns the raw payload", () => {
    const result = formatHttpPayload(basePayload);
    expect(result.event).toBe("deploy.succeeded");
    expect(result.project).toBe("my-docs");
    expect(result.url).toBe("https://my-docs.tome.dev");
    expect(result.fileCount).toBe(42);
  });
});

// ── formatEventTitle ───────────────────────────────────

describe("formatEventTitle", () => {
  it("returns Deploy Succeeded", () => {
    expect(formatEventTitle("deploy.succeeded")).toBe("Deploy Succeeded");
  });

  it("returns Deploy Failed", () => {
    expect(formatEventTitle("deploy.failed")).toBe("Deploy Failed");
  });

  it("returns Preview Deployed", () => {
    expect(formatEventTitle("preview.deployed")).toBe("Preview Deployed");
  });

  it("returns Domain Verified", () => {
    expect(formatEventTitle("domain.verified")).toBe("Domain Verified");
  });
});

// ── maskUrl ────────────────────────────────────────────

describe("maskUrl", () => {
  it("masks URL path", () => {
    const masked = maskUrl("https://hooks.slack.com/services/T00/B00/abc123");
    expect(masked).toContain("hooks.slack.com");
    expect(masked).toContain("***");
    expect(masked).not.toContain("abc123");
  });

  it("handles short paths", () => {
    const masked = maskUrl("https://example.com/hook");
    expect(masked).toContain("example.com");
  });

  it("returns *** for invalid URLs", () => {
    expect(maskUrl("not-a-url")).toBe("***");
  });
});

// ── sendWebhook ────────────────────────────────────────

describe("sendWebhook", () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends POST request with JSON body", async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200 });

    const config: WebhookConfig = {
      url: "https://hooks.example.com/webhook",
      channel: "http",
    };

    const result = await sendWebhook(config, basePayload);
    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledOnce();

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe("https://hooks.example.com/webhook");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/json");
  });

  it("skips webhook when event not in events list", async () => {
    const config: WebhookConfig = {
      url: "https://hooks.example.com/webhook",
      channel: "http",
      events: ["deploy.failed"],
    };

    const result = await sendWebhook(config, basePayload);
    expect(result.ok).toBe(true);
    expect(result.status).toBe(0); // skipped
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("sends when event matches events list", async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200 });

    const config: WebhookConfig = {
      url: "https://hooks.example.com/webhook",
      channel: "http",
      events: ["deploy.succeeded"],
    };

    const result = await sendWebhook(config, basePayload);
    expect(result.ok).toBe(true);
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it("returns error result on HTTP failure", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });

    const config: WebhookConfig = {
      url: "https://hooks.example.com/webhook",
      channel: "http",
    };

    const result = await sendWebhook(config, basePayload);
    expect(result.ok).toBe(false);
    expect(result.status).toBe(500);
    expect(result.error).toContain("HTTP 500");
  });

  it("returns error result on network failure", async () => {
    mockFetch.mockRejectedValue(new Error("Connection refused"));

    const config: WebhookConfig = {
      url: "https://hooks.example.com/webhook",
      channel: "http",
    };

    const result = await sendWebhook(config, basePayload);
    expect(result.ok).toBe(false);
    expect(result.error).toContain("Connection refused");
  });

  it("uses Slack format for slack channel", async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200 });

    const config: WebhookConfig = {
      url: "https://hooks.slack.com/services/T00/B00/abc",
      channel: "slack",
    };

    await sendWebhook(config, basePayload);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.blocks).toBeDefined();
  });

  it("uses Discord format for discord channel", async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200 });

    const config: WebhookConfig = {
      url: "https://discord.com/api/webhooks/123/abc",
      channel: "discord",
    };

    await sendWebhook(config, basePayload);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.embeds).toBeDefined();
  });

  it("adds HMAC signature when secret is provided", async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200 });

    const config: WebhookConfig = {
      url: "https://hooks.example.com/webhook",
      channel: "http",
      secret: "my-secret-key",
    };

    await sendWebhook(config, basePayload);
    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers["X-Tome-Signature"]).toBeDefined();
    expect(headers["X-Tome-Signature"]).toMatch(/^sha256=[a-f0-9]+$/);
  });

  it("masks URL in result", async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200 });

    const config: WebhookConfig = {
      url: "https://hooks.slack.com/services/T00/B00/abc123",
      channel: "slack",
    };

    const result = await sendWebhook(config, basePayload);
    expect(result.url).not.toContain("abc123");
  });
});

// ── dispatchWebhooks ───────────────────────────────────

describe("dispatchWebhooks", () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns empty array for no webhooks", async () => {
    const results = await dispatchWebhooks([], basePayload);
    expect(results).toHaveLength(0);
  });

  it("dispatches to all configured webhooks", async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200 });

    const webhooks: WebhookConfig[] = [
      { url: "https://hook1.example.com", channel: "http" },
      { url: "https://hook2.example.com", channel: "http" },
    ];

    const results = await dispatchWebhooks(webhooks, basePayload);
    expect(results).toHaveLength(2);
    expect(results[0].ok).toBe(true);
    expect(results[1].ok).toBe(true);
  });

  it("handles mixed success and failure", async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, status: 200 })
      .mockResolvedValueOnce({ ok: false, status: 500 });

    const webhooks: WebhookConfig[] = [
      { url: "https://hook1.example.com", channel: "http" },
      { url: "https://hook2.example.com", channel: "http" },
    ];

    const results = await dispatchWebhooks(webhooks, basePayload);
    expect(results[0].ok).toBe(true);
    expect(results[1].ok).toBe(false);
  });
});

// ── Payload creators ───────────────────────────────────

describe("createDeployPayload", () => {
  it("creates deploy.succeeded payload", () => {
    const payload = createDeployPayload("my-docs", "https://my-docs.tome.dev", "dep-1", 10, 5000);
    expect(payload.event).toBe("deploy.succeeded");
    expect(payload.project).toBe("my-docs");
    expect(payload.url).toBe("https://my-docs.tome.dev");
    expect(payload.deploymentId).toBe("dep-1");
    expect(payload.fileCount).toBe(10);
    expect(payload.size).toBe(5000);
    expect(payload.timestamp).toBeDefined();
  });
});

describe("createDeployFailedPayload", () => {
  it("creates deploy.failed payload", () => {
    const payload = createDeployFailedPayload("my-docs", "Build error");
    expect(payload.event).toBe("deploy.failed");
    expect(payload.project).toBe("my-docs");
    expect(payload.error).toBe("Build error");
  });
});

describe("createPreviewPayload", () => {
  it("creates preview.deployed payload", () => {
    const payload = createPreviewPayload("my-docs", "https://preview.tome.dev", "feature/auth", "dep-2", 5, 2000);
    expect(payload.event).toBe("preview.deployed");
    expect(payload.branch).toBe("feature/auth");
  });
});

describe("createDomainVerifiedPayload", () => {
  it("creates domain.verified payload", () => {
    const payload = createDomainVerifiedPayload("my-docs", "docs.example.com");
    expect(payload.event).toBe("domain.verified");
    expect(payload.domain).toBe("docs.example.com");
  });
});

// ── Config schema tests ────────────────────────────────

describe("webhooks config schema", () => {
  it("accepts valid webhook config", async () => {
    const { TomeConfigSchema } = await import("./config.js");
    const result = TomeConfigSchema.safeParse({
      webhooks: [
        { url: "https://hooks.slack.com/services/T00/B00/abc", channel: "slack" },
      ],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.webhooks).toHaveLength(1);
      expect(result.data.webhooks![0].channel).toBe("slack");
    }
  });

  it("accepts webhook with events filter", async () => {
    const { TomeConfigSchema } = await import("./config.js");
    const result = TomeConfigSchema.safeParse({
      webhooks: [
        {
          url: "https://discord.com/api/webhooks/123/abc",
          channel: "discord",
          events: ["deploy.succeeded", "deploy.failed"],
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("accepts webhook with secret", async () => {
    const { TomeConfigSchema } = await import("./config.js");
    const result = TomeConfigSchema.safeParse({
      webhooks: [
        {
          url: "https://hooks.example.com/webhook",
          channel: "http",
          secret: "my-secret",
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("accepts config without webhooks", async () => {
    const { TomeConfigSchema } = await import("./config.js");
    const result = TomeConfigSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.webhooks).toBeUndefined();
    }
  });

  it("rejects invalid webhook URL", async () => {
    const { TomeConfigSchema } = await import("./config.js");
    const result = TomeConfigSchema.safeParse({
      webhooks: [
        { url: "not-a-url", channel: "slack" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid channel", async () => {
    const { TomeConfigSchema } = await import("./config.js");
    const result = TomeConfigSchema.safeParse({
      webhooks: [
        { url: "https://hooks.example.com", channel: "telegram" },
      ],
    });
    expect(result.success).toBe(false);
  });
});
