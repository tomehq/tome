import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { buildNavigation, getPrevNext, flattenNavItems, discoverPages, normalizeBadge } from "./routes.js";
import type { PageRoute, NavigationGroup } from "./routes.js";
import type { TomeConfig } from "./config.js";

// ── HELPERS ──────────────────────────────────────────────

function makeRoute(overrides: Partial<PageRoute> & { id: string }): PageRoute {
  return {
    filePath: `${overrides.id}.md`,
    absolutePath: `/pages/${overrides.id}.md`,
    urlPath: `/${overrides.id}`,
    frontmatter: {
      title: overrides.id,
      hidden: false,
    },
    isMdx: false,
    ...overrides,
  };
}

const emptyConfig: TomeConfig = { name: "Test", navigation: [] };

// ── buildNavigation ───────────────────────────────────────

describe("buildNavigation", () => {
  it("returns empty array when no routes", () => {
    expect(buildNavigation([], emptyConfig)).toEqual([]);
  });

  it("auto-generates navigation from flat file structure", () => {
    const routes = [
      makeRoute({ id: "index", filePath: "index.md", urlPath: "/" }),
      makeRoute({ id: "quickstart", filePath: "quickstart.md" }),
    ];
    const nav = buildNavigation(routes, emptyConfig);
    expect(nav).toHaveLength(1);
    expect(nav[0].section).toBe("Documentation");
    expect(nav[0].pages).toHaveLength(2);
  });

  it("groups pages by directory in auto-mode", () => {
    const routes = [
      makeRoute({ id: "api/overview", filePath: "api/overview.md", urlPath: "/api/overview" }),
      makeRoute({ id: "guides/start", filePath: "guides/start.md", urlPath: "/guides/start" }),
    ];
    const nav = buildNavigation(routes, emptyConfig);
    const sections = nav.map((g) => g.section);
    expect(sections).toContain("Api");
    expect(sections).toContain("Guides");
  });

  it("capitalises directory name for section label", () => {
    const routes = [makeRoute({ id: "getting-started/intro", filePath: "getting-started/intro.md", urlPath: "/getting-started/intro" })];
    const nav = buildNavigation(routes, emptyConfig);
    expect(nav[0].section).toBe("Getting Started");
  });

  it("excludes hidden pages from auto-generated nav", () => {
    const routes = [
      makeRoute({ id: "visible" }),
      makeRoute({ id: "hidden", frontmatter: { title: "hidden", hidden: true } }),
    ];
    const nav = buildNavigation(routes, emptyConfig);
    const ids = flattenNavItems(nav).map((p) => p.id);
    expect(ids).toContain("visible");
    expect(ids).not.toContain("hidden");
  });

  it("uses config navigation when provided", () => {
    const routes = [
      makeRoute({ id: "index" }),
      makeRoute({ id: "quickstart" }),
    ];
    const config: TomeConfig = {
      name: "Test",
      navigation: [{ group: "Start Here", pages: ["index", "quickstart"] }],
    };
    const nav = buildNavigation(routes, config);
    expect(nav).toHaveLength(1);
    expect(nav[0].section).toBe("Start Here");
    expect(nav[0].pages[0].id).toBe("index");
    expect(nav[0].pages[1].id).toBe("quickstart");
  });

  it("skips missing page IDs in config navigation", () => {
    const routes = [makeRoute({ id: "index" })];
    const config: TomeConfig = {
      name: "Test",
      navigation: [{ group: "Docs", pages: ["index", "nonexistent"] }],
    };
    const nav = buildNavigation(routes, config);
    expect(nav[0].pages).toHaveLength(1);
    expect(nav[0].pages[0].id).toBe("index");
  });

  it("uses sidebarTitle over title when available", () => {
    const routes = [
      makeRoute({ id: "intro", frontmatter: { title: "Introduction", sidebarTitle: "Intro" } }),
    ];
    const nav = buildNavigation(routes, emptyConfig);
    expect(nav[0].pages[0].title).toBe("Intro");
  });

  it("passes icon from frontmatter to nav item", () => {
    const routes = [makeRoute({ id: "api", frontmatter: { title: "API", icon: "⚡" } })];
    const nav = buildNavigation(routes, emptyConfig);
    expect(nav[0].pages[0].icon).toBe("⚡");
  });
});

// ── getPrevNext ───────────────────────────────────────────

