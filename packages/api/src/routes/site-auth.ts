/**
 * Site password authentication route.
 * Validates password and sets a session cookie for access.
 */

import { Hono } from "hono";
import type { Env } from "../types.js";
import { verifyPassword, generateSessionToken } from "../password.js";
import { passwordPageHtml } from "../templates/password-page.js";

export const siteAuth = new Hono<{ Bindings: Env }>();

/**
 * POST /api/sites/:slug/authenticate
 * Validates the password and sets a session cookie.
 */
siteAuth.post("/:slug/authenticate", async (c) => {
  const slug = c.req.param("slug");

  // Parse form body
  const body = await c.req.parseBody();
  const password = body.password as string;
  const redirect = (body.redirect as string) || "/";

  if (!password) {
    return c.html(passwordPageHtml(slug, "Password is required."), 400);
  }

  // Look up the project's password hash
  const project = await c.env.TOME_DB.prepare(
    "SELECT password_hash FROM projects WHERE slug = ? AND password_required = 1"
  ).bind(slug).first<{ password_hash: string }>();

  if (!project?.password_hash) {
    return c.html(passwordPageHtml(slug, "This site is not password-protected."), 400);
  }

  // Verify password
  const valid = await verifyPassword(password, project.password_hash);
  if (!valid) {
    return c.html(passwordPageHtml(slug, "Incorrect password. Please try again."), 401);
  }

  // Generate session token and set cookie
  const token = await generateSessionToken(slug, c.env.SSO_SESSION_SECRET);
  const headers = new Headers();
  headers.set("Set-Cookie", `tome_site_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
  headers.set("Location", redirect);

  return new Response(null, { status: 302, headers });
});

/**
 * GET /api/sites/:slug/password
 * Serves the password page.
 */
siteAuth.get("/:slug/password", async (c) => {
  const slug = c.req.param("slug");
  return c.html(passwordPageHtml(slug));
});
