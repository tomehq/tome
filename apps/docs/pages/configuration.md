---
title: Configuration
description: Complete reference for tome.config.js -- site name, theme, navigation, search, and more.
---

# Configuration

All site configuration lives in `tome.config.js` at the root of your project. Tome supports `.js`, `.mjs`, and `.ts` config files.

## Minimal Config

A bare-minimum config only needs a site name:

```javascript
export default {
  name: "My Docs",
};
```

Everything else has sensible defaults.

## Full Example

```javascript
import { defineConfig } from "@tome/core";

export default defineConfig({
  name: "My Docs",
  logo: "/logo.svg",
  favicon: "/favicon.ico",
  baseUrl: "https://docs.example.com",
  theme: {
    preset: "amber",
    accent: "#e8a845",
    mode: "auto",
    fonts: {
      heading: "Instrument Serif",
      body: "DM Sans",
      code: "JetBrains Mono",
    },
    radius: "8px",
  },
  navigation: [
    {
      group: "Getting Started",
      pages: ["index", "quickstart"],
    },
    {
      group: "Guide",
      pages: ["configuration", "components", "theming", "routing"],
    },
  ],
  search: {
    provider: "local",
  },
  topNav: [
    { label: "GitHub", href: "https://github.com/example/docs" },
  ],
});
```

## `defineConfig` Helper

The `defineConfig` function provides type checking and autocompletion in editors. It is optional -- you can also export a plain object.

```javascript
import { defineConfig } from "@tome/core";
export default defineConfig({ /* ... */ });
```

## Config Reference

### Top-Level Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | `"My Docs"` | Site name shown in the sidebar header. |
| `logo` | `string` | -- | Path to a logo image (relative to `public/`). |
| `favicon` | `string` | -- | Path to a favicon file. |
| `baseUrl` | `string` | -- | Production URL of your docs site. |

### `theme`

Controls the visual appearance of your site. See the Theming page for a deeper guide.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `theme.preset` | `"amber" \| "editorial"` | `"amber"` | Base theme preset. |
| `theme.accent` | `string` | -- | Custom accent color as a hex code (e.g., `"#e8a845"`). |
| `theme.mode` | `"light" \| "dark" \| "auto"` | `"auto"` | Color mode. `"auto"` follows the user's system preference. |
| `theme.fonts.heading` | `string` | Preset default | Font family for headings. |
| `theme.fonts.body` | `string` | Preset default | Font family for body text. |
| `theme.fonts.code` | `string` | Preset default | Font family for code blocks. |
| `theme.radius` | `string` | -- | Border radius for UI elements. |

### `navigation`

Defines the sidebar navigation structure. Each entry is a group with a label and a list of page IDs.

```javascript
navigation: [
  {
    group: "Getting Started",
    pages: ["index", "quickstart"],
  },
  {
    group: "API Reference",
    pages: ["api/overview", "api/endpoints"],
  },
],
```

Page IDs correspond to filenames inside `pages/` (without the `.md` or `.mdx` extension). Nested files use forward slashes: `pages/api/overview.md` becomes `"api/overview"`.

If `navigation` is omitted or empty, Tome auto-generates navigation from the directory structure.

Navigation groups can be nested:

```javascript
navigation: [
  {
    group: "Guide",
    pages: [
      "overview",
      {
        group: "Advanced",
        pages: ["plugins", "custom-themes"],
      },
    ],
  },
],
```

### `search`

Configure the search functionality.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `search.provider` | `"local" \| "algolia"` | `"local"` | Search backend. |
| `search.appId` | `string` | -- | Algolia application ID (required for Algolia). |
| `search.apiKey` | `string` | -- | Algolia search-only API key. |
| `search.indexName` | `string` | -- | Algolia index name. |

Local search works out of the box with no configuration. For production sites with large doc sets, Algolia provides faster full-text search.

### `topNav`

Add links to the top navigation bar.

```javascript
topNav: [
  { label: "GitHub", href: "https://github.com/org/repo" },
  { label: "Blog", href: "https://blog.example.com" },
],
```

### `api` (Optional)

Configure API reference generation from an OpenAPI spec.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `api.spec` | `string` | -- | Path to an OpenAPI spec file (YAML or JSON). |
| `api.playground` | `boolean` | `true` | Show an interactive API playground. |
| `api.baseUrl` | `string` | -- | Override the API base URL. |
| `api.auth.type` | `"bearer" \| "apiKey" \| "oauth2"` | -- | Authentication type. |
| `api.auth.header` | `string` | -- | Custom auth header name. |

### `mcp` (Optional)

Configure the auto-generated MCP (Model Context Protocol) manifest. This allows AI assistants to read and reference your documentation.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `mcp.enabled` | `boolean` | `true` | Generate `mcp.json` at build time. |
| `mcp.server` | `boolean` | `false` | Enable the MCP server endpoint. |
| `mcp.includeContent` | `boolean` | `true` | Include full page content in the manifest. |
| `mcp.excludePages` | `string[]` | `[]` | Page IDs to exclude from the MCP manifest. |

### `i18n` (Optional)

Internationalization settings.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `i18n.defaultLocale` | `string` | `"en"` | Default locale code. |
| `i18n.locales` | `string[]` | `["en"]` | Supported locale codes. |
| `i18n.localeNames` | `Record<string, string>` | -- | Display names for locales (e.g., `{ "en": "English" }`). |
| `i18n.fallback` | `boolean` | `true` | Fall back to default locale for missing translations. |

### `ai` (Optional)

Configure AI-powered features.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ai.enabled` | `boolean` | `false` | Enable AI features. |
| `ai.provider` | `"openai" \| "anthropic" \| "custom"` | `"anthropic"` | AI provider. |
| `ai.model` | `string` | -- | Specific model to use. |
| `ai.apiKeyEnv` | `string` | `"TOME_AI_KEY"` | Environment variable name for the API key. |

### `analytics` (Optional)

Add analytics tracking.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `analytics.provider` | `"plausible" \| "posthog" \| "custom"` | -- | Analytics provider. |
| `analytics.key` | `string` | -- | Provider-specific tracking key or site ID. |

## Config Validation

Tome validates your config at startup using Zod schemas. If there are errors, you will see a clear message indicating which fields are invalid and why. For example:

```text
Invalid tome.config.js:
  - theme.preset: Invalid enum value. Expected 'amber' | 'editorial'
  - navigation.0.group: Required
```
