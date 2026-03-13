import { describe, it, expect, vi, beforeEach } from "vitest";
import { extractInternalLinks, checkLinks, formatLinkCheckResults } from "./link-checker.js";
import type { PageRoute } from "./routes.js";
import type { TomeConfig } from "./config.js";

// ── extractInternalLinks ────────────────────────────────

describe("extractInternalLinks", () => {
  it("extracts markdown links", () => {
    const source = "Check the [quickstart](quickstart) guide.";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(1);
    expect(links[0]).toEqual({ href: "quickstart", line: 1 });
  });

  it("extracts multiple links on different lines", () => {
    const source = "See [intro](intro)\n\nAlso [api](api/endpoints)";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(2);
    expect(links[0]).toEqual({ href: "intro", line: 1 });
    expect(links[1]).toEqual({ href: "api/endpoints", line: 3 });
  });

  it("extracts links with anchors", () => {
    const source = "See [section](quickstart#installation)";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(1);
    expect(links[0].href).toBe("quickstart#installation");
  });

  it("extracts HTML href links", () => {
    const source = '<a href="getting-started">Get Started</a>';
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(1);
    expect(links[0]).toEqual({ href: "getting-started", line: 1 });
  });

  it("extracts single-quoted HTML href links", () => {
    const source = "<a href='getting-started'>Get Started</a>";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(1);
    expect(links[0].href).toBe("getting-started");
  });

  it("ignores external http links", () => {
    const source = "See [Google](https://google.com) and [docs](intro)";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(1);
    expect(links[0].href).toBe("intro");
  });

  it("ignores external http links in HTML", () => {
    const source = '<a href="https://example.com">External</a>';
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(0);
  });

  it("ignores mailto links", () => {
    const source = "[Email](mailto:user@example.com)";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(0);
  });

  it("ignores tel links", () => {
    const source = "[Call](tel:+1234567890)";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(0);
  });

  it("ignores pure anchor links (#heading)", () => {
    const source = "See [section](#overview)";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(0);
  });

  it("ignores image links (![alt](url))", () => {
    const source = "![screenshot](images/screen.png)";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(0);
  });

  it("handles links with leading slash", () => {
    const source = "See [docs](/quickstart)";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(1);
    expect(links[0].href).toBe("/quickstart");
  });

  it("handles relative links with ./", () => {
    const source = "See [intro](./intro)";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(1);
    expect(links[0].href).toBe("./intro");
  });

  it("returns empty array for source with no links", () => {
    const source = "# Hello\n\nJust some text without any links.";
    const links = extractInternalLinks(source);
    expect(links).toHaveLength(0);
  });

  it("returns correct line numbers", () => {
    const source = "Line 1\nLine 2 [link](page)\nLine 3\nLine 4 [link2](page2)";
    const links = extractInternalLinks(source);
    expect(links[0].line).toBe(2);
    expect(links[1].line).toBe(4);
  });
});

// ── checkLinks ──────────────────────────────────────────

