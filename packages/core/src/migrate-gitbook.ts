/**
 * GitBook-to-Tome migration converter.
 *
 * Reads a GitBook project (`.gitbook.yaml`, `SUMMARY.md`, markdown pages)
 * and converts it into a Tome-compatible structure with `tome.config.js`,
 * a `pages/` directory, and converted MDX where necessary.
 */

import {
  readFileSync,
  existsSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  readdirSync,
  statSync,
} from "fs";
import { resolve, join, relative, dirname, basename, extname } from "path";
import yaml from "yaml";
import matter from "gray-matter";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NavigationGroup = {
  group: string;
  pages: (string | NavigationGroup)[];
};

export type MigrationResult = {
  pages: number;
  redirects: number;
  warnings: string[];
  convertedFiles: string[];
};

type GitbookConfig = {
  root?: string;
  summaryPath?: string;
  redirects: Array<{ from: string; to: string }>;
};

// ---------------------------------------------------------------------------
// SUMMARY.md parser
// ---------------------------------------------------------------------------

/**
 * Parse a SUMMARY.md file into a Tome-compatible navigation structure.
 *
 * Supports:
 *  - `* [Title](path.md)` and `- [Title](path.md)` link entries
 *  - `## Group Name` headings as group separators
 *  - Unlinked list items (`* Group Name`) as inline group headers
 *  - 2- or 4-space indentation for nesting
 */
export function parseSummaryNavigation(
  summaryContent: string,
): NavigationGroup[] {
  const lines = summaryContent.split("\n");
  const groups: NavigationGroup[] = [];

  // Current top-level group; lazily created.
  let currentGroup: NavigationGroup = { group: "Documentation", pages: [] };

  // Regex for a markdown link inside a list item.
  const linkRe = /^(\s*)[\*\-]\s+\[([^\]]+)\]\(([^)]+)\)/;
  // Regex for a heading-based group separator.
  const headingRe = /^#{1,6}\s+(.+)/;
  // Regex for an unlinked list item used as a group header.
  const unlinkRe = /^(\s*)[\*\-]\s+([^\[].+)/;

  for (const line of lines) {
    // -- heading-based group --
    const headingMatch = line.match(headingRe);
    if (headingMatch) {
      // Flush previous group if it has pages.
      if (currentGroup.pages.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = { group: headingMatch[1].trim(), pages: [] };
      continue;
    }

    // -- linked page entry --
    const linkMatch = line.match(linkRe);
    if (linkMatch) {
      const indent = linkMatch[1].length;
      const filePath = linkMatch[3];

      // Strip .md extension to derive a page ID.
      const pageId = filePath.replace(/\.md$/, "");

      if (indent === 0) {
        // Top-level page.
        currentGroup.pages.push(pageId);
      } else {
        // Nested page: attach to the most recent sub-group or create one.
        const lastEntry = currentGroup.pages[currentGroup.pages.length - 1];
        if (typeof lastEntry === "object" && lastEntry !== null) {
          (lastEntry as NavigationGroup).pages.push(pageId);
        } else {
          // Wrap the previous entry as a sub-group.
          currentGroup.pages.push(pageId);
        }
      }
      continue;
    }

    // -- unlinked list item as inline sub-group header --
    const unlinkMatch = line.match(unlinkRe);
    if (unlinkMatch) {
      const indent = unlinkMatch[1].length;
      const groupName = unlinkMatch[2].trim();

      if (indent === 0) {
        // Treat as a new top-level group.
        if (currentGroup.pages.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = { group: groupName, pages: [] };
      } else {
        // Nested sub-group.
        currentGroup.pages.push({ group: groupName, pages: [] });
      }
    }
  }

  // Flush remaining group.
  if (currentGroup.pages.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

// ---------------------------------------------------------------------------
// GitBook content converter
// ---------------------------------------------------------------------------

/** Style mapping from GitBook hint styles to Tome Callout types. */
const HINT_STYLE_MAP: Record<string, string> = {
  info: "info",
  warning: "warning",
  danger: "danger",
  success: "tip",
};

/**
 * Convert GitBook-specific template syntax to Tome components.
 *
 * Returns the converted content string and a flag indicating whether JSX
 * components (Callout, Tabs) were introduced (requiring `.mdx` extension).
 */
export function convertGitbookContent(content: string): {
  converted: string;
  hasJsx: boolean;
} {
  let converted = content;
  let hasJsx = false;

  // ---- Hint blocks → Callout ------------------------------------------
  // Handles multiline content between {% hint %} and {% endhint %}.
  converted = converted.replace(
    /\{%\s*hint\s+style="([^"]+)"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g,
    (_match, style: string, body: string) => {
      hasJsx = true;
      const tomeType = HINT_STYLE_MAP[style] ?? "info";
      return `<Callout type="${tomeType}">\n${body.trim()}\n</Callout>`;
    },
  );

  // ---- Tab blocks → Tabs / Tab ----------------------------------------
  converted = converted.replace(
    /\{%\s*tabs\s*%\}([\s\S]*?)\{%\s*endtabs\s*%\}/g,
    (_match, inner: string) => {
      hasJsx = true;

      const tabRe =
        /\{%\s*tab\s+title="([^"]+)"\s*%\}([\s\S]*?)(?=\{%\s*(?:endtab|tab\s)|$)/g;
      const titles: string[] = [];
      const bodies: string[] = [];

      let tabMatch: RegExpExecArray | null;
      while ((tabMatch = tabRe.exec(inner)) !== null) {
        titles.push(tabMatch[1]);
        // Strip trailing {% endtab %} that might be captured.
        const body = tabMatch[2].replace(/\{%\s*endtab\s*%\}/g, "").trim();
        bodies.push(body);
      }

      const itemsList = JSON.stringify(titles);
      const tabContent = bodies.map((b) => `<Tab>\n${b}\n</Tab>`).join("\n");
      return `<Tabs items={${itemsList}}>\n${tabContent}\n</Tabs>`;
    },
  );

  // ---- Code titles ----------------------------------------------------
  // {% code title="file.js" %} followed by a code fence → merge title.
  converted = converted.replace(
    /\{%\s*code\s+title="([^"]+)"\s*%\}\s*\n(```\w*)/g,
    (_match, title: string, fence: string) => {
      return `${fence} title="${title}"`;
    },
  );
  // Remove any stray {% endcode %} markers.
  converted = converted.replace(/\{%\s*endcode\s*%\}/g, "");

  // ---- Embed blocks → markdown link -----------------------------------
  converted = converted.replace(
    /\{%\s*embed\s+url="([^"]+)"(?:\s+[^%]*)?\s*%\}/g,
    (_match, url: string) => {
      return `[Embedded content](${url})`;
    },
  );

  // ---- Content-ref blocks → markdown link -----------------------------
  converted = converted.replace(
    /\{%\s*content-ref\s+url="([^"]+)"\s*%\}[\s\S]*?\{%\s*endcontent-ref\s*%\}/g,
    (_match, url: string) => {
      return `[See page](${url})`;
    },
  );

  return { converted, hasJsx };
}

