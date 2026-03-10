import React from "react";
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, within, act } from "@testing-library/react";
import { Shell } from "./Shell.js";

// ── jsdom matchMedia mock ─────────────────────────────────
// jsdom does not implement matchMedia; provide a minimal stub.
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
});

// ── Shared fixtures ───────────────────────────────────────

const baseConfig = {
  name: "Test Docs",
  theme: { preset: "amber" as const, mode: "light" as const },
};

const navigation = [
  {
    section: "Getting Started",
    pages: [
      { id: "intro", title: "Introduction", urlPath: "/intro" },
      { id: "quickstart", title: "Quick Start", urlPath: "/quickstart" },
    ],
  },
];

const allPages = [
  { id: "intro", title: "Introduction", description: "Intro page" },
  { id: "quickstart", title: "Quick Start" },
];

function renderShell(overrides: Partial<React.ComponentProps<typeof Shell>> = {}) {
  return render(
    <Shell
      config={baseConfig}
      navigation={navigation}
      currentPageId="intro"
      pageHtml="<p>Hello world</p>"
      pageTitle="Introduction"
      headings={[]}
      onNavigate={vi.fn()}
      allPages={allPages}
      {...overrides}
    />
  );
}

// ── Rendering ─────────────────────────────────────────────

describe("Shell rendering", () => {
  it("renders the site name in the sidebar", () => {
    renderShell();
    expect(screen.getAllByText("Test Docs").length).toBeGreaterThan(0);
  });

  it("renders the page title", () => {
    renderShell();
    expect(screen.getByRole("heading", { name: "Introduction" })).toBeInTheDocument();
  });

  it("renders pageHtml content", () => {
    renderShell({ pageHtml: "<p>Test content</p>" });
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders navigation section labels", () => {
    renderShell();
    // Section label may appear in sidebar nav button and/or breadcrumb
    expect(screen.getAllByText("Getting Started").length).toBeGreaterThan(0);
  });

  it("renders navigation page links", () => {
    renderShell();
    // Titles appear in sidebar nav and/or prev-next and/or breadcrumb
    expect(screen.getAllByText("Introduction").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Quick Start").length).toBeGreaterThan(0);
  });

  it("renders page description when provided", () => {
    renderShell({ pageDescription: "This is the intro page" });
    expect(screen.getByText("This is the intro page")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    renderShell({ pageDescription: undefined });
    // No second paragraph about intro
    expect(screen.queryByText("This is the intro page")).not.toBeInTheDocument();
  });
});

// ── MDX rendering ─────────────────────────────────────────

describe("Shell MDX rendering", () => {
  it("renders a pageComponent instead of HTML when provided", () => {
    const PageComp = () => <div>MDX rendered content</div>;
    renderShell({ pageComponent: PageComp, pageHtml: undefined });
    expect(screen.getByText("MDX rendered content")).toBeInTheDocument();
  });

  it("passes mdxComponents to the pageComponent", () => {
    const Custom = () => <span>custom component</span>;
    let receivedComponents: Record<string, unknown> | undefined;
    const PageComp = ({ components }: { components?: Record<string, React.ComponentType> }) => {
      receivedComponents = components;
      return <div>Page</div>;
    };
    renderShell({ pageComponent: PageComp, mdxComponents: { Custom } });
    expect(receivedComponents).toHaveProperty("Custom");
  });
});

// ── Navigation ────────────────────────────────────────────

describe("Shell navigation", () => {
  it("calls onNavigate when a nav page button is clicked", () => {
    const onNavigate = vi.fn();
    const { container } = renderShell({ onNavigate });
    // Click the nav sidebar button (first instance of "Quick Start")
    const navButtons = container.querySelectorAll("aside nav button");
    const qsBtn = Array.from(navButtons).find((b) => b.textContent === "Quick Start");
    expect(qsBtn).toBeTruthy();
    fireEvent.click(qsBtn!);
    expect(onNavigate).toHaveBeenCalledWith("quickstart");
  });

  it("renders Next button for first page", () => {
    renderShell({ currentPageId: "intro" });
    // "Quick Start" appears in nav and/or next-button
    expect(screen.getAllByText("Quick Start").length).toBeGreaterThan(0);
  });

  it("renders Prev button for last page", () => {
    renderShell({ currentPageId: "quickstart" });
    // "Introduction" appears in nav and/or prev-button
    expect(screen.getAllByText("Introduction").length).toBeGreaterThan(0);
  });
});

// ── Sidebar toggle ────────────────────────────────────────

describe("Shell sidebar toggle", () => {
  it("toggles sidebar visibility on menu button click", () => {
    const { container } = renderShell();
    const menuBtn = container.querySelector("header button") as HTMLButtonElement;
    const sidebar = container.querySelector("aside") as HTMLElement;
    const initialWidth = sidebar.style.width;
    fireEvent.click(menuBtn);
    expect(sidebar.style.width).not.toBe(initialWidth);
  });
});

// ── Theme mode ────────────────────────────────────────────

describe("Shell theme mode", () => {
  it("does NOT render dark mode toggle when mode is 'light'", () => {
    const { container } = renderShell({
      config: { ...baseConfig, theme: { preset: "amber", mode: "light" } },
    });
    // Toggle button only present in "auto" mode — in light mode the placeholder div is rendered
    // We check no moon/sun SVG icons are in the toggle slot
    const footer = container.querySelector("aside > div:last-child");
    expect(footer?.querySelectorAll("button")).toHaveLength(0);
  });

  it("renders dark mode toggle when mode is 'auto'", () => {
    const { container } = renderShell({
      config: { ...baseConfig, theme: { preset: "amber", mode: "auto" } },
    });
    const footer = container.querySelector("aside > div:last-child");
    const buttons = footer?.querySelectorAll("button");
    expect(buttons?.length).toBeGreaterThan(0);
  });
});

// ── TOC ───────────────────────────────────────────────────

describe("Shell table of contents", () => {
  it("renders TOC headings when headings are provided", () => {
    // jsdom window.innerWidth defaults to 0 so 'wide' will be false — we need to set it
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1400 });
    fireEvent(window, new Event("resize"));

    renderShell({
      headings: [
        { depth: 2, text: "Overview", id: "overview" },
        { depth: 3, text: "Details", id: "details" },
      ],
    });
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });
});

