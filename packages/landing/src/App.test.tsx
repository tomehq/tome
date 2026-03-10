import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "./App.js";

// ── Hero Section ─────────────────────────────────────────

describe("Hero", () => {
  it("renders the site name", () => {
    render(<App />);
    expect(screen.getByText("Tome")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<App />);
    expect(screen.getByText("zero friction")).toBeInTheDocument();
  });

  it("renders the install snippet", () => {
    render(<App />);
    expect(screen.getByText(/npx create-tome my-docs/)).toBeInTheDocument();
  });

  it("renders Get Started CTA links", () => {
    render(<App />);
    const links = screen.getAllByRole("link", { name: "Get Started" });
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});

// ── Features Section ─────────────────────────────────────

describe("Features", () => {
  const featureTitles = [
    "Markdown & MDX",
    "Full-Text Search",
    "API Reference",
    "AI Chat Assistant",
    "Multi-Version Docs",
    "Analytics & Custom Domains",
  ];

  it("renders all 6 feature titles", () => {
    render(<App />);
    for (const title of featureTitles) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });
});

// ── Pricing Section ──────────────────────────────────────

describe("Pricing", () => {
  it("renders the Community tier", () => {
    render(<App />);
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("renders the Cloud tier", () => {
    render(<App />);
    expect(screen.getByText("Cloud")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it("renders the Team tier", () => {
    render(<App />);
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();
  });

  it("renders all 3 pricing tier names", () => {
    render(<App />);
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Cloud")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
  });
});

// ── Footer ───────────────────────────────────────────────

describe("Footer", () => {
  it("renders footer links", () => {
    render(<App />);
    const githubLinks = screen.getAllByRole("link", { name: "GitHub" });
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("link", { name: "Documentation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it('renders "Built with Tome" tagline', () => {
    render(<App />);
    expect(screen.getByText("Built with Tome")).toBeInTheDocument();
  });
});
