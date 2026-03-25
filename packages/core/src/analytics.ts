import { createHash } from "node:crypto";

// ── EVENT TYPES ───────────────────────────────────────

export interface PageViewEvent {
  type: "pageview";
  url: string;
  referrer: string;
  timestamp: number;
  sessionId: string;
  siteId: string;
  userAgent: string;
  screenWidth: number;
}

export interface SearchEvent {
  type: "search";
  query: string;
  resultsCount: number;
  timestamp: number;
  sessionId: string;
  siteId: string;
}

export type AnalyticsEvent = PageViewEvent | SearchEvent;

// ── AGGREGATION ───────────────────────────────────────

export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  topPages: Array<{ url: string; views: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  topSearchQueries: Array<{ query: string; count: number }>;
  viewsByDay: Array<{ date: string; views: number }>;
}

// ── CLIENT SCRIPT ─────────────────────────────────────

/**
 * Generate the lightweight analytics client script (<1KB).
 * This script collects page views without cookies (privacy-first).
 */
export function generateAnalyticsScript(options: {
  endpoint: string;
  siteId: string;
}): string {
  // Minified inline script - no cookies, privacy-first
  return `<script>(function(){var e="${options.endpoint}",s="${options.siteId}";function h(d,u){for(var i=0,a=d+u,j=0;j<a.length;j++){i=((i<<5)-i)+a.charCodeAt(j);i|=0}return"s"+Math.abs(i).toString(36)}var d=new Date().toISOString().slice(0,10);var sid=h(d,navigator.userAgent);function t(){var p={type:"pageview",url:location.href,referrer:document.referrer,timestamp:Date.now(),sessionId:sid,siteId:s,userAgent:navigator.userAgent,screenWidth:screen.width};try{navigator.sendBeacon(e,JSON.stringify(p))}catch(x){var r=new XMLHttpRequest();r.open("POST",e);r.setRequestHeader("Content-Type","application/json");r.send(JSON.stringify(p))}}if(document.readyState==="complete"){t()}else{window.addEventListener("load",t)}})()</script>`;
}

// ── AGGREGATION ───────────────────────────────────────

/**
 * Aggregate raw events into a summary.
 */
export function aggregateEvents(events: AnalyticsEvent[]): AnalyticsSummary {
  const pageViews = events.filter(
    (e): e is PageViewEvent => e.type === "pageview",
  );
  const searchEvents = events.filter(
    (e): e is SearchEvent => e.type === "search",
  );

  // Total page views
  const totalPageViews = pageViews.length;

  // Unique visitors by sessionId
  const uniqueSessions = new Set(pageViews.map((e) => e.sessionId));
  const uniqueVisitors = uniqueSessions.size;

  // Top pages by view count
  const pageCounts = new Map<string, number>();
  for (const e of pageViews) {
    pageCounts.set(e.url, (pageCounts.get(e.url) || 0) + 1);
  }
  const topPages = Array.from(pageCounts.entries())
    .map(([url, views]) => ({ url, views }))
    .sort((a, b) => b.views - a.views);

  // Top referrers by count
  const referrerCounts = new Map<string, number>();
  for (const e of pageViews) {
    if (e.referrer) {
      referrerCounts.set(
        e.referrer,
        (referrerCounts.get(e.referrer) || 0) + 1,
      );
    }
  }
  const topReferrers = Array.from(referrerCounts.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count);

  // Top search queries
  const queryCounts = new Map<string, number>();
  for (const e of searchEvents) {
    queryCounts.set(e.query, (queryCounts.get(e.query) || 0) + 1);
  }
  const topSearchQueries = Array.from(queryCounts.entries())
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count);

  // Views by day
  const dayCounts = new Map<string, number>();
  for (const e of pageViews) {
    const date = new Date(e.timestamp).toISOString().slice(0, 10);
    dayCounts.set(date, (dayCounts.get(date) || 0) + 1);
  }
  const viewsByDay = Array.from(dayCounts.entries())
    .map(([date, views]) => ({ date, views }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalPageViews,
    uniqueVisitors,
    topPages,
    topReferrers,
    topSearchQueries,
    viewsByDay,
  };
}

// ── SESSION ID ────────────────────────────────────────

/**
 * Generate a unique session ID (no cookies - based on daily rotation).
 * Uses a hash of date + user-agent to approximate unique visitors.
 */
export function generateSessionId(date: string, userAgent: string): string {
  const hash = createHash("sha256")
    .update(date + userAgent)
    .digest("hex");
  return hash.slice(0, 16);
}
