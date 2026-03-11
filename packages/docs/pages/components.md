---
title: Components
description: Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.
icon: puzzle
---

# Components

Tome includes a set of built-in components available in any `.mdx` file. No imports needed — they're injected automatically.

## Callout

Highlight important information with a styled callout:

```mdx
<Callout title="Important">
  This is critical information that users should not miss.
</Callout>
```

Callouts support a `type` prop for different styles:

| Type | Use case |
|------|----------|
| `info` | General information (default) |
| `warning` | Cautions and potential issues |
| `error` | Critical warnings and breaking changes |
| `tip` | Helpful suggestions and best practices |

```mdx
<Callout type="warning" title="Deprecation Notice">
  This API endpoint will be removed in v3.0.
</Callout>
```

## Tabs

Present content variants — useful for multiple languages or platform-specific instructions:

```mdx
<Tabs items={["npm", "pnpm", "yarn"]}>
  <Tab>npm install @tomehq/cli</Tab>
  <Tab>pnpm add @tomehq/cli</Tab>
  <Tab>yarn add @tomehq/cli</Tab>
</Tabs>
```

The active tab persists across page navigations within the same session.

## Card

Link to related pages or external resources:

```mdx
<Card title="Quickstart" href="#quickstart">
  Get up and running in under a minute.
</Card>
```

### Card group

Arrange cards in a responsive grid:

```mdx
<CardGroup cols={3}>
  <Card title="Setup">Step 1</Card>
  <Card title="Configure">Step 2</Card>
  <Card title="Deploy">Step 3</Card>
</CardGroup>
```

The `cols` prop accepts `2`, `3`, or `4`. Defaults to `2`.

## Steps

Ordered procedural instructions with visual step indicators:

```mdx
<Steps>
  <Step title="Install dependencies">
    Run `npm install` in your project directory.
  </Step>
  <Step title="Configure">
    Edit `tome.config.js` with your settings.
  </Step>
  <Step title="Deploy">
    Run `tome deploy` to publish your site.
  </Step>
</Steps>
```

## Accordion

Collapsible content sections for FAQs or optional details:

```mdx
<Accordion title="How do I deploy?">
  Run `npx tome deploy` from your project directory. See the deployment guide for details.
</Accordion>
```

Multiple accordions stack vertically. Only one opens at a time by default.

## Using components

Components are only available in `.mdx` files. If your file uses the `.md` extension, rename it to `.mdx` to enable component support.

```
pages/
├── index.md          # Standard Markdown only
├── quickstart.mdx    # Markdown + components
```

No import statements are needed. Tome injects all built-in components automatically:

```mdx
---
title: Getting Started
---

# Getting Started

<Callout type="tip" title="Prerequisites">
  Make sure you have Node.js 18+ installed.
</Callout>

<Steps>
  <Step title="Create project">
    Run `npx @tomehq/cli init my-docs`
  </Step>
  <Step title="Start dev server">
    Run `npm run dev`
  </Step>
</Steps>
```
