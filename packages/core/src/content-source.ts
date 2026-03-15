// ── CONTENT SOURCE ADAPTER SYSTEM ────────────────────────
// Extensible interface for pulling docs from external sources
// (GitHub repos, Notion, custom APIs) in addition to local filesystem.

// ── TYPES ────────────────────────────────────────────────

export interface ContentPage {
  /** Unique page identifier (e.g., "getting-started") */
  id: string;
  /** Raw markdown/MDX content including frontmatter */
  content: string;
  /** File extension: "md" or "mdx" */
  format: "md" | "mdx";
  /** Last modified date (ISO 8601) */
  lastModified?: string;
}

export interface ContentSource {
  /** Unique name for this source */
  name: string;

  /** Fetch all pages from this source */
  fetchPages(): Promise<ContentPage[]>;

  /** Optional: watch for changes (returns cleanup function) */
  watch?(onChange: (pages: ContentPage[]) => void): () => void;
}

/** Helper to define a content source with type checking */
export function defineContentSource(source: ContentSource): ContentSource {
  return source;
}

// ── GITHUB CONTENT SOURCE ────────────────────────────────

export interface GitHubSourceOptions {
  owner: string;
  repo: string;
  branch?: string;
  /** Path within the repo to look for docs (e.g., "docs/pages") */
  path?: string;
  /** GitHub token for private repos */
  token?: string;
}

export function githubSource(options: GitHubSourceOptions): ContentSource {
  const { owner, repo, branch = "main", path = "docs", token } = options;

  return {
    name: `github:${owner}/${repo}`,

    async fetchPages(): Promise<ContentPage[]> {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      // Use GitHub Trees API to list all files recursively
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
      const res = await fetch(apiUrl, { headers });
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

      const data = (await res.json()) as { tree: Array<{ path: string; type: string }> };
      const prefix = path.endsWith("/") ? path : path + "/";

      const mdFiles = data.tree.filter(
        (f) =>
          f.path.startsWith(prefix) &&
          (f.path.endsWith(".md") || f.path.endsWith(".mdx")) &&
          f.type === "blob",
      );

      const pages: ContentPage[] = [];

      for (const file of mdFiles) {
        const contentRes = await fetch(
          `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} },
        );
        if (!contentRes.ok) continue;

        const content = await contentRes.text();
        const relativePath = file.path.slice(prefix.length);
        const id = relativePath
          .replace(/\.(md|mdx)$/, "")
          .replace(/\/index$/, "");
        const format: "md" | "mdx" = file.path.endsWith(".mdx") ? "mdx" : "md";

        pages.push({ id, content, format });
      }

      return pages;
    },
  };
}

// ── NOTION CONTENT SOURCE ────────────────────────────────

export interface NotionSourceOptions {
  apiKey: string;
  databaseId: string;
}

export function notionSource(options: NotionSourceOptions): ContentSource {
  return {
    name: `notion:${options.databaseId}`,

    async fetchPages(): Promise<ContentPage[]> {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${options.apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      };

      const res = await fetch(
        `https://api.notion.com/v1/databases/${options.databaseId}/query`,
        { method: "POST", headers, body: JSON.stringify({}) },
      );
      if (!res.ok) throw new Error(`Notion API error: ${res.status}`);

      const data = (await res.json()) as { results: any[] };
      const pages: ContentPage[] = [];

      for (const page of data.results) {
        // Fetch child blocks for each page
        const blocksRes = await fetch(
          `https://api.notion.com/v1/blocks/${page.id}/children`,
          { headers },
        );
        if (!blocksRes.ok) continue;

        const blocks = (await blocksRes.json()) as { results: any[] };

        const title =
          page.properties?.Name?.title?.[0]?.plain_text ||
          page.properties?.title?.title?.[0]?.plain_text ||
          "Untitled";
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        const content = notionBlocksToMarkdown(title, blocks.results);
        pages.push({ id: slug, content, format: "md" });
      }

      return pages;
    },
  };
}

// ── NOTION BLOCK → MARKDOWN CONVERSION ───────────────────

export function notionBlocksToMarkdown(title: string, blocks: any[]): string {
  let md = `---\ntitle: ${title}\n---\n\n`;

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        md += richTextToMd(block.paragraph.rich_text) + "\n\n";
        break;
      case "heading_1":
        md += `## ${richTextToMd(block.heading_1.rich_text)}\n\n`;
        break;
      case "heading_2":
        md += `### ${richTextToMd(block.heading_2.rich_text)}\n\n`;
        break;
      case "heading_3":
        md += `#### ${richTextToMd(block.heading_3.rich_text)}\n\n`;
        break;
      case "bulleted_list_item":
        md += `- ${richTextToMd(block.bulleted_list_item.rich_text)}\n`;
        break;
      case "numbered_list_item":
        md += `1. ${richTextToMd(block.numbered_list_item.rich_text)}\n`;
        break;
      case "code": {
        const lang = block.code.language || "";
        md += `\`\`\`${lang}\n${richTextToMd(block.code.rich_text)}\n\`\`\`\n\n`;
        break;
      }
      case "quote":
        md += `> ${richTextToMd(block.quote.rich_text)}\n\n`;
        break;
      case "divider":
        md += "---\n\n";
        break;
      default:
        break;
    }
  }

  return md;
}

export function richTextToMd(richText: any[]): string {
  if (!richText) return "";
  return richText
    .map((t: any) => {
      let text: string = t.plain_text || "";
      if (t.annotations?.bold) text = `**${text}**`;
      if (t.annotations?.italic) text = `*${text}*`;
      if (t.annotations?.code) text = `\`${text}\``;
      if (t.href) text = `[${text}](${t.href})`;
      return text;
    })
    .join("");
}

// ── FETCH ALL REMOTE CONTENT ─────────────────────────────
// Used by the vite plugin to pull pages from all configured content sources.

export async function fetchRemoteContent(
  sources: ContentSource[],
): Promise<ContentPage[]> {
  const allPages: ContentPage[] = [];

  for (const source of sources) {
    try {
      const pages = await source.fetchPages();
      allPages.push(...pages);
    } catch (err) {
      console.warn(
        `[tome] Failed to fetch from content source "${source.name}": ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return allPages;
}
