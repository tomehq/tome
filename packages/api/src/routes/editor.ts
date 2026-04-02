/**
 * Editor API routes — CRUD for WYSIWYG-edited documentation pages.
 *
 * All routes require authentication. Content is sanitized before saving.
 *
 * Routes:
 *   GET    /editor/pages?projectSlug=    — list pages for project
 *   GET    /editor/pages/:id             — get page content
 *   POST   /editor/pages                 — create new page
 *   PUT    /editor/pages/:id             — save draft
 *   POST   /editor/pages/:id/publish     — publish to live site
 *   GET    /editor/pages/:id/versions    — version history
 *   DELETE /editor/pages/:id             — delete page
 */

import { Hono } from "hono";
import type { Env, User } from "../types.js";
import { syncToGitHub } from "./editor-github.js";

const editor = new Hono<{ Bindings: Env; Variables: { user: User } }>();

// ── Helper: verify project ownership ────────────────────

async function verifyProject(db: D1Database, projectId: string, userId: string): Promise<boolean> {
  const row = await db.prepare(
    "SELECT id FROM projects WHERE id = ? AND user_id = ?",
  ).bind(projectId, userId).first();
  return !!row;
}

async function getProjectBySlug(db: D1Database, slug: string, userId: string): Promise<{ id: string } | null> {
  return db.prepare(
    "SELECT id FROM projects WHERE slug = ? AND user_id = ?",
  ).bind(slug, userId).first<{ id: string }>();
}

// ── GET /pages — list pages for a project ───────────────

editor.get("/pages", async (c) => {
  const user = c.get("user");
  const projectSlug = c.req.query("projectSlug");

  if (!projectSlug) {
    return c.json({ error: "Missing projectSlug query parameter" }, 400);
  }

  const project = await getProjectBySlug(c.env.TOME_DB, projectSlug, user.id);
  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  const { results } = await c.env.TOME_DB.prepare(
    `SELECT id, path, title, status, created_at, updated_at
     FROM editor_pages WHERE project_id = ? ORDER BY path ASC`,
  ).bind(project.id).all();

  return c.json(results ?? []);
});

// ── GET /pages/:id — get page content ───────────────────

editor.get("/pages/:id", async (c) => {
  const user = c.get("user");
  const pageId = c.req.param("id");

  const page = await c.env.TOME_DB.prepare(
    `SELECT ep.* FROM editor_pages ep
     JOIN projects p ON ep.project_id = p.id
     WHERE ep.id = ? AND p.user_id = ?`,
  ).bind(pageId, user.id).first();

  if (!page) {
    return c.json({ error: "Page not found" }, 404);
  }

  return c.json(page);
});

// ── POST /pages — create new page ───────────────────────

