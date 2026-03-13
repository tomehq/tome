import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
  parseSummaryNavigation,
  convertGitbookContent,
  parseGitbookConfig,
  migrateFromGitbook,
} from "./migrate-gitbook.js";
import type { NavigationGroup } from "./migrate-gitbook.js";

// ── parseSummaryNavigation ────────────────────────────────

describe("parseSummaryNavigation", () => {
  it("parses flat list of links into a single default group", () => {
    const summary = `* [Introduction](README.md)
* [Getting Started](getting-started.md)
* [FAQ](faq.md)`;

    const groups = parseSummaryNavigation(summary);
    expect(groups).toHaveLength(1);
    expect(groups[0].group).toBe("Documentation");
    expect(groups[0].pages).toEqual(["README", "getting-started", "faq"]);
  });

  it("parses section headings into named groups", () => {
    const summary = `## Basics
* [Intro](intro.md)
* [Setup](setup.md)

## Advanced
* [Plugins](plugins.md)`;

    const groups = parseSummaryNavigation(summary);
    expect(groups).toHaveLength(2);
    expect(groups[0].group).toBe("Basics");
    expect(groups[0].pages).toEqual(["intro", "setup"]);
    expect(groups[1].group).toBe("Advanced");
    expect(groups[1].pages).toEqual(["plugins"]);
  });

  it("handles nested indented links under an unlinked group header", () => {
    const summary = `* Overview
  * [Child A](child-a.md)
  * [Child B](child-b.md)`;

    const groups = parseSummaryNavigation(summary);
    expect(groups).toHaveLength(1);
    // Unlinked "Overview" at indent 0 becomes a top-level group name,
    // and indented children are added directly to its pages.
    expect(groups[0].group).toBe("Overview");
    expect(groups[0].pages).toEqual(["child-a", "child-b"]);
  });

  it("creates nested sub-groups for indented unlinked items", () => {
    const summary = `* [Top](top.md)
  * Nested Group`;

    const groups = parseSummaryNavigation(summary);
    expect(groups).toHaveLength(1);
    // Indented unlinked item becomes a sub-group object
    const subGroup = groups[0].pages[1] as NavigationGroup;
    expect(subGroup.group).toBe("Nested Group");
    expect(subGroup.pages).toEqual([]);
  });

  it("returns empty array for empty content", () => {
    expect(parseSummaryNavigation("")).toEqual([]);
    expect(parseSummaryNavigation("   \n  \n")).toEqual([]);
  });

  it("handles dash list markers the same as asterisks", () => {
    const summary = `- [Alpha](alpha.md)
- [Beta](beta.md)`;

    const groups = parseSummaryNavigation(summary);
    expect(groups).toHaveLength(1);
    expect(groups[0].pages).toEqual(["alpha", "beta"]);
  });
});

// ── convertGitbookContent ─────────────────────────────────

describe("convertGitbookContent", () => {
  it("converts hint info block to Callout", () => {
    const input = `{% hint style="info" %}This is a note{% endhint %}`;
    const { converted, hasJsx } = convertGitbookContent(input);
    expect(hasJsx).toBe(true);
    expect(converted).toContain('<Callout type="info">');
    expect(converted).toContain("This is a note");
    expect(converted).toContain("</Callout>");
  });

  it("converts warning, danger, and success hint styles", () => {
    const warning = convertGitbookContent(
      `{% hint style="warning" %}Watch out{% endhint %}`,
    );
    expect(warning.converted).toContain('<Callout type="warning">');

    const danger = convertGitbookContent(
      `{% hint style="danger" %}Dangerous{% endhint %}`,
    );
    expect(danger.converted).toContain('<Callout type="danger">');

    // success maps to tip
    const success = convertGitbookContent(
      `{% hint style="success" %}Great{% endhint %}`,
    );
    expect(success.converted).toContain('<Callout type="tip">');
  });

  it("converts tab blocks to Tabs/Tab components", () => {
    const input = `{% tabs %}
{% tab title="JavaScript" %}
console.log("hi");
{% endtab %}
{% tab title="Python" %}
print("hi")
{% endtab %}
{% endtabs %}`;

    const { converted, hasJsx } = convertGitbookContent(input);
    expect(hasJsx).toBe(true);
    expect(converted).toContain('<Tabs items={["JavaScript","Python"]}>');
    expect(converted).toContain("<Tab>");
    expect(converted).toContain('console.log("hi");');
    expect(converted).toContain('print("hi")');
  });

  it("converts embed blocks to markdown links", () => {
    const input = `{% embed url="https://example.com/video" %}`;
    const { converted } = convertGitbookContent(input);
    expect(converted).toBe("[Embedded content](https://example.com/video)");
  });

  it("converts content-ref blocks to links", () => {
    const input = `{% content-ref url="getting-started.md" %}
[Getting Started](getting-started.md)
{% endcontent-ref %}`;

    const { converted } = convertGitbookContent(input);
    expect(converted).toBe("[See page](getting-started.md)");
  });

  it("sets hasJsx=false when no GitBook syntax is present", () => {
    const input = `# Hello World\n\nJust plain markdown.`;
    const { converted, hasJsx } = convertGitbookContent(input);
    expect(hasJsx).toBe(false);
    expect(converted).toBe(input);
  });
});

