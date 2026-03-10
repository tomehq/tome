---
title: CLI Reference
description: Complete reference for every Tome CLI command -- init, dev, build, deploy, domains, and more.
---

# CLI Reference

The Tome CLI is installed as `@tome/cli`. All commands are available via `npx tome <command>` or directly as `tome` if installed globally.

## `tome init [name]`

Scaffold a new Tome documentation project.

```bash
npx @tome/cli init my-docs
```

| Option | Description |
|--------|-------------|
| `name` | Project directory name (default: current directory) |
| `-t, --template <name>` | Starter template (default: `"default"`) |

Creates a project with `tome.config.js`, starter pages, `package.json`, and a pre-configured dev setup.

## `tome dev`

Start the development server with hot-reloading.

```bash
tome dev
```

| Option | Description |
|--------|-------------|
| `-p, --port <number>` | Port number (default: `3000`) |
| `--host` | Expose the server to your local network |

The dev server watches `pages/`, `tome.config.js`, and `public/` for changes and reloads the browser automatically.

## `tome build`

Build your docs site for production. Outputs static HTML, CSS, and JS.

```bash
tome build
```

| Option | Description |
|--------|-------------|
| `-o, --outDir <dir>` | Output directory (default: `out`) |

The built output can be deployed to any static host. See the Deployment guide for details.

## `tome deploy`

Deploy your built docs to Tome Cloud. Requires authentication via `tome login`.

```bash
tome deploy
```

| Option | Description |
|--------|-------------|
| `-o, --outDir <dir>` | Output directory to deploy (default: `out`) |

Tome uses incremental uploads -- only files that have changed since the last deployment are sent. The CLI computes SHA-256 hashes for each file and sends a manifest to the server, which responds with the list of files that need uploading.

## `tome login`

Authenticate with Tome Cloud to enable deployment and domain management.

```bash
tome login
```

| Option | Description |
|--------|-------------|
| `--token <token>` | Provide an API token directly (skips interactive flow) |

Without the `--token` flag, Tome opens your browser for interactive authentication. The token is saved to `~/.tome/config`.

## `tome logout`

Remove saved authentication credentials.

```bash
tome logout
```

Deletes the token stored in `~/.tome/config`.

## `tome mcp`

Start an MCP (Model Context Protocol) server so AI agents can query your documentation.

```bash
tome mcp
```

| Option | Description |
|--------|-------------|
| `-o, --outDir <dir>` | Directory containing the built docs (default: `out`) |

The server exposes three tools: `search_docs`, `get_page`, and `list_pages`. See the MCP guide for details.

## `tome algolia:init`

Generate an Algolia DocSearch crawler configuration file.

```bash
tome algolia:init -u https://docs.example.com
```

| Option | Description |
|--------|-------------|
| `-u, --url <url>` | Production URL of your docs site (required) |

Outputs a `docsearch-config.json` file configured for your site's structure. See the Search guide for Algolia setup instructions.

## `tome domains:add <domain>`

Add a custom domain to your Tome Cloud project.

```bash
tome domains:add docs.example.com
```

Registers the domain, provisions SSL, and returns the DNS records you need to configure. See the Custom Domains guide for the full setup process.

## `tome domains:list`

List all custom domains configured for your project.

```bash
tome domains:list
```

Shows each domain's verification status and SSL status.

## `tome domains:remove <domain>`

Remove a custom domain from your project.

```bash
tome domains:remove docs.example.com
```

Removes the domain from Tome Cloud and cleans up the SSL certificate.

## Command Summary

| Command | Description |
|---------|-------------|
| `tome init [name]` | Create a new docs project |
| `tome dev` | Start dev server with hot-reload |
| `tome build` | Build static site for production |
| `tome deploy` | Deploy to Tome Cloud |
| `tome login` | Authenticate with Tome Cloud |
| `tome logout` | Remove saved credentials |
| `tome mcp` | Start MCP server for AI agents |
| `tome algolia:init` | Generate Algolia crawler config |
| `tome domains:add` | Add a custom domain |
| `tome domains:list` | List custom domains |
| `tome domains:remove` | Remove a custom domain |
