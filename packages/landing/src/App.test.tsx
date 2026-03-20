import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "./App.js";

// ── Hero Section ─────────────────────────────────────────

describe("Hero", () => {
  it("renders the site name", () => {
    render(<App />);
    // Logo renders "Tome." as a single text node
    expect(screen.getAllByText("Tome.").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the tagline", () => {
    render(<App />);
    expect(screen.getByText("zero friction.")).toBeInTheDocument();
  });

  it("renders Get Started CTA links", () => {
    render(<App />);
    const links = screen.getAllByText("Get Started");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});

// ── Features Section ─────────────────────────────────────

describe("Features", () => {
  const featureTitles = [
    "CI/CD Integration",
    "Custom Domains",
    "DX-first",
    "Semantic Search",
  ];

  it("renders all 4 feature titles", () => {
    render(<App />);
    for (const title of featureTitles) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it("renders the section heading", () => {
    render(<App />);
    expect(screen.getByText("Crafted for the Technical Mind")).toBeInTheDocument();
  });
});

// ── CTA Section ─────────────────────────────────────────

describe("CTA", () => {
  it("renders the CTA heading", () => {
    render(<App />);
    expect(screen.getByText(/Ready to build your legacy/)).toBeInTheDocument();
  });

  it("renders Get Started for Free button", () => {
    render(<App />);
    expect(screen.getByText("Get Started for Free")).toBeInTheDocument();
  });
});

// ── Navigation ──────────────────────────────────────────

describe("Navigation", () => {
  it("renders nav links", () => {
    render(<App />);
    expect(screen.getByText("Guide")).toBeInTheDocument();
    expect(screen.getAllByText("GitHub").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});