describe("getPrevNext", () => {
  const nav: NavigationGroup[] = [
    {
      section: "Docs",
      pages: [
        { id: "intro", title: "Intro", urlPath: "/intro" },
        { id: "setup", title: "Setup", urlPath: "/setup" },
        { id: "usage", title: "Usage", urlPath: "/usage" },
      ],
    },
  ];

  it("returns null prev for first page", () => {
    const { prev, next } = getPrevNext(nav, "intro");
    expect(prev).toBeNull();
    expect(next?.id).toBe("setup");
  });

  it("returns null next for last page", () => {
    const { prev, next } = getPrevNext(nav, "usage");
    expect(prev?.id).toBe("setup");
    expect(next).toBeNull();
  });

  it("returns both prev and next for middle page", () => {
    const { prev, next } = getPrevNext(nav, "setup");
    expect(prev?.id).toBe("intro");
    expect(next?.id).toBe("usage");
  });

  it("returns null for both when id not found", () => {
    const { prev, next } = getPrevNext(nav, "unknown");
    expect(prev).toBeNull();
    expect(next).toBeNull();
  });

  it("spans across sections correctly", () => {
    const multiSection: NavigationGroup[] = [
      { section: "A", pages: [{ id: "a1", title: "A1", urlPath: "/a1" }] },
      { section: "B", pages: [{ id: "b1", title: "B1", urlPath: "/b1" }] },
    ];
    const { prev, next } = getPrevNext(multiSection, "b1");
    expect(prev?.id).toBe("a1");
    expect(next).toBeNull();
  });

  it("returns nulls for empty navigation", () => {
    const { prev, next } = getPrevNext([], "any");
    expect(prev).toBeNull();
    expect(next).toBeNull();
  });
});

// ── discoverPages ─────────────────────────────────────────

describe("discoverPages", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tome-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns empty array when directory does not exist", async () => {
    const routes = await discoverPages(join(tmpDir, "nonexistent"));
    expect(routes).toEqual([]);
  });

  it("discovers .md files", async () => {
    writeFileSync(join(tmpDir, "index.md"), "# Home\n\nWelcome.");
    const routes = await discoverPages(tmpDir);
    expect(routes).toHaveLength(1);
    expect(routes[0].id).toBe("index");
    expect(routes[0].urlPath).toBe("/");
  });

  it("discovers .mdx files and sets isMdx flag", async () => {
    writeFileSync(join(tmpDir, "component.mdx"), "# Component\n\nContent.");
    const routes = await discoverPages(tmpDir);
    expect(routes[0].isMdx).toBe(true);
    expect(routes[0].filePath).toBe("component.mdx");
  });

  it("derives url path from file path", async () => {
    mkdirSync(join(tmpDir, "api"));
    writeFileSync(join(tmpDir, "api", "overview.md"), "# API Overview");
    const routes = await discoverPages(tmpDir);
    expect(routes[0].urlPath).toBe("/api/overview");
    expect(routes[0].id).toBe("api/overview");
  });

  it("infers title from frontmatter", async () => {
    writeFileSync(join(tmpDir, "page.md"), "---\ntitle: My Page\n---\n\nContent.");
    const routes = await discoverPages(tmpDir);
    expect(routes[0].frontmatter.title).toBe("My Page");
  });

  it("infers title from first heading when no frontmatter title", async () => {
    writeFileSync(join(tmpDir, "page.md"), "# Heading Title\n\nContent.");
    const routes = await discoverPages(tmpDir);
    expect(routes[0].frontmatter.title).toBe("Heading Title");
  });

  it("normalises index.md to root path", async () => {
    writeFileSync(join(tmpDir, "index.md"), "# Home");
    const routes = await discoverPages(tmpDir);
    expect(routes[0].urlPath).toBe("/");
    expect(routes[0].id).toBe("index");
  });

  it("normalises subdir/index.md to subdir path", async () => {
    mkdirSync(join(tmpDir, "guides"));
    writeFileSync(join(tmpDir, "guides", "index.md"), "# Guides");
    const routes = await discoverPages(tmpDir);
    expect(routes[0].urlPath).toBe("/guides");
  });
  it("parses draft: true from frontmatter", async () => {
    writeFileSync(join(tmpDir, "draft-page.md"), "---\ntitle: Draft Page\ndraft: true\n---\n\n# Draft\n\nWork in progress.");
    const routes = await discoverPages(tmpDir);
    const draftRoute = routes.find(r => r.id === "draft-page");
    expect(draftRoute).toBeDefined();
    expect(draftRoute!.frontmatter.draft).toBe(true);
  });

  it("defaults draft to false when not specified", async () => {
    writeFileSync(join(tmpDir, "normal.md"), "---\ntitle: Normal Page\n---\n\n# Normal");
    const routes = await discoverPages(tmpDir);
    const route = routes.find(r => r.id === "normal");
    expect(route).toBeDefined();
    expect(route!.frontmatter.draft).toBe(false);
  });

  it("includes draft pages in route discovery (filtering happens later)", async () => {
    writeFileSync(join(tmpDir, "page-a.md"), "---\ntitle: Page A\n---\n\n# A");
    writeFileSync(join(tmpDir, "page-b.md"), "---\ntitle: Page B\ndraft: true\n---\n\n# B");
    const routes = await discoverPages(tmpDir);
    expect(routes).toHaveLength(2);
    const ids = routes.map(r => r.id);
    expect(ids).toContain("page-a");
    expect(ids).toContain("page-b");
  });
});

