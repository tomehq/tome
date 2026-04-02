/**
 * VitePress-to-Tome migration converter.
 *
 * Reads a VitePress project (`.vitepress/config.ts`, markdown pages)
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

type VitepressConfig = {
  title?: string;
  description?: string;
  sidebar: VitepressSidebarItem[] | Record<string, VitepressSidebarItem[]>;
  nav: Array<{ text: string; link: string }>;
  socialLinks: Array<{ icon: string; link: string }>;
};

type VitepressSidebarItem = {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: VitepressSidebarItem[];
};

// ---------------------------------------------------------------------------
// .vitepress/config parser
// ---------------------------------------------------------------------------

/**
 * Locate and read the VitePress config file.
 *
 * Checks for `config.ts`, `config.mts`, and `config.js` inside `.vitepress/`.
 */
function findConfigFile(sourceDir: string): string | null {
  const vitepressDir = resolve(sourceDir, ".vitepress");
  if (!existsSync(vitepressDir)) return null;

  for (const name of ["config.ts", "config.mts", "config.js"]) {
    const full = join(vitepressDir, name);
    if (existsSync(full)) return full;
  }

  return null;
}

/**
 * Parse a VitePress config file using regex extraction.
 *
 * We cannot safely `eval()` TypeScript config, so we extract known
 * fields via regex. Handles `defineConfig()` wrapper.
 */
