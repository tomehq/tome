---
title: Getting Started
description: Build your first documentation page from scratch — from writing content to seeing it in the browser.
icon: rocket
---

# Getting Started

This tutorial walks you through creating and customizing your first documentation page. By the end, you will have a working page with formatted content and navigation.

## Prerequisites

- Node.js 22.13 or later ([download](https://nodejs.org))
- A code editor (VS Code, Cursor, etc.)
- A terminal

## Step 1: Start the dev server

If you haven't already, install dependencies and start the server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see this documentation site.

## Step 2: Create a new page

Create a new file at `pages/tutorials/my-first-page.md`:

```markdown
---
title: My First Page
description: A page I created from scratch.
---

# My First Page

This is my first documentation page. It supports **bold**, *italic*, `code`, and more.

## A section

Content is organized with headings. Each heading appears in the table of contents.

- Bullet lists work
- So do numbered lists
- And [links](https://tome.center)
```

Save the file. The browser reloads automatically.

## Step 3: Add it to the sidebar

Open `tome.config.js` and add your page to the navigation:

```javascript
{
  group: "Tutorials",
  pages: ["tutorials/getting-started", "tutorials/my-first-page", "tutorials/deploy"],
},
```

The page ID is the file path relative to `pages/`, without the extension.

## Step 4: Add frontmatter

Every page supports YAML frontmatter at the top:

```markdown
---
title: My First Page
description: A page I created from scratch.
icon: book
sidebarTitle: First Page
---
```

| Field | Description |
|-------|-------------|
| `title` | Page title in browser tab and sidebar |
| `description` | Summary for search and SEO |
| `icon` | Icon next to the title in the sidebar |
| `sidebarTitle` | Override the sidebar label |
| `hidden` | Set to `true` to hide from sidebar |

## What you learned

You created a Markdown page, added it to navigation, and configured frontmatter. Next, try adding [interactive components](/guides/components) to your pages.
