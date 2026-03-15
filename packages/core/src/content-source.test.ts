import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  defineContentSource,
  githubSource,
  notionSource,
  notionBlocksToMarkdown,
  richTextToMd,
  fetchRemoteContent,
  type ContentSource,
  type ContentPage,
} from "./content-source.js";

// ── defineContentSource ──────────────────────────────────

describe("defineContentSource", () => {
  it("returns the same source object (passthrough)", () => {
    const source: ContentSource = {
      name: "test",
      async fetchPages() {
        return [];
      },
    };
    const result = defineContentSource(source);
    expect(result).toBe(source);
    expect(result.name).toBe("test");
  });

  it("preserves optional watch function", () => {
    const cleanup = vi.fn();
    const source = defineContentSource({
      name: "watchable",
      async fetchPages() {
        return [];
      },
      watch(onChange) {
        return cleanup;
      },
    });
    expect(source.watch).toBeDefined();
    const result = source.watch!(() => {});
    expect(result).toBe(cleanup);
  });
});

// ── richTextToMd ─────────────────────────────────────────

describe("richTextToMd", () => {
  it("returns empty string for null/undefined input", () => {
    expect(richTextToMd(null as any)).toBe("");
    expect(richTextToMd(undefined as any)).toBe("");
  });

  it("converts plain text", () => {
    expect(
      richTextToMd([{ plain_text: "Hello world" }]),
    ).toBe("Hello world");
  });

  it("converts bold text", () => {
    expect(
      richTextToMd([{ plain_text: "bold", annotations: { bold: true } }]),
    ).toBe("**bold**");
  });

  it("converts italic text", () => {
    expect(
      richTextToMd([{ plain_text: "italic", annotations: { italic: true } }]),
    ).toBe("*italic*");
  });

  it("converts code text", () => {
    expect(
      richTextToMd([{ plain_text: "code", annotations: { code: true } }]),
    ).toBe("`code`");
  });

  it("converts links", () => {
    expect(
      richTextToMd([{ plain_text: "click here", href: "https://example.com" }]),
    ).toBe("[click here](https://example.com)");
  });

  it("combines multiple annotations", () => {
    expect(
      richTextToMd([
        { plain_text: "bold-italic", annotations: { bold: true, italic: true } },
      ]),
    ).toBe("***bold-italic***");
  });

  it("concatenates multiple rich text segments", () => {
    expect(
      richTextToMd([
        { plain_text: "Hello " },
        { plain_text: "world", annotations: { bold: true } },
      ]),
    ).toBe("Hello **world**");
  });
});

// ── notionBlocksToMarkdown ───────────────────────────────

describe("notionBlocksToMarkdown", () => {
  it("generates frontmatter with title", () => {
    const result = notionBlocksToMarkdown("My Page", []);
    expect(result).toContain("---\ntitle: My Page\n---");
  });

  it("converts paragraph blocks", () => {
    const blocks = [
      { type: "paragraph", paragraph: { rich_text: [{ plain_text: "Hello" }] } },
    ];
    const result = notionBlocksToMarkdown("Test", blocks);
    expect(result).toContain("Hello\n\n");
  });

  it("converts heading blocks", () => {
    const blocks = [
      { type: "heading_1", heading_1: { rich_text: [{ plain_text: "H1" }] } },
      { type: "heading_2", heading_2: { rich_text: [{ plain_text: "H2" }] } },
      { type: "heading_3", heading_3: { rich_text: [{ plain_text: "H3" }] } },
    ];
    const result = notionBlocksToMarkdown("Test", blocks);
    expect(result).toContain("## H1\n\n");
    expect(result).toContain("### H2\n\n");
    expect(result).toContain("#### H3\n\n");
  });

  it("converts list items", () => {
    const blocks = [
      { type: "bulleted_list_item", bulleted_list_item: { rich_text: [{ plain_text: "bullet" }] } },
      { type: "numbered_list_item", numbered_list_item: { rich_text: [{ plain_text: "number" }] } },
    ];
    const result = notionBlocksToMarkdown("Test", blocks);
    expect(result).toContain("- bullet\n");
    expect(result).toContain("1. number\n");
  });

  it("converts code blocks", () => {
    const blocks = [
      {
        type: "code",
        code: { language: "javascript", rich_text: [{ plain_text: "const x = 1;" }] },
      },
    ];
    const result = notionBlocksToMarkdown("Test", blocks);
    expect(result).toContain("```javascript\nconst x = 1;\n```");
  });

  it("converts code blocks without language", () => {
    const blocks = [
      {
        type: "code",
        code: { language: "", rich_text: [{ plain_text: "plain code" }] },
      },
    ];
    const result = notionBlocksToMarkdown("Test", blocks);
    expect(result).toContain("```\nplain code\n```");
  });

  it("converts quote blocks", () => {
    const blocks = [
      { type: "quote", quote: { rich_text: [{ plain_text: "a quote" }] } },
    ];
    const result = notionBlocksToMarkdown("Test", blocks);
    expect(result).toContain("> a quote\n\n");
  });

  it("converts divider blocks", () => {
    const blocks = [{ type: "divider" }];
    const result = notionBlocksToMarkdown("Test", blocks);
    expect(result).toContain("---\n\n");
  });

  it("skips unknown block types", () => {
    const blocks = [
      { type: "unsupported_block_type" },
      { type: "paragraph", paragraph: { rich_text: [{ plain_text: "after" }] } },
    ];
    const result = notionBlocksToMarkdown("Test", blocks);
    expect(result).toContain("after");
    expect(result).not.toContain("unsupported");
  });
});

