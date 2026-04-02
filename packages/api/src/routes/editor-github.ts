/**
 * GitHub sync for the WYSIWYG editor.
 * When a page is published and the project has a connected GitHub repo,
 * this module commits the markdown file back to the repo.
 */

import type { Env } from "../types.js";
import { getInstallationToken } from "../github-app.js";

interface GitHubSyncOptions {
  env: Env;
  owner: string;
  repo: string;
  branch: string;
  installationId: number;
  filePath: string;
  content: string;
  commitMessage: string;
}

/**
 * Create or update a file in a GitHub repository.
 * Uses the GitHub Contents API to create a commit.
 */
export async function syncToGitHub(options: GitHubSyncOptions): Promise<{ sha: string } | null> {
  const { env, owner, repo, branch, installationId, filePath, content, commitMessage } = options;

  if (!env.GITHUB_APP_ID || !env.GITHUB_APP_PRIVATE_KEY) {
    return null;
  }

  try {
    const token = await getInstallationToken(installationId, env.GITHUB_APP_ID, env.GITHUB_APP_PRIVATE_KEY);

    // Check if file already exists (to get its SHA for updates)
    let existingSha: string | undefined;
    try {
      const getRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "Tome-Editor",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );
      if (getRes.ok) {
        const data = await getRes.json() as { sha: string };
        existingSha = data.sha;
      }
    } catch {
      // File doesn't exist yet — that's fine, we'll create it
    }

    // Create or update the file
    const body: Record<string, unknown> = {
      message: commitMessage,
      content: btoa(unescape(encodeURIComponent(content))), // UTF-8 safe base64
      branch,
    };

    if (existingSha) {
      body.sha = existingSha;
    }

    const putRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "Tome-Editor",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!putRes.ok) {
      const err = await putRes.text();
      console.error(`GitHub sync failed (${putRes.status}): ${err}`);
      return null;
    }

    const result = await putRes.json() as { content: { sha: string } };
    return { sha: result.content.sha };
  } catch (err) {
    console.error("GitHub sync error:", err);
    return null;
  }
}