// ── discoverPages — Windows path normalization (#14) ────────

describe("discoverPages Windows path normalization", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tome-win-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("normalizes backslashes in route IDs to forward slashes", async () => {
    mkdirSync(join(tmpDir, "guides"), { recursive: true });
    writeFileSync(join(tmpDir, "guides", "setup.md"), "# Setup Guide");

    const routes = await discoverPages(tmpDir);
    const route = routes.find(r => r.id === "guides/setup");
    expect(route).toBeDefined();
    // ID should never contain backslashes
    expect(route!.id).not.toContain("\\");
    expect(route!.urlPath).toBe("/guides/setup");
  });

  it("normalizes backslashes in filePath", async () => {
    mkdirSync(join(tmpDir, "api"), { recursive: true });
    writeFileSync(join(tmpDir, "api", "overview.md"), "# API Overview");

    const routes = await discoverPages(tmpDir);
    const route = routes.find(r => r.id === "api/overview");
    expect(route).toBeDefined();
    expect(route!.filePath).not.toContain("\\");
    expect(route!.filePath).toBe("api/overview.md");
  });

  it("normalizes deeply nested paths", async () => {
    mkdirSync(join(tmpDir, "guides", "advanced"), { recursive: true });
    writeFileSync(join(tmpDir, "guides", "advanced", "deploy.md"), "# Deploy");

    const routes = await discoverPages(tmpDir);
    const route = routes.find(r => r.id === "guides/advanced/deploy");
    expect(route).toBeDefined();
    expect(route!.id).not.toContain("\\");
    expect(route!.urlPath).toBe("/guides/advanced/deploy");
    expect(route!.filePath).toBe("guides/advanced/deploy.md");
  });
});

// ── discoverPages with versioning (TOM-30) ─────────────────

