import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LinkCard, CardGrid } from "./LinkCard";

describe("LinkCard", () => {
  it("renders the title", () => {
    render(<LinkCard href="/docs" title="Documentation" />);
    expect(screen.getByText("Documentation")).toBeInTheDocument();
  });

  it("renders the correct href", () => {
    render(<LinkCard href="/getting-started" title="Get Started" />);
    const link = screen.getByRole("link", { name: /Get Started/ });
    expect(link).toHaveAttribute("href", "/getting-started");
  });

  it("renders description when provided", () => {
    render(<LinkCard href="/docs" title="Docs" description="Read the docs" />);
    expect(screen.getByText("Read the docs")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<LinkCard href="/docs" title="Docs" />);
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders icon when provided", () => {
    render(<LinkCard href="/docs" title="Docs" icon="📚" />);
    expect(screen.getByText("📚")).toBeInTheDocument();
  });

  it("does not render icon when not provided", () => {
    const { container } = render(<LinkCard href="/docs" title="Docs" />);
    // The structure has a flex div with title span and arrow span; no icon span
    const flexDiv = container.querySelector("a > div");
    // Without icon, there should be 2 children (title + arrow), not 3
    expect(flexDiv!.children.length).toBe(2);
  });

  it("external link (http) gets target='_blank' and rel='noopener noreferrer'", () => {
    render(<LinkCard href="https://example.com" title="External" />);
    const link = screen.getByRole("link", { name: /External/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("internal link (relative) has no target or rel", () => {
    render(<LinkCard href="/internal" title="Internal" />);
    const link = screen.getByRole("link", { name: /Internal/ });
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("explicit external=true overrides href detection for relative links", () => {
    render(<LinkCard href="/local-page" title="Forced External" external={true} />);
    const link = screen.getByRole("link", { name: /Forced External/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("explicit external=false overrides href detection for http links", () => {
    render(<LinkCard href="https://example.com" title="Forced Internal" external={false} />);
    const link = screen.getByRole("link", { name: /Forced Internal/ });
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("external link shows '↗' arrow and internal shows '→'", () => {
    const { rerender } = render(<LinkCard href="https://ext.com" title="Ext" />);
    expect(screen.getByText("↗")).toBeInTheDocument();

    rerender(<LinkCard href="/internal" title="Int" />);
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("hover triggers style change via mouseEnter and mouseLeave", () => {
    render(<LinkCard href="/docs" title="Hoverable" />);
    const link = screen.getByRole("link", { name: /Hoverable/ });

    // Mouse enter changes styles
    fireEvent.mouseEnter(link);
    expect(link.style.borderColor).toBe("var(--ac)");
    expect(link.style.background).toBe("var(--sfH)");

    // Mouse leave resets styles
    fireEvent.mouseLeave(link);
    expect(link.style.borderColor).toBe("var(--bd)");
    expect(link.style.background).toBe("var(--sf)");
  });
});

describe("CardGrid", () => {
  it("renders children", () => {
    render(
      <CardGrid>
        <div>Child A</div>
        <div>Child B</div>
      </CardGrid>
    );
    expect(screen.getByText("Child A")).toBeInTheDocument();
    expect(screen.getByText("Child B")).toBeInTheDocument();
  });

  it("defaults to 2 columns", () => {
    const { container } = render(
      <CardGrid>
        <div>Item</div>
      </CardGrid>
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe("repeat(2, 1fr)");
  });

  it("supports custom 3 columns", () => {
    const { container } = render(
      <CardGrid columns={3}>
        <div>Item</div>
      </CardGrid>
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe("repeat(3, 1fr)");
  });

  it("uses grid display layout", () => {
    const { container } = render(
      <CardGrid>
        <div>Item</div>
      </CardGrid>
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.display).toBe("grid");
  });
});
