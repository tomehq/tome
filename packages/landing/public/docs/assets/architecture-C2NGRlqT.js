const e={frontmatter:{title:"Architecture",description:"How Tome works internally — the Vite plugin, virtual modules, build pipeline, and theme system.",hidden:!1,toc:!0,draft:!1},html:`<p>Tome is built on Vite and React. Understanding the architecture helps when debugging build issues or building advanced customizations.</p>
<h2 id="overview"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#overview"><span class="icon icon-link"></span></a>Overview</h2>
<p>A Tome site is a Vite application with a custom plugin that handles page discovery, routing, and content processing. The theme package provides the React UI shell.</p>
<div class="tome-mermaid" data-mermaid="Zmxvd2NoYXJ0IExSCiAgICBBWyJ0b21lLmNvbmZpZy5qcyJdIC0tPiBCWyJWaXRlIFBsdWdpbiJdCiAgICBCIC0tPiBDWyJWaXJ0dWFsIE1vZHVsZXMiXQogICAgQyAtLT4gRFsiVGhlbWUgU2hlbGwiXQogICAgRCAtLT4gRVsiU3RhdGljIFNpdGUiXQ=="></div>
<h2 id="vite-plugin"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#vite-plugin"><span class="icon icon-link"></span></a>Vite plugin</h2>
<p>The core of Tome is <code>vite-plugin-tome</code> in <code>@tomehq/core</code>. It has three responsibilities:</p>
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
<p><strong>3. Build-time generation</strong> — During builds, the plugin injects analytics scripts, JSON-LD schema markup, and generates machine-readable files (<code>mcp.json</code>, <code>llms.txt</code>, <code>skill.md</code>, <code>robots.txt</code>, <code>search.json</code>).</p>
<h2 id="theme-system"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#theme-system"><span class="icon icon-link"></span></a>Theme system</h2>
<p>The theme package (<code>@tomehq/theme</code>) provides the React shell:</p>
<ul>
<li><strong>Shell component</strong> — Header, sidebar, content area, footer</li>
<li><strong>Preset system</strong> — Color tokens and CSS variables per preset</li>
<li><strong>Search integration</strong> — Pagefind or Algolia, loaded dynamically</li>
<li><strong>AI chat</strong> — Optional floating widget</li>
</ul>
<p>The entry point (<code>.tome/entry.tsx</code>) bootstraps the shell by importing <code>@tomehq/theme/entry</code>.</p>
<h2 id="content-pipeline"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#content-pipeline"><span class="icon icon-link"></span></a>Content pipeline</h2>
<div class="tome-mermaid" data-mermaid="Zmxvd2NoYXJ0IFRECiAgICBBWyJwYWdlcy8qLm1kIl0gLS0+IEJbImdyYXktbWF0dGVyIl0KICAgIEIgLS0+IENbIkZyb250bWF0dGVyIl0KICAgIEIgLS0+IERbIk1hcmtkb3duIGJvZHkiXQogICAgRCAtLT4gRVsicmVtYXJrICsgcmVoeXBlIl0KICAgIEUgLS0+IEZbIlNoaWtpIGhpZ2hsaWdodGluZyJdCiAgICBGIC0tPiBHWyJET01QdXJpZnkgc2FuaXRpemUiXQogICAgRyAtLT4gSFsiSFRNTCArIGhlYWRpbmdzIl0KCiAgICBJWyJwYWdlcy8qLm1keCJdIC0tPiBKWyJFeHRyYWN0IGZyb250bWF0dGVyIl0KICAgIEogLS0+IEtbIkBtZHgtanMvcm9sbHVwIl0KICAgIEsgLS0+IExbIlJlYWN0IGNvbXBvbmVudCJd"></div>
<h3 id="markdown-md"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#markdown-md"><span class="icon icon-link"></span></a>Markdown (<code>.md</code>)</h3>
<ol>
<li>Frontmatter extracted via <code>gray-matter</code></li>
<li>Markdown processed through remark (GFM, math) and rehype (slugs, autolink headings)</li>
<li>Code blocks highlighted with Shiki (mermaid blocks converted to client-side placeholders)</li>
<li>HTML sanitized with DOMPurify, headings extracted for table of contents</li>
<li>HTML + headings + frontmatter served as virtual module</li>
</ol>
<h3 id="mdx-mdx"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#mdx-mdx"><span class="icon icon-link"></span></a>MDX (<code>.mdx</code>)</h3>
<ol>
<li>Frontmatter and headings extracted from raw source</li>
<li>Custom remark plugins transform <code>mermaid</code> and <code>math</code> code blocks into JSX placeholder elements</li>
<li>File passed to <code>@mdx-js/rollup</code> for JSX compilation</li>
<li>Virtual module re-exports the compiled React component + metadata</li>
<li>Client-side: mermaid and KaTeX render the placeholders (same as <code>.md</code> files)</li>
</ol>
<h2 id="build-output"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#build-output"><span class="icon icon-link"></span></a>Build output</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>out/</span></span>
<span class="line"><span>├── index.html           # SPA entry with JSON-LD schema</span></span>
<span class="line"><span>├── assets/</span></span>
<span class="line"><span>│   ├── index-[hash].js  # Application bundle</span></span>
<span class="line"><span>│   └── index-[hash].css # Styles</span></span>
<span class="line"><span>├── [page]/index.html    # Per-page HTML shells (SEO + Pagefind)</span></span>
<span class="line"><span>├── _pagefind/           # Search index</span></span>
<span class="line"><span>├── mcp.json             # MCP manifest</span></span>
<span class="line"><span>├── llms.txt             # AI-readable page index</span></span>
<span class="line"><span>├── llms-full.txt        # Full page content for LLMs</span></span>
<span class="line"><span>├── skill.md             # Agent capability file</span></span>
<span class="line"><span>├── robots.txt           # Crawler directives (AI-friendly)</span></span>
<span class="line"><span>├── search.json          # Structured page index (JSON API)</span></span>
<span class="line"><span>├── og/                  # Auto-generated Open Graph images</span></span>
<span class="line"><span>└── 404.html             # Error page</span></span></code></pre>
<p>The output is a single-page application with per-page HTML shells for SEO and search indexing. Each page shell contains the content in a <code>data-pagefind-body</code> div for Pagefind and a <code>TechArticle</code> JSON-LD schema in the <code>&lt;head&gt;</code>.</p>
<p>Six machine-readable files are auto-generated at build time to make your docs discoverable by AI tools, search engines, and language models — no configuration needed.</p>
<h2 id="package-structure"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#package-structure"><span class="icon icon-link"></span></a>Package structure</h2>
<table>
<thead>
<tr>
<th>Package</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>@tomehq/cli</code></td>
<td>CLI commands (init, dev, build, deploy)</td>
</tr>
<tr>
<td><code>@tomehq/core</code></td>
<td>Config, routing, Vite plugin, markdown processing</td>
</tr>
<tr>
<td><code>@tomehq/theme</code></td>
<td>Shell UI, presets, search, AI chat</td>
</tr>
<tr>
<td><code>@tomehq/components</code></td>
<td>MDX components (Callout, Tabs, Card, etc.)</td>
</tr>
</tbody>
</table>`,headings:[{depth:2,text:"Overview",id:"overview"},{depth:2,text:"Vite plugin",id:"vite-plugin"},{depth:2,text:"Theme system",id:"theme-system"},{depth:2,text:"Content pipeline",id:"content-pipeline"},{depth:3,text:"Markdown (.md)",id:"markdown-md"},{depth:3,text:"MDX (.mdx)",id:"mdx-mdx"},{depth:2,text:"Build output",id:"build-output"},{depth:2,text:"Package structure",id:"package-structure"}],raw:`
Tome is built on Vite and React. Understanding the architecture helps when debugging build issues or building advanced customizations.

## Overview

A Tome site is a Vite application with a custom plugin that handles page discovery, routing, and content processing. The theme package provides the React UI shell.

\`\`\`mermaid
flowchart LR
    A["tome.config.js"] --> B["Vite Plugin"]
    B --> C["Virtual Modules"]
    C --> D["Theme Shell"]
    D --> E["Static Site"]
\`\`\`

## Vite plugin

The core of Tome is \`vite-plugin-tome\` in \`@tomehq/core\`. It has three responsibilities:

**1. Page discovery** — On startup, the plugin scans \`pages/\` for \`.md\` and \`.mdx\` files, extracts frontmatter, and builds a route table. It watches for file changes during development and triggers hot reloads.

**2. Virtual modules** — The plugin exposes content through Vite's virtual module system:

| Module | Contents |
|--------|----------|
| \`virtual:tome/config\` | The resolved config as JSON |
| \`virtual:tome/routes\` | Route table with IDs, URLs, and frontmatter |
| \`virtual:tome/page/:id\` | Processed page content |
| \`virtual:tome/api\` | Parsed OpenAPI manifest |
| \`virtual:tome/analytics\` | Analytics provider settings |

**3. Build-time generation** — During builds, the plugin injects analytics scripts, JSON-LD schema markup, and generates machine-readable files (\`mcp.json\`, \`llms.txt\`, \`skill.md\`, \`robots.txt\`, \`search.json\`).

## Theme system

The theme package (\`@tomehq/theme\`) provides the React shell:

- **Shell component** — Header, sidebar, content area, footer
- **Preset system** — Color tokens and CSS variables per preset
- **Search integration** — Pagefind or Algolia, loaded dynamically
- **AI chat** — Optional floating widget

The entry point (\`.tome/entry.tsx\`) bootstraps the shell by importing \`@tomehq/theme/entry\`.

## Content pipeline

\`\`\`mermaid
flowchart TD
    A["pages/*.md"] --> B["gray-matter"]
    B --> C["Frontmatter"]
    B --> D["Markdown body"]
    D --> E["remark + rehype"]
    E --> F["Shiki highlighting"]
    F --> G["DOMPurify sanitize"]
    G --> H["HTML + headings"]

    I["pages/*.mdx"] --> J["Extract frontmatter"]
    J --> K["@mdx-js/rollup"]
    K --> L["React component"]
\`\`\`

### Markdown (\`.md\`)

1. Frontmatter extracted via \`gray-matter\`
2. Markdown processed through remark (GFM, math) and rehype (slugs, autolink headings)
3. Code blocks highlighted with Shiki (mermaid blocks converted to client-side placeholders)
4. HTML sanitized with DOMPurify, headings extracted for table of contents
5. HTML + headings + frontmatter served as virtual module

### MDX (\`.mdx\`)

1. Frontmatter and headings extracted from raw source
2. Custom remark plugins transform \`mermaid\` and \`math\` code blocks into JSX placeholder elements
3. File passed to \`@mdx-js/rollup\` for JSX compilation
4. Virtual module re-exports the compiled React component + metadata
5. Client-side: mermaid and KaTeX render the placeholders (same as \`.md\` files)

## Build output

\`\`\`text
out/
├── index.html           # SPA entry with JSON-LD schema
├── assets/
│   ├── index-[hash].js  # Application bundle
│   └── index-[hash].css # Styles
├── [page]/index.html    # Per-page HTML shells (SEO + Pagefind)
├── _pagefind/           # Search index
├── mcp.json             # MCP manifest
├── llms.txt             # AI-readable page index
├── llms-full.txt        # Full page content for LLMs
├── skill.md             # Agent capability file
├── robots.txt           # Crawler directives (AI-friendly)
├── search.json          # Structured page index (JSON API)
├── og/                  # Auto-generated Open Graph images
└── 404.html             # Error page
\`\`\`

The output is a single-page application with per-page HTML shells for SEO and search indexing. Each page shell contains the content in a \`data-pagefind-body\` div for Pagefind and a \`TechArticle\` JSON-LD schema in the \`<head>\`.

Six machine-readable files are auto-generated at build time to make your docs discoverable by AI tools, search engines, and language models — no configuration needed.

## Package structure

| Package | Purpose |
|---------|---------|
| \`@tomehq/cli\` | CLI commands (init, dev, build, deploy) |
| \`@tomehq/core\` | Config, routing, Vite plugin, markdown processing |
| \`@tomehq/theme\` | Shell UI, presets, search, AI chat |
| \`@tomehq/components\` | MDX components (Callout, Tabs, Card, etc.) |
`};export{e as default};
