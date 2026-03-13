import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import { createHighlighter, type Highlighter } from "shiki";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

// ── HTML SANITIZATION ────────────────────────────────────
// Whitelist safe tags/attrs while blocking script injection, event handlers, etc.
const SANITIZE_CONFIG = {
  // Allow all standard HTML + Shiki output + heading anchors
  ALLOWED_TAGS: [
    // Block-level
    "h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "section", "article",
    "blockquote", "pre", "code", "ul", "ol", "li", "dl", "dt", "dd",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
    "hr", "br", "figure", "figcaption", "details", "summary",
    // Inline
    "a", "span", "strong", "em", "b", "i", "u", "s", "del", "ins",
    "sub", "sup", "small", "mark", "abbr", "kbd", "var", "samp",
    // Media (src validated by DOMPurify)
    "img", "picture", "source", "video", "audio",
    // Shiki output
    "style",
  ],
  ALLOWED_ATTR: [
    // Standard
    "id", "class", "className", "href", "src", "alt", "title", "target",
    "rel", "width", "height", "loading", "decoding",
    // Table
    "colspan", "rowspan", "scope",
    // Heading anchors
    "aria-hidden", "tabindex",
    // Shiki inline styles
    "style",
    // Data attributes (used by components)
    "data-*",
    // Media
    "controls", "autoplay", "loop", "muted", "poster", "type",
  ],
  // Block all event handlers (onclick, onerror, onload, etc.)
  FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"],
  // Block dangerous tags entirely
  FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "input", "textarea", "select", "button"],
  // Allow data: URIs for images only, block javascript: URIs everywhere
  ALLOW_DATA_ATTR: true,
  ADD_URI_SAFE_ATTR: ["style"],
};

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, SANITIZE_CONFIG) as string;
}

// ── FRONTMATTER SCHEMA (TOM-10) ───────────────────────────
const FrontmatterSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  sidebarTitle: z.string().optional(),
  hidden: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  toc: z.boolean().default(true),
  lastUpdated: z.string().optional(),
  type: z.enum(["page", "changelog"]).optional(),
  ogImage: z.string().optional(),
  redirect_from: z.array(z.string()).optional(),
});

export type PageFrontmatter = {
  title: string;
  description?: string;
  icon?: string;
  sidebarTitle?: string;
  hidden?: boolean;
  tags?: string[];
  toc?: boolean;
  lastUpdated?: string;
  type?: "page" | "changelog";
  ogImage?: string;
  redirect_from?: string[];
};

function validateFrontmatter(
  raw: Record<string, unknown>,
  filePath?: string
): z.infer<typeof FrontmatterSchema> {
  const result = FrontmatterSchema.safeParse(raw);
  if (!result.success) {
    const loc = filePath ? ` in ${filePath}` : "";
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    console.warn(`[tome] Frontmatter validation warning${loc}:\n${issues}`);
  }
  // Return with defaults applied (coerce booleans etc.)
  return FrontmatterSchema.catch({
    hidden: false,
    toc: true,
  }).parse(raw);
}

export interface ProcessedPage {
  frontmatter: PageFrontmatter;
  html: string;
  headings: Array<{ depth: number; text: string; id: string }>;
  raw: string;
}

// ── SHIKI HIGHLIGHTER (singleton) ────────────────────────
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: [
        "javascript", "typescript", "jsx", "tsx", "bash", "shell",
        "json", "yaml", "markdown", "css", "html", "python",
        "go", "rust", "java", "ruby", "php", "sql", "graphql",
        "docker", "toml", "diff", "text",
      ],
    });
  }
  return highlighterPromise;
}

// ── HEADING EXTRACTION ───────────────────────────────────
function extractHeadings(html: string): Array<{ depth: number; text: string; id: string }> {
  const headings: Array<{ depth: number; text: string; id: string }> = [];
  const regex = /<h([2-4])\s+id="([^"]*)"[^>]*>(.*?)<\/h[2-4]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    // Strip HTML tags from heading text
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    headings.push({
      depth: parseInt(match[1]),
      text,
      id: match[2],
    });
  }
  return headings;
}

// ── HEADING EXTRACTION FROM RAW MARKDOWN ─────────────────
export function extractHeadingsFromSource(
  source: string
): Array<{ depth: number; text: string; id: string }> {
  const headings: Array<{ depth: number; text: string; id: string }> = [];
  const regex = /^(#{1,6})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(source)) !== null) {
    const depth = match[1].length;
    if (depth < 2 || depth > 4) continue;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    headings.push({ depth, text, id });
  }
  return headings;
}

