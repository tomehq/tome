---
title: File-System Routing
description: How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.
---

Every `.md` or `.mdx` file in the `pages/` directory becomes a page. The file path determines the URL.

## Basic routing

| File path | URL |
|-----------|-----|
| `pages/index.md` | `/` |
| `pages/quickstart.md` | `/quickstart` |
| `pages/guides/deployment.md` | `/guides/deployment` |
| `pages/api/endpoints.md` | `/api/endpoints` |
| `pages/api/index.md` | `/api` |

**Rules:**

- `index.md` serves at the directory's root path
- File extensions are stripped from the URL
- Directory nesting maps directly to URL segments

## Page IDs

Each page has an ID derived from its path relative to `pages/`:

| File | Page ID |
|------|---------|
| `pages/index.md` | `index` |
| `pages/quickstart.md` | `quickstart` |
| `pages/guides/deployment.md` | `guides/deployment` |

Page IDs are used in `navigation` config to control sidebar order.

## Navigation vs. routing

All pages in `pages/` are routable regardless of whether they appear in `navigation`. Navigation only controls the sidebar.

Pages can be hidden from the sidebar using `hidden: true` in frontmatter while remaining accessible at their URL.

## i18n routing

When multiple locales are configured, organize pages by locale subdirectory:

```text
pages/
├── en/            # Default locale
│   ├── index.md
│   └── quickstart.md
├── es/            # Spanish
│   ├── index.md
│   └── quickstart.md
```

| File | URL |
|------|-----|
| `pages/en/index.md` | `/` (default — no prefix) |
| `pages/es/index.md` | `/es/` |
| `pages/es/quickstart.md` | `/es/quickstart` |

The default locale serves at the root without a prefix. When `fallback: true` and a page doesn't exist in a non-default locale, the default version is used.

## Versioned routing

When versioning is configured:

```text
pages/
├── current/       # Latest version
│   ├── index.md
│   └── api.md
├── v1.0/
│   ├── index.md
│   └── api.md
```

| File | URL |
|------|-----|
| `pages/current/index.md` | `/` |
| `pages/v1.0/index.md` | `/v1.0/` |
| `pages/v1.0/api.md` | `/v1.0/api` |

The `current` directory serves at the root. Older versions are prefixed.

## File discovery

Tome discovers pages by scanning `pages/` for `**/*.{md,mdx}` files. Discovery runs at startup and again whenever files are added, removed, or renamed during development.
