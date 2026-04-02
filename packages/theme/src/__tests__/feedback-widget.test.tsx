import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

// ── Minimal Shell props for feedback widget testing ──────

const baseConfig = {
  name: "Test Docs",
  theme: { preset: "amber", mode: "auto" },
  toc: { enabled: false },
};

const navigation = [{
  section: "Docs",
  pages: [{ id: "test", title: "Test Page", urlPath: "/test" }],
}];

const allPages = [{ id: "test", title: "Test Page", description: "A test page" }];

function renderShell(configOverrides = {}) {
  return render(
    <Shell
      config={{ ...baseConfig, ...configOverrides }}
      navigation={navigation}
      currentPageId="test"
      pageHtml="<h1>Test Page</h1><p>Content here.</p>"
      pageTitle="Test Page"
      headings={[]}
      allPages={allPages}
      onNavigate={() => {}}
    />
  );
}

// ── Setup ────────────────────────────────────────────────

beforeEach(() => {
  localStorage.clear();
  (window as any).__tome = {
    trackFeedback: vi.fn(),
    trackSearch: vi.fn(),
  };
});

// ── Tests ────────────────────────────────────────────────

describe("FeedbackWidget", () => {
  it("renders thumbs up and down buttons by default", () => {
    renderShell();
    expect(screen.getByTestId("feedback-up")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-down")).toBeInTheDocument();
    expect(screen.getByText("Was this helpful?")).toBeInTheDocument();
  });

  it("hides feedback widget when feedback.enabled is false", () => {
    renderShell({ feedback: { enabled: false } });
    expect(screen.queryByTestId("feedback-up")).not.toBeInTheDocument();
    expect(screen.queryByText("Was this helpful?")).not.toBeInTheDocument();
  });

  it("shows thanks message after thumbs up without textInput", () => {
    renderShell();
    fireEvent.click(screen.getByTestId("feedback-up"));
    expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();
    expect(screen.queryByTestId("feedback-up")).not.toBeInTheDocument();
  });

  it("fires trackFeedback on thumbs up without textInput", () => {
    renderShell();
    fireEvent.click(screen.getByTestId("feedback-up"));
    expect((window as any).__tome.trackFeedback).toHaveBeenCalledWith("test", "up");
  });

  it("fires trackFeedback on thumbs down without textInput", () => {
    renderShell();
    fireEvent.click(screen.getByTestId("feedback-down"));
    expect((window as any).__tome.trackFeedback).toHaveBeenCalledWith("test", "down");
  });

  it("stores feedback in localStorage", () => {
    renderShell();
    fireEvent.click(screen.getByTestId("feedback-up"));
    expect(localStorage.getItem("tome-feedback-test")).toBe("up");
  });

  it("shows text input after thumbs up when textInput is enabled", () => {
    renderShell({ feedback: { enabled: true, textInput: true } });
    fireEvent.click(screen.getByTestId("feedback-up"));
    expect(screen.getByTestId("feedback-text-input")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-submit")).toBeInTheDocument();
    expect(screen.getByText("Any additional feedback? (optional)")).toBeInTheDocument();
  });

  it("submits text feedback and shows thanks", () => {
    renderShell({ feedback: { enabled: true, textInput: true } });
    fireEvent.click(screen.getByTestId("feedback-up"));

    const input = screen.getByTestId("feedback-text-input");
    fireEvent.change(input, { target: { value: "Great docs!" } });
    fireEvent.click(screen.getByTestId("feedback-submit"));

    expect((window as any).__tome.trackFeedback).toHaveBeenCalledWith("test", "up", "Great docs!");
    expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();
  });

  it("skip button submits without comment", () => {
    renderShell({ feedback: { enabled: true, textInput: true } });
    fireEvent.click(screen.getByTestId("feedback-down"));
    fireEvent.click(screen.getByText("Skip"));

    expect((window as any).__tome.trackFeedback).toHaveBeenCalledWith("test", "down");
    expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();
  });
});
