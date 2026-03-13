import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChangelogTimeline } from "./Changelog.js";
import type { ChangelogEntry } from "./Changelog.js";

// ── Fixtures ─────────────────────────────────────────────

const sampleEntries: ChangelogEntry[] = [
  {
    version: "1.2.0",
    date: "2025-12-01",
    url: "https://github.com/example/releases/v1.2.0",
    sections: [
      { type: "Added", items: ["New search feature", "Dark mode toggle"] },
      { type: "Fixed", items: ["Fixed sidebar scroll bug"] },
    ],
  },
  {
    version: "1.1.0",
    date: "2025-11-15",
    sections: [
      { type: "Changed", items: ["Updated theme colors"] },
    ],
  },
  {
    version: "1.0.0",
    date: "2025-11-01",
    sections: [
      { type: "Added", items: ["Initial release"] },
    ],
  },
];

// ── Tests ────────────────────────────────────────────────

describe("ChangelogTimeline", () => {
  it("renders empty state when no entries", () => {
    render(<ChangelogTimeline entries={[]} />);
    expect(screen.getByTestId("changelog-empty")).toBeInTheDocument();
    expect(screen.getByText("No changelog entries found.")).toBeInTheDocument();
  });

  it("renders all entries by default", () => {
    render(<ChangelogTimeline entries={sampleEntries} />);
    expect(screen.getByTestId("changelog-timeline")).toBeInTheDocument();
    expect(screen.getByTestId("changelog-entry-1.2.0")).toBeInTheDocument();
    expect(screen.getByTestId("changelog-entry-1.1.0")).toBeInTheDocument();
    expect(screen.getByTestId("changelog-entry-1.0.0")).toBeInTheDocument();
  });

  it("displays version numbers", () => {
    render(<ChangelogTimeline entries={sampleEntries} />);
    expect(screen.getByText("1.2.0")).toBeInTheDocument();
    expect(screen.getByText("1.1.0")).toBeInTheDocument();
    expect(screen.getByText("1.0.0")).toBeInTheDocument();
  });

  it("displays dates", () => {
    render(<ChangelogTimeline entries={sampleEntries} />);
    expect(screen.getByText("2025-12-01")).toBeInTheDocument();
    expect(screen.getByText("2025-11-15")).toBeInTheDocument();
  });

  it("renders version as link when url is provided", () => {
    render(<ChangelogTimeline entries={sampleEntries} />);
    const link = screen.getByText("1.2.0").closest("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/example/releases/v1.2.0");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders version as plain text when no url", () => {
    render(<ChangelogTimeline entries={sampleEntries} />);
    const text = screen.getByText("1.1.0");
    expect(text.closest("a")).toBeNull();
  });

  it("renders section types", () => {
    render(<ChangelogTimeline entries={sampleEntries} />);
    // "Added" appears in multiple entries — use getAllByText
    expect(screen.getAllByText("Added").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Fixed")).toBeInTheDocument();
    expect(screen.getByText("Changed")).toBeInTheDocument();
  });

  it("renders section items", () => {
    render(<ChangelogTimeline entries={sampleEntries} />);
    expect(screen.getByText("New search feature")).toBeInTheDocument();
    expect(screen.getByText("Dark mode toggle")).toBeInTheDocument();
    expect(screen.getByText("Fixed sidebar scroll bug")).toBeInTheDocument();
    expect(screen.getByText("Updated theme colors")).toBeInTheDocument();
  });

  it("limits visible entries with initialLimit", () => {
    render(<ChangelogTimeline entries={sampleEntries} initialLimit={1} />);
    expect(screen.getByTestId("changelog-entry-1.2.0")).toBeInTheDocument();
    expect(screen.queryByTestId("changelog-entry-1.1.0")).not.toBeInTheDocument();
    expect(screen.queryByTestId("changelog-entry-1.0.0")).not.toBeInTheDocument();
  });

  it("shows 'Show more' button when entries are limited", () => {
    render(<ChangelogTimeline entries={sampleEntries} initialLimit={1} />);
    const btn = screen.getByTestId("changelog-show-more");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("Show all 3 releases");
  });

  it("expands all entries when Show more is clicked", () => {
    render(<ChangelogTimeline entries={sampleEntries} initialLimit={1} />);
    fireEvent.click(screen.getByTestId("changelog-show-more"));
    expect(screen.getByTestId("changelog-entry-1.2.0")).toBeInTheDocument();
    expect(screen.getByTestId("changelog-entry-1.1.0")).toBeInTheDocument();
    expect(screen.getByTestId("changelog-entry-1.0.0")).toBeInTheDocument();
    expect(screen.queryByTestId("changelog-show-more")).not.toBeInTheDocument();
  });

  it("does not show Show more button when all entries are visible", () => {
    render(<ChangelogTimeline entries={sampleEntries} />);
    expect(screen.queryByTestId("changelog-show-more")).not.toBeInTheDocument();
  });

  it("handles entry without date", () => {
    const entries: ChangelogEntry[] = [
      { version: "Unreleased", sections: [{ type: "Added", items: ["WIP feature"] }] },
    ];
    render(<ChangelogTimeline entries={entries} />);
    expect(screen.getByText("Unreleased")).toBeInTheDocument();
    expect(screen.getByText("WIP feature")).toBeInTheDocument();
  });

  it("handles unknown section type with fallback color", () => {
    const entries: ChangelogEntry[] = [
      { version: "1.0.0", sections: [{ type: "Custom", items: ["Custom change"] }] },
    ];
    render(<ChangelogTimeline entries={entries} />);
    expect(screen.getByText("Custom")).toBeInTheDocument();
    expect(screen.getByText("Custom change")).toBeInTheDocument();
  });
});
