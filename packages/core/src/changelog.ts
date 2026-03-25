/**
 * Changelog parser for Keep a Changelog format.
 * Parses CHANGELOG.md files into structured entries.
 *
 * @see https://keepachangelog.com/
 */

// ── TYPES ────────────────────────────────────────────────

export interface ChangelogEntry {
  /** Version string, e.g. "1.2.0" or "Unreleased" */
  version: string;
  /** ISO date string, e.g. "2025-01-15" */
  date?: string;
  /** URL for the version (from link references) */
  url?: string;
  /** Categorized changes */
  sections: ChangelogSection[];
}

export interface ChangelogSection {
  /** Section type: Added, Changed, Deprecated, Removed, Fixed, Security */
  type: ChangelogSectionType;
  /** List of changes */
  items: string[];
}

export type ChangelogSectionType =
  | "Added"
  | "Changed"
  | "Deprecated"
  | "Removed"
  | "Fixed"
  | "Security";

const SECTION_TYPES: ChangelogSectionType[] = [
  "Added", "Changed", "Deprecated", "Removed", "Fixed", "Security",
];

// ── PARSER ───────────────────────────────────────────────

/**
 * Parse a Keep a Changelog formatted markdown string into structured entries.
 *
 * Expected format:
 * ```markdown
 * # Changelog
 *
 * ## [1.0.0] - 2025-01-15
 * ### Added
 * - New feature
 *
 * ### Fixed
 * - Bug fix
 *
 * [1.0.0]: https://github.com/org/repo/compare/v0.9.0...v1.0.0
 * ```
 */
export function parseChangelog(source: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  const lines = source.split("\n");

  // Collect link references at end of file: [version]: url
  const linkRefs = new Map<string, string>();
  const linkRefRegex = /^\[([^\]]+)\]:\s+(\S.*)$/;
  for (const line of lines) {
    const match = linkRefRegex.exec(line.trim());
    if (match) {
      linkRefs.set(match[1], match[2].trim());
    }
  }

  let currentEntry: ChangelogEntry | null = null;
  let currentSection: ChangelogSection | null = null;

  // Version heading: ## [1.0.0] - 2025-01-15  OR  ## [Unreleased]  OR  ## 1.0.0 - 2025-01-15
  // Two separate patterns avoid ambiguous backtracking between \s+ and .+
  const versionBracketRegex = /^##\s+\[([^\]\s][^\]]*?)\](?:\s+-\s+(\d{4}-\d{2}-\d{2}))?$/;
  const versionPlainRegex = /^##\s+(\S+)(?:\s+-\s+(\d{4}-\d{2}-\d{2}))?$/;
  // Section heading: ### Added — \S.* ensures no overlap with leading \s+
  const sectionRegex = /^###\s+(\S.*)$/;
  // List item: - something  or * something — \S.* ensures no overlap with leading \s+
  const listItemRegex = /^[-*]\s+(\S.*)$/;

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for version heading (try bracket form first, then plain)
    const versionMatch = versionBracketRegex.exec(trimmed) || versionPlainRegex.exec(trimmed);
    if (versionMatch) {
      // Save previous entry
      if (currentEntry) {
        if (currentSection && currentSection.items.length > 0) {
          currentEntry.sections.push(currentSection);
        }
        entries.push(currentEntry);
      }

      const version = versionMatch[1].trim();
      const date = versionMatch[2] || undefined;

      currentEntry = {
        version,
        date,
        url: linkRefs.get(version) || undefined,
        sections: [],
      };
      currentSection = null;
      continue;
    }

    // Check for section heading (only within a version)
    if (currentEntry) {
      const sectionMatch = sectionRegex.exec(trimmed);
      if (sectionMatch) {
        // Save previous section
        if (currentSection && currentSection.items.length > 0) {
          currentEntry.sections.push(currentSection);
        }

        const sectionName = sectionMatch[1].trim();
        const sectionType = SECTION_TYPES.find(
          (t) => t.toLowerCase() === sectionName.toLowerCase()
        );

        currentSection = {
          type: sectionType || (sectionName as ChangelogSectionType),
          items: [],
        };
        continue;
      }

      // Check for list items
      const listMatch = listItemRegex.exec(trimmed);
      if (listMatch && currentSection) {
        currentSection.items.push(listMatch[1].trim());
        continue;
      }
    }
  }

  // Push final entry
  if (currentEntry) {
    if (currentSection && currentSection.items.length > 0) {
      currentEntry.sections.push(currentSection);
    }
    entries.push(currentEntry);
  }

  return entries;
}

/**
 * Get a color for a changelog section type.
 */
export function getSectionColor(type: ChangelogSectionType): string {
  switch (type) {
    case "Added": return "#22c55e";      // green
    case "Changed": return "#3b82f6";    // blue
    case "Deprecated": return "#f59e0b"; // amber
    case "Removed": return "#ef4444";    // red
    case "Fixed": return "#8b5cf6";      // purple
    case "Security": return "#f97316";   // orange
    default: return "#6b7280";           // gray
  }
}

/**
 * Filter changelog entries by version range.
 */
export function filterEntries(
  entries: ChangelogEntry[],
  options?: { from?: string; to?: string; limit?: number }
): ChangelogEntry[] {
  let result = entries;

  if (options?.from) {
    const fromIdx = result.findIndex((e) => e.version === options.from);
    if (fromIdx >= 0) result = result.slice(0, fromIdx + 1);
  }

  if (options?.to) {
    const toIdx = result.findIndex((e) => e.version === options.to);
    if (toIdx >= 0) result = result.slice(toIdx);
  }

  if (options?.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
}
