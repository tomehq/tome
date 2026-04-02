import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, rmSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
  parseVitepressConfig,
  convertSidebarToNavigation,
  convertVitepressContent,
  convertFrontmatter,
  migrateFromVitepress,
} from "./migrate-vitepress.js";
import type { NavigationGroup } from "./migrate-vitepress.js";

// ── parseVitepressConfig ─────────────────────────────────

describe("parseVitepressConfig", () => {
  it("extracts title and description from defineConfig wrapper", () => {
    const config = `import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "My Docs",
  description: "A great documentation site",
  themeConfig: {}
})`;

    const result = parseVitepressConfig(config);
    expect(result.title).toBe("My Docs");
    expect(result.description).toBe("A great documentation site");
  });

  it("extracts title without defineConfig wrapper", () => {
    const config = `export default {
  title: 'Bare Config',
  description: 'No wrapper',
}`;

    const result = parseVitepressConfig(config);
    expect(result.title).toBe("Bare Config");
    expect(result.description).toBe("No wrapper");
  });

  it("parses sidebar as array", () => {
    const config = `export default defineConfig({
  title: "Test",
  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Getting Started", link: "/guide/getting-started" }
        ]
      }
    ]
  }
})`;

    const result = parseVitepressConfig(config);
    expect(Array.isArray(result.sidebar)).toBe(true);
    const sidebar = result.sidebar as Array<{ text: string; items: unknown[] }>;
    expect(sidebar).toHaveLength(1);
    expect(sidebar[0].text).toBe("Guide");
    expect(sidebar[0].items).toHaveLength(2);
  });

  it("parses sidebar as object keyed by path", () => {
    const config = `export default defineConfig({
  title: "Test",
  themeConfig: {
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Intro", link: "/guide/intro" }
          ]
        }
      ],
      "/api/": [
        {
          text: "API",
          items: [
            { text: "Reference", link: "/api/reference" }
          ]
        }
      ]
    }
  }
})`;

    const result = parseVitepressConfig(config);
    expect(Array.isArray(result.sidebar)).toBe(false);
    const sidebar = result.sidebar as Record<string, unknown[]>;
    expect(Object.keys(sidebar)).toHaveLength(2);
    expect(sidebar["/guide/"]).toHaveLength(1);
    expect(sidebar["/api/"]).toHaveLength(1);
  });

  it("parses nav links", () => {
    const config = `export default defineConfig({
  title: "Test",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" }
    ]
  }
})`;

    const result = parseVitepressConfig(config);
    expect(result.nav).toHaveLength(2);
    expect(result.nav[0].text).toBe("Guide");
    expect(result.nav[1].link).toBe("/api/");
  });

  it("parses socialLinks", () => {
    const config = `export default defineConfig({
  title: "Test",
  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/example/repo" }
    ]
  }
})`;

    const result = parseVitepressConfig(config);
    expect(result.socialLinks).toHaveLength(1);
    expect(result.socialLinks[0].icon).toBe("github");
  });

  it("returns defaults when fields are missing", () => {
    const result = parseVitepressConfig("export default {}");
    expect(result.title).toBeUndefined();
    expect(result.description).toBeUndefined();
    expect(result.sidebar).toEqual([]);
    expect(result.nav).toEqual([]);
    expect(result.socialLinks).toEqual([]);
  });
});

// ── convertSidebarToNavigation ───────────────────────────

