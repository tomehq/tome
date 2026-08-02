---
title: Create Your First Site
description: A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.
icon: rocket
---

This tutorial walks you through creating a Tome documentation site from scratch. By the end, you'll have a working docs site running locally with custom pages and navigation.

## Prerequisites

You need **Node.js 22.22.2+** and a package manager (`npm`, `yarn`, or `pnpm`).

## 1. Scaffold the project

Run the init command to create a new project:

```bash
npx @tomehq/cli init my-docs
```

This creates a directory with the following structure:

```text
my-docs/
├── tome.config.js     # Site configuration
├── package.json       # Dependencies and scripts
├── index.html         # Vite entry point
├── .tome/entry.tsx    # Theme bootstrap (don't edit)
├── pages/             # Your documentation pages
│   ├── index.md
│   ├── tutorials/
│   │   ├── getting-started.md
│   │   └── deploy.md
│   ├── guides/
│   │   ├── components.mdx
│   │   └── configuration.md
│   ├── reference/
│   │   ├── cli.md
│   │   ├── components.md
│   │   └── config.md
│   └── concepts/
│       ├── how-tome-works.md
│       └── file-routing.md
├── public/            # Static assets
└── styles/            # Custom CSS (optional)
```

Pages are organized using the [Diataxis framework](https://diataxis.fr/) — tutorials, guides, reference, and concepts.

## 2. Install dependencies

```bash
cd my-docs
npm install
```

## 3. Start the dev server

```bash
npm run dev
```

Open `http://localhost:3000`. You should see the starter documentation site. Every time you save a file, the page reloads automatically.

## 4. Add a new page

Create `pages/guides/deployment.md`:

```markdown
---
title: Deployment Guide
description: How to deploy your Tome site to production.
---

# Deployment Guide

Run `npm run build` to produce static files in the `out/` directory.
Upload this directory to any static hosting provider.
```

The page is immediately available at `/guides/deployment` in the dev server.

## 5. Configure navigation

Open `tome.config.js` and add your new page to the sidebar:

```javascript
export default {
  name: "my-docs",
  theme: {
    preset: "amber",
    mode: "auto",
  },
  navigation: [
    { group: "Overview", pages: ["index"] },
    {
      group: "Tutorials",
      pages: ["tutorials/getting-started", "tutorials/deploy"],
    },
    {
      group: "Guides",
      pages: ["guides/components", "guides/configuration", "guides/deployment"],
    },
    {
      group: "Reference",
      pages: ["reference/config", "reference/components", "reference/cli"],
    },
    {
      group: "Concepts",
      pages: ["concepts/how-tome-works", "concepts/file-routing"],
    },
  ],
};
```

The sidebar updates to reflect the new structure.

## 6. Customize the theme

Change the preset to `editorial` and set a custom accent color:

```javascript
theme: {
  preset: "editorial",
  accent: "#ff6b4a",
  mode: "auto",
},
```

The entire site switches to the editorial aesthetic with your accent color.

## 7. Build for production

```bash
npm run build
```

This outputs a static site to `out/` with a pre-built search index. The output is ready to deploy to any hosting provider.

## Next steps

- **[Deploy to Tome Cloud](./tutorials/deploy-to-cloud)** to publish with a single command
- **[Configuration guide](./guides/configuration)** for all available options
- **[Components reference](./reference/components)** for the full list of MDX components
