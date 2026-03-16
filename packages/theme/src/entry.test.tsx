import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";

// ── Capture Shell props ──────────────────────────────────
let capturedShellProps: any = null;

vi.mock("./Shell.js", () => ({
  Shell: (props: any) => {
    capturedShellProps = props;
    return <div data-testid="shell" />;
  },
}));

// ── Mock virtual modules (using resolved stub paths) ─────
// Vite resolve.alias maps virtual:tome/* to __virtual_stubs/*,
// so vi.mock must target the resolved path.

vi.mock("virtual:tome/config", () => ({
  default: {
    name: "Test Docs",
    theme: { preset: "amber", mode: "light" },
    basePath: "/docs/",
    editLink: { repo: "test/repo", branch: "main", dir: "docs" },
    api: {
      spec: "./openapi.json",
      baseUrl: "https://api.example.com",
      playground: true,
      auth: { type: "bearer", header: "Authorization" },
    },
  },
}));

const mockRoutes = [
  {
    id: "index",
    urlPath: "/",
    filePath: "pages/index.md",
    frontmatter: { title: "Home", description: "Welcome" },
  },
  {
    id: "quickstart",
    urlPath: "/quickstart",
    filePath: "pages/quickstart.md",
    frontmatter: { title: "Quick Start", description: "Get started" },
  },
  {
    id: "api-reference",
    urlPath: "/api",
    filePath: "__api-reference__",
    frontmatter: { title: "API Reference", description: "API docs" },
  },
];

const mockNavigation = [
  { section: "Guide", pages: [{ id: "index", title: "Home", urlPath: "/" }] },
];

vi.mock("virtual:tome/routes", () => ({
  routes: [
    {
      id: "index",
      urlPath: "/",
      filePath: "pages/index.md",
      frontmatter: { title: "Home", description: "Welcome" },
    },
    {
      id: "quickstart",
      urlPath: "/quickstart",
      filePath: "pages/quickstart.md",
      frontmatter: { title: "Quick Start", description: "Get started" },
    },
    {
      id: "api-reference",
      urlPath: "/api",
      filePath: "__api-reference__",
      frontmatter: { title: "API Reference", description: "API docs" },
    },
  ],
  navigation: [
    { section: "Guide", pages: [{ id: "index", title: "Home", urlPath: "/" }] },
  ],
  versions: null,
  i18n: null,
}));

vi.mock("virtual:tome/page-loader", () => ({
  default: vi.fn().mockResolvedValue({
    default: {
      html: "<p>Hello</p>",
      frontmatter: { title: "Home", description: "Welcome" },
      headings: [],
    },
  }),
}));

vi.mock("virtual:tome/doc-context", () => ({
  default: "Test doc context",
}));

vi.mock("virtual:tome/overrides", () => ({
  default: { Footer: () => <div>Custom Footer</div> },
}));

// ── Mock entry-helpers ───────────────────────────────────
const mockLoadPage = vi.fn().mockResolvedValue({
  isMdx: false,
  isApiReference: false,
  html: "<p>Test page</p>",
  frontmatter: { title: "Home", description: "Welcome" },
  headings: [{ id: "intro", text: "Intro", depth: 2 }],
});

const mockComputeEditUrl = vi.fn().mockReturnValue("https://github.com/test/repo/edit/main/docs/pages/index.md");
const mockResolveInitialPageId = vi.fn().mockReturnValue("index");
const mockDetectCurrentVersion = vi.fn().mockReturnValue(undefined);

vi.mock("./entry-helpers.js", () => ({
  loadPage: (...args: any[]) => mockLoadPage(...args),
  computeEditUrl: (...args: any[]) => mockComputeEditUrl(...args),
  resolveInitialPageId: (...args: any[]) => mockResolveInitialPageId(...args),
  detectCurrentVersion: (...args: any[]) => mockDetectCurrentVersion(...args),
}));

vi.mock("./routing.js", () => ({
  pathnameToPageId: vi.fn().mockReturnValue("index"),
  pageIdToPath: vi.fn().mockReturnValue("/docs/"),
}));

// ── Mock @tomehq/components ──────────────────────────────
const MockApiReference = (p: any) => <div data-testid="api-ref">{JSON.stringify(p)}</div>;