describe("convertSidebarToNavigation", () => {
  it("converts array sidebar with groups to NavigationGroup[]", () => {
    const sidebar = [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Getting Started", link: "/guide/getting-started" },
        ],
      },
      {
        text: "API",
        items: [
          { text: "Reference", link: "/api/reference" },
        ],
      },
    ];

    const groups = convertSidebarToNavigation(sidebar);
    expect(groups).toHaveLength(2);
    expect(groups[0].group).toBe("Guide");
    expect(groups[0].pages).toEqual(["guide", "guide/getting-started"]);
    expect(groups[1].group).toBe("API");
    expect(groups[1].pages).toEqual(["api/reference"]);
  });

  it("converts object sidebar (multi-section) to NavigationGroup[]", () => {
    const sidebar = {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Intro", link: "/guide/intro" },
          ],
        },
      ],
      "/api/": [
        {
          text: "API",
          items: [
            { text: "Reference", link: "/api/reference" },
          ],
        },
      ],
    };

    const groups = convertSidebarToNavigation(sidebar);
    expect(groups).toHaveLength(2);
    expect(groups[0].group).toBe("Guide");
    expect(groups[0].pages).toEqual(["guide/intro"]);
    expect(groups[1].group).toBe("API");
    expect(groups[1].pages).toEqual(["api/reference"]);
  });

  it("handles standalone links without groups", () => {
    const sidebar = [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
    ];

    const groups = convertSidebarToNavigation(sidebar);
    expect(groups).toHaveLength(1);
    expect(groups[0].group).toBe("Documentation");
    expect(groups[0].pages).toEqual(["", "about"]);
  });

  it("handles nested sub-groups", () => {
    const sidebar = [
      {
        text: "Guide",
        items: [
          { text: "Intro", link: "/guide/intro" },
          {
            text: "Advanced",
            items: [
              { text: "Plugins", link: "/guide/plugins" },
            ],
          },
        ],
      },
    ];

    const groups = convertSidebarToNavigation(sidebar);
    expect(groups).toHaveLength(1);
    expect(groups[0].pages).toHaveLength(2);
    expect(groups[0].pages[0]).toBe("guide/intro");
    const subGroup = groups[0].pages[1] as NavigationGroup;
    expect(subGroup.group).toBe("Advanced");
    expect(subGroup.pages).toEqual(["guide/plugins"]);
  });

  it("strips .md and .html extensions from links", () => {
    const sidebar = [
      {
        text: "Docs",
        items: [
          { text: "Page A", link: "/page-a.md" },
          { text: "Page B", link: "/page-b.html" },
        ],
      },
    ];

    const groups = convertSidebarToNavigation(sidebar);
    expect(groups[0].pages).toEqual(["page-a", "page-b"]);
  });

  it("returns empty array for empty sidebar", () => {
    expect(convertSidebarToNavigation([])).toEqual([]);
    expect(convertSidebarToNavigation({})).toEqual([]);
  });
});

// ── convertVitepressContent ──────────────────────────────

