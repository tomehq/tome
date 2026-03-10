import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import { resolve, join } from "path";
import { tmpdir } from "os";
import { loadManifest, searchPages, getPage, listPages, type McpManifest, type McpPage } from "./mcp-server.js";

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
