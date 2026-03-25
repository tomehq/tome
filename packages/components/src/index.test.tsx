import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Callout, Tabs, Card, CardGroup, Steps, Accordion, PackageManager, TypeTable, FileTree, LinkCard, CardGrid } from "./index.js";

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

// ── PackageManager ──────────────────────────────────────

describe("PackageManager", () => {
  it("renders all 4 package manager tabs", () => {
    render(<PackageManager command="install lodash" />);
    expect(screen.getByText("npm")).toBeInTheDocument();
    expect(screen.getByText("yarn")).toBeInTheDocument();
    expect(screen.getByText("pnpm")).toBeInTheDocument();
    expect(screen.getByText("bun")).toBeInTheDocument();
  });

  it("shows npm command by default", () => {
    render(<PackageManager command="install lodash" />);
    expect(screen.getByText("npm install lodash")).toBeInTheDocument();
  });

  it("switches to yarn and shows correct translated command", () => {
    render(<PackageManager command="install lodash" />);
    fireEvent.click(screen.getByText("yarn"));
    expect(screen.getByText("yarn add lodash")).toBeInTheDocument();
  });

  it("switches to pnpm and shows correct translated command", () => {
    render(<PackageManager command="install lodash" />);
    fireEvent.click(screen.getByText("pnpm"));
    expect(screen.getByText("pnpm add lodash")).toBeInTheDocument();
  });

  it("switches to bun and shows correct translated command", () => {
    render(<PackageManager command="install lodash" />);
    fireEvent.click(screen.getByText("bun"));
    expect(screen.getByText("bun add lodash")).toBeInTheDocument();
  });

  it("handles install -D translation correctly", () => {
    render(<PackageManager command="install -D vitest" />);
    expect(screen.getByText("npm install -D vitest")).toBeInTheDocument();
    fireEvent.click(screen.getByText("bun"));
    expect(screen.getByText("bun add -D vitest")).toBeInTheDocument();
  });

  it("renders a copy button", () => {
    render(<PackageManager command="install lodash" />);
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });
});

// ── TypeTable ───────────────────────────────────────────

describe("TypeTable", () => {
  const fields = [
    { name: "title", type: "string", required: true, default: undefined, description: "The page title" },
    { name: "color", type: "string", required: false, default: '"blue"', description: "Primary color" },
    { name: "count", type: "number", required: false },
  ];

  it("renders table with property name and type columns", () => {
    render(<TypeTable name="Config" fields={fields} />);
    expect(screen.getByText("Property")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("color")).toBeInTheDocument();
  });

  it("shows required badge for required fields", () => {
    render(<TypeTable name="Config" fields={fields} />);
    expect(screen.getByText("required")).toBeInTheDocument();
  });

  it("shows default value when provided", () => {
    render(<TypeTable name="Config" fields={fields} />);
    expect(screen.getByText('"blue"')).toBeInTheDocument();
  });

  it("shows description when provided", () => {
    render(<TypeTable name="Config" fields={fields} />);
    expect(screen.getByText("The page title")).toBeInTheDocument();
    expect(screen.getByText("Primary color")).toBeInTheDocument();
  });

  it('shows "—" for missing default value', () => {
    render(<TypeTable name="Config" fields={fields} />);
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the type name heading", () => {
    render(<TypeTable name="Config" fields={fields} />);
    expect(screen.getByText("Config")).toBeInTheDocument();
  });
});

// ── FileTree ────────────────────────────────────────────

describe("FileTree", () => {
  it("renders the container", () => {
    const { container } = render(
      <FileTree>
        <FileTree.File name="index.ts" />
      </FileTree>
    );
    expect(container.firstElementChild).toBeTruthy();
  });

  it("FileTree.File renders file name with icon", () => {
    render(
      <FileTree>
        <FileTree.File name="README.md" />
      </FileTree>
    );
    expect(screen.getByText("README.md")).toBeInTheDocument();
    expect(screen.getByText("📄")).toBeInTheDocument();
  });

  it("FileTree.Folder renders folder name and is collapsed by default", () => {
    render(
      <FileTree>
        <FileTree.Folder name="src">
          <FileTree.File name="app.ts" />
        </FileTree.Folder>
      </FileTree>
    );
    expect(screen.getByText("src")).toBeInTheDocument();
    expect(screen.queryByText("app.ts")).not.toBeInTheDocument();
  });

  it("FileTree.Folder expands when clicked", () => {
    render(
      <FileTree>
        <FileTree.Folder name="src">
          <FileTree.File name="app.ts" />
        </FileTree.Folder>
      </FileTree>
    );
    fireEvent.click(screen.getByText("src"));
    expect(screen.getByText("app.ts")).toBeInTheDocument();
  });

  it("FileTree.Folder with defaultOpen renders expanded initially", () => {
    render(
      <FileTree>
        <FileTree.Folder name="lib" defaultOpen>
          <FileTree.File name="utils.ts" />
        </FileTree.Folder>
      </FileTree>
    );
    expect(screen.getByText("utils.ts")).toBeInTheDocument();
  });
});

// ── LinkCard ─────────────────────────────────────────────

describe("LinkCard", () => {
  it("renders title and href", () => {
    const { container } = render(<LinkCard href="/docs/config" title="Configuration" />);
    const link = container.querySelector("a");
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toBe("/docs/config");
    expect(screen.getByText("Configuration")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<LinkCard href="/docs" title="Guide" description="Learn the basics" />);
    expect(screen.getByText("Learn the basics")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    const { container } = render(<LinkCard href="/docs" title="Guide" />);
    expect(container.querySelectorAll("p").length).toBe(0);
  });

  it("renders icon when provided", () => {
    render(<LinkCard href="/docs" title="Guide" icon="📖" />);
    expect(screen.getByText("📖")).toBeInTheDocument();
  });

  it("adds target=_blank for external links", () => {
    const { container } = render(<LinkCard href="https://example.com" title="External" />);
    const link = container.querySelector("a");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("does not add target=_blank for internal links", () => {
    const { container } = render(<LinkCard href="/docs/intro" title="Internal" />);
    const link = container.querySelector("a");
    expect(link?.getAttribute("target")).toBeNull();
    expect(link?.getAttribute("rel")).toBeNull();
  });

  it("respects explicit external prop", () => {
    const { container } = render(<LinkCard href="/api" title="API" external />);
    const link = container.querySelector("a");
    expect(link?.getAttribute("target")).toBe("_blank");
  });

  it("shows → for internal links", () => {
    render(<LinkCard href="/docs" title="Next" />);
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("shows ↗ for external links", () => {
    render(<LinkCard href="https://example.com" title="Visit" />);
    expect(screen.getByText("↗")).toBeInTheDocument();
  });
});

// ── CardGrid ─────────────────────────────────────────────

describe("CardGrid", () => {
  it("renders children in grid layout", () => {
    const { container } = render(
      <CardGrid>
        <div>Child A</div>
        <div>Child B</div>
      </CardGrid>
    );
    expect(screen.getByText("Child A")).toBeInTheDocument();
    expect(screen.getByText("Child B")).toBeInTheDocument();
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.display).toBe("grid");
  });

  it("defaults to 2 columns", () => {
    const { container } = render(
      <CardGrid>
        <div>A</div>
      </CardGrid>
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toContain("2");
  });

  it("accepts custom columns", () => {
    const { container } = render(
      <CardGrid columns={3}>
        <div>A</div>
      </CardGrid>
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toContain("3");
  });
});
