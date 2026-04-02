---
title: Content Negotiation
description: Serve raw markdown to AI agents and programmatic clients alongside your HTML pages.
---

Every page in your Tome site is available as raw markdown, with no extra configuration. This makes your documentation accessible to AI agents, CLI tools, and any client that prefers plain text over HTML.

## Accessing markdown

There are two ways to get the raw markdown for any page:

### Append `.md` to the URL

Add `.md` to any page URL to get the raw markdown source:

```
https://docs.example.com/quickstart        → HTML page
https://docs.example.com/quickstart.md     → Raw markdown
```

### Send an `Accept` header

Request any page URL with `Accept: text/markdown` or `Accept: text/plain`:

```bash
curl -H "Accept: text/markdown" https://docs.example.com/quickstart
```

Both approaches return the original markdown source with `Content-Type: text/markdown; charset=utf-8`.

## HTML discovery

Every HTML page includes a `<link>` tag so clients can discover the markdown alternative:

```html
<link rel="alternate" type="text/markdown" href="/llms.txt"
      title="LLM-optimized documentation" />
```

## llms.txt

Tome auto-generates an `llms.txt` file at your site root. This follows the emerging standard for LLM-friendly site indexes:

```
https://docs.example.com/llms.txt
```

The file contains your site name, a one-line description, and a list of all pages with their titles, descriptions, and URLs. Hidden and draft pages are excluded.

## llms-full.txt

For agents that want the complete content, `llms-full.txt` concatenates the raw markdown of every page into a single file:

```
https://docs.example.com/llms-full.txt
```

Pages are separated by `---` dividers. MDX pages and the API reference page are excluded since they contain JSX that is not useful as raw text.

## Additional machine-readable files

Tome also generates these files automatically during every build:

| File | Description |
|------|-------------|
| `search.json` | Structured page index with titles, headings, and word counts |
| `mcp.json` | Machine-readable metadata for MCP-compatible agents |
| `skill.md` | Agent capabilities document describing how to use the site |
| `robots.txt` | Crawler directives with AI agent permissions |
| `sitemap.xml` | Standard sitemap for search engines |

No configuration is needed. All files are generated at build time and included in the output.