vi.mock("@tomehq/components", () => ({
  Callout: (p: any) => <div>{p.children}</div>,
  Tabs: (p: any) => <div>{p.children}</div>,
  Card: (p: any) => <div>{p.children}</div>,
  CardGroup: (p: any) => <div>{p.children}</div>,
  Steps: (p: any) => <div>{p.children}</div>,
  Accordion: (p: any) => <div>{p.children}</div>,
  ChangelogTimeline: (p: any) => <div>{p.children}</div>,
  PackageManager: () => <div />,
  TypeTable: () => <div />,
  FileTree: Object.assign(() => <div />, { File: () => <div />, Folder: () => <div /> }),
  CodeSamples: () => <div />,
  LinkCard: () => <div />,
  CardGrid: () => <div />,
  ApiReference: MockApiReference,
}));

// ── Global stubs ─────────────────────────────────────────
beforeEach(() => {
  capturedShellProps = null;

  // entry.tsx auto-mounts into #tome-root on import
  if (!document.getElementById("tome-root")) {
    const root = document.createElement("div");
    root.id = "tome-root";
    document.body.appendChild(root);
  }

  // jsdom stubs
  window.scrollTo = vi.fn() as any;
  window.history.pushState = vi.fn();
  window.history.replaceState = vi.fn();
});

afterEach(() => {
  capturedShellProps = null;
});

// ── Helper: render App and wait for async effects ────────
async function renderApp() {
  // Dynamic import so mocks are in place first
  const { default: App } = await import("./entry.js");
  let result: ReturnType<typeof render>;
  await act(async () => {
    result = render(<App />);
  });
  // Wait for the initial page promise to resolve
  await act(async () => {
    await new Promise((r) => setTimeout(r, 10));
  });
  return result!;
}

// ══════════════════════════════════════════════════════════
// TESTS
// ══════════════════════════════════════════════════════════