describe("discoverPages with versioning", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tome-ver-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  const versioning = { current: "v2", versions: ["v1", "v2"] };

  it("discovers pages from versioned directories with correct version field", async () => {
    mkdirSync(join(tmpDir, "v1"), { recursive: true });
    mkdirSync(join(tmpDir, "v2"), { recursive: true });
    writeFileSync(join(tmpDir, "v1", "index.md"), "# Home v1");
    writeFileSync(join(tmpDir, "v2", "index.md"), "# Home v2");

    const routes = await discoverPages(tmpDir, versioning);
    expect(routes).toHaveLength(2);

    const v1Route = routes.find(r => r.version === "v1");
    const v2Route = routes.find(r => r.version === "v2");
    expect(v1Route).toBeDefined();
    expect(v2Route).toBeDefined();
    expect(v1Route!.version).toBe("v1");
    expect(v2Route!.version).toBe("v2");
  });

  it("current version pages appear at root URLs", async () => {
    mkdirSync(join(tmpDir, "v2"), { recursive: true });
    writeFileSync(join(tmpDir, "v2", "index.md"), "# Home");
    writeFileSync(join(tmpDir, "v2", "quickstart.md"), "# Quickstart");

    const routes = await discoverPages(tmpDir, versioning);
    const indexRoute = routes.find(r => r.id === "index");
    const qsRoute = routes.find(r => r.id === "quickstart");

    expect(indexRoute).toBeDefined();
    expect(indexRoute!.urlPath).toBe("/");
    expect(qsRoute).toBeDefined();
    expect(qsRoute!.urlPath).toBe("/quickstart");
  });

  it("older version pages have version-prefixed URLs", async () => {
    mkdirSync(join(tmpDir, "v1"), { recursive: true });
    writeFileSync(join(tmpDir, "v1", "index.md"), "# Home v1");
    writeFileSync(join(tmpDir, "v1", "quickstart.md"), "# Quickstart v1");

    const routes = await discoverPages(tmpDir, versioning);
    const indexRoute = routes.find(r => r.id === "v1/index");
    const qsRoute = routes.find(r => r.id === "v1/quickstart");

    expect(indexRoute).toBeDefined();
    expect(indexRoute!.urlPath).toBe("/v1");
    expect(qsRoute).toBeDefined();
    expect(qsRoute!.urlPath).toBe("/v1/quickstart");
  });

  it("backward compatibility: no versioning config means unchanged behavior", async () => {
    writeFileSync(join(tmpDir, "index.md"), "# Home");
    writeFileSync(join(tmpDir, "quickstart.md"), "# Quickstart");

    const routes = await discoverPages(tmpDir);
    expect(routes).toHaveLength(2);
    expect(routes[0].version).toBeUndefined();
    expect(routes[1].version).toBeUndefined();
    expect(routes.find(r => r.id === "index")!.urlPath).toBe("/");
    expect(routes.find(r => r.id === "quickstart")!.urlPath).toBe("/quickstart");
  });

  it("skips version directories that do not exist", async () => {
    mkdirSync(join(tmpDir, "v2"), { recursive: true });
    writeFileSync(join(tmpDir, "v2", "index.md"), "# Home v2");
    // v1 directory does not exist

    const routes = await discoverPages(tmpDir, versioning);
    expect(routes).toHaveLength(1);
    expect(routes[0].version).toBe("v2");
  });

  it("sets correct filePath including version prefix", async () => {
    mkdirSync(join(tmpDir, "v1"), { recursive: true });
    writeFileSync(join(tmpDir, "v1", "guide.md"), "# Guide");

    const routes = await discoverPages(tmpDir, versioning);
    expect(routes[0].filePath).toBe("v1/guide.md");
  });

  it("handles subdirectories within versioned directories", async () => {
    mkdirSync(join(tmpDir, "v1", "api"), { recursive: true });
    writeFileSync(join(tmpDir, "v1", "api", "overview.md"), "# API Overview");

    const routes = await discoverPages(tmpDir, versioning);
    expect(routes[0].id).toBe("v1/api/overview");
    expect(routes[0].urlPath).toBe("/v1/api/overview");
  });
});

// ── discoverPages with i18n (TOM-34) ─────────────────────

