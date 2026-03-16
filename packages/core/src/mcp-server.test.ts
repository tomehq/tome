import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import { resolve, join } from "path";
import { tmpdir } from "os";
import { loadManifest, searchPages, getPage, listPages, createMcpServer, type McpManifest, type McpPage } from "./mcp-server.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

// ── FIXTURES ────────────────────────────────────────────

const samplePages: McpPage[] = [
  {
    url: "/",
    title: "Welcome",
    description: "Welcome to Acme Docs",
    headings: ["Getting Started", "Installation"],
    tags: ["home", "intro"],
    content: "# Welcome\n\nThis is the home page for Acme documentation.",
  },
  {
    url: "/quickstart",
    title: "Quickstart",
    description: "Get up and running quickly",
    headings: ["Prerequisites", "Install", "First Steps"],
    tags: ["guide", "setup"],
    content: "# Quickstart\n\nFollow these steps to set up your project.",
  },
  {
    url: "/api/users",
    title: "Users API",
    description: "Manage user accounts via the REST API",
    headings: ["List Users", "Create User", "Delete User"],
    tags: ["api", "users", "rest"],
    content: "# Users API\n\nEndpoints for managing users.",
  },
  {
    url: "/components",
    title: "Components",
    description: "Built-in MDX components for your docs",
    headings: ["Callout", "Tabs", "Cards"],
    tags: ["components", "mdx"],
  },
];

const sampleManifest: McpManifest = {
  name: "Acme Docs",
  version: "1.0.0",
  pages: samplePages,
};

// ── loadManifest ────────────────────────────────────────

describe("loadManifest", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = resolve(tmpdir(), `tome-mcp-test-${Date.now()}`);
    mkdirSync(tmpDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("reads and parses a valid mcp.json", () => {
    const manifestPath = join(tmpDir, "mcp.json");
    writeFileSync(manifestPath, JSON.stringify(sampleManifest));

    const result = loadManifest(manifestPath);
    expect(result).not.toBeNull();
    expect(result!.name).toBe("Acme Docs");
    expect(result!.version).toBe("1.0.0");
    expect(result!.pages).toHaveLength(4);
    expect(result!.pages[0].title).toBe("Welcome");
  });

  it("returns null when file does not exist", () => {
    const result = loadManifest(join(tmpDir, "nonexistent.json"));
    expect(result).toBeNull();
  });
});

// ── searchPages ─────────────────────────────────────────

describe("searchPages", () => {
  it("matches on title", () => {
    const results = searchPages(samplePages, "Quickstart");
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe("/quickstart");
  });

  it("matches on title case-insensitively", () => {
    const results = searchPages(samplePages, "quickstart");
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Quickstart");
  });

  it("matches on description", () => {
    const results = searchPages(samplePages, "REST API");
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe("/api/users");
  });

  it("matches on headings", () => {
    const results = searchPages(samplePages, "Delete User");
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe("/api/users");
  });

  it("matches on tags", () => {
    const results = searchPages(samplePages, "mdx");
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe("/components");
  });

  it("matches on content", () => {
    const results = searchPages(samplePages, "set up your project");
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe("/quickstart");
  });

  it("returns empty array for no match", () => {
    const results = searchPages(samplePages, "xyznonexistent");
    expect(results).toHaveLength(0);
  });

  it("returns multiple matches when query is broad", () => {
    // "api" appears in tags of /api/users and in description of /api/users
    // "guide" appears in tags of /quickstart
    const results = searchPages(samplePages, "api");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((r) => r.url === "/api/users")).toBe(true);
  });

  it("does not include content in search results", () => {
    const results = searchPages(samplePages, "Welcome");
    expect(results).toHaveLength(1);
    // Result should only have url, title, description, headings — no content
    const result = results[0] as Record<string, unknown>;
    expect(result).not.toHaveProperty("content");
  });
});

// ── getPage ─────────────────────────────────────────────

describe("getPage", () => {
  it("returns the correct page by URL", () => {
    const page = getPage(samplePages, "/quickstart");
    expect(page).not.toBeNull();
    expect(page!.title).toBe("Quickstart");
    expect(page!.url).toBe("/quickstart");
    expect(page!.headings).toContain("Prerequisites");
  });

  it("returns null for an unknown URL", () => {
    const page = getPage(samplePages, "/nonexistent");
    expect(page).toBeNull();
  });

  it("returns page with content when available", () => {
    const page = getPage(samplePages, "/");
    expect(page).not.toBeNull();
    expect(page!.content).toContain("home page for Acme");
  });

  it("returns page without content when not included", () => {
    const page = getPage(samplePages, "/components");
    expect(page).not.toBeNull();
    expect(page!.content).toBeUndefined();
  });
});

// ── listPages ───────────────────────────────────────────