// ---------------------------------------------------------------------------
// .gitbook.yaml parser
// ---------------------------------------------------------------------------

/**
 * Parse a `.gitbook.yaml` configuration file.
 *
 * Typical schema:
 * ```yaml
 * root: ./docs/
 * structure:
 *   summary: SUMMARY.md
 * redirects:
 *   old-path: new-path
 * ```
 */
export function parseGitbookConfig(yamlContent: string): GitbookConfig {
  const doc = yaml.parse(yamlContent) ?? {};

  const root: string | undefined = doc.root
    ? String(doc.root).replace(/\/$/, "")
    : undefined;

  const summaryPath: string | undefined = doc.structure?.summary
    ? String(doc.structure.summary)
    : undefined;

  const redirects: Array<{ from: string; to: string }> = [];
  if (doc.redirects && typeof doc.redirects === "object") {
    for (const [from, to] of Object.entries(doc.redirects)) {
      redirects.push({ from, to: String(to) });
    }
  }

  return { root, summaryPath, redirects };
}

// ---------------------------------------------------------------------------
// File-system helpers
// ---------------------------------------------------------------------------

/** Recursively collect all files under `dir` matching the given extensions. */
function walkFiles(dir: string, extensions: string[]): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...walkFiles(full, extensions));
    } else if (extensions.includes(extname(full).toLowerCase())) {
      results.push(full);
    }
  }

  return results;
}