export function parseVitepressConfig(configContent: string): VitepressConfig {
  const result: VitepressConfig = {
    sidebar: [],
    nav: [],
    socialLinks: [],
  };

  // Strip `defineConfig(` wrapper if present by unwrapping the outer call.
  let content = configContent;
  const defineMatch = content.match(/defineConfig\s*\(\s*(\{)/);
  if (defineMatch) {
    const start = defineMatch.index! + defineMatch[0].length - 1;
    content = content.slice(start);
    // Remove trailing `)` that closes defineConfig.
    const lastParen = content.lastIndexOf(")");
    if (lastParen !== -1) {
      content = content.slice(0, lastParen);
    }
  }

  // Extract title
  const titleMatch = content.match(/title\s*:\s*["'`]([^"'`]+)["'`]/);
  if (titleMatch) {
    result.title = titleMatch[1];
  }

  // Extract description
  const descMatch = content.match(/description\s*:\s*["'`]([^"'`]+)["'`]/);
  if (descMatch) {
    result.description = descMatch[1];
  }

  // Extract sidebar — find the `sidebar` key and capture the balanced structure.
  const sidebarMatch = content.match(/sidebar\s*:\s*/);
  if (sidebarMatch) {
    const sidebarStart = sidebarMatch.index! + sidebarMatch[0].length;
    const extracted = extractBalanced(content, sidebarStart);
    if (extracted) {
      try {
        // Normalize JS object notation to JSON:
        // - single quotes to double quotes
        // - remove trailing commas
        // - quote unquoted keys
        const jsonStr = normalizeToJson(extracted);
        result.sidebar = JSON.parse(jsonStr);
      } catch {
        // Sidebar parsing failed; leave as empty array.
      }
    }
  }

  // Extract nav
  const navMatch = content.match(/\bnav\s*:\s*/);
  if (navMatch) {
    const navStart = navMatch.index! + navMatch[0].length;
    const extracted = extractBalanced(content, navStart);
    if (extracted) {
      try {
        const jsonStr = normalizeToJson(extracted);
        result.nav = JSON.parse(jsonStr);
      } catch {
        // Nav parsing failed; leave as empty array.
      }
    }
  }

  // Extract socialLinks
  const socialMatch = content.match(/socialLinks\s*:\s*/);
  if (socialMatch) {
    const socialStart = socialMatch.index! + socialMatch[0].length;
    const extracted = extractBalanced(content, socialStart);
    if (extracted) {
      try {
        const jsonStr = normalizeToJson(extracted);
        result.socialLinks = JSON.parse(jsonStr);
      } catch {
        // Social links parsing failed; leave as empty array.
      }
    }
  }

  return result;
}

/**
 * Extract a balanced bracket/brace structure starting at `pos`.
 *
 * Returns the substring including the outer delimiters, or null if not found.
 */
function extractBalanced(str: string, pos: number): string | null {
  const open = str[pos];
  if (open !== "{" && open !== "[") return null;

  const close = open === "{" ? "}" : "]";
  let depth = 1;
  let i = pos + 1;
  let inString: string | null = null;

  while (i < str.length && depth > 0) {
    const ch = str[i];

    // Handle string literals.
    if (inString) {
      if (ch === inString && str[i - 1] !== "\\") {
        inString = null;
      }
    } else if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
    } else if (ch === open) {
      depth++;
    } else if (ch === close) {
      depth--;
    }

    i++;
  }

  if (depth !== 0) return null;
  return str.slice(pos, i);
}

/**
 * Normalize JavaScript object literal notation to valid JSON.
 *
 * - Replace single quotes with double quotes
 * - Remove trailing commas before `]` or `}`
 * - Quote unquoted object keys
 * - Remove line comments
 */
function normalizeToJson(jsStr: string): string {
  let s = jsStr;

  // Remove single-line comments while preserving `//` inside strings.
  {
    let result = "";
    let i = 0;
    let inStr: string | null = null;
    while (i < s.length) {
      const ch = s[i];
      if (inStr) {
        result += ch;
        if (ch === inStr && s[i - 1] !== "\\") inStr = null;
        i++;
      } else if (ch === '"' || ch === "'") {
        inStr = ch;
        result += ch;
        i++;
      } else if (ch === "/" && s[i + 1] === "/") {
        // Skip to end of line.
        while (i < s.length && s[i] !== "\n") i++;
      } else {
        result += ch;
        i++;
      }
    }
    s = result;
  }

  // Replace single-quoted strings with double-quoted.
  s = s.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');

  // Quote unquoted keys: `key:` or `key :` at the start of a line or after `{` or `,`.
  s = s.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

  // Remove trailing commas.
  s = s.replace(/,\s*([}\]])/g, "$1");

  return s;
}

// ---------------------------------------------------------------------------
// Sidebar → Tome navigation converter
// ---------------------------------------------------------------------------

/**
 * Convert a VitePress sidebar structure to Tome NavigationGroup[].
 *
 * Handles both object-keyed (multi-section) and array (single-section) formats.
 */
export function convertSidebarToNavigation(
  sidebar: VitepressSidebarItem[] | Record<string, VitepressSidebarItem[]>,
): NavigationGroup[] {
  if (Array.isArray(sidebar)) {
    return convertSidebarArray(sidebar);
  }

  // Object keyed by path — each key becomes a top-level context.
  const groups: NavigationGroup[] = [];
  for (const items of Object.values(sidebar)) {
    groups.push(...convertSidebarArray(items));
  }
  return groups;
}

/** Convert a flat array of VitePress sidebar items to NavigationGroup[]. */
function convertSidebarArray(
  items: VitepressSidebarItem[],
): NavigationGroup[] {
  const groups: NavigationGroup[] = [];

  for (const item of items) {
    if (item.items && item.items.length > 0) {
      // Group with children.
      const group: NavigationGroup = {
        group: item.text,
        pages: [],
      };

      for (const child of item.items) {
        if (child.link) {
          group.pages.push(linkToPageId(child.link));
        } else if (child.items && child.items.length > 0) {
          // Nested sub-group.
          const subGroup: NavigationGroup = {
            group: child.text,
            pages: child.items
              .filter((c) => c.link)
              .map((c) => linkToPageId(c.link!)),
          };
          group.pages.push(subGroup);
        }
      }

      groups.push(group);
    } else if (item.link) {
      // Standalone page without a group — collect into a default group.
      let defaultGroup = groups.find((g) => g.group === "Documentation");
      if (!defaultGroup) {
        defaultGroup = { group: "Documentation", pages: [] };
        groups.push(defaultGroup);
      }
      defaultGroup.pages.push(linkToPageId(item.link));
    }
  }

  return groups;
}

/**
 * Convert a VitePress link (e.g. `/guide/getting-started`) to a Tome page ID.
 *
 * Strips leading `/`, trailing `/`, and `.md` / `.html` extensions.
 */
function linkToPageId(link: string): string {
  let id = link;
  // Strip leading slash.
  id = id.replace(/^\//, "");
  // Strip trailing slash.
  id = id.replace(/\/$/, "");
  // Strip .md or .html extension.
  id = id.replace(/\.(md|html)$/, "");
  return id;
}

// ---------------------------------------------------------------------------
// VitePress content converter
// ---------------------------------------------------------------------------

/** Map VitePress container types to Tome Callout types. */
const CONTAINER_TYPE_MAP: Record<string, string> = {
  info: "info",
  tip: "tip",
  warning: "warning",
  danger: "danger",
  note: "info",
};

/**
 * Convert VitePress-specific markdown syntax to Tome components.
 *
 * Returns the converted content string and a flag indicating whether JSX
 * components (Callout, Tabs, Accordion) were introduced (requiring `.mdx`).
 */
export function convertVitepressContent(content: string): {
  converted: string;
  hasJsx: boolean;
} {
  let converted = content;
  let hasJsx = false;

  // ---- :::code-group → Tabs ---------------------------------------------
  // Must be handled before generic container blocks.
  {
    const codeGroupRe = /^:::code-group\s*$/gm;
    let result = "";
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeGroupRe.exec(converted)) !== null) {
      result += converted.slice(lastIndex, match.index);

      const innerStart = codeGroupRe.lastIndex;
      // Find the closing `:::` for this code-group block.
      const closeIndex = findClosingFence(converted, innerStart);
      if (closeIndex === -1) {
        result += converted.slice(match.index);
        lastIndex = converted.length;
        break;
      }

      const inner = converted.slice(innerStart, closeIndex);

      // Extract fenced code blocks from within the code-group.
      const fenceRe = /```(\w+)(?:\s+\[([^\]]+)\])?\s*\n([\s\S]*?)```/g;
      const titles: string[] = [];
      const bodies: string[] = [];
      let fenceMatch: RegExpExecArray | null;

      while ((fenceMatch = fenceRe.exec(inner)) !== null) {
        const lang = fenceMatch[1];
        const label = fenceMatch[2] || lang;
        const code = fenceMatch[3].trimEnd();
        titles.push(label);
        bodies.push("```" + lang + "\n" + code + "\n```");
      }

      if (titles.length > 0) {
        hasJsx = true;
        const itemsList = JSON.stringify(titles);
        const tabContent = bodies
          .map((b) => `<Tab>\n${b}\n</Tab>`)
          .join("\n");
        result += `<Tabs items={${itemsList}}>\n${tabContent}\n</Tabs>`;
      } else {
        // No code blocks found; keep the inner content as-is.
        result += inner;
      }

      // Skip past the closing `:::`.
      lastIndex = converted.indexOf("\n", closeIndex);
      if (lastIndex === -1) lastIndex = converted.length;
      else lastIndex += 1;

      codeGroupRe.lastIndex = lastIndex;
    }

    if (lastIndex > 0) {
      result += converted.slice(lastIndex);
      converted = result;
    }
  }

  // ---- :::details Summary → Accordion -----------------------------------
  {
    const detailsRe = /^:::\s*details\s+(\S[^\n]*\S)[^\S\n]*$/gm;
    let result = "";
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = detailsRe.exec(converted)) !== null) {
      const title = match[1].trim();
      result += converted.slice(lastIndex, match.index);

      const innerStart = detailsRe.lastIndex;
      const closeIndex = findClosingFence(converted, innerStart);
      if (closeIndex === -1) {
        result += converted.slice(match.index);
        lastIndex = converted.length;
        break;
      }

      const body = converted.slice(innerStart, closeIndex).trim();
      hasJsx = true;
      result += `<Accordion title="${title}">\n${body}\n</Accordion>`;

      lastIndex = converted.indexOf("\n", closeIndex);
      if (lastIndex === -1) lastIndex = converted.length;
      else lastIndex += 1;

      detailsRe.lastIndex = lastIndex;
    }

    if (lastIndex > 0) {
      result += converted.slice(lastIndex);
      converted = result;
    }
  }

  // ---- :::info / :::tip / :::warning / :::danger → Callout --------------
  {
    const containerRe = /^:::\s*(info|tip|warning|danger|note)(?:[^\S\n][^\n]*)?$/gm;
    let result = "";
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = containerRe.exec(converted)) !== null) {
      const type = match[1];
      result += converted.slice(lastIndex, match.index);

      const innerStart = containerRe.lastIndex;
      const closeIndex = findClosingFence(converted, innerStart);
      if (closeIndex === -1) {
        result += converted.slice(match.index);
        lastIndex = converted.length;
        break;
      }

      const body = converted.slice(innerStart, closeIndex).trim();
      const tomeType = CONTAINER_TYPE_MAP[type] ?? "info";
      hasJsx = true;
      result += `<Callout type="${tomeType}">\n${body}\n</Callout>`;

      lastIndex = converted.indexOf("\n", closeIndex);
      if (lastIndex === -1) lastIndex = converted.length;
      else lastIndex += 1;

      containerRe.lastIndex = lastIndex;
    }

    if (lastIndex > 0) {
      result += converted.slice(lastIndex);
      converted = result;
    }
  }

  // ---- [[toc]] → remove (Tome has built-in TOC) -------------------------
  converted = converted.replace(/\[\[toc\]\]/gi, "");

  // ---- Frontmatter: outline → toc ---------------------------------------
  // Handled separately during file processing (see convertFrontmatter).

  return { converted, hasJsx };
}

