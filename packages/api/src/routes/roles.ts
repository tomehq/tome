/**
 * Project role management routes for RBAC.
 *
 * All routes require Bearer auth (applied in index.ts).
 *
 *   POST   /roles          — Assign a role to an email
 *   GET    /roles/:slug    — List roles for a project
 *   DELETE /roles          — Remove a role assignment
 */

import { Hono } from "hono";
import type { Env, User } from "../types.js";
import { hasRole, type Role } from "../middleware/rbac.js";

const VALID_ROLES: Role[] = ["viewer", "editor", "admin", "owner"];

const roles = new Hono<{ Bindings: Env; Variables: { user: User } }>();

// ── Helpers ──────────────────────────────────────────────

/**
 * Check if the authenticated user is an owner or admin of the project.
 * Returns the project row if authorized, null otherwise.
 */
async function authorizeManager(
  db: D1Database,
  userId: string,
  userEmail: string,
  projectSlug: string,
): Promise<{ id: string; user_id: string } | null> {
  const project = await db
    .prepare("SELECT id, user_id FROM projects WHERE slug = ?")
    .bind(projectSlug)
    .first<{ id: string; user_id: string }>();

  if (!project) return null;

  // Project owner always has access
  if (project.user_id === userId) return project;

  // Check if user has admin role in project_roles
  const roleRow = await db
    .prepare("SELECT role FROM project_roles WHERE project_id = ? AND email = ?")
    .bind(project.id, userEmail)
    .first<{ role: string }>();

  if (roleRow && hasRole(roleRow.role, "admin")) return project;

  return null;
}

// ── POST /roles — Assign role ──────────────────────────

roles.post("/", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{
    projectSlug: string;
    email: string;
    role: string;
  }>();

  if (!body.projectSlug || !body.email || !body.role) {
    return c.json({ error: "Missing projectSlug, email, or role" }, 400);
  }

  if (!VALID_ROLES.includes(body.role as Role)) {
    return c.json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}` }, 400);
  }

  const project = await authorizeManager(
    c.env.TOME_DB,
    user.id,
    user.email,
    body.projectSlug,
  );

  if (!project) {
    return c.json({ error: "Project not found or insufficient permissions" }, 403);
  }

  const id = crypto.randomUUID();
  await c.env.TOME_DB.prepare(
    `INSERT INTO project_roles (id, project_id, email, role)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(project_id, email) DO UPDATE SET role = excluded.role`,
  )
    .bind(id, project.id, body.email, body.role)
    .run();

  return c.json({ ok: true, id });
});

// ── GET /roles/:slug — List roles ──────────────────────

roles.get("/:slug", async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug");

  const project = await authorizeManager(
    c.env.TOME_DB,
    user.id,
    user.email,
    slug,
  );

  if (!project) {
    return c.json({ error: "Project not found or insufficient permissions" }, 403);
  }

  const { results } = await c.env.TOME_DB.prepare(
    "SELECT id, email, role, created_at FROM project_roles WHERE project_id = ?",
  )
    .bind(project.id)
    .all<{ id: string; email: string; role: string; created_at: string }>();

  return c.json({ roles: results ?? [] });
});

// ── DELETE /roles — Remove role ────────────────────────

roles.delete("/", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{
    projectSlug: string;
    email: string;
  }>();

  if (!body.projectSlug || !body.email) {
    return c.json({ error: "Missing projectSlug or email" }, 400);
  }

  const project = await authorizeManager(
    c.env.TOME_DB,
    user.id,
    user.email,
    body.projectSlug,
  );

  if (!project) {
    return c.json({ error: "Project not found or insufficient permissions" }, 403);
  }

  await c.env.TOME_DB.prepare(
    "DELETE FROM project_roles WHERE project_id = ? AND email = ?",
  )
    .bind(project.id, body.email)
    .run();

  return c.json({ ok: true });
});

export { roles };
