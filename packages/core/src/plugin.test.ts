import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import tomePlugin from "./vite-plugin.js";
import type { Plugin } from "vite";

// ── HELPERS ──────────────────────────────────────────────

let tmpDir: string;
let plugins: Plugin[];
let corePlugin: Plugin;

function setupPluginEnv() {
  tmpDir = mkdtempSync(join(tmpdir(), "tome-plugin-test-"));
  mkdirSync(join(tmpDir, "pages"), { recursive: true });

  // Write config
  writeFileSync(
    join(tmpDir, "tome.config.js"),
    `export default { name: "Test Site", navigation: [{ group: "Guide", pages: ["intro", "getting-started"] }] };`
  );

  // Write test pages
  writeFileSync(
    join(tmpDir, "pages", "intro.md"),
    `---\ntitle: Introduction\ndescription: The intro page\n---\n\n# Introduction\n\nHello world.`
  );
  writeFileSync(
    join(tmpDir, "pages", "getting-started.md"),
    `---\ntitle: Getting Started\n---\n\n# Getting Started\n\nLet's go.`
  );
}

// ── PLUGIN CREATION ──────────────────────────────────────

describe("plugin creation", () => {
  beforeEach(() => {
    setupPluginEnv();
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns an array of Plugin objects", () => {
    plugins = tomePlugin({ root: tmpDir });
    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBeGreaterThanOrEqual(1);
    for (const p of plugins) {
      expect(p).toHaveProperty("name");
    }
  });

  it('array includes a plugin named "vite-plugin-tome"', () => {
    plugins = tomePlugin({ root: tmpDir });
    const names = plugins.map((p) => p.name);
    expect(names).toContain("vite-plugin-tome");
  });
});

// ── resolveId ────────────────────────────────────────────

describe("resolveId", () => {
  beforeEach(async () => {
    setupPluginEnv();
    plugins = tomePlugin({ root: tmpDir });
    corePlugin = plugins.find((p) => p.name === "vite-plugin-tome")!;
    await (corePlugin.configResolved as Function)({} as any);
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('resolves "virtual:tome/config" to "\\0virtual:tome/config"', () => {
    const resolved = (corePlugin.resolveId as Function).call(
      null,
      "virtual:tome/config"
    );
    expect(resolved).toBe("\0virtual:tome/config");
  });

  it('resolves "virtual:tome/routes" to "\\0virtual:tome/routes"', () => {
    const resolved = (corePlugin.resolveId as Function).call(
      null,
      "virtual:tome/routes"
    );
    expect(resolved).toBe("\0virtual:tome/routes");
  });

  it('resolves "virtual:tome/page/intro" to "\\0virtual:tome/page/intro"', () => {
    const resolved = (corePlugin.resolveId as Function).call(
      null,
      "virtual:tome/page/intro"
    );
    expect(resolved).toBe("\0virtual:tome/page/intro");
  });

  it("returns null for unrelated module IDs", () => {
    const resolved = (corePlugin.resolveId as Function).call(
      null,
      "some-other-module"
    );
    expect(resolved).toBeNull();
  });
});

// ── load() — config virtual module ──────────────────────

describe("load — config virtual module", () => {
  beforeEach(async () => {
    setupPluginEnv();
    plugins = tomePlugin({ root: tmpDir });
    corePlugin = plugins.find((p) => p.name === "vite-plugin-tome")!;
    await (corePlugin.configResolved as Function)({} as any);
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('config module contains "export default" with JSON', async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/config"
    );
    expect(result).toContain("export default");
    // The exported value should be valid JSON embedded in the module
    const jsonStr = result.replace("export default ", "").replace(/;$/, "");
    expect(() => JSON.parse(jsonStr)).not.toThrow();
  });

  it('config module includes site name "Test Site"', async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/config"
    );
    expect(result).toContain("Test Site");
  });
});

// ── load() — routes virtual module ──────────────────────

describe("load — routes virtual module", () => {
  beforeEach(async () => {
    setupPluginEnv();
    plugins = tomePlugin({ root: tmpDir });
    corePlugin = plugins.find((p) => p.name === "vite-plugin-tome")!;
    await (corePlugin.configResolved as Function)({} as any);
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("routes module exports routes array", async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/routes"
    );
    expect(result).toContain("export const routes");
  });

  it("routes module exports navigation array", async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/routes"
    );
    expect(result).toContain("export const navigation");
  });

  it("routes contain the intro and getting-started pages", async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/routes"
    );
    expect(result).toContain('"intro"');
    expect(result).toContain('"getting-started"');
  });
});

// ── load() — page virtual modules ───────────────────────