describe("discoverPages with i18n", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tome-i18n-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  const i18nConfig = {
    defaultLocale: "en",
    locales: ["en", "es"],
    localeNames: { en: "English", es: "Español" },
    fallback: true,
  };

  it("discovers pages from locale-prefixed directories with locale field", async () => {
    mkdirSync(join(tmpDir, "en"), { recursive: true });
    mkdirSync(join(tmpDir, "es"), { recursive: true });
    writeFileSync(join(tmpDir, "en", "index.md"), "# Home");
    writeFileSync(join(tmpDir, "es", "index.md"), "# Inicio");

    const routes = await discoverPages(tmpDir, undefined, i18nConfig);

    const enRoute = routes.find(r => r.locale === "en");
    const esRoute = routes.find(r => r.locale === "es");
    expect(enRoute).toBeDefined();
    expect(esRoute).toBeDefined();
    expect(enRoute!.locale).toBe("en");
    expect(esRoute!.locale).toBe("es");
  });

  it("default locale pages serve at root URLs", async () => {
    mkdirSync(join(tmpDir, "en"), { recursive: true });
    writeFileSync(join(tmpDir, "en", "index.md"), "# Home");
    writeFileSync(join(tmpDir, "en", "quickstart.md"), "# Quickstart");

    const routes = await discoverPages(tmpDir, undefined, i18nConfig);
    const indexRoute = routes.find(r => r.id === "index");
    const qsRoute = routes.find(r => r.id === "quickstart");

    expect(indexRoute).toBeDefined();
    expect(indexRoute!.urlPath).toBe("/");
    expect(indexRoute!.locale).toBe("en");
    expect(qsRoute).toBeDefined();
    expect(qsRoute!.urlPath).toBe("/quickstart");
  });

  it("non-default locale pages serve at prefixed URLs", async () => {
    mkdirSync(join(tmpDir, "es"), { recursive: true });
    writeFileSync(join(tmpDir, "es", "index.md"), "# Inicio");
    writeFileSync(join(tmpDir, "es", "quickstart.md"), "# Inicio Rapido");

    const routes = await discoverPages(tmpDir, undefined, i18nConfig);
    const indexRoute = routes.find(r => r.id === "es/index");
    const qsRoute = routes.find(r => r.id === "es/quickstart");

    expect(indexRoute).toBeDefined();
    expect(indexRoute!.urlPath).toBe("/es");
    expect(indexRoute!.locale).toBe("es");
    expect(qsRoute).toBeDefined();
    expect(qsRoute!.urlPath).toBe("/es/quickstart");
  });

  it("fallback creates routes for missing pages in non-default locale", async () => {
    mkdirSync(join(tmpDir, "en"), { recursive: true });
    mkdirSync(join(tmpDir, "es"), { recursive: true });
    writeFileSync(join(tmpDir, "en", "index.md"), "# Home");
    writeFileSync(join(tmpDir, "en", "quickstart.md"), "# Quickstart");
    // es only has index, missing quickstart
    writeFileSync(join(tmpDir, "es", "index.md"), "# Inicio");

    const routes = await discoverPages(tmpDir, undefined, i18nConfig);

    // es/quickstart should be created as a fallback from en/quickstart
    const esFallback = routes.find(r => r.id === "es/quickstart");
    expect(esFallback).toBeDefined();
    expect(esFallback!.urlPath).toBe("/es/quickstart");
    expect(esFallback!.locale).toBe("es");
    // The fallback page should use the default locale's content (same absolutePath)
    const enOriginal = routes.find(r => r.id === "quickstart");
    expect(esFallback!.absolutePath).toBe(enOriginal!.absolutePath);
  });

  it("fallback does not duplicate pages that already exist in non-default locale", async () => {
    mkdirSync(join(tmpDir, "en"), { recursive: true });
    mkdirSync(join(tmpDir, "es"), { recursive: true });
    writeFileSync(join(tmpDir, "en", "index.md"), "# Home");
    writeFileSync(join(tmpDir, "es", "index.md"), "# Inicio");

    const routes = await discoverPages(tmpDir, undefined, i18nConfig);

    // There should be exactly 2 routes: en/index and es/index
    const esIndexRoutes = routes.filter(r => r.id === "es/index");
    expect(esIndexRoutes).toHaveLength(1);
  });

  it("fallback disabled: does not create routes for missing pages", async () => {
    mkdirSync(join(tmpDir, "en"), { recursive: true });
    mkdirSync(join(tmpDir, "es"), { recursive: true });
    writeFileSync(join(tmpDir, "en", "index.md"), "# Home");
    writeFileSync(join(tmpDir, "en", "quickstart.md"), "# Quickstart");
    writeFileSync(join(tmpDir, "es", "index.md"), "# Inicio");

    const noFallback = { ...i18nConfig, fallback: false };
    const routes = await discoverPages(tmpDir, undefined, noFallback);

    // es/quickstart should NOT exist since fallback is off
    const esFallback = routes.find(r => r.id === "es/quickstart");
    expect(esFallback).toBeUndefined();
  });

  it("backward compatibility: no i18n config means unchanged behavior", async () => {
    writeFileSync(join(tmpDir, "index.md"), "# Home");
    writeFileSync(join(tmpDir, "quickstart.md"), "# Quickstart");

    const routes = await discoverPages(tmpDir);
    expect(routes).toHaveLength(2);
    expect(routes[0].locale).toBeUndefined();
    expect(routes[1].locale).toBeUndefined();
    expect(routes.find(r => r.id === "index")!.urlPath).toBe("/");
    expect(routes.find(r => r.id === "quickstart")!.urlPath).toBe("/quickstart");
  });

  it("single locale i18n config means unchanged behavior", async () => {
    writeFileSync(join(tmpDir, "index.md"), "# Home");

    const singleLocale = { defaultLocale: "en", locales: ["en"], fallback: true };
    const routes = await discoverPages(tmpDir, undefined, singleLocale);
    expect(routes).toHaveLength(1);
    expect(routes[0].locale).toBeUndefined();
    expect(routes[0].urlPath).toBe("/");
  });

  it("sets correct filePath including locale prefix", async () => {
    mkdirSync(join(tmpDir, "es"), { recursive: true });
    writeFileSync(join(tmpDir, "es", "guide.md"), "# Guia");

    const routes = await discoverPages(tmpDir, undefined, i18nConfig);
    const esGuide = routes.find(r => r.id === "es/guide");
    expect(esGuide).toBeDefined();
    expect(esGuide!.filePath).toBe("es/guide.md");
  });

  it("handles subdirectories within locale directories", async () => {
    mkdirSync(join(tmpDir, "en", "api"), { recursive: true });
    writeFileSync(join(tmpDir, "en", "api", "overview.md"), "# API Overview");

    const routes = await discoverPages(tmpDir, undefined, i18nConfig);
    const route = routes.find(r => r.id === "api/overview");
    expect(route).toBeDefined();
    expect(route!.urlPath).toBe("/api/overview");
    expect(route!.locale).toBe("en");
  });

  it("supports three or more locales", async () => {
    const threeLocales = {
      defaultLocale: "en",
      locales: ["en", "es", "ja"],
      localeNames: { en: "English", es: "Español", ja: "日本語" },
      fallback: true,
    };
    mkdirSync(join(tmpDir, "en"), { recursive: true });
    mkdirSync(join(tmpDir, "es"), { recursive: true });
    mkdirSync(join(tmpDir, "ja"), { recursive: true });
    writeFileSync(join(tmpDir, "en", "index.md"), "# Home");
    writeFileSync(join(tmpDir, "es", "index.md"), "# Inicio");
    writeFileSync(join(tmpDir, "ja", "index.md"), "# ホーム");

    const routes = await discoverPages(tmpDir, undefined, threeLocales);
    const locales = [...new Set(routes.map(r => r.locale))];
    expect(locales).toContain("en");
    expect(locales).toContain("es");
    expect(locales).toContain("ja");
  });

  it("skips locale directories that do not exist", async () => {
    mkdirSync(join(tmpDir, "en"), { recursive: true });
    writeFileSync(join(tmpDir, "en", "index.md"), "# Home");
    // es directory does not exist

    const noFallback = { ...i18nConfig, fallback: false };
    const routes = await discoverPages(tmpDir, undefined, noFallback);
    expect(routes).toHaveLength(1);
    expect(routes[0].locale).toBe("en");
  });
});

