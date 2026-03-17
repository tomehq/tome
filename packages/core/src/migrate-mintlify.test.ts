import { describe, it, expect } from "vitest";
import { mkdtempSync, writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
  parseMintConfig,
  convertMintNavigation,
  convertMintConfig,
  convertMintlifyContent,
  migrateFromMintlify,
} from "./migrate-mintlify.js";

// ---------------------------------------------------------------------------
// parseMintConfig
// ---------------------------------------------------------------------------

describe("parseMintConfig", () => {
  it("parses full mint.json with all fields", () => {
    const json = JSON.stringify({
      name: "Acme Docs",
      logo: { light: "/logo-light.svg", dark: "/logo-dark.svg" },
      favicon: "/favicon.png",
      colors: { primary: "#0D9373" },
      navigation: [{ group: "Guide", pages: ["intro", "quickstart"] }],
      topbarLinks: [{ name: "GitHub", url: "https://github.com" }],
      redirects: [{ source: "/old", destination: "/new" }],
    });

    const config = parseMintConfig(json);
    expect(config.name).toBe("Acme Docs");
    expect(config.colors?.primary).toBe("#0D9373");
    expect(config.navigation).toHaveLength(1);
    expect(config.topbarLinks).toHaveLength(1);
    expect(config.redirects).toHaveLength(1);
  });

  it("returns defaults for minimal/empty JSON", () => {
    const config = parseMintConfig("{}");
    expect(config.name).toBeUndefined();
    expect(config.logo).toBeUndefined();
    expect(config.navigation).toBeUndefined();
  });

  it("handles logo as string vs object", () => {
    const asString = parseMintConfig(JSON.stringify({ logo: "/logo.svg" }));
    expect(asString.logo).toBe("/logo.svg");

    const asObject = parseMintConfig(
      JSON.stringify({ logo: { light: "/light.svg", dark: "/dark.svg" } }),
    );
    expect(typeof asObject.logo).toBe("object");
    expect((asObject.logo as { light: string }).light).toBe("/light.svg");
  });
});

// ---------------------------------------------------------------------------
// convertMintNavigation
// ---------------------------------------------------------------------------

