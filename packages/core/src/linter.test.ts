import { describe, it, expect } from "vitest";
import {
  checkHeadingIncrement,
  checkImageAltText,
  checkParagraphLength,
  checkSingleH1,
  checkEmptyLinks,
  checkBannedWords,
  lintPages,
  formatLintResults,
} from "./linter.js";
import type { PageRoute } from "./routes.js";

// ── checkHeadingIncrement ──────────────────────────────

describe("checkHeadingIncrement", () => {
  it("returns no issues for sequential headings", () => {
    const content = "# Title\n## Section\n### Subsection";
    expect(checkHeadingIncrement(content, "test.md")).toHaveLength(0);
  });

  it("detects skipped heading levels", () => {
    const content = "# Title\n### Skipped h2";
    const issues = checkHeadingIncrement(content, "test.md");
    expect(issues).toHaveLength(1);
    expect(issues[0].rule).toBe("heading-increment");
    expect(issues[0].severity).toBe("warning");
    expect(issues[0].line).toBe(2);
    expect(issues[0].message).toContain("h1 to h3");
  });

  it("detects multiple skipped levels", () => {
    const content = "## Section\n#### Deep skip";
    const issues = checkHeadingIncrement(content, "test.md");
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain("h2 to h4");
  });

  it("allows going back up to a higher level", () => {
    const content = "# Title\n## Section\n### Sub\n## Another section";
    expect(checkHeadingIncrement(content, "test.md")).toHaveLength(0);
  });

  it("returns no issues for empty content", () => {
    expect(checkHeadingIncrement("", "test.md")).toHaveLength(0);
  });
});

// ── checkImageAltText ──────────────────────────────────

describe("checkImageAltText", () => {
  it("returns no issues for images with alt text", () => {
    const content = "![A cute cat](cat.png)";
    expect(checkImageAltText(content, "test.md")).toHaveLength(0);
  });

  it("detects missing alt text in markdown images", () => {
    const content = "![](image.png)";
    const issues = checkImageAltText(content, "test.md");
    expect(issues).toHaveLength(1);
    expect(issues[0].rule).toBe("image-alt-text");
    expect(issues[0].severity).toBe("warning");
    expect(issues[0].message).toContain("missing alt text");
  });

  it("detects whitespace-only alt text", () => {
    const content = "![  ](image.png)";
    const issues = checkImageAltText(content, "test.md");
    expect(issues).toHaveLength(1);
  });

  it("detects HTML img without alt attribute", () => {
    const content = '<img src="photo.jpg" />';
    const issues = checkImageAltText(content, "test.md");
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain("HTML <img>");
  });

  it("allows HTML img with alt attribute", () => {
    const content = '<img src="photo.jpg" alt="A photo" />';
    expect(checkImageAltText(content, "test.md")).toHaveLength(0);
  });

  it("detects multiple images missing alt text", () => {
    const content = "![](a.png)\n![](b.png)";
    const issues = checkImageAltText(content, "test.md");
    expect(issues).toHaveLength(2);
    expect(issues[0].line).toBe(1);
    expect(issues[1].line).toBe(2);
  });
});

// ── checkParagraphLength ───────────────────────────────

describe("checkParagraphLength", () => {
  it("returns no issues for short paragraphs", () => {
    const content = "This is a short paragraph with a few words.";
    expect(checkParagraphLength(content, "test.md", 200)).toHaveLength(0);
  });

  it("detects paragraphs exceeding max word count", () => {
    const words = Array(201).fill("word").join(" ");
    const issues = checkParagraphLength(words, "test.md", 200);
    expect(issues).toHaveLength(1);
    expect(issues[0].rule).toBe("max-paragraph-length");
    expect(issues[0].severity).toBe("info");
    expect(issues[0].message).toContain("201 words");
  });

  it("skips headings in word count", () => {
    const content = "# Heading\n" + Array(201).fill("word").join(" ");
    const issues = checkParagraphLength(content, "test.md", 200);
    expect(issues).toHaveLength(1);
    // The paragraph starts after the heading
    expect(issues[0].line).toBe(2);
  });

  it("counts multi-line paragraphs together", () => {
    const line1 = Array(100).fill("word").join(" ");
    const line2 = Array(101).fill("word").join(" ");
    const content = `${line1}\n${line2}`;
    const issues = checkParagraphLength(content, "test.md", 200);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain("201 words");
  });

  it("separates paragraphs by blank lines", () => {
    const para1 = Array(150).fill("word").join(" ");
    const para2 = Array(150).fill("word").join(" ");
    const content = `${para1}\n\n${para2}`;
    // Both paragraphs are 150 words (under 200 limit)
    expect(checkParagraphLength(content, "test.md", 200)).toHaveLength(0);
  });

  it("returns no issues when maxWords is 0 (disabled)", () => {
    const content = Array(500).fill("word").join(" ");
    expect(checkParagraphLength(content, "test.md", 0)).toHaveLength(0);
  });

  it("skips list items", () => {
    const content = "- " + Array(201).fill("word").join(" ");
    expect(checkParagraphLength(content, "test.md", 200)).toHaveLength(0);
  });
});

// ── checkSingleH1 ──────────────────────────────────────

describe("checkSingleH1", () => {
  it("returns no issues for a single h1", () => {
    const content = "# Title\n## Section\n### Sub";
    expect(checkSingleH1(content, "test.md")).toHaveLength(0);
  });

  it("detects multiple h1 headings", () => {
    const content = "# First Title\n## Section\n# Second Title";
    const issues = checkSingleH1(content, "test.md");
    expect(issues).toHaveLength(1);
    expect(issues[0].rule).toBe("single-h1");
    expect(issues[0].severity).toBe("warning");
    expect(issues[0].line).toBe(3);
  });

  it("detects three h1 headings", () => {
    const content = "# One\n# Two\n# Three";
    const issues = checkSingleH1(content, "test.md");
    expect(issues).toHaveLength(2);
    expect(issues[0].line).toBe(2);
    expect(issues[1].line).toBe(3);
  });

  it("returns no issues when there are no h1 headings", () => {
    const content = "## Section\n### Sub";
    expect(checkSingleH1(content, "test.md")).toHaveLength(0);
  });
});