// ── normalizeBadge ────────────────────────────────────────

describe("normalizeBadge", () => {
  it("returns undefined for undefined input", () => {
    expect(normalizeBadge(undefined)).toBeUndefined();
  });

  it("normalizes string badge to object with default variant", () => {
    expect(normalizeBadge("New")).toEqual({ text: "New", variant: "default" });
  });

  it("passes through object badge with explicit variant", () => {
    expect(normalizeBadge({ text: "Beta", variant: "warning" })).toEqual({ text: "Beta", variant: "warning" });
  });

  it("defaults variant to 'default' when object badge omits variant", () => {
    expect(normalizeBadge({ text: "Soon" })).toEqual({ text: "Soon", variant: "default" });
  });
});

// ── buildNavigation with badges ───────────────────────────

describe("buildNavigation with badges", () => {
  it("passes badge from frontmatter to nav item (auto-generated)", () => {
    const routes = [
      makeRoute({ id: "intro", frontmatter: { title: "Intro", badge: "New" } }),
    ];
    const nav = buildNavigation(routes, emptyConfig);
    expect(nav[0].pages[0].badge).toEqual({ text: "New", variant: "default" });
  });

  it("passes object badge from frontmatter to nav item", () => {
    const routes = [
      makeRoute({ id: "api", frontmatter: { title: "API", badge: { text: "Beta", variant: "warning" } } }),
    ];
    const nav = buildNavigation(routes, emptyConfig);
    expect(nav[0].pages[0].badge).toEqual({ text: "Beta", variant: "warning" });
  });

  it("nav item has no badge when frontmatter has no badge", () => {
    const routes = [makeRoute({ id: "plain", frontmatter: { title: "Plain" } })];
    const nav = buildNavigation(routes, emptyConfig);
    expect(nav[0].pages[0].badge).toBeUndefined();
  });

  it("passes badge through config-based navigation", () => {
    const routes = [
      makeRoute({ id: "intro", frontmatter: { title: "Intro", badge: "New" } }),
    ];
    const config: TomeConfig = {
      name: "Test",
      navigation: [{ group: "Docs", pages: ["intro"] }],
    };
    const nav = buildNavigation(routes, config);
    expect(nav[0].pages[0].badge).toEqual({ text: "New", variant: "default" });
  });
});