describe("convertMintNavigation", () => {
  it("converts simple navigation groups", () => {
    const result = convertMintNavigation([
      { group: "Getting Started", pages: ["intro", "setup"] },
      { group: "API", pages: ["auth", "endpoints"] },
    ]);

    expect(result).toHaveLength(2);
    expect(result[0].group).toBe("Getting Started");
    expect(result[0].pages).toEqual(["intro", "setup"]);
    expect(result[1].group).toBe("API");
  });

  it("strips leading slashes from page paths", () => {
    const result = convertMintNavigation([
      { group: "Docs", pages: ["/intro", "//double", "no-slash"] },
    ]);

    expect(result[0].pages).toEqual(["intro", "double", "no-slash"]);
  });

  it("returns empty array for undefined/empty input", () => {
    expect(convertMintNavigation([])).toEqual([]);
    expect(convertMintNavigation(undefined as any)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// convertMintConfig
// ---------------------------------------------------------------------------

describe("convertMintConfig", () => {
  it("maps name, logo, favicon correctly", () => {
    const result = convertMintConfig({
      name: "My Docs",
      logo: "/logo.png",
      favicon: "/fav.ico",
    });

    expect(result.name).toBe("My Docs");
    expect(result.logo).toBe("/logo.png");
    expect(result.favicon).toBe("/fav.ico");
  });

  it("maps colors.primary to theme.accent", () => {
    const result = convertMintConfig({
      colors: { primary: "#FF5733" },
    });

    expect(result.theme).toEqual({ accent: "#FF5733" });
  });

  it("maps topbarLinks to topNav format", () => {
    const result = convertMintConfig({
      topbarLinks: [
        { name: "GitHub", url: "https://github.com" },
        { name: "Docs", url: "/docs" },
      ],
    });

    expect(result.topNav).toEqual([
      { label: "GitHub", href: "https://github.com" },
      { label: "Docs", href: "/docs" },
    ]);
  });

  it("maps redirects from source/destination to from/to format", () => {
    const result = convertMintConfig({
      redirects: [
        { source: "/old-page", destination: "/new-page" },
        { source: "/v1/api", destination: "/v2/api" },
      ],
    });

    expect(result.redirects).toEqual([
      { from: "/old-page", to: "/new-page" },
      { from: "/v1/api", to: "/v2/api" },
    ]);
  });
});

// ---------------------------------------------------------------------------
// convertMintlifyContent
// ---------------------------------------------------------------------------

describe("convertMintlifyContent", () => {
  it("converts <Note>text</Note> to <Callout type=\"info\">text</Callout>", () => {
    const { converted } = convertMintlifyContent("<Note>Important info</Note>");
    expect(converted).toBe('<Callout type="info">Important info</Callout>');
  });

  it("converts Warning, Info, Tip, Check components", () => {
    const { converted: warning } = convertMintlifyContent(
      "<Warning>Danger ahead</Warning>",
    );
    expect(warning).toBe('<Callout type="warning">Danger ahead</Callout>');

    const { converted: info } = convertMintlifyContent(
      "<Info>FYI</Info>",
    );
    expect(info).toBe('<Callout type="info">FYI</Callout>');

    const { converted: tip } = convertMintlifyContent("<Tip>Pro tip</Tip>");
    expect(tip).toBe('<Callout type="tip">Pro tip</Callout>');

    const { converted: check } = convertMintlifyContent(
      "<Check>All good</Check>",
    );
    expect(check).toBe('<Callout type="tip">All good</Callout>');
  });

  it("converts CodeGroup to Tabs with code block labels", () => {
    const input = [
      "<CodeGroup>",
      "```js JavaScript",
      "console.log('hi');",
      "```",
      "```py Python",
      "print('hi')",
      "```",
      "</CodeGroup>",
    ].join("\n");

    const { converted } = convertMintlifyContent(input);
    expect(converted).toContain('<Tabs items={["JavaScript","Python"]}>');
    expect(converted).toContain("<Tab>");
    expect(converted).toContain("```js JavaScript");
    expect(converted).toContain("```py Python");
  });

  it("strips AccordionGroup wrapper, keeps Accordion children", () => {
    const input =
      "<AccordionGroup>\n<Accordion title=\"FAQ\">Answer here</Accordion>\n</AccordionGroup>";
    const { converted } = convertMintlifyContent(input);

    expect(converted).not.toContain("AccordionGroup");
    expect(converted).toContain('<Accordion title="FAQ">Answer here</Accordion>');
  });

  it("strips Frame wrapper", () => {
    const input = '<Frame caption="A screenshot">\n![alt](/img.png)\n</Frame>';
    const { converted } = convertMintlifyContent(input);

    expect(converted).not.toContain("Frame");
    expect(converted).toContain("![alt](/img.png)");
  });

  it("always sets hasJsx=true", () => {
    const { hasJsx } = convertMintlifyContent("Just plain text, no components.");
    expect(hasJsx).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// migrateFromMintlify (integration)
// ---------------------------------------------------------------------------

describe("migrateFromMintlify", () => {
  function createMintProject(): string {
    const dir = mkdtempSync(join(tmpdir(), "mint-test-"));
    writeFileSync(
      join(dir, "mint.json"),
      JSON.stringify({
        name: "Test Docs",
        colors: { primary: "#1E90FF" },
        navigation: [{ group: "Guide", pages: ["intro"] }],
        redirects: [{ source: "/old", destination: "/new" }],
      }),
    );
    writeFileSync(
      join(dir, "intro.mdx"),
      "---\ntitle: Introduction\n---\n<Note>Welcome</Note>\n",
    );
    return dir;
  }

  it("dry run returns correct counts without writing files", async () => {
    const src = createMintProject();
    const out = mkdtempSync(join(tmpdir(), "tome-out-"));

    const result = await migrateFromMintlify(src, out, { dryRun: true });

    expect(result.pages).toBe(1);
    expect(result.redirects).toBe(1);
    expect(result.convertedFiles).toContain("intro.mdx");
    // Dry run should not create the output config or pages directory
    expect(existsSync(join(out, "tome.config.js"))).toBe(false);
    expect(existsSync(join(out, "pages"))).toBe(false);
  });

  it("reads docs.json when present (Mintlify new format)", async () => {
    const dir = mkdtempSync(join(tmpdir(), "mint-docs-json-"));
    writeFileSync(
      join(dir, "docs.json"),
      JSON.stringify({
        name: "Docs JSON Project",
        colors: { primary: "#FF6600" },
        navigation: [{ group: "Guide", pages: ["intro"] }],
      }),
    );
    writeFileSync(
      join(dir, "intro.mdx"),
      "---\ntitle: Introduction\n---\n<Note>Hello</Note>\n",
    );
    const out = mkdtempSync(join(tmpdir(), "tome-out-"));

    const result = await migrateFromMintlify(dir, out);

    expect(result.pages).toBe(1);
    expect(existsSync(join(out, "tome.config.js"))).toBe(true);
    const configContent = readFileSync(join(out, "tome.config.js"), "utf-8");
    expect(configContent).toContain('"name": "Docs JSON Project"');
    expect(configContent).toContain('"accent": "#FF6600"');
  });

  it("prefers docs.json over mint.json when both exist", async () => {
    const dir = mkdtempSync(join(tmpdir(), "mint-both-"));
    writeFileSync(
      join(dir, "docs.json"),
      JSON.stringify({
        name: "From docs.json",
        navigation: [{ group: "Guide", pages: ["intro"] }],
      }),
    );
    writeFileSync(
      join(dir, "mint.json"),
      JSON.stringify({
        name: "From mint.json",
        navigation: [{ group: "Guide", pages: ["intro"] }],
      }),
    );
    writeFileSync(
      join(dir, "intro.mdx"),
      "---\ntitle: Introduction\n---\nHello\n",
    );
    const out = mkdtempSync(join(tmpdir(), "tome-out-"));

    const result = await migrateFromMintlify(dir, out);

    expect(result.pages).toBe(1);
    const configContent = readFileSync(join(out, "tome.config.js"), "utf-8");
    expect(configContent).toContain('"name": "From docs.json"');
    expect(configContent).not.toContain('"name": "From mint.json"');
  });

  it("full run creates pages/ directory and tome.config.js", async () => {
    const src = createMintProject();
    const out = mkdtempSync(join(tmpdir(), "tome-out-"));

    const result = await migrateFromMintlify(src, out);

    expect(result.pages).toBe(1);
    expect(existsSync(join(out, "tome.config.js"))).toBe(true);
    expect(existsSync(join(out, "pages", "intro.mdx"))).toBe(true);

    const configContent = readFileSync(join(out, "tome.config.js"), "utf-8");
    expect(configContent).toContain('"name": "Test Docs"');
    expect(configContent).toContain('"accent": "#1E90FF"');

    const pageContent = readFileSync(join(out, "pages", "intro.mdx"), "utf-8");
    expect(pageContent).toContain('<Callout type="info">Welcome</Callout>');
  });
});
