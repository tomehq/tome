/**
 * Webhooks / notifications for deploy events (TOM-56).
 * Sends notifications to Slack, Discord, or generic HTTP endpoints.
 */

// ── TYPES ────────────────────────────────────────────────

export type WebhookChannel = "slack" | "discord" | "http";

export type WebhookEventType =
  | "deploy.succeeded"
  | "deploy.failed"
  | "preview.deployed"
  | "domain.verified";

export interface WebhookConfig {
  /** Webhook URL */
  url: string;
  /** Channel type */
  channel: WebhookChannel;
  /** Which events to send (empty = all) */
  events?: WebhookEventType[];
  /** Optional secret for HMAC signature */
  secret?: string;
}

export interface WebhookPayload {
  /** Event type */
  event: WebhookEventType;
  /** When the event occurred */
  timestamp: string;
  /** Project name */
  project: string;
  /** Deploy/preview URL */
  url?: string;
  /** Deployment ID */
  deploymentId?: string;
  /** Branch name (for previews) */
  branch?: string;
  /** File count */
  fileCount?: number;
  /** Total size in bytes */
  size?: number;
  /** Error message (for failures) */
  error?: string;
  /** Domain that was verified */
  domain?: string;
  /** Whether to show Tome branding in webhook messages */
  showBranding?: boolean;
}

export interface WebhookResult {
  /** Webhook URL (masked) */
  url: string;
  /** Whether the webhook was sent successfully */
  ok: boolean;
  /** HTTP status code */
  status: number;
  /** Error message if failed */
  error?: string;
}

// ── PAYLOAD FORMATTERS ──────────────────────────────────

/**
 * Format a webhook payload for Slack's incoming webhook API.
 * Uses Slack's Block Kit for rich formatting.
 */
export function formatSlackPayload(payload: WebhookPayload): Record<string, unknown> {
  const icon = payload.event.includes("failed") ? ":x:" : ":white_check_mark:";
  const title = formatEventTitle(payload.event);

  const blocks: Record<string, unknown>[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${icon} ${title}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Project:*\n${payload.project}` },
        ...(payload.url ? [{ type: "mrkdwn", text: `*URL:*\n<${payload.url}|View site>` }] : []),
        ...(payload.branch ? [{ type: "mrkdwn", text: `*Branch:*\n\`${payload.branch}\`` }] : []),
        ...(payload.fileCount != null ? [{ type: "mrkdwn", text: `*Files:*\n${payload.fileCount}` }] : []),
        ...(payload.domain ? [{ type: "mrkdwn", text: `*Domain:*\n${payload.domain}` }] : []),
      ],
    },
  ];

  if (payload.error) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:warning: *Error:* ${payload.error}`,
      },
    });
  }

  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: payload.showBranding !== false
          ? `Sent by Tome · ${new Date(payload.timestamp).toLocaleString()}`
          : new Date(payload.timestamp).toLocaleString(),
      },
    ],
  });

  return { blocks };
}

/**
 * Format a webhook payload for Discord's webhook API.
 * Uses Discord's embed format for rich formatting.
 */
export function formatDiscordPayload(payload: WebhookPayload): Record<string, unknown> {
  const isFailure = payload.event.includes("failed");
  const title = formatEventTitle(payload.event);
  const color = isFailure ? 0xef4444 : 0x22c55e; // red or green

  const fields: Array<{ name: string; value: string; inline: boolean }> = [
    { name: "Project", value: payload.project, inline: true },
  ];

  if (payload.url) {
    fields.push({ name: "URL", value: payload.url, inline: true });
  }
  if (payload.branch) {
    fields.push({ name: "Branch", value: `\`${payload.branch}\``, inline: true });
  }
  if (payload.fileCount != null) {
    fields.push({ name: "Files", value: String(payload.fileCount), inline: true });
  }
  if (payload.size != null) {
    fields.push({ name: "Size", value: `${(payload.size / 1024).toFixed(1)} KB`, inline: true });
  }
  if (payload.domain) {
    fields.push({ name: "Domain", value: payload.domain, inline: true });
  }

  const embed: Record<string, unknown> = {
    title,
    color,
    fields,
    timestamp: payload.timestamp,
    ...(payload.showBranding !== false ? { footer: { text: "Tome" } } : {}),
  };

  if (payload.error) {
    embed.description = `⚠️ **Error:** ${payload.error}`;
  }

  return { embeds: [embed] };
}