/**
 * Find the closing `:::` fence for a container block starting at `startPos`.
 *
 * Returns the index of the `:::` line, or -1 if not found.
 * Supports nested `:::` blocks by tracking depth.
 */
function findClosingFence(content: string, startPos: number): number {
  let depth = 1;
  let pos = startPos;

  while (pos < content.length && depth > 0) {
    const nextNewline = content.indexOf("\n", pos);
    const lineEnd = nextNewline === -1 ? content.length : nextNewline;
    const line = content.slice(pos, lineEnd).trim();

    if (line === ":::") {
      depth--;
      if (depth === 0) return pos;
    } else if (/^:::(?:info|tip|warning|danger|note|details|code-group)/.test(line)) {
      depth++;
    }

    pos = nextNewline === -1 ? content.length : nextNewline + 1;
  }

  return -1;
}

/**
 * Convert VitePress frontmatter fields to Tome equivalents.
 *
 * - `outline` (boolean or depth range) → `toc` (boolean)
 */
export function convertFrontmatter(
  frontmatter: Record<string, unknown>,
): Record<string, unknown> {
  const fm = { ...frontmatter };

  if ("outline" in fm) {
    // VitePress `outline: false` → Tome `toc: false`
    // VitePress `outline: [2, 3]` or `outline: deep` → Tome `toc: true`
    if (fm.outline === false) {
      fm.toc = false;
    } else {
      fm.toc = true;
    }
    delete fm.outline;
  }

  return fm;
}