describe("checkLinks", () => {
  const mockConfig: TomeConfig = {
    name: "Test Docs",
    theme: { preset: "amber", mode: "auto" },
    navigation: [],
    search: { provider: "local" },
    toc: { enabled: true, depth: 3 },
    strictLinks: false,
  } as TomeConfig;

  function makeRoute(id: string, filePath: string, content: string): PageRoute {
    return {
      id,
      filePath,
      absolutePath: `/fake/${filePath}`,
      urlPath: `/${id}`,
      frontmatter: { title: id, hidden: false },
      isMdx: filePath.endsWith(".mdx"),
    };
  }

  beforeEach(() => {
    // Mock readFileSync to return controlled content
    vi.mock("fs", async () => {
      const actual = await vi.importActual("fs");
      return {
        ...actual,
        readFileSync: vi.fn(),
      };
    });
  });

  it("reports no broken links when all links are valid", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
      makeRoute("quickstart", "quickstart.md", ""),
    ];

    // index.md links to quickstart
    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\nSee [quickstart](quickstart)")  // index headings
      .mockReturnValueOnce("---\ntitle: QS\n---\n## Installation\nContent")           // quickstart headings
      .mockReturnValueOnce("---\ntitle: Index\n---\nSee [quickstart](quickstart)")  // index links
      .mockReturnValueOnce("---\ntitle: QS\n---\n## Installation\nContent");          // quickstart links

    const result = checkLinks(routes, mockConfig);
    expect(result.ok).toBe(true);
    expect(result.broken).toHaveLength(0);
  });

  it("detects broken page reference", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
    ];

    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\n## Heading\nContent")  // headings pass
      .mockReturnValueOnce("---\ntitle: Index\n---\nSee [missing](nonexistent)");  // links pass

    const result = checkLinks(routes, mockConfig);
    expect(result.ok).toBe(false);
    expect(result.broken).toHaveLength(1);
    expect(result.broken[0].href).toBe("nonexistent");
    expect(result.broken[0].reason).toContain("does not exist");
  });

  it("detects broken anchor reference", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
      makeRoute("quickstart", "quickstart.md", ""),
    ];

    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\n## Overview\nContent")   // index headings
      .mockReturnValueOnce("---\ntitle: QS\n---\n## Setup\nContent")          // quickstart headings
      .mockReturnValueOnce("---\ntitle: Index\n---\nSee [qs](quickstart#bad-anchor)")  // index links
      .mockReturnValueOnce("---\ntitle: QS\n---\n## Setup\nContent");          // quickstart links

    const result = checkLinks(routes, mockConfig);
    expect(result.ok).toBe(false);
    expect(result.broken).toHaveLength(1);
    expect(result.broken[0].reason).toContain("#bad-anchor");
  });

  it("validates valid anchor references", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
      makeRoute("quickstart", "quickstart.md", ""),
    ];

    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\n## Overview\nContent")
      .mockReturnValueOnce("---\ntitle: QS\n---\n## Setup\nContent")
      .mockReturnValueOnce("---\ntitle: Index\n---\nSee [qs](quickstart#setup)")
      .mockReturnValueOnce("---\ntitle: QS\n---\n## Setup\nContent");

    const result = checkLinks(routes, mockConfig);
    expect(result.ok).toBe(true);
  });

  it("checks navigation config references", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
    ];

    const configWithNav: TomeConfig = {
      ...mockConfig,
      navigation: [
        { group: "Docs", pages: ["index", "missing-page"] },
      ],
    } as TomeConfig;

    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\nNo links")
      .mockReturnValueOnce("---\ntitle: Index\n---\nNo links");

    const result = checkLinks(routes, configWithNav);
    expect(result.ok).toBe(false);
    expect(result.broken.some(b => b.href === "missing-page")).toBe(true);
    expect(result.broken.find(b => b.href === "missing-page")?.file).toBe("tome.config.js");
  });

  it("handles links with leading slash", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
      makeRoute("quickstart", "quickstart.md", ""),
    ];

    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\nContent")
      .mockReturnValueOnce("---\ntitle: QS\n---\nContent")
      .mockReturnValueOnce("---\ntitle: Index\n---\nSee [qs](/quickstart)")
      .mockReturnValueOnce("---\ntitle: QS\n---\nContent");

    const result = checkLinks(routes, mockConfig);
    expect(result.ok).toBe(true);
  });

  it("handles links with .md extension", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
      makeRoute("quickstart", "quickstart.md", ""),
    ];

    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\nContent")
      .mockReturnValueOnce("---\ntitle: QS\n---\nContent")
      .mockReturnValueOnce("---\ntitle: Index\n---\nSee [qs](quickstart.md)")
      .mockReturnValueOnce("---\ntitle: QS\n---\nContent");

    const result = checkLinks(routes, mockConfig);
    expect(result.ok).toBe(true);
  });

  it("handles links with ./ prefix", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
      makeRoute("quickstart", "quickstart.md", ""),
    ];

    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\nContent")
      .mockReturnValueOnce("---\ntitle: QS\n---\nContent")
      .mockReturnValueOnce("---\ntitle: Index\n---\nSee [qs](./quickstart)")
      .mockReturnValueOnce("---\ntitle: QS\n---\nContent");

    const result = checkLinks(routes, mockConfig);
    expect(result.ok).toBe(true);
  });

  it("strips basePath from links before resolving", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
      makeRoute("reference/config", "reference/config.md", ""),
    ];

    const configWithBase: TomeConfig = {
      ...mockConfig,
      basePath: "/docs/",
    } as TomeConfig;

    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\nContent")
      .mockReturnValueOnce("---\ntitle: Config\n---\nContent")
      .mockReturnValueOnce("---\ntitle: Index\n---\nSee [config](/docs/reference/config)")
      .mockReturnValueOnce("---\ntitle: Config\n---\nContent");

    const result = checkLinks(routes, configWithBase);
    expect(result.ok).toBe(true);
    expect(result.broken).toHaveLength(0);
  });

  it("counts total links checked", async () => {
    const { readFileSync } = await import("fs");
    const routes: PageRoute[] = [
      makeRoute("index", "index.md", ""),
      makeRoute("quickstart", "quickstart.md", ""),
    ];

    (readFileSync as any)
      .mockReturnValueOnce("---\ntitle: Index\n---\nContent")
      .mockReturnValueOnce("---\ntitle: QS\n---\nContent")
      .mockReturnValueOnce("---\ntitle: Index\n---\n[a](quickstart) and [b](quickstart)")
      .mockReturnValueOnce("---\ntitle: QS\n---\n[c](index)");

    const result = checkLinks(routes, mockConfig);
    expect(result.totalLinks).toBe(3);
  });
});