// ── githubSource ─────────────────────────────────────────

describe("githubSource", () => {
  it("creates a content source with correct name", () => {
    const source = githubSource({ owner: "acme", repo: "docs" });
    expect(source.name).toBe("github:acme/docs");
  });

  it("has a fetchPages method", () => {
    const source = githubSource({ owner: "acme", repo: "docs" });
    expect(typeof source.fetchPages).toBe("function");
  });

  it("fetches pages from GitHub API", async () => {
    const mockFetch = vi.fn();

    // Mock tree API response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tree: [
          { path: "docs/getting-started.md", type: "blob" },
          { path: "docs/api/reference.mdx", type: "blob" },
          { path: "docs/README.md", type: "blob" },
          { path: "src/index.ts", type: "blob" }, // should be excluded
          { path: "docs/images", type: "tree" }, // directory, excluded
        ],
      }),
    });

    // Mock raw content responses
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "---\ntitle: Getting Started\n---\n\n# Getting Started\n\nHello!",
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "---\ntitle: API Reference\n---\n\n# API Ref",
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "# README",
    });

    const originalFetch = globalThis.fetch;
    globalThis.fetch = mockFetch;

    try {
      const source = githubSource({ owner: "acme", repo: "docs", branch: "main", path: "docs" });
      const pages = await source.fetchPages();

      expect(pages).toHaveLength(3);
      expect(pages[0].id).toBe("getting-started");
      expect(pages[0].format).toBe("md");
      expect(pages[0].content).toContain("Getting Started");

      expect(pages[1].id).toBe("api/reference");
      expect(pages[1].format).toBe("mdx");

      expect(pages[2].id).toBe("README");
      expect(pages[2].format).toBe("md");

      // Verify API call includes correct URL
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/acme/docs/git/trees/main?recursive=1",
        expect.objectContaining({ headers: expect.objectContaining({ Accept: "application/vnd.github.v3+json" }) }),
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("sends auth token when provided", async () => {
    const mockFetch = vi.fn();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ tree: [] }),
    });

    const originalFetch = globalThis.fetch;
    globalThis.fetch = mockFetch;

    try {
      const source = githubSource({ owner: "acme", repo: "private-docs", token: "ghp_abc123" });
      await source.fetchPages();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: "Bearer ghp_abc123" }),
        }),
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("throws on API error", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 403 });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mockFetch;

    try {
      const source = githubSource({ owner: "acme", repo: "docs" });
      await expect(source.fetchPages()).rejects.toThrow("GitHub API error: 403");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("uses default branch and path", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ tree: [] }),
    });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mockFetch;

    try {
      const source = githubSource({ owner: "acme", repo: "docs" });
      await source.fetchPages();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/acme/docs/git/trees/main?recursive=1",
        expect.any(Object),
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

// ── notionSource ─────────────────────────────────────────

describe("notionSource", () => {
  it("creates a content source with correct name", () => {
    const source = notionSource({ apiKey: "ntn_xxx", databaseId: "db-123" });
    expect(source.name).toBe("notion:db-123");
  });

  it("has a fetchPages method", () => {
    const source = notionSource({ apiKey: "ntn_xxx", databaseId: "db-123" });
    expect(typeof source.fetchPages).toBe("function");
  });

  it("fetches pages from Notion API", async () => {
    const mockFetch = vi.fn();

    // Mock database query
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: "page-id-1",
            properties: {
              Name: { title: [{ plain_text: "Getting Started" }] },
            },
          },
        ],
      }),
    });

    // Mock blocks fetch for page-id-1
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { type: "paragraph", paragraph: { rich_text: [{ plain_text: "Welcome to the docs." }] } },
          { type: "heading_1", heading_1: { rich_text: [{ plain_text: "Installation" }] } },
        ],
      }),
    });

    const originalFetch = globalThis.fetch;
    globalThis.fetch = mockFetch;

    try {
      const source = notionSource({ apiKey: "ntn_test", databaseId: "db-456" });
      const pages = await source.fetchPages();

      expect(pages).toHaveLength(1);
      expect(pages[0].id).toBe("getting-started");
      expect(pages[0].format).toBe("md");
      expect(pages[0].content).toContain("title: Getting Started");
      expect(pages[0].content).toContain("Welcome to the docs.");
      expect(pages[0].content).toContain("## Installation");

      // Verify Notion API headers
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.notion.com/v1/databases/db-456/query",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "Bearer ntn_test",
            "Notion-Version": "2022-06-28",
          }),
        }),
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("throws on Notion API error", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 401 });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mockFetch;

    try {
      const source = notionSource({ apiKey: "bad", databaseId: "db-123" });
      await expect(source.fetchPages()).rejects.toThrow("Notion API error: 401");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("falls back to 'title' property when Name is missing", async () => {
    const mockFetch = vi.fn();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: "page-2",
            properties: {
              title: { title: [{ plain_text: "API Guide" }] },
            },
          },
        ],
      }),
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    const originalFetch = globalThis.fetch;
    globalThis.fetch = mockFetch;

    try {
      const source = notionSource({ apiKey: "ntn_x", databaseId: "db-x" });
      const pages = await source.fetchPages();
      expect(pages[0].id).toBe("api-guide");
      expect(pages[0].content).toContain("title: API Guide");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("uses 'Untitled' when no title property exists", async () => {
    const mockFetch = vi.fn();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: "page-3", properties: {} }],
      }),
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    const originalFetch = globalThis.fetch;
    globalThis.fetch = mockFetch;

    try {
      const source = notionSource({ apiKey: "ntn_x", databaseId: "db-x" });
      const pages = await source.fetchPages();
      expect(pages[0].id).toBe("untitled");
      expect(pages[0].content).toContain("title: Untitled");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

// ── fetchRemoteContent ───────────────────────────────────

describe("fetchRemoteContent", () => {
  it("returns empty array when no sources", async () => {
    const pages = await fetchRemoteContent([]);
    expect(pages).toEqual([]);
  });

  it("aggregates pages from multiple sources", async () => {
    const source1: ContentSource = {
      name: "source1",
      async fetchPages() {
        return [{ id: "page-a", content: "# A", format: "md" as const }];
      },
    };
    const source2: ContentSource = {
      name: "source2",
      async fetchPages() {
        return [
          { id: "page-b", content: "# B", format: "md" as const },
          { id: "page-c", content: "# C", format: "mdx" as const },
        ];
      },
    };

    const pages = await fetchRemoteContent([source1, source2]);
    expect(pages).toHaveLength(3);
    expect(pages.map((p) => p.id)).toEqual(["page-a", "page-b", "page-c"]);
  });

  it("continues on source failure and logs warning", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const failingSource: ContentSource = {
      name: "broken",
      async fetchPages() {
        throw new Error("network failure");
      },
    };
    const workingSource: ContentSource = {
      name: "ok",
      async fetchPages() {
        return [{ id: "good-page", content: "# Good", format: "md" as const }];
      },
    };

    const pages = await fetchRemoteContent([failingSource, workingSource]);
    expect(pages).toHaveLength(1);
    expect(pages[0].id).toBe("good-page");
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch from content source "broken"'),
    );

    warnSpy.mockRestore();
  });
});

