/**
 * Role-Based Access Control (RBAC) middleware for Tome Cloud.
 *
 * Role hierarchy: viewer < editor < admin < owner
 * Used to gate page-level access based on frontmatter `access` field
 * and project-level role assignments in the `project_roles` table.
 */

// ── Role hierarchy ─────────────────────────────────────────

export type Role = "viewer" | "editor" | "admin" | "owner";

const ROLE_HIERARCHY: Record<string, number> = {
  viewer: 1,
  editor: 2,
  admin: 3,
  owner: 4,
};

/**
 * Check if `userRole` meets or exceeds `requiredRole` in the hierarchy.
 */
export function hasRole(userRole: string, requiredRole: string): boolean {
  const userLevel = ROLE_HIERARCHY[userRole] ?? 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 0;
  return userLevel >= requiredLevel;
}

/**
 * Check if a user (by email) has the required role for a project.
 *
 * - If `requiredRole` is undefined, any role entry grants access.
 * - If the user has no role entry, access is denied.
 * - If the user's role is below the required level, access is denied.
 */
export async function checkPageAccess(
  db: D1Database,
  projectId: string,
  email: string,
  requiredRole?: string,
): Promise<boolean> {
  const row = await db
    .prepare("SELECT role FROM project_roles WHERE project_id = ? AND email = ?")
    .bind(projectId, email)
    .first<{ role: string }>();

  if (!row) return false;

  if (!requiredRole) return true;

  return hasRole(row.role, requiredRole);
}
