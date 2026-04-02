---
title: Search and Feedback Analytics
description: Track search queries, zero-result searches, and page feedback automatically.
---

When analytics is configured, Tome automatically tracks search queries and feedback events alongside page views. This helps you understand what readers are looking for and which pages need improvement.

## Setup

Search and feedback analytics work automatically when you have analytics configured:

```js
// tome.config.js
export default {
  name: "My Docs",
  analytics: {
    provider: "posthog", // or "plausible", "custom"
    key: "your-key",
  },
};
```

No additional configuration is needed. The analytics script (< 1KB, no cookies) exposes tracking functions on `window.__tome` that the search modal and feedback widget call automatically.

## What gets tracked

### Search events

Every search query is recorded with:

| Field | Description |
|-------|-------------|
| `query` | The search term entered by the reader |
| `resultsCount` | Number of results returned |
| `timestamp` | When the search occurred |
| `sessionId` | Anonymous session identifier (no cookies) |

### Zero-result queries

Searches that return zero results are flagged separately in aggregation. This is the most actionable metric. It tells you what readers expect to find but cannot.

### Feedback events

Every feedback interaction is recorded with:

| Field | Description |
|-------|-------------|
| `pageId` | The page that was rated |
| `rating` | `up` or `down` |
| `comment` | Optional text feedback (when `feedback.textInput` is enabled) |
| `timestamp` | When the feedback was submitted |

## Client-side API

The analytics script exposes two functions on `window.__tome`:

### `trackSearch(query, resultsCount)`

Called automatically by the search modal after each search. You can also call it from custom search integrations:

```js
window.__tome.trackSearch("authentication", 5);
```

### `trackFeedback(pageId, rating, comment?)`

Called automatically by the feedback widget. You can also call it programmatically:

```js
window.__tome.trackFeedback("/quickstart", "up");
window.__tome.trackFeedback("/api-reference", "down", "Missing examples");
```

## Aggregated metrics

The analytics backend aggregates events into these summary metrics:

- **Top search queries** ranked by frequency
- **Zero-result queries** ranked by frequency
- **Total searches** count
- **Total feedback** count
- **Feedback by rating** (up vs. down)
- **Top pages** by view count
- **Unique visitors** by session
- **Views by day** time series

## Privacy

The analytics script uses no cookies. Session IDs are generated from a daily hash of the date and user agent, which provides approximate unique visitor counts without tracking individuals across days. All data is first-party and stays on your analytics provider.
