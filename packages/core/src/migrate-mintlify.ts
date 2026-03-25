/**
 * Mintlify-to-Tome migration converter.
 *
 * Reads a Mintlify project (mint.json + MDX/MD pages), converts components
 * and configuration into Tome equivalents, and writes the result to an
 * output directory.
 */

import {
  readFileSync,
  existsSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  readdirSync,
  statSync,
} from 'fs';
import { join, relative, dirname, extname } from 'path';
import matter from 'gray-matter';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MintConfig = {
  name?: string;
  logo?: string | { light?: string; dark?: string };
  favicon?: string;
  colors?: {
    primary?: string;
    light?: string;
    dark?: string;
    background?: { light?: string; dark?: string };
  };
  navigation?: Array<{ group: string; pages: string[] }>;
  topbarLinks?: Array<{ name: string; url: string }>;
  topbarCtaButton?: { name: string; url: string };
  tabs?: Array<{ name: string; url: string }>;
  redirects?: Array<{ source: string; destination: string }>;
  openapi?: string | string[];
  api?: { baseUrl?: string; auth?: { method?: string; name?: string } };
};

export type NavigationGroup = {
  group: string;
  pages: Array<string | NavigationGroup>;
};

export type MigrationResult = {
  pages: number;
  redirects: number;
  warnings: string[];
  convertedFiles: string[];
};

// ---------------------------------------------------------------------------
// Config parsing
// ---------------------------------------------------------------------------