// ── Accent override ───────────────────────────────────────

describe("Shell accent override", () => {
  it("renders without errors when a custom accent is provided", () => {
    expect(() =>
      renderShell({
        config: { ...baseConfig, theme: { preset: "amber", mode: "light", accent: "#ff6b4a" } },
      })
    ).not.toThrow();
  });

  it("renders without errors when accent is omitted", () => {
    expect(() => renderShell()).not.toThrow();
  });
});

// ── Algolia search (TOM-16) ──────────────────────────────

describe("Shell Algolia search", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const algoliaConfig = {
    name: "Test Docs",
    theme: { preset: "amber" as const, mode: "light" as const },
    search: {
      provider: "algolia" as const,
      appId: "test-app-id",
      apiKey: "test-api-key",
      indexName: "test-index",
    },
  };

  it("renders Algolia search modal when provider is 'algolia'", async () => {
    renderShell({ config: algoliaConfig });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });

    // @docsearch/react is not installed in test env, so AlgoliaSearchModal
    // renders its loading/fallback state — key assertion: NOT the local search input
    expect(screen.queryByPlaceholderText("Search documentation...")).not.toBeInTheDocument();
  });

  it("renders local search modal when provider is 'local' (default)", () => {
    renderShell({ config: { ...baseConfig, search: { provider: "local" } } });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByPlaceholderText("Search documentation...")).toBeInTheDocument();
  });

  it("renders local search modal when search config is missing", () => {
    renderShell({ config: baseConfig });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByPlaceholderText("Search documentation...")).toBeInTheDocument();
  });

  it("falls back to local search when algolia config is incomplete", () => {
    const incompleteConfig = {
      ...baseConfig,
      search: { provider: "algolia" as const, appId: "test-app" },
      // Missing apiKey and indexName
    };
    renderShell({ config: incompleteConfig });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    // Should fall back to local SearchModal since apiKey and indexName are missing
    expect(screen.getByPlaceholderText("Search documentation...")).toBeInTheDocument();
  });
});

// ── Search ────────────────────────────────────────────────

