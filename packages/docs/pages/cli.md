---
title: CLI Reference
description: Complete reference for every command and flag in the Tome CLI.
icon: terminal
---

The `tome` CLI is the primary interface for creating, developing, building, and deploying documentation sites.

## Installation

```bash
npm install -D @tomehq/cli
# or globally
npm install -g @tomehq/cli
```

## Commands

### `tome init [name]`

Create a new Tome documentation project.

```bash
tome init my-docs
```

| Argument | Default | Description |
|----------|---------|-------------|
| `name` | `my-docs` | Project directory name |

| Flag | Default | Description |
|------|---------|-------------|
| `-t, --template <name>` | `default` | Starter template |

Creates `tome.config.js`, `package.json`, `index.html`, `.tome/entry.tsx`, starter pages in `pages/`, and `public/` and `styles/` directories.

---

### `tome dev`

Start the development server with hot reloading.

```bash
tome dev
tome dev -p 4000
tome dev --host
```

| Flag | Default | Description |
|------|---------|-------------|
| `-p, --port <number>` | `3000` | Server port |
| `--host` | `false` | Expose to network (bind `0.0.0.0`) |

Watches `pages/` for file changes and reloads automatically. Config changes trigger a full reload.

---

### `tome build`

Build the documentation site for production.

```bash
tome build
tome build -o dist
```

| Flag | Default | Description |
|------|---------|-------------|
| `-o, --outDir <dir>` | `out` | Output directory |

Produces a static site and runs Pagefind to build the search index.

---

### `tome deploy`

Deploy the site to Tome Cloud. Requires `tome login` first.

```bash
tome deploy
```

Builds, collects output files, and uploads using hash-based deduplication.

---

### `tome login`

Authenticate with Tome Cloud.

```bash
tome login
```

Prompts for email and sends a magic link. Stores the API token locally.

---

### `tome domains:add <domain>`

Add a custom domain. Returns DNS records to configure.

```bash
tome domains:add docs.example.com
```

### `tome domains:verify <domain>`

Verify DNS configuration for a custom domain.

```bash
tome domains:verify docs.example.com
```

### `tome domains:list`

List all custom domains for the current project.

### `tome domains:remove <domain>`

Remove a custom domain.

---

### `tome algolia:init`

Initialize an Algolia DocSearch index. Prompts for credentials and creates a crawler configuration.

---

### `tome mcp`

Start the MCP (Model Context Protocol) stdio server for AI tool integration. Exposes documentation content as MCP resources and tools.