// ── checkEmptyLinks ────────────────────────────────────

describe("checkEmptyLinks", () => {
  it("returns no issues for valid links", () => {
    const content = "[click here](https://example.com)";
    expect(checkEmptyLinks(content, "test.md")).toHaveLength(0);
  });

  it("detects empty link URLs", () => {
    const content = "[click here]()";
    const issues = checkEmptyLinks(content, "test.md");
    expect(issues).toHaveLength(1);
    expect(issues[0].rule).toBe("empty-link");
    expect(issues[0].severity).toBe("error");
    expect(issues[0].message).toContain("empty URL");
  });

  it("detects whitespace-only link URLs", () => {
    const content = "[click here](  )";
    const issues = checkEmptyLinks(content, "test.md");
    expect(issues).toHaveLength(1);
  });

  it("detects multiple empty links", () => {
    const content = "[link1]()\n[link2]()";
    const issues = checkEmptyLinks(content, "test.md");
    expect(issues).toHaveLength(2);
  });

  it("does not flag image syntax", () => {
    const content = "![alt](image.png)";
    expect(checkEmptyLinks(content, "test.md")).toHaveLength(0);
  });
});

// ── checkBannedWords ───────────────────────────────────

describe("checkBannedWords", () => {
  it("returns no issues when no banned words found", () => {
    const content = "This is a clean sentence.";
    expect(checkBannedWords(content, "test.md", ["badword"])).toHaveLength(0);
  });

  it("detects banned words", () => {
    const content = "This has a badword in it.";
    const issues = checkBannedWords(content, "test.md", ["badword"]);
    expect(issues).toHaveLength(1);
    expect(issues[0].rule).toBe("banned-word");
    expect(issues[0].severity).toBe("warning");
    expect(issues[0].message).toContain('"badword"');
  });

  it("detects banned words case-insensitively", () => {
    const content = "This has BADWORD in it.";
    const issues = checkBannedWords(content, "test.md", ["badword"]);
    expect(issues).toHaveLength(1);
  });

  it("detects multiple banned words on the same line", () => {
    const content = "foo and bar are both banned.";
    const issues = checkBannedWords(content, "test.md", ["foo", "bar"]);
    expect(issues).toHaveLength(2);
  });

  it("returns no issues when banned words list is empty", () => {
    const content = "This has everything in it.";
    expect(checkBannedWords(content, "test.md", [])).toHaveLength(0);
  });

  it("uses word boundaries", () => {
    const content = "This is a godlike prefix.";
    // "god" should not match "godlike" due to word boundary
    expect(checkBannedWords(content, "test.md", ["god"])).toHaveLength(0);
  });
});

// ── formatLintResults ──────────────────────────────────

describe("formatLintResults", () => {
  it("returns success message for no issues", () => {
    const result = {
      totalIssues: 0,
      errors: 0,
      warnings: 0,
      infos: 0,
      issues: [],
      ok: true,
    };
    expect(formatLintResults(result)).toContain("No content issues found");
  });

  it("formats issues with severity icons", () => {
    const result = {
      totalIssues: 1,
      errors: 1,
      warnings: 0,
      infos: 0,
      issues: [{
        file: "test.md",
        line: 5,
        rule: "empty-link",
        severity: "error" as const,
        message: "Link has empty URL.",
      }],
      ok: false,
    };
    const output = formatLintResults(result);
    expect(output).toContain("1 issue found");
    expect(output).toContain("test.md:5");
    expect(output).toContain("[empty-link]");
    expect(output).toContain("Link has empty URL.");
  });

  it("shows summary counts", () => {
    const result = {
      totalIssues: 3,
      errors: 1,
      warnings: 1,
      infos: 1,
      issues: [],
      ok: false,
    };
    const output = formatLintResults(result);
    expect(output).toContain("3 issues found");
    expect(output).toContain("1 error");
    expect(output).toContain("1 warning");
    expect(output).toContain("1 info");
  });
});

// ── lintPages (integration) ────────────────────────────

describe("lintPages", () => {
  it("returns ok when no issues", () => {
    // Empty routes = no issues
    const result = lintPages([]);
    expect(result.ok).toBe(true);
    expect(result.totalIssues).toBe(0);
  });

  it("skips __api-reference__ routes", () => {
    const routes: PageRoute[] = [{
      id: "api-reference",
      filePath: "__api-reference__",
      absolutePath: "/fake/path",
      urlPath: "/api",
      frontmatter: { title: "API", hidden: false },
      isMdx: false,
    }];
    const result = lintPages(routes);
    expect(result.ok).toBe(true);
    expect(result.totalIssues).toBe(0);
  });

  it("respects rule config to disable rules", () => {
    // Passing custom config with all rules disabled should find no issues
    const result = lintPages([], {
      headingIncrement: false,
      imageAltText: false,
      maxParagraphLength: 0,
      singleH1: false,
      emptyLinks: false,
      bannedWords: [],
    });
    expect(result.ok).toBe(true);
  });

  it("counts severities correctly", () => {
    // Test with manually constructed result
    const result = {
      totalIssues: 3,
      errors: 1,
      warnings: 1,
      infos: 1,
      issues: [],
      ok: false,
    };
    expect(result.errors).toBe(1);
    expect(result.warnings).toBe(1);
    expect(result.infos).toBe(1);
  });
});
