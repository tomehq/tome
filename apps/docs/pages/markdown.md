---
title: Markdown & MDX
description: Supported Markdown syntax, syntax highlighting, frontmatter fields, and when to use MDX.
---

# Markdown & MDX

Tome supports standard Markdown (`.md`) and MDX (`.mdx`) files. Use Markdown for content-focused pages and MDX when you need interactive components.

## Markdown (.md)

Standard Markdown files support:

- **CommonMark** -- headings, paragraphs, lists, links, images, blockquotes, horizontal rules
- **GitHub Flavored Markdown** -- tables, task lists, strikethrough, autolinks
- **YAML frontmatter** -- metadata block at the top of each file
- **Syntax-highlighted code blocks** -- powered by Shiki
- **Auto-linked headings** -- `h2`, `h3`, and `h4` headings get anchor IDs

## MDX (.mdx)

MDX files support everything Markdown does, plus JSX components inline in your content. Tome's built-in components (Callout, Tabs, Card, CardGroup, Steps, Accordion) are available automatically -- no imports needed.

Use `.mdx` when you need components. Use `.md` for everything else. Plain Markdown is simpler and has fewer edge cases.

## Frontmatter

Every page can include YAML frontmatter at the top, delimited by `---` fences:

```markdown
---
title: My Page
description: A brief summary of this page.
icon: rocket
sidebarTitle: Short Title
hidden: false
tags:
  - tutorial
  - getting-started
---
```

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | First `#` heading | Page title for the browser tab and page header. |
| `description` | `string` | -- | Summary shown below the title and used for search indexing. |
| `icon` | `string` | -- | Icon identifier for the sidebar. |
| `sidebarTitle` | `string` | `title` | Shorter title for the sidebar when the full title is long. |
| `hidden` | `boolean` | `false` | Exclude from navigation and search. Still accessible by URL. |
| `tags` | `string[]` | -- | Tags for categorization and search filtering. |

If `title` is not set, Tome infers it from the first `#` heading. If there is no heading, the filename is used.

## Syntax Highlighting

Code blocks are highlighted with Shiki using the `github-dark` and `github-light` themes (matching your color mode). Specify the language after the opening fence:

````markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

### Supported Languages

Tome highlights code in these languages out of the box:

| Language | Tag |
|----------|-----|
| JavaScript | `javascript`, `js` |
| TypeScript | `typescript`, `ts` |
| JSX / TSX | `jsx`, `tsx` |
| Python | `python`, `py` |
| Go | `go` |
| Rust | `rust` |
| Ruby | `ruby` |
| Java | `java` |
| C / C++ | `c`, `cpp` |
| C# | `csharp` |
| PHP | `php` |
| Swift | `swift` |
| Kotlin | `kotlin` |
| Shell / Bash | `bash`, `sh`, `shell` |
| JSON | `json` |
| YAML | `yaml` |
| HTML | `html` |
| CSS | `css` |
| SQL | `sql` |
| Markdown | `markdown`, `md` |
| Plain text | `text`, `plaintext` |

Use `text` for code blocks that should not be highlighted.

## Tables

GitHub Flavored Markdown tables are fully supported:

```markdown
| Column A | Column B | Column C |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |
```

Columns can be left-aligned (default), center-aligned (`:---:`), or right-aligned (`---:`).

## Headings and Anchors

Headings (`h2`, `h3`, `h4`) automatically receive anchor IDs derived from the heading text. These IDs enable direct linking with `#fragment` URLs.

For example, a heading `## Getting Started` gets the ID `getting-started` and is linkable at `/page#getting-started`.

Headings are also extracted for the "On this page" table of contents displayed on the right side of the content area.

## Images

Reference images from the `public/` directory using root-relative paths:

```markdown
![Diagram](/images/architecture.png)
```

Place image files in `public/images/` (or any subdirectory of `public/`). They are served at the site root.
