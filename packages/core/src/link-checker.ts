import { readFileSync } from "fs";
import type { PageRoute } from "./routes.js";
import type { TomeConfig } from "./config.js";
import { extractHeadingsFromSource } from "./markdown.js";
import matter from "gray-matter";

// ── TYPES ────────────────────────────────────────────────
export interface BrokenLink {
  /** Source file where the link was found */
  file: string;
  /** Line number (1-based) */
  line: number;
  /** The link target */
  href: string;
  /** Why this link is broken */
  reason: string;
}

export interface LinkCheckResult {
  /** Total internal links checked */
  totalLinks: number;
  /** Broken links found */
  broken: BrokenLink[];
  /** Whether the check passed (no broken links) */
  ok: boolean;
}

// ── LINK EXTRACTION ──────────────────────────────────────

/**
 * Extract internal links from markdown/MDX source.
 * Finds both `[text](url)` markdown links and `<a href="url">` HTML links.
 * Ignores external URLs (http/https), mailto:, tel:, and anchors-only (#).
 */
export function extractInternalLinks(
  source: string
): Array<{ href: string; line: number }> {
  const links: Array<{ href: string; line: number }> = [];
  const lines = source.split("\n");

  // Markdown links: [text](url) — ignore images ![alt](url)
  const mdLinkRegex = /(?<!!)\[(?:[^\]]*)\]\(([^)]+)\)/g;
  // HTML href: <a href="url"> or href='url'
  const htmlLinkRegex = /href=["']([^"']+)["']/g;

  for (let i = 0; i < lines.length; i++) {
    const lineText = lines[i];
    const lineNum = i + 1;

    let match;
    // Markdown links
    mdLinkRegex.lastIndex = 0;
    while ((match = mdLinkRegex.exec(lineText)) !== null) {
      const href = match[1].trim();
      if (isInternalLink(href)) {
        links.push({ href, line: lineNum });
      }
    }

    // HTML links
    htmlLinkRegex.lastIndex = 0;
    while ((match = htmlLinkRegex.exec(lineText)) !== null) {
      const href = match[1].trim();
      if (isInternalLink(href)) {
        links.push({ href, line: lineNum });
      }
    }
  }

  return links;
}

/**
 * Determine if a URL is an internal link (not external, mailto, tel, or pure anchor).
 */
function isInternalLink(href: string): boolean {
  if (!href) return false;
  // External
  if (href.startsWith("http://") || href.startsWith("https://")) return false;
  // Mailto / Tel
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  // Pure anchor link (handled separately)
  if (href.startsWith("#")) return false;
  // Protocol-relative
  if (href.startsWith("//")) return false;
  return true;
}

// ── NAVIGATION LINK EXTRACTION ───────────────────────────

/**
 * Extract all page IDs referenced in navigation config.
 */
function extractNavigationPageIds(
  navigation: TomeConfig["navigation"]
): string[] {
  const ids: string[] = [];

  function walk(pages: Array<string | { group: string; pages: Array<unknown> }>) {
    for (const entry of pages) {
      if (typeof entry === "string") {
        ids.push(entry);
      } else if (entry && typeof entry === "object" && "pages" in entry) {
        walk(entry.pages as Array<string | { group: string; pages: Array<unknown> }>);
      }
    }
  }

  for (const group of navigation) {
    walk(group.pages);
  }

  return ids;
}

// ── LINK RESOLUTION ──────────────────────────────────────

/**
 * Resolve a relative link to a page ID.
 * Handles:
 *  - "/quickstart" → "quickstart"
 *  - "quickstart" → "quickstart"
 *  - "./getting-started" → "getting-started"
 *  - "../api/endpoints" → "api/endpoints"
 *  - "quickstart#section" → page "quickstart", anchor "section"
 *  - "/docs/quickstart" → "quickstart" (strips basePath)
 */