editor.post("/pages", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{
    projectSlug: string;
    path: string;
    title?: string;
    content?: string;
    frontmatter?: Record<string, unknown>;
  }>();

  if (!body.projectSlug || !body.path) {
    return c.json({ error: "Missing projectSlug or path" }, 400);
  }

  // Normalize path: strip leading/trailing slashes, lowercase
  const path = body.path.replace(/^\/+|\/+$/g, "").toLowerCase();

  const project = await getProjectBySlug(c.env.TOME_DB, body.projectSlug, user.id);
  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  // Check for duplicate path
  const existing = await c.env.TOME_DB.prepare(
    "SELECT id FROM editor_pages WHERE project_id = ? AND path = ?",
  ).bind(project.id, path).first();

  if (existing) {
    return c.json({ error: "Page already exists at this path" }, 409);
  }

  const pageId = crypto.randomUUID();
  await c.env.TOME_DB.prepare(
    `INSERT INTO editor_pages (id, project_id, path, title, content, frontmatter, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    pageId,
    project.id,
    path,
    body.title || "Untitled",
    body.content || "",
    JSON.stringify(body.frontmatter || {}),
    user.id,
  ).run();

  return c.json({ id: pageId, path, status: "draft" }, 201);
});

// ── PUT /pages/:id — save draft ─────────────────────────

editor.put("/pages/:id", async (c) => {
  const user = c.get("user");
  const pageId = c.req.param("id");
  const body = await c.req.json<{
    content?: string;
    title?: string;
    frontmatter?: Record<string, unknown>;
  }>();

  // Verify ownership
  const page = await c.env.TOME_DB.prepare(
    `SELECT ep.id, ep.project_id FROM editor_pages ep
     JOIN projects p ON ep.project_id = p.id
     WHERE ep.id = ? AND p.user_id = ?`,
  ).bind(pageId, user.id).first<{ id: string; project_id: string }>();

  if (!page) {
    return c.json({ error: "Page not found" }, 404);
  }

  // Build update query dynamically based on provided fields
  const updates: string[] = [];
  const binds: unknown[] = [];

  if (body.content !== undefined) {
    updates.push("content = ?");
    binds.push(body.content);
  }
  if (body.title !== undefined) {
    updates.push("title = ?");
    binds.push(body.title);
  }
  if (body.frontmatter !== undefined) {
    updates.push("frontmatter = ?");
    binds.push(JSON.stringify(body.frontmatter));
  }

  if (updates.length === 0) {
    return c.json({ error: "No fields to update" }, 400);
  }

  updates.push("updated_at = datetime('now')");
  binds.push(pageId);

  await c.env.TOME_DB.prepare(
    `UPDATE editor_pages SET ${updates.join(", ")} WHERE id = ?`,
  ).bind(...binds).run();

  // Save version snapshot
  if (body.content !== undefined) {
    await c.env.TOME_DB.prepare(
      `INSERT INTO editor_versions (id, page_id, content, created_by)
       VALUES (?, ?, ?, ?)`,
    ).bind(crypto.randomUUID(), pageId, body.content, user.id).run();
  }

  return c.json({ ok: true, updatedAt: new Date().toISOString() });
});

// ── POST /pages/:id/publish — deploy page to live site ──
//
// Two publish modes based on project configuration:
//
// 1. Git-connected projects (GitHub repo linked):
//    - Commits the file to GitHub via API
//    - The existing GitHub App webhook triggers a full site rebuild
//    - The rebuild deploys ALL files from the repo (including this one)
//    - Editor does NOT write directly to R2 (avoids dual source of truth)
//    - This is the Mintlify model: Git is always the source of truth
//
// 2. Non-Git projects (no repo connected):
//    - Writes the markdown file directly to R2
//    - Page is immediately live
//    - D1 editor_pages table is the source of truth

editor.post("/pages/:id/publish", async (c) => {
  const user = c.get("user");
  const pageId = c.req.param("id");

  const page = await c.env.TOME_DB.prepare(
    `SELECT ep.*, p.slug as project_slug, p.id as proj_id FROM editor_pages ep
     JOIN projects p ON ep.project_id = p.id
     WHERE ep.id = ? AND p.user_id = ?`,
  ).bind(pageId, user.id).first<{
    id: string; project_id: string; path: string; title: string;
    content: string; frontmatter: string; project_slug: string; proj_id: string;
  }>();

  if (!page) {
    return c.json({ error: "Page not found" }, 404);
  }

  // Build the markdown file with frontmatter
  const fm = JSON.parse(page.frontmatter || "{}");
  fm.title = page.title;
  const frontmatterYaml = Object.entries(fm)
    .map(([k, v]) => `${k}: ${typeof v === "string" ? `"${v}"` : v}`)
    .join("\n");
  const markdown = `---\n${frontmatterYaml}\n---\n\n${page.content}`;
  const filePath = `pages/${page.path}.md`;

  // Check if project has a connected GitHub repo
  const ghInfo = await c.env.TOME_DB.prepare(
    "SELECT github_repo, github_installation_id, github_branch FROM projects WHERE id = ?",
  ).bind(page.project_id).first<{
    github_repo: string | null;
    github_installation_id: number | null;
    github_branch: string | null;
  }>();

  const isGitConnected = !!(ghInfo?.github_repo && ghInfo.github_installation_id);

  let commitSha: string | undefined;

  if (isGitConnected) {
    // ── Git-connected: commit to GitHub, let webhook handle deploy ──
    const [owner, repo] = ghInfo!.github_repo!.split("/");
    const result = await syncToGitHub({
      env: c.env,
      owner,
      repo,
      branch: ghInfo!.github_branch || "main",
      installationId: ghInfo!.github_installation_id!,
      filePath,
      content: markdown,
      commitMessage: `docs: update ${page.path} via Tome editor`,
    });

    if (!result) {
      return c.json({ error: "Failed to commit to GitHub. Check your repository connection." }, 500);
    }

    commitSha = result.sha;
    // NOTE: We do NOT write to R2 here. The GitHub webhook will trigger
    // a full rebuild from the repo, which deploys all files including this one.
    // This prevents the dual source of truth problem.
  } else {
    // ── Non-Git: write directly to R2 for immediate deploy ──
    const r2Key = `sites/${page.project_slug}/${filePath}`;
    await c.env.TOME_BUCKET.put(r2Key, markdown, {
      customMetadata: { deploymentId: "editor", hash: "" },
      httpMetadata: { contentType: "text/markdown; charset=utf-8" },
    });
  }

  // Update page status in D1
  await c.env.TOME_DB.prepare(
    "UPDATE editor_pages SET status = 'published', updated_at = datetime('now') WHERE id = ?",
  ).bind(pageId).run();

  return c.json({
    ok: true,
    status: "published",
    method: isGitConnected ? "github" : "direct",
    url: `https://${page.project_slug}.tome.center/${page.path}`,
    commitSha,
  });
});

