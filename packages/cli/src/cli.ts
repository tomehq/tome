#!/usr/bin/env node

import { Command } from "commander";
import pc from "picocolors";
import { resolve, join } from "path";
import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";

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

    // Create project directory
    mkdirSync(targetDir, { recursive: true });
    mkdirSync(join(targetDir, "pages"), { recursive: true });
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
      group: "Getting Started",
      pages: ["index", "quickstart", "components"],
    },
  ],
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

    // Write example pages
    writeFileSync(
      join(targetDir, "pages", "index.md"),
      `---
title: Welcome to ${projectName}
description: Beautiful, fast documentation powered by Tome. Write in Markdown, ship in seconds.
---

# Welcome to ${projectName}

Your documentation is ready. This site was scaffolded with **Tome** — a modern documentation platform that turns Markdown into a polished, searchable docs site with zero configuration.

## Why Tome?

| Feature | Description |
|---------|-------------|
| **Instant Setup** | Run \`tome init\` and start writing. No build config needed. |
| **Markdown & MDX** | Write in standard Markdown or use MDX for interactive components. |
| **Built-in Components** | Callouts, tabs, cards, steps, and more — out of the box. |
| **Fast Dev Server** | Hot-reloading dev server powered by Vite. |
| **Deploy Anywhere** | Static output works on Vercel, Netlify, Cloudflare, or any host. |

## Quick Start

\`\`\`bash
# Start the dev server
npm run dev

# Build for production
npm run build
\`\`\`

## Project Structure

\`\`\`text
${projectName}/
├── tome.config.js     # Site configuration
├── pages/             # Your documentation pages
│   ├── index.md       # This page
│   ├── quickstart.md  # Getting started guide
│   └── components.mdx # Component showcase (MDX)
├── public/            # Static assets (images, fonts, etc.)
└── package.json
\`\`\`

## Next Steps

- **[Quickstart Guide](/quickstart)** — Install dependencies, configure your site, and deploy.
- **[Components](/components)** — Explore the built-in MDX components you can use in your docs.
- **Edit this page** — Open \`pages/index.md\` in your editor to start customizing.

> **Tip:** Tome watches your files and reloads instantly. Just save and see your changes.
`
    );

    writeFileSync(
      join(targetDir, "pages", "quickstart.md"),
      `---
title: Quickstart
description: Get up and running with Tome in under 5 minutes — from installation to deployment.
icon: rocket
---

# Quickstart

This guide walks you through setting up a Tome documentation site from scratch, configuring it, and deploying it to production.

## Prerequisites

Before you begin, make sure you have:

- **Node.js 20** or later installed ([download](https://nodejs.org))
- A package manager: \`npm\`, \`yarn\`, or \`pnpm\`
- A terminal and a code editor

## 1. Install Dependencies

After running \`tome init\`, install your project dependencies:

\`\`\`bash
cd ${projectName}
npm install
\`\`\`

## 2. Start the Dev Server

Launch the local development server with hot reloading:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser. Every time you save a file, the page updates instantly.

## 3. Write Your First Page

Create a new file in the \`pages/\` directory. Each \`.md\` or \`.mdx\` file becomes a page on your site.

\`\`\`markdown
---
title: My New Page
description: A brief summary for search and navigation
---

# My New Page

Write your content using standard **Markdown** syntax.
You can use headings, lists, tables, code blocks, and more.
\`\`\`

### Frontmatter Reference

Every page can include YAML frontmatter at the top:

| Field | Type | Description |
|-------|------|-------------|
| \`title\` | string | Page title shown in sidebar and browser tab |
| \`description\` | string | Short summary for SEO and navigation |
| \`icon\` | string | Icon name displayed next to the title in the sidebar |
| \`sidebarTitle\` | string | Override the title shown in the sidebar |
| \`hidden\` | boolean | Hide this page from the sidebar navigation |
| \`tags\` | string[] | Tags for search and categorization |

## 4. Configure Your Site

Edit \`tome.config.js\` to customize your documentation site:

\`\`\`javascript
export default {
  name: "${projectName}",
  theme: {
    preset: "amber",    // Theme preset: "amber" or "editorial"
    accent: "#e8a845",  // Custom accent color (hex)
    mode: "auto",       // Color mode: "light", "dark", or "auto"
  },
  navigation: [
    {
      group: "Getting Started",
      pages: ["index", "quickstart", "components"],
    },
  ],
};
\`\`\`

### Navigation

The \`navigation\` array controls your sidebar. Each group has a label and a list of page IDs (the filename without the extension):

\`\`\`javascript
navigation: [
  {
    group: "Getting Started",
    pages: ["index", "quickstart"],
  },
  {
    group: "Reference",
    pages: ["components", "api"],
  },
],
\`\`\`

## 5. Using MDX Components

Tome includes a set of built-in components you can use in \`.mdx\` files without any imports. See the [Components](/components) page for a full showcase.

\`\`\`markdown
<!-- Use a callout in any .mdx file -->
<Callout type="tip" title="Pro Tip">
  Components are automatically available — no import needed.
</Callout>
\`\`\`

## 6. Build and Deploy

When you are ready to publish, build your site into static files:

\`\`\`bash
npm run build
\`\`\`

This outputs a production-ready static site to the \`out/\` directory. Deploy it to any static hosting provider:

\`\`\`bash
# Vercel
vercel deploy ./out

# Netlify
netlify deploy --dir=./out

# Cloudflare Pages
wrangler pages deploy ./out
\`\`\`

---

That is it! You now have a fully functional documentation site. Explore the [Components](/components) page to see all the interactive elements you can add to your pages.
`
    );

    writeFileSync(
      join(targetDir, "pages", "components.mdx"),
      `---
title: Components
description: A showcase of every built-in MDX component available in Tome.
icon: puzzle
---

# Components

Tome ships with a set of built-in components you can use in any \`.mdx\` file. No imports required — just use them directly in your content.

---

## Callout

Callouts draw attention to important information. There are four types: **info**, **tip**, **warning**, and **danger**.

<Callout type="info" title="Information">
  This is an **info** callout. Use it to highlight useful context or background details.
</Callout>

<Callout type="tip" title="Helpful Tip">
  This is a **tip** callout. Great for best practices and pro tips.
</Callout>

<Callout type="warning" title="Warning">
  This is a **warning** callout. Use it when the reader should proceed with caution.
</Callout>

<Callout type="danger" title="Danger">
  This is a **danger** callout. Reserve it for critical warnings about destructive actions.
</Callout>

---

## Tabs

Tabs let you present multiple variants of content — perfect for showing code in different languages or instructions for different platforms.

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

---

## Card & CardGroup

Cards are great for linking to related pages or showcasing features in a visual grid.

<CardGroup cols={2}>
  <Card title="Getting Started" icon="\u{1F680}" href="/quickstart">
    Set up your first Tome project and start writing docs in minutes.
  </Card>
  <Card title="Configuration" icon="\u2699\uFE0F">
    Customize themes, navigation, and site metadata in tome.config.js.
  </Card>
  <Card title="Markdown & MDX" icon="\u{1F4DD}">
    Write pages in standard Markdown or use MDX for interactive components.
  </Card>
  <Card title="Deployment" icon="\u{1F310}">
    Deploy your static site to Vercel, Netlify, Cloudflare Pages, or any host.
  </Card>
</CardGroup>

---

## Steps

Steps guide the reader through a sequential process with numbered indicators.

<Steps>
  <div>
    **Create a new project**

    Run \`tome init my-docs\` to scaffold a new documentation project with all the starter files.
  </div>
  <div>
    **Install dependencies**

    Navigate into your project directory and run \`npm install\` to install all required packages.
  </div>
  <div>
    **Start writing**

    Open \`pages/index.md\` in your editor, make changes, and see them reflected instantly in the dev server.
  </div>
  <div>
    **Deploy to production**

    Run \`npm run build\` and upload the \`out/\` directory to any static hosting provider.
  </div>
</Steps>

---

## Accordion

Accordions let you hide content behind a collapsible header — useful for FAQs, optional details, or long reference sections.

<Accordion title="What file formats does Tome support?">
  Tome supports **.md** (Markdown) and **.mdx** (Markdown with JSX) files. Markdown files are processed with syntax highlighting, GFM tables, and more. MDX files can additionally use React components inline.
</Accordion>

<Accordion title="Do I need to import components in MDX files?">
  No. All built-in components (Callout, Tabs, Card, CardGroup, Steps, Accordion) are automatically available in every \`.mdx\` file. Just use them directly in your content.
</Accordion>

<Accordion title="How do I add custom components?">
  You can create your own React components and use them in \`.mdx\` files by importing them at the top of the file. Built-in components do not require imports.
</Accordion>
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
      `name: Deploy Docs
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      # Preview deploy on PRs
      - name: Deploy Preview
        if: github.event_name == 'pull_request'
        run: npx tome deploy --preview
        env:
          TOME_TOKEN: \${{ secrets.TOME_TOKEN }}

      # Production deploy on push to main
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

      const info = server.config.server;
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
        const { execSync } = await import("child_process");
        const outDirAbs = resolve(root, opts.outDir);
        const pagefindOut = execSync(`npx pagefind --site ${outDirAbs} --output-subdir _pagefind 2>&1`, {
          stdio: "pipe",
          cwd: root,
          encoding: "utf-8",
        });
        // Check if indexing was meaningful
        if (pagefindOut && pagefindOut.includes("Indexed 0 pages")) {
          console.log(pc.yellow("  ⚠ Search index skipped (no indexable pages found)\n"));
        } else {
          console.log(pc.green("  ✓ Search index built\n"));
        }
      } catch {
        console.log(pc.yellow("  ⚠ Search index skipped (pagefind not available)\n"));
      }

      // TOM-50: Generate OG images
      try {
        const { loadConfig: loadCfg, discoverPages: discoverPgs, generateOgImages } = await import("@tomehq/core");
        const cfg2 = await loadCfg(root);
        const pagesDir2 = resolve(root, "pages");
        const routes2 = await discoverPgs(pagesDir2, cfg2.versioning ?? undefined, cfg2.i18n ?? undefined);
        const ogResult = await generateOgImages(routes2, cfg2, resolve(root, opts.outDir));
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

// ── PARSE ────────────────────────────────────────────────
program.parse();
