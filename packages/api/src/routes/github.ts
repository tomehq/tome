/**
 * GitHub App webhook handler and repo connection routes.
 *
 * Routes:
 *   POST /github/webhook     — Receives push/PR events from GitHub
 *   POST /github/connect     — Connect a repo to a project (authenticated)
 *   DELETE /github/connect    — Disconnect a repo (authenticated)
 *   GET /github/status/:slug  — Check connection status (authenticated)
 */

import { Hono } from "hono";
import type { Env, User } from "../types.js";
import {
  verifyWebhookSignature,
  getInstallationToken,
  dispatchWorkflow,
  postPrComment,
  parseRepoUrl,
} from "../github-app.js";

// ── Types ───────────────────────────────────────────────

interface PushEvent {
  ref: string;
  repository: { full_name: string; default_branch: string };
  installation?: { id: number };
  head_commit?: { id: string; message: string; author?: { name: string } };
  pusher?: { name: string };
}

interface PullRequestEvent {
  action: string;
  number: number;
  pull_request: {
    head: { ref: string; sha: string };
    base: { ref: string };
    title: string;
  };
  repository: { full_name: string; default_branch: string };
  installation?: { id: number };
}

// ── Routes ──────────────────────────────────────────────

const github = new Hono<{ Bindings: Env }>();

/**
 * POST /github/webhook
 * Receives GitHub App webhook events (push, pull_request).
 * Not authenticated via Bearer token — uses HMAC signature verification.
 */
github.post("/webhook", async (c) => {
  const webhookSecret = c.env.GITHUB_APP_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return c.json({ error: "GitHub App not configured" }, 503);
  }

  // Verify webhook signature
  const signature = c.req.header("x-hub-signature-256") || "";
  const body = await c.req.text();

  const valid = await verifyWebhookSignature(body, signature, webhookSecret);
  if (!valid) {
    return c.json({ error: "Invalid webhook signature" }, 401);
  }

  const event = c.req.header("x-github-event");
  const payload = JSON.parse(body);

  if (event === "push") {
    return handlePush(c, payload as PushEvent);
  }

  if (event === "pull_request") {
    return handlePullRequest(c, payload as PullRequestEvent);
  }

  // Ignore other events (installation, ping, etc.)
  return c.json({ ok: true, message: `Ignored event: ${event}` });
});

/**
 * POST /github/connect
 * Connect a GitHub repository to a Tome project.
 * Requires authentication.
 */
github.post("/connect", async (c) => {
  const user = c.get("user") as User;
  const body = await c.req.json<{
    slug: string;
    repository: string; // "owner/repo" or full URL
    installationId: number;
    branch?: string;
  }>();

  if (!body.slug || !body.repository || !body.installationId) {
    return c.json({ error: "Missing slug, repository, or installationId" }, 400);
  }

  const parsed = parseRepoUrl(body.repository);
  if (!parsed) {
    return c.json({ error: "Invalid repository format. Use owner/repo or GitHub URL." }, 400);
  }

  // Verify the project belongs to this user
  const project = await c.env.TOME_DB.prepare(
    "SELECT id FROM projects WHERE slug = ? AND user_id = ?",
  ).bind(body.slug, user.id).first<{ id: string }>();

  if (!project) {
    return c.json({ error: "Project not found or not owned by you" }, 404);
  }

  // Store the connection
  await c.env.TOME_DB.prepare(
    "UPDATE projects SET github_repo = ?, github_installation_id = ?, github_branch = ? WHERE id = ?",
  ).bind(
    `${parsed.owner}/${parsed.repo}`,
    body.installationId,
    body.branch || "main",
    project.id,
  ).run();

  return c.json({
    ok: true,
    repository: `${parsed.owner}/${parsed.repo}`,
    branch: body.branch || "main",
  });
});

/**
 * DELETE /github/connect
 * Disconnect a GitHub repository from a Tome project.
 */
github.delete("/connect", async (c) => {
  const user = c.get("user") as User;
  const body = await c.req.json<{ slug: string }>();

  if (!body.slug) {
    return c.json({ error: "Missing slug" }, 400);
  }

  const project = await c.env.TOME_DB.prepare(
    "SELECT id FROM projects WHERE slug = ? AND user_id = ?",
  ).bind(body.slug, user.id).first<{ id: string }>();

  if (!project) {
    return c.json({ error: "Project not found or not owned by you" }, 404);
  }

  await c.env.TOME_DB.prepare(
    "UPDATE projects SET github_repo = NULL, github_installation_id = NULL, github_branch = NULL WHERE id = ?",
  ).bind(project.id).run();

  return c.json({ ok: true });
});

/**
 * GET /github/status/:slug
 * Check the GitHub connection status for a project.
 */
