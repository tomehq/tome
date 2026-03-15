import { describe, it, expect, vi } from "vitest";
import { extractHeadingsFromSource, processMarkdown, parseCodeMeta, enhanceCodeBlock } from "./markdown.js";

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

  it("parses redirect_from as string array", async () => {
    const source = "---\ntitle: New Page\nredirect_from:\n  - /old-path\n  - /legacy/path\n---\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.redirect_from).toEqual(["/old-path", "/legacy/path"]);
  }, 15000);

  it("defaults redirect_from to undefined when not set", async () => {
    const source = "---\ntitle: Normal Page\n---\n\nContent.";
    const result = await processMarkdown(source);
    expect(result.frontmatter.redirect_from).toBeUndefined();
  }, 15000);
});

// ── Entity decoding in code blocks ──────────────────────

describe("code block entity decoding", () => {
  it("renders && correctly without double-encoding", async () => {
    const source = "# T\n\n```bash\ncd my-docs && npm install && npm run dev\n```";
    const result = await processMarkdown(source);
    // The highlighted HTML should not contain raw &#x26; entities
    expect(result.html).not.toContain("&#x26;&#x26;");
    // The raw text should preserve &&
    expect(result.raw).toContain("&&");
  }, 15000);

  it("renders <script> in code blocks as escaped text (no XSS)", async () => {
    const source = "# T\n\n```html\n<script>alert('xss')</script>\n```";
    const result = await processMarkdown(source);
    // Should not contain an actual <script> tag outside of code context
    expect(result.html).not.toMatch(/<script>alert/);
  }, 15000);

  it("decodes mixed named and hex entities in code blocks", async () => {
    const source = "# T\n\n```js\nconst x = a && b;\nif (a < b && c > d) {}\n```";
    const result = await processMarkdown(source);
    // Should not contain raw hex entities
    expect(result.html).not.toContain("&#x26;");
    expect(result.html).not.toContain("&#x3C;");
    expect(result.html).not.toContain("&#x3E;");
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

// ── Mermaid support ─────────────────────────────────────

describe("processMarkdown mermaid support", () => {
  it("transforms mermaid code blocks to tome-mermaid div with base64-encoded data attribute", async () => {
    const mermaidSrc = "graph LR\n  A-->B";
    const source = `# Diagrams\n\n\`\`\`mermaid\n${mermaidSrc}\n\`\`\`\n`;
    const result = await processMarkdown(source);

    expect(result.html).toContain('<div class="tome-mermaid"');
    expect(result.html).toContain("data-mermaid=");

    const match = result.html.match(/data-mermaid="([^"]+)"/);
    expect(match).not.toBeNull();
    const decoded = Buffer.from(match![1], "base64").toString("utf-8");
    expect(decoded).toBe(mermaidSrc);
  }, 15000);

  it("does not apply syntax highlighting to mermaid blocks (no shiki output)", async () => {
    const source = "# T\n\n```mermaid\ngraph TD\n  X-->Y\n```\n";
    const result = await processMarkdown(source);

    // Shiki wraps highlighted code in <pre> with class "shiki"; mermaid should not have that
    expect(result.html).not.toMatch(/<pre[^>]*class="[^"]*shiki[^"]*"[^>]*>[\s\S]*graph TD/);
    expect(result.html).toContain('<div class="tome-mermaid"');
  }, 15000);

  it("still processes other language code blocks normally alongside mermaid", async () => {
    const source = [
      "# Mixed",
      "",
      "```javascript",
      "const x = 1;",
      "```",
      "",
      "```mermaid",
      "graph LR",
      "  A-->B",
      "```",
    ].join("\n");

    const result = await processMarkdown(source);

    // JS block should be syntax-highlighted (shiki wraps in <pre>)
    expect(result.html).toContain("const");
    expect(result.html).toContain("<pre");

    // Mermaid block should be a placeholder div
    expect(result.html).toContain('<div class="tome-mermaid"');
  }, 15000);
});

// ── Expressive code blocks (Phase 2.1) ──────────────────

describe("parseCodeMeta", () => {
  it("extracts language from simple info string", () => {
    const meta = parseCodeMeta("typescript");
    expect(meta.lang).toBe("typescript");
    expect(meta.title).toBeUndefined();
    expect(meta.highlightLines).toBeUndefined();
    expect(meta.showLineNumbers).toBeUndefined();
  });

  it("extracts title from title attribute", () => {
    const meta = parseCodeMeta('ts title="app.ts"');
    expect(meta.lang).toBe("ts");
    expect(meta.title).toBe("app.ts");
  });

  it("extracts title from filename attribute", () => {
    const meta = parseCodeMeta('js filename="index.js"');
    expect(meta.lang).toBe("js");
    expect(meta.title).toBe("index.js");
  });

  it("extracts highlighted line numbers from {1,3-5}", () => {
    const meta = parseCodeMeta("ts {1,3-5}");
    expect(meta.lang).toBe("ts");
    expect(meta.highlightLines).toEqual([1, 3, 4, 5]);
  });

  it("extracts single line highlight {2}", () => {
    const meta = parseCodeMeta("ts {2}");
    expect(meta.highlightLines).toEqual([2]);
  });

  it("detects showLineNumbers", () => {
    const meta = parseCodeMeta("ts showLineNumbers");
    expect(meta.lang).toBe("ts");
    expect(meta.showLineNumbers).toBe(true);
  });

  it("detects lineNumbers", () => {
    const meta = parseCodeMeta("ts lineNumbers");
    expect(meta.showLineNumbers).toBe(true);
  });

  it("detects diff language", () => {
    const meta = parseCodeMeta("diff");
    expect(meta.lang).toBe("diff");
    expect(meta.diffEnabled).toBe(true);
  });

  it("extracts word highlight patterns", () => {
    const meta = parseCodeMeta("ts /useState/ /useEffect/");
    expect(meta.highlightWords).toEqual(["useState", "useEffect"]);
  });

  it("handles multiple attributes together", () => {
    const meta = parseCodeMeta('ts title="app.ts" {1,3} showLineNumbers /useState/');
    expect(meta.lang).toBe("ts");
    expect(meta.title).toBe("app.ts");
    expect(meta.highlightLines).toEqual([1, 3]);
    expect(meta.showLineNumbers).toBe(true);
    expect(meta.highlightWords).toEqual(["useState"]);
  });

  it("returns defaults for empty info string", () => {
    const meta = parseCodeMeta("");
    expect(meta.lang).toBe("text");
  });
});

describe("enhanceCodeBlock", () => {
  const sampleShiki = `<pre class="shiki"><code><span class="line">const x = 1;</span>
<span class="line">const y = 2;</span>
<span class="line">const z = 3;</span></code></pre>`;

  it("adds tome-line-highlight class to highlighted lines", () => {
    const result = enhanceCodeBlock(sampleShiki, {
      lang: "ts",
      highlightLines: [1, 3],
    });
    // Line 1 and 3 should have highlight class
    const lines = result.match(/<span class="line[^"]*">/g) || [];
    expect(lines[0]).toContain("tome-line-highlight");
    expect(lines[1]).not.toContain("tome-line-highlight");
    expect(lines[2]).toContain("tome-line-highlight");
  });

  it("adds data-line-numbers attribute when showLineNumbers is true", () => {
    const result = enhanceCodeBlock(sampleShiki, {
      lang: "ts",
      showLineNumbers: true,
    });
    expect(result).toContain("data-line-numbers");
  });

  it("wraps in container with title header", () => {
    const result = enhanceCodeBlock(sampleShiki, {
      lang: "ts",
      title: "app.ts",
    });
    expect(result).toContain('class="tome-code-block-wrapper"');
    expect(result).toContain('class="tome-code-title"');
    expect(result).toContain("app.ts");
  });

  it("adds tome-line-added for diff + lines", () => {
    const diffShiki = `<pre class="shiki"><code><span class="line">+added line</span>
<span class="line">-removed line</span>
<span class="line"> unchanged</span></code></pre>`;
    const result = enhanceCodeBlock(diffShiki, {
      lang: "diff",
      diffEnabled: true,
    });
    expect(result).toContain("tome-line-added");
    expect(result).toContain("tome-line-removed");
  });

  it("processes inline diff markers [!code ++] and [!code --]", () => {
    const codeWithMarkers = `<pre class="shiki"><code><span class="line">const x = 1; // [!code ++]</span>
<span class="line">const y = 2; // [!code --]</span>
<span class="line">const z = 3;</span></code></pre>`;
    const result = enhanceCodeBlock(codeWithMarkers, { lang: "ts" });
    expect(result).toContain("tome-line-added");
    expect(result).toContain("tome-line-removed");
    // The marker comments should be removed
    expect(result).not.toContain("[!code ++]");
    expect(result).not.toContain("[!code --]");
  });

  it("wraps matching words in highlight spans", () => {
    const result = enhanceCodeBlock(sampleShiki, {
      lang: "ts",
      highlightWords: ["const"],
    });
    expect(result).toContain('class="tome-word-highlight"');
    expect(result).toContain(">const</span>");
  });
});

describe("processMarkdown expressive code blocks", () => {
  it("preserves code fence meta and applies line highlighting", async () => {
    const source = "# T\n\n```ts {1}\nconst x = 1;\nconst y = 2;\n```";
    const result = await processMarkdown(source);
    expect(result.html).toContain("tome-line-highlight");
  }, 15000);

  it("renders code block title from meta", async () => {
    const source = '# T\n\n```ts title="app.ts"\nconst x = 1;\n```';
    const result = await processMarkdown(source);
    expect(result.html).toContain("tome-code-block-wrapper");
    expect(result.html).toContain("tome-code-title");
    expect(result.html).toContain("app.ts");
  }, 15000);

  it("adds line numbers attribute when showLineNumbers is in meta", async () => {
    const source = "# T\n\n```ts showLineNumbers\nconst x = 1;\n```";
    const result = await processMarkdown(source);
    expect(result.html).toContain("data-line-numbers");
  }, 15000);

  it("processes inline diff markers in code blocks", async () => {
    const source = "# T\n\n```ts\nconst x = 1; // [!code ++]\nconst y = 2; // [!code --]\n```";
    const result = await processMarkdown(source);
    expect(result.html).toContain("tome-line-added");
    expect(result.html).toContain("tome-line-removed");
  }, 15000);
});

// ── Twoslash support (Phase 4.4) ─────────────────────────

describe("parseCodeMeta twoslash", () => {
  it("detects twoslash flag in meta string", () => {
    const meta = parseCodeMeta("ts twoslash");
    expect(meta.lang).toBe("ts");
    expect(meta.twoslash).toBe(true);
  });

  it("detects twoslash alongside other meta attributes", () => {
    const meta = parseCodeMeta('ts twoslash title="example.ts" {1,3}');
    expect(meta.lang).toBe("ts");
    expect(meta.twoslash).toBe(true);
    expect(meta.title).toBe("example.ts");
    expect(meta.highlightLines).toEqual([1, 3]);
  });

  it("does not set twoslash when not present", () => {
    const meta = parseCodeMeta("ts");
    expect(meta.twoslash).toBeUndefined();
  });

  it("does not false-positive on partial matches", () => {
    const meta = parseCodeMeta('ts title="twoslash-demo"');
    // The word "twoslash" appears inside the title value but was already consumed
    // by the title extractor; the remaining string should not trigger twoslash.
    // However since title extraction removes the title="..." part, and "twoslash-demo"
    // is inside quotes, the \btwoslash\b would not match "twoslash-demo" anyway.
    expect(meta.twoslash).toBeUndefined();
  });
});

describe("processMarkdown twoslash", () => {
  it("produces twoslash annotations for ts twoslash code blocks", async () => {
    const source = [
      "# T",
      "",
      "```ts twoslash",
      "const greeting = \"hello\";",
      "//    ^?",
      "```",
    ].join("\n");
    const result = await processMarkdown(source);
    // Twoslash should produce hover-related markup (popup containers or data attributes)
    // The exact class names depend on the @shikijs/twoslash version, but the output
    // should differ from a normal code block by containing twoslash-specific elements.
    const hasTwoslash = result.html.includes("twoslash") || result.html.includes("popup");
    expect(hasTwoslash).toBe(true);
  }, 30000);

  it("does not add twoslash annotations to non-twoslash code blocks", async () => {
    const source = "# T\n\n```ts\nconst x = 1;\n```";
    const result = await processMarkdown(source);
    expect(result.html).not.toContain("twoslash-hover");
    expect(result.html).not.toContain("twoslash-popup");
  }, 15000);

  it("gracefully handles twoslash blocks even if code has type errors", async () => {
    // Twoslash should not crash the pipeline on invalid TS
    const source = [
      "# T",
      "",
      "```ts twoslash",
      "const x: number = \"not a number\";",
      "```",
    ].join("\n");
    // Should not throw — either produces twoslash output or falls back gracefully
    const result = await processMarkdown(source);
    expect(result.html).toContain("const");
  }, 30000);
});
