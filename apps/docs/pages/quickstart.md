---
title: Quickstart
description: Get a Tome documentation site up and running in under five minutes.
---

# Quickstart

This guide walks you through creating a new Tome docs site, running it locally, and understanding the project layout.

## Prerequisites

- **Node.js 18+** -- Tome requires Node 18 or later. Check your version with `node -v`.
- **A package manager** -- npm (bundled with Node), yarn, or pnpm all work.

## Create a New Project

Scaffold a new documentation project with the CLI:

```bash
npx @tome/cli init my-docs
```

This creates a `my-docs/` directory with a working project structure, starter pages, and a pre-configured `tome.config.js`.

## Install Dependencies

```bash
cd my-docs
npm install
```

## Start the Dev Server

```bash
npm run dev
```

The dev server starts at `http://localhost:3000` by default. It watches your files and reloads the browser when you save changes.

### Dev Server Options

| Flag | Description |
|------|-------------|
| `-p, --port <number>` | Set a custom port (default: `3000`) |
| `--host` | Expose the server to your local network |

Example:

```bash
npx tome dev --port 4000 --host
```

## Project Structure

After scaffolding, your project looks like this:

```text
my-docs/
├── tome.config.js     # Site configuration (name, theme, navigation)
├── pages/             # Your documentation pages
│   ├── index.md       # Home page (maps to /)
│   └── quickstart.md  # This page (maps to /quickstart)
├── public/            # Static assets served at the root
├── .tome/             # Internal entry point
│   └── entry.tsx      # Bootstraps the Tome shell
├── index.html         # HTML shell (rarely needs editing)
└── package.json       # Scripts: dev, build
```

### Key Directories

- **`pages/`** -- Every `.md` or `.mdx` file here becomes a documentation page. The file path determines the URL. See the Routing guide for details.
- **`public/`** -- Put images, favicons, or other static files here. They are served as-is at the site root.
- **`.tome/`** -- Contains the entry point that bootstraps your docs shell. You generally do not need to edit this.

## Adding a New Page

Create a file in `pages/`:

```markdown
---
title: My New Page
description: A brief summary of this page.
---

# My New Page

Write your content here using standard **Markdown** syntax.
```

Then add the page to the navigation in `tome.config.js`:

```javascript
export default {
  name: "My Docs",
  navigation: [
    {
      group: "Getting Started",
      pages: ["index", "my-new-page"],
    },
  ],
};
```

The page ID is derived from the filename (without the extension). `pages/my-new-page.md` becomes `"my-new-page"`.

## Build for Production

```bash
npm run build
```

This produces a static site in the `out/` directory. The output is a set of HTML, CSS, and JS files you can deploy to any static host.

### Build Options

| Flag | Description |
|------|-------------|
| `-o, --outDir <dir>` | Set a custom output directory (default: `out`) |

## Deploy

The built output is plain static files. Deploy to any platform:

```bash
# Vercel
vercel deploy ./out

# Netlify
netlify deploy --dir=./out

# Cloudflare Pages
wrangler pages deploy ./out
```

Or upload the `out/` directory to any web server or object storage (S3, GCS, etc.).
