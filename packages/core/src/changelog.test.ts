import { describe, it, expect } from "vitest";
import { parseChangelog, getSectionColor, filterEntries } from "./changelog.js";

// ── parseChangelog ──────────────────────────────────────

describe("parseChangelog", () => {
  it("parses a basic changelog with one version", () => {
    const source = `# Changelog

## [1.0.0] - 2025-01-15

### Added
- Initial release
- Core documentation framework

### Fixed
- Fixed typo in README
`;
    const entries = parseChangelog(source);
    expect(entries).toHaveLength(1);
    expect(entries[0].version).toBe("1.0.0");
    expect(entries[0].date).toBe("2025-01-15");
    expect(entries[0].sections).toHaveLength(2);
    expect(entries[0].sections[0].type).toBe("Added");
    expect(entries[0].sections[0].items).toEqual([
      "Initial release",
      "Core documentation framework",
    ]);
    expect(entries[0].sections[1].type).toBe("Fixed");
    expect(entries[0].sections[1].items).toEqual(["Fixed typo in README"]);
  });

  it("parses multiple versions", () => {
    const source = `# Changelog

## [2.0.0] - 2025-06-01

### Added
- New feature

## [1.0.0] - 2025-01-15

### Added
- Initial release
`;
    const entries = parseChangelog(source);
    expect(entries).toHaveLength(2);
    expect(entries[0].version).toBe("2.0.0");
    expect(entries[1].version).toBe("1.0.0");
  });

  it("parses Unreleased section", () => {
    const source = `# Changelog

## [Unreleased]

### Added
- Work in progress feature

## [1.0.0] - 2025-01-15

### Added
- Initial release
`;
    const entries = parseChangelog(source);
    expect(entries).toHaveLength(2);
    expect(entries[0].version).toBe("Unreleased");
    expect(entries[0].date).toBeUndefined();
  });

  it("parses link references", () => {
    const source = `# Changelog

## [1.0.0] - 2025-01-15

### Added
- Feature

[1.0.0]: https://github.com/org/repo/compare/v0.9.0...v1.0.0
`;
    const entries = parseChangelog(source);
    expect(entries[0].url).toBe("https://github.com/org/repo/compare/v0.9.0...v1.0.0");
  });

  it("handles version without brackets", () => {
    const source = `# Changelog

## 1.0.0 - 2025-01-15

### Added
- Feature
`;
    const entries = parseChangelog(source);
    expect(entries).toHaveLength(1);
    expect(entries[0].version).toBe("1.0.0");
    expect(entries[0].date).toBe("2025-01-15");
  });

  it("handles all section types", () => {
    const source = `# Changelog

## [1.0.0] - 2025-01-15

### Added
- New thing

### Changed
- Updated thing

### Deprecated
- Old thing

### Removed
- Gone thing

### Fixed
- Bug fix

### Security
- Patched vulnerability
`;
    const entries = parseChangelog(source);
    expect(entries[0].sections).toHaveLength(6);
    expect(entries[0].sections.map((s) => s.type)).toEqual([
      "Added", "Changed", "Deprecated", "Removed", "Fixed", "Security",
    ]);
  });

  it("returns empty array for empty source", () => {
    const entries = parseChangelog("");
    expect(entries).toHaveLength(0);
  });

  it("returns empty array for source with no versions", () => {
    const source = `# Changelog

All notable changes to this project.
`;
    const entries = parseChangelog(source);
    expect(entries).toHaveLength(0);
  });

  it("handles asterisk list items", () => {
    const source = `## [1.0.0] - 2025-01-15

### Added
* Feature with asterisk
* Another feature
`;
    const entries = parseChangelog(source);
    expect(entries[0].sections[0].items).toEqual([
      "Feature with asterisk",
      "Another feature",
    ]);
  });

  it("ignores empty sections (no items)", () => {
    const source = `## [1.0.0] - 2025-01-15

### Added

### Fixed
- A bug fix
`;
    const entries = parseChangelog(source);
    // "Added" section has no items so it's skipped
    expect(entries[0].sections).toHaveLength(1);
    expect(entries[0].sections[0].type).toBe("Fixed");
  });
});

// ── getSectionColor ─────────────────────────────────────

describe("getSectionColor", () => {
  it("returns green for Added", () => {
    expect(getSectionColor("Added")).toBe("#22c55e");
  });

  it("returns blue for Changed", () => {
    expect(getSectionColor("Changed")).toBe("#3b82f6");
  });

  it("returns red for Removed", () => {
    expect(getSectionColor("Removed")).toBe("#ef4444");
  });

  it("returns purple for Fixed", () => {
    expect(getSectionColor("Fixed")).toBe("#8b5cf6");
  });

  it("returns gray for unknown type", () => {
    expect(getSectionColor("Unknown" as any)).toBe("#6b7280");
  });
});

// ── filterEntries ───────────────────────────────────────

describe("filterEntries", () => {
  const entries = [
    { version: "3.0.0", date: "2025-06-01", sections: [] },
    { version: "2.0.0", date: "2025-03-01", sections: [] },
    { version: "1.0.0", date: "2025-01-01", sections: [] },
  ];

  it("returns all entries when no filter", () => {
    expect(filterEntries(entries)).toHaveLength(3);
  });

  it("limits entries", () => {
    const result = filterEntries(entries, { limit: 2 });
    expect(result).toHaveLength(2);
    expect(result[0].version).toBe("3.0.0");
    expect(result[1].version).toBe("2.0.0");
  });

  it("filters from a specific version", () => {
    const result = filterEntries(entries, { from: "2.0.0" });
    expect(result).toHaveLength(2);
    expect(result[0].version).toBe("3.0.0");
    expect(result[1].version).toBe("2.0.0");
  });

  it("filters to a specific version", () => {
    const result = filterEntries(entries, { to: "2.0.0" });
    expect(result).toHaveLength(2);
    expect(result[0].version).toBe("2.0.0");
    expect(result[1].version).toBe("1.0.0");
  });
});
