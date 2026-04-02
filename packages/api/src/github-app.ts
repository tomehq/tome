/**
 * GitHub App utilities for Tome Cloud auto-deploy.
 *
 * The GitHub App receives push/PR webhooks and triggers deployments.
 * Since Cloudflare Workers can't run builds, the App dispatches a
 * workflow_dispatch event to run the build via GitHub Actions in the
 * user's own repository.
 */

import { base64url } from "./utils.js";

/**
 * Generate a JWT for GitHub App authentication.
 * JWTs are used to get installation access tokens.
 * Uses Web Crypto API (available in Cloudflare Workers).
 */
export async function generateAppJwt(
  appId: string,
  privateKeyPem: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iat: now - 60, // 60 seconds in the past for clock drift
    exp: now + 600, // 10 minutes
    iss: appId,
  };

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const signingInput = `${headerB64}.${payloadB64}`;

  // Import the RSA private key
  const key = await importPrivateKey(privateKeyPem);
  const signature = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    key,
    new TextEncoder().encode(signingInput),
  );

  const signatureB64 = base64url(signature);
  return `${signingInput}.${signatureB64}`;
}

/**
 * Get an installation access token for a specific GitHub App installation.
 */
export async function getInstallationToken(
  installationId: number,
  appId: string,
  privateKeyPem: string,
): Promise<string> {
  const jwt = await generateAppJwt(appId, privateKeyPem);

  const res = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "Tome-Deploy-Bot",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get installation token (${res.status}): ${err}`);
  }

  const data = await res.json() as { token: string };
  return data.token;
}

/**
 * Dispatch a workflow_dispatch event to trigger a build in the user's repo.
 * This creates a GitHub Actions workflow run.
 */
export async function dispatchWorkflow(
  token: string,
  owner: string,
  repo: string,
  ref: string,
  workflowFile: string = "tome-deploy.yml",
  inputs: Record<string, string> = {},
): Promise<boolean> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowFile}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "Tome-Deploy-Bot",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref, inputs }),
    },
  );

  // 204 = success (no content)
  return res.status === 204;
}

/**
 * Post a comment on a pull request with the preview URL.
 */
export async function postPrComment(
  token: string,
  owner: string,
  repo: string,
  prNumber: number,
  body: string,
): Promise<boolean> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "Tome-Deploy-Bot",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    },
  );

  return res.ok;
}

/**
 * Verify a GitHub webhook signature (HMAC-SHA256).
 */
export async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  if (!signature.startsWith("sha256=")) return false;
  const sigHex = signature.slice(7);

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const macHex = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time comparison
  if (macHex.length !== sigHex.length) return false;
  let mismatch = 0;
  for (let i = 0; i < macHex.length; i++) {
    mismatch |= macHex.charCodeAt(i) ^ sigHex.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Parse a GitHub repository URL into owner and repo.
 * Supports: https://github.com/owner/repo, https://github.com/owner/repo.git, owner/repo
 */
export function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  // Direct owner/repo format
  const directMatch = url.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
  if (directMatch) return { owner: directMatch[1], repo: directMatch[2] };

  // GitHub URL format
  const urlMatch = url.match(/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+?)(?:\.git)?$/);
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2] };

  return null;
}

// ── Crypto helpers ──────────────────────────────────────

// base64url imported from ./utils.js

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  // Strip PEM headers and whitespace
  const pemBody = pem
    .replace(/-----BEGIN.*?-----/g, "")
    .replace(/-----END.*?-----/g, "")
    .replace(/\s/g, "");

  const binaryDer = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  return crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}