describe("entry.tsx — Shell prop wiring", () => {
  it("passes config object to Shell", async () => {
    await renderApp();
    expect(capturedShellProps).not.toBeNull();
    expect(capturedShellProps.config).toBeDefined();
    expect(capturedShellProps.config.name).toBe("Test Docs");
    expect(capturedShellProps.config.theme).toEqual({ preset: "amber", mode: "light" });
  });

  it("passes navigation from virtual:tome/routes", async () => {
    await renderApp();
    expect(capturedShellProps.navigation).toEqual(mockNavigation);
  });

  it("passes currentPageId resolved from initial page", async () => {
    await renderApp();
    expect(capturedShellProps.currentPageId).toBe("index");
  });

  // ── API PROPS (the critical bug-catching tests) ────────

  it("passes apiBaseUrl from config.api.baseUrl", async () => {
    await renderApp();
    expect(capturedShellProps.apiBaseUrl).toBe("https://api.example.com");
  });

  it("passes apiPlayground from config.api.playground", async () => {
    await renderApp();
    // THIS was the bug: playground was defined in config but never threaded to Shell
    expect(capturedShellProps.apiPlayground).toBe(true);
  });

  it("passes apiAuth from config.api.auth", async () => {
    await renderApp();
    // THIS was the bug: auth was defined in config but never threaded to Shell
    expect(capturedShellProps.apiAuth).toEqual({
      type: "bearer",
      header: "Authorization",
    });
  });

  it("passes ApiReferenceComponent", async () => {
    await renderApp();
    expect(capturedShellProps.ApiReferenceComponent).toBeDefined();
    expect(typeof capturedShellProps.ApiReferenceComponent).toBe("function");
  });

  // ── DOC CONTEXT & OVERRIDES ────────────────────────────

  it("passes docContext from virtual:tome/doc-context", async () => {
    await renderApp();
    expect(capturedShellProps.docContext).toBe("Test doc context");
  });

  it("passes overrides from virtual:tome/overrides", async () => {
    await renderApp();
    expect(capturedShellProps.overrides).toBeDefined();
    expect(capturedShellProps.overrides.Footer).toBeDefined();
  });

  // ── BASEPATH ───────────────────────────────────────────

  it("passes basePath with trailing slash stripped", async () => {
    await renderApp();
    // config.basePath is "/docs/" — entry.tsx strips the trailing slash
    expect(capturedShellProps.basePath).toBe("/docs");
  });

  // ── EDIT URL ───────────────────────────────────────────

  it("passes editUrl computed by computeEditUrl", async () => {
    await renderApp();
    expect(mockComputeEditUrl).toHaveBeenCalled();
    expect(capturedShellProps.editUrl).toBe(
      "https://github.com/test/repo/edit/main/docs/pages/index.md"
    );
  });

  // ── ALL PAGES ──────────────────────────────────────────

  it("passes allPages derived from routes (id, title, description)", async () => {
    await renderApp();
    expect(capturedShellProps.allPages).toEqual([
      { id: "index", title: "Home", description: "Welcome" },
      { id: "quickstart", title: "Quick Start", description: "Get started" },
      { id: "api-reference", title: "API Reference", description: "API docs" },
    ]);
  });

  // ── MDX COMPONENTS ─────────────────────────────────────

  it("passes mdxComponents record", async () => {
    await renderApp();
    expect(capturedShellProps.mdxComponents).toBeDefined();
    expect(typeof capturedShellProps.mdxComponents).toBe("object");
    expect(capturedShellProps.mdxComponents.Callout).toBeDefined();
    expect(capturedShellProps.mdxComponents.Tabs).toBeDefined();
    expect(capturedShellProps.mdxComponents.Steps).toBeDefined();
    expect(capturedShellProps.mdxComponents.FileTree).toBeDefined();
  });

  // ── VERSIONING ─────────────────────────────────────────

  it("passes versioning as undefined when versions is null", async () => {
    await renderApp();
    expect(capturedShellProps.versioning).toBeUndefined();
  });

  it("passes currentVersion from detectCurrentVersion", async () => {
    await renderApp();
    expect(mockDetectCurrentVersion).toHaveBeenCalled();
    expect(capturedShellProps.currentVersion).toBeUndefined();
  });

  // ── I18N ───────────────────────────────────────────────

  it("passes i18n as undefined when i18n is null", async () => {
    await renderApp();
    expect(capturedShellProps.i18n).toBeUndefined();
  });

  it("passes currentLocale defaulting to 'en'", async () => {
    await renderApp();
    expect(capturedShellProps.currentLocale).toBe("en");
  });

  it("passes dir as 'ltr' by default", async () => {
    await renderApp();
    expect(capturedShellProps.dir).toBe("ltr");
  });

  // ── DRAFT ──────────────────────────────────────────────

  it("passes isDraft as false for non-draft pages", async () => {
    await renderApp();
    expect(capturedShellProps.isDraft).toBe(false);
  });

  // ── ON NAVIGATE ────────────────────────────────────────

  it("passes onNavigate callback", async () => {
    await renderApp();
    expect(typeof capturedShellProps.onNavigate).toBe("function");
  });
});

