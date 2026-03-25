import { resolve, basename, dirname, join } from "path";
import { readFileSync, existsSync } from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import type { TomeConfig } from "./config.js";
import type { PageFrontmatter } from "./markdown.js";

// ── TYPES ────────────────────────────────────────────────
export type BadgeVariant = "info" | "success" | "warning" | "danger" | "default";

export interface Badge {
  text: string;
  variant: BadgeVariant;
}

/** Normalize badge from frontmatter: string → { text, variant: "default" }, object → fill in default variant */
export function normalizeBadge(
  raw: string | { text: string; variant?: BadgeVariant } | undefined
): Badge | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw === "string") return { text: raw, variant: "default" };
  return { text: raw.text, variant: raw.variant || "default" };
}

export interface PageRoute {
  /** Unique page ID derived from file path: "getting-started", "api/endpoints" */
  id: string;
  /** File path relative to pages dir */
  filePath: string;
  /** Absolute file path */
  absolutePath: string;
  /** URL path: "/getting-started", "/api/endpoints" */
  urlPath: string;
  /** Parsed frontmatter */
  frontmatter: PageFrontmatter;
  /** Is this an MDX file? */
  isMdx: boolean;
  /** Version this page belongs to (when versioning is configured) */
  version?: string;
  /** Locale this page belongs to (when i18n is configured) */
  locale?: string;
}

export interface NavigationItem {
  title: string;
  id: string;
  urlPath: string;
  icon?: string;
  badge?: Badge;
}

export interface NavigationGroup {
  section: string;
  pages: NavigationItem[];
}

// ── VERSIONING CONFIG TYPE ────────────────────────────────
export interface VersioningConfig {
  current: string;
  versions: string[];
}

// ── I18N CONFIG TYPE ─────────────────────────────────────
export interface I18nConfig {
  defaultLocale: string;
  locales: string[];
  localeNames?: Record<string, string>;
  fallback: boolean;
}

