import { describe, it, expect } from "vitest";
import {
  generateAnalyticsScript,
  generateSessionId,
  aggregateEvents,
  type PageViewEvent,
  type SearchEvent,
  type AnalyticsEvent,
} from "./analytics.js";

// ── generateAnalyticsScript ──────────────────────────

describe("generateAnalyticsScript", () => {
  it("returns a string containing the endpoint URL", () => {
    const script = generateAnalyticsScript({
      endpoint: "https://example.com/_analytics",
      siteId: "site-123",
    });
    expect(script).toContain("https://example.com/_analytics");
  });

  it("returns script that is less than 1KB", () => {
    const script = generateAnalyticsScript({
      endpoint: "https://example.com/_analytics",
      siteId: "site-123",
    });
    const sizeInBytes = Buffer.byteLength(script, "utf-8");
    expect(sizeInBytes).toBeLessThan(1024);
  });

  it("includes event listener for page load", () => {
    const script = generateAnalyticsScript({
      endpoint: "https://example.com/_analytics",
      siteId: "site-123",
    });
    expect(script).toContain("addEventListener");
    expect(script).toContain("load");
  });
});

// ── generateSessionId ────────────────────────────────

describe("generateSessionId", () => {
  it("returns consistent hash for same inputs", () => {
    const id1 = generateSessionId("2025-01-15", "Mozilla/5.0");
    const id2 = generateSessionId("2025-01-15", "Mozilla/5.0");
    expect(id1).toBe(id2);
  });

  it("returns different hash for different dates", () => {
    const id1 = generateSessionId("2025-01-15", "Mozilla/5.0");
    const id2 = generateSessionId("2025-01-16", "Mozilla/5.0");
    expect(id1).not.toBe(id2);
  });

  it("returns different hash for different user agents", () => {
    const id1 = generateSessionId("2025-01-15", "Mozilla/5.0");
    const id2 = generateSessionId("2025-01-15", "Chrome/120");
    expect(id1).not.toBe(id2);
  });
});

// ── aggregateEvents ──────────────────────────────────

describe("aggregateEvents", () => {
  const makePageView = (
    overrides: Partial<PageViewEvent> = {},
  ): PageViewEvent => ({
    type: "pageview",
    url: "/docs/intro",
    referrer: "https://google.com",
    timestamp: Date.parse("2025-01-15T10:00:00Z"),
    sessionId: "session-1",
    siteId: "site-123",
    userAgent: "Mozilla/5.0",
    screenWidth: 1920,
    ...overrides,
  });

  const makeSearchEvent = (
    overrides: Partial<SearchEvent> = {},
  ): SearchEvent => ({
    type: "search",
    query: "getting started",
    resultsCount: 5,
    timestamp: Date.parse("2025-01-15T10:00:00Z"),
    sessionId: "session-1",
    siteId: "site-123",
    ...overrides,
  });

  it("counts total page views correctly", () => {
    const events: AnalyticsEvent[] = [
      makePageView(),
      makePageView({ url: "/docs/api" }),
      makePageView({ url: "/docs/guide" }),
    ];

    const summary = aggregateEvents(events);
    expect(summary.totalPageViews).toBe(3);
  });

  it("counts unique visitors by sessionId", () => {
    const events: AnalyticsEvent[] = [
      makePageView({ sessionId: "a" }),
      makePageView({ sessionId: "a", url: "/page2" }),
      makePageView({ sessionId: "b" }),
      makePageView({ sessionId: "c" }),
    ];

    const summary = aggregateEvents(events);
    expect(summary.uniqueVisitors).toBe(3);
  });

  it("ranks top pages by view count", () => {
    const events: AnalyticsEvent[] = [
      makePageView({ url: "/docs/intro" }),
      makePageView({ url: "/docs/intro" }),
      makePageView({ url: "/docs/intro" }),
      makePageView({ url: "/docs/api" }),
      makePageView({ url: "/docs/api" }),
      makePageView({ url: "/docs/guide" }),
    ];

    const summary = aggregateEvents(events);
    expect(summary.topPages[0]).toEqual({ url: "/docs/intro", views: 3 });
    expect(summary.topPages[1]).toEqual({ url: "/docs/api", views: 2 });
    expect(summary.topPages[2]).toEqual({ url: "/docs/guide", views: 1 });
  });

  it("ranks top referrers by count", () => {
    const events: AnalyticsEvent[] = [
      makePageView({ referrer: "https://google.com" }),
      makePageView({ referrer: "https://google.com" }),
      makePageView({ referrer: "https://google.com" }),
      makePageView({ referrer: "https://twitter.com" }),
      makePageView({ referrer: "https://twitter.com" }),
      makePageView({ referrer: "https://github.com" }),
    ];

    const summary = aggregateEvents(events);
    expect(summary.topReferrers[0]).toEqual({
      referrer: "https://google.com",
      count: 3,
    });
    expect(summary.topReferrers[1]).toEqual({
      referrer: "https://twitter.com",
      count: 2,
    });
    expect(summary.topReferrers[2]).toEqual({
      referrer: "https://github.com",
      count: 1,
    });
  });

  it("aggregates search events into top queries", () => {
    const events: AnalyticsEvent[] = [
      makeSearchEvent({ query: "api reference" }),
      makeSearchEvent({ query: "api reference" }),
      makeSearchEvent({ query: "api reference" }),
      makeSearchEvent({ query: "getting started" }),
      makeSearchEvent({ query: "getting started" }),
      makeSearchEvent({ query: "deploy" }),
    ];

    const summary = aggregateEvents(events);
    expect(summary.topSearchQueries[0]).toEqual({
      query: "api reference",
      count: 3,
    });
    expect(summary.topSearchQueries[1]).toEqual({
      query: "getting started",
      count: 2,
    });
    expect(summary.topSearchQueries[2]).toEqual({
      query: "deploy",
      count: 1,
    });
  });

  it("groups views by day", () => {
    const events: AnalyticsEvent[] = [
      makePageView({ timestamp: Date.parse("2025-01-15T10:00:00Z") }),
      makePageView({ timestamp: Date.parse("2025-01-15T14:00:00Z") }),
      makePageView({ timestamp: Date.parse("2025-01-16T09:00:00Z") }),
    ];

    const summary = aggregateEvents(events);
    expect(summary.viewsByDay).toEqual([
      { date: "2025-01-15", views: 2 },
      { date: "2025-01-16", views: 1 },
    ]);
  });

  it("handles empty events array", () => {
    const summary = aggregateEvents([]);
    expect(summary.totalPageViews).toBe(0);
    expect(summary.uniqueVisitors).toBe(0);
    expect(summary.topPages).toEqual([]);
    expect(summary.topReferrers).toEqual([]);
    expect(summary.topSearchQueries).toEqual([]);
    expect(summary.viewsByDay).toEqual([]);
  });
});
