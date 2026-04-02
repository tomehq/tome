import { describe, it, expect } from "vitest";
import {
  mkdtempSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
} from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
  parseDocusaurusConfig,
  parseSidebarsConfig,
  convertSidebarItems,
  convertDocusaurusSidebars,
  convertDocusaurusConfig,
  convertDocusaurusContent,
  migrateFromDocusaurus,
} from "./migrate-docusaurus.js";

// ---------------------------------------------------------------------------
// parseDocusaurusConfig
// ---------------------------------------------------------------------------

describe("parseDocusaurusConfig", () => {
  it("parses ESM config with all fields", () => {
    const content = `
      export default {
        title: 'My Site',
        tagline: 'Dinosaurs are cool',
        url: 'https://example.com',
        baseUrl: '/',
        favicon: 'img/favicon.ico',
        themeConfig: {
          navbar: {
            title: 'My Docs',
            logo: {
              alt: 'Logo',
              src: 'img/logo.svg',
            },
          },
          colorMode: {
            defaultMode: 'dark',
          },
        },
      };
    `;

    const config = parseDocusaurusConfig(content);
    expect(config.title).toBe("My Site");
    expect(config.tagline).toBe("Dinosaurs are cool");
    expect(config.url).toBe("https://example.com");
    expect(config.baseUrl).toBe("/");
    expect(config.favicon).toBe("img/favicon.ico");
    expect(config.themeConfig?.navbar?.title).toBe("My Docs");
    expect(config.themeConfig?.navbar?.logo?.src).toBe("img/logo.svg");
    expect(config.themeConfig?.colorMode?.defaultMode).toBe("dark");
  });

  it("parses CJS config (module.exports)", () => {
    const content = `
      module.exports = {
        title: 'CJS Docs',
        url: 'https://cjs.example.com',
        favicon: 'img/fav.png',
      };
    `;

    const config = parseDocusaurusConfig(content);
    expect(config.title).toBe("CJS Docs");
    expect(config.url).toBe("https://cjs.example.com");
    expect(config.favicon).toBe("img/fav.png");
  });

  it("returns empty config for unparseable content", () => {
    const config = parseDocusaurusConfig("// empty file");
    expect(config.title).toBeUndefined();
    expect(config.url).toBeUndefined();
  });

  it("extracts navbar title separate from site title", () => {
    const content = `
      export default {
        title: 'Site Title',
        themeConfig: {
          navbar: {
            title: 'Navbar Title',
          },
        },
      };
    `;

    const config = parseDocusaurusConfig(content);
    expect(config.title).toBe("Site Title");
    expect(config.themeConfig?.navbar?.title).toBe("Navbar Title");
  });
});

// ---------------------------------------------------------------------------
// parseSidebarsConfig
// ---------------------------------------------------------------------------

describe("parseSidebarsConfig", () => {
  it("parses ESM sidebar with string arrays", () => {
    const content = `
      export default {
        docs: ['intro', 'quickstart']
      };
    `;

    const sidebars = parseSidebarsConfig(content);
    expect(sidebars.docs).toEqual(["intro", "quickstart"]);
  });

  it("parses CJS sidebar with categories", () => {
    const content = `
      module.exports = {
        docs: [
          {
            "type": "category",
            "label": "Getting Started",
            "items": ["intro", "setup"]
          }
        ]
      };
    `;

    const sidebars = parseSidebarsConfig(content);
    expect(sidebars.docs).toHaveLength(1);
    expect(sidebars.docs[0]).toEqual({
      type: "category",
      label: "Getting Started",
      items: ["intro", "setup"],
    });
  });

  it("returns empty object for unparseable content", () => {
    const content = `
      const sidebars = require('./generated');
      module.exports = sidebars;
    `;

    const sidebars = parseSidebarsConfig(content);
    expect(Object.keys(sidebars)).toHaveLength(0);
  });

  it("parses sidebar with doc objects", () => {
    const content = `
      export default {
        docs: [
          {
            "type": "doc",
            "id": "intro",
            "label": "Introduction"
          }
        ]
      };
    `;

    const sidebars = parseSidebarsConfig(content);
    expect(sidebars.docs).toHaveLength(1);
    expect(sidebars.docs[0]).toEqual({
      type: "doc",
      id: "intro",
      label: "Introduction",
    });
  });
});

