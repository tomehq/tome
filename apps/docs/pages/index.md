---
title: Welcome to Tome
description: Open-source documentation platform. Write Markdown, get beautiful docs. A modern alternative to Mintlify.
---

# Welcome to Tome

Tome is an open-source documentation platform that turns Markdown and MDX into beautiful, fast documentation sites. No vendor lock-in, no per-seat pricing -- just write and ship.

## Why Tome?

| Feature | Description |
|---------|-------------|
| **Zero Config** | Run `tome init` and start writing. Sensible defaults, no boilerplate. |
| **Markdown & MDX** | Standard Markdown for content, MDX when you need interactive components. |
| **Built-in Components** | Callouts, tabs, cards, steps, accordions -- ready to use out of the box. |
| **Theming** | Two built-in presets, custom accent colors, dark/light/auto mode, custom fonts. |
| **Fast Dev Server** | Hot-reloading powered by Vite. Save a file, see it instantly. |
| **Search** | Built-in local search with Algolia DocSearch for production. |
| **API Reference** | Auto-generate API docs from OpenAPI specs with an interactive playground. |
| **MCP Ready** | Built-in MCP server so AI agents can read and search your docs. |
| **Analytics** | Privacy-first, cookie-free page view tracking. Under 1KB. |
| **Custom Domains** | Connect your own domain with automatic SSL provisioning. |
| **Cloud Deploy** | One command to deploy. Incremental uploads -- only changed files are sent. |
| **i18n** | Multi-locale support with automatic fallback. |
| **Deploy Anywhere** | Static output. Works on Vercel, Netlify, Cloudflare, or self-host. |

## Quick Install

```bash
npx @tome/cli init my-docs
cd my-docs
npm install
npm run dev
```

Open `http://localhost:3000` to see your docs site running locally.

## Project Structure

```text
my-docs/
├── tome.config.js     # Site configuration
├── pages/             # Documentation pages (.md and .mdx)
│   ├── index.md       # Home page
│   └── quickstart.md  # Getting started guide
├── public/            # Static assets (images, fonts)
├── .tome/             # Internal entry point (auto-generated)
│   └── entry.tsx
├── index.html         # HTML shell
└── package.json
```

## Next Steps

- **Quickstart** -- Install dependencies, run the dev server, and write your first page.
- **Configuration** -- Customize your site name, theme, navigation, and search.
- **Components** -- Use built-in MDX components like Callout, Tabs, Cards, and Steps.
- **Theming** -- Pick a preset, set an accent color, configure dark mode.
- **Routing** -- Understand file-based routing and frontmatter options.
- **CLI Reference** -- See every command the Tome CLI offers.
- **Deployment** -- Deploy to Tome Cloud or any static host.
