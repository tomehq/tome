import React, { useState } from "react";

// ── TYPES ────────────────────────────────────────────────

export interface ChangelogEntry {
  version: string;
  date?: string;
  url?: string;
  sections: ChangelogSection[];
}

export interface ChangelogSection {
  type: string;
  items: string[];
}

// ── SECTION COLORS ──────────────────────────────────────

const SECTION_COLORS: Record<string, string> = {
  Added: "#22c55e",
  Changed: "#3b82f6",
  Deprecated: "#f59e0b",
  Removed: "#ef4444",
  Fixed: "#8b5cf6",
  Security: "#f97316",
};

function getSectionColor(type: string): string {
  return SECTION_COLORS[type] || "#6b7280";
}

// ── CHANGELOG TIMELINE ──────────────────────────────────

export interface ChangelogTimelineProps {
  entries: ChangelogEntry[];
  /** Max entries to show initially (default: all) */
  initialLimit?: number;
}

export function ChangelogTimeline({ entries, initialLimit }: ChangelogTimelineProps) {
  const [showAll, setShowAll] = useState(!initialLimit);
  const visible = showAll ? entries : entries.slice(0, initialLimit || entries.length);

  if (entries.length === 0) {
    return (
      <div data-testid="changelog-empty" style={{ padding: "40px 0", textAlign: "center", color: "var(--txM)", fontSize: 14 }}>
        No changelog entries found.
      </div>
    );
  }

  return (
    <div data-testid="changelog-timeline" style={{ position: "relative" }}>
      {/* Vertical timeline line */}
      <div style={{
        position: "absolute", left: 15, top: 8, bottom: 8, width: 2,
        background: "var(--bd)",
      }} />

      {visible.map((entry, i) => (
        <div
          key={entry.version}
          data-testid={`changelog-entry-${entry.version}`}
          style={{ position: "relative", paddingLeft: 44, paddingBottom: i < visible.length - 1 ? 32 : 0 }}
        >
          {/* Timeline dot */}
          <div style={{
            position: "absolute", left: 8, top: 6,
            width: 16, height: 16, borderRadius: "50%",
            background: entry.version === "Unreleased" ? "var(--txM)" : "var(--ac)",
            border: "3px solid var(--bg, #1a1a1a)",
          }} />

          {/* Version badge + date */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
            <span style={{
              fontSize: 18, fontWeight: 700, color: "var(--tx)",
              fontFamily: "var(--font-heading, inherit)",
            }}>
              {entry.url ? (
                <a href={entry.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                  {entry.version}
                </a>
              ) : entry.version}
            </span>
            {entry.date && (
              <span style={{ fontSize: 13, color: "var(--txM)", fontFamily: "var(--font-code, monospace)" }}>
                {entry.date}
              </span>
            )}
          </div>

          {/* Change sections */}
          {entry.sections.map((section) => (
            <div key={section.type} style={{ marginBottom: 16 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8,
              }}>
                <span style={{
                  display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                  background: getSectionColor(section.type),
                }} />
                <span style={{
                  fontSize: 12, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: ".06em", color: getSectionColor(section.type),
                  fontFamily: "var(--font-code, monospace)",
                }}>
                  {section.type}
                </span>
              </div>
              <ul style={{
                margin: 0, paddingLeft: 18,
                listStyleType: "disc", color: "var(--tx2)",
              }}>
                {section.items.map((item, j) => (
                  <li key={j} style={{
                    fontSize: 14, lineHeight: 1.7, color: "var(--tx2)",
                    marginBottom: 2,
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {/* Show more button */}
      {!showAll && entries.length > (initialLimit || 0) && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            data-testid="changelog-show-more"
            onClick={() => setShowAll(true)}
            style={{
              background: "none", border: "1px solid var(--bd)", borderRadius: 2,
              padding: "8px 20px", color: "var(--tx2)", fontSize: 13,
              fontFamily: "var(--font-body, inherit)", cursor: "pointer",
              transition: "border-color .15s, color .15s",
            }}
          >
            Show all {entries.length} releases
          </button>
        </div>
      )}
    </div>
  );
}