describe("convertVitepressContent", () => {
  it("converts :::info container to Callout", () => {
    const input = `:::info
This is important information.
:::`;

    const { converted, hasJsx } = convertVitepressContent(input);
    expect(hasJsx).toBe(true);
    expect(converted).toContain('<Callout type="info">');
    expect(converted).toContain("This is important information.");
    expect(converted).toContain("</Callout>");
  });

  it("converts :::tip container to Callout", () => {
    const input = `:::tip
A helpful tip.
:::`;

    const { converted, hasJsx } = convertVitepressContent(input);
    expect(hasJsx).toBe(true);
    expect(converted).toContain('<Callout type="tip">');
    expect(converted).toContain("A helpful tip.");
  });

  it("converts :::warning and :::danger containers", () => {
    const warning = convertVitepressContent(`:::warning\nWatch out\n:::`);
    expect(warning.converted).toContain('<Callout type="warning">');
    expect(warning.hasJsx).toBe(true);

    const danger = convertVitepressContent(`:::danger\nDangerous\n:::`);
    expect(danger.converted).toContain('<Callout type="danger">');
    expect(danger.hasJsx).toBe(true);
  });

  it("converts :::note container to info Callout", () => {
    const input = `:::note
A note here.
:::`;

    const { converted } = convertVitepressContent(input);
    expect(converted).toContain('<Callout type="info">');
  });

  it("converts :::details to Accordion", () => {
    const input = `:::details Click to expand
Hidden content here.
:::`;

    const { converted, hasJsx } = convertVitepressContent(input);
    expect(hasJsx).toBe(true);
    expect(converted).toContain('<Accordion title="Click to expand">');
    expect(converted).toContain("Hidden content here.");
    expect(converted).toContain("</Accordion>");
  });

  it("converts :::code-group to Tabs with Tab children", () => {
    const input = `:::code-group
\`\`\`js [JavaScript]
console.log("hi");
\`\`\`
\`\`\`py [Python]
print("hi")
\`\`\`
:::`;

    const { converted, hasJsx } = convertVitepressContent(input);
    expect(hasJsx).toBe(true);
    expect(converted).toContain('<Tabs items={["JavaScript","Python"]}>');
    expect(converted).toContain("<Tab>");
    expect(converted).toContain('console.log("hi");');
    expect(converted).toContain('print("hi")');
  });

  it("uses language name as tab label when no bracket label is present", () => {
    const input = `:::code-group
\`\`\`ts
const x: number = 1;
\`\`\`
:::`;

    const { converted, hasJsx } = convertVitepressContent(input);
    expect(hasJsx).toBe(true);
    expect(converted).toContain('<Tabs items={["ts"]}>');
  });

  it("removes [[toc]] marker", () => {
    const input = `# My Page\n\n[[toc]]\n\nContent here.`;
    const { converted, hasJsx } = convertVitepressContent(input);
    expect(hasJsx).toBe(false);
    expect(converted).not.toContain("[[toc]]");
    expect(converted).toContain("Content here.");
  });

  it("sets hasJsx=false when no VitePress syntax is present", () => {
    const input = `# Hello World\n\nJust plain markdown.`;
    const { converted, hasJsx } = convertVitepressContent(input);
    expect(hasJsx).toBe(false);
    expect(converted).toBe(input);
  });
});

// ── convertFrontmatter ──────────────────────────────────

describe("convertFrontmatter", () => {
  it("converts outline: false to toc: false", () => {
    const fm = convertFrontmatter({ title: "Test", outline: false });
    expect(fm.toc).toBe(false);
    expect(fm.outline).toBeUndefined();
    expect(fm.title).toBe("Test");
  });

  it("converts outline: deep to toc: true", () => {
    const fm = convertFrontmatter({ outline: "deep" });
    expect(fm.toc).toBe(true);
    expect(fm.outline).toBeUndefined();
  });

  it("converts outline: [2, 3] to toc: true", () => {
    const fm = convertFrontmatter({ outline: [2, 3] });
    expect(fm.toc).toBe(true);
    expect(fm.outline).toBeUndefined();
  });

  it("passes through unrelated frontmatter fields unchanged", () => {
    const fm = convertFrontmatter({ title: "Hello", layout: "page" });
    expect(fm.title).toBe("Hello");
    expect(fm.layout).toBe("page");
    expect(fm.toc).toBeUndefined();
  });
});

// ── migrateFromVitepress (integration) ───────────────────