/**
 * Format a webhook payload for generic HTTP POST.
 * Sends the raw payload as JSON.
 */
export function formatHttpPayload(payload: WebhookPayload): Record<string, unknown> {
  return { ...payload };
}

// ── HELPERS ──────────────────────────────────────────────

/**
 * Generate a human-readable event title.
 */
export function formatEventTitle(event: WebhookEventType): string {
  switch (event) {
    case "deploy.succeeded":
      return "Deploy Succeeded";
    case "deploy.failed":
      return "Deploy Failed";
    case "preview.deployed":
      return "Preview Deployed";
    case "domain.verified":
      return "Domain Verified";
    default:
      return String(event);
  }
}

/**
 * Mask a URL for logging (hide the path/token).
 */
export function maskUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/");
    if (pathParts.length > 2) {
      parsed.pathname = pathParts.slice(0, 2).join("/") + "/***";
    }
    return parsed.toString();
  } catch {
    return "***";
  }
}

/**
 * Generate HMAC-SHA256 signature for a payload.
 */
export async function signPayload(payload: string, secret: string): Promise<string> {
  const { createHmac } = await import("crypto");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

// ── DISPATCHER ──────────────────────────────────────────

/**
 * Send a webhook notification to a single endpoint.
 */
export async function sendWebhook(
  config: WebhookConfig,
  payload: WebhookPayload,
): Promise<WebhookResult> {
  // Check if this webhook cares about this event
  if (config.events && config.events.length > 0 && !config.events.includes(payload.event)) {
    return {
      url: maskUrl(config.url),
      ok: true,
      status: 0, // skipped
    };
  }

  // Format payload based on channel
  let body: Record<string, unknown>;
  switch (config.channel) {
    case "slack":
      body = formatSlackPayload(payload);
      break;
    case "discord":
      body = formatDiscordPayload(payload);
      break;
    case "http":
    default:
      body = formatHttpPayload(payload);
      break;
  }

  const bodyStr = JSON.stringify(body);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "Tome-Webhook/1.0",
  };

  // Add HMAC signature if secret is configured
  if (config.secret) {
    const signature = await signPayload(bodyStr, config.secret);
    headers["X-Tome-Signature"] = `sha256=${signature}`;
  }

  try {
    const res = await fetch(config.url, {
      method: "POST",
      headers,
      body: bodyStr,
      signal: AbortSignal.timeout(10_000), // 10s timeout
    });

    return {
      url: maskUrl(config.url),
      ok: res.ok,
      status: res.status,
      error: res.ok ? undefined : `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      url: maskUrl(config.url),
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Dispatch a webhook event to all configured endpoints.
 * Fire-and-forget: does not throw, returns results for each webhook.
 */
export async function dispatchWebhooks(
  webhooks: WebhookConfig[],
  payload: WebhookPayload,
): Promise<WebhookResult[]> {
  if (webhooks.length === 0) return [];

  const results = await Promise.allSettled(
    webhooks.map((config) => sendWebhook(config, payload)),
  );

  return results.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : {
          url: "***",
          ok: false,
          status: 0,
          error: r.reason instanceof Error ? r.reason.message : String(r.reason),
        },
  );
}

/**
 * Create a deploy succeeded payload.
 */
export function createDeployPayload(
  project: string,
  url: string,
  deploymentId: string,
  fileCount: number,
  size: number,
): WebhookPayload {
  return {
    event: "deploy.succeeded",
    timestamp: new Date().toISOString(),
    project,
    url,
    deploymentId,
    fileCount,
    size,
  };
}

/**
 * Create a deploy failed payload.
 */
export function createDeployFailedPayload(
  project: string,
  error: string,
): WebhookPayload {
  return {
    event: "deploy.failed",
    timestamp: new Date().toISOString(),
    project,
    error,
  };
}

/**
 * Create a preview deployed payload.
 */
export function createPreviewPayload(
  project: string,
  url: string,
  branch: string,
  deploymentId: string,
  fileCount: number,
  size: number,
): WebhookPayload {
  return {
    event: "preview.deployed",
    timestamp: new Date().toISOString(),
    project,
    url,
    branch,
    deploymentId,
    fileCount,
    size,
  };
}

/**
 * Create a domain verified payload.
 */
export function createDomainVerifiedPayload(
  project: string,
  domain: string,
): WebhookPayload {
  return {
    event: "domain.verified",
    timestamp: new Date().toISOString(),
    project,
    domain,
  };
}
