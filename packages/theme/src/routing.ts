/**
 * Pure routing utilities for History API navigation.
 * Extracted from entry.tsx so they can be unit-tested independently.
 */

export interface MinimalRoute {
  id: string;
  urlPath: string;
}

/**
 * Extract page ID from a pathname by stripping basePath prefix.
 * Returns null if the resolved ID doesn't match any known route.
 */
export function pathnameToPageId(
  pathname: string,
  basePath: string,
  routes: MinimalRoute[],
): string | null {
  let relative = pathname;
  // Handle basePath stripping — treat "/" basePath as empty to avoid stripping all leading slashes
  const normalizedBase = basePath === "/" ? "" : basePath.replace(/\/+$/, "");
  if (normalizedBase && relative.startsWith(normalizedBase)) {
    relative = relative.slice(normalizedBase.length);
  }
  const id =
    relative
      .replace(/^\//, "")
      .replace(/\/index\.html$/, "")
      .replace(/\.html$/, "")
      .replace(/\/$/, "") || "index";
  // Match by ID first (most common: urlPath matches ID)
  const routeById = routes.find((r) => r.id === id);
  if (routeById) return id;
  // Match by urlPath (for synthetic routes where ID differs from URL, e.g. api-reference at /events-api)
  const urlPath = "/" + id;
  const urlPathWithSlash = urlPath + "/";
  const routeByUrl = routes.find((r) => r.urlPath === urlPath || r.urlPath === urlPathWithSlash);
  return routeByUrl ? routeByUrl.id : null;
}

/**
 * Get the full URL path for a page ID (basePath + urlPath).
 */
export function pageIdToPath(
  id: string,
  basePath: string,
  routes: MinimalRoute[],
): string {
  const route = routes.find((r) => r.id === id);
  if (route) return basePath + route.urlPath;
  return basePath + "/" + id;
}
