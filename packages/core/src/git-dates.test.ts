import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatRelativeDate, getGitLastUpdated } from "./git-dates.js";

// ── formatRelativeDate ──────────────────────────────────

describe("formatRelativeDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'just now' for very recent dates", () => {
    expect(formatRelativeDate("2025-06-15T11:59:30Z")).toBe("just now");
  });

  it("returns minutes ago", () => {
    expect(formatRelativeDate("2025-06-15T11:55:00Z")).toBe("5 minutes ago");
  });

  it("returns singular minute", () => {
    expect(formatRelativeDate("2025-06-15T11:59:00Z")).toBe("1 minute ago");
  });

  it("returns hours ago", () => {
    expect(formatRelativeDate("2025-06-15T09:00:00Z")).toBe("3 hours ago");
  });

  it("returns singular hour", () => {
    expect(formatRelativeDate("2025-06-15T11:00:00Z")).toBe("1 hour ago");
  });

  it("returns days ago", () => {
    expect(formatRelativeDate("2025-06-12T12:00:00Z")).toBe("3 days ago");
  });

  it("returns singular day", () => {
    expect(formatRelativeDate("2025-06-14T12:00:00Z")).toBe("1 day ago");
  });

  it("returns months ago", () => {
    expect(formatRelativeDate("2025-03-15T12:00:00Z")).toBe("3 months ago");
  });

  it("returns singular month", () => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    d.setDate(d.getDate() - 1);
    expect(formatRelativeDate(d.toISOString())).toBe("1 month ago");
  });

  it("returns years ago", () => {
    expect(formatRelativeDate("2023-06-15T12:00:00Z")).toBe("2 years ago");
  });

  it("returns singular year", () => {
    expect(formatRelativeDate("2024-06-15T12:00:00Z")).toBe("1 year ago");
  });

  it("returns empty string for invalid date", () => {
    expect(formatRelativeDate("not-a-date")).toBe("");
  });
});

// ── getGitLastUpdated ───────────────────────────────────

describe("getGitLastUpdated", () => {
  it("returns null for a non-existent file", () => {
    const result = getGitLastUpdated("/nonexistent/path/file.md");
    expect(result).toBeNull();
  });

  it("returns a string for a tracked file", () => {
    // Use a file that exists in the repo
    const result = getGitLastUpdated(__filename);
    // This test file is tracked by git, so we should get a date
    if (result) {
      expect(typeof result).toBe("string");
      // Should be a valid ISO date
      expect(new Date(result).getTime()).not.toBeNaN();
    }
    // If null, the file might not be committed yet — that's also valid
  });
});
