---
title: Multi-Version Docs
description: How to maintain multiple versions of your documentation with Tome's built-in versioning system.
icon: layers
---

Tome supports maintaining multiple versions of your documentation side by side. This is useful for libraries and APIs that need to document breaking changes across major versions.

## Directory structure

Organize your pages by version using subdirectories:

```text
pages/
├── current/          # Latest version
│   ├── index.md
│   ├── quickstart.md
│   └── api.md
├── v1.0/             # Previous version
│   ├── index.md
│   ├── quickstart.md
│   └── api.md
└── v0.9/             # Older version
    ├── index.md
    └── api.md
```

## Configuration

Add the `versioning` section to your config:

```javascript
export default {
  name: "My Docs",
  versioning: {
    current: "v2.0",
    versions: ["v2.0", "v1.0", "v0.9"],
  },
};
```

| Field | Type | Description |
|-------|------|-------------|
| `current` | string | The label for the current (latest) version |
| `versions` | string[] | All available versions, newest first |

## URL mapping

| Directory | URL |
|-----------|-----|
| `pages/current/index.md` | `/` |
| `pages/current/api.md` | `/api` |
| `pages/v1.0/index.md` | `/v1.0/` |
| `pages/v1.0/api.md` | `/v1.0/api` |

The `current` directory always serves at the root — no version prefix. Older versions are prefixed with their version string.

## Version switcher

When versioning is configured, Tome automatically adds a version dropdown to the header. Users can switch between versions, and the URL updates to reflect the selected version.

If the current page exists in the target version, the user stays on that page. Otherwise, they're redirected to the version's index page.

## Best practices

- Keep the `current` directory as your working copy
- Copy `current` to a versioned directory (e.g., `v2.0`) when you cut a release
- Remove pages from old versions that no longer apply rather than leaving stale content
- Use the same page IDs across versions so the version switcher can navigate between them
