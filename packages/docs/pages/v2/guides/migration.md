---
title: Migrate from GitBook or Mintlify
description: Move your existing documentation to Tome with a single command. Covers content conversion, navigation, redirects, and assets.
icon: arrow-right-arrow-left
---

Tome provides automated migration from GitBook and Mintlify. The CLI handles navigation restructuring, component syntax conversion, redirect mapping, and asset copying.

## Migrate from GitBook

```bash
npx tome migrate gitbook ./path-to-gitbook-project
```

### What gets converted

| GitBook | Tome |
|---------|------|
| `SUMMARY.md` navigation | `tome.config.js` navigation array |
| `.gitbook.yaml` config | `tome.config.js` settings |
| `{% hint style="info" %}` | `<Callout type="info">` |
| `{% hint style="warning" %}` | `<Callout type="warning">` |
| `{% hint style="danger" %}` | `<Callout type="danger">` |
| `{% hint style="success" %}` | `<Callout type="tip">` |
| `{% tabs %}` / `{% tab %}` | `<Tabs>` / `<Tab>` |
| `{% code title="file.js" %}` | Fenced code block with title |
| `{% embed url="..." %}` | Plain markdown link |
| `.gitbook.yaml` redirects | `tome.config.js` redirects |
| Images / assets | Copied to `public/` |

### Options

```bash
# Output to a specific directory
npx tome migrate gitbook ./gitbook-docs --out ./my-new-docs

# Preview without writing files
npx tome migrate gitbook ./gitbook-docs --dry-run
```

### How it works

1. Reads `SUMMARY.md` for navigation structure and `.gitbook.yaml` for project settings
2. Walks all Markdown files and converts GitBook-specific syntax to Tome MDX components
3. Files containing converted JSX components are renamed from `.md` to `.mdx`
4. Copies static assets (images, `.gitbook/assets/`) to `public/`
5. Generates `tome.config.js` with navigation, redirects, and project name
6. Reports a summary of pages converted, redirects created, and any warnings

---

## Migrate from Mintlify

```bash
npx tome migrate mintlify ./path-to-mintlify-project
```

### What gets converted

| Mintlify | Tome |
|----------|------|
| `mint.json` navigation | `tome.config.js` navigation array |
| `mint.json` colors | `tome.config.js` theme accent |
| `mint.json` logo / favicon | `tome.config.js` logo / favicon |
| `mint.json` topbar links | `tome.config.js` topNav |
| `mint.json` redirects | `tome.config.js` redirects |
| `mint.json` openapi | `tome.config.js` api.spec |
| `<Note>` / `<Info>` | `<Callout type="info">` |
| `<Warning>` | `<Callout type="warning">` |
| `<Tip>` / `<Check>` | `<Callout type="tip">` |
| `<CodeGroup>` | `<Tabs>` wrapper |
| `<AccordionGroup>` | Removed (individual `<Accordion>` kept) |
| `<Frame>` | Removed (content preserved) |
| `<Snippet file="..." />` | Inlined file content |

Components that are already compatible (`<Card>`, `<CardGroup>`, `<Steps>`, `<Tabs>`, `<Accordion>`) are kept as-is.

### Options

```bash
# Output to a specific directory
npx tome migrate mintlify ./mintlify-docs --out ./my-new-docs

# Preview without writing files
npx tome migrate mintlify ./mintlify-docs --dry-run
```

---

## After migration

### Review redirects

Both migration tools automatically extract redirects from the source project and add them to `tome.config.js`. Check the generated config to verify redirect paths are correct:

```js
export default defineConfig({
  redirects: [
    { from: "/old-page", to: "/new-page" },
  ],
});
```

See the [Redirects guide](/docs/guides/redirects) for more on how redirects work.

### Start the dev server

```bash
cd my-new-docs
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) and review the converted pages. Some manual adjustments may be needed for complex custom components or layouts that don't have a direct Tome equivalent.

### Deploy

Once everything looks good, deploy to Tome Cloud:

```bash
npx tome login
npx tome deploy
```

Or push to your git repository — if you scaffold with `tome init`, a GitHub Actions workflow is included that deploys automatically on push to `main`.
