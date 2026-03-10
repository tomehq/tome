const e={frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1},html:`<h1 id="architecture"><a class="heading-anchor" aria-hidden tabindex="-1" href="#architecture"><span class="icon icon-link"></span></a>Architecture</h1>
<p>Tome is built on Vite and React. Understanding the architecture helps when debugging build issues or building advanced customizations.</p>
<h2 id="overview"><a class="heading-anchor" aria-hidden tabindex="-1" href="#overview"><span class="icon icon-link"></span></a>Overview</h2>
<p>A Tome site is a Vite application with a custom plugin that handles page discovery, routing, and content processing. The theme package provides the React UI shell.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>tome.config.js  →  Vite Plugin  →  Virtual Modules  →  Theme Shell  →  Static Site</span></span></code></pre>
<h2 id="vite-plugin"><a class="heading-anchor" aria-hidden tabindex="-1" href="#vite-plugin"><span class="icon icon-link"></span></a>Vite plugin</h2>
<p>The core of Tome is <code>vite-plugin-tome</code> in <code>@tome/core</code>. It has three responsibilities:</p>
<p><strong>1. Page discovery</strong> — On startup, the plugin scans <code>pages/</code> for <code>.md</code> and <code>.mdx</code> files, extracts frontmatter, and builds a route table. It watches for file changes during development and triggers hot reloads.</p>
<p><strong>2. Virtual modules</strong> — The plugin exposes content through Vite's virtual module system:</p>
<table>
<thead>
<tr>
<th>Module</th>
<th>Contents</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>virtual:tome/config</code></td>
<td>The resolved config as JSON</td>
</tr>
<tr>
<td><code>virtual:tome/routes</code></td>
<td>Route table with IDs, URLs, and frontmatter</td>
</tr>
<tr>
<td><code>virtual:tome/page/:id</code></td>
<td>Processed page content</td>
</tr>
<tr>
<td><code>virtual:tome/api</code></td>
<td>Parsed OpenAPI manifest</td>
</tr>
<tr>
<td><code>virtual:tome/analytics</code></td>
<td>Analytics provider settings</td>
</tr>
</tbody>
</table>
<p><strong>3. Build-time generation</strong> — During builds, the plugin injects analytics scripts and generates the <code>mcp.json</code> manifest.</p>
<h2 id="theme-system"><a class="heading-anchor" aria-hidden tabindex="-1" href="#theme-system"><span class="icon icon-link"></span></a>Theme system</h2>
<p>The theme package (<code>@tome/theme</code>) provides the React shell:</p>
<ul>
<li><strong>Shell component</strong> — Header, sidebar, content area, footer</li>
<li><strong>Preset system</strong> — Color tokens and CSS variables per preset</li>
<li><strong>Search integration</strong> — Pagefind or Algolia, loaded dynamically</li>
<li><strong>AI chat</strong> — Optional floating widget</li>
</ul>
<p>The entry point (<code>.tome/entry.tsx</code>) bootstraps the shell by importing <code>@tome/theme/entry</code>.</p>
<h2 id="content-pipeline"><a class="heading-anchor" aria-hidden tabindex="-1" href="#content-pipeline"><span class="icon icon-link"></span></a>Content pipeline</h2>
<h3 id="markdown-md"><a class="heading-anchor" aria-hidden tabindex="-1" href="#markdown-md"><span class="icon icon-link"></span></a>Markdown (<code>.md</code>)</h3>
<ol>
<li>Frontmatter extracted via <code>gray-matter</code></li>
<li>Markdown processed to HTML (syntax highlighting, GFM tables, headings)</li>
<li>HTML + headings + frontmatter served as virtual module</li>
</ol>
<h3 id="mdx-mdx"><a class="heading-anchor" aria-hidden tabindex="-1" href="#mdx-mdx"><span class="icon icon-link"></span></a>MDX (<code>.mdx</code>)</h3>
<ol>
<li>Frontmatter and headings extracted from raw source</li>
<li>File passed to <code>@mdx-js/rollup</code> for JSX compilation</li>
<li>Virtual module re-exports the compiled React component + metadata</li>
</ol>
<h2 id="build-output"><a class="heading-anchor" aria-hidden tabindex="-1" href="#build-output"><span class="icon icon-link"></span></a>Build output</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>out/</span></span>
<span class="line"><span>├── index.html           # SPA entry</span></span>
<span class="line"><span>├── assets/</span></span>
<span class="line"><span>│   ├── index-[hash].js  # Application bundle</span></span>
<span class="line"><span>│   └── index-[hash].css # Styles</span></span>
<span class="line"><span>├── _pagefind/           # Search index</span></span>
<span class="line"><span>├── mcp.json             # MCP manifest</span></span>
<span class="line"><span>└── 404.html             # Error page</span></span></code></pre>
<p>The output is a single-page application. Search is fully static.</p>
<h2 id="package-structure"><a class="heading-anchor" aria-hidden tabindex="-1" href="#package-structure"><span class="icon icon-link"></span></a>Package structure</h2>
<table>
<thead>
<tr>
<th>Package</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>@tome/cli</code></td>
<td>CLI commands (init, dev, build, deploy)</td>
</tr>
<tr>
<td><code>@tome/core</code></td>
<td>Config, routing, Vite plugin, markdown processing</td>
</tr>
<tr>
<td><code>@tome/theme</code></td>
<td>Shell UI, presets, search, AI chat</td>
</tr>
<tr>
<td><code>@tome/components</code></td>
<td>MDX components (Callout, Tabs, Card, etc.)</td>
</tr>
</tbody>
</table>`,headings:[{depth:2,text:"Overview",id:"overview"},{depth:2,text:"Vite plugin",id:"vite-plugin"},{depth:2,text:"Theme system",id:"theme-system"},{depth:2,text:"Content pipeline",id:"content-pipeline"},{depth:3,text:"Markdown (.md)",id:"markdown-md"},{depth:3,text:"MDX (.mdx)",id:"mdx-mdx"},{depth:2,text:"Build output",id:"build-output"},{depth:2,text:"Package structure",id:"package-structure"}],raw:`
# Architecture

Tome is built on Vite and React. Understanding the architecture helps when debugging build issues or building advanced customizations.

## Overview

A Tome site is a Vite application with a custom plugin that handles page discovery, routing, and content processing. The theme package provides the React UI shell.

\`\`\`text
tome.config.js  →  Vite Plugin  →  Virtual Modules  →  Theme Shell  →  Static Site
\`\`\`

## Vite plugin

The core of Tome is \`vite-plugin-tome\` in \`@tome/core\`. It has three responsibilities:

**1. Page discovery** — On startup, the plugin scans \`pages/\` for \`.md\` and \`.mdx\` files, extracts frontmatter, and builds a route table. It watches for file changes during development and triggers hot reloads.

**2. Virtual modules** — The plugin exposes content through Vite's virtual module system:

| Module | Contents |
|--------|----------|
| \`virtual:tome/config\` | The resolved config as JSON |
| \`virtual:tome/routes\` | Route table with IDs, URLs, and frontmatter |
| \`virtual:tome/page/:id\` | Processed page content |
| \`virtual:tome/api\` | Parsed OpenAPI manifest |
| \`virtual:tome/analytics\` | Analytics provider settings |

**3. Build-time generation** — During builds, the plugin injects analytics scripts and generates the \`mcp.json\` manifest.

## Theme system

The theme package (\`@tome/theme\`) provides the React shell:

- **Shell component** — Header, sidebar, content area, footer
- **Preset system** — Color tokens and CSS variables per preset
- **Search integration** — Pagefind or Algolia, loaded dynamically
- **AI chat** — Optional floating widget

The entry point (\`.tome/entry.tsx\`) bootstraps the shell by importing \`@tome/theme/entry\`.

## Content pipeline

### Markdown (\`.md\`)

1. Frontmatter extracted via \`gray-matter\`
2. Markdown processed to HTML (syntax highlighting, GFM tables, headings)
3. HTML + headings + frontmatter served as virtual module

### MDX (\`.mdx\`)

1. Frontmatter and headings extracted from raw source
2. File passed to \`@mdx-js/rollup\` for JSX compilation
3. Virtual module re-exports the compiled React component + metadata

## Build output

\`\`\`text
out/
├── index.html           # SPA entry
├── assets/
│   ├── index-[hash].js  # Application bundle
│   └── index-[hash].css # Styles
├── _pagefind/           # Search index
├── mcp.json             # MCP manifest
└── 404.html             # Error page
\`\`\`

The output is a single-page application. Search is fully static.

## Package structure

| Package | Purpose |
|---------|---------|
| \`@tome/cli\` | CLI commands (init, dev, build, deploy) |
| \`@tome/core\` | Config, routing, Vite plugin, markdown processing |
| \`@tome/theme\` | Shell UI, presets, search, AI chat |
| \`@tome/components\` | MDX components (Callout, Tabs, Card, etc.) |
`};export{e as default};