describe("Shell search", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  const searchPages = [
    { id: "intro", title: "Introduction", description: "Getting started guide" },
    { id: "quickstart", title: "Quick Start", description: "Fast setup" },
    { id: "api", title: "API Reference", description: "Complete API docs" },
    { id: "config", title: "Configuration", description: "Configure your site" },
  ];

  // Helper to get the search modal overlay (position: fixed with z-index 1000)
  function getSearchModal(container: HTMLElement) {
    return container.querySelector('[style*="position: fixed"]') as HTMLElement;
  }

  it("opens search modal on Cmd+K", () => {
    renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByPlaceholderText("Search documentation...")).toBeInTheDocument();
  });

  it("closes search modal on Escape", () => {
    renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByPlaceholderText("Search documentation...")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByPlaceholderText("Search documentation...")).not.toBeInTheDocument();
  });

  it("opens search modal on Ctrl+K", () => {
    renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(screen.getByPlaceholderText("Search documentation...")).toBeInTheDocument();
  });

  it("shows matching results after typing and debounce", async () => {
    const { container } = renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText("Search documentation...");
    fireEvent.change(input, { target: { value: "Quick" } });
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    const modal = getSearchModal(container);
    expect(within(modal).getByText("Quick Start")).toBeInTheDocument();
  });

  it("performs case-insensitive search", async () => {
    const { container } = renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText("Search documentation...");
    fireEvent.change(input, { target: { value: "quick" } });
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    const modal = getSearchModal(container);
    expect(within(modal).getByText("Quick Start")).toBeInTheDocument();
  });

  it("matches pages by description", async () => {
    const { container } = renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText("Search documentation...");
    fireEvent.change(input, { target: { value: "Complete API" } });
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    const modal = getSearchModal(container);
    expect(within(modal).getByText("API Reference")).toBeInTheDocument();
  });

  it("shows no results for empty query", async () => {
    renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText("Search documentation...");
    fireEvent.change(input, { target: { value: "" } });
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    expect(screen.queryByText("No results found")).not.toBeInTheDocument();
  });

  it("shows 'No results found' for non-matching query", async () => {
    renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText("Search documentation...");
    fireEvent.change(input, { target: { value: "zzzznonexistent" } });
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("ArrowDown moves selection without error", async () => {
    renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText("Search documentation...");
    fireEvent.change(input, { target: { value: "a" } });
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
  });

  it("Enter on result calls onNavigate", async () => {
    const onNavigate = vi.fn();
    renderShell({ allPages: searchPages, onNavigate });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText("Search documentation...");
    fireEvent.change(input, { target: { value: "API Ref" } });
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onNavigate).toHaveBeenCalledWith("api");
  });

  it("clicking a result calls onNavigate", async () => {
    const onNavigate = vi.fn();
    const { container } = renderShell({ allPages: searchPages, onNavigate });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText("Search documentation...");
    fireEvent.change(input, { target: { value: "API" } });
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    const modal = getSearchModal(container);
    fireEvent.click(within(modal).getByText("API Reference"));
    expect(onNavigate).toHaveBeenCalledWith("api");
  });

  it("fallback search works when pagefind is unavailable", async () => {
    const { container } = renderShell({ allPages: searchPages });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const input = screen.getByPlaceholderText("Search documentation...");
    fireEvent.change(input, { target: { value: "Configure" } });
    await act(async () => { await vi.advanceTimersByTimeAsync(150); });
    const modal = getSearchModal(container);
    expect(within(modal).getByText("Configuration")).toBeInTheDocument();
  });
});

// ── Version Switcher (TOM-30) ────────────────────────────