// ── CODE BLOCK TRANSFORM ─────────────────────────────────
function createCodeBlockTransformer(highlighter: Highlighter) {
  return (html: string): string => {
    // Replace <pre><code class="language-xxx"> blocks with Shiki output
    return html.replace(
      /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
      (_match, lang: string, code: string) => {
        // Decode HTML entities back to raw text for Shiki
        // Handles both named entities (&amp;) and hex entities (&#x26;)
        const decoded = code
          .replace(/&#x26;/g, "&")
          .replace(/&#x3C;/g, "<")
          .replace(/&#x3E;/g, ">")
          .replace(/&#x27;/g, "'")
          .replace(/&#x22;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");

        // Mermaid: emit a placeholder div for client-side rendering
        if (lang === "mermaid") {
          const encoded = Buffer.from(decoded.trim()).toString("base64");
          return `<div class="tome-mermaid" data-mermaid="${encoded}"></div>`;
        }

        try {
          return highlighter.codeToHtml(decoded.trim(), {
            lang: lang || "text",
            themes: { dark: "github-dark", light: "github-light" },
          });
        } catch {
          // Fallback: return original with basic styling
          return `<pre class="tome-code" data-lang="${lang}"><code>${code}</code></pre>`;
        }
      }
    );
  };
}

// ── PLUGIN TYPES (TOM-57) ────────────────────────────────
export interface MarkdownPluginOptions {
  /** Custom remark plugins to add after built-in remark plugins */
  remarkPlugins?: Array<[any, ...any[]]>;
  /** Custom rehype plugins to add after built-in rehype plugins */
  rehypePlugins?: Array<[any, ...any[]]>;
}

// ── MAIN PROCESSOR ───────────────────────────────────────
export interface MarkdownMathOptions {
  /** Enable remark-math + rehype-katex for LaTeX math rendering */
  math?: boolean;
}

export async function processMarkdown(
  source: string,
  filePath?: string,
  pluginOptions?: MarkdownPluginOptions,
  mathOptions?: MarkdownMathOptions
): Promise<ProcessedPage> {
  // Extract frontmatter
  const { data, content } = matter(source);

  // Validate frontmatter (TOM-10)
  const validated = validateFrontmatter(data as Record<string, unknown>, filePath);

  // Infer title from first heading if not in frontmatter
  let title = validated.title;
  if (!title) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    title = titleMatch ? titleMatch[1].trim() : "Untitled";
  }

  const frontmatter: PageFrontmatter = {
    title,
    description: validated.description,
    icon: validated.icon,
    sidebarTitle: validated.sidebarTitle,
    hidden: validated.hidden,
    tags: validated.tags,
    toc: validated.toc,
    lastUpdated: validated.lastUpdated,
    type: validated.type,
    ogImage: validated.ogImage,
    redirect_from: validated.redirect_from,
  };

  // Process Markdown → HTML
  // eslint-disable-next-line -- unified processor generics are complex; pipeline is type-safe at each step
  let processor: any = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkGfm);

  // TOM-57: Apply custom remark plugins (after built-in remark plugins)
  if (pluginOptions?.remarkPlugins) {
    for (const plugin of pluginOptions.remarkPlugins) {
      const [fn, ...args] = plugin;
      processor = processor.use(fn, ...args);
    }
  }

  // Math support: add remark-math before remarkRehype
  if (mathOptions?.math) {
    try {
      // @ts-ignore — optional peer dependency
      const remarkMath = (await import("remark-math")).default;
      processor = processor.use(remarkMath);
    } catch {
      console.warn("[tome] remark-math not installed — math blocks will not be processed. Install with: pnpm add remark-math rehype-katex katex");
    }
  }

  processor = processor
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "prepend", properties: { className: ["heading-anchor"], ariaHidden: true, tabIndex: -1 } });

  // Math support: add rehype-katex after rehypeAutolinkHeadings
  if (mathOptions?.math) {
    try {
      // @ts-ignore — optional peer dependency
      const rehypeKatex = (await import("rehype-katex")).default;
      processor = processor.use(rehypeKatex);
    } catch {
      // Already warned above
    }
  }

  // TOM-57: Apply custom rehype plugins (after built-in rehype plugins)
  if (pluginOptions?.rehypePlugins) {
    for (const plugin of pluginOptions.rehypePlugins) {
      const [fn, ...args] = plugin;
      processor = processor.use(fn, ...args);
    }
  }

  processor = processor.use(rehypeStringify, { allowDangerousHtml: true });

  const result = await processor.process(content);
  let html = String(result);

  // Apply syntax highlighting
  const highlighter = await getHighlighter();
  const transformCodeBlocks = createCodeBlockTransformer(highlighter);
  html = transformCodeBlocks(html);

  // Sanitize HTML to prevent XSS (blocks script, iframe, event handlers, etc.)
  html = sanitizeHtml(html);

  // Extract headings for TOC
  const headings = extractHeadings(html);

  return {
    frontmatter,
    html,
    headings,
    raw: content,
  };
}

// ── BATCH PROCESSOR ──────────────────────────────────────
export async function processMarkdownFile(filePath: string): Promise<ProcessedPage> {
  const { readFileSync } = await import("fs");
  const source = readFileSync(filePath, "utf-8");
  return processMarkdown(source, filePath);
}
