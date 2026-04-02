#!/usr/bin/env node

import { Command } from "commander";
import pc from "picocolors";
import { resolve, join } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { runPagefind } from "./pagefind.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Read version from package.json at runtime so it's always current
const VERSION = (() => {
  try {
    const pkg = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf-8"));
    return pkg.version || "0.0.0";
  } catch {
    return "0.0.0";
  }
})();

const logo = `
  ${pc.bold(pc.italic("Tome"))}${pc.red(".")} ${pc.dim(`v${VERSION}`)}
`;

const program = new Command();

program
  .name("tome")
  .description("Beautiful documentation that doesn't cost a fortune")
  .version(VERSION)
  .addHelpText("beforeAll", logo);

// ── INIT ─────────────────────────────────────────────────
program
  .command("init [name]")
  .description("Create a new Tome documentation project")
  .option("-t, --template <name>", "Starter template", "default")
  .action(async (name: string | undefined, opts: { template: string }) => {
    const projectName = name || "my-docs";
    const targetDir = resolve(process.cwd(), projectName);

    console.log(logo);
    console.log(pc.dim("  Creating new documentation project...\n"));

    if (existsSync(targetDir)) {
      console.error(pc.red(`  Error: Directory "${projectName}" already exists.\n`));
      process.exit(1);
    }

    // Create project directory with diataxis structure
    mkdirSync(targetDir, { recursive: true });
    mkdirSync(join(targetDir, "pages", "tutorials"), { recursive: true });
    mkdirSync(join(targetDir, "pages", "guides"), { recursive: true });
    mkdirSync(join(targetDir, "pages", "reference"), { recursive: true });
    mkdirSync(join(targetDir, "pages", "concepts"), { recursive: true });
    mkdirSync(join(targetDir, "public"), { recursive: true });
    mkdirSync(join(targetDir, "styles"), { recursive: true });

    // Write tome.config.js
    writeFileSync(
      join(targetDir, "tome.config.js"),
      `/** @type {import('@tomehq/core').TomeConfig} */
export default {
  name: "${projectName}",
  theme: {
    preset: "amber",
    mode: "auto",
  },
  navigation: [
    {
      group: "Overview",
      pages: ["index"],
    },
    {
      group: "Tutorials",
      pages: ["tutorials/getting-started", "tutorials/deploy"],
    },
    {
      group: "Guides",
      pages: ["guides/components", "guides/configuration"],
    },
    {
      group: "Reference",
      pages: ["reference/config", "reference/components", "reference/cli"],
    },
    {
      group: "Concepts",
      pages: ["concepts/how-tome-works", "concepts/file-routing"],
    },
  ],
  // socialLinks: [
  //   { platform: "github", url: "https://github.com/your-org/your-repo" },
  //   { platform: "twitter", url: "https://x.com/your-handle" },
  // ],
};
`
    );

    // Write package.json
    writeFileSync(
      join(targetDir, "package.json"),
      JSON.stringify(
        {
          name: projectName,
          private: true,
          type: "module",
          scripts: {
            dev: "tome dev",
            build: "tome build",
            deploy: "tome deploy",
          },
          devDependencies: {
            "@tomehq/cli": `^${VERSION}`,
            "@tomehq/theme": `^${VERSION}`,
            "react": "^19.0.0",
            "react-dom": "^19.0.0",
          },
        },
        null,
        2
      ) + "\n"
    );

    // ── Overview ──────────────────────────────────────────
    writeFileSync(
      join(targetDir, "pages", "index.md"),
      `---
title: Welcome
description: Documentation for ${projectName}, powered by Tome.
---

# ${projectName}

Welcome to your documentation site. This project was scaffolded with [Tome](https://tome.center) — write in Markdown, ship beautiful docs.

## Quick Start

\`\`\`bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Build static site to out/
\`\`\`

## Project Structure

\`\`\`text
${projectName}/
├── tome.config.js         # Site configuration
├── pages/                 # Documentation pages
│   ├── index.md           # This page
│   ├── tutorials/         # Step-by-step lessons
│   ├── guides/            # Task-oriented how-tos
│   ├── reference/         # Technical reference
│   └── concepts/          # Explanations and architecture
├── public/                # Static assets (images, fonts)
└── package.json
\`\`\`

This site follows the [Diataxis](https://diataxis.fr) documentation framework — four categories that serve different reader needs:

| Category | Purpose | Example |
|----------|---------|---------|
| **Tutorials** | Learning-oriented. Walk a beginner through a task. | "Build your first docs site" |
| **Guides** | Task-oriented. Solve a specific problem. | "Add a callout component" |
| **Reference** | Information-oriented. Describe the machinery. | "Configuration options" |
| **Concepts** | Understanding-oriented. Explain how things work. | "How file routing works" |

## Next Steps

- **[Getting Started](/tutorials/getting-started)** — Build and customize your first page.
- **[Components Guide](/guides/components)** — Add interactive elements to your docs.
- **[Configuration Reference](/reference/config)** — Every option in \`tome.config.js\`.
`
    );

    // ── Tutorials ─────────────────────────────────────────
    writeFileSync(
      join(targetDir, "pages", "tutorials", "getting-started.md"),
      `---
title: Getting Started
description: Build your first documentation page from scratch — from writing content to seeing it in the browser.
icon: rocket
---

# Getting Started

This tutorial walks you through creating and customizing your first documentation page. By the end, you will have a working page with formatted content and navigation.

## Prerequisites

- Node.js 20 or later ([download](https://nodejs.org))
- A code editor (VS Code, Cursor, etc.)
- A terminal

## Step 1: Start the dev server

If you haven't already, install dependencies and start the server:

\`\`\`bash
cd ${projectName}
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000). You should see this documentation site.

## Step 2: Create a new page

Create a new file at \`pages/tutorials/my-first-page.md\`:

\`\`\`markdown
---
title: My First Page
description: A page I created from scratch.
---

# My First Page

This is my first documentation page. It supports **bold**, *italic*, \\\`code\\\`, and more.

## A section

Content is organized with headings. Each heading appears in the table of contents.

- Bullet lists work
- So do numbered lists
- And [links](https://tome.center)
\`\`\`

Save the file. The browser reloads automatically.

## Step 3: Add it to the sidebar

Open \`tome.config.js\` and add your page to the navigation:

\`\`\`javascript
{
  group: "Tutorials",
  pages: ["tutorials/getting-started", "tutorials/my-first-page", "tutorials/deploy"],
},
\`\`\`

The page ID is the file path relative to \`pages/\`, without the extension.

## Step 4: Add frontmatter

Every page supports YAML frontmatter at the top:

\`\`\`markdown
---
title: My First Page
description: A page I created from scratch.
icon: book
sidebarTitle: First Page
---
\`\`\`

| Field | Description |
|-------|-------------|
| \`title\` | Page title in browser tab and sidebar |
| \`description\` | Summary for search and SEO |
| \`icon\` | Icon next to the title in the sidebar |
| \`sidebarTitle\` | Override the sidebar label |
| \`hidden\` | Set to \`true\` to hide from sidebar |

## What you learned

You created a Markdown page, added it to navigation, and configured frontmatter. Next, try adding [interactive components](/guides/components) to your pages.
`
    );

    writeFileSync(
      join(targetDir, "pages", "tutorials", "deploy.md"),
      `---
title: Deploy Your Site
description: Build your docs for production and deploy to any static hosting provider.
icon: globe
---

# Deploy Your Site

Tome builds to static files that work on any hosting platform. This tutorial covers building and deploying.

## Build for production

\`\`\`bash
npm run build
\`\`\`

This outputs a static site to the \`out/\` directory.

## Deploy options

### Vercel

\`\`\`bash
npx vercel deploy ./out
\`\`\`

### Netlify

\`\`\`bash
npx netlify deploy --dir=./out --prod
\`\`\`

### Cloudflare Pages

\`\`\`bash
npx wrangler pages deploy ./out
\`\`\`

### Tome Cloud

\`\`\`bash
npm run deploy
\`\`\`

This uses \`tome deploy\` which uploads your site to Tome Cloud with hash-based deduplication.

## CI/CD

This project includes a GitHub Actions workflow at \`.github/workflows/deploy.yml\` that automatically deploys on push to \`main\` and creates preview deployments for pull requests.

## What you learned

You built your site to static files and deployed it. Your docs are now live.
`
    );

    // ── Guides ────────────────────────────────────────────
    writeFileSync(
      join(targetDir, "pages", "guides", "components.mdx"),
      `---
title: Using Components
description: Add interactive elements like callouts, tabs, cards, and steps to your documentation.
icon: puzzle
---

# Using Components

Tome includes built-in components you can use in any \`.mdx\` file. No imports required.

## Callouts

Draw attention to important information:

<Callout type="info" title="Information">
  Use info callouts for context and background details.
</Callout>

<Callout type="tip" title="Tip">
  Use tip callouts for best practices and helpful suggestions.
</Callout>

<Callout type="warning" title="Warning">
  Use warning callouts when the reader should proceed with caution.
</Callout>

<Callout type="danger" title="Danger">
  Use danger callouts for critical warnings about destructive actions.
</Callout>

## Tabs

Present content in multiple variants — different languages, platforms, or package managers:

<Tabs items={["npm", "yarn", "pnpm"]}>
  <div>
    \`\`\`bash
    npm install @tomehq/cli
    \`\`\`
  </div>
  <div>
    \`\`\`bash
    yarn add @tomehq/cli
    \`\`\`
  </div>
  <div>
    \`\`\`bash
    pnpm add @tomehq/cli
    \`\`\`
  </div>
</Tabs>

## Cards

Link to related pages or showcase features:

<CardGroup cols={2}>
  <Card title="Tutorials" icon="\u{1F393}" href="/tutorials/getting-started">
    Step-by-step lessons to learn the basics.
  </Card>
  <Card title="Reference" icon="\u{1F4D6}" href="/reference/config">
    Technical details on every configuration option.
  </Card>
</CardGroup>

## Steps

Guide readers through a sequential process:

<Steps>
  <div>
    **Create an MDX file**

    Create a new file with the \`.mdx\` extension in your \`pages/\` directory.
  </div>
  <div>
    **Add a component**

    Use any built-in component directly in your content. No imports needed.
  </div>
  <div>
    **Save and preview**

    The dev server reloads automatically when you save.
  </div>
</Steps>

## Accordions

Collapse content behind a toggle — useful for FAQs:

<Accordion title="Do I need to import components?">
  No. All built-in components are automatically available in every \`.mdx\` file.
</Accordion>

<Accordion title="Can I use components in .md files?">
  Components only work in \`.mdx\` files. Rename your file from \`.md\` to \`.mdx\` to use them.
</Accordion>
`
    );

    writeFileSync(
      join(targetDir, "pages", "guides", "configuration.md"),
      `---
title: Customizing Your Site
description: Change your site name, theme, colors, and navigation layout.
icon: settings
---

# Customizing Your Site

All configuration lives in \`tome.config.js\` at the root of your project.

## Change the site name

\`\`\`javascript
export default {
  name: "My Project",
};
\`\`\`

The name appears in the sidebar header and browser tab.

## Switch themes

Tome ships with two presets:

\`\`\`javascript
theme: {
  preset: "amber",      // Warm, approachable (default)
  // preset: "editorial", // Clean, typographic
  mode: "auto",          // "light", "dark", or "auto"
},
\`\`\`

## Custom accent color

Override the default accent with any hex color:

\`\`\`javascript
theme: {
  preset: "amber",
  accent: "#3b82f6",  // Blue accent
  mode: "auto",
},
\`\`\`

## Organize navigation

The sidebar is defined by the \`navigation\` array. Each group has a label and a list of page IDs:

\`\`\`javascript
navigation: [
  {
    group: "Getting Started",
    pages: ["index", "tutorials/getting-started"],
  },
  {
    group: "API",
    pages: ["reference/endpoints", "reference/auth"],
  },
],
\`\`\`

Page IDs are file paths relative to \`pages/\`, without the extension.

## Add social links

\`\`\`javascript
socialLinks: [
  { platform: "github", url: "https://github.com/your-org/your-repo" },
  { platform: "discord", url: "https://discord.gg/your-server" },
  { platform: "twitter", url: "https://x.com/your-handle" },
],
\`\`\`

See the [Configuration Reference](/reference/config) for every available option.
`
    );

    // ── Reference ─────────────────────────────────────────
    writeFileSync(
      join(targetDir, "pages", "reference", "config.md"),
      `---
title: Configuration
description: Complete reference for every option in tome.config.js.
icon: file-cog
---

# Configuration Reference

All options for \`tome.config.js\`.

## Top-level options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`name\` | \`string\` | \`"My Docs"\` | Site name shown in sidebar and title |
| \`description\` | \`string\` | — | Site description for SEO |
| \`logo\` | \`string\` | — | Path to logo image |
| \`favicon\` | \`string\` | — | Path to favicon |
| \`navigation\` | \`array\` | \`[]\` | Sidebar navigation groups |
| \`socialLinks\` | \`array\` | \`[]\` | Social links in the header |

## theme

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`preset\` | \`"amber" \\| "editorial"\` | \`"amber"\` | Theme preset |
| \`accent\` | \`string\` | — | Custom accent color (hex) |
| \`mode\` | \`"light" \\| "dark" \\| "auto"\` | \`"auto"\` | Color mode |

## navigation

\`\`\`javascript
navigation: [
  {
    group: "Section Name",
    pages: ["page-id", "folder/page-id"],
  },
],
\`\`\`

Page IDs are file paths relative to \`pages/\`, without the file extension.

## socialLinks

\`\`\`javascript
socialLinks: [
  { platform: "github", url: "https://github.com/..." },
  { platform: "twitter", url: "https://x.com/..." },
  { platform: "discord", url: "https://discord.gg/..." },
  { platform: "custom", url: "https://...", icon: "mastodon" },
],
\`\`\`

Supported platforms: \`github\`, \`twitter\`, \`discord\`, \`linkedin\`, \`custom\`.
`
    );

    writeFileSync(
      join(targetDir, "pages", "reference", "components.md"),
      `---
title: Component Reference
description: API reference for every built-in MDX component.
icon: box
---

# Component Reference

All built-in components are available in \`.mdx\` files without imports.

## Callout

\`\`\`jsx
<Callout type="info" title="Title">
  Content here.
</Callout>
\`\`\`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| \`type\` | \`"info" \\| "tip" \\| "warning" \\| "danger"\` | Yes | Visual style |
| \`title\` | \`string\` | No | Header text |

## Tabs

\`\`\`jsx
<Tabs items={["Tab 1", "Tab 2"]}>
  <div>Content for tab 1</div>
  <div>Content for tab 2</div>
</Tabs>
\`\`\`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| \`items\` | \`string[]\` | Yes | Tab labels |

## Card

\`\`\`jsx
<Card title="Title" icon="\u{1F680}" href="/link">
  Description text.
</Card>
\`\`\`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| \`title\` | \`string\` | Yes | Card heading |
| \`icon\` | \`string\` | No | Emoji or icon |
| \`href\` | \`string\` | No | Link target |

## CardGroup

\`\`\`jsx
<CardGroup cols={2}>
  <Card title="A" />
  <Card title="B" />
</CardGroup>
\`\`\`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| \`cols\` | \`number\` | No | Column count (default: 3) |

## Steps

\`\`\`jsx
<Steps>
  <div>**Step 1** — Description</div>
  <div>**Step 2** — Description</div>
</Steps>
\`\`\`

Each direct child \`<div>\` becomes a numbered step.

## Accordion

\`\`\`jsx
<Accordion title="Question?">
  Answer content.
</Accordion>
\`\`\`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| \`title\` | \`string\` | Yes | Toggle header |
`
    );

    writeFileSync(
      join(targetDir, "pages", "reference", "cli.md"),
      `---
title: CLI Reference
description: Every command and flag available in the Tome CLI.
icon: terminal
---

# CLI Reference

## tome init

Create a new documentation project.

\`\`\`bash
tome init [name]
\`\`\`

| Option | Description |
|--------|-------------|
| \`-t, --template <name>\` | Starter template (default: \`"default"\`) |

## tome dev

Start the development server with hot reloading.

\`\`\`bash
tome dev
\`\`\`

| Option | Description |
|--------|-------------|
| \`-p, --port <number>\` | Port number (default: \`3000\`) |
| \`--host\` | Expose to network |

## tome build

Build the site for production.

\`\`\`bash
tome build
\`\`\`

Outputs static files to the \`out/\` directory.

## tome deploy

Deploy to Tome Cloud.

\`\`\`bash
tome deploy
\`\`\`

| Option | Description |
|--------|-------------|
| \`--preview\` | Create a preview deployment |

Requires \`TOME_TOKEN\` environment variable or \`tome login\`.
`
    );

    // ── Concepts ──────────────────────────────────────────
    writeFileSync(
      join(targetDir, "pages", "concepts", "how-tome-works.md"),
      `---
title: How Tome Works
description: Understand the architecture behind Tome — from Markdown files to a running documentation site.
icon: lightbulb
---

# How Tome Works

Tome turns a folder of Markdown files into a single-page application. Here is how.

## The pipeline

1. **You write Markdown** — \`.md\` and \`.mdx\` files in the \`pages/\` directory.
2. **Tome reads your config** — \`tome.config.js\` defines navigation, theme, and site metadata.
3. **Vite builds the app** — Tome's Vite plugin transforms your content into React components at build time.
4. **The theme renders it** — The shell component handles layout, sidebar, search, and navigation.
5. **Static output** — \`tome build\` produces static HTML, CSS, and JS in the \`out/\` directory.

## Key pieces

| Package | Role |
|---------|------|
| \`@tomehq/cli\` | CLI commands — \`init\`, \`dev\`, \`build\`, \`deploy\` |
| \`@tomehq/core\` | Config loading, routing, Vite plugin, markdown processing |
| \`@tomehq/theme\` | UI shell, sidebar, search, dark mode, presets |
| \`@tomehq/components\` | MDX components — Callout, Tabs, Card, Steps, etc. |

## Dev vs build

In **development**, Tome runs a Vite dev server with hot module replacement. Edit a file, save, and the browser updates instantly.

In **production**, \`tome build\` pre-renders all routes to static HTML with client-side hydration. The output works on any static host — no server required.

## Agent-friendly output

Every build automatically generates:

- \`llms.txt\` — Structured content for LLMs
- \`search.json\` — Full-text search index
- \`mcp.json\` — MCP server configuration
- \`robots.txt\` — Crawler directives
- JSON-LD schema markup in every page
`
    );

    writeFileSync(
      join(targetDir, "pages", "concepts", "file-routing.md"),
      `---
title: File Routing
description: How files in the pages directory map to URLs on your site.
icon: folder
---

# File Routing

Tome uses file-system routing. Every \`.md\` or \`.mdx\` file in the \`pages/\` directory becomes a page.

## How paths map to URLs

| File | URL |
|------|-----|
| \`pages/index.md\` | \`/\` |
| \`pages/quickstart.md\` | \`/quickstart\` |
| \`pages/guides/setup.md\` | \`/guides/setup\` |
| \`pages/reference/config.md\` | \`/reference/config\` |

## Rules

- **\`index.md\`** in any directory becomes the root of that path (\`pages/guides/index.md\` → \`/guides\`).
- **Nested directories** create nested URL paths.
- **File extension** is stripped — both \`.md\` and \`.mdx\` work the same way.
- **Underscored files** (e.g., \`_draft.md\`) are ignored.

## Navigation vs routing

File routing determines what URLs exist. The \`navigation\` array in \`tome.config.js\` determines what appears in the sidebar and in what order. Pages that exist but are not listed in navigation are still accessible by URL — they just do not appear in the sidebar.

## Organizing content

We recommend the [Diataxis](https://diataxis.fr) structure:

\`\`\`text
pages/
├── index.md
├── tutorials/       # Learning-oriented
├── guides/          # Task-oriented
├── reference/       # Information-oriented
└── concepts/        # Understanding-oriented
\`\`\`

This gives your readers a clear mental model of where to find what they need.
`
    );

    // Write index.html (Vite entry point)
    mkdirSync(join(targetDir, ".tome"), { recursive: true });
    writeFileSync(
      join(targetDir, "index.html"),
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
    </style>
  </head>
  <body>
    <div id="tome-root"></div>
    <script type="module" src="./.tome/entry.tsx"></script>
  </body>
</html>
`
    );

    writeFileSync(
      join(targetDir, ".tome", "entry.tsx"),
      `// Bootstraps the Tome documentation shell.\n// Configure your site in tome.config.js instead.\nimport "@tomehq/theme/entry";\n`
    );

    // Write GitHub Actions deploy workflow
    mkdirSync(join(targetDir, ".github", "workflows"), { recursive: true });
    writeFileSync(
      join(targetDir, ".github", "workflows", "deploy.yml"),
      `# Deploys your Tome docs to the Tome platform.
# This file was generated by the Tome CLI and is safe to
# customize for your project.
# It uses github-hosted runners with pnpm and Node.js 20 to
# build your docs and run tome deploy.
name: Deploy Docs
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # Check out your repository so the workflow can access
      # your docs source.
      - uses: actions/checkout@v4

      # Set up pnpm for dependency installation and caching.
      - uses: pnpm/action-setup@v4

      # Set up Node.js (version 20 LTS) with dependency caching for
      # faster builds.
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: pnpm

      # Install dependencies and build the documentation
      # site.
      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      # Preview deploy on PRs so changes can be reviewed
      # before merging.
      - name: Deploy Preview
        if: github.event_name == 'pull_request'
        run: npx tome deploy --preview
        env:
          TOME_TOKEN: \${{ secrets.TOME_TOKEN }}

      # Production deploy on push to main.
      - name: Deploy
        if: github.event_name == 'push'
        run: npx tome deploy
        env:
          TOME_TOKEN: \${{ secrets.TOME_TOKEN }}
`
    );

    // Write .gitignore
    writeFileSync(
      join(targetDir, ".gitignore"),
      `node_modules/
out/
dist/
.DS_Store
`
    );

    console.log(pc.green("  ✓ ") + `Project created at ${pc.bold(projectName)}/\n`);
    console.log(pc.dim("  Next steps:\n"));
    console.log(`    ${pc.cyan("cd")} ${projectName}`);
    console.log(`    ${pc.cyan("npm install")}`);
    console.log(`    ${pc.cyan("npm run dev")}\n`);
    console.log(pc.dim(`  Then open ${pc.underline("http://localhost:3000")} to see your docs.\n`));
  });

