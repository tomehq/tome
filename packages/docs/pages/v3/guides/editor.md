---
title: WYSIWYG Editor
description: Edit documentation visually in your browser with the Tome cloud editor.
---

# WYSIWYG Editor

Edit documentation pages directly in your browser. The editor renders a visual editing experience with live formatting, MDX component insertion, and one-click publishing.

## Accessing the editor

Navigate to your project in the dashboard, then click "Edit in Editor" to open the visual editor.

The editor URL follows this pattern:

```
https://tome.center/dashboard/project/{your-project}/editor
```

## Editing pages

The editor has two panels:

- **Left sidebar**: page tree showing all pages with their status (draft or published)
- **Main area**: the visual editor with formatting toolbar

Select a page from the sidebar to load it. Changes auto-save every 2 seconds.

## Formatting toolbar

The toolbar provides quick access to common formatting:

| Button | Action | Shortcut |
|--------|--------|----------|
| **B** | Bold | Cmd+B |
| *I* | Italic | Cmd+I |
| `</>` | Inline code | Cmd+E |
| H1-H4 | Headings | — |
| • | Bullet list | — |
| 1. | Numbered list | — |
| " | Blockquote | — |
| — | Horizontal rule | — |
| ↩ | Undo | Cmd+Z |
| ↪ | Redo | Cmd+Shift+Z |

## Slash commands

Type `/` at the start of a line to open the command menu. Available commands:

- `/heading1`, `/heading2`, `/heading3` — insert headings
- `/bulletList`, `/orderedList` — insert lists
- `/codeBlock` — insert a fenced code block
- `/blockquote` — insert a quote
- `/divider` — insert a horizontal rule
- `/callout` — insert an info/warning/tip callout
- `/tabs` — insert tabbed content sections
- `/steps` — insert a step-by-step guide
- `/accordion` — insert a collapsible section
- `/card` — insert a feature card

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| Cmd+S | Save draft |
| Cmd+Shift+P | Publish page |
| Cmd+B | Bold |
| Cmd+I | Italic |
| Cmd+E | Inline code |
| Cmd+Z | Undo |
| Cmd+Shift+Z | Redo |

## Creating pages

Click "New Page" in the sidebar. Enter a path (e.g. `guides/getting-started`) and title. The page starts as a draft.

## Publishing

Click the "Publish" button to deploy the page to your live documentation site. If your project has a connected GitHub repository, the editor also commits the markdown file to your repo.

The publish flow:

1. Saves the current draft
2. Writes the markdown file to cloud storage
3. If GitHub connected: creates a commit in your repository
4. Page is immediately live at your documentation URL

## Draft vs published

Pages have two states:

- **Draft**: saved in the editor, not visible on your live site
- **Published**: deployed to your documentation URL

The sidebar shows status badges for each page.

## Frontmatter

The editor includes fields for page metadata:

- **Title**: the page heading (maps to `title` in frontmatter)
- **Description**: page description for SEO and search

Additional frontmatter fields (icon, tags, access) can be set by editing the markdown source directly.

## Security

The editor sanitizes all content before saving. Raw JavaScript expressions (`{expression}`) are stripped from the output. Only known MDX components (Callout, Tabs, Card, etc.) are preserved. This prevents code injection during server-side rendering.

## Markdown source of truth

The editor reads and writes standard markdown. No proprietary format. You can edit the same pages in your code editor, push via Git, and the changes appear in the visual editor on next load.
