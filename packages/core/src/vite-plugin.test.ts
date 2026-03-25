import { describe, it, expect, afterAll, vi } from "vitest";
import { resolve } from "path";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import tomePlugin from "./vite-plugin.js";

// ── OpenAPI JSON spec fixture ────────────────────────────
const OPENAPI_JSON = JSON.stringify({
  openapi: "3.0.0",
  info: { title: "Test API", version: "1.0.0" },
  paths: {
    "/users": {
      get: {
        summary: "List users",
        operationId: "listUsers",
        tags: ["Users"],
        responses: { "200": { description: "OK" } },
      },
    },
  },
});

// ── Test fixture helpers ─────────────────────────────────
// Each test gets a unique temp dir to avoid ESM module cache collisions
// (Node caches dynamic import() by URL, so re-using the same path
// for tome.config.js returns stale config from a previous test).
const TMP_BASE = resolve(__dirname, "../.test-tmp-vite-plugin");
let testCounter = 0;

function getTmpRoot(): string {
  return resolve(TMP_BASE, `run-${testCounter++}`);
}

function writeFixture(tmpRoot: string, files: Record<string, string>) {
  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  mkdirSync(resolve(tmpRoot, "pages"), { recursive: true });

  if (!files["tome.config.js"]) {
    files["tome.config.js"] = `export default { name: "Test" };`;
  }

  for (const [path, content] of Object.entries(files)) {
    const full = resolve(tmpRoot, path);
    mkdirSync(resolve(full, ".."), { recursive: true });
    writeFileSync(full, content, "utf-8");
  }
}

/**
 * Create and initialize a plugin instance in a unique temp directory.
 */
async function createPlugin(files: Record<string, string>, configOverride?: string) {
  const tmpRoot = getTmpRoot();
  if (configOverride) {
    files["tome.config.js"] = configOverride;
  }
  writeFixture(tmpRoot, files);

  const plugins = tomePlugin({ root: tmpRoot, pagesDir: "pages" });
  const corePlugin = plugins[plugins.length - 1];

  if (typeof corePlugin.configResolved === "function") {
    await (corePlugin.configResolved as Function)({ command: "build" });
  }

  return corePlugin;
}

// ── Cleanup ──────────────────────────────────────────────

afterAll(() => {
  if (existsSync(TMP_BASE)) rmSync(TMP_BASE, { recursive: true, force: true });
});

// ── resolveId ────────────────────────────────────────────

describe("vite-plugin resolveId", () => {
  it("resolves virtual:tome/config", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const resolveId = plugin.resolveId as Function;
    expect(resolveId("virtual:tome/config")).toBe("\0virtual:tome/config");
  });

  it("resolves virtual:tome/routes", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const resolveId = plugin.resolveId as Function;
    expect(resolveId("virtual:tome/routes")).toBe("\0virtual:tome/routes");
  });

  it("resolves virtual:tome/page/ prefix", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const resolveId = plugin.resolveId as Function;
    expect(resolveId("virtual:tome/page/index")).toBe("\0virtual:tome/page/index");
    expect(resolveId("virtual:tome/page/api-reference")).toBe("\0virtual:tome/page/api-reference");
  });

  it("returns null for unknown modules", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const resolveId = plugin.resolveId as Function;
    expect(resolveId("some-other-module")).toBeNull();
  });
});

// ── load: page modules ───────────────────────────────────