// ── parseGitbookConfig ────────────────────────────────────

describe("parseGitbookConfig", () => {
  it("parses root, structure.summary, and redirects from YAML", () => {
    const yamlContent = `root: ./docs/
structure:
  summary: NAV.md
redirects:
  old-page: new-page
  another/old: another/new`;

    const config = parseGitbookConfig(yamlContent);
    expect(config.root).toBe("./docs");
    expect(config.summaryPath).toBe("NAV.md");
    expect(config.redirects).toEqual([
      { from: "old-page", to: "new-page" },
      { from: "another/old", to: "another/new" },
    ]);
  });

  it("returns defaults when fields are missing", () => {
    const config = parseGitbookConfig("");
    expect(config.root).toBeUndefined();
    expect(config.summaryPath).toBeUndefined();
    expect(config.redirects).toEqual([]);
  });

  it("converts redirect map to array format", () => {
    const yamlContent = `redirects:
  a: b
  c: d
  e: f`;

    const config = parseGitbookConfig(yamlContent);
    expect(config.redirects).toHaveLength(3);
    expect(config.redirects[0]).toEqual({ from: "a", to: "b" });
    expect(config.redirects[2]).toEqual({ from: "e", to: "f" });
  });
});

// ── migrateFromGitbook (integration) ──────────────────────

describe("migrateFromGitbook", () => {
  let sourceDir: string;
  let outDir: string;

  beforeEach(() => {
    sourceDir = mkdtempSync(join(tmpdir(), "gb-src-"));
    outDir = mkdtempSync(join(tmpdir(), "gb-out-"));
  });

  afterEach(() => {
    rmSync(sourceDir, { recursive: true, force: true });
    rmSync(outDir, { recursive: true, force: true });
  });

  function seedGitbookProject() {
    // .gitbook.yaml
    writeFileSync(
      join(sourceDir, ".gitbook.yaml"),
      `root: .
structure:
  summary: SUMMARY.md
redirects:
  old: new`,
      "utf-8",
    );

    // SUMMARY.md
    writeFileSync(
      join(sourceDir, "SUMMARY.md"),
      `* [Welcome](README.md)
* [Guide](guide.md)`,
      "utf-8",
    );

    // Markdown pages
    writeFileSync(
      join(sourceDir, "README.md"),
      `# Welcome\n\nHello world.`,
      "utf-8",
    );
    writeFileSync(
      join(sourceDir, "guide.md"),
      `# Guide\n\n{% hint style="info" %}Important{% endhint %}`,
      "utf-8",
    );
  }

  it("dry run returns correct counts without writing files", async () => {
    seedGitbookProject();

    const result = await migrateFromGitbook(sourceDir, outDir, {
      dryRun: true,
    });

    expect(result.pages).toBe(2);
    expect(result.redirects).toBe(1);
    expect(result.convertedFiles).toHaveLength(2);
    expect(result.warnings).toHaveLength(0);

    // Verify nothing was written
    expect(existsSync(join(outDir, "pages"))).toBe(false);
    expect(existsSync(join(outDir, "tome.config.js"))).toBe(false);
  });

  it("full run creates pages/ directory and tome.config.js", async () => {
    seedGitbookProject();

    const result = await migrateFromGitbook(sourceDir, outDir);

    expect(result.pages).toBe(2);

    // tome.config.js should exist with navigation
    const configPath = join(outDir, "tome.config.js");
    expect(existsSync(configPath)).toBe(true);
    const configContent = readFileSync(configPath, "utf-8");
    expect(configContent).toContain("navigation");
    expect(configContent).toContain("Documentation");

    // pages/ directory should contain converted files
    expect(existsSync(join(outDir, "pages"))).toBe(true);

    // guide.md had a hint block so it becomes .mdx
    const guideFile = join(outDir, "pages", "guide.mdx");
    expect(existsSync(guideFile)).toBe(true);
    const guideContent = readFileSync(guideFile, "utf-8");
    expect(guideContent).toContain("<Callout");

    // README.md stays as .md (no JSX)
    const readmeFile = join(outDir, "pages", "README.md");
    expect(existsSync(readmeFile)).toBe(true);
  });
});
