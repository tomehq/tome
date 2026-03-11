/**
 * Preview deployments for PR branch previews (TOM-55).
 * Deploy branches to unique preview URLs for team review before merging.
 */

import type { DeployConfig, DeployResult } from "./deploy.js";
import { collectBuildFiles, computeFileHashes } from "./deploy.js";

// ── TYPES ────────────────────────────────────────────────

export interface PreviewConfig extends DeployConfig {
  /** Git branch name */
  branch: string;
  /** PR number (optional) */
  prNumber?: number;
  /** Commit SHA (optional, for tracking) */
  commitSha?: string;
  /** Preview expiry in days */
  expiresInDays?: number;
}

export interface PreviewResult extends DeployResult {
  /** Preview-specific URL */
  previewUrl: string;
  /** Branch this preview is for */
  branch: string;
  /** When this preview expires */
  expiresAt: string;
}

export interface PreviewDeployment {
  /** Deployment ID */
  deploymentId: string;
  /** Branch name */
  branch: string;
  /** Branch slug (URL-safe) */
  branchSlug: string;
  /** Preview URL */
  previewUrl: string;
  /** PR number if applicable */
  prNumber?: number;
  /** Commit SHA */
  commitSha?: string;
  /** When this was created */
  createdAt: string;
  /** When this expires */
  expiresAt: string;
  /** Status */
  status: "active" | "expired" | "superseded";
}

// ── HELPERS ──────────────────────────────────────────────

/**
 * Convert a git branch name to a URL-safe slug.
 * e.g., "feature/add-auth" → "feature-add-auth"
 *       "dependabot/npm_and_yarn/..." → "dependabot-npm-and-yarn"
 */
export function slugifyBranch(branch: string): string {
  return branch
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")   // Replace non-alphanumeric sequences with dashes
    .replace(/^-|-$/g, "")         // Trim leading/trailing dashes
    .slice(0, 50);                 // Limit length for DNS-safe subdomain
}

/**
 * Generate the preview URL for a branch.
 */
export function getPreviewUrl(branchSlug: string, projectSlug: string, baseDomain: string = "tome.dev"): string {
  return `https://${branchSlug}.preview.${projectSlug}.${baseDomain}`;
}

/**
 * Calculate the expiry date for a preview deployment.
 */
export function getExpiryDate(daysFromNow: number = 7): string {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + daysFromNow);
  return expiry.toISOString();
}

/**
 * Detect the current git branch name.
 * Checks CI environment variables first, then falls back to `git rev-parse`.
 */
export function detectBranch(): string | null {
  // GitHub Actions
  if (process.env.GITHUB_HEAD_REF) return process.env.GITHUB_HEAD_REF;
  if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME;

  // GitLab CI
  if (process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME) return process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME;
  if (process.env.CI_COMMIT_BRANCH) return process.env.CI_COMMIT_BRANCH;

  // Bitbucket Pipelines
  if (process.env.BITBUCKET_BRANCH) return process.env.BITBUCKET_BRANCH;

  // Generic CI
  if (process.env.BRANCH_NAME) return process.env.BRANCH_NAME;

  // Fall back to git command
  try {
    const { execSync } = require("child_process");
    const branch = execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
    return branch === "HEAD" ? null : branch;
  } catch {
    return null;
  }
}

/**
 * Detect the current commit SHA.
 */