describe("vite-plugin load", () => {
  it("loads a regular markdown page", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Welcome\nHello world",
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/page/index");
    expect(result).toContain("Welcome");
    expect(result).toContain("Hello world");
  });

  it("returns synthetic API reference module for api-reference page", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/page/api-reference");

    expect(result).toBeDefined();
    expect(result).toContain("isApiReference");
    expect(result).toContain("apiManifest");
    expect(result).toContain("API Reference");
  });

  it("returns null for api-reference when no api config", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/page/api-reference");
    expect(result == null || result.includes("null")).toBe(true);
  });

  it("serves routes virtual module including api-reference when configured", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/routes");
    expect(result).toContain("api-reference");
    expect(result).toContain("/api");
  });

  it("routes do not include api-reference when no api config", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/routes");
    expect(result).not.toContain("api-reference");
  });

  it("doc-context excludes api-reference route", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\nSome content here.",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/doc-context");
    expect(result).toBeDefined();
    expect(result).not.toContain("__api-reference__");
    expect(result).toContain("Home");
  });

  it("page loader includes api-reference route when api configured", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/page-loader");
    expect(result).toContain("api-reference");
  });

  it("page loader throws on unknown page ID", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/page-loader");
    // The generated loadPageModule function should throw for unknown IDs
    expect(result).toContain('throw new Error("Unknown page: " + id)');
  });

  it("api virtual module returns manifest when configured", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/api");
    expect(result).toContain("Test API");
    expect(result).toContain("Users");
  });

  it("api virtual module returns null when not configured", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/api");
    expect(result).toContain("null");
  });
});

// ── generateBundle: api-reference exclusion ──────────────

describe("vite-plugin generateBundle", () => {
  function makeMockContext() {
    const emittedFiles: Array<{ type: string; fileName: string; source: string }> = [];
    return {
      ctx: {
        emitFile(file: any) {
          emittedFiles.push(file);
          return "ref";
        },
      },
      emittedFiles,
    };
  }

  it("does not crash when api-reference route exists (was ENOENT bug)", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\nWelcome to the docs.",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );

    const { ctx, emittedFiles } = makeMockContext();
    // This used to throw ENOENT: no such file or directory, open '__api-reference__'
    await (plugin.generateBundle as Function).call(ctx, {}, {});

    const mcpFile = emittedFiles.find((f) => f.fileName === "mcp.json");
    expect(mcpFile).toBeDefined();
  });

  it("excludes api-reference from MCP manifest pages", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\nContent.",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );

    const { ctx, emittedFiles } = makeMockContext();
    await (plugin.generateBundle as Function).call(ctx, {}, {});

    const mcpFile = emittedFiles.find((f) => f.fileName === "mcp.json");
    expect(mcpFile).toBeDefined();
    const mcpData = JSON.parse(mcpFile!.source);
    const apiRefPage = mcpData.pages.find((p: any) => p.url === "/api");
    expect(apiRefPage).toBeUndefined();
  });

  it("excludes api-reference from per-page HTML shells", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
        "pages/quickstart.md": "---\ntitle: Quick Start\n---\n# Quick Start\nGet started fast.",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );

    const { ctx, emittedFiles } = makeMockContext();
    await (plugin.generateBundle as Function).call(ctx, {}, {});

    const htmlFiles = emittedFiles.filter((f) => f.fileName.endsWith("index.html"));
    const apiHtml = htmlFiles.find((f) => f.fileName === "api/index.html");
    expect(apiHtml).toBeUndefined();

    const qsHtml = htmlFiles.find((f) => f.fileName === "quickstart/index.html");
    expect(qsHtml).toBeDefined();
  });

  it("excludes api-reference from llms-full.txt content", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\nHello world content.",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );

    const { ctx, emittedFiles } = makeMockContext();
    await (plugin.generateBundle as Function).call(ctx, {}, {});

    const llmsFull = emittedFiles.find((f) => f.fileName === "llms-full.txt");
    expect(llmsFull).toBeDefined();
    expect(llmsFull!.source).toContain("Home");
  });

  it("includes api-reference in llms.txt link index", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\nContent.",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );

    const { ctx, emittedFiles } = makeMockContext();
    await (plugin.generateBundle as Function).call(ctx, {}, {});

    const llmsTxt = emittedFiles.find((f) => f.fileName === "llms.txt");
    expect(llmsTxt).toBeDefined();
    // API Reference is visible, so it should appear in the page index
    expect(llmsTxt!.source).toContain("API Reference");
  });

  it("handles api-reference in search.json without crashing", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\nContent.",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );

    const { ctx, emittedFiles } = makeMockContext();
    await (plugin.generateBundle as Function).call(ctx, {}, {});

    const searchJson = emittedFiles.find((f) => f.fileName === "search.json");
    expect(searchJson).toBeDefined();
    const searchData = JSON.parse(searchJson!.source);

    // api-reference should be in search but with empty headings (getPage returns null)
    const apiPage = searchData.pages.find((p: any) => p.id === "api-reference");
    if (apiPage) {
      expect(apiPage.headings).toEqual([]);
      expect(apiPage.wordCount).toBe(0);
    }
  });
});

