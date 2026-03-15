# Tome

> Documentation site powered by [Tome](https://tome.dev)

## Overview

This is the documentation for **Tome**. It is a static documentation site with full-text search, structured data, and machine-readable formats.

## Available Resources

| Resource | Path | Description |
|----------|------|-------------|
| llms.txt | /llms.txt | Lightweight page index with titles, descriptions, and URLs |
| llms-full.txt | /llms-full.txt | Full raw markdown content of all pages |
| MCP manifest | /mcp.json | Machine-readable page metadata with headings and tags |
| skill.md | /skill.md | This file — agent capabilities and site structure |
| robots.txt | /robots.txt | Crawler directives with AI agent permissions |
| Search API | /search.json | Pagefind search index metadata for programmatic search |

## Site Structure

### Pages

- **[Authentication](/api-auth)** — Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.
- **[Endpoints](/api-endpoints)** — How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.
- **[Overview](/api-overview)** — Generate interactive API documentation from OpenAPI specs with Tome.
- **[CLI Reference](/cli)** — Complete reference for every command and flag in the Tome CLI.
- **[Components](/components)** — Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, PackageManager, TypeTable, FileTree, and more.
- **[Architecture](/concepts/architecture)** — How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.
- **[File-System Routing](/concepts/file-routing)** — How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.
- **[Configuration](/configuration)** — How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.
- **[API Reference Setup](/guides/api-reference)** — How to generate an interactive API reference from an OpenAPI specification in Tome.
- **[Code Blocks](/guides/code-blocks)** — Advanced code block features — syntax highlighting, line numbers, titles, line highlighting, and TypeScript hover types with Twoslash.
- **[Configuration](/guides/configuration)** — How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.
- **[Content Sources](/guides/content-sources)** — Pull documentation content from GitHub repositories or Notion databases alongside your local files.
- **[Custom Theme](/guides/custom-theme)** — How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.
- **[Draft Pages](/guides/draft-pages)** — Mark pages as drafts to hide them from production builds while keeping them visible in development.
- **[Migrate from GitBook or Mintlify](/guides/migration)** — Move your existing documentation to Tome with a single command. Covers content conversion, navigation, redirects, and assets.
- **[Plugin System](/guides/plugins)** — Extend Tome with plugins that hook into the build lifecycle — modify routes, inject head tags, and run custom logic.
- **[Redirects](/guides/redirects)** — Set up URL redirects to preserve links when pages move. Supports config-level and per-page frontmatter redirects.
- **[Search](/guides/search)** — How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.
- **[TypeDoc Generation](/guides/typedoc)** — Generate API documentation from TypeScript source code using the built-in TypeDoc integration.
- **[Multi-Version Docs](/guides/versioning)** — How to maintain multiple versions of your documentation with Tome's built-in versioning system.
- **[Introduction](/)** — Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.
- **[Installation](/installation)** — System requirements and detailed installation instructions for Tome.
- **[Pages & Routing](/pages-routing)** — How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.
- **[Project Structure](/project-structure)** — How a Tome documentation project is organized — pages, config, entry point, and build output.
- **[Quickstart](/quickstart)** — Get a Tome documentation site running in under a minute.
- **[CLI Reference](/reference/cli)** — Complete reference for every command and flag in the Tome CLI.
- **[Components](/reference/components)** — Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.
- **[Config Reference](/reference/config)** — Complete reference for every field in tome.config.js — types, defaults, and descriptions.
- **[Frontmatter](/reference/frontmatter)** — Reference for all YAML frontmatter fields supported in Tome documentation pages.
- **[Theme Presets](/reference/theme-presets)** — Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.
- **[Theming](/theming)** — Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.
- **[Deploy to Tome Cloud](/tutorials/deploy-to-cloud)** — Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.
- **[Create Your First Site](/tutorials/first-site)** — A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.
- **[Authentication](/v2/api-auth)** — Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.
- **[Endpoints](/v2/api-endpoints)** — How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.
- **[Overview](/v2/api-overview)** — Generate interactive API documentation from OpenAPI specs with Tome.
- **[CLI Reference](/v2/cli)** — Complete reference for every command and flag in the Tome CLI.
- **[Components](/v2/components)** — Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, PackageManager, TypeTable, FileTree, and more.
- **[Architecture](/v2/concepts/architecture)** — How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.
- **[File-System Routing](/v2/concepts/file-routing)** — How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.
- **[Configuration](/v2/configuration)** — How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.
- **[API Reference Setup](/v2/guides/api-reference)** — How to generate an interactive API reference from an OpenAPI specification in Tome.
- **[Configuration](/v2/guides/configuration)** — How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.
- **[Custom Theme](/v2/guides/custom-theme)** — How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.
- **[Migrate from GitBook or Mintlify](/v2/guides/migration)** — Move your existing documentation to Tome with a single command. Covers content conversion, navigation, redirects, and assets.
- **[Redirects](/v2/guides/redirects)** — Set up URL redirects to preserve links when pages move. Supports config-level and per-page frontmatter redirects.
- **[Search](/v2/guides/search)** — How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.
- **[Multi-Version Docs](/v2/guides/versioning)** — How to maintain multiple versions of your documentation with Tome's built-in versioning system.
- **[Introduction](/v2)** — Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.
- **[Installation](/v2/installation)** — System requirements and detailed installation instructions for Tome.
- **[Pages & Routing](/v2/pages-routing)** — How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.
- **[Project Structure](/v2/project-structure)** — How a Tome documentation project is organized — pages, config, entry point, and build output.
- **[Quickstart](/v2/quickstart)** — Get a Tome documentation site running in under a minute.
- **[CLI Reference](/v2/reference/cli)** — Complete reference for every command and flag in the Tome CLI.
- **[Components](/v2/reference/components)** — Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.
- **[Config Reference](/v2/reference/config)** — Complete reference for every field in tome.config.js — types, defaults, and descriptions.
- **[Frontmatter](/v2/reference/frontmatter)** — Reference for all YAML frontmatter fields supported in Tome documentation pages.
- **[Theme Presets](/v2/reference/theme-presets)** — Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.
- **[Theming](/v2/theming)** — Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.
- **[Deploy to Tome Cloud](/v2/tutorials/deploy-to-cloud)** — Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.
- **[Create Your First Site](/v2/tutorials/first-site)** — A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.
- **[Authentication](/v1/api-auth)** — Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.
- **[Endpoints](/v1/api-endpoints)** — How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.
- **[Overview](/v1/api-overview)** — Generate interactive API documentation from OpenAPI specs with Tome.
- **[CLI Reference](/v1/cli)** — Complete reference for every command and flag in the Tome CLI.
- **[Components](/v1/components)** — Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, PackageManager, TypeTable, FileTree, and more.
- **[Architecture](/v1/concepts/architecture)** — How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.
- **[File-System Routing](/v1/concepts/file-routing)** — How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.
- **[Configuration](/v1/configuration)** — How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.
- **[API Reference Setup](/v1/guides/api-reference)** — How to generate an interactive API reference from an OpenAPI specification in Tome.
- **[Configuration](/v1/guides/configuration)** — How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.
- **[Custom Theme](/v1/guides/custom-theme)** — How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.
- **[Search](/v1/guides/search)** — How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.
- **[Multi-Version Docs](/v1/guides/versioning)** — How to maintain multiple versions of your documentation with Tome's built-in versioning system.
- **[Introduction](/v1)** — Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.
- **[Installation](/v1/installation)** — System requirements and detailed installation instructions for Tome.
- **[Pages & Routing](/v1/pages-routing)** — How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.
- **[Project Structure](/v1/project-structure)** — How a Tome documentation project is organized — pages, config, entry point, and build output.
- **[Quickstart](/v1/quickstart)** — Get a Tome documentation site running in under a minute.
- **[CLI Reference](/v1/reference/cli)** — Complete reference for every command and flag in the Tome CLI.
- **[Components](/v1/reference/components)** — Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.
- **[Config Reference](/v1/reference/config)** — Complete reference for every field in tome.config.js — types, defaults, and descriptions.
- **[Frontmatter](/v1/reference/frontmatter)** — Reference for all YAML frontmatter fields supported in Tome documentation pages.
- **[Theme Presets](/v1/reference/theme-presets)** — Detailed reference for Tome's built-in theme presets — color tokens, CSS variables, and font stacks.
- **[Theming](/v1/theming)** — Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.
- **[Deploy to Tome Cloud](/v1/tutorials/deploy-to-cloud)** — Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.
- **[Create Your First Site](/v1/tutorials/first-site)** — A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.

## How to Use This Site

### For AI Agents

1. **Quick overview**: Read `/llms.txt` for a page index with titles and URLs
2. **Full content**: Read `/llms-full.txt` for complete raw markdown of all pages
3. **Structured data**: Parse `/mcp.json` for machine-readable metadata including headings, tags, and content
4. **Search**: Use Pagefind search at `/pagefind/pagefind.js` or check `/search.json` for index metadata

### Capabilities

- **Search provider**: local
- **Versioned docs**: v3, v2, v1 (current: v3)
