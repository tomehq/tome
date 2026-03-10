---
title: MCP Server
description: Let AI agents read and search your documentation with the built-in Model Context Protocol server.
---

# MCP Server

Tome includes a built-in MCP (Model Context Protocol) server that lets AI agents -- like Claude, ChatGPT, or custom tools -- read, search, and reference your documentation programmatically.

## What is MCP?

MCP is an open protocol for connecting AI assistants to external data sources. When you run Tome's MCP server, any compatible AI tool can query your docs as if it were browsing them -- searching for content, reading specific pages, and listing available documentation.

## Quick Start

Build your docs, then start the MCP server:

```bash
tome build
tome mcp
```

The server reads the built output from `out/` and exposes your documentation via MCP.

## MCP Manifest

At build time, Tome generates an `mcp.json` manifest file in the output directory. This file contains metadata about every page -- titles, descriptions, URLs, and optionally full content.

### Configuration

Control manifest generation in `tome.config.js`:

```javascript
export default {
  mcp: {
    enabled: true,       // Generate mcp.json at build time (default: true)
    server: false,       // Enable the MCP server endpoint (default: false)
    includeContent: true, // Include full page content in the manifest (default: true)
    excludePages: [],    // Page IDs to exclude from the manifest
  },
};
```

### Excluding Pages

Hide internal or draft pages from AI agents:

```javascript
export default {
  mcp: {
    excludePages: ["internal/notes", "drafts/wip"],
  },
};
```

## Available Tools

The MCP server exposes three tools that AI agents can call:

### `search_docs`

Full-text search across all documentation pages. Returns matching pages with relevant excerpts.

```json
{
  "tool": "search_docs",
  "arguments": {
    "query": "how to configure themes"
  }
}
```

### `get_page`

Retrieve the full content of a specific page by its URL path.

```json
{
  "tool": "get_page",
  "arguments": {
    "url": "/configuration"
  }
}
```

### `list_pages`

List all available documentation pages with their titles and descriptions.

```json
{
  "tool": "list_pages",
  "arguments": {}
}
```

## Resources

The server also exposes pages as MCP resources with `docs://` URIs, allowing agents to browse documentation like a file system:

- `docs://pages` -- list all pages
- `docs://pages/configuration` -- read a specific page

## Config Reference

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `mcp.enabled` | `boolean` | `true` | Generate `mcp.json` at build time |
| `mcp.server` | `boolean` | `false` | Enable the MCP server endpoint |
| `mcp.includeContent` | `boolean` | `true` | Include full page content in the manifest |
| `mcp.excludePages` | `string[]` | `[]` | Page IDs to exclude from the MCP manifest |