export function detectCommitSha(): string | null {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  if (process.env.CI_COMMIT_SHA) return process.env.CI_COMMIT_SHA;
  if (process.env.BITBUCKET_COMMIT) return process.env.BITBUCKET_COMMIT;

  try {
    const { execSync } = require("child_process");
    return execSync("git rev-parse HEAD", {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch {
    return null;
  }
}

/**
 * Detect the PR number from CI environment.
 */
export function detectPrNumber(): number | null {
  // GitHub Actions
  if (process.env.GITHUB_EVENT_NAME === "pull_request") {
    const prNum = process.env.GITHUB_REF?.match(/refs\/pull\/(\d+)/)?.[1];
    if (prNum) return parseInt(prNum, 10);
  }

  // GitLab CI
  if (process.env.CI_MERGE_REQUEST_IID) {
    return parseInt(process.env.CI_MERGE_REQUEST_IID, 10);
  }

  // Bitbucket
  if (process.env.BITBUCKET_PR_ID) {
    return parseInt(process.env.BITBUCKET_PR_ID, 10);
  }

  return null;
}

// ── PREVIEW BANNER ──────────────────────────────────────

/**
 * Generate an HTML/CSS snippet for the preview deployment banner.
 * This banner is injected into preview builds to indicate the deployment is a preview.
 */
export function generatePreviewBanner(branch: string, previewUrl: string, expiresAt: string): string {
  const expiryDate = new Date(expiresAt);
  const expiryStr = expiryDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `<div id="tome-preview-banner" style="position:fixed;top:0;left:0;right:0;z-index:99999;background:linear-gradient(90deg,#f59e0b,#d97706);color:#000;font-family:system-ui,-apple-system,sans-serif;font-size:13px;padding:6px 16px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
  <strong>Preview Deployment</strong> &mdash; Branch: <code style="background:rgba(0,0,0,0.1);padding:1px 6px;border-radius:3px;font-size:12px;">${escapeHtml(branch)}</code> &middot; Expires: ${escapeHtml(expiryStr)}
  <button onclick="this.parentElement.remove()" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px;color:#000;opacity:0.6;" aria-label="Dismiss">&times;</button>
</div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── DEPLOY TO PREVIEW ───────────────────────────────────

/**
 * Deploy build output as a preview deployment.
 * Similar to deployToCloud but includes branch metadata and preview URL.
 */
export async function deployPreview(config: PreviewConfig, outDir: string): Promise<PreviewResult> {
  const branchSlug = slugifyBranch(config.branch);
  const expiresAt = getExpiryDate(config.expiresInDays ?? 7);

  // Collect files
  console.log("  Collecting files...");
  const files = await collectBuildFiles(outDir);

  if (files.size === 0) {
    throw new Error(`No files found in output directory: ${outDir}\nRun "tome build" first.`);
  }

  // Compute hashes for diff-based upload
  const hashes = computeFileHashes(files);
  const manifest: Record<string, string> = {};
  for (const [path, hash] of hashes) {
    manifest[path] = hash;
  }

  // Calculate total size
  let totalSize = 0;
  for (const content of files.values()) {
    totalSize += content.length;
  }

  const sizeKb = (totalSize / 1024).toFixed(1);

  // Step 1: Start preview deployment
  console.log(`  Starting preview deployment (${files.size} files, ${sizeKb} KB)...`);
  console.log(`  Branch: ${config.branch} → ${branchSlug}`);

  const startRes = await fetch(`${config.apiUrl}/api/deploy/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
    },
    body: JSON.stringify({
      slug: config.slug,
      files: manifest,
      preview: true,
      branch: config.branch,
      branchSlug,
      prNumber: config.prNumber,
      commitSha: config.commitSha,
      expiresAt,
    }),
  });

  if (!startRes.ok) {
    const err = await startRes.json().catch(() => ({ error: startRes.statusText }));
    throw new Error(`Preview deploy failed: ${(err as { error: string }).error}`);
  }

  const { deploymentId, needed, skipped } = (await startRes.json()) as {
    deploymentId: string;
    needed: string[];
    total: number;
    skipped: number;
  };

  if (skipped > 0) {
    console.log(`  Skipping ${skipped} unchanged files`);
  }

  // Step 2: Upload each needed file
  if (needed.length > 0) {
    console.log(`  Uploading ${needed.length} files...`);
    for (const filePath of needed) {
      const content = files.get(filePath);
      if (!content) continue;

      const uploadRes = await fetch(`${config.apiUrl}/api/deploy/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "X-Deployment-Id": deploymentId,
          "X-File-Path": filePath,
          "X-File-Hash": manifest[filePath],
          "Content-Type": "application/octet-stream",
        },
        body: content,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json().catch(() => ({ error: uploadRes.statusText }));
        throw new Error(`Upload failed for ${filePath}: ${(err as { error: string }).error}`);
      }
    }
  }

  // Step 3: Finalize preview deployment
  console.log("  Finalizing preview...");
  const finalizeRes = await fetch(`${config.apiUrl}/api/deploy/finalize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
    },
    body: JSON.stringify({
      deploymentId,
      preview: true,
    }),
  });

  if (!finalizeRes.ok) {
    const err = await finalizeRes.json().catch(() => ({ error: finalizeRes.statusText }));
    throw new Error(`Finalize failed: ${(err as { error: string }).error}`);
  }

  const result = (await finalizeRes.json()) as { url: string; deploymentId: string; previewUrl?: string };
  const previewUrl = result.previewUrl || getPreviewUrl(branchSlug, config.slug);

  console.log("  Preview deploy complete!");

  return {
    url: result.url,
    deploymentId: result.deploymentId,
    previewUrl,
    branch: config.branch,
    expiresAt,
    size: totalSize,
    fileCount: files.size,
  };
}

/**
 * List active preview deployments for a project.
 */
export async function listPreviews(
  apiUrl: string,
  token: string,
  slug: string,
): Promise<PreviewDeployment[]> {
  const res = await fetch(`${apiUrl}/api/deploy/previews?slug=${encodeURIComponent(slug)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Failed to list previews: ${(err as { error: string }).error}`);
  }

  const data = (await res.json()) as { previews: PreviewDeployment[] };
  return data.previews;
}

/**
 * Delete a specific preview deployment.
 */
export async function deletePreview(
  apiUrl: string,
  token: string,
  deploymentId: string,
): Promise<void> {
  const res = await fetch(`${apiUrl}/api/deploy/previews/${deploymentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Failed to delete preview: ${(err as { error: string }).error}`);
  }
}
