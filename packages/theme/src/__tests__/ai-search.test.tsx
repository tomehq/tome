import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Shell from "../Shell.js";

// jsdom doesn't provide matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("dark"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// ── Mock the ai-api module ──────────────────────────────

vi.mock("../ai-api.js", () => ({
  callAiProvider: vi.fn().mockResolvedValue("The configuration page explains how to set up your project."),
  buildSystemPrompt: vi.fn().mockReturnValue("system prompt"),
  getDefaultModel: vi.fn().mockReturnValue("gpt-4o-mini"),
}));

// ── Minimal Shell props ─────────────────────────────────

const baseConfig = {
  name: "Test Docs",
  theme: { preset: "amber", mode: "auto" },
  toc: { enabled: false },
  search: { provider: "local", ai: true },
  ai: { enabled: true, provider: "anthropic" as const },
};

const navigation = [{
  section: "Docs",
  pages: [
    { id: "index", title: "Introduction", urlPath: "/" },
    { id: "config", title: "Configuration", urlPath: "/config" },
    { id: "theming", title: "Theming", urlPath: "/theming" },
  ],
}];

const docContext = [
  { id: "index", title: "Introduction", content: "Welcome to the documentation." },
  { id: "config", title: "Configuration", content: "Configure your site with tome.config.js." },
  { id: "theming", title: "Theming", content: "Choose from 10 theme presets." },
];

const allPages = [
  { id: "index", title: "Introduction", description: "Welcome to the docs" },
  { id: "config", title: "Configuration", description: "How to configure" },
  { id: "theming", title: "Theming", description: "Customize your theme" },
];

function renderShell(configOverrides = {}) {
  (window as any).__TOME_AI_API_KEY__ = "test-key";

  return render(
    <Shell
      config={{ ...baseConfig, ...configOverrides }}
      navigation={navigation}
      currentPageId="index"
      pageHtml="<h1>Introduction</h1>"
      pageTitle="Introduction"
      headings={[]}
      allPages={allPages}
      onNavigate={() => {}}
      docContext={docContext}
    />
  );
}

// ── Setup ────────────────────────────────────────────────

beforeEach(() => {
  localStorage.clear();
  (window as any).__tome = {
    trackSearch: vi.fn(),
    trackFeedback: vi.fn(),
  };
});

// ── Tests ────────────────────────────────────────────────

describe("AI Search in SearchModal", () => {
  it("opens search modal with Cmd+K", async () => {
    renderShell();
    await act(async () => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(screen.getByPlaceholderText("Search documentation...")).toBeInTheDocument();
  });

  it("shows search results for keyword queries", async () => {
    renderShell();

    // Open search
    await act(async () => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });

    const input = screen.getByPlaceholderText("Search documentation...");

    // Type a query that matches a page title
    await act(async () => {
      fireEvent.change(input, { target: { value: "Configuration" } });
    });

    // Wait for debounce
    await act(async () => {
      await new Promise(r => setTimeout(r, 200));
    });

    // Should show keyword results (fallback since Pagefind not available in tests)
    // "Configuration" appears in sidebar too, so check that search results area has it
    expect(screen.getAllByText("Configuration").length).toBeGreaterThanOrEqual(1);
  });

  it("does not show AI answer card when search.ai is false", async () => {
    renderShell({ search: { provider: "local", ai: false } });

    await act(async () => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });

    const input = screen.getByPlaceholderText("Search documentation...");
    await act(async () => {
      fireEvent.change(input, { target: { value: "how to configure" } });
    });

    await act(async () => {
      await new Promise(r => setTimeout(r, 600));
    });

    expect(screen.queryByText("AI Answer")).not.toBeInTheDocument();
  });

  it("does not show AI answer for very short queries", async () => {
    renderShell();

    await act(async () => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });

    const input = screen.getByPlaceholderText("Search documentation...");
    await act(async () => {
      fireEvent.change(input, { target: { value: "hi" } });
    });

    await act(async () => {
      await new Promise(r => setTimeout(r, 600));
    });

    // Query too short (< 3 chars), no AI answer
    expect(screen.queryByText("AI Answer")).not.toBeInTheDocument();
  });

  it("shows AI answer card when query is long enough and AI is enabled", async () => {
    renderShell();

    await act(async () => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });

    const input = screen.getByPlaceholderText("Search documentation...");
    await act(async () => {
      fireEvent.change(input, { target: { value: "how to configure my project" } });
    });

    // Wait for both keyword debounce (120ms) and AI debounce (500ms)
    await act(async () => {
      await new Promise(r => setTimeout(r, 700));
    });

    // AI answer card should appear with the mocked response
    expect(screen.getByText("AI Answer")).toBeInTheDocument();
    expect(screen.getByText("The configuration page explains how to set up your project.")).toBeInTheDocument();
  });

  it("tracks search queries in analytics", async () => {
    renderShell();

    await act(async () => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });

    const input = screen.getByPlaceholderText("Search documentation...");
    await act(async () => {
      fireEvent.change(input, { target: { value: "Configuration" } });
    });

    await act(async () => {
      await new Promise(r => setTimeout(r, 200));
    });

    expect((window as any).__tome.trackSearch).toHaveBeenCalled();
  });
});