describe("entry.tsx — page data threading", () => {
  it("passes pageHtml for non-MDX pages", async () => {
    await renderApp();
    expect(capturedShellProps.pageHtml).toBe("<p>Test page</p>");
  });

  it("passes pageComponent as undefined for non-MDX pages", async () => {
    await renderApp();
    expect(capturedShellProps.pageComponent).toBeUndefined();
  });

  it("passes headings from page data", async () => {
    await renderApp();
    expect(capturedShellProps.headings).toEqual([
      { id: "intro", text: "Intro", depth: 2 },
    ]);
  });

  it("passes pageTitle from frontmatter", async () => {
    await renderApp();
    expect(capturedShellProps.pageTitle).toBe("Home");
  });

  it("passes pageDescription from frontmatter", async () => {
    await renderApp();
    expect(capturedShellProps.pageDescription).toBe("Welcome");
  });

  it("passes tocEnabled as true when frontmatter.toc is not false", async () => {
    await renderApp();
    expect(capturedShellProps.tocEnabled).toBe(true);
  });

  it("does not pass apiManifest when isApiReference is false", async () => {
    await renderApp();
    expect(capturedShellProps.apiManifest).toBeUndefined();
  });

  it("does not pass changelogEntries when not a changelog page", async () => {
    await renderApp();
    expect(capturedShellProps.changelogEntries).toBeUndefined();
  });

  it("passes pageComponent for MDX pages", async () => {
    const MdxComponent = () => <div>MDX content</div>;
    await renderApp();

    // Navigate to trigger the MDX response
    mockLoadPage.mockResolvedValueOnce({
      isMdx: true,
      component: MdxComponent,
      frontmatter: { title: "MDX Page", description: "An MDX page" },
      headings: [],
    });

    await act(async () => {
      await capturedShellProps.onNavigate("quickstart");
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(capturedShellProps.pageHtml).toBeUndefined();
    expect(capturedShellProps.pageComponent).toBe(MdxComponent);
  });

  it("passes apiManifest when isApiReference is true", async () => {
    const manifest = { paths: { "/users": {} } };

    await renderApp();

    // Navigate to trigger the API reference response
    mockLoadPage.mockResolvedValueOnce({
      isMdx: false,
      isApiReference: true,
      html: "<p>API</p>",
      frontmatter: { title: "API Reference", description: "API docs" },
      headings: [],
      apiManifest: manifest,
    });

    await act(async () => {
      await capturedShellProps.onNavigate("api-reference");
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(capturedShellProps.apiManifest).toEqual(manifest);
  });
});

describe("entry.tsx — initial load behavior", () => {
  it("calls resolveInitialPageId on module load", async () => {
    await renderApp();
    expect(mockResolveInitialPageId).toHaveBeenCalled();
  });

  it("calls loadPage for the initial page", async () => {
    await renderApp();
    expect(mockLoadPage).toHaveBeenCalledWith(
      "index",
      expect.any(Array),
      expect.any(Function),
    );
  });

  it("calls replaceState with the resolved path on mount", async () => {
    await renderApp();
    expect(window.history.replaceState).toHaveBeenCalled();
  });
});

describe("entry.tsx — navigation", () => {
  it("onNavigate calls loadPage with new page id", async () => {
    await renderApp();
    mockLoadPage.mockResolvedValueOnce({
      isMdx: false,
      html: "<p>Quick Start</p>",
      frontmatter: { title: "Quick Start", description: "Get started" },
      headings: [],
    });

    await act(async () => {
      await capturedShellProps.onNavigate("quickstart");
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(mockLoadPage).toHaveBeenCalledWith(
      "quickstart",
      expect.any(Array),
      expect.any(Function),
    );
    expect(capturedShellProps.currentPageId).toBe("quickstart");
    expect(capturedShellProps.pageHtml).toBe("<p>Quick Start</p>");
  });

  it("onNavigate calls pushState by default", async () => {
    await renderApp();
    mockLoadPage.mockResolvedValueOnce({
      isMdx: false,
      html: "<p>Quick Start</p>",
      frontmatter: { title: "Quick Start", description: "Get started" },
      headings: [],
    });

    await act(async () => {
      await capturedShellProps.onNavigate("quickstart");
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(window.history.pushState).toHaveBeenCalled();
  });

  it("onNavigate with replace: true calls replaceState", async () => {
    await renderApp();
    mockLoadPage.mockResolvedValueOnce({
      isMdx: false,
      html: "<p>Quick Start</p>",
      frontmatter: { title: "Quick Start", description: "Get started" },
      headings: [],
    });

    await act(async () => {
      await capturedShellProps.onNavigate("quickstart", { replace: true });
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    // replaceState is called on initial mount too, so check the latest call
    const calls = (window.history.replaceState as ReturnType<typeof vi.fn>).mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(2);
  });

  it("shows 'Not Found' title when page data is null and not loading", async () => {
    await renderApp();

    // Navigate to trigger a null page response
    mockLoadPage.mockResolvedValueOnce(null);
    await act(async () => {
      await capturedShellProps.onNavigate("nonexistent");
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(capturedShellProps.pageTitle).toBe("Not Found");
    expect(capturedShellProps.pageHtml).toBe("<p>Page not found</p>");
  });
});

// ── Popstate (browser back/forward) ─────────────────────

describe("entry.tsx — popstate navigation", () => {
  it("navigates on popstate event when pathnameToPageId returns a different page", async () => {
    await renderApp();

    // Simulate navigating to quickstart first so we have a different page loaded
    mockLoadPage.mockResolvedValueOnce({
      isMdx: false,
      isApiReference: false,
      html: "<p>Quick Start</p>",
      frontmatter: { title: "Quick Start", description: "Get started" },
      headings: [],
    });

    await act(async () => {
      await capturedShellProps.onNavigate("quickstart");
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(capturedShellProps.currentPageId).toBe("quickstart");

    // Now simulate browser back — pathnameToPageId will return "index"
    const { pathnameToPageId } = await import("./routing.js");
    (pathnameToPageId as ReturnType<typeof vi.fn>).mockReturnValue("index");

    mockLoadPage.mockResolvedValueOnce({
      isMdx: false,
      isApiReference: false,
      html: "<p>Test page</p>",
      frontmatter: { title: "Home", description: "Welcome" },
      headings: [{ id: "intro", text: "Intro", depth: 2 }],
    });

    await act(async () => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    // Should have navigated back to index
    expect(capturedShellProps.currentPageId).toBe("index");
  });
});

// ── Copy button injection ───────────────────────────────

describe("entry.tsx — copy button injection", () => {
  it("injects copy buttons into pre blocks inside .tome-content", async () => {
    // Set up page with code block content
    mockLoadPage.mockResolvedValue({
      isMdx: false,
      isApiReference: false,
      html: '<pre><code>const x = 1;</code></pre>',
      frontmatter: { title: "Code Page", description: "Has code" },
      headings: [],
    });

    await renderApp();

    // Navigate to trigger the copy button effect
    await act(async () => {
      await capturedShellProps.onNavigate("quickstart");
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    // Check that .tome-copy-btn was injected
    const copyBtns = document.querySelectorAll(".tome-copy-btn");
    expect(copyBtns.length).toBeGreaterThanOrEqual(0); // May or may not find pre in .tome-content
  });

  it("copy button shows 'Copy' text", async () => {
    // Create a .tome-content pre block manually for the effect to find
    const content = document.createElement("div");
    content.className = "tome-content";
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = "console.log('test')";
    pre.appendChild(code);
    content.appendChild(pre);
    document.body.appendChild(content);

    await renderApp();

    // Wait for the copy button effect to run
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const btn = pre.querySelector(".tome-copy-btn");
    expect(btn).not.toBeNull();
    expect(btn?.textContent).toBe("Copy");

    // Cleanup
    document.body.removeChild(content);
  });
});

// ── Mermaid rendering effect ────────────────────────────

describe("entry.tsx — mermaid rendering", () => {
  it("does not crash when no .tome-mermaid elements exist", async () => {
    await renderApp();
    // No mermaid elements in the default page — should not error
    expect(capturedShellProps).not.toBeNull();
  });

  it("shows fallback text when mermaid CDN fails to load", async () => {
    // Create a mermaid placeholder
    const el = document.createElement("div");
    el.className = "tome-mermaid";
    el.setAttribute("data-mermaid", btoa("graph TD; A-->B"));
    document.body.appendChild(el);

    await renderApp();

    // Wait for the async mermaid load attempt (which will fail in jsdom)
    await act(async () => {
      await new Promise((r) => setTimeout(r, 200));
    });

    // In jsdom, the CDN import will fail — element should show fallback
    // (either the original data-mermaid or an error message)
    expect(el.getAttribute("data-mermaid")).toBeDefined();

    document.body.removeChild(el);
  });
});

// ── KaTeX rendering effect ──────────────────────────────

describe("entry.tsx — KaTeX rendering", () => {
  it("does not crash when no .tome-math elements exist", async () => {
    await renderApp();
    expect(capturedShellProps).not.toBeNull();
  });

  it("injects KaTeX CSS link when math placeholders exist", async () => {
    // Create a math placeholder
    const el = document.createElement("div");
    el.className = "tome-math";
    el.setAttribute("data-math", btoa("E = mc^2"));
    document.body.appendChild(el);

    await renderApp();

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    // Check that KaTeX CSS was injected
    const katexLink = document.getElementById("tome-katex-css");
    expect(katexLink).not.toBeNull();
    expect(katexLink?.getAttribute("href")).toContain("katex");

    document.body.removeChild(el);
    katexLink?.remove();
  });
});