/** Parse the raw JSON content of a `mint.json` file into a typed config. */
export function parseMintConfig(jsonContent: string): MintConfig {
  try {
    return JSON.parse(jsonContent) as MintConfig;
  } catch (err) {
    throw new Error(
      `Failed to parse mint.json: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

// ---------------------------------------------------------------------------
// Navigation conversion
// ---------------------------------------------------------------------------

/**
 * Convert Mintlify navigation groups to Tome NavigationGroup format.
 *
 * Mintlify uses `{ group: "Name", pages: ["path1", "path2"] }` which maps
 * almost directly. We strip any leading slashes from page paths.
 */
export function convertMintNavigation(
  mintNav: Array<{ group: string; pages: string[] }>,
): NavigationGroup[] {
  if (!mintNav || mintNav.length === 0) return [];

  return mintNav.map((entry) => ({
    group: entry.group,
    pages: (entry.pages || []).map((p) =>
      typeof p === 'string' ? p.replace(/^\/+/, '') : p,
    ),
  }));
}

// ---------------------------------------------------------------------------
// Full config conversion
// ---------------------------------------------------------------------------

/** Convert a parsed MintConfig into a Tome-compatible config object. */
export function convertMintConfig(mintConfig: MintConfig): Record<string, any> {
  const tome: Record<string, any> = {};

  // Name
  if (mintConfig.name) {
    tome.name = mintConfig.name;
  }

  // Logo – prefer the light variant when an object is provided
  if (mintConfig.logo) {
    if (typeof mintConfig.logo === 'string') {
      tome.logo = mintConfig.logo;
    } else if (mintConfig.logo.light) {
      tome.logo = mintConfig.logo.light;
    } else if (mintConfig.logo.dark) {
      tome.logo = mintConfig.logo.dark;
    }
  }

  // Favicon
  if (mintConfig.favicon) {
    tome.favicon = mintConfig.favicon;
  }

  // Theme accent from primary colour
  if (mintConfig.colors?.primary) {
    const accent = mintConfig.colors.primary.startsWith('#')
      ? mintConfig.colors.primary
      : `#${mintConfig.colors.primary}`;
    tome.theme = { accent };
  }

  // Top-bar links → topNav
  if (mintConfig.topbarLinks && mintConfig.topbarLinks.length > 0) {
    tome.topNav = mintConfig.topbarLinks.map((link) => ({
      label: link.name,
      href: link.url,
    }));
  }

  // Navigation
  if (mintConfig.navigation && mintConfig.navigation.length > 0) {
    tome.navigation = convertMintNavigation(mintConfig.navigation);
  }

  // Redirects
  if (mintConfig.redirects && mintConfig.redirects.length > 0) {
    tome.redirects = mintConfig.redirects.map((r) => ({
      from: r.source,
      to: r.destination,
    }));
  }

  // OpenAPI spec
  if (mintConfig.openapi) {
    const spec = Array.isArray(mintConfig.openapi)
      ? mintConfig.openapi[0]
      : mintConfig.openapi;

    tome.api = { ...(tome.api || {}), spec };
  }

  // API base URL
  if (mintConfig.api?.baseUrl) {
    tome.api = { ...(tome.api || {}), baseUrl: mintConfig.api.baseUrl };
  }

  return tome;
}

// ---------------------------------------------------------------------------
// Content conversion helpers
// ---------------------------------------------------------------------------

/**
 * Convert Mintlify-specific MDX components to their Tome equivalents.
 *
 * Returns the converted string and a flag indicating whether the content
 * contains JSX (always `true` for Mintlify files).
 */
export function convertMintlifyContent(content: string): {
  converted: string;
  hasJsx: boolean;
} {
  let result = content;

  // 1. Callout components ------------------------------------------------
  //    <Note>…</Note>   → <Callout type="info">…</Callout>
  //    <Warning>…        → <Callout type="warning">…
  //    <Info>…           → <Callout type="info">…
  //    <Tip>…            → <Callout type="tip">…
  //    <Check>…          → <Callout type="tip">…

  const calloutMap: Record<string, string> = {
    Note: 'info',
    Warning: 'warning',
    Info: 'info',
    Tip: 'tip',
    Check: 'tip',
  };

  for (const [tag, type] of Object.entries(calloutMap)) {
    // Multiline / content version: <Tag>…</Tag>
    const contentRe = new RegExp(
      `<${tag}>([\\s\\S]*?)<\\/${tag}>`,
      'g',
    );
    result = result.replace(
      contentRe,
      `<Callout type="${type}">$1</Callout>`,
    );

    // Self-closing: <Tag /> (rare but possible)
    const selfCloseRe = new RegExp(`<${tag}\\s*/>`, 'g');
    result = result.replace(selfCloseRe, `<Callout type="${type}" />`);
  }

  // 2. CodeGroup → Tabs --------------------------------------------------
  //    Extract fenced code blocks inside <CodeGroup>, use their lang/title
  //    as tab labels. Uses indexOf instead of tempered greedy token to
  //    avoid catastrophic backtracking.
  {
    const codeGroupStartTag = '<CodeGroup>';
    const codeGroupEndTag = '</CodeGroup>';

    let searchIndex = 0;
    while (true) {
      const startIdx = result.indexOf(codeGroupStartTag, searchIndex);
      if (startIdx === -1) {
        break;
      }
      const innerStart = startIdx + codeGroupStartTag.length;
      const endIdx = result.indexOf(codeGroupEndTag, innerStart);
      if (endIdx === -1) {
        break;
      }

      const inner = result.slice(innerStart, endIdx);
      // Match fenced code blocks inside a <CodeGroup>:
      //   ```lang   optional-title
      //   <body>
      //   ```
      // Capture groups:
      //   1: optional language identifier (e.g. "ts", "js")
      //   2: optional title/label text on the same line after the language
      //   3: code block body, up to (but not including) the next closing ```
      const codeBlockRe = /```(\w+)?[^\S\n]*(.*)\n((?:(?!```)[\s\S])*)```/g;
      const tabs: { label: string; code: string }[] = [];
      let m: RegExpExecArray | null;

      while ((m = codeBlockRe.exec(inner)) !== null) {
        const lang = m[1] || '';
        const title = m[2]?.trim() || '';
        const body = m[3];
        const label = title || lang || 'Code';
        tabs.push({
          label,
          code: `\`\`\`${lang}${title ? ` ${title}` : ''}\n${body}\n\`\`\``,
        });
      }

      let replacement: string;
      if (tabs.length === 0) {
        replacement = inner.trim();
      } else {
        const items = JSON.stringify(tabs.map((t) => t.label));
        const tabBodies = tabs
          .map((t) => `<Tab>\n${t.code}\n</Tab>`)
          .join('\n');
        replacement = `<Tabs items={${items}}>\n${tabBodies}\n</Tabs>`;
      }

      const endTagEnd = endIdx + codeGroupEndTag.length;
      result = result.slice(0, startIdx) + replacement + result.slice(endTagEnd);
      searchIndex = startIdx + replacement.length;
    }
  }

  // 3. AccordionGroup → strip wrapper, keep inner Accordion components ---
  // Uses indexOf instead of [\s\S]*? to avoid catastrophic backtracking.
  {
    const agStartTag = '<AccordionGroup>';
    const agEndTag = '</AccordionGroup>';
    let agSearchIndex = 0;
    while (true) {
      const agStart = result.indexOf(agStartTag, agSearchIndex);
      if (agStart === -1) break;
      const agInnerStart = agStart + agStartTag.length;
      const agEnd = result.indexOf(agEndTag, agInnerStart);
      if (agEnd === -1) break;
      const inner = result.slice(agInnerStart, agEnd).trim();
      result = result.slice(0, agStart) + inner + result.slice(agEnd + agEndTag.length);
      agSearchIndex = agStart + inner.length;
    }
  }

  // 4. Frame → strip wrapper, keep content --------------------------------
  // Uses indexOf instead of [\s\S]*? to avoid catastrophic backtracking.
  {
    const frameEndTag = '</Frame>';
    const frameStartRe = /<Frame\b[^>]*>\s*/g;
    let frameMatch: RegExpExecArray | null;
    let frameResult = '';
    let frameLastIndex = 0;

    while ((frameMatch = frameStartRe.exec(result)) !== null) {
      frameResult += result.slice(frameLastIndex, frameMatch.index);
      const contentStart = frameStartRe.lastIndex;
      const endIdx = result.indexOf(frameEndTag, contentStart);
      if (endIdx === -1) {
        frameResult += result.slice(frameMatch.index);
        frameLastIndex = result.length;
        break;
      }
      frameResult += result.slice(contentStart, endIdx).trim();
      frameLastIndex = endIdx + frameEndTag.length;
      frameStartRe.lastIndex = frameLastIndex;
    }

    if (frameLastIndex > 0) {
      frameResult += result.slice(frameLastIndex);
      result = frameResult;
    }
  }

  // Self-closing Frame (edge case)
  result = result.replace(/<Frame\s*\/>/g, '');

  // 5. Snippet → TODO comment + keep reference ----------------------------
  result = result.replace(
    /<Snippet\s+file=["']([^"']+)["']\s*\/>/g,
    (_match, filePath: string) =>
      `{/* TODO: inline snippet from ${filePath} */}`,
  );

  // Mintlify files are always MDX
  return { converted: result, hasJsx: true };
}

