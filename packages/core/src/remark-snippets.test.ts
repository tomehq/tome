import { describe, it, expect, afterAll } from "vitest";
import { resolve } from "path";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkSnippets, { resolveSnippet } from "./remark-snippets.js";

// ── Test fixtures ────────────────────────────────────────

const TMP_DIR = resolve(__dirname, "../.test-tmp-snippets");
const SNIPPETS_DIR = resolve(TMP_DIR, "snippets");

function setup() {
  if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true });
  mkdirSync(SNIPPETS_DIR, { recursive: true });
  mkdirSync(resolve(SNIPPETS_DIR, "shared"), { recursive: true });
}

function writeSnippet(path: string, content: string) {
  writeFileSync(resolve(SNIPPETS_DIR, path), content, "utf-8");
}

async function processWithSnippets(markdown: string, options?: { maxDepth?: number }): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkSnippets, { snippetsDir: SNIPPETS_DIR, ...options })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

// ── Setup & Cleanup ──────────────────────────────────────

setup();

afterAll(() => {
  if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true });
});

// ── resolveSnippet ───────────────────────────────────────

describe("resolveSnippet", () => {
  it("reads snippet content from file", () => {
    writeSnippet("simple.md", "Hello from snippet");
    const content = resolveSnippet(SNIPPETS_DIR, "simple.md");
    expect(content).toBe("Hello from snippet");
  });

  it("throws for missing snippet file", () => {
    expect(() => resolveSnippet(SNIPPETS_DIR, "nonexistent.md")).toThrow("Snippet not found");
  });

  it("reads from nested directories", () => {
    writeSnippet("shared/warning.md", "**Warning:** Be careful!");
    const content = resolveSnippet(SNIPPETS_DIR, "shared/warning.md");
    expect(content).toContain("Warning");
  });
});

// ── remarkSnippets plugin ────────────────────────────────

describe("remarkSnippets", () => {
  it("replaces a simple snippet directive with content", async () => {
    writeSnippet("greeting.md", "Hello, world!");
    const result = await processWithSnippets('::snippet{file="greeting.md"}');
    expect(result).toContain("Hello, world!");
  });

  it("replaces snippet with multi-paragraph content", async () => {
    writeSnippet("multi.md", "First paragraph.\n\nSecond paragraph.");
    const result = await processWithSnippets('::snippet{file="multi.md"}');
    expect(result).toContain("First paragraph.");
    expect(result).toContain("Second paragraph.");
  });

  it("preserves surrounding content", async () => {
    writeSnippet("insert.md", "Inserted content.");
    const result = await processWithSnippets(
      "Before the snippet.\n\n::snippet{file=\"insert.md\"}\n\nAfter the snippet."
    );
    expect(result).toContain("Before the snippet.");
    expect(result).toContain("Inserted content.");
    expect(result).toContain("After the snippet.");
  });

  it("handles nested directory paths", async () => {
    writeSnippet("shared/note.md", "This is a shared note.");
    const result = await processWithSnippets('::snippet{file="shared/note.md"}');
    expect(result).toContain("This is a shared note.");
  });

  it("substitutes variables in snippet content", async () => {
    writeSnippet("versioned.md", "You are using version {{version}} of the API.");
    const result = await processWithSnippets('::snippet{file="versioned.md" version="v2"}');
    expect(result).toContain("You are using version v2 of the API.");
  });

  it("substitutes multiple variables", async () => {
    writeSnippet("multi-var.md", "Project: {{name}}, Version: {{version}}");
    const result = await processWithSnippets('::snippet{file="multi-var.md" name="Tome" version="1.0"}');
    expect(result).toContain("Project: Tome, Version: 1.0");
  });

  it("preserves unmatched variables", async () => {
    writeSnippet("partial-var.md", "Hello {{name}}, your ID is {{id}}.");
    const result = await processWithSnippets('::snippet{file="partial-var.md" name="Alice"}');
    expect(result).toContain("Hello Alice");
    expect(result).toContain("{{id}}");
  });

  it("strips frontmatter from snippet content", async () => {
    writeSnippet("with-fm.md", "---\ntitle: Hidden\n---\nVisible content only.");
    const result = await processWithSnippets('::snippet{file="with-fm.md"}');
    expect(result).not.toContain("title: Hidden");
    expect(result).toContain("Visible content only.");
  });

  it("shows error message for missing snippet", async () => {
    const result = await processWithSnippets('::snippet{file="does-not-exist.md"}');
    expect(result).toContain("Snippet error");
    expect(result).toContain("Snippet not found");
  });

  it("handles snippet without file attribute gracefully", async () => {
    const result = await processWithSnippets('::snippet{nofile="true"}');
    // Should pass through unchanged
    expect(result).toContain("::snippet");
  });

  it("does not modify non-snippet paragraphs", async () => {
    const result = await processWithSnippets("Just a regular paragraph.");
    expect(result).toContain("Just a regular paragraph.");
  });

  it("resolves nested snippets", async () => {
    writeSnippet("outer.md", 'This is outer.\n\n::snippet{file="inner.md"}');
    writeSnippet("inner.md", "This is inner.");
    const result = await processWithSnippets('::snippet{file="outer.md"}');
    expect(result).toContain("This is outer.");
    expect(result).toContain("This is inner.");
  });

  it("respects max depth to prevent infinite recursion", async () => {
    writeSnippet("recursive.md", '::snippet{file="recursive.md"}');
    // Should not hang - stops at maxDepth
    const result = await processWithSnippets('::snippet{file="recursive.md"}', { maxDepth: 2 });
    expect(result).toBeDefined();
  });

  it("handles snippet with markdown formatting", async () => {
    writeSnippet("formatted.md", "# Heading\n\n**Bold** and *italic* text.\n\n- List item 1\n- List item 2");
    const result = await processWithSnippets('::snippet{file="formatted.md"}');
    expect(result).toContain("<h1>");
    expect(result).toContain("<strong>Bold</strong>");
    expect(result).toContain("<li>");
  });
});

// ── Config integration ───────────────────────────────────

describe("snippetsDir config", () => {
  it("defaults snippetsDir to 'snippets'", async () => {
    const { TomeConfigSchema } = await import("./config.js");
    const result = TomeConfigSchema.parse({});
    expect(result.snippetsDir).toBe("snippets");
  });

  it("accepts custom snippetsDir", async () => {
    const { TomeConfigSchema } = await import("./config.js");
    const result = TomeConfigSchema.parse({ snippetsDir: "content/shared" });
    expect(result.snippetsDir).toBe("content/shared");
  });
});