// ---------------------------------------------------------------------------
// File-system helpers
// ---------------------------------------------------------------------------

/** Recursively collect all files under `dir` matching the given extensions. */
function walkFiles(dir: string, extensions: string[]): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;

  for (const entry of readdirSync(dir)) {
    // Skip the .vitepress directory.
    if (entry === ".vitepress") continue;
    // Skip node_modules.
    if (entry === "node_modules") continue;

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
// Config file generator
// ---------------------------------------------------------------------------

function generateTomeConfig(
  title: string,
  description: string | undefined,
  navigation: NavigationGroup[],
): string {
  const navJson = JSON.stringify(navigation, null, 2);

  const descLine = description
    ? `\n  description: ${JSON.stringify(description)},`
    : "";

  return `/** @type {import('@tomehq/core').TomeConfig} */
export default {
  title: ${JSON.stringify(title)},${descLine}
  navigation: ${navJson},
};
`;
}

// ---------------------------------------------------------------------------
// Main migration orchestrator
// ---------------------------------------------------------------------------

/**
 * Migrate a VitePress project to Tome.
 *
 * @param sourceDir  Path to the root of the VitePress project.
 * @param outDir     Destination directory for the generated Tome project.
 * @param options    Set `dryRun: true` to skip writing any files.
 */
export async function migrateFromVitepress(
  sourceDir: string,
  outDir: string,
  options: { dryRun?: boolean } = {},
): Promise<MigrationResult> {
  const warnings: string[] = [];
  const convertedFiles: string[] = [];

  // 1. Parse .vitepress/config.
  let vpConfig: VitepressConfig = {
    sidebar: [],
    nav: [],
    socialLinks: [],
  };

  const configFile = findConfigFile(sourceDir);
  if (configFile) {
    const raw = readFileSync(configFile, "utf-8");
    vpConfig = parseVitepressConfig(raw);
  } else {
    warnings.push(".vitepress/config not found; using default settings.");
  }

  const title = vpConfig.title ?? "Documentation";

  // 2. Convert sidebar to Tome navigation.
  const navigation = convertSidebarToNavigation(vpConfig.sidebar);

  // 3. Walk all .md files in the source directory (excluding .vitepress/).
  const mdFiles = walkFiles(sourceDir, [".md"]);
  const pagesDir = resolve(outDir, "pages");

  for (const mdFile of mdFiles) {
    const relPath = relative(sourceDir, mdFile);

    // Read and convert content.
    const raw = readFileSync(mdFile, "utf-8");
    const { data: frontmatter, content: body } = matter(raw);
    const { converted, hasJsx } = convertVitepressContent(body);

    // Convert VitePress-specific frontmatter.
    const tomeFm = convertFrontmatter(frontmatter);

    // Rebuild file content with preserved/updated frontmatter.
    const newContent = matter.stringify(converted, tomeFm);

    // Determine output extension.
    const outExt = hasJsx ? ".mdx" : ".md";
    const outFileName = basename(relPath, extname(relPath)) + outExt;
    const outPath = join(pagesDir, dirname(relPath), outFileName);

    if (!options.dryRun) {
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, newContent, "utf-8");
    }

    convertedFiles.push(relative(outDir, outPath));
  }

  // 4. Copy assets from .vitepress/public/ → public/.
  if (!options.dryRun) {
    const publicDir = resolve(outDir, "public");
    const vpPublic = resolve(sourceDir, ".vitepress", "public");
    if (existsSync(vpPublic)) {
      copyDirRecursive(vpPublic, publicDir);
    }

    // Some VitePress projects use a top-level `public/` directory.
    const topPublic = resolve(sourceDir, "public");
    if (existsSync(topPublic)) {
      copyDirRecursive(topPublic, publicDir);
    }
  }

  // 5. Generate tome.config.js.
  if (!options.dryRun) {
    mkdirSync(outDir, { recursive: true });
    const configContent = generateTomeConfig(
      title,
      vpConfig.description,
      navigation,
    );
    writeFileSync(resolve(outDir, "tome.config.js"), configContent, "utf-8");
  }

  return {
    pages: convertedFiles.length,
    redirects: 0,
    warnings,
    convertedFiles,
  };
}