describe("load — page virtual modules", () => {
  beforeEach(async () => {
    setupPluginEnv();
    plugins = tomePlugin({ root: tmpDir });
    corePlugin = plugins.find((p) => p.name === "vite-plugin-tome")!;
    await (corePlugin.configResolved as Function)({} as any);
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('loading "\\0virtual:tome/page/intro" returns processed page content', async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/page/intro"
    );
    expect(result).toBeDefined();
    expect(result).toContain("export default");
  });

  it("page content includes HTML", async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/page/intro"
    );
    // The processed markdown should produce HTML with heading tags
    expect(result).toContain("<h1");
    expect(result).toContain("Introduction");
  });

  it('returns "export default null" for unknown page ID', async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/page/nonexistent"
    );
    expect(result).toBe("export default null;");
  });

  it("returns null for non-virtual IDs", async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "./some-real-file.ts"
    );
    expect(result).toBeNull();
  });
});

// ── load() — MDX pages ──────────────────────────────────

describe("load — MDX pages", () => {
  beforeEach(async () => {
    setupPluginEnv();

    // Add an MDX page
    writeFileSync(
      join(tmpDir, "pages", "components.mdx"),
      `---\ntitle: Components\ndescription: UI components\n---\n\n# Components\n\n## Button\n\nSome MDX content.`
    );

    // Update config navigation to include the mdx page
    writeFileSync(
      join(tmpDir, "tome.config.js"),
      `export default { name: "Test Site", navigation: [{ group: "Guide", pages: ["intro", "getting-started", "components"] }] };`
    );

    plugins = tomePlugin({ root: tmpDir });
    corePlugin = plugins.find((p) => p.name === "vite-plugin-tome")!;
    await (corePlugin.configResolved as Function)({} as any);
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("for .mdx files, emits a re-export from the absolute path", async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/page/components"
    );
    expect(result).toContain("export { default } from");
    expect(result).toContain("components.mdx");
  });

  it("includes meta with frontmatter", async () => {
    const result = await (corePlugin.load as Function).call(
      null,
      "\0virtual:tome/page/components"
    );
    expect(result).toContain("export const meta");
    expect(result).toContain('"title":"Components"');
    expect(result).toContain('"description":"UI components"');
  });
});

// ── generateBundle() — MCP manifest ─────────────────────

describe("generateBundle — MCP manifest", () => {
  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("emits mcp.json file", async () => {
    setupPluginEnv();
    plugins = tomePlugin({ root: tmpDir });
    corePlugin = plugins.find((p) => p.name === "vite-plugin-tome")!;
    await (corePlugin.configResolved as Function)({} as any);

    const emitted: any[] = [];
    await (corePlugin.generateBundle as Function).call({
      emitFile: (f: any) => emitted.push(f),
    });

    expect(emitted).toHaveLength(1);
    expect(emitted[0].type).toBe("asset");
    expect(emitted[0].fileName).toBe("mcp.json");
  });

  it("manifest contains page URLs and titles", async () => {
    setupPluginEnv();
    plugins = tomePlugin({ root: tmpDir });
    corePlugin = plugins.find((p) => p.name === "vite-plugin-tome")!;
    await (corePlugin.configResolved as Function)({} as any);

    const emitted: any[] = [];
    await (corePlugin.generateBundle as Function).call({
      emitFile: (f: any) => emitted.push(f),
    });

    const manifest = JSON.parse(emitted[0].source);
    expect(manifest.name).toBe("Test Site");
    expect(manifest.pages).toBeInstanceOf(Array);
    expect(manifest.pages.length).toBeGreaterThanOrEqual(2);

    const urls = manifest.pages.map((p: any) => p.url);
    expect(urls).toContain("/intro");
    expect(urls).toContain("/getting-started");

    const titles = manifest.pages.map((p: any) => p.title);
    expect(titles).toContain("Introduction");
    expect(titles).toContain("Getting Started");
  });

  it("when mcp.enabled is false, does not emit mcp.json", async () => {
    setupPluginEnv();

    // Overwrite config to disable MCP
    writeFileSync(
      join(tmpDir, "tome.config.js"),
      `export default { name: "Test", navigation: [], mcp: { enabled: false } };`
    );

    plugins = tomePlugin({ root: tmpDir });
    corePlugin = plugins.find((p) => p.name === "vite-plugin-tome")!;
    await (corePlugin.configResolved as Function)({} as any);

    const emitted: any[] = [];
    await (corePlugin.generateBundle as Function).call({
      emitFile: (f: any) => emitted.push(f),
    });

    expect(emitted).toHaveLength(0);
  });
});
