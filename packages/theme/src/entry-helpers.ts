import type { MinimalRoute } from "./routing.js";

// ── NAVIGATION ERRORS ─────────────────────────────────────
export class PageNotFoundError extends Error {
  readonly code = "PAGE_NOT_FOUND" as const;
  constructor(pageId: string) {
    super(`Page not found: ${pageId}`);
    this.name = "PageNotFoundError";
  }
}

export class PageLoadError extends Error {
  readonly code = "PAGE_LOAD_ERROR" as const;
  constructor(pageId: string, cause?: unknown) {
    super(`Failed to load page: ${pageId}`);
    this.name = "PageLoadError";
    if (cause) this.cause = cause;
  }
}

export class NavigationCancelledError extends Error {
  readonly code = "NAVIGATION_CANCELLED" as const;
  constructor() {
    super("Navigation was cancelled by a newer navigation");
    this.name = "NavigationCancelledError";
  }
}

// ── PAGE TYPES ────────────────────────────────────────────
export interface HtmlPage {
  isMdx: false;
  html: string;
  frontmatter: { title: string; description?: string; toc?: boolean; type?: string };
  headings: Array<{ depth: number; text: string; id: string }>;
  changelogEntries?: Array<{ version: string; date?: string; url?: string; sections: Array<{ type: string; items: string[] }> }>;
  isApiReference?: false;
}

export interface MdxPage {
  isMdx: true;
  component: React.ComponentType<{ components?: Record<string, React.ComponentType> }>;
  frontmatter: { title: string; description?: string; toc?: boolean; type?: string };
  headings: Array<{ depth: number; text: string; id: string }>;
  isApiReference?: false;
}

export interface ApiReferencePage {
  isMdx: false;
  isApiReference: true;
  html: string;
  frontmatter: { title: string; description?: string; toc?: boolean; type?: string };
  headings: Array<{ depth: number; text: string; id: string }>;
  changelogEntries?: undefined;
  apiManifest: any;
  asyncApiManifest?: any;
}

export type LoadedPage = HtmlPage | MdxPage | ApiReferencePage;

// ── EDIT URL COMPUTATION ──────────────────────────────────
export interface EditLinkConfig {
  repo: string;
  branch?: string;
  dir?: string;
}

export function computeEditUrl(
  editLink: EditLinkConfig | undefined,
  filePath: string | undefined,
): string | undefined {
  if (!editLink || !filePath) return undefined;
  const { repo, branch = "main", dir = "" } = editLink;
  const dirPrefix = dir ? `${dir.replace(/\/$/, "")}/` : "";
  return `https://github.com/${repo}/edit/${branch}/${dirPrefix}${filePath}`;
}

// ── INITIAL PAGE RESOLUTION ───────────────────────────────
export function resolveInitialPageId(
  pathname: string,
  hash: string,
  routes: MinimalRoute[],
  basePath: string,
  pathnameToPageIdFn: (pathname: string, basePath: string, routes: MinimalRoute[]) => string | null,
): string {
  // History API: resolve page from pathname
  const resolved = pathnameToPageIdFn(pathname, basePath, routes);
  if (resolved) return resolved;

  // Legacy hash fallback: support old /#page-id URLs
  const hashId = hash.startsWith("#") ? hash.slice(1) : hash;
  if (hashId && routes.some((r) => r.id === hashId)) return hashId;

  return routes[0]?.id || "index";
}

// ── PAGE LOADER ──────────────────────────────────────────
export interface RouteWithMeta extends MinimalRoute {
  isMdx?: boolean;
  frontmatter?: { title: string; description?: string; toc?: boolean; type?: string };
}

export async function loadPage(
  id: string,
  routes: RouteWithMeta[],
  loadPageModule: (id: string) => Promise<any>,
): Promise<LoadedPage> {
  const route = routes.find((r) => r.id === id);
  let mod: any;
  try {
    mod = await loadPageModule(id);
  } catch (err) {
    throw new PageLoadError(id, err);
  }

  if (route?.isMdx && mod.meta) {
    // MDX page — mod.default is the React component
    return {
      isMdx: true,
      component: mod.default,
      frontmatter: mod.meta.frontmatter,
      headings: mod.meta.headings,
    };
  }

  // Regular .md page — mod.default is { html, frontmatter, headings }
  if (!mod.default) throw new PageNotFoundError(id);

  // API reference page (synthetic route from OpenAPI/AsyncAPI spec)
  if (mod.isApiReference && (mod.apiManifest || mod.asyncApiManifest)) {
    return {
      isMdx: false, isApiReference: true, ...mod.default,
      apiManifest: mod.apiManifest,
      asyncApiManifest: mod.asyncApiManifest,
    };
  }

  // Changelog page type
  if (mod.isChangelog && mod.changelogEntries) {
    return { isMdx: false, ...mod.default, changelogEntries: mod.changelogEntries };
  }

  return { isMdx: false, ...mod.default };
}

// ── VERSION DETECTION ─────────────────────────────────────
export function detectCurrentVersion(
  currentRoute: { version?: string } | undefined,
  versions: { current?: string } | undefined,
): string | undefined {
  return currentRoute?.version || (versions?.current ?? undefined);
}
