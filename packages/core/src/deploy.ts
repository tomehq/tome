import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { readdir, readFile, stat } from "fs/promises";
import { homedir } from "os";
import { join, relative } from "path";

// ── TYPES ───────────────────────────────────────────────

export interface DeployConfig {
  /** Tome Cloud API endpoint */
  apiUrl: string;
  /** Auth token from ~/.tome/config */
  token: string;
  /** Project slug (derived from config name) */
  slug: string;
}

export interface DeployResult {
  url: string;
  deploymentId: string;
  size: number;
  fileCount: number;
}

// ── AUTH ─────────────────────────────────────────────────

function defaultConfigDir(): string {
  return join(homedir(), ".tome");
}

/**
 * Read auth token from ~/.tome/config (or a custom configDir for testing)
 */
export function readAuthToken(configDir?: string): string | null {
  // CI/CD: check TOME_TOKEN env var first (for GitHub Actions, GitLab CI, etc.)
  if (process.env.TOME_TOKEN) return process.env.TOME_TOKEN;

  try {
    const dir = configDir ?? defaultConfigDir();
    const configFile = join(dir, "config");
    if (!existsSync(configFile)) return null;
    const raw = readFileSync(configFile, "utf-8");
    const parsed = JSON.parse(raw);
    return typeof parsed.token === "string" ? parsed.token : null;
  } catch {
    return null;
  }
}

/**
 * Save auth token to ~/.tome/config (or a custom configDir for testing)
 */
export async function saveAuthToken(token: string, configDir?: string): Promise<void> {
  const dir = configDir ?? defaultConfigDir();
  const configFile = join(dir, "config");
  mkdirSync(dir, { recursive: true });
  writeFileSync(configFile, JSON.stringify({ token }, null, 2) + "\n", "utf-8");
}

// ── FILE COLLECTION ─────────────────────────────────────

/**
 * Recursively walk a directory and collect all files.
 */
async function walkDir(dir: string, base: string): Promise<Map<string, Buffer>> {
  const files = new Map<string, Buffer>();

  let entries: string[];
  try {
    entries = await readdir(dir).then((e) => e);
  } catch {
    return files;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const st = await stat(fullPath);

    if (st.isDirectory()) {
      const subFiles = await walkDir(fullPath, base);
      for (const [k, v] of subFiles) {
        files.set(k, v);
      }
    } else if (st.isFile()) {
      const relPath = relative(base, fullPath);
      const content = await readFile(fullPath);
      files.set(relPath, content);
    }
  }

  return files;
}

/**
 * Collect files from the build output directory.
 * Returns a map of relative paths to file contents (as Buffers).
 */
export async function collectBuildFiles(outDir: string): Promise<Map<string, Buffer>> {
  if (!existsSync(outDir)) {
    return new Map();
  }
  return walkDir(outDir, outDir);
}

// ── HASHING ─────────────────────────────────────────────

/**
 * Compute content hashes for diff-based uploads.
 * Returns a map of relative file paths to their SHA-256 hex digests.
 */
export function computeFileHashes(files: Map<string, Buffer>): Map<string, string> {
  const hashes = new Map<string, string>();

  for (const [path, content] of files) {
    const hash = createHash("sha256").update(content).digest("hex");
    hashes.set(path, hash);
  }

  return hashes;
}

// ── DEPLOY ──────────────────────────────────────────────

/**
 * Upload build to Tome Cloud via the Worker API.
 * Uses incremental uploads: sends file manifest (hashes),
 * server responds with which files need uploading.
 */
export async function deployToCloud(config: DeployConfig, outDir: string): Promise<DeployResult> {
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

  // Step 1: Start deployment — send manifest, get back which files to upload
  console.log(`  Starting deployment (${files.size} files, ${sizeKb} KB)...`);
  const startRes = await fetch(`${config.apiUrl}/api/deploy/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
    },
    body: JSON.stringify({ slug: config.slug, files: manifest }),
  });

  if (!startRes.ok) {
    const err = await startRes.json().catch(() => ({ error: startRes.statusText }));
    throw new Error(`Deploy failed: ${(err as { error: string }).error}`);
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

  // Step 3: Finalize deployment
  console.log("  Finalizing...");
  const finalizeRes = await fetch(`${config.apiUrl}/api/deploy/finalize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
    },
    body: JSON.stringify({ deploymentId }),
  });

  if (!finalizeRes.ok) {
    const err = await finalizeRes.json().catch(() => ({ error: finalizeRes.statusText }));
    throw new Error(`Finalize failed: ${(err as { error: string }).error}`);
  }

  const result = (await finalizeRes.json()) as { url: string; deploymentId: string };

  console.log("  Deploy complete!");

  return {
    url: result.url,
    deploymentId: result.deploymentId,
    size: totalSize,
    fileCount: files.size,
  };
}