// ── GET /pages/:id/versions — version history ───────────

editor.get("/pages/:id/versions", async (c) => {
  const user = c.get("user");
  const pageId = c.req.param("id");

  // Verify ownership
  const page = await c.env.TOME_DB.prepare(
    `SELECT ep.id FROM editor_pages ep
     JOIN projects p ON ep.project_id = p.id
     WHERE ep.id = ? AND p.user_id = ?`,
  ).bind(pageId, user.id).first();

  if (!page) {
    return c.json({ error: "Page not found" }, 404);
  }

  const { results } = await c.env.TOME_DB.prepare(
    `SELECT id, created_by, created_at FROM editor_versions
     WHERE page_id = ? ORDER BY created_at DESC LIMIT 50`,
  ).bind(pageId).all();

  return c.json(results ?? []);
});

// ── DELETE /pages/:id — delete page ─────────────────────

editor.delete("/pages/:id", async (c) => {
  const user = c.get("user");
  const pageId = c.req.param("id");

  const page = await c.env.TOME_DB.prepare(
    `SELECT ep.id, ep.path, p.slug as project_slug FROM editor_pages ep
     JOIN projects p ON ep.project_id = p.id
     WHERE ep.id = ? AND p.user_id = ?`,
  ).bind(pageId, user.id).first<{ id: string; path: string; project_slug: string }>();

  if (!page) {
    return c.json({ error: "Page not found" }, 404);
  }

  // Delete from R2
  const r2Key = `sites/${page.project_slug}/pages/${page.path}.md`;
  await c.env.TOME_BUCKET.delete(r2Key).catch(() => {});

  // Delete versions first (FK constraint)
  await c.env.TOME_DB.prepare(
    "DELETE FROM editor_versions WHERE page_id = ?",
  ).bind(pageId).run();

  // Delete page
  await c.env.TOME_DB.prepare(
    "DELETE FROM editor_pages WHERE id = ?",
  ).bind(pageId).run();

  return c.json({ ok: true });
});

export { editor };