function resolveLink(href: string, basePath?: string): { pageId: string; anchor?: string } {
  // Split off anchor
  const [path, anchor] = href.split("#", 2);

  // Normalize the path to a page ID
  let pageId = path
    .replace(/^\.\//, "")        // strip leading ./
    .replace(/^\//, "")          // strip leading /
    .replace(/\.mdx?$/, "")      // strip .md / .mdx extension
    .replace(/\/index$/, "")     // /index → root
    .replace(/\/$/, "");         // trailing slash

  // Strip basePath prefix (e.g. "docs/" from "/docs/quickstart")
  if (basePath) {
    const normalized = basePath.replace(/^\//, "").replace(/\/$/, "");
    if (normalized && pageId.startsWith(normalized + "/")) {
      pageId = pageId.slice(normalized.length + 1);
    } else if (normalized && pageId === normalized) {
      pageId = "index";
    }
  }

  // Handle relative paths with ../ — simplistic but works for flat structures
  pageId = pageId.replace(/^(\.\.\/)+/, "");

  if (!pageId) pageId = "index";

  return { pageId, anchor: anchor || undefined };
}

// ── MAIN CHECKER ─────────────────────────────────────────

/**
 * Check all internal links across documentation pages and navigation config.
 */
export function checkLinks(
  routes: PageRoute[],
  config: TomeConfig
): LinkCheckResult {
  const broken: BrokenLink[] = [];
  let totalLinks = 0;

  // Build set of known page IDs
  const knownPageIds = new Set(routes.map((r) => r.id));

  // Build map of page ID → heading IDs (for anchor validation)
  const headingsByPage = new Map<string, Set<string>>();
  for (const route of routes) {
    try {
      const source = readFileSync(route.absolutePath, "utf-8");
      const { content } = matter(source);
      const headings = extractHeadingsFromSource(content);
      headingsByPage.set(route.id, new Set(headings.map((h) => h.id)));
    } catch {
      // Skip unreadable files
      headingsByPage.set(route.id, new Set());
    }
  }

  // Check links in each page's source
  for (const route of routes) {
    try {
      const source = readFileSync(route.absolutePath, "utf-8");
      const { content } = matter(source);
      const links = extractInternalLinks(content);

      for (const link of links) {
        totalLinks++;
        const { pageId, anchor } = resolveLink(link.href, config.basePath);

        // Check if page exists
        if (!knownPageIds.has(pageId)) {
          broken.push({
            file: route.filePath,
            line: link.line,
            href: link.href,
            reason: `Page "${pageId}" does not exist`,
          });
          continue;
        }

        // Check if anchor exists on the target page
        if (anchor) {
          const pageHeadings = headingsByPage.get(pageId);
          if (pageHeadings && !pageHeadings.has(anchor)) {
            broken.push({
              file: route.filePath,
              line: link.line,
              href: link.href,
              reason: `Anchor "#${anchor}" not found on page "${pageId}"`,
            });
          }
        }
      }
    } catch {
      // Skip unreadable files
    }
  }

  // Check navigation config references
  if (config.navigation.length > 0) {
    const navPageIds = extractNavigationPageIds(config.navigation);
    for (const navId of navPageIds) {
      totalLinks++;
      if (!knownPageIds.has(navId)) {
        broken.push({
          file: "tome.config.js",
          line: 0,
          href: navId,
          reason: `Navigation references page "${navId}" which does not exist`,
        });
      }
    }
  }

  return {
    totalLinks,
    broken,
    ok: broken.length === 0,
  };
}

/**
 * Format broken link check results for console output.
 */
export function formatLinkCheckResults(result: LinkCheckResult): string {
  if (result.ok) {
    return `✓ ${result.totalLinks} internal links checked — all valid`;
  }

  const lines: string[] = [
    `✗ ${result.broken.length} broken link${result.broken.length === 1 ? "" : "s"} found (${result.totalLinks} total checked):`,
    "",
  ];

  for (const link of result.broken) {
    const location = link.line > 0 ? `${link.file}:${link.line}` : link.file;
    lines.push(`  ${location}`);
    lines.push(`    → ${link.href}`);
    lines.push(`    ${link.reason}`);
    lines.push("");
  }

  return lines.join("\n");
}