describe("migrateFromVitepress", () => {
  let sourceDir: string;
  let outDir: string;

  beforeEach(() => {
    sourceDir = mkdtempSync(join(tmpdir(), "vp-src-"));
    outDir = mkdtempSync(join(tmpdir(), "vp-out-"));
  });

  afterEach(() => {
    rmSync(sourceDir, { recursive: true, force: true });
    rmSync(outDir, { recursive: true, force: true });
  });

  function seedVitepressProject() {
    // .vitepress/config.ts
    const vpDir = join(sourceDir, ".vitepress");
    mkdirSync(vpDir, { recursive: true });
    writeFileSync(
      join(vpDir, "config.ts"),
      `import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "My Project",
  description: "Project documentation",
  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Setup", link: "/guide/setup" }
        ]
      }
    ],
    nav: [
      { text: "Guide", link: "/guide/" }
    ]
  }
})`,
      "utf-8",
    );

    // .vitepress/public/logo.png (dummy asset)
    const publicDir = join(vpDir, "public");
    mkdirSync(publicDir, { recursive: true });
    writeFileSync(join(publicDir, "logo.png"), "fake-png-data", "utf-8");

    // Markdown pages
    writeFileSync(
      join(sourceDir, "index.md"),
      `---
title: Home
---

# Welcome

Hello world.`,
      "utf-8",
    );

    const guideDir = join(sourceDir, "guide");
    mkdirSync(guideDir, { recursive: true });
    writeFileSync(
      join(guideDir, "index.md"),
      `# Introduction

[[toc]]

Getting started with the project.`,
      "utf-8",
    );

    writeFileSync(
      join(guideDir, "setup.md"),
      `---
outline: false
---

# Setup

:::info
Make sure you have Node.js installed.
:::

:::details Prerequisites
- Node.js 18+
- npm or pnpm
:::`,
      "utf-8",
    );
  }

  it("dry run returns correct counts without writing files", async () => {
    seedVitepressProject();

    const result = await migrateFromVitepress(sourceDir, outDir, {
      dryRun: true,
    });

    expect(result.pages).toBe(3);
    expect(result.redirects).toBe(0);
    expect(result.convertedFiles).toHaveLength(3);
    expect(result.warnings).toHaveLength(0);

    // Verify nothing was written
    expect(existsSync(join(outDir, "pages"))).toBe(false);
    expect(existsSync(join(outDir, "tome.config.js"))).toBe(false);
  });

  it("full run creates pages/ directory and tome.config.js", async () => {
    seedVitepressProject();

    const result = await migrateFromVitepress(sourceDir, outDir);

    expect(result.pages).toBe(3);

    // tome.config.js should exist with navigation and title
    const configPath = join(outDir, "tome.config.js");
    expect(existsSync(configPath)).toBe(true);
    const configContent = readFileSync(configPath, "utf-8");
    expect(configContent).toContain("navigation");
    expect(configContent).toContain("My Project");
    expect(configContent).toContain("Project documentation");

    // pages/ directory should contain converted files
    expect(existsSync(join(outDir, "pages"))).toBe(true);

    // setup.md had containers so it becomes .mdx
    const setupFile = join(outDir, "pages", "guide", "setup.mdx");
    expect(existsSync(setupFile)).toBe(true);
    const setupContent = readFileSync(setupFile, "utf-8");
    expect(setupContent).toContain("<Callout");
    expect(setupContent).toContain("<Accordion");
    // outline: false → toc: false
    expect(setupContent).toContain("toc: false");
    expect(setupContent).not.toContain("outline");

    // index.md stays as .md (no JSX, [[toc]] is removed not replaced)
    const indexFile = join(outDir, "pages", "index.md");
    expect(existsSync(indexFile)).toBe(true);
    const indexContent = readFileSync(indexFile, "utf-8");
    expect(indexContent).toContain("Home");

    // guide/index.md stays as .md, [[toc]] removed
    const guideIndex = join(outDir, "pages", "guide", "index.md");
    expect(existsSync(guideIndex)).toBe(true);
    const guideContent = readFileSync(guideIndex, "utf-8");
    expect(guideContent).not.toContain("[[toc]]");
  });

  it("copies assets from .vitepress/public/ to public/", async () => {
    seedVitepressProject();

    await migrateFromVitepress(sourceDir, outDir);

    const logoPath = join(outDir, "public", "logo.png");
    expect(existsSync(logoPath)).toBe(true);
    expect(readFileSync(logoPath, "utf-8")).toBe("fake-png-data");
  });

  it("warns when .vitepress/config is missing", async () => {
    // Create a bare source dir with just a markdown file.
    writeFileSync(
      join(sourceDir, "index.md"),
      `# Hello\n\nWorld.`,
      "utf-8",
    );

    const result = await migrateFromVitepress(sourceDir, outDir);

    expect(result.warnings).toContain(
      ".vitepress/config not found; using default settings.",
    );
    expect(result.pages).toBe(1);

    // Config should use default title
    const configContent = readFileSync(
      join(outDir, "tome.config.js"),
      "utf-8",
    );
    expect(configContent).toContain("Documentation");
  });
});