// ── buildNavigation with remote/content-source pages ─────

describe("buildNavigation with remote pages", () => {
  it("appends remote pages not in explicit navigation under 'External' group", () => {
    const routes = [
      makeRoute({ id: "index", filePath: "index.md", urlPath: "/" }),
      makeRoute({ id: "quickstart", filePath: "quickstart.md" }),
      makeRoute({ id: "remote-guide", filePath: "__remote__/remote-guide.md", urlPath: "/remote-guide", frontmatter: { title: "Remote Guide" } }),
    ];
    const config: TomeConfig = {
      name: "Test",
      navigation: [{ group: "Start", pages: ["index", "quickstart"] }],
    };
    const nav = buildNavigation(routes, config);
    expect(nav).toHaveLength(2);
    expect(nav[0].section).toBe("Start");
    expect(nav[0].pages).toHaveLength(2);
    expect(nav[1].section).toBe("External");
    expect(nav[1].pages).toHaveLength(1);
    expect(nav[1].pages[0].id).toBe("remote-guide");
  });

  it("does not add External group when no remote pages exist", () => {
    const routes = [
      makeRoute({ id: "index", filePath: "index.md", urlPath: "/" }),
    ];
    const config: TomeConfig = {
      name: "Test",
      navigation: [{ group: "Docs", pages: ["index"] }],
    };
    const nav = buildNavigation(routes, config);
    expect(nav).toHaveLength(1);
    expect(nav[0].section).toBe("Docs");
  });

  it("excludes hidden remote pages from External group", () => {
    const routes = [
      makeRoute({ id: "index", filePath: "index.md", urlPath: "/" }),
      makeRoute({ id: "hidden-remote", filePath: "__remote__/hidden-remote.md", urlPath: "/hidden-remote", frontmatter: { title: "Hidden", hidden: true } }),
    ];
    const config: TomeConfig = {
      name: "Test",
      navigation: [{ group: "Docs", pages: ["index"] }],
    };
    const nav = buildNavigation(routes, config);
    expect(nav).toHaveLength(1); // No External group since hidden
  });

  it("includes remote pages in auto-generated navigation without separate group", () => {
    const routes = [
      makeRoute({ id: "index", filePath: "index.md", urlPath: "/" }),
      makeRoute({ id: "remote-page", filePath: "__remote__/remote-page.md", urlPath: "/remote-page", frontmatter: { title: "Remote Page" } }),
    ];
    // No explicit navigation — auto-generate
    const nav = buildNavigation(routes, emptyConfig);
    // Both should be in the same auto-generated group
    const allIds = flattenNavItems(nav).map((p) => p.id);
    expect(allIds).toContain("index");
    expect(allIds).toContain("remote-page");
  });
});

// ── buildNavigation with nested groups ───────────────────

