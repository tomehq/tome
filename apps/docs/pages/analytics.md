---
title: Analytics
description: Privacy-first, cookie-free page view tracking built into Tome.
---

# Analytics

Tome includes a lightweight analytics script that tracks page views, referrers, and search queries without cookies. The script is under 1KB and runs entirely on first-party infrastructure.

## How It Works

When analytics is enabled, Tome injects a small tracking script into your built pages. The script sends a beacon on each page view with:

- Page URL and referrer
- Screen width (for device breakdown)
- A session ID generated from the date and user agent (no cookies, no fingerprinting)

Search queries and result counts are also tracked when users search your docs.

## Configuration

Enable analytics in `tome.config.js`:

```javascript
export default {
  analytics: {
    provider: "custom",
    key: "your-site-id",
  },
};
```

### Providers

| Provider | Description |
|----------|-------------|
| `"plausible"` | Send events to Plausible Analytics |
| `"posthog"` | Send events to PostHog |
| `"custom"` | Send events to Tome Cloud or your own endpoint |

### Plausible

```javascript
export default {
  analytics: {
    provider: "plausible",
    key: "docs.example.com", // Your Plausible site domain
  },
};
```

### PostHog

```javascript
export default {
  analytics: {
    provider: "posthog",
    key: "phc_your_project_key",
  },
};
```

## Tome Cloud Analytics

Sites deployed to Tome Cloud automatically collect analytics. View your dashboard to see:

- **Total page views** -- aggregate count over a time range
- **Unique visitors** -- deduplicated by session ID
- **Top pages** -- most visited pages ranked by view count
- **Top referrers** -- where your traffic comes from
- **Top search queries** -- what users search for in your docs
- **Views by day** -- daily trend chart

Filter by time range: 7 days, 30 days, or 90 days.

## Privacy

Tome analytics is designed to be privacy-friendly:

- No cookies are set or read
- No personal data is collected or stored
- Session IDs are derived from date + user agent (not persistent across days)
- No cross-site tracking
- All data stays on your infrastructure (Tome Cloud or self-hosted)
- GDPR-compliant by design -- no consent banner needed

## Config Reference

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `analytics.provider` | `"plausible" \| "posthog" \| "custom"` | -- | Analytics provider |
| `analytics.key` | `string` | -- | Provider-specific site ID or project key |