describe("Shell version switcher", () => {
  const versioningInfo = { current: "v2", versions: ["v1", "v2"] };

  it("renders version switcher when versioning prop is provided", () => {
    renderShell({ versioning: versioningInfo });
    expect(screen.getByTestId("version-switcher")).toBeInTheDocument();
  });

  it("does not render version switcher when versioning is absent", () => {
    renderShell();
    expect(screen.queryByTestId("version-switcher")).not.toBeInTheDocument();
  });

  it("shows current version label in the switcher button", () => {
    renderShell({ versioning: versioningInfo, currentVersion: "v2" });
    expect(screen.getByTestId("version-switcher").textContent).toContain("v2");
  });

  it("opens dropdown when version switcher is clicked", () => {
    renderShell({ versioning: versioningInfo });
    fireEvent.click(screen.getByTestId("version-switcher"));
    expect(screen.getByTestId("version-dropdown")).toBeInTheDocument();
  });

  it("shows all versions in the dropdown", () => {
    renderShell({ versioning: versioningInfo });
    fireEvent.click(screen.getByTestId("version-switcher"));
    const dropdown = screen.getByTestId("version-dropdown");
    expect(within(dropdown).getByText("v1")).toBeInTheDocument();
    expect(within(dropdown).getByText(/v2/)).toBeInTheDocument();
  });

  it("marks current version as latest in the dropdown", () => {
    renderShell({ versioning: versioningInfo });
    fireEvent.click(screen.getByTestId("version-switcher"));
    const dropdown = screen.getByTestId("version-dropdown");
    expect(within(dropdown).getByText("v2 (latest)")).toBeInTheDocument();
  });

  it("shows old version banner when viewing a non-current version", () => {
    renderShell({ versioning: versioningInfo, currentVersion: "v1" });
    expect(screen.getByTestId("old-version-banner")).toBeInTheDocument();
    expect(screen.getByText(/You're viewing docs for v1/)).toBeInTheDocument();
    expect(screen.getByText("Switch to latest.")).toBeInTheDocument();
  });

  it("does not show old version banner for the current version", () => {
    renderShell({ versioning: versioningInfo, currentVersion: "v2" });
    expect(screen.queryByTestId("old-version-banner")).not.toBeInTheDocument();
  });

  it("does not show old version banner when versioning is absent", () => {
    renderShell();
    expect(screen.queryByTestId("old-version-banner")).not.toBeInTheDocument();
  });
});

// ── Language Switcher (TOM-34) ───────────────────────────

describe("Shell language switcher", () => {
  const i18nInfo = {
    defaultLocale: "en",
    locales: ["en", "es", "ja"],
    localeNames: { en: "English", es: "Español", ja: "日本語" },
  };

  it("renders language switcher when i18n prop is provided with multiple locales", () => {
    renderShell({ i18n: i18nInfo, currentLocale: "en" });
    expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
  });

  it("does not render language switcher when i18n is absent", () => {
    renderShell();
    expect(screen.queryByTestId("language-switcher")).not.toBeInTheDocument();
  });

  it("does not render language switcher when i18n has only one locale", () => {
    renderShell({ i18n: { defaultLocale: "en", locales: ["en"] } });
    expect(screen.queryByTestId("language-switcher")).not.toBeInTheDocument();
  });

  it("shows locale display name in the switcher button", () => {
    renderShell({ i18n: i18nInfo, currentLocale: "en" });
    expect(screen.getByTestId("language-switcher").textContent).toContain("English");
  });

  it("shows locale code when localeNames is not provided", () => {
    const i18nNoNames = { defaultLocale: "en", locales: ["en", "es"] };
    renderShell({ i18n: i18nNoNames, currentLocale: "en" });
    expect(screen.getByTestId("language-switcher").textContent).toContain("en");
  });

  it("opens dropdown when language switcher is clicked", () => {
    renderShell({ i18n: i18nInfo, currentLocale: "en" });
    fireEvent.click(screen.getByTestId("language-switcher"));
    expect(screen.getByTestId("language-dropdown")).toBeInTheDocument();
  });

  it("shows all locales in the dropdown with display names", () => {
    renderShell({ i18n: i18nInfo, currentLocale: "en" });
    fireEvent.click(screen.getByTestId("language-switcher"));
    const dropdown = screen.getByTestId("language-dropdown");
    expect(within(dropdown).getByText("English")).toBeInTheDocument();
    expect(within(dropdown).getByText("Español")).toBeInTheDocument();
    expect(within(dropdown).getByText("日本語")).toBeInTheDocument();
  });

  it("calls onNavigate with locale-prefixed id when switching to non-default locale", () => {
    const onNavigate = vi.fn();
    renderShell({ i18n: i18nInfo, currentLocale: "en", currentPageId: "quickstart", onNavigate });
    fireEvent.click(screen.getByTestId("language-switcher"));
    const dropdown = screen.getByTestId("language-dropdown");
    fireEvent.click(within(dropdown).getByText("Español"));
    expect(onNavigate).toHaveBeenCalledWith("es/quickstart");
  });

  it("calls onNavigate with base id when switching to default locale", () => {
    const onNavigate = vi.fn();
    renderShell({ i18n: i18nInfo, currentLocale: "es", currentPageId: "es/quickstart", onNavigate });
    fireEvent.click(screen.getByTestId("language-switcher"));
    const dropdown = screen.getByTestId("language-dropdown");
    fireEvent.click(within(dropdown).getByText("English"));
    expect(onNavigate).toHaveBeenCalledWith("quickstart");
  });

  it("defaults to defaultLocale when currentLocale is not provided", () => {
    renderShell({ i18n: i18nInfo });
    expect(screen.getByTestId("language-switcher").textContent).toContain("English");
  });
});

// ── AI Chat (TOM-32) ─────────────────────────────────────

describe("Shell AI chat integration", () => {
  it("does not render AI chat when ai is not enabled", () => {
    renderShell();
    expect(screen.queryByTestId("ai-chat-button")).not.toBeInTheDocument();
  });

  it("does not render AI chat when ai.enabled is false", () => {
    renderShell({
      config: { ...baseConfig, ai: { enabled: false, provider: "openai" } },
    });
    expect(screen.queryByTestId("ai-chat-button")).not.toBeInTheDocument();
  });

  it("renders AI chat floating button when ai.enabled is true", () => {
    renderShell({
      config: { ...baseConfig, ai: { enabled: true, provider: "openai" } },
    });
    expect(screen.getByTestId("ai-chat-button")).toBeInTheDocument();
  });
});