describe("buildNavigation with nested groups", () => {
  const routes = [
    makeRoute({ id: "sdk/overview", filePath: "sdk/overview.md", urlPath: "/sdk/overview", frontmatter: { title: "SDK Overview" } }),
    makeRoute({ id: "sdk/javascript", filePath: "sdk/javascript.md", urlPath: "/sdk/javascript", frontmatter: { title: "JavaScript" } }),
    makeRoute({ id: "sdk/python", filePath: "sdk/python.md", urlPath: "/sdk/python", frontmatter: { title: "Python" } }),
  ];

  it("resolves nested groups into NavigationGroup entries", () => {
    const config: TomeConfig = {
      name: "Test",
      navigation: [
        {
          group: "SDK",
          pages: [
            "sdk/overview",
            { group: "Languages", pages: ["sdk/javascript", "sdk/python"] },
          ],
        },
      ],
    };
    const nav = buildNavigation(routes, config);
    expect(nav).toHaveLength(1);
    expect(nav[0].section).toBe("SDK");
    expect(nav[0].pages).toHaveLength(2);
    // First entry is a plain item
    expect(nav[0].pages[0]).toMatchObject({ id: "sdk/overview", title: "SDK Overview" });
    // Second entry is a nested group
    const nested = nav[0].pages[1];
    expect("section" in nested).toBe(true);
    expect((nested as NavigationGroup).section).toBe("Languages");
    expect((nested as NavigationGroup).pages).toHaveLength(2);
  });

  it("flattenNavItems returns all leaf pages depth-first", () => {
    const config: TomeConfig = {
      name: "Test",
      navigation: [
        {
          group: "SDK",
          pages: [
            "sdk/overview",
            { group: "Languages", pages: ["sdk/javascript", "sdk/python"] },
          ],
        },
      ],
    };
    const nav = buildNavigation(routes, config);
    const flat = flattenNavItems(nav);
    expect(flat.map((p) => p.id)).toEqual(["sdk/overview", "sdk/javascript", "sdk/python"]);
  });

  it("getPrevNext works across nested group boundaries", () => {
    const config: TomeConfig = {
      name: "Test",
      navigation: [
        {
          group: "SDK",
          pages: [
            "sdk/overview",
            { group: "Languages", pages: ["sdk/javascript", "sdk/python"] },
          ],
        },
      ],
    };
    const nav = buildNavigation(routes, config);
    // overview -> javascript (crosses into nested group)
    const { next } = getPrevNext(nav, "sdk/overview");
    expect(next?.id).toBe("sdk/javascript");
    // javascript -> python (within nested group)
    const { prev, next: next2 } = getPrevNext(nav, "sdk/javascript");
    expect(prev?.id).toBe("sdk/overview");
    expect(next2?.id).toBe("sdk/python");
    // python is last
    const { next: next3 } = getPrevNext(nav, "sdk/python");
    expect(next3).toBeNull();
  });

  it("omits empty nested groups when all pages are missing", () => {
    const config: TomeConfig = {
      name: "Test",
      navigation: [
        {
          group: "SDK",
          pages: [
            "sdk/overview",
            { group: "Empty", pages: ["nonexistent-a", "nonexistent-b"] },
          ],
        },
      ],
    };
    const nav = buildNavigation(routes, config);
    // The "Empty" nested group should be omitted since no routes matched
    expect(nav[0].pages).toHaveLength(1);
    expect(nav[0].pages[0]).toMatchObject({ id: "sdk/overview" });
  });

  it("collects nested IDs for explicitIds (no spurious External group)", () => {
    const routesWithRemote = [
      ...routes,
      makeRoute({ id: "remote-doc", filePath: "__remote__/remote-doc.md", urlPath: "/remote-doc", frontmatter: { title: "Remote" } }),
    ];
    const config: TomeConfig = {
      name: "Test",
      navigation: [
        {
          group: "SDK",
          pages: [
            "sdk/overview",
            { group: "Languages", pages: ["sdk/javascript", "sdk/python"] },
          ],
        },
      ],
    };
    const nav = buildNavigation(routesWithRemote, config);
    // Remote page should appear in External group since it's not in explicit nav
    expect(nav).toHaveLength(2);
    expect(nav[1].section).toBe("External");
  });

  it("resolves nested groups with versioned routes (filePath differs from id)", () => {
    const versionedRoutes = [
      makeRoute({ id: "guides/search", filePath: "v3/guides/search.md", urlPath: "/guides/search", frontmatter: { title: "Search" } }),
      makeRoute({ id: "guides/config", filePath: "v3/guides/config.mdx", urlPath: "/guides/config", frontmatter: { title: "Configuration" } }),
      makeRoute({ id: "guides/theme", filePath: "v3/guides/theme.md", urlPath: "/guides/theme", frontmatter: { title: "Custom Theme" } }),
      makeRoute({ id: "guides/plugins", filePath: "v3/guides/plugins.md", urlPath: "/guides/plugins", frontmatter: { title: "Plugins" } }),
    ];
    const config: TomeConfig = {
      name: "Test",
      navigation: [
        {
          group: "Guides",
          pages: [
            "guides/search",
            { group: "Customization", pages: ["guides/config", "guides/theme"] },
            { group: "Integrations", pages: ["guides/plugins"] },
          ],
        },
      ],
    };
    const nav = buildNavigation(versionedRoutes, config);
    expect(nav[0].section).toBe("Guides");
    expect(nav[0].pages).toHaveLength(3);
    // First item is flat
    expect(nav[0].pages[0]).toMatchObject({ id: "guides/search" });
    // Second is nested Customization group
    const customization = nav[0].pages[1] as NavigationGroup;
    expect(customization.section).toBe("Customization");
    expect(customization.pages).toHaveLength(2);
    // Third is nested Integrations group
    const integrations = nav[0].pages[2] as NavigationGroup;
    expect(integrations.section).toBe("Integrations");
    expect(integrations.pages).toHaveLength(1);
  });
});