// ---------------------------------------------------------------------------
// File-system helpers
// ---------------------------------------------------------------------------

/** Recursively walk a directory, returning all file paths. */
function walkDir(dir: string, fileList: string[] = []): string[] {
  if (!existsSync(dir)) return fileList;

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);

    // Skip common non-content directories
    if (
      entry === 'node_modules' ||
      entry === '.git' ||
      entry === '.next' ||
      entry === 'dist'
    ) {
      continue;
    }

    if (statSync(full).isDirectory()) {
      walkDir(full, fileList);
    } else {
      fileList.push(full);
    }
  }

  return fileList;
}

/** Copy a directory tree from src to dest, creating directories as needed. */
function copyDirRecursive(src: string, dest: string): void {
  if (!existsSync(src)) return;

  mkdirSync(dest, { recursive: true });

  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);

    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// ---------------------------------------------------------------------------
// Main migration orchestrator
// ---------------------------------------------------------------------------

/**
 * Migrate a Mintlify documentation project to Tome.
 *
 * @param sourceDir  Root of the Mintlify project (where mint.json lives).
 * @param outDir     Destination directory for the Tome project.
 * @param options    Optional flags – `dryRun` skips writing to disk.
 */
export async function migrateFromMintlify(
  sourceDir: string,
  outDir: string,
  options?: { dryRun?: boolean },
): Promise<MigrationResult> {
  const warnings: string[] = [];
  const convertedFiles: string[] = [];
  const dryRun = options?.dryRun ?? false;

  // 1. Read and parse mint.json or docs.json ------------------------------
  //    Mintlify deprecated mint.json in favor of docs.json — support both.
  const docsJsonPath = join(sourceDir, 'docs.json');
  const mintJsonPath = join(sourceDir, 'mint.json');
  const mintPath = existsSync(docsJsonPath) ? docsJsonPath : mintJsonPath;

  if (!existsSync(mintPath)) {
    throw new Error(`Neither docs.json nor mint.json found in ${sourceDir}`);
  }

  const mintConfig = parseMintConfig(readFileSync(mintPath, 'utf-8'));
  const tomeConfig = convertMintConfig(mintConfig);

  // 2. Collect content files (.mdx / .md) ---------------------------------
  const allFiles = walkDir(sourceDir);
  const contentFiles = allFiles.filter((f) => {
    const ext = extname(f).toLowerCase();
    return ext === '.mdx' || ext === '.md';
  });

  // 3. Convert each content file ------------------------------------------
  const pagesDir = join(outDir, 'pages');

  for (const filePath of contentFiles) {
    const raw = readFileSync(filePath, 'utf-8');
    const rel = relative(sourceDir, filePath);

    // Preserve frontmatter
    const { data: frontmatter, content: body } = matter(raw);
    const { converted } = convertMintlifyContent(body);

    // Check for components that need manual attention
    if (/<ResponseField[\s>]/i.test(converted)) {
      warnings.push(
        `${rel}: contains <ResponseField> which may need manual conversion`,
      );
    }
    if (/<ParamField[\s>]/i.test(converted)) {
      warnings.push(
        `${rel}: contains <ParamField> which may need manual conversion`,
      );
    }
    if (/\{\/\* TODO: inline snippet/i.test(converted)) {
      warnings.push(
        `${rel}: contains <Snippet> references that need to be inlined manually`,
      );
    }

    // Reconstruct file with frontmatter
    const outContent = matter.stringify(converted, frontmatter);

    // Determine output path – always write as .mdx
    const outFileName = rel.replace(/\.md$/, '.mdx');
    const outPath = join(pagesDir, outFileName);

    if (!dryRun) {
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, outContent, 'utf-8');
    }

    convertedFiles.push(outFileName);
  }

  // 4. Copy static assets -------------------------------------------------
  if (!dryRun) {
    const publicDir = join(outDir, 'public');

    // Common Mintlify asset directories
    for (const assetDir of ['images', 'public', 'static']) {
      const src = join(sourceDir, assetDir);
      if (existsSync(src)) {
        copyDirRecursive(src, join(publicDir, assetDir));
      }
    }
  }

  // 5. Generate tome.config.js --------------------------------------------
  if (!dryRun) {
    mkdirSync(outDir, { recursive: true });

    const configContent = [
      '/** @type {import("@tomehq/core").TomeConfig} */',
      `export default ${JSON.stringify(tomeConfig, null, 2)};`,
      '',
    ].join('\n');

    writeFileSync(join(outDir, 'tome.config.js'), configContent, 'utf-8');
  }

  // 6. Build result -------------------------------------------------------
  return {
    pages: convertedFiles.length,
    redirects: tomeConfig.redirects?.length ?? 0,
    warnings,
    convertedFiles,
  };
}
