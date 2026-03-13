import { describe, it, expect, vi } from "vitest";
import {
  computeEditUrl,
  resolveInitialPageId,
  loadPage,
  detectCurrentVersion,
} from "./entry-helpers.js";
import type { MinimalRoute } from "./routing.js";

// ── Test fixtures ─────────────────────────────────────────

const routes: MinimalRoute[] = [
  { id: "index", urlPath: "/" },
  { id: "quickstart", urlPath: "/quickstart" },
  { id: "guides/search", urlPath: "/guides/search" },
  { id: "v1/index", urlPath: "/v1/" },
  { id: "v1/guides/migration", urlPath: "/v1/guides/migration" },
];

function stubPathnameToPageId(pathname: string, basePath: string, rts: MinimalRoute[]): string | null {
  let relative = pathname;
  if (basePath && relative.startsWith(basePath)) {
    relative = relative.slice(basePath.length);
  }
  const id = relative.replace(/^\//, "").replace(/\/index\.html$/, "").replace(/\.html$/, "").replace(/\/$/, "") || "index";
  return rts.find((r) => r.id === id) ? id : null;
}

// ── computeEditUrl ────────────────────────────────────────

describe("computeEditUrl", () => {
  it("returns undefined when editLink is undefined", () => {
    expect(computeEditUrl(undefined, "docs/quickstart.md")).toBeUndefined();
  });

  it("returns undefined when filePath is undefined", () => {
    expect(computeEditUrl({ repo: "org/repo" }, undefined)).toBeUndefined();
  });

  it("returns undefined when both are undefined", () => {
    expect(computeEditUrl(undefined, undefined)).toBeUndefined();
  });

  it("builds URL with default branch (main)", () => {
    const url = computeEditUrl({ repo: "acme/docs" }, "docs/quickstart.md");
    expect(url).toBe("https://github.com/acme/docs/edit/main/docs/quickstart.md");
  });

  it("uses custom branch", () => {
    const url = computeEditUrl({ repo: "acme/docs", branch: "develop" }, "docs/quickstart.md");
    expect(url).toBe("https://github.com/acme/docs/edit/develop/docs/quickstart.md");
  });

  it("uses custom dir prefix", () => {
    const url = computeEditUrl({ repo: "acme/docs", dir: "website" }, "quickstart.md");
    expect(url).toBe("https://github.com/acme/docs/edit/main/website/quickstart.md");
  });

  it("strips trailing slash from dir", () => {
    const url = computeEditUrl({ repo: "acme/docs", dir: "website/" }, "quickstart.md");
    expect(url).toBe("https://github.com/acme/docs/edit/main/website/quickstart.md");
  });

  it("uses custom branch and dir together", () => {
    const url = computeEditUrl(
      { repo: "org/repo", branch: "v2", dir: "packages/docs" },
      "guides/search.md",
    );
    expect(url).toBe("https://github.com/org/repo/edit/v2/packages/docs/guides/search.md");
  });

  it("handles empty dir string", () => {
    const url = computeEditUrl({ repo: "org/repo", dir: "" }, "index.md");
    expect(url).toBe("https://github.com/org/repo/edit/main/index.md");
  });

  it("handles nested file paths", () => {
    const url = computeEditUrl({ repo: "org/repo" }, "docs/v1/guides/migration.md");
    expect(url).toBe("https://github.com/org/repo/edit/main/docs/v1/guides/migration.md");
  });
});

// ── resolveInitialPageId ──────────────────────────────────

describe("resolveInitialPageId", () => {
  it("resolves from pathname when route exists", () => {
    const id = resolveInitialPageId("/docs/quickstart", "", routes, "/docs", stubPathnameToPageId);
    expect(id).toBe("quickstart");
  });

  it("resolves index from basePath root", () => {
    const id = resolveInitialPageId("/docs/", "", routes, "/docs", stubPathnameToPageId);
    expect(id).toBe("index");
  });

  it("resolves nested route from pathname", () => {
    const id = resolveInitialPageId("/docs/guides/search", "", routes, "/docs", stubPathnameToPageId);
    expect(id).toBe("guides/search");
  });

  it("falls back to hash for legacy URLs when pathname doesn't match", () => {
    // Pathname resolver returns null, so hash fallback triggers
    const noRouteResolver = () => null;
    const id = resolveInitialPageId("/docs/", "#quickstart", routes, "/docs", noRouteResolver);
    expect(id).toBe("quickstart");
  });

  it("falls back to hash with nested IDs when pathname fails", () => {
    // Pathname resolves to no known route, so hash fallback kicks in
    const noRouteResolver = () => null;
    const id = resolveInitialPageId("/", "#guides/search", routes, "", noRouteResolver);
    expect(id).toBe("guides/search");
  });

  it("returns first route ID when neither pathname nor hash match", () => {
    const id = resolveInitialPageId("/unknown", "", routes, "/docs", stubPathnameToPageId);
    expect(id).toBe("index");
  });

  it("returns 'index' when routes array is empty", () => {
    const id = resolveInitialPageId("/unknown", "", [], "/docs", stubPathnameToPageId);
    expect(id).toBe("index");
  });

  it("prefers pathname over hash when both match", () => {
    const id = resolveInitialPageId("/docs/quickstart", "#guides/search", routes, "/docs", stubPathnameToPageId);
    expect(id).toBe("quickstart");
  });

  it("handles hash without # prefix", () => {
    // The real hash will always start with #, but the function handles both
    const id = resolveInitialPageId("/unknown", "quickstart", routes, "/docs", stubPathnameToPageId);
    expect(id).toBe("quickstart");
  });

  it("ignores hash that matches no route", () => {
    const id = resolveInitialPageId("/unknown", "#nonexistent", routes, "/docs", stubPathnameToPageId);
    expect(id).toBe("index");
  });

  it("works with empty basePath", () => {
    const id = resolveInitialPageId("/quickstart", "", routes, "", stubPathnameToPageId);
    expect(id).toBe("quickstart");
  });

  it("resolves versioned routes", () => {
    const id = resolveInitialPageId("/docs/v1/guides/migration", "", routes, "/docs", stubPathnameToPageId);
    expect(id).toBe("v1/guides/migration");
  });
});

// ── loadPage ──────────────────────────────────────────────

describe("loadPage", () => {
  const routesWithMeta = [
    { id: "index", urlPath: "/", isMdx: false },
    { id: "quickstart", urlPath: "/quickstart", isMdx: false },
    { id: "about", urlPath: "/about", isMdx: true },
    { id: "changelog", urlPath: "/changelog", isMdx: false },
  ];

  it("loads a regular markdown page", async () => {
    const mockLoader = vi.fn().mockResolvedValue({
      default: {
        html: "<h1>Hello</h1>",
        frontmatter: { title: "Hello" },
        headings: [{ depth: 1, text: "Hello", id: "hello" }],
      },
    });
    const page = await loadPage("quickstart", routesWithMeta, mockLoader);
    expect(page).not.toBeNull();
    expect(page!.isMdx).toBe(false);
    if (!page!.isMdx) {
      expect(page!.html).toBe("<h1>Hello</h1>");
      expect(page!.frontmatter.title).toBe("Hello");
      expect(page!.headings).toHaveLength(1);
    }
  });

  it("loads an MDX page with meta", async () => {
    const MockComponent = () => null;
    const mockLoader = vi.fn().mockResolvedValue({
      default: MockComponent,
      meta: {
        frontmatter: { title: "About Us" },
        headings: [{ depth: 2, text: "Team", id: "team" }],
      },
    });
    const page = await loadPage("about", routesWithMeta, mockLoader);
    expect(page).not.toBeNull();
    expect(page!.isMdx).toBe(true);
    if (page!.isMdx) {
      expect(page!.component).toBe(MockComponent);
      expect(page!.frontmatter.title).toBe("About Us");
      expect(page!.headings[0].text).toBe("Team");
    }
  });

  it("returns null when module has no default export", async () => {
    const mockLoader = vi.fn().mockResolvedValue({ default: null });
    const page = await loadPage("quickstart", routesWithMeta, mockLoader);
    expect(page).toBeNull();
  });

  it("returns null on loader error", async () => {
    const mockLoader = vi.fn().mockRejectedValue(new Error("Module not found"));
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const page = await loadPage("quickstart", routesWithMeta, mockLoader);
    expect(page).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Failed to load page"),
      expect.any(Error),
    );
    consoleSpy.mockRestore();
  });

  it("loads a changelog page with entries", async () => {
    const changelogEntries = [
      { version: "1.0.0", date: "2025-01-01", sections: [{ type: "Added", items: ["Feature A"] }] },
    ];
    const mockLoader = vi.fn().mockResolvedValue({
      default: {
        html: "<h1>Changelog</h1>",
        frontmatter: { title: "Changelog", type: "changelog" },
        headings: [],
      },
      isChangelog: true,
      changelogEntries,
    });
    const page = await loadPage("changelog", routesWithMeta, mockLoader);
    expect(page).not.toBeNull();
    expect(page!.isMdx).toBe(false);
    if (!page!.isMdx) {
      expect(page!.changelogEntries).toEqual(changelogEntries);
      expect(page!.frontmatter.title).toBe("Changelog");
    }
  });

  it("loads markdown page without changelog entries when isChangelog is false", async () => {
    const mockLoader = vi.fn().mockResolvedValue({
      default: {
        html: "<h1>Regular</h1>",
        frontmatter: { title: "Regular" },
        headings: [],
      },
      isChangelog: false,
    });
    const page = await loadPage("quickstart", routesWithMeta, mockLoader);
    expect(page).not.toBeNull();
    expect(page!.isMdx).toBe(false);
    if (!page!.isMdx) {
      expect(page!.changelogEntries).toBeUndefined();
    }
  });

  it("calls loadPageModule with the correct ID", async () => {
    const mockLoader = vi.fn().mockResolvedValue({
      default: { html: "", frontmatter: { title: "" }, headings: [] },
    });
    await loadPage("quickstart", routesWithMeta, mockLoader);
    expect(mockLoader).toHaveBeenCalledWith("quickstart");
  });

  it("handles page ID not in routes array", async () => {
    const mockLoader = vi.fn().mockResolvedValue({
      default: { html: "<p>Found</p>", frontmatter: { title: "Found" }, headings: [] },
    });
    const page = await loadPage("unknown-page", routesWithMeta, mockLoader);
    expect(page).not.toBeNull();
    // Should still return the page data since the module loaded
    expect(page!.isMdx).toBe(false);
  });

  it("does not treat non-MDX route as MDX even if mod.meta exists", async () => {
    // A markdown route shouldn't be treated as MDX even if the module has meta
    const mockLoader = vi.fn().mockResolvedValue({
      default: { html: "<p>MD</p>", frontmatter: { title: "MD" }, headings: [] },
      meta: { frontmatter: { title: "MDX" }, headings: [] },
    });
    const page = await loadPage("quickstart", routesWithMeta, mockLoader);
    expect(page).not.toBeNull();
    expect(page!.isMdx).toBe(false);
  });
});

// ── detectCurrentVersion ──────────────────────────────────

describe("detectCurrentVersion", () => {
  it("returns route version when present", () => {
    expect(detectCurrentVersion({ version: "v1" }, { current: "v2" })).toBe("v1");
  });

  it("falls back to versions.current when route has no version", () => {
    expect(detectCurrentVersion({}, { current: "v2" })).toBe("v2");
  });

  it("falls back to versions.current when route is undefined", () => {
    expect(detectCurrentVersion(undefined, { current: "v2" })).toBe("v2");
  });

  it("returns undefined when neither has a version", () => {
    expect(detectCurrentVersion({}, {})).toBeUndefined();
  });

  it("returns undefined when both are undefined", () => {
    expect(detectCurrentVersion(undefined, undefined)).toBeUndefined();
  });

  it("prefers route version over versions.current", () => {
    expect(detectCurrentVersion({ version: "v3" }, { current: "v1" })).toBe("v3");
  });

  it("returns undefined when route has no version and versions has no current", () => {
    expect(detectCurrentVersion({ version: undefined }, { current: undefined })).toBeUndefined();
  });
});
