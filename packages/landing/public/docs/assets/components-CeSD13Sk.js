const n={frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1,toc:!0},html:`<p>Tome includes a set of built-in components available in any <code>.mdx</code> file. No imports needed — they're injected automatically.</p>
<h2 id="callout"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#callout"><span class="icon icon-link"></span></a>Callout</h2>
<p>Highlight important information with a styled callout:</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Callout title="Important"&gt;
  This is critical information that users should not miss.
&lt;/Callout&gt;
</code></pre>
<p>Callouts support a <code>type</code> prop for different styles:</p>
<table>
<thead>
<tr>
<th>Type</th>
<th>Use case</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>info</code></td>
<td>General information (default)</td>
</tr>
<tr>
<td><code>warning</code></td>
<td>Cautions and potential issues</td>
</tr>
<tr>
<td><code>error</code></td>
<td>Critical warnings and breaking changes</td>
</tr>
<tr>
<td><code>tip</code></td>
<td>Helpful suggestions and best practices</td>
</tr>
</tbody>
</table>
<pre class="tome-code" data-lang="mdx"><code>&lt;Callout type="warning" title="Deprecation Notice"&gt;
  This API endpoint will be removed in v3.0.
&lt;/Callout&gt;
</code></pre>
<h2 id="tabs"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tabs"><span class="icon icon-link"></span></a>Tabs</h2>
<p>Present content variants — useful for multiple languages or platform-specific instructions:</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Tabs items={["npm", "pnpm", "yarn"]}&gt;
  &lt;Tab&gt;npm install @tomehq/cli&lt;/Tab&gt;
  &lt;Tab&gt;pnpm add @tomehq/cli&lt;/Tab&gt;
  &lt;Tab&gt;yarn add @tomehq/cli&lt;/Tab&gt;
&lt;/Tabs&gt;
</code></pre>
<p>The active tab persists across page navigations within the same session.</p>
<h2 id="card"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#card"><span class="icon icon-link"></span></a>Card</h2>
<p>Link to related pages or external resources:</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Card title="Quickstart" href="#quickstart"&gt;
  Get up and running in under a minute.
&lt;/Card&gt;
</code></pre>
<h3 id="card-group"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#card-group"><span class="icon icon-link"></span></a>Card group</h3>
<p>Arrange cards in a responsive grid:</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;CardGroup cols={3}&gt;
  &lt;Card title="Setup"&gt;Step 1&lt;/Card&gt;
  &lt;Card title="Configure"&gt;Step 2&lt;/Card&gt;
  &lt;Card title="Deploy"&gt;Step 3&lt;/Card&gt;
&lt;/CardGroup&gt;
</code></pre>
<p>The <code>cols</code> prop accepts <code>2</code>, <code>3</code>, or <code>4</code>. Defaults to <code>2</code>.</p>
<h2 id="steps"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#steps"><span class="icon icon-link"></span></a>Steps</h2>
<p>Ordered procedural instructions with visual step indicators:</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Steps&gt;
  &lt;Step title="Install dependencies"&gt;
    Run \`npm install\` in your project directory.
  &lt;/Step&gt;
  &lt;Step title="Configure"&gt;
    Edit \`tome.config.js\` with your settings.
  &lt;/Step&gt;
  &lt;Step title="Deploy"&gt;
    Run \`tome deploy\` to publish your site.
  &lt;/Step&gt;
&lt;/Steps&gt;
</code></pre>
<h2 id="accordion"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#accordion"><span class="icon icon-link"></span></a>Accordion</h2>
<p>Collapsible content sections for FAQs or optional details:</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Accordion title="How do I deploy?"&gt;
  Run \`npx tome deploy\` from your project directory. See the deployment guide for details.
&lt;/Accordion&gt;
</code></pre>
<p>Multiple accordions stack vertically. Only one opens at a time by default.</p>
<h2 id="using-components"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#using-components"><span class="icon icon-link"></span></a>Using components</h2>
<p>Components are only available in <code>.mdx</code> files. If your file uses the <code>.md</code> extension, rename it to <code>.mdx</code> to enable component support.</p>
<pre><code>pages/
├── index.md          # Standard Markdown only
├── quickstart.mdx    # Markdown + components
</code></pre>
<p>No import statements are needed. Tome injects all built-in components automatically:</p>
<pre class="tome-code" data-lang="mdx"><code>---
title: Getting Started
---

# Getting Started

&lt;Callout type="tip" title="Prerequisites"&gt;
  Make sure you have Node.js 18+ installed.
&lt;/Callout&gt;

&lt;Steps&gt;
  &lt;Step title="Create project"&gt;
    Run \`npx @tomehq/cli init my-docs\`
  &lt;/Step&gt;
  &lt;Step title="Start dev server"&gt;
    Run \`npm run dev\`
  &lt;/Step&gt;
&lt;/Steps&gt;
</code></pre>`,headings:[{depth:2,text:"Callout",id:"callout"},{depth:2,text:"Tabs",id:"tabs"},{depth:2,text:"Card",id:"card"},{depth:3,text:"Card group",id:"card-group"},{depth:2,text:"Steps",id:"steps"},{depth:2,text:"Accordion",id:"accordion"},{depth:2,text:"Using components",id:"using-components"}],raw:`
Tome includes a set of built-in components available in any \`.mdx\` file. No imports needed — they're injected automatically.

## Callout

Highlight important information with a styled callout:

\`\`\`mdx
<Callout title="Important">
  This is critical information that users should not miss.
</Callout>
\`\`\`

Callouts support a \`type\` prop for different styles:

| Type | Use case |
|------|----------|
| \`info\` | General information (default) |
| \`warning\` | Cautions and potential issues |
| \`error\` | Critical warnings and breaking changes |
| \`tip\` | Helpful suggestions and best practices |

\`\`\`mdx
<Callout type="warning" title="Deprecation Notice">
  This API endpoint will be removed in v3.0.
</Callout>
\`\`\`

## Tabs

Present content variants — useful for multiple languages or platform-specific instructions:

\`\`\`mdx
<Tabs items={["npm", "pnpm", "yarn"]}>
  <Tab>npm install @tomehq/cli</Tab>
  <Tab>pnpm add @tomehq/cli</Tab>
  <Tab>yarn add @tomehq/cli</Tab>
</Tabs>
\`\`\`

The active tab persists across page navigations within the same session.

## Card

Link to related pages or external resources:

\`\`\`mdx
<Card title="Quickstart" href="#quickstart">
  Get up and running in under a minute.
</Card>
\`\`\`

### Card group

Arrange cards in a responsive grid:

\`\`\`mdx
<CardGroup cols={3}>
  <Card title="Setup">Step 1</Card>
  <Card title="Configure">Step 2</Card>
  <Card title="Deploy">Step 3</Card>
</CardGroup>
\`\`\`

The \`cols\` prop accepts \`2\`, \`3\`, or \`4\`. Defaults to \`2\`.

## Steps

Ordered procedural instructions with visual step indicators:

\`\`\`mdx
<Steps>
  <Step title="Install dependencies">
    Run \`npm install\` in your project directory.
  </Step>
  <Step title="Configure">
    Edit \`tome.config.js\` with your settings.
  </Step>
  <Step title="Deploy">
    Run \`tome deploy\` to publish your site.
  </Step>
</Steps>
\`\`\`

## Accordion

Collapsible content sections for FAQs or optional details:

\`\`\`mdx
<Accordion title="How do I deploy?">
  Run \`npx tome deploy\` from your project directory. See the deployment guide for details.
</Accordion>
\`\`\`

Multiple accordions stack vertically. Only one opens at a time by default.

## Using components

Components are only available in \`.mdx\` files. If your file uses the \`.md\` extension, rename it to \`.mdx\` to enable component support.

\`\`\`
pages/
├── index.md          # Standard Markdown only
├── quickstart.mdx    # Markdown + components
\`\`\`

No import statements are needed. Tome injects all built-in components automatically:

\`\`\`mdx
---
title: Getting Started
---

# Getting Started

<Callout type="tip" title="Prerequisites">
  Make sure you have Node.js 18+ installed.
</Callout>

<Steps>
  <Step title="Create project">
    Run \`npx @tomehq/cli init my-docs\`
  </Step>
  <Step title="Start dev server">
    Run \`npm run dev\`
  </Step>
</Steps>
\`\`\`
`};export{n as default};