/** Copy a directory tree from `src` to `dest`, creating directories as needed. */
function copyDirRecursive(src: string, dest: string): void {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });

  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stat = statSync(srcPath);
    if (stat.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// ---------------------------------------------------------------------------
// Build title map from SUMMARY.md
// ---------------------------------------------------------------------------

/** Extract a mapping of file paths (without .md) to their display titles. */
function buildTitleMap(summaryContent: string): Map<string, string> {
  const map = new Map<string, string>();
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(summaryContent)) !== null) {
    const title = m[1];
    const pagePath = m[2].replace(/\.md$/, "");
    map.set(pagePath, title);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Config file generator
// ---------------------------------------------------------------------------

function generateTomeConfig(
  navigation: NavigationGroup[],
  redirects: Array<{ from: string; to: string }>,
): string {
  const navJson = JSON.stringify(navigation, null, 2);

  const redirectsBlock =
    redirects.length > 0
      ? `\n  redirects: ${JSON.stringify(
          Object.fromEntries(redirects.map((r) => [r.from, r.to])),
          null,
          2,
        )},`
      : "";

  return `/** @type {import('@tomehq/core').TomeConfig} */
export default {
  title: "Documentation",
  navigation: ${navJson},${redirectsBlock}
};
`;
}

// ---------------------------------------------------------------------------
// Main migration orchestrator
// ---------------------------------------------------------------------------

/**
 * Migrate a GitBook project to Tome.
 *
 * @param sourceDir  Path to the root of the GitBook project.
 * @param outDir     Destination directory for the generated Tome project.
 * @param options    Set `dryRun: true` to skip writing any files.
 */
export async function migrateFromGitbook(
  sourceDir: string,
  outDir: string,
  options: { dryRun?: boolean } = {},
): Promise<MigrationResult> {
  const warnings: string[] = [];
  const convertedFiles: string[] = [];

  // 1. Parse .gitbook.yaml if present.
  let config: GitbookConfig = { redirects: [] };
  const configPath = resolve(sourceDir, ".gitbook.yaml");
  if (existsSync(configPath)) {
    config = parseGitbookConfig(readFileSync(configPath, "utf-8"));
  } else {
    warnings.push(".gitbook.yaml not found; using default settings.");
  }

  // Resolve the content root directory.
  const contentRoot = config.root
    ? resolve(sourceDir, config.root)
    : sourceDir;

  // 2. Parse SUMMARY.md for navigation.
  const summaryFile = resolve(
    contentRoot,
    config.summaryPath ?? "SUMMARY.md",
  );
  let navigation: NavigationGroup[] = [];
  let summaryContent = "";

  if (existsSync(summaryFile)) {
    summaryContent = readFileSync(summaryFile, "utf-8");
    navigation = parseSummaryNavigation(summaryContent);
  } else {
    warnings.push("SUMMARY.md not found; navigation will be empty.");
  }

  const titleMap = buildTitleMap(summaryContent);

  // 3. Walk all .md files in the content root.
  const mdFiles = walkFiles(contentRoot, [".md"]);
  const pagesDir = resolve(outDir, "pages");

  for (const mdFile of mdFiles) {
    const relPath = relative(contentRoot, mdFile);

    // Skip SUMMARY.md itself.
    if (basename(mdFile) === "SUMMARY.md") continue;

    // Read and convert content.
    const raw = readFileSync(mdFile, "utf-8");
    const { data: frontmatter, content: body } = matter(raw);
    const { converted, hasJsx } = convertGitbookContent(body);

    // Infer title from SUMMARY.md if frontmatter lacks one.
    const pageId = relPath.replace(/\.md$/, "");
    if (!frontmatter.title && titleMap.has(pageId)) {
      frontmatter.title = titleMap.get(pageId);
    }

    // Rebuild file content with preserved/updated frontmatter.
    const newContent = matter.stringify(converted, frontmatter);

    // Determine output extension.
    const outExt = hasJsx ? ".mdx" : ".md";
    const outFileName =
      basename(relPath, extname(relPath)) + outExt;
    const outPath = join(pagesDir, dirname(relPath), outFileName);

    if (!options.dryRun) {
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, newContent, "utf-8");
    }

    convertedFiles.push(relative(outDir, outPath));
  }

  // 4. Copy image assets.
  if (!options.dryRun) {
    const publicDir = resolve(outDir, "public");

    // GitBook stores images in `.gitbook/assets/`.
    const gitbookAssets = resolve(sourceDir, ".gitbook", "assets");
    if (existsSync(gitbookAssets)) {
      copyDirRecursive(gitbookAssets, join(publicDir, "assets"));
    }

    // Some projects use a top-level `images/` directory.
    const imagesDir = resolve(contentRoot, "images");
    if (existsSync(imagesDir)) {
      copyDirRecursive(imagesDir, join(publicDir, "images"));
    }
  }

  // 5. Generate tome.config.js.
  if (!options.dryRun) {
    mkdirSync(outDir, { recursive: true });
    const configContent = generateTomeConfig(navigation, config.redirects);
    writeFileSync(resolve(outDir, "tome.config.js"), configContent, "utf-8");
  }

  return {
    pages: convertedFiles.length,
    redirects: config.redirects.length,
    warnings,
    convertedFiles,
  };
}
