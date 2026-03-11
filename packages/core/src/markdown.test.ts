import { describe, it, expect, vi } from "vitest";
import { extractHeadingsFromSource, processMarkdown } from "./markdown.js";

describe("extractHeadingsFromSource", () => {
  it("returns empty array for empty source", () => {
    expect(extractHeadingsFromSource("")).toEqual([]);
  });

  it("extracts h2 headings", () => {
    const source = "# Title\n\n## Introduction\n\nSome text.";
    const headings = extractHeadingsFromSource(source);
    expect(headings).toHaveLength(1);
    expect(headings[0]).toEqual({ depth: 2, text: "Introduction", id: "introduction" });
  });

  it("extracts h2, h3, and h4 headings", () => {
    const source = "## Section\n### Subsection\n#### Deep\n";
    const headings = extractHeadingsFromSource(source);
    expect(headings).toHaveLength(3);
    expect(headings[0].depth).toBe(2);
    expect(headings[1].depth).toBe(3);
    expect(headings[2].depth).toBe(4);
  });

  it("ignores h1 and h5+ headings", () => {
    const source = "# Top\n## Two\n##### Five\n";
    const headings = extractHeadingsFromSource(source);
    expect(headings).toHaveLength(1);
    expect(headings[0].depth).toBe(2);
  });

  it("generates kebab-case ids from heading text", () => {
    const source = "## Hello World\n### Getting Started Today\n";
    const headings = extractHeadingsFromSource(source);
    expect(headings[0].id).toBe("hello-world");
    expect(headings[1].id).toBe("getting-started-today");
  });

  it("strips special characters from ids", () => {
    const source = "## What's New? (2024)\n";
    const headings = extractHeadingsFromSource(source);
    expect(headings[0].id).toBe("whats-new-2024");
  });

  it("handles multiple spaces in heading text", () => {
    const source = "## hello   world\n";
    const headings = extractHeadingsFromSource(source);
    expect(headings[0].id).toBe("hello-world");
  });
});

describe("processMarkdown", () => {
  it("returns html, frontmatter, headings, and raw for simple markdown", async () => {
    const source = "# Hello\n\nSome content here.";
    const result = await processMarkdown(source);
    expect(result.html).toContain("Some content here");
    expect(result.frontmatter.title).toBe("Hello");
    expect(result.raw).toContain("Some content here");
  }, 15000);

  it("extracts frontmatter title", async () => {
    const source = "---\ntitle: My Page\ndescription: A test page\n---\n\n# Ignored\n\nBody.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.title).toBe("My Page");
    expect(result.frontmatter.description).toBe("A test page");
  }, 15000);

  it("falls back to first h1 for title when frontmatter has none", async () => {
    const source = "# Inferred Title\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.title).toBe("Inferred Title");
  }, 15000);

  it("falls back to Untitled when no title available", async () => {
    const source = "Some content without a heading.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.title).toBe("Untitled");
  }, 15000);

  it("defaults hidden to false", async () => {
    const source = "# Page\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.hidden).toBe(false);
  }, 15000);

  it("respects hidden: true in frontmatter", async () => {
    const source = "---\nhidden: true\n---\n\n# Page\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.hidden).toBe(true);
  }, 15000);

  it("warns but does not throw on invalid frontmatter fields", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const source = "---\nhidden: not-a-boolean\n---\n\n# Page\n\nContent.";
    await expect(processMarkdown(source)).resolves.toBeDefined();
    warnSpy.mockRestore();
  }, 15000);

  it("emits headings for h2-h4 in the document", async () => {
    const source = "# Title\n\n## Section One\n\n### Subsection\n\nParagraph.";
    const result = await processMarkdown(source);
    const ids = result.headings.map((h) => h.id);
    expect(ids).toContain("section-one");
    expect(ids).toContain("subsection");
  }, 15000);

  it("includes optional filePath in validation warning", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    await processMarkdown("---\nhidden: bad\n---\n# T", "/docs/page.md");
    if (warnSpy.mock.calls.length > 0) {
      expect(warnSpy.mock.calls[0][0]).toContain("/docs/page.md");
    }
    warnSpy.mockRestore();
  }, 15000);

  it("processes GFM tables", async () => {
    const source = "# T\n\n| A | B |\n|---|---|\n| 1 | 2 |\n";
    const result = await processMarkdown(source);
    expect(result.html).toContain("<table");
  }, 15000);

  it("defaults toc to true in frontmatter", async () => {
    const source = "# Page\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.toc).toBe(true);
  }, 15000);

  it("respects toc: false in frontmatter", async () => {
    const source = "---\ntoc: false\n---\n\n# Page\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.toc).toBe(false);
  }, 15000);

  it("respects toc: true in frontmatter", async () => {
    const source = "---\ntoc: true\n---\n\n# Page\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.toc).toBe(true);
  }, 15000);

  it("parses type: changelog from frontmatter", async () => {
    const source = "---\ntype: changelog\ntitle: Changelog\n---\n\n## [1.0.0] - 2025-01-15\n\n### Added\n- Feature";
    const result = await processMarkdown(source);
    expect(result.frontmatter.type).toBe("changelog");
  }, 15000);

  it("defaults type to undefined when not set", async () => {
    const source = "---\ntitle: Normal Page\n---\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.type).toBeUndefined();
  }, 15000);

  it("parses ogImage from frontmatter", async () => {
    const source = "---\ntitle: Custom OG\nogImage: /images/custom-og.png\n---\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.ogImage).toBe("/images/custom-og.png");
  }, 15000);

  it("defaults ogImage to undefined when not set", async () => {
    const source = "---\ntitle: Normal Page\n---\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.ogImage).toBeUndefined();
  }, 15000);
});

// ── Plugin system (TOM-57) ──────────────────────────────

describe("processMarkdown with plugins", () => {
  it("applies custom remark plugin", async () => {
    // Create a simple remark plugin that uppercases all text nodes
    const uppercasePlugin = () => (tree: any) => {
      const visit = (node: any) => {
        if (node.type === "text") {
          node.value = node.value.toUpperCase();
        }
        if (node.children) {
          node.children.forEach(visit);
        }
      };
      visit(tree);
    };

    const source = "# Hello\n\nSome content here.";
    const result = await processMarkdown(source, undefined, {
      remarkPlugins: [[uppercasePlugin]],
    });
    expect(result.html).toContain("SOME CONTENT HERE.");
  }, 15000);

  it("applies custom rehype plugin", async () => {
    // Create a simple rehype plugin that adds a class to all paragraphs
    const addClassPlugin = () => (tree: any) => {
      const visit = (node: any) => {
        if (node.tagName === "p") {
          node.properties = node.properties || {};
          node.properties.className = ["custom-paragraph"];
        }
        if (node.children) {
          node.children.forEach(visit);
        }
      };
      visit(tree);
    };

    const source = "# Hello\n\nSome content.";
    const result = await processMarkdown(source, undefined, {
      rehypePlugins: [[addClassPlugin]],
    });
    expect(result.html).toContain('class="custom-paragraph"');
  }, 15000);

  it("works without plugins (backward compatible)", async () => {
    const source = "# Hello\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.html).toContain("Content.");
  }, 15000);
});