describe("listPages", () => {
  it("returns all pages as summaries", () => {
    const pages = listPages(samplePages);
    expect(pages).toHaveLength(4);
    expect(pages[0]).toEqual({
      url: "/",
      title: "Welcome",
      description: "Welcome to Acme Docs",
      tags: ["home", "intro"],
    });
  });

  it("does not include headings or content in summaries", () => {
    const pages = listPages(samplePages);
    for (const page of pages) {
      const p = page as Record<string, unknown>;
      expect(p).not.toHaveProperty("headings");
      expect(p).not.toHaveProperty("content");
    }
  });
});

// ── MCP Server Integration Tests ────────────────────────

describe("createMcpServer (integration)", () => {
  let client: InstanceType<typeof Client>;
  let serverCleanup: () => Promise<void>;

  beforeEach(async () => {
    const server = createMcpServer(sampleManifest);
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    client = new Client({ name: "test-client", version: "1.0" });

    await server.connect(serverTransport);
    await client.connect(clientTransport);

    serverCleanup = async () => {
      await client.close();
      await server.close();
    };
  });

  afterEach(async () => {
    await serverCleanup();
  });

  // ── Server info ───────────────────────────────────────

  it("reports correct server name and capabilities", () => {
    const info = client.getServerVersion();
    expect(info?.name).toBe("Acme Docs");
    expect(info?.version).toBe("1.0.0");
  });

  // ── tools/list ────────────────────────────────────────

  it("lists all 3 tools", async () => {
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(3);
    const names = tools.map((t) => t.name).sort();
    expect(names).toEqual(["get_page", "list_pages", "search_docs"]);
  });

  it("tools have correct input schemas", async () => {
    const { tools } = await client.listTools();
    const searchTool = tools.find((t) => t.name === "search_docs")!;
    expect(searchTool.inputSchema.required).toEqual(["query"]);
    const getPageTool = tools.find((t) => t.name === "get_page")!;
    expect(getPageTool.inputSchema.required).toEqual(["url"]);
    const listTool = tools.find((t) => t.name === "list_pages")!;
    expect(listTool.inputSchema.required).toBeUndefined();
  });

  // ── tools/call: list_pages ────────────────────────────

  it("list_pages returns all pages as JSON", async () => {
    const result = await client.callTool({ name: "list_pages", arguments: {} });
    const pages = JSON.parse((result.content as any)[0].text);
    expect(pages).toHaveLength(4);
    expect(pages[0]).toHaveProperty("url");
    expect(pages[0]).toHaveProperty("title");
    expect(pages[0]).not.toHaveProperty("content");
  });

  // ── tools/call: search_docs ───────────────────────────

  it("search_docs finds pages matching query", async () => {
    const result = await client.callTool({ name: "search_docs", arguments: { query: "quickstart" } });
    const results = JSON.parse((result.content as any)[0].text);
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].url).toBe("/quickstart");
  });

  it("search_docs returns empty array for no match", async () => {
    const result = await client.callTool({ name: "search_docs", arguments: { query: "xyznonexistent" } });
    const results = JSON.parse((result.content as any)[0].text);
    expect(results).toHaveLength(0);
  });

  // ── tools/call: get_page ──────────────────────────────

  it("get_page returns full page content", async () => {
    const result = await client.callTool({ name: "get_page", arguments: { url: "/quickstart" } });
    expect(result.isError).toBeFalsy();
    const page = JSON.parse((result.content as any)[0].text);
    expect(page.title).toBe("Quickstart");
    expect(page.content).toContain("Follow these steps");
  });

  it("get_page returns error for unknown URL", async () => {
    const result = await client.callTool({ name: "get_page", arguments: { url: "/nonexistent" } });
    expect(result.isError).toBe(true);
    expect((result.content as any)[0].text).toContain("Page not found");
  });

  // ── tools/call: unknown tool ──────────────────────────

  it("returns error for unknown tool name", async () => {
    const result = await client.callTool({ name: "fake_tool", arguments: {} });
    expect(result.isError).toBe(true);
    expect((result.content as any)[0].text).toContain("Unknown tool");
  });

  // ── resources/list ────────────────────────────────────

  it("lists all pages as resources", async () => {
    const { resources } = await client.listResources();
    expect(resources).toHaveLength(4);
    expect(resources[0].uri).toBe("docs:///");
    expect(resources[0].name).toBe("Welcome");
    expect(resources[0].mimeType).toBe("text/plain");
  });

  // ── resources/read ────────────────────────────────────

  it("reads a resource by URI", async () => {
    const result = await client.readResource({ uri: "docs:///quickstart" });
    expect(result.contents).toHaveLength(1);
    expect(result.contents[0].text).toContain("Follow these steps");
  });

  it("reads resource without content falls back to title + description", async () => {
    const result = await client.readResource({ uri: "docs:///components" });
    expect(result.contents[0].text).toContain("# Components");
    expect(result.contents[0].text).toContain("Built-in MDX components");
  });

  it("throws error reading nonexistent resource", async () => {
    await expect(
      client.readResource({ uri: "docs:///nonexistent" })
    ).rejects.toThrow();
  });
});