// ── PAGE DISCOVERY ───────────────────────────────────────
export async function discoverPages(
  pagesDir: string,
  versioning?: VersioningConfig,
  i18n?: I18nConfig,
): Promise<PageRoute[]> {
  if (!existsSync(pagesDir)) {
    return [];
  }

  // When i18n is configured with multiple locales, discover pages from locale directories
  if (i18n && i18n.locales.length > 1) {
    const allRoutes: PageRoute[] = [];

    for (const locale of i18n.locales) {
      const localeDir = join(pagesDir, locale);
      if (!existsSync(localeDir)) continue;

      const files = await glob("**/*.{md,mdx}", {
        cwd: localeDir,
        nodir: true,
        ignore: ["node_modules/**"],
      });

      const isDefault = locale === i18n.defaultLocale;

      for (const file of files.sort()) {
        const absolutePath = resolve(localeDir, file);
        const source = readFileSync(absolutePath, "utf-8");
        const { data } = matter(source);

        const ext = file.endsWith(".mdx") ? ".mdx" : ".md";
        const nfile = file.replace(/\\/g, "/");
        let id = nfile.replace(ext, "");
        if (id.endsWith("/index") || id === "index") {
          id = id.replace(/\/?index$/, "");
        }

        // Default locale pages serve at root URLs; non-default locales are prefixed
        const urlPath = isDefault
          ? (id === "" ? "/" : `/${id}`)
          : (id === "" ? `/${locale}` : `/${locale}/${id}`);

        let title = data.title;
        if (!title) {
          const titleMatch = source.match(/^#\s+(.+)$/m);
          title = titleMatch ? titleMatch[1].trim() : basename(file, ext);
        }

        const frontmatter: PageFrontmatter = {
          title,
          description: data.description,
          icon: data.icon,
          sidebarTitle: data.sidebarTitle,
          hidden: data.hidden ?? false,
          tags: data.tags,
          type: data.type,
          redirect_from: data.redirect_from,
          badge: data.badge,
          draft: data.draft ?? false,
        };

        allRoutes.push({
          id: isDefault ? (id || "index") : `${locale}/${id || "index"}`,
          filePath: `${locale}/${nfile}`,
          absolutePath,
          urlPath,
          frontmatter,
          isMdx: ext === ".mdx",
          locale,
        });
      }
    }

    // Fallback: when enabled, for each non-default locale, add missing pages from the default locale
    if (i18n.fallback) {
      const defaultLocaleRoutes = allRoutes.filter(r => r.locale === i18n.defaultLocale);
      for (const locale of i18n.locales) {
        if (locale === i18n.defaultLocale) continue;

        const localeRouteIds = new Set(
          allRoutes
            .filter(r => r.locale === locale)
            .map(r => {
              // Strip the locale prefix from the id to get the base page id
              const prefix = `${locale}/`;
              return r.id.startsWith(prefix) ? r.id.slice(prefix.length) : r.id;
            })
        );

        for (const defaultRoute of defaultLocaleRoutes) {
          const baseId = defaultRoute.id;
          if (!localeRouteIds.has(baseId)) {
            // Create a fallback route for this locale using the default locale's page
            const urlPath = baseId === "index"
              ? `/${locale}`
              : `/${locale}/${baseId}`;

            allRoutes.push({
              ...defaultRoute,
              id: `${locale}/${baseId}`,
              urlPath,
              locale,
            });
          }
        }
      }
    }

    return allRoutes;
  }

  // When versioning is configured, discover pages from each version directory
  if (versioning) {
    const allRoutes: PageRoute[] = [];
    for (const version of versioning.versions) {
      const versionDir = join(pagesDir, version);
      if (!existsSync(versionDir)) continue;

      const files = await glob("**/*.{md,mdx}", {
        cwd: versionDir,
        nodir: true,
        ignore: ["node_modules/**"],
      });

      for (const file of files.sort()) {
        const absolutePath = resolve(versionDir, file);
        const source = readFileSync(absolutePath, "utf-8");
        const { data } = matter(source);

        const ext = file.endsWith(".mdx") ? ".mdx" : ".md";
        const nfile = file.replace(/\\/g, "/");
        let id = nfile.replace(ext, "");
        if (id.endsWith("/index") || id === "index") {
          id = id.replace(/\/?index$/, "");
        }

        const isCurrent = version === versioning.current;
        // Current version pages serve at root URLs; older versions are prefixed
        const urlPath = isCurrent
          ? (id === "" ? "/" : `/${id}`)
          : (id === "" ? `/${version}` : `/${version}/${id}`);

        let title = data.title;
        if (!title) {
          const titleMatch = source.match(/^#\s+(.+)$/m);
          title = titleMatch ? titleMatch[1].trim() : basename(file, ext);
        }

        const frontmatter: PageFrontmatter = {
          title,
          description: data.description,
          icon: data.icon,
          sidebarTitle: data.sidebarTitle,
          hidden: data.hidden ?? false,
          tags: data.tags,
          type: data.type,
          redirect_from: data.redirect_from,
          badge: data.badge,
          draft: data.draft ?? false,
        };

        allRoutes.push({
          id: isCurrent ? (id || "index") : `${version}/${id || "index"}`,
          filePath: `${version}/${nfile}`,
          absolutePath,
          urlPath,
          frontmatter,
          isMdx: ext === ".mdx",
          version,
        });
      }
    }
    return allRoutes;
  }

  // Non-versioned, non-i18n: original behavior
  const files = await glob("**/*.{md,mdx}", {
    cwd: pagesDir,
    nodir: true,
    ignore: ["node_modules/**"],
  });

  const routes: PageRoute[] = [];

  for (const file of files.sort()) {
    const absolutePath = resolve(pagesDir, file);
    const source = readFileSync(absolutePath, "utf-8");
    const { data } = matter(source);

    // Derive ID and URL path from file path (normalize backslashes for Windows)
    const ext = file.endsWith(".mdx") ? ".mdx" : ".md";
    const nfile = file.replace(/\\/g, "/");
    let id = nfile.replace(ext, "");
    if (id.endsWith("/index") || id === "index") {
      id = id.replace(/\/?index$/, "");
    }

    const urlPath = id === "" ? "/" : `/${id}`;

    // Infer title from frontmatter or first heading
    let title = data.title;
    if (!title) {
      const titleMatch = source.match(/^#\s+(.+)$/m);
      title = titleMatch ? titleMatch[1].trim() : basename(file, ext);
    }

    const frontmatter: PageFrontmatter = {
      title,
      description: data.description,
      icon: data.icon,
      sidebarTitle: data.sidebarTitle,
      hidden: data.hidden ?? false,
      tags: data.tags,
      redirect_from: data.redirect_from,
      badge: data.badge,
      draft: data.draft ?? false,
    };

    routes.push({
      id: id || "index",
      filePath: nfile,
      absolutePath,
      urlPath,
      frontmatter,
      isMdx: ext === ".mdx",
    });
  }

  return routes;
}

// ── NAVIGATION BUILDER ───────────────────────────────────
export function buildNavigation(
  routes: PageRoute[],
  config: TomeConfig
): NavigationGroup[] {
  // If config has explicit navigation, use it to order pages
  if (config.navigation && config.navigation.length > 0) {
    // Collect IDs referenced in explicit navigation
    const explicitIds = new Set(
      config.navigation.flatMap((g) => g.pages as string[])
    );

    const groups = config.navigation.map((group) => ({
      section: group.group,
      pages: (group.pages as string[])
        .map((pageId) => {
          const route = routes.find(
            (r) => r.id === pageId || r.filePath.replace(/\.(md|mdx)$/, "") === pageId
          );
          if (!route || route.frontmatter.hidden) return null;
          return {
            title: route.frontmatter.sidebarTitle || route.frontmatter.title,
            id: route.id,
            urlPath: route.urlPath,
            icon: route.frontmatter.icon,
            badge: normalizeBadge(route.frontmatter.badge),
          };
        })
        .filter(Boolean) as NavigationItem[],
    }));

    // Append remote/content-source pages not listed in explicit navigation.
    // These come from githubSource, notionSource, etc. and won't be in the
    // user's config.navigation — group them under "External" by default.
    const remotePagesNotInNav = routes.filter(
      (r) =>
        !explicitIds.has(r.id) &&
        !r.frontmatter.hidden &&
        r.filePath.startsWith("__remote__/")
    );

    if (remotePagesNotInNav.length > 0) {
      groups.push({
        section: "External",
        pages: remotePagesNotInNav.map((r) => ({
          title: r.frontmatter.sidebarTitle || r.frontmatter.title,
          id: r.id,
          urlPath: r.urlPath,
          icon: r.frontmatter.icon,
          badge: normalizeBadge(r.frontmatter.badge),
        })),
      });
    }

    return groups;
  }

  // Fallback: auto-generate navigation from file structure
  const groups: Map<string, NavigationItem[]> = new Map();

  for (const route of routes) {
    if (route.frontmatter.hidden) continue;

    const dir = dirname(route.filePath);
    const section = dir === "." ? "Documentation" : dir.split("/")[0]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    if (!groups.has(section)) {
      groups.set(section, []);
    }

    groups.get(section)!.push({
      title: route.frontmatter.sidebarTitle || route.frontmatter.title,
      id: route.id,
      urlPath: route.urlPath,
      icon: route.frontmatter.icon,
      badge: normalizeBadge(route.frontmatter.badge),
    });
  }

  return Array.from(groups.entries()).map(([section, pages]) => ({
    section,
    pages,
  }));
}

// ── PREV/NEXT HELPERS ────────────────────────────────────
export function getPrevNext(
  navigation: NavigationGroup[],
  currentId: string
): { prev: NavigationItem | null; next: NavigationItem | null } {
  const allPages = navigation.flatMap((g) => g.pages);
  const idx = allPages.findIndex((p) => p.id === currentId);

  if (idx === -1) return { prev: null, next: null };

  return {
    prev: idx > 0 ? allPages[idx - 1] : null,
    next: idx < allPages.length - 1 ? allPages[idx + 1] : null,
  };
}