// ── No API config ────────────────────────────────────────

describe("vite-plugin without API config", () => {
  it("does not add api-reference route", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/routes");
    expect(result).not.toContain("api-reference");
  });

  it("generateBundle works without api routes", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\nContent here.",
    });

    const emittedFiles: Array<{ type: string; fileName: string; source: string }> = [];
    const mockContext = {
      emitFile(file: any) {
        emittedFiles.push(file);
        return "ref";
      },
    };

    await (plugin.generateBundle as Function).call(mockContext, {}, {});

    const mcpFile = emittedFiles.find((f) => f.fileName === "mcp.json");
    expect(mcpFile).toBeDefined();
    const mcpData = JSON.parse(mcpFile!.source);
    expect(mcpData.pages.length).toBeGreaterThan(0);
  });
});

// ── getPage guard (tested indirectly via load hook) ──────

describe("vite-plugin getPage api-reference guard", () => {
  it("api-reference page uses synthetic handler, not readFileSync", async () => {
    const plugin = await createPlugin(
      {
        "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
        "openapi.json": OPENAPI_JSON,
      },
      `export default { name: "Test", api: { spec: "./openapi.json" } };`,
    );
    const load = plugin.load as Function;

    // The api-reference page should NOT hit readFileSync — it has its own handler.
    // If getPage guard was missing, this would throw ENOENT.
    const result = await load("\0virtual:tome/page/api-reference");
    expect(result).toContain("isApiReference");
  });

  it("non-existent page returns null", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const load = plugin.load as Function;
    const nullResult = await load("\0virtual:tome/page/nonexistent");
    expect(nullResult).toContain("null");
  });
});

// ── Relative link rewriting ──────────────────────────────

