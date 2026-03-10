---
title: Installation
description: System requirements and detailed installation instructions for Tome.
icon: download
---

# Installation

Tome requires Node.js and works with npm, pnpm, or yarn.

## Prerequisites

| Requirement | Minimum |
|-------------|---------|
| Node.js | 18.0 or higher |
| Package manager | npm, pnpm, or yarn |

## Create a new project

The fastest way to start is with the CLI:

```bash
npx @tome/cli init my-docs
```

This creates a new directory with everything you need:

```
my-docs/
├── pages/
│   ├── index.md
│   ├── quickstart.md
│   └── components.mdx
├── .tome/
│   └── entry.tsx
├── tome.config.js
├── index.html
├── package.json
└── .gitignore
```

## Install dependencies

```bash
cd my-docs
npm install
```

Or with pnpm / yarn:

```bash
pnpm install
# or
yarn install
```

## Start the dev server

```bash
npm run dev
```

The dev server starts at `http://localhost:3000` with hot reload enabled. Changes to any `.md` or `.mdx` file in `pages/` trigger an instant refresh. Config changes in `tome.config.js` trigger a full reload.

## Add to an existing project

If you already have a project and want to add Tome documentation:

```bash
npm install @tome/cli @tome/theme react react-dom
```

Create the required files:

**`tome.config.js`**
```javascript
export default {
  name: "My Project Docs",
  navigation: [
    { group: "Docs", pages: ["index"] },
  ],
};
```

**`pages/index.md`**
```markdown
---
title: Introduction
---

# Welcome

Your documentation starts here.
```

**`index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Docs</title>
</head>
<body>
  <div id="tome-root"></div>
  <script type="module" src=".tome/entry.tsx"></script>
</body>
</html>
```

**`.tome/entry.tsx`**
```tsx
import "@tome/theme/entry";
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "tome dev",
    "build": "tome build"
  }
}
```

## Next steps

- **[Project Structure](#project-structure)** to understand how files are organized
- **[Configuration](#configuration)** to customize your site