// ── DEV ──────────────────────────────────────────────────
program
  .command("dev")
  .description("Start the development server")
  .option("-p, --port <number>", "Port number", "3000")
  .option("--host", "Expose to network")
  .action(async (opts: { port: string; host?: boolean }) => {
    console.log(logo);
    console.log(pc.dim("  Starting dev server...\n"));

    try {
      const { createServer } = await import("vite");
      const { default: react } = await import("@vitejs/plugin-react");
      const { default: tomePlugin } = await import("@tomehq/core/vite-plugin");

      const root = process.cwd();

      // Ensure .tome/entry.tsx exists (generated by init, but may be gitignored)
      const tomeDir = join(root, ".tome");
      const entryFile = join(tomeDir, "entry.tsx");
      if (!existsSync(entryFile)) {
        mkdirSync(tomeDir, { recursive: true });
        writeFileSync(
          entryFile,
          `// Bootstraps the Tome documentation shell.\n// Configure your site in tome.config.js instead.\nimport "@tomehq/theme/entry";\n`
        );
      }

      const server = await createServer({
        root,
        server: {
          port: parseInt(opts.port),
          host: opts.host || false,
          open: false,
        },
        plugins: [
          tomePlugin({ root }),
          react(),
        ],
        optimizeDeps: {
          include: ["react", "react/jsx-runtime", "react/jsx-dev-runtime", "react-dom", "react-dom/client"],
        },
        resolve: {
          alias: {
            "~tome": root,
          },
        },
      });

      await server.listen();

      const port = server.config.server.port || 3000;
      const host = opts.host ? "0.0.0.0" : "localhost";

      console.log(pc.green("  ✓ ") + "Dev server running\n");
      console.log(`    ${pc.dim("Local:")}   ${pc.cyan(`http://localhost:${port}`)}`);
      if (opts.host) {
        console.log(`    ${pc.dim("Network:")} ${pc.cyan(`http://${host}:${port}`)}`);
      }
      console.log(`\n  ${pc.dim("Press")} ${pc.bold("Ctrl+C")} ${pc.dim("to stop")}\n`);

    } catch (err) {
      console.error(pc.red("\n  Error starting dev server:\n"));
      console.error(
        `  ${err instanceof Error ? err.message : String(err)}\n`
      );
      process.exit(1);
    }
  });

// ── BUILD ────────────────────────────────────────────────
program
  .command("build")
  .description("Build documentation for production")
  .option("-o, --outDir <dir>", "Output directory", "out")
  .action(async (opts: { outDir: string }) => {
    console.log(logo);
    console.log(pc.dim("  Building for production...\n"));

    const startTime = Date.now();

    try {
      const { build } = await import("vite");
      const { default: react } = await import("@vitejs/plugin-react");
      const { default: tomePlugin } = await import("@tomehq/core/vite-plugin");

      const root = process.cwd();

      // Ensure .tome/entry.tsx exists (generated by init, but may be gitignored)
      const tomeDir = join(root, ".tome");
      const entryFile = join(tomeDir, "entry.tsx");
      if (!existsSync(entryFile)) {
        mkdirSync(tomeDir, { recursive: true });
        writeFileSync(
          entryFile,
          `// Bootstraps the Tome documentation shell.\n// Configure your site in tome.config.js instead.\nimport "@tomehq/theme/entry";\n`
        );
      }

      await build({
        root,
        build: {
          outDir: resolve(root, opts.outDir),
          emptyOutDir: true,
        },
        plugins: [
          tomePlugin({ root }),
          react(),
        ],
        optimizeDeps: {
          include: ["react", "react/jsx-runtime", "react/jsx-dev-runtime", "react-dom", "react-dom/client"],
        },
        resolve: {
          alias: {
            "~tome": root,
          },
        },
      });

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`\n  ${pc.green("✓")} Built in ${pc.bold(elapsed + "s")}`);
      console.log(`  ${pc.dim("Output:")} ${pc.cyan(resolve(root, opts.outDir))}\n`);

      // Run Pagefind to build search index (suppress noisy output, show summary only)
      try {
        const outDirAbs = resolve(root, opts.outDir);
        const pagefindOut = runPagefind(outDirAbs, root);
        // Check if indexing was meaningful
        if (pagefindOut && pagefindOut.includes("Indexed 0 pages")) {
          console.log(pc.yellow("  ⚠ Search index skipped (no indexable pages found)\n"));
        } else {
          console.log(pc.green("  ✓ Search index built\n"));
        }
      } catch (err) {
        const msg = (err as Error).message ?? String(err);
        console.log(pc.yellow(`  ⚠ Search index skipped (pagefind not available)\n`));
        console.log(pc.dim(`    Reason: ${msg}\n`));
      }

      // TOM-50: Generate OG images
      try {
        const { loadConfig: loadOgConfig, discoverPages: discoverOgPages, generateOgImages } = await import("@tomehq/core");
        const ogConfig = await loadOgConfig(root);
        const ogPagesDir = resolve(root, "pages");
        const ogRoutes = await discoverOgPages(ogPagesDir, ogConfig.versioning ?? undefined, ogConfig.i18n ?? undefined);
        const ogResult = await generateOgImages(ogRoutes, ogConfig, resolve(root, opts.outDir));
        console.log(`  ${pc.green("✓")} ${ogResult.generated} OG image${ogResult.generated === 1 ? "" : "s"} generated${ogResult.skipped > 0 ? ` (${ogResult.skipped} custom)` : ""}\n`);
      } catch {
        console.log(pc.yellow("  ⚠ OG image generation skipped\n"));
      }

      // TOM-51: Run broken link checker
      try {
        const { loadConfig, discoverPages, checkLinks, formatLinkCheckResults } = await import("@tomehq/core");
        const cfg = await loadConfig(root);
        const pagesDir = resolve(root, "pages");
        const discoveredRoutes = await discoverPages(pagesDir, cfg.versioning ?? undefined, cfg.i18n ?? undefined);
        const result = checkLinks(discoveredRoutes, cfg);

        if (result.ok) {
          console.log(`  ${pc.green("✓")} ${result.totalLinks} internal links checked — all valid\n`);
        } else {
          const output = formatLinkCheckResults(result);
          if (cfg.strictLinks) {
            console.error(pc.red(`\n  ${output}`));
            process.exit(1);
          } else {
            console.log(pc.yellow(`\n  ⚠ ${output}`));
          }
        }
      } catch {
        // Link checking is non-critical, don't fail build
      }

    } catch (err) {
      console.error(pc.red("\n  Build failed:\n"));
      console.error(
        `  ${err instanceof Error ? err.message : String(err)}\n`
      );
      process.exit(1);
    }
  });

// ── LOGIN ────────────────────────────────────────────────
program
  .command("login")
  .description("Authenticate with Tome Cloud")
  .option("--token <token>", "API token (skips interactive prompt)")
  .action(async (opts: { token?: string }) => {
    console.log(logo);

    let token = opts.token;

    if (!token) {
      // Simple non-interactive fallback: require --token flag
      const readline = await import("readline");
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      token = await new Promise<string>((resolve) => {
        rl.question(pc.dim("  Enter your API token: "), (answer) => {
          rl.close();
          resolve(answer.trim());
        });
      });
    }

    if (!token) {
      console.error(pc.red("  Error: No token provided.\n"));
      process.exit(1);
    }

    try {
      const { saveAuthToken } = await import("@tomehq/core/deploy");
      await saveAuthToken(token);
      console.log(pc.green("  Logged in successfully.\n"));
    } catch (err) {
      console.error(pc.red("  Error saving auth token:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

// ── DEPLOY ───────────────────────────────────────────────
program
  .command("deploy")
  .description("Deploy to Tome Cloud")
  .option("-o, --outDir <dir>", "Build output directory", "out")
  .option("--preview", "Create a preview deployment (branch-based)")
  .option("--branch <name>", "Branch name for preview (auto-detected if omitted)")
  .option("--expires <days>", "Preview expiry in days", "7")
  .action(async (opts: { outDir: string; preview?: boolean; branch?: string; expires: string }) => {
    console.log(logo);

    const { readAuthToken, deployToCloud } = await import("@tomehq/core/deploy");

    // Check auth
    const token = readAuthToken();
    if (!token) {
      console.error(pc.red("  Error: Not logged in.\n"));
      console.log(pc.dim("  Run ") + pc.cyan("tome login") + pc.dim(" first to authenticate.\n"));
      process.exit(1);
    }

    // Load config for project slug
    const root = process.cwd();
    let slug = "my-docs";

    for (const configFile of ["tome.config.js", "tome.config.mjs", "tome.config.ts"]) {
      const configPath = join(root, configFile);
      if (existsSync(configPath)) {
        try {
          const { pathToFileURL } = await import("url");
          const configUrl = pathToFileURL(configPath).href;
          const mod = await import(configUrl);
          const config = mod.default || mod;
          if (config.name) {
            slug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          }
        } catch {
          // Use default slug
        }
        break;
      }
    }

    const outDir = resolve(root, opts.outDir);

    // Preview deployment
    if (opts.preview) {
      const { deployPreview, detectBranch, detectCommitSha, detectPrNumber } = await import("@tomehq/core");

      const branch = opts.branch || detectBranch();
      if (!branch) {
        console.error(pc.red("  Error: Could not detect branch name.\n"));
        console.log(pc.dim("  Use ") + pc.cyan("--branch <name>") + pc.dim(" to specify manually.\n"));
        process.exit(1);
      }

      console.log(pc.dim("  Deploying preview to Tome Cloud...\n"));

      try {
        const result = await deployPreview(
          {
            apiUrl: process.env.TOME_API_URL ?? "https://api.tome.center",
            token,
            slug,
            branch,
            commitSha: detectCommitSha() ?? undefined,
            prNumber: detectPrNumber() ?? undefined,
            expiresInDays: parseInt(opts.expires),
          },
          outDir,
        );

        console.log(`\n  ${pc.green("✓")} Preview deployed successfully!\n`);
        console.log(`  ${pc.dim("Preview URL:")}   ${pc.cyan(result.previewUrl)}`);
        console.log(`  ${pc.dim("Branch:")}        ${pc.bold(result.branch)}`);
        console.log(`  ${pc.dim("Deployment ID:")} ${result.deploymentId}`);
        console.log(`  ${pc.dim("Expires:")}       ${new Date(result.expiresAt).toLocaleDateString()}`);
        console.log(`  ${pc.dim("Files:")}         ${result.fileCount}`);
        console.log(`  ${pc.dim("Size:")}          ${(result.size / 1024).toFixed(1)} KB\n`);
      } catch (err) {
        console.error(pc.red("\n  Preview deploy failed:\n"));
        console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
        process.exit(1);
      }
      return;
    }

    // Standard deployment
    console.log(pc.dim("  Deploying to Tome Cloud...\n"));

    try {
      const result = await deployToCloud(
        { apiUrl: process.env.TOME_API_URL ?? "https://api.tome.center", token, slug },
        outDir,
      );

      console.log(`\n  ${pc.green("✓")} Deployed successfully!\n`);
      console.log(`  ${pc.dim("URL:")}           ${pc.cyan(result.url)}`);
      console.log(`  ${pc.dim("Deployment ID:")} ${result.deploymentId}`);
      console.log(`  ${pc.dim("Files:")}         ${result.fileCount}`);
      console.log(`  ${pc.dim("Size:")}          ${(result.size / 1024).toFixed(1)} KB\n`);
    } catch (err) {
      console.error(pc.red("\n  Deploy failed:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

// ── ALGOLIA INIT (TOM-16) ────────────────────────────────
program
  .command("algolia:init")
  .description("Generate Algolia DocSearch crawler config for your Tome site")
  .option("-u, --url <url>", "Production URL of your docs site")
  .action(async (opts: { url?: string }) => {
    console.log(logo);
    console.log(pc.dim("  Generating Algolia DocSearch crawler config...\n"));

    const root = process.cwd();
    let siteName = "My Docs";
    let siteUrl = opts.url || "https://YOUR_DOCS_URL";

    // Try to read tome.config.js for site name and baseUrl
    for (const configFile of ["tome.config.js", "tome.config.mjs", "tome.config.ts"]) {
      const configPath = join(root, configFile);
      if (existsSync(configPath)) {
        try {
          const { pathToFileURL } = await import("url");
          const configUrl = pathToFileURL(configPath).href;
          const mod = await import(configUrl);
          const config = mod.default || mod;
          if (config.name) siteName = config.name;
          if (!opts.url && config.baseUrl) siteUrl = config.baseUrl;
        } catch {
          // Ignore config load errors — use defaults
        }
        break;
      }
    }

    const crawlerConfig = {
      index_name: siteName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      start_urls: [siteUrl],
      sitemap_urls: [`${siteUrl.replace(/\/$/, "")}/sitemap.xml`],
      selectors: {
        lvl0: "h1",
        lvl1: "h2",
        lvl2: "h3",
        lvl3: "h4",
        lvl4: "h5",
        lvl5: "h6",
        text: ".tome-content p, .tome-content li, .tome-content td",
      },
      strip_chars: " .,;:#",
      custom_settings: {
        separatorsToIndex: "_",
        attributesForFaceting: ["type", "lang"],
        attributesToRetrieve: [
          "hierarchy",
          "content",
          "anchor",
          "url",
          "url_without_anchor",
          "type",
        ],
      },
    };

    const outputPath = join(root, ".docsearch.json");
    writeFileSync(outputPath, JSON.stringify(crawlerConfig, null, 2) + "\n");

    console.log(pc.green("  ✓ ") + `Created ${pc.bold(".docsearch.json")}\n`);
    console.log(pc.dim("  Next steps:\n"));
    console.log(`    1. Update ${pc.cyan("start_urls")} in .docsearch.json with your production URL`);
    console.log(`    2. Add Algolia search config to your ${pc.cyan("tome.config.js")}:\n`);
    console.log(pc.dim("       search: {"));
    console.log(pc.dim('         provider: "algolia",'));
    console.log(pc.dim('         appId: "YOUR_APP_ID",'));
    console.log(pc.dim('         apiKey: "YOUR_SEARCH_API_KEY",'));
    console.log(pc.dim(`         indexName: "${crawlerConfig.index_name}",`));
    console.log(pc.dim("       },\n"));
    console.log(`    3. Submit .docsearch.json to the Algolia DocSearch program:`);
    console.log(`       ${pc.cyan("https://docsearch.algolia.com/apply/")}\n`);
    console.log(`    4. Or run the crawler yourself with ${pc.cyan("@algolia/docsearch-scraper")}:\n`);
    console.log(pc.dim("       docker run -it --env-file=.env -e CONFIG=$(cat .docsearch.json | jq -r tostring) algolia/docsearch-scraper\n"));
  });

// ── MCP SERVER ──────────────────────────────────────────
program
  .command("mcp")
  .description("Start MCP server for AI agents to query your docs")
  .option("-o, --outDir <dir>", "Build output directory", "out")
  .action(async (opts: { outDir: string }) => {
    // MCP uses stdout for JSON-RPC — all human-readable output must go to stderr
    process.stderr.write(logo + "\n");
    process.stderr.write(pc.dim("  Starting MCP server...\n\n"));

    try {
      const { startMcpServer } = await import("@tomehq/core/mcp-server");
      await startMcpServer({ root: process.cwd(), outDir: opts.outDir });
    } catch (err) {
      console.error(pc.red("\n  MCP server failed:\n"));
      console.error(
        `  ${err instanceof Error ? err.message : String(err)}\n`
      );
      process.exit(1);
    }
  });

// ── DOMAINS:ADD ─────────────────────────────────────────
program
  .command("domains:add <domain>")
  .description("Add a custom domain to your project")
  .action(async (domain: string) => {
    console.log(logo);

    const { readAuthToken } = await import("@tomehq/core/deploy");
    const { validateDomain, addDomain } = await import("@tomehq/core/domains");

    // Check auth
    const token = readAuthToken();
    if (!token) {
      console.error(pc.red("  Error: Not logged in.\n"));
      console.log(pc.dim("  Run ") + pc.cyan("tome login") + pc.dim(" first to authenticate.\n"));
      process.exit(1);
    }

    // Validate domain format
    const validation = validateDomain(domain);
    if (!validation.valid) {
      console.error(pc.red(`  Error: ${validation.error}\n`));
      process.exit(1);
    }

    // Load config for project slug
    const root = process.cwd();
    let slug = "my-docs";

    for (const configFile of ["tome.config.js", "tome.config.mjs", "tome.config.ts"]) {
      const configPath = join(root, configFile);
      if (existsSync(configPath)) {
        try {
          const { pathToFileURL } = await import("url");
          const configUrl = pathToFileURL(configPath).href;
          const mod = await import(configUrl);
          const config = mod.default || mod;
          if (config.name) {
            slug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          }
        } catch {
          // Use default slug
        }
        break;
      }
    }

    try {
      const status = await addDomain({ domain, projectSlug: slug }, token);

      console.log(pc.green("  ✓ ") + `Domain ${pc.bold(domain)} added.\n`);
      console.log(pc.dim("  Add these DNS records to verify ownership:\n"));

      for (const record of status.dnsRecords) {
        console.log(`    ${pc.bold(record.type)} record:`);
        console.log(`      ${pc.dim("Name:")}  ${pc.cyan(record.name)}`);
        console.log(`      ${pc.dim("Value:")} ${pc.cyan(record.value)}\n`);
      }

      console.log(pc.dim("  SSL will be provisioned automatically once DNS is verified.\n"));
    } catch (err) {
      console.error(pc.red("\n  Failed to add domain:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

// ── DOMAINS:LIST ────────────────────────────────────────
program
  .command("domains:list")
  .description("List custom domains for your project")
  .action(async () => {
    console.log(logo);

    const { readAuthToken } = await import("@tomehq/core/deploy");
    const { listDomains } = await import("@tomehq/core/domains");

    // Check auth
    const token = readAuthToken();
    if (!token) {
      console.error(pc.red("  Error: Not logged in.\n"));
      console.log(pc.dim("  Run ") + pc.cyan("tome login") + pc.dim(" first to authenticate.\n"));
      process.exit(1);
    }

    // Load config for project slug
    const root = process.cwd();
    let slug = "my-docs";

    for (const configFile of ["tome.config.js", "tome.config.mjs", "tome.config.ts"]) {
      const configPath = join(root, configFile);
      if (existsSync(configPath)) {
        try {
          const { pathToFileURL } = await import("url");
          const configUrl = pathToFileURL(configPath).href;
          const mod = await import(configUrl);
          const config = mod.default || mod;
          if (config.name) {
            slug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          }
        } catch {
          // Use default slug
        }
        break;
      }
    }

    try {
      const domains = await listDomains(slug, token);

      if (domains.length === 0) {
        console.log(pc.dim("  No custom domains configured.\n"));
        console.log(pc.dim("  Run ") + pc.cyan("tome domains:add <domain>") + pc.dim(" to add one.\n"));
        return;
      }

      console.log(pc.dim("  Custom domains:\n"));

      for (const d of domains) {
        const verifiedIcon = d.verified ? pc.green("✓") : pc.yellow("○");
        const sslLabel =
          d.sslStatus === "active"
            ? pc.green("active")
            : d.sslStatus === "failed"
            ? pc.red("failed")
            : pc.yellow("pending");

        console.log(`    ${verifiedIcon} ${pc.bold(d.domain)}`);
        console.log(`      ${pc.dim("Verified:")} ${d.verified ? "yes" : "no"}`);
        console.log(`      ${pc.dim("SSL:")}      ${sslLabel}\n`);
      }
    } catch (err) {
      console.error(pc.red("\n  Failed to list domains:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

// ── DOMAINS:VERIFY ─────────────────────────────────────
program
  .command("domains:verify <domain>")
  .description("Check DNS verification and SSL status for a custom domain")
  .action(async (domain: string) => {
    console.log(logo);

    const { readAuthToken } = await import("@tomehq/core/deploy");
    const { checkDomainDns } = await import("@tomehq/core/domains");

    // Check auth
    const token = readAuthToken();
    if (!token) {
      console.error(pc.red("  Error: Not logged in.\n"));
      console.log(pc.dim("  Run ") + pc.cyan("tome login") + pc.dim(" first to authenticate.\n"));
      process.exit(1);
    }

    // Load config for project slug
    const root = process.cwd();
    let slug = "my-docs";

    for (const configFile of ["tome.config.js", "tome.config.mjs", "tome.config.ts"]) {
      const configPath = join(root, configFile);
      if (existsSync(configPath)) {
        try {
          const { pathToFileURL } = await import("url");
          const configUrl = pathToFileURL(configPath).href;
          const mod = await import(configUrl);
          const config = mod.default || mod;
          if (config.name) {
            slug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          }
        } catch {
          // Use default slug
        }
        break;
      }
    }

    try {
      console.log(pc.dim("  Checking DNS and SSL status...\n"));
      const status = await checkDomainDns(domain, slug, undefined, token);

      const verifiedIcon = status.verified ? pc.green("✓") : pc.yellow("○");
      const sslLabel =
        status.sslStatus === "active"
          ? pc.green("active")
          : status.sslStatus === "failed"
          ? pc.red("failed")
          : pc.yellow("pending");

      console.log(`  ${verifiedIcon} ${pc.bold(status.domain)}\n`);
      console.log(`    ${pc.dim("Verified:")} ${status.verified ? pc.green("yes") : pc.yellow("no")}`);
      console.log(`    ${pc.dim("SSL:")}      ${sslLabel}\n`);

      if (status.dnsRecords.length > 0) {
        console.log(pc.dim("  Required DNS records:\n"));
        for (const r of status.dnsRecords) {
          const recordIcon = r.verified ? pc.green("✓") : pc.yellow("○");
          console.log(`    ${recordIcon} ${pc.bold(r.type)} ${pc.cyan(r.name)} → ${r.value}`);
        }
        console.log();
      }

      if (!status.verified) {
        console.log(pc.yellow("  DNS not yet verified. Add the records above at your DNS provider"));
        console.log(pc.yellow("  and run this command again to check status.\n"));
      } else {
        console.log(pc.green("  Domain is verified and SSL is active!\n"));
      }
    } catch (err) {
      console.error(pc.red("\n  Failed to verify domain:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

// ── LINT (TOM-53) ───────────────────────────────────────
program
  .command("lint")
  .description("Lint documentation content for style and accessibility issues")
  .option("--max-paragraph <words>", "Max paragraph length in words (0 to disable)", "200")
  .option("--no-heading-increment", "Disable heading increment check")
  .option("--no-image-alt", "Disable image alt text check")
  .option("--no-single-h1", "Disable single h1 check")
  .option("--no-empty-links", "Disable empty link check")
  .option("--banned-words <words>", "Comma-separated list of banned words")
  .option("--strict", "Treat warnings as errors (exit 1)")
  .action(async (opts: {
    maxParagraph: string;
    headingIncrement: boolean;
    imageAlt: boolean;
    singleH1: boolean;
    emptyLinks: boolean;
    bannedWords?: string;
    strict?: boolean;
  }) => {
    console.log(logo);
    console.log(pc.dim("  Linting documentation content...\n"));

    try {
      const { loadConfig, discoverPages, lintPages, formatLintResults } = await import("@tomehq/core");

      const root = process.cwd();
      const pagesDir = resolve(root, "pages");
      const config = await loadConfig(root);
      const routes = await discoverPages(pagesDir, config.versioning ?? undefined, config.i18n ?? undefined);

      const bannedWords = opts.bannedWords
        ? opts.bannedWords.split(",").map((w) => w.trim()).filter(Boolean)
        : [];

      const result = lintPages(routes, {
        headingIncrement: opts.headingIncrement,
        imageAltText: opts.imageAlt,
        maxParagraphLength: parseInt(opts.maxParagraph),
        singleH1: opts.singleH1,
        emptyLinks: opts.emptyLinks,
        bannedWords,
      });

      const output = formatLintResults(result);
      console.log(`  ${output}\n`);

      if (!result.ok || (opts.strict && result.warnings > 0)) {
        process.exit(1);
      }
    } catch (err) {
      console.error(pc.red("\n  Lint failed:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

// ── DOMAINS:REMOVE ──────────────────────────────────────
program
  .command("domains:remove <domain>")
  .description("Remove a custom domain from your project")
  .action(async (domain: string) => {
    console.log(logo);

    const { readAuthToken } = await import("@tomehq/core/deploy");
    const { removeDomain } = await import("@tomehq/core/domains");

    // Check auth
    const token = readAuthToken();
    if (!token) {
      console.error(pc.red("  Error: Not logged in.\n"));
      console.log(pc.dim("  Run ") + pc.cyan("tome login") + pc.dim(" first to authenticate.\n"));
      process.exit(1);
    }

    try {
      const result = await removeDomain(domain, token);

      if (result.removed) {
        console.log(pc.green("  ✓ ") + `Domain ${pc.bold(domain)} removed.\n`);
      } else {
        console.error(pc.red(`  Error: Could not remove domain ${domain}.\n`));
        process.exit(1);
      }
    } catch (err) {
      console.error(pc.red("\n  Failed to remove domain:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

// ── MIGRATE ─────────────────────────────────────────────
const migrate = program
  .command("migrate")
  .description("Migrate from another documentation platform");

migrate
  .command("gitbook <source-dir>")
  .description("Migrate a GitBook project to Tome")
  .option("--out <dir>", "Output directory", ".")
  .option("--dry-run", "Preview migration without writing files")
  .action(async (sourceDir: string, opts: { out: string; dryRun?: boolean }) => {
    console.log(logo);
    console.log(pc.dim("  Migrating from GitBook...\n"));

    try {
      const { migrateFromGitbook } = await import("@tomehq/core/migrate-gitbook");
      const resolvedSource = resolve(process.cwd(), sourceDir);
      const resolvedOut = resolve(process.cwd(), opts.out);

      const result = await migrateFromGitbook(resolvedSource, resolvedOut, {
        dryRun: opts.dryRun,
      });

      if (opts.dryRun) {
        console.log(pc.yellow("  Dry run — no files written.\n"));
      }

      console.log(pc.green("  ✓ ") + `Migrated ${pc.bold(String(result.pages))} pages`);
      if (result.redirects > 0) {
        console.log(pc.green("  ✓ ") + `${result.redirects} redirects preserved`);
      }
      if (result.warnings.length > 0) {
        console.log(pc.yellow(`\n  ⚠ ${result.warnings.length} warning(s):`));
        for (const w of result.warnings) {
          console.log(pc.dim(`    - ${w}`));
        }
      }
      console.log();
    } catch (err) {
      console.error(pc.red("\n  Migration failed:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

migrate
  .command("mintlify <source-dir>")
  .description("Migrate a Mintlify project to Tome")
  .option("--out <dir>", "Output directory", ".")
  .option("--dry-run", "Preview migration without writing files")
  .action(async (sourceDir: string, opts: { out: string; dryRun?: boolean }) => {
    console.log(logo);
    console.log(pc.dim("  Migrating from Mintlify...\n"));

    try {
      const { migrateFromMintlify } = await import("@tomehq/core/migrate-mintlify");
      const resolvedSource = resolve(process.cwd(), sourceDir);
      const resolvedOut = resolve(process.cwd(), opts.out);

      const result = await migrateFromMintlify(resolvedSource, resolvedOut, {
        dryRun: opts.dryRun,
      });

      if (opts.dryRun) {
        console.log(pc.yellow("  Dry run — no files written.\n"));
      }

      console.log(pc.green("  ✓ ") + `Migrated ${pc.bold(String(result.pages))} pages`);
      if (result.redirects > 0) {
        console.log(pc.green("  ✓ ") + `${result.redirects} redirects preserved`);
      }
      if (result.warnings.length > 0) {
        console.log(pc.yellow(`\n  ⚠ ${result.warnings.length} warning(s):`));
        for (const w of result.warnings) {
          console.log(pc.dim(`    - ${w}`));
        }
      }
      console.log();
    } catch (err) {
      console.error(pc.red("\n  Migration failed:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

migrate
  .command("docusaurus <source-dir>")
  .description("Migrate a Docusaurus project to Tome")
  .option("--out <dir>", "Output directory", ".")
  .option("--dry-run", "Preview migration without writing files")
  .action(async (sourceDir: string, opts: { out: string; dryRun?: boolean }) => {
    console.log(logo);
    console.log(pc.dim("  Migrating from Docusaurus...\n"));

    try {
      const { migrateFromDocusaurus } = await import("@tomehq/core/migrate-docusaurus");
      const resolvedSource = resolve(process.cwd(), sourceDir);
      const resolvedOut = resolve(process.cwd(), opts.out);

      const result = await migrateFromDocusaurus(resolvedSource, resolvedOut, {
        dryRun: opts.dryRun,
      });

      if (opts.dryRun) {
        console.log(pc.yellow("  Dry run — no files written.\n"));
      }

      console.log(pc.green("  ✓ ") + `Migrated ${pc.bold(String(result.pages))} pages`);
      if (result.redirects > 0) {
        console.log(pc.green("  ✓ ") + `${result.redirects} redirects preserved`);
      }
      if (result.warnings.length > 0) {
        console.log(pc.yellow(`\n  ⚠ ${result.warnings.length} warning(s):`));
        for (const w of result.warnings) {
          console.log(pc.dim(`    - ${w}`));
        }
      }
      console.log();
    } catch (err) {
      console.error(pc.red("\n  Migration failed:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

migrate
  .command("vitepress <source-dir>")
  .description("Migrate a VitePress project to Tome")
  .option("--out <dir>", "Output directory", ".")
  .option("--dry-run", "Preview migration without writing files")
  .action(async (sourceDir: string, opts: { out: string; dryRun?: boolean }) => {
    console.log(logo);
    console.log(pc.dim("  Migrating from VitePress...\n"));

    try {
      const { migrateFromVitepress } = await import("@tomehq/core/migrate-vitepress");
      const resolvedSource = resolve(process.cwd(), sourceDir);
      const resolvedOut = resolve(process.cwd(), opts.out);

      const result = await migrateFromVitepress(resolvedSource, resolvedOut, {
        dryRun: opts.dryRun,
      });

      if (opts.dryRun) {
        console.log(pc.yellow("  Dry run — no files written.\n"));
      }

      console.log(pc.green("  ✓ ") + `Migrated ${pc.bold(String(result.pages))} pages`);
      if (result.redirects > 0) {
        console.log(pc.green("  ✓ ") + `${result.redirects} redirects preserved`);
      }
      if (result.warnings.length > 0) {
        console.log(pc.yellow(`\n  ⚠ ${result.warnings.length} warning(s):`));
        for (const w of result.warnings) {
          console.log(pc.dim(`    - ${w}`));
        }
      }
      console.log();
    } catch (err) {
      console.error(pc.red("\n  Migration failed:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

// ── TYPEDOC ────────────────────────────────────────────
program
  .command("typedoc")
  .description("Generate API documentation from TypeScript source files")
  .argument("<files...>", "TypeScript entry point files to document")
  .option("-o, --output <dir>", "Output directory for generated .md files", "pages/api")
  .option("--tsconfig <path>", "Path to tsconfig.json")
  .action(async (files: string[], opts: { output: string; tsconfig?: string }) => {
    console.log(logo);
    console.log(pc.dim("  Generating TypeDoc pages...\n"));

    try {
      const { generateTypeDocs } = await import("@tomehq/core/typedoc");

      generateTypeDocs({
        entryPoints: files.map((f) => resolve(process.cwd(), f)),
        outputDir: opts.output,
        tsconfig: opts.tsconfig ? resolve(process.cwd(), opts.tsconfig) : undefined,
      });

      console.log(pc.green("\n  ✓ TypeDoc pages generated\n"));
    } catch (err) {
      console.error(pc.red("\n  TypeDoc generation failed:\n"));
      console.error(`  ${err instanceof Error ? err.message : String(err)}\n`);
      process.exit(1);
    }
  });

// ── PASSWORD PROTECTION ─────────────────────────────────

program
  .command("protect")
  .description("Set or remove password protection for your site")
  .option("--remove", "Remove password protection")
  .action(async (opts: { remove?: boolean }) => {
    console.log(logo);

    const { readAuthToken } = await import("@tomehq/core/deploy");
    const token = readAuthToken();
    if (!token) {
      console.error(pc.red("  Error: Not logged in.\n"));
      console.log(pc.dim("  Run ") + pc.cyan("tome login") + pc.dim(" first to authenticate.\n"));
      process.exit(1);
    }

    // Load config for project slug
    const root = process.cwd();
    let slug = "my-docs";
    for (const configFile of ["tome.config.js", "tome.config.mjs", "tome.config.ts"]) {
      const configPath = join(root, configFile);
      if (existsSync(configPath)) {
        try {
          const { pathToFileURL } = await import("url");
          const configUrl = pathToFileURL(configPath).href;
          const mod = await import(configUrl);
          const config = mod.default || mod;
          if (config.name) {
            slug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          }
        } catch {}
        break;
      }
    }

    const API_BASE = process.env.TOME_API_URL || "https://api.tome.center";

    if (opts.remove) {
      try {
        const res = await fetch(`${API_BASE}/api/deploy/protect`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Unknown error" }));
          console.error(pc.red(`  Error: ${(body as any).error}\n`));
          process.exit(1);
        }
        console.log(pc.green("  ✓ ") + `Password protection removed from ${pc.bold(slug)}.\n`);
      } catch (err) {
        console.error(pc.red(`  Error: ${err instanceof Error ? err.message : String(err)}\n`));
        process.exit(1);
      }
    } else {
      // Prompt for password
      const readline = await import("readline");
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const password = await new Promise<string>((resolve) => {
        rl.question("  Enter a password for your site: ", (answer) => {
          rl.close();
          resolve(answer);
        });
      });

      if (!password || password.length < 4) {
        console.error(pc.red("  Error: Password must be at least 4 characters.\n"));
        process.exit(1);
      }

      try {
        const { hashPassword } = await import("@tomehq/core/password");
        const hash = await hashPassword(password);

        const res = await fetch(`${API_BASE}/api/deploy/protect`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug, passwordHash: hash }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Unknown error" }));
          console.error(pc.red(`  Error: ${(body as any).error}\n`));
          process.exit(1);
        }
        console.log(pc.green("  ✓ ") + `Password protection enabled for ${pc.bold(slug)}.\n`);
        console.log(pc.dim("  Visitors will be prompted for the password before accessing your docs.\n"));
      } catch (err) {
        console.error(pc.red(`  Error: ${err instanceof Error ? err.message : String(err)}\n`));
        process.exit(1);
      }
    }
  });

// ── PARSE ────────────────────────────────────────────────
program.parse();