describe("vite-plugin relative link rewriting", () => {
  it("rewrites ./pageId links to bare page IDs in HTML", async () => {
    const plugin = await createPlugin({
      "pages/index.md":
        '---\ntitle: Home\n---\n# Home\n\n[Quick Start](./quickstart)\n[Config](./configuration)\n',
      "pages/quickstart.md": "---\ntitle: Quick Start\n---\n# Quick Start\n",
      "pages/configuration.md": "---\ntitle: Config\n---\n# Config\n",
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/page/index");
    // Should NOT contain ./quickstart (Vite would mangle it)
    expect(result).not.toContain("./quickstart");
    expect(result).not.toContain("./configuration");
    // Should contain bare page IDs as href values
    expect(result).toContain('href=\\"quickstart\\"');
    expect(result).toContain('href=\\"configuration\\"');
  });

  it("preserves heading anchor links (not cross-page)", async () => {
    const plugin = await createPlugin({
      "pages/index.md":
        "---\ntitle: Home\n---\n# Home\n\n## Features\n\nSee [above](#features).\n",
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/page/index");
    // Heading anchor should be preserved as-is
    expect(result).toContain("#features");
  });

  it("preserves external links", async () => {
    const plugin = await createPlugin({
      "pages/index.md":
        '---\ntitle: Home\n---\n# Home\n\n[GitHub](https://github.com)\n',
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/page/index");
    expect(result).toContain("https://github.com");
  });

  it("rewrites relative links in raw markdown field too", async () => {
    const plugin = await createPlugin({
      "pages/index.md":
        '---\ntitle: Home\n---\n# Home\n\n[Link](./quickstart)\n',
      "pages/quickstart.md": "---\ntitle: Quick Start\n---\n# Quick Start\n",
    });
    const load = plugin.load as Function;
    const result = await load("\0virtual:tome/page/index");
    // Raw markdown should also have the link rewritten
    expect(result).not.toContain("](./quickstart)");
    expect(result).toContain("](quickstart)");
  });

  it("prefixes version directory for non-current version pages", async () => {
    const configJs = `export default {
      name: "Test",
      versioning: { current: "v2", versions: ["v2", "v1"] },
      navigation: [],
    };`;
    const plugin = await createPlugin(
      {
        "pages/v2/index.md": '---\ntitle: Home v2\n---\n# Home\n\n[Quick Start](./quickstart)\n',
        "pages/v2/quickstart.md": "---\ntitle: Quick Start\n---\n# Quick Start\n",
        "pages/v1/index.md": '---\ntitle: Home v1\n---\n# Home\n\n[Quick Start](./quickstart)\n',
        "pages/v1/quickstart.md": "---\ntitle: Quick Start v1\n---\n# Quick Start\n",
      },
      configJs,
    );
    const load = plugin.load as Function;

    // Current version (v2) — bare page IDs, no prefix
    const v2Result = await load("\0virtual:tome/page/index");
    expect(v2Result).toContain('href=\\"quickstart\\"');
    expect(v2Result).not.toContain('href=\\"v2/quickstart\\"');

    // Old version (v1) — should prefix with "v1/"
    const v1Result = await load("\0virtual:tome/page/v1/index");
    expect(v1Result).toContain('href=\\"v1/quickstart\\"');
  });
});

// ── Content sources integration ──────────────────────────

describe("vite-plugin contentSources integration", () => {
  it("merges remote pages into routes when contentSources configured", async () => {
    // We mock fetchRemoteContent via a custom content source that returns inline pages
    const configJs = `
      export default {
        name: "Test",
        contentSources: [{
          name: "test-source",
          async fetchPages() {
            return [{
              id: "remote-guide",
              content: "---\\ntitle: Remote Guide\\ndescription: A remote page\\n---\\n# Remote Guide\\n\\nContent here.",
              format: "md",
            }];
          },
        }],
        navigation: [],
      };
    `;
    const plugin = await createPlugin(
      { "pages/index.md": "---\ntitle: Home\n---\n# Home\n" },
      configJs,
    );
    const load = plugin.load as Function;

    // The routes virtual module should include both local and remote pages
    const routesResult = await load("\0virtual:tome/routes");
    expect(routesResult).toContain('"remote-guide"');
    expect(routesResult).toContain('"Remote Guide"');
    // Local page should still be there
    expect(routesResult).toContain('"index"');
  });

  it("local pages take precedence over remote pages with same ID", async () => {
    const configJs = `
      export default {
        name: "Test",
        contentSources: [{
          name: "test-source",
          async fetchPages() {
            return [{
              id: "index",
              content: "---\\ntitle: Remote Home\\n---\\n# Remote Home",
              format: "md",
            }];
          },
        }],
        navigation: [],
      };
    `;
    const plugin = await createPlugin(
      { "pages/index.md": "---\ntitle: Local Home\n---\n# Local Home\n" },
      configJs,
    );
    const load = plugin.load as Function;

    // Routes should have "Local Home", not "Remote Home"
    const routesResult = await load("\0virtual:tome/routes");
    expect(routesResult).toContain("Local Home");
    expect(routesResult).not.toContain("Remote Home");
  });

  it("remote page content is loadable via virtual module", async () => {
    const configJs = `
      export default {
        name: "Test",
        contentSources: [{
          name: "test-source",
          async fetchPages() {
            return [{
              id: "remote-page",
              content: "---\\ntitle: Remote Page\\n---\\n# Remote Page\\n\\nHello from remote.",
              format: "md",
            }];
          },
        }],
        navigation: [],
      };
    `;
    const plugin = await createPlugin(
      { "pages/index.md": "---\ntitle: Home\n---\n# Home\n" },
      configJs,
    );
    const load = plugin.load as Function;

    const result = await load("\0virtual:tome/page/remote-page");
    expect(result).toContain("Hello from remote");
  });
});

// ── transformIndexHtml ───────────────────────────────────

describe("vite-plugin transformIndexHtml", () => {
  it("injects plugin headTags into HTML", async () => {
    const configJs = `
      export default {
        name: "Test",
        tomePlugins: [{
          name: "test-plugin",
          hooks: {
            headTags() {
              return ['<meta name="custom-tag" content="hello">'];
            },
          },
        }],
        navigation: [],
      };
    `;
    const plugin = await createPlugin(
      { "pages/index.md": "---\ntitle: Home\n---\n# Home\n" },
      configJs,
    );
    const transform = plugin.transformIndexHtml as Function;
    const result = transform("<html><head></head><body></body></html>");
    expect(result).toContain('<meta name="custom-tag" content="hello">');
  });

  it("injects JSON-LD WebSite schema", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const transform = plugin.transformIndexHtml as Function;
    const result = transform("<html><head></head><body></body></html>");
    expect(result).toContain('application/ld+json');
    expect(result).toContain('"@type":"WebSite"');
    expect(result).toContain('"name":"Test"');
  });

  it("injects CSP when sandbox is enabled", async () => {
    const configJs = `
      export default {
        name: "Test",
        sandbox: { enabled: true },
        navigation: [],
      };
    `;
    const plugin = await createPlugin(
      { "pages/index.md": "---\ntitle: Home\n---\n# Home\n" },
      configJs,
    );
    const transform = plugin.transformIndexHtml as Function;
    const result = transform("<html><head></head><body></body></html>");
    expect(result).toContain('Content-Security-Policy');
    expect(result).toContain("default-src 'self'");
  });

  it("does not inject CSP when sandbox is disabled", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });
    const transform = plugin.transformIndexHtml as Function;
    const result = transform("<html><head></head><body></body></html>");
    expect(result).not.toContain('Content-Security-Policy');
  });
});

// ── configureServer redirect middleware ──────────────────

describe("vite-plugin configureServer redirects", () => {
  it("redirects config-level redirects with 301", async () => {
    const configJs = `
      export default {
        name: "Test",
        redirects: [{ from: "/old-page", to: "/new-page" }],
        navigation: [],
      };
    `;
    const plugin = await createPlugin(
      { "pages/index.md": "---\ntitle: Home\n---\n# Home\n" },
      configJs,
    );

    // Extract middleware from configureServer
    const middlewares: Function[] = [];
    const mockServer = {
      middlewares: {
        use: (fn: Function) => middlewares.push(fn),
      },
      watcher: {
        add: () => {},
        on: () => {},
      },
    };
    (plugin.configureServer as Function)(mockServer);

    // Test the redirect middleware
    const writeHead = vi.fn();
    const end = vi.fn();
    const next = vi.fn();
    middlewares[0](
      { url: "/old-page" },
      { writeHead, end },
      next,
    );
    expect(writeHead).toHaveBeenCalledWith(301, { Location: "/new-page" });
    expect(end).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("redirects frontmatter redirect_from with 301", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\nredirect_from:\n  - /legacy-home\n---\n# Home\n",
    });

    const middlewares: Function[] = [];
    const mockServer = {
      middlewares: { use: (fn: Function) => middlewares.push(fn) },
      watcher: { add: () => {}, on: () => {} },
    };
    (plugin.configureServer as Function)(mockServer);

    const writeHead = vi.fn();
    const end = vi.fn();
    const next = vi.fn();
    middlewares[0]({ url: "/legacy-home" }, { writeHead, end }, next);
    expect(writeHead).toHaveBeenCalledWith(301, { Location: "/" });
    expect(end).toHaveBeenCalled();
  });

  it("calls next() for non-matching URLs", async () => {
    const configJs = `
      export default {
        name: "Test",
        redirects: [{ from: "/old", to: "/new" }],
        navigation: [],
      };
    `;
    const plugin = await createPlugin(
      { "pages/index.md": "---\ntitle: Home\n---\n# Home\n" },
      configJs,
    );

    const middlewares: Function[] = [];
    const mockServer = {
      middlewares: { use: (fn: Function) => middlewares.push(fn) },
      watcher: { add: () => {}, on: () => {} },
    };
    (plugin.configureServer as Function)(mockServer);

    const next = vi.fn();
    middlewares[0]({ url: "/not-redirected" }, { writeHead: vi.fn(), end: vi.fn() }, next);
    expect(next).toHaveBeenCalled();
  });
});

// ── generateBundle: redirects file + meta-refresh HTML ───

describe("vite-plugin generateBundle redirects", () => {
  it("emits _redirects file and meta-refresh HTML for config redirects", async () => {
    const configJs = `
      export default {
        name: "Test",
        redirects: [{ from: "/old-page", to: "/new-page" }],
        navigation: [],
      };
    `;
    const plugin = await createPlugin(
      { "pages/index.md": "---\ntitle: Home\n---\n# Home\n" },
      configJs,
    );

    const emitted: Array<{ type: string; fileName: string; source: string }> = [];
    const ctx = {
      emitFile: (file: any) => emitted.push(file),
    };

    const bundle = {};
    await (plugin.generateBundle as Function).call(ctx, {}, bundle);

    const redirectsFile = emitted.find((f) => f.fileName === "_redirects");
    expect(redirectsFile).toBeDefined();
    expect(redirectsFile!.source).toContain("/old-page  /new-page  301");

    const metaRefresh = emitted.find((f) => f.fileName === "old-page.html");
    expect(metaRefresh).toBeDefined();
    expect(metaRefresh!.source).toContain('meta http-equiv="refresh"');
    expect(metaRefresh!.source).toContain('url=/new-page');
  });

  it("does not emit _redirects when no redirects configured", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });

    const emitted: Array<{ type: string; fileName: string; source: string }> = [];
    const ctx = { emitFile: (file: any) => emitted.push(file) };
    await (plugin.generateBundle as Function).call(ctx, {}, {});

    const redirectsFile = emitted.find((f) => f.fileName === "_redirects");
    expect(redirectsFile).toBeUndefined();
  });
});

// ── transformIndexHtml: analytics injection ──────────────────

describe("vite-plugin transformIndexHtml analytics injection", () => {
  it("injects analytics script into HTML when analytics configured", async () => {
    const configJs = `
      export default {
        name: "Test",
        analytics: { provider: "custom", key: "test-key-123" },
        navigation: [],
      };
    `;
    const plugin = await createPlugin(
      { "pages/index.md": "---\ntitle: Home\n---\n# Home\n" },
      configJs,
    );

    const html = "<html><head></head><body>test</body></html>";
    const result = (plugin.transformIndexHtml as Function)(html);

    // The HTML should have the analytics script injected
    expect(result).toContain("test-key-123");
    expect(result).toContain("sendBeacon");
    expect(result).toContain("</head>");
  });

  it("does not inject analytics when not configured", async () => {
    const plugin = await createPlugin({
      "pages/index.md": "---\ntitle: Home\n---\n# Home\n",
    });

    const html = "<html><head></head><body>test</body></html>";
    const result = (plugin.transformIndexHtml as Function)(html);

    // HTML should NOT have analytics beacon
    expect(result).not.toContain("sendBeacon");
  });
});
