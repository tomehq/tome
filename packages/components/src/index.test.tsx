import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Callout, Tabs, Card, CardGroup, Steps, Accordion } from "./index.js";

// ── Callout ───────────────────────────────────────────────

describe("Callout", () => {
  it("renders children", () => {
    render(<Callout>Some info text</Callout>);
    expect(screen.getByText("Some info text")).toBeInTheDocument();
  });

  it("renders optional title", () => {
    render(<Callout title="Heads up">Content</Callout>);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("does not render title element when title is omitted", () => {
    const { container } = render(<Callout>Content</Callout>);
    // No title div should exist
    expect(container.querySelector("[style*='fontWeight: 600']")).toBeNull();
  });

  it("renders all type variants without throwing", () => {
    const types = ["info", "warning", "tip", "danger"] as const;
    for (const type of types) {
      const { unmount } = render(<Callout type={type}>Text</Callout>);
      unmount();
    }
  });

  it("defaults to info type when type is omitted", () => {
    const { container } = render(<Callout>Text</Callout>);
    // info color is #3b82f6 — jsdom normalizes to rgb(59, 130, 246)
    const el = container.firstElementChild as HTMLElement;
    const border = el.style.borderLeft;
    const hasInfoColor = border.includes("#3b82f6") || border.includes("rgb(59, 130, 246)");
    expect(hasInfoColor).toBe(true);
  });
});

// ── Tabs ──────────────────────────────────────────────────

describe("Tabs", () => {
  function renderTabs() {
    return render(
      <Tabs items={["First", "Second", "Third"]}>
        <div>Content A</div>
        <div>Content B</div>
        <div>Content C</div>
      </Tabs>
    );
  }

  it("renders all tab labels", () => {
    renderTabs();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Third")).toBeInTheDocument();
  });

  it("shows first tab content by default", () => {
    renderTabs();
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });

  it("switches content on tab click", () => {
    renderTabs();
    fireEvent.click(screen.getByText("Second"));
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });

  it("shows correct content after switching multiple times", () => {
    renderTabs();
    fireEvent.click(screen.getByText("Third"));
    expect(screen.getByText("Content C")).toBeInTheDocument();
    fireEvent.click(screen.getByText("First"));
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });
});

// ── Card ──────────────────────────────────────────────────

describe("Card", () => {
  it("renders the title", () => {
    render(<Card title="My Card" />);
    expect(screen.getByText("My Card")).toBeInTheDocument();
  });

  it("renders optional icon", () => {
    render(<Card title="Card" icon="🚀" />);
    expect(screen.getByText("🚀")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Card title="Card">Some description</Card>);
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });

  it("wraps in anchor tag when href is provided", () => {
    const { container } = render(<Card title="Card" href="/docs" />);
    const link = container.querySelector("a");
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toBe("/docs");
  });

  it("renders as div (no anchor) when href is omitted", () => {
    const { container } = render(<Card title="Card" />);
    expect(container.querySelector("a")).toBeNull();
  });
});

// ── CardGroup ─────────────────────────────────────────────

describe("CardGroup", () => {
  it("renders children", () => {
    render(
      <CardGroup>
        <Card title="One" />
        <Card title="Two" />
      </CardGroup>
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("uses default cols=2 in grid", () => {
    const { container } = render(
      <CardGroup>
        <Card title="A" />
      </CardGroup>
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toContain("2");
  });

  it("accepts custom cols", () => {
    const { container } = render(
      <CardGroup cols={3}>
        <Card title="A" />
      </CardGroup>
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toContain("3");
  });
});

// ── Steps ─────────────────────────────────────────────────

describe("Steps", () => {
  it("renders step numbers starting at 1", () => {
    render(
      <Steps>
        <div>Step A</div>
        <div>Step B</div>
        <div>Step C</div>
      </Steps>
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders step content", () => {
    render(
      <Steps>
        <p>Install dependencies</p>
        <p>Run the server</p>
      </Steps>
    );
    expect(screen.getByText("Install dependencies")).toBeInTheDocument();
    expect(screen.getByText("Run the server")).toBeInTheDocument();
  });
});

// ── Accordion ─────────────────────────────────────────────

describe("Accordion", () => {
  it("renders the title", () => {
    render(<Accordion title="FAQ Item">Answer here</Accordion>);
    expect(screen.getByText("FAQ Item")).toBeInTheDocument();
  });

  it("hides children by default", () => {
    render(<Accordion title="Q">Hidden answer</Accordion>);
    expect(screen.queryByText("Hidden answer")).not.toBeInTheDocument();
  });

  it("shows children after clicking the title button", () => {
    render(<Accordion title="Q">Answer</Accordion>);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Answer")).toBeInTheDocument();
  });

  it("toggles closed again on second click", () => {
    render(<Accordion title="Q">Content</Accordion>);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(screen.getByText("Content")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });
});
