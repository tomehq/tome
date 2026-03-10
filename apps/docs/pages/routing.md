---
title: Pages & Routing
description: How file-based routing, frontmatter, and navigation configuration work in Tome.
---

# Pages & Routing

Tome uses file-based routing. Every `.md` or `.mdx` file in the `pages/` directory becomes a page on your docs site. The file path determines the URL.

## File-Based Routing

| File Path | Page ID | URL |
|-----------|---------|-----|
| `pages/index.md` | `index` | `/` |
| `pages/quickstart.md` | `quickstart` | `/quickstart` |
| `pages/api/overview.md` | `api/overview` | `/api/overview` |
| `pages/api/endpoints.mdx` | `api/endpoints` | `/api/endpoints` |

### Rules

- Files named `index.md` or `index.mdx` map to the root of their directory. `pages/index.md` becomes `/`, and `pages/api/index.md` becomes `/api`.
- The page ID is the file path relative to `pages/`, with the extension removed. This ID is what you use in the `navigation` config.
- Both `.md` (Markdown) and `.mdx` (MDX) extensions are supported. Use `.mdx` when you need JSX components like Callout, Tabs, or Cards.
- Files inside `node_modules/` are ignored.

## Frontmatter

Every page can include YAML frontmatter at the top of the file. Frontmatter is delimited by `---` fences:

```markdown
---
title: My Page Title
description: A brief summary of what this page covers.
icon: rocket
sidebarTitle: Short Title
hidden: false
tags:
  - getting-started
  - tutorial
---

# My Page Title

Page content goes here.
```

### Frontmatter Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | First `#` heading | The page title. Displayed at the top of the page and used in the browser tab. |
| `description` | `string` | -- | A short summary shown below the title and used for search indexing. |
| `icon` | `string` | -- | An icon identifier for the sidebar (used if your theme supports it). |
| `sidebarTitle` | `string` | `title` | An alternate shorter title for the sidebar. Useful when the full title is long. |
| `hidden` | `boolean` | `false` | When `true`, the page is excluded from navigation and search results. It is still accessible by URL. |
| `tags` | `string[]` | -- | Tags for categorization and search filtering. |

### Title Inference

If `title` is not specified in frontmatter, Tome infers it from the first `#` heading in the page content. If there is no heading, the filename is used as a fallback.

## Navigation Configuration

The sidebar navigation is configured in `tome.config.js` under the `navigation` field:

```javascript
export default {
  navigation: [
    {
      group: "Getting Started",
      pages: ["index", "quickstart"],
    },
    {
      group: "Guide",
      pages: ["configuration", "components", "theming", "routing"],
    },
  ],
};
```

### How It Works

- Each object in the `navigation` array defines a **group** (a collapsible section in the sidebar).
- The `group` field is the section label displayed in the sidebar.
- The `pages` array lists page IDs in the order they should appear. Page IDs match filenames without extensions.
- Pages not listed in any group will not appear in the sidebar (but are still accessible by URL).
- Hidden pages (with `hidden: true` in frontmatter) are automatically excluded from navigation even if listed.

### Nested Groups

Groups can be nested for deeper organization:

```javascript
navigation: [
  {
    group: "API",
    pages: [
      "api/overview",
      {
        group: "Endpoints",
        pages: ["api/users", "api/posts", "api/auth"],
      },
    ],
  },
],
```

### Auto-Generated Navigation

If the `navigation` field is omitted or set to an empty array, Tome auto-generates navigation from the directory structure:

- Top-level files go into a "Documentation" group.
- Files in subdirectories are grouped by their parent directory name. The directory name is converted to title case (e.g., `api` becomes "Api", `getting-started` becomes "Getting Started").
- Pages are sorted alphabetically within each group.
- Hidden pages are excluded.

This is useful during early development when you are rapidly adding pages and do not want to maintain a navigation config manually.

## Markdown & MDX

### Markdown (.md)

Standard Markdown files support:

- All CommonMark syntax (headings, lists, links, images, code blocks, etc.)
- GitHub Flavored Markdown (tables, task lists, strikethrough, autolinks)
- YAML frontmatter
- Syntax-highlighted code blocks (powered by Shiki with `github-dark` and `github-light` themes)
- Auto-linked headings (h2, h3, h4 get anchor IDs)

### MDX (.mdx)

MDX files support everything Markdown does, plus:

- JSX components inline in your content
- The built-in components (Callout, Tabs, Card, CardGroup, Steps, Accordion) are available automatically
- Custom React components via imports

Use `.mdx` when you need interactive components. Use `.md` for pure content -- it is simpler and has fewer edge cases.

## Previous / Next Navigation

Tome automatically generates "Previous" and "Next" links at the bottom of each page based on the order of pages in the `navigation` config. The first page has no "Previous" link, and the last page has no "Next" link. Pages are ordered across all navigation groups in the order they appear.

## Table of Contents

Tome extracts `h2`, `h3`, and `h4` headings from each page and displays them in an "On this page" sidebar on the right side of the content area. This sidebar appears on wide viewports (above 1100px) and is hidden on smaller screens.

Headings automatically receive anchor IDs derived from the heading text, so they are linkable with `#heading-id` URLs.