github.get("/status/:slug", async (c) => {
  const user = c.get("user") as User;
  const slug = c.req.param("slug");

  const project = await c.env.TOME_DB.prepare(
    "SELECT github_repo, github_installation_id, github_branch FROM projects WHERE slug = ? AND user_id = ?",
  ).bind(slug, user.id).first<{
    github_repo: string | null;
    github_installation_id: number | null;
    github_branch: string | null;
  }>();

  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json({
    connected: !!project.github_repo,
    repository: project.github_repo,
    installationId: project.github_installation_id,
    branch: project.github_branch,
  });
});

// ── Event handlers ──────────────────────────────────────

async function handlePush(c: any, payload: PushEvent) {
  const repoFullName = payload.repository.full_name;
  const ref = payload.ref; // e.g., "refs/heads/main"
  const branch = ref.replace("refs/heads/", "");
  const installationId = payload.installation?.id;

  if (!installationId) {
    return c.json({ error: "No installation ID in push event" }, 400);
  }

  // Find the project connected to this repo + branch
  const project = await c.env.TOME_DB.prepare(
    "SELECT p.slug, p.id, u.api_token FROM projects p JOIN users u ON p.user_id = u.id WHERE p.github_repo = ? AND p.github_branch = ?",
  ).bind(repoFullName, branch).first<{
    slug: string;
    id: string;
    api_token: string;
  }>();

  if (!project) {
    return c.json({ ok: true, message: "No project connected to this repo/branch" });
  }

  // Get installation token and dispatch workflow
  const appId = c.env.GITHUB_APP_ID;
  const privateKey = c.env.GITHUB_APP_PRIVATE_KEY;

  if (!appId || !privateKey) {
    return c.json({ error: "GitHub App credentials not configured" }, 503);
  }

  try {
    const token = await getInstallationToken(installationId, appId, privateKey);
    const [owner, repo] = repoFullName.split("/");

    const dispatched = await dispatchWorkflow(token, owner, repo, branch, "tome-deploy.yml", {
      tome_token: project.api_token,
      project_slug: project.slug,
    });

    if (dispatched) {
      return c.json({ ok: true, message: "Build dispatched", slug: project.slug });
    }

    // Workflow file might not exist yet — that's OK
    return c.json({ ok: true, message: "Workflow not found. Create .github/workflows/tome-deploy.yml in your repo." });
  } catch (err) {
    return c.json({ error: `Failed to dispatch: ${(err as Error).message}` }, 500);
  }
}

async function handlePullRequest(c: any, payload: PullRequestEvent) {
  if (payload.action !== "opened" && payload.action !== "synchronize") {
    return c.json({ ok: true, message: `Ignored PR action: ${payload.action}` });
  }

  const repoFullName = payload.repository.full_name;
  const installationId = payload.installation?.id;
  const prBranch = payload.pull_request.head.ref;
  const prNumber = payload.number;
  const baseBranch = payload.pull_request.base.ref;

  if (!installationId) {
    return c.json({ error: "No installation ID in PR event" }, 400);
  }

  // Find the project connected to this repo (check base branch)
  const project = await c.env.TOME_DB.prepare(
    "SELECT p.slug, p.id, u.api_token FROM projects p JOIN users u ON p.user_id = u.id WHERE p.github_repo = ? AND p.github_branch = ?",
  ).bind(repoFullName, baseBranch).first<{
    slug: string;
    id: string;
    api_token: string;
  }>();

  if (!project) {
    return c.json({ ok: true, message: "No project connected to this repo" });
  }

  const appId = c.env.GITHUB_APP_ID;
  const privateKey = c.env.GITHUB_APP_PRIVATE_KEY;

  if (!appId || !privateKey) {
    return c.json({ error: "GitHub App credentials not configured" }, 503);
  }

  try {
    const token = await getInstallationToken(installationId, appId, privateKey);
    const [owner, repo] = repoFullName.split("/");

    // Dispatch preview build
    const dispatched = await dispatchWorkflow(token, owner, repo, prBranch, "tome-deploy.yml", {
      tome_token: project.api_token,
      project_slug: project.slug,
      preview: "true",
      pr_number: String(prNumber),
    });

    if (dispatched) {
      // Post a comment with the preview URL
      const branchSlug = prBranch.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const previewUrl = `https://${branchSlug}.preview.${project.slug}.tome.center`;

      await postPrComment(
        token,
        owner,
        repo,
        prNumber,
        `## Tome Preview\n\nA preview deployment is building for this PR.\n\n**Preview URL:** ${previewUrl}\n\n---\n*Deployed by [Tome](https://tome.center)*`,
      );
    }

    return c.json({ ok: true, message: "Preview build dispatched" });
  } catch (err) {
    return c.json({ error: `Failed to dispatch preview: ${(err as Error).message}` }, 500);
  }
}

export { github };