// ── ContentSource interface compliance ───────────────────

describe("ContentSource interface", () => {
  it("accepts a minimal implementation", async () => {
    const source: ContentSource = {
      name: "minimal",
      fetchPages: async () => [],
    };
    expect(source.name).toBe("minimal");
    expect(await source.fetchPages()).toEqual([]);
    expect(source.watch).toBeUndefined();
  });

  it("accepts implementation with watch", () => {
    const source: ContentSource = {
      name: "full",
      fetchPages: async () => [],
      watch: (onChange) => {
        return () => {};
      },
    };
    expect(typeof source.watch).toBe("function");
    const cleanup = source.watch!(() => {});
    expect(typeof cleanup).toBe("function");
  });
});

// ── ContentPage interface ────────────────────────────────

describe("ContentPage", () => {
  it("supports md format", () => {
    const page: ContentPage = {
      id: "test",
      content: "# Test",
      format: "md",
    };
    expect(page.format).toBe("md");
    expect(page.lastModified).toBeUndefined();
  });

  it("supports mdx format with lastModified", () => {
    const page: ContentPage = {
      id: "test",
      content: "# Test",
      format: "mdx",
      lastModified: "2025-01-15T00:00:00Z",
    };
    expect(page.format).toBe("mdx");
    expect(page.lastModified).toBe("2025-01-15T00:00:00Z");
  });
});
