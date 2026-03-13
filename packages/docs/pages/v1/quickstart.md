---
title: Quickstart
description: Get a Tome documentation site running in under a minute.
icon: zap
---

Get a working documentation site in three commands.

## Create a new project

```bash
npx @tomehq/cli init my-docs
```

This scaffolds a complete documentation project with starter pages, configuration, and build scripts.

## Install and run

```bash
cd my-docs
npm install
npm run dev
```

Open `http://localhost:3000`. You should see your documentation site with a sidebar, search, and starter content.

## Edit your first page

Open `pages/index.md` in your editor. Change the title and save — the browser reloads automatically.

```markdown
---
title: My Project
description: Documentation for my project.
---

# My Project

Welcome to the docs.
```

Every `.md` or `.mdx` file in `pages/` becomes a page on your site. Subdirectories create nested routes:

| File | URL |
|------|-----|
| `pages/index.md` | `/` |
| `pages/quickstart.md` | `/quickstart` |
| `pages/guides/setup.md` | `/guides/setup` |

## Add navigation

Open `tome.config.js` and define your sidebar:

```javascript
export default {
  name: "My Project",
  navigation: [
    {
      group: "Getting Started",
      pages: ["index", "quickstart"],
    },
    {
      group: "Guides",
      pages: ["guides/setup"],
    },
  ],
};
```

## Build for production

```bash
npm run build
```

This outputs a static site to `out/` ready to deploy to any hosting provider — Vercel, Netlify, Cloudflare Pages, or Tome Cloud.

## Next steps

- **[Installation](#installation)** for detailed setup and prerequisites
- **[Configuration](#configuration)** to customize your site
- **[Components](#components)** to use tabs, callouts, and other interactive elements