// ---------------------------------------------------------------------------
// convertSidebarItems
// ---------------------------------------------------------------------------

describe("convertSidebarItems", () => {
  it("passes through string items", () => {
    const result = convertSidebarItems(["intro", "setup"]);
    expect(result).toEqual(["intro", "setup"]);
  });

  it("converts doc objects to string IDs", () => {
    const result = convertSidebarItems([
      { type: "doc", id: "intro", label: "Introduction" },
      { type: "doc", id: "setup" },
    ]);
    expect(result).toEqual(["intro", "setup"]);
  });

  it("converts category objects to NavigationGroup", () => {
    const result = convertSidebarItems([
      {
        type: "category",
        label: "Getting Started",
        items: ["intro", "setup"],
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      group: "Getting Started",
      pages: ["intro", "setup"],
    });
  });

  it("handles nested categories", () => {
    const result = convertSidebarItems([
      {
        type: "category",
        label: "Guide",
        items: [
          "intro",
          {
            type: "category",
            label: "Advanced",
            items: ["plugins", "themes"],
          },
        ],
      },
    ]);

    expect(result).toHaveLength(1);
    const guide = result[0] as { group: string; pages: any[] };
    expect(guide.group).toBe("Guide");
    expect(guide.pages).toHaveLength(2);
    expect(guide.pages[0]).toBe("intro");
    expect(guide.pages[1]).toEqual({
      group: "Advanced",
      pages: ["plugins", "themes"],
    });
  });

  it("skips link items", () => {
    const result = convertSidebarItems([
      "intro",
      { type: "link", label: "GitHub", href: "https://github.com" },
      "setup",
    ]);

    expect(result).toEqual(["intro", "setup"]);
  });

  it("handles autogenerated items with existing docs dir", () => {
    const dir = mkdtempSync(join(tmpdir(), "docusaurus-sidebar-"));
    const docsDir = join(dir, "docs");
    mkdirSync(docsDir);
    writeFileSync(join(docsDir, "intro.md"), "# Intro");
    writeFileSync(join(docsDir, "setup.md"), "# Setup");

    const result = convertSidebarItems(
      [{ type: "autogenerated", dirName: "." }],
      docsDir,
    );

    expect(result).toContain("intro");
    expect(result).toContain("setup");
  });
});

// ---------------------------------------------------------------------------
// convertDocusaurusSidebars
// ---------------------------------------------------------------------------

describe("convertDocusaurusSidebars", () => {
  it("flattens top-level categories into separate groups", () => {
    const sidebars = {
      docs: [
        {
          type: "category" as const,
          label: "Getting Started",
          items: ["intro", "setup"],
        },
        {
          type: "category" as const,
          label: "Advanced",
          items: ["plugins"],
        },
      ],
    };

    const result = convertDocusaurusSidebars(sidebars);
    expect(result).toHaveLength(2);
    expect(result[0].group).toBe("Getting Started");
    expect(result[0].pages).toEqual(["intro", "setup"]);
    expect(result[1].group).toBe("Advanced");
    expect(result[1].pages).toEqual(["plugins"]);
  });

  it("uses sidebar name as group for mixed items", () => {
    const sidebars = {
      docs: ["intro", "setup"],
    };

    const result = convertDocusaurusSidebars(sidebars);
    expect(result).toHaveLength(1);
    expect(result[0].group).toBe("Docs");
    expect(result[0].pages).toEqual(["intro", "setup"]);
  });

  it("returns empty array for empty sidebars", () => {
    const result = convertDocusaurusSidebars({});
    expect(result).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// convertDocusaurusConfig
// ---------------------------------------------------------------------------

describe("convertDocusaurusConfig", () => {
  it("maps title and favicon", () => {
    const result = convertDocusaurusConfig({
      title: "My Docs",
      favicon: "img/favicon.ico",
    });

    expect(result.name).toBe("My Docs");
    expect(result.favicon).toBe("img/favicon.ico");
  });

  it("prefers navbar title over site title for name", () => {
    const result = convertDocusaurusConfig({
      title: "Site Title",
      themeConfig: {
        navbar: { title: "Navbar Title" },
      },
    });

    expect(result.name).toBe("Navbar Title");
  });

  it("maps logo from navbar config", () => {
    const result = convertDocusaurusConfig({
      themeConfig: {
        navbar: {
          logo: { src: "img/logo.svg" },
        },
      },
    });

    expect(result.logo).toBe("img/logo.svg");
  });

  it("includes navigation from sidebars", () => {
    const sidebars = {
      docs: ["intro", "setup"],
    };

    const result = convertDocusaurusConfig({}, sidebars);
    expect(result.navigation).toHaveLength(1);
    expect(result.navigation[0].group).toBe("Docs");
    expect(result.navigation[0].pages).toEqual(["intro", "setup"]);
  });

  it("returns empty object for empty config", () => {
    const result = convertDocusaurusConfig({});
    expect(result.name).toBeUndefined();
    expect(result.logo).toBeUndefined();
    expect(result.navigation).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// convertDocusaurusContent
// ---------------------------------------------------------------------------

describe("convertDocusaurusContent", () => {
  it("converts :::note admonition to Callout", () => {
    const input = ":::note\nThis is a note.\n:::\n";
    const { converted, hasJsx } = convertDocusaurusContent(input);
    expect(converted).toContain('<Callout type="info">');
    expect(converted).toContain("This is a note.");
    expect(converted).toContain("</Callout>");
    expect(hasJsx).toBe(true);
  });

  it("converts :::tip admonition to Callout", () => {
    const input = ":::tip\nHelpful hint.\n:::\n";
    const { converted } = convertDocusaurusContent(input);
    expect(converted).toContain('<Callout type="tip">');
    expect(converted).toContain("Helpful hint.");
  });

  it("converts :::warning and :::caution to warning Callout", () => {
    const { converted: warn } = convertDocusaurusContent(
      ":::warning\nBe careful.\n:::\n",
    );
    expect(warn).toContain('<Callout type="warning">');

    const { converted: caution } = convertDocusaurusContent(
      ":::caution\nBe careful.\n:::\n",
    );
    expect(caution).toContain('<Callout type="warning">');
  });

  it("converts :::danger to error Callout", () => {
    const { converted } = convertDocusaurusContent(
      ":::danger\nDangerous operation.\n:::\n",
    );
    expect(converted).toContain('<Callout type="error">');
    expect(converted).toContain("Dangerous operation.");
  });

  it("converts :::info to info Callout", () => {
    const { converted } = convertDocusaurusContent(
      ":::info\nFYI content.\n:::\n",
    );
    expect(converted).toContain('<Callout type="info">');
  });

  it("preserves admonition title", () => {
    const input = ":::note My Custom Title\nContent here.\n:::\n";
    const { converted } = convertDocusaurusContent(input);
    expect(converted).toContain('title="My Custom Title"');
    expect(converted).toContain("Content here.");
  });

  it("converts Tabs/TabItem to Tome Tabs/Tab", () => {
    const input = [
      '<Tabs>',
      '  <TabItem value="js" label="JavaScript">',
      "  ```js",
      "  console.log('hi');",
      "  ```",
      "  </TabItem>",
      '  <TabItem value="py" label="Python">',
      "  ```py",
      "  print('hi')",
      "  ```",
      "  </TabItem>",
      "</Tabs>",
    ].join("\n");

    const { converted, hasJsx } = convertDocusaurusContent(input);
    expect(converted).toContain('<Tabs items={["JavaScript","Python"]}>');
    expect(converted).toContain("<Tab>");
    expect(converted).not.toContain("TabItem");
    expect(hasJsx).toBe(true);
  });

  it("strips @theme/ and @site/ imports", () => {
    const input = [
      "import Tabs from '@theme/Tabs';",
      "import TabItem from '@theme/TabItem';",
      "import MyComponent from '@site/src/components/MyComponent';",
      "",
      "# Hello",
    ].join("\n");

    const { converted } = convertDocusaurusContent(input);
    expect(converted).not.toContain("import Tabs");
    expect(converted).not.toContain("import TabItem");
    expect(converted).not.toContain("import MyComponent");
    expect(converted).toContain("# Hello");
  });

  it("strips @docusaurus/ imports", () => {
    const input =
      "import Link from '@docusaurus/Link';\n\n# Hello\n";
    const { converted } = convertDocusaurusContent(input);
    expect(converted).not.toContain("import Link");
    expect(converted).toContain("# Hello");
  });

  it("converts code block title attribute", () => {
    const input = '```js title="example.js"\nconst x = 1;\n```';
    const { converted } = convertDocusaurusContent(input);
    expect(converted).toContain("```js example.js");
    expect(converted).not.toContain('title="example.js"');
  });

  it("strips @site/ path references in content", () => {
    const input = "![diagram](@site/static/img/diagram.png)";
    const { converted } = convertDocusaurusContent(input);
    expect(converted).toBe("![diagram](static/img/diagram.png)");
    expect(converted).not.toContain("@site/");
  });

  it("sets hasJsx for JSX components", () => {
    const { hasJsx: plain } = convertDocusaurusContent(
      "Just plain text, no components.",
    );
    expect(plain).toBe(false);

    const { hasJsx: withJsx } = convertDocusaurusContent(
      "<CustomComponent>test</CustomComponent>",
    );
    expect(withJsx).toBe(true);
  });

  it("cleans up multiple blank lines from stripped imports", () => {
    const input = [
      "import Tabs from '@theme/Tabs';",
      "import TabItem from '@theme/TabItem';",
      "",
      "",
      "",
      "# Content",
    ].join("\n");

    const { converted } = convertDocusaurusContent(input);
    // Should not have more than 2 consecutive newlines
    expect(converted).not.toMatch(/\n{3,}/);
  });
});

// ---------------------------------------------------------------------------
// migrateFromDocusaurus (integration)
// ---------------------------------------------------------------------------

describe("migrateFromDocusaurus", () => {
  function createDocusaurusProject(): string {
    const dir = mkdtempSync(join(tmpdir(), "docusaurus-test-"));

    writeFileSync(
      join(dir, "docusaurus.config.js"),
      `
        export default {
          title: 'Test Docs',
          favicon: 'img/favicon.ico',
          themeConfig: {
            navbar: {
              title: 'Test Site',
              logo: { src: 'img/logo.svg' },
            },
          },
        };
      `,
    );

    writeFileSync(
      join(dir, "sidebars.js"),
      `
        export default {
          docs: [
            {
              "type": "category",
              "label": "Getting Started",
              "items": ["intro"]
            }
          ]
        };
      `,
    );

    const docsDir = join(dir, "docs");
    mkdirSync(docsDir);
    writeFileSync(
      join(docsDir, "intro.md"),
      "---\ntitle: Introduction\nsidebar_label: Intro\nsidebar_position: 1\n---\n\n:::note\nWelcome to our docs.\n:::\n",
    );

    return dir;
  }

  it("dry run returns correct counts without writing files", async () => {
    const src = createDocusaurusProject();
    const out = mkdtempSync(join(tmpdir(), "tome-out-"));

    const result = await migrateFromDocusaurus(src, out, { dryRun: true });

    expect(result.pages).toBe(1);
    expect(result.convertedFiles).toHaveLength(1);
    // Dry run should not create the output config or pages directory
    expect(existsSync(join(out, "tome.config.js"))).toBe(false);
    expect(existsSync(join(out, "pages"))).toBe(false);
  });

  it("full run creates pages/ directory and tome.config.js", async () => {
    const src = createDocusaurusProject();
    const out = mkdtempSync(join(tmpdir(), "tome-out-"));

    const result = await migrateFromDocusaurus(src, out);

    expect(result.pages).toBe(1);
    expect(existsSync(join(out, "tome.config.js"))).toBe(true);

    // Check the generated config
    const configContent = readFileSync(join(out, "tome.config.js"), "utf-8");
    expect(configContent).toContain('"name": "Test Site"');
    expect(configContent).toContain('"logo": "img/logo.svg"');
    expect(configContent).toContain('"favicon": "img/favicon.ico"');
  });

  it("converts admonitions in content files", async () => {
    const src = createDocusaurusProject();
    const out = mkdtempSync(join(tmpdir(), "tome-out-"));

    await migrateFromDocusaurus(src, out);

    // The file contains JSX (Callout), so should be .mdx
    const pagePath = join(out, "pages", "intro.mdx");
    expect(existsSync(pagePath)).toBe(true);

    const pageContent = readFileSync(pagePath, "utf-8");
    expect(pageContent).toContain('<Callout type="info">');
    expect(pageContent).toContain("Welcome to our docs.");
    expect(pageContent).toContain("</Callout>");
  });

  it("strips Docusaurus-specific frontmatter fields", async () => {
    const src = createDocusaurusProject();
    const out = mkdtempSync(join(tmpdir(), "tome-out-"));

    await migrateFromDocusaurus(src, out);

    const pagePath = join(out, "pages", "intro.mdx");
    const pageContent = readFileSync(pagePath, "utf-8");
    expect(pageContent).not.toContain("sidebar_label");
    expect(pageContent).not.toContain("sidebar_position");
    expect(pageContent).toContain("title: Introduction");
  });

  it("copies static assets to public/static/", async () => {
    const src = createDocusaurusProject();
    const staticDir = join(src, "static", "img");
    mkdirSync(staticDir, { recursive: true });
    writeFileSync(join(staticDir, "logo.svg"), "<svg></svg>");

    const out = mkdtempSync(join(tmpdir(), "tome-out-"));

    await migrateFromDocusaurus(src, out);

    expect(existsSync(join(out, "public", "static", "img", "logo.svg"))).toBe(
      true,
    );
  });

  it("handles project without sidebars.js", async () => {
    const dir = mkdtempSync(join(tmpdir(), "docusaurus-nosidebar-"));
    writeFileSync(
      join(dir, "docusaurus.config.js"),
      `export default { title: 'No Sidebar' };`,
    );
    const docsDir = join(dir, "docs");
    mkdirSync(docsDir);
    writeFileSync(join(docsDir, "intro.md"), "---\ntitle: Intro\n---\n# Hello\n");

    const out = mkdtempSync(join(tmpdir(), "tome-out-"));
    const result = await migrateFromDocusaurus(dir, out);

    expect(result.pages).toBe(1);
    expect(existsSync(join(out, "tome.config.js"))).toBe(true);
  });

  it("handles project without docusaurus.config.js", async () => {
    const dir = mkdtempSync(join(tmpdir(), "docusaurus-noconfig-"));
    const docsDir = join(dir, "docs");
    mkdirSync(docsDir);
    writeFileSync(join(docsDir, "intro.md"), "# Hello\n");

    const out = mkdtempSync(join(tmpdir(), "tome-out-"));
    const result = await migrateFromDocusaurus(dir, out);

    expect(result.pages).toBe(1);
    expect(result.warnings).toContain(
      "No docusaurus.config.js or docusaurus.config.ts found",
    );
  });

  it("warns on BrowserWindow and DocCardList components", async () => {
    const dir = mkdtempSync(join(tmpdir(), "docusaurus-warn-"));
    writeFileSync(
      join(dir, "docusaurus.config.js"),
      `export default { title: 'Warn Test' };`,
    );
    const docsDir = join(dir, "docs");
    mkdirSync(docsDir);
    writeFileSync(
      join(docsDir, "page.mdx"),
      "---\ntitle: Page\n---\n<BrowserWindow>\nHello\n</BrowserWindow>\n<DocCardList />\n",
    );

    const out = mkdtempSync(join(tmpdir(), "tome-out-"));
    const result = await migrateFromDocusaurus(dir, out);

    expect(result.warnings.some((w) => w.includes("BrowserWindow"))).toBe(true);
    expect(result.warnings.some((w) => w.includes("DocCardList"))).toBe(true);
  });

  it("handles subdirectories in docs/", async () => {
    const dir = mkdtempSync(join(tmpdir(), "docusaurus-subdir-"));
    writeFileSync(
      join(dir, "docusaurus.config.js"),
      `export default { title: 'Subdir Test' };`,
    );
    const docsDir = join(dir, "docs");
    const subDir = join(docsDir, "guides");
    mkdirSync(subDir, { recursive: true });
    writeFileSync(join(docsDir, "intro.md"), "# Intro\n");
    writeFileSync(join(subDir, "getting-started.md"), "# Getting Started\n");

    const out = mkdtempSync(join(tmpdir(), "tome-out-"));
    const result = await migrateFromDocusaurus(dir, out);

    expect(result.pages).toBe(2);
    expect(
      result.convertedFiles.some((f) => f.includes("guides")),
    ).toBe(true);
    expect(
      existsSync(join(out, "pages", "guides", "getting-started.md")),
    ).toBe(true);
  });
});
