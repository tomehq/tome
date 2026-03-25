/**
 * Content linter for documentation pages (TOM-53).
 * Validates writing style, consistency, and common mistakes.
 */

import { readFileSync } from "fs";
import matter from "gray-matter";
import type { PageRoute } from "./routes.js";

// ── TYPES ────────────────────────────────────────────────

export interface LintIssue {
  /** Source file */
  file: string;
  /** Line number (1-based) */
  line: number;
  /** Rule that triggered the issue */
  rule: string;
  /** Severity level */
  severity: "error" | "warning" | "info";
  /** Human-readable message */
  message: string;
}

export interface LintResult {
  /** Total issues found */
  totalIssues: number;
  /** Issues grouped by severity */
  errors: number;
  warnings: number;
  infos: number;
  /** All issues */
  issues: LintIssue[];
  /** Whether the lint passed (no errors) */
  ok: boolean;
}

export interface LintRuleConfig {
  /** Check for headings that skip levels (e.g., h2 → h4) */
  headingIncrement?: boolean;
  /** Check for images missing alt text */
  imageAltText?: boolean;
  /** Max paragraph length in words (0 = disabled) */
  maxParagraphLength?: number;
  /** Check for multiple h1 headings */
  singleH1?: boolean;
  /** Check for trailing whitespace */
  trailingWhitespace?: boolean;
  /** Check for empty links [text]() */
  emptyLinks?: boolean;
  /** Custom banned words */
  bannedWords?: string[];
}

const DEFAULT_RULES: Required<LintRuleConfig> = {
  headingIncrement: true,
  imageAltText: true,
  maxParagraphLength: 200,
  singleH1: true,
  trailingWhitespace: false,
  emptyLinks: true,
  bannedWords: [],
};

// ── LINTING RULES ───────────────────────────────────────

/**
 * Check for headings that skip levels (e.g., h2 → h4 without h3).
 */
function checkHeadingIncrement(content: string, file: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const lines = content.split("\n");
  let lastLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(#{1,6})\s/);
    if (match) {
      const level = match[1].length;
      if (lastLevel > 0 && level > lastLevel + 1) {
        issues.push({
          file,
          line: i + 1,
          rule: "heading-increment",
          severity: "warning",
          message: `Heading level skips from h${lastLevel} to h${level}. Use h${lastLevel + 1} instead.`,
        });
      }
      lastLevel = level;
    }
  }

  return issues;
}

/**
 * Check for images missing alt text.
 */
function checkImageAltText(content: string, file: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    // Match ![](...) with empty or whitespace-only alt text
    // Use non-backtracking check: find ![, then check if ] follows immediately or after whitespace
    if (/!\[\s*\]\(/.test(lines[i])) {
      issues.push({
        file,
        line: i + 1,
        rule: "image-alt-text",
        severity: "warning",
        message: "Image is missing alt text. Add a description inside the brackets: ![description](url)",
      });
    }

    // Also check HTML images without alt
    const htmlImgRegex = /<img\b(?![^>]*\balt\s*=)[^>]*>/gi;
    if (htmlImgRegex.test(lines[i])) {
      issues.push({
        file,
        line: i + 1,
        rule: "image-alt-text",
        severity: "warning",
        message: "HTML <img> is missing alt attribute. Add alt=\"description\" for accessibility.",
      });
    }
  }

  return issues;
}

/**
 * Check for paragraphs that exceed the maximum word count.
 */
function checkParagraphLength(content: string, file: string, maxWords: number): LintIssue[] {
  if (maxWords <= 0) return [];

  const issues: LintIssue[] = [];
  const lines = content.split("\n");

  let paragraphStart = -1;
  let paragraphWords: string[] = [];

  function flushParagraph() {
    if (paragraphStart >= 0 && paragraphWords.length > maxWords) {
      issues.push({
        file,
        line: paragraphStart + 1,
        rule: "max-paragraph-length",
        severity: "info",
        message: `Paragraph has ${paragraphWords.length} words (max: ${maxWords}). Consider breaking it into smaller paragraphs.`,
      });
    }
    paragraphStart = -1;
    paragraphWords = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    // Skip headings, code blocks, lists, etc.
    if (trimmed.startsWith("#") || trimmed.startsWith("```") || trimmed.startsWith("- ") ||
        trimmed.startsWith("* ") || trimmed.startsWith("> ") || trimmed.match(/^\d+\.\s/)) {
      flushParagraph();
      continue;
    }

    if (trimmed === "") {
      flushParagraph();
    } else {
      if (paragraphStart < 0) paragraphStart = i;
      paragraphWords.push(...trimmed.split(/\s+/).filter((w) => w.length > 0));
    }
  }
  flushParagraph();

  return issues;
}

