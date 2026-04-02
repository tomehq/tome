---
title: White Labeling
description: Remove Tome branding from your documentation site for a fully custom appearance.
---

By default, Tome includes subtle branding in generated metadata and machine-readable files. You can disable this to present your docs under your own brand.

## Configuration

Set `branding.powered` to `false` in your config:

```js
// tome.config.js
export default {
  name: "My Docs",
  branding: {
    powered: false,
  },
};
```

## What changes

When branding is disabled, the following are affected:

| Item | With branding (default) | Without branding |
|------|------------------------|------------------|
| `llms.txt` description | "Documentation site powered by Tome" | "My Docs documentation" |
| JSON-LD `WebSite` schema | References Tome | References your site name only |
| OG metadata description | Mentions Tome | Uses your site name only |

The visual appearance of your site (header, sidebar, footer) is not affected by this setting. Branding control applies to metadata and machine-readable outputs only.

## When to use

This is intended for organizations that need full brand control over their public documentation. It is available on all plans.