// ── formatLinkCheckResults ──────────────────────────────

describe("formatLinkCheckResults", () => {
  it("formats passing result", () => {
    const result = { totalLinks: 5, broken: [], ok: true };
    const output = formatLinkCheckResults(result);
    expect(output).toContain("5 internal links checked");
    expect(output).toContain("all valid");
  });

  it("formats broken links result", () => {
    const result = {
      totalLinks: 10,
      broken: [
        { file: "intro.md", line: 5, href: "missing", reason: 'Page "missing" does not exist' },
      ],
      ok: false,
    };
    const output = formatLinkCheckResults(result);
    expect(output).toContain("1 broken link found");
    expect(output).toContain("intro.md:5");
    expect(output).toContain("missing");
    expect(output).toContain("does not exist");
  });

  it("pluralizes 'links' for multiple broken", () => {
    const result = {
      totalLinks: 10,
      broken: [
        { file: "a.md", line: 1, href: "x", reason: "missing" },
        { file: "b.md", line: 2, href: "y", reason: "missing" },
      ],
      ok: false,
    };
    const output = formatLinkCheckResults(result);
    expect(output).toContain("2 broken links found");
  });

  it("uses singular 'link' for one broken", () => {
    const result = {
      totalLinks: 5,
      broken: [
        { file: "a.md", line: 1, href: "x", reason: "missing" },
      ],
      ok: false,
    };
    const output = formatLinkCheckResults(result);
    expect(output).toContain("1 broken link found");
  });

  it("shows file for config navigation errors (line 0)", () => {
    const result = {
      totalLinks: 3,
      broken: [
        { file: "tome.config.js", line: 0, href: "missing", reason: "nav reference" },
      ],
      ok: false,
    };
    const output = formatLinkCheckResults(result);
    expect(output).toContain("tome.config.js");
    // Should not show ":0" for line 0
    expect(output).not.toContain("tome.config.js:0");
  });
});