/**
 * Check for multiple h1 headings.
 */
function checkSingleH1(content: string, file: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const lines = content.split("\n");
  let h1Count = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^#\s+[^#]/)) {
      h1Count++;
      if (h1Count > 1) {
        issues.push({
          file,
          line: i + 1,
          rule: "single-h1",
          severity: "warning",
          message: "Multiple h1 headings found. A page should have only one h1 heading.",
        });
      }
    }
  }

  return issues;
}

/**
 * Check for empty links [text]().
 */
function checkEmptyLinks(content: string, file: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    // Check for empty or whitespace-only links — ]\(\s*\) has no backtracking risk
    // since \s* and \) don't overlap
    if (/\]\(\s*\)/.test(lines[i])) {
      issues.push({
        file,
        line: i + 1,
        rule: "empty-link",
        severity: "error",
        message: "Link has empty URL. Provide a valid href: [text](url)",
      });
    }
  }

  return issues;
}

/**
 * Check for banned words.
 */
function checkBannedWords(content: string, file: string, words: string[]): LintIssue[] {
  if (words.length === 0) return [];

  const issues: LintIssue[] = [];
  const lines = content.split("\n");
  const pattern = new RegExp(`\\b(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|")})\\b`, "gi");

  for (let i = 0; i < lines.length; i++) {
    let match;
    pattern.lastIndex = 0;
    while ((match = pattern.exec(lines[i])) !== null) {
      issues.push({
        file,
        line: i + 1,
        rule: "banned-word",
        severity: "warning",
        message: `Banned word "${match[1]}" found. Consider using an alternative.`,
      });
    }
  }

  return issues;
}

// ── MAIN LINTER ─────────────────────────────────────────

/**
 * Lint all documentation pages for content issues.
 */
export function lintPages(
  routes: PageRoute[],
  ruleConfig?: LintRuleConfig
): LintResult {
  const rules = { ...DEFAULT_RULES, ...ruleConfig };
  const allIssues: LintIssue[] = [];

  for (const route of routes) {
    if (route.filePath === "__api-reference__") continue;

    try {
      const source = readFileSync(route.absolutePath, "utf-8");
      const { content } = matter(source);

      if (rules.headingIncrement) {
        allIssues.push(...checkHeadingIncrement(content, route.filePath));
      }
      if (rules.imageAltText) {
        allIssues.push(...checkImageAltText(content, route.filePath));
      }
      if (rules.maxParagraphLength > 0) {
        allIssues.push(...checkParagraphLength(content, route.filePath, rules.maxParagraphLength));
      }
      if (rules.singleH1) {
        allIssues.push(...checkSingleH1(content, route.filePath));
      }
      if (rules.emptyLinks) {
        allIssues.push(...checkEmptyLinks(content, route.filePath));
      }
      if (rules.bannedWords.length > 0) {
        allIssues.push(...checkBannedWords(content, route.filePath, rules.bannedWords));
      }
    } catch {
      // Skip unreadable files
    }
  }

  const errors = allIssues.filter((i) => i.severity === "error").length;
  const warnings = allIssues.filter((i) => i.severity === "warning").length;
  const infos = allIssues.filter((i) => i.severity === "info").length;

  return {
    totalIssues: allIssues.length,
    errors,
    warnings,
    infos,
    issues: allIssues,
    ok: errors === 0,
  };
}

/**
 * Format lint results for console output.
 */
export function formatLintResults(result: LintResult): string {
  if (result.totalIssues === 0) {
    return "✓ No content issues found";
  }

  const severityIcon = { error: "✗", warning: "⚠", info: "ℹ" };
  const lines: string[] = [
    `${result.ok ? "⚠" : "✗"} ${result.totalIssues} issue${result.totalIssues === 1 ? "" : "s"} found (${result.errors} error${result.errors === 1 ? "" : "s"}, ${result.warnings} warning${result.warnings === 1 ? "" : "s"}, ${result.infos} info)`,
    "",
  ];

  for (const issue of result.issues) {
    const icon = severityIcon[issue.severity];
    lines.push(`  ${icon} ${issue.file}:${issue.line} [${issue.rule}]`);
    lines.push(`    ${issue.message}`);
    lines.push("");
  }

  return lines.join("\n");
}

// Export individual rule checkers for testing
export {
  checkHeadingIncrement,
  checkImageAltText,
  checkParagraphLength,
  checkSingleH1,
  checkEmptyLinks,
  checkBannedWords,
};
