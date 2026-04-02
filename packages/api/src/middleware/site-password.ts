/**
 * Middleware that checks if a hosted site requires password protection.
 * If the site is protected and the user doesn't have a valid session cookie,
 * redirects to the password page.
 */

import { createMiddleware } from "hono/factory";
import type { Env } from "../types.js";
import { validateSessionToken } from "../password.js";

type SitePasswordEnv = {
  Bindings: Env;
};

/**
 * Check if a project is password-protected by querying D1.
 * Returns the password_hash if protected, null otherwise.
 */
async function isPasswordProtected(
  slug: string,
  db: D1Database,
): Promise<boolean> {
  const row = await db
    .prepare("SELECT password_required FROM projects WHERE slug = ? LIMIT 1")
    .bind(slug)
    .first<{ password_required: number }>();
  return row?.password_required === 1;
}

/**
 * Extract a named cookie from the Cookie header.
 */
function getCookie(cookieHeader: string | undefined, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

/**
 * Site password middleware.
 * Must be called with the resolved slug before serving from R2.
 */
export function checkSitePassword(slug: string) {
  return createMiddleware<SitePasswordEnv>(async (c, next) => {
    // Check if the site is password-protected
    const isProtected = await isPasswordProtected(slug, c.env.TOME_DB);
    if (!isProtected) {
      return next();
    }

    // Allow the password page and auth endpoint through
    const path = c.req.path;
    if (path.startsWith("/api/sites/")) {
      return next();
    }

    // Check for valid session cookie
    const cookieHeader = c.req.header("cookie");
    const sessionToken = getCookie(cookieHeader, "tome_site_session");

    if (sessionToken) {
      const secret = c.env.SSO_SESSION_SECRET;
      const tokenSlug = await validateSessionToken(sessionToken, secret);
      if (tokenSlug === slug) {
        return next();
      }
    }

    // No valid session — redirect to password page
    return c.redirect(`/api/sites/${slug}/password`);
  });
}
