const n={frontmatter:{title:"Components",description:"Reference for all built-in MDX components — Callout, Tabs, Card, Steps, Accordion, and more.",icon:"puzzle",hidden:!1,toc:!0},html:`<p>Tome includes built-in components available in any <code>.mdx</code> file without imports.</p>
<h2 id="callout"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#callout"><span class="icon icon-link"></span></a>Callout</h2>
<p>Draw attention to important information.</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Callout type="info" title="Note"&gt;
  This is an informational callout.
&lt;/Callout&gt;
</code></pre>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>type</code></td>
<td><code>"info" | "tip" | "warning" | "danger"</code></td>
<td><code>"info"</code></td>
<td>Visual style and icon</td>
</tr>
<tr>
<td><code>title</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Optional heading text</td>
</tr>
</tbody>
</table>
<p>Types: <code>info</code> (blue), <code>tip</code> (green), <code>warning</code> (amber), <code>danger</code> (red).</p>
<hr>
<h2 id="tabs"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tabs"><span class="icon icon-link"></span></a>Tabs</h2>
<p>Present content variants — useful for multiple languages or platform-specific instructions.</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Tabs items={["npm", "yarn", "pnpm"]}&gt;
  &lt;div&gt;npm install @tomehq/cli&lt;/div&gt;
  &lt;div&gt;yarn add @tomehq/cli&lt;/div&gt;
  &lt;div&gt;pnpm add @tomehq/cli&lt;/div&gt;
&lt;/Tabs&gt;
</code></pre>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>items</code></td>
<td><code>string[]</code></td>
<td>Tab labels (required)</td>
</tr>
</tbody>
</table>
<p>Each child <code>&lt;div&gt;</code> maps to a tab in order.</p>
<hr>
<h2 id="card"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#card"><span class="icon icon-link"></span></a>Card</h2>
<p>A linked or static content card.</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Card title="Getting Started" icon="rocket" href="/quickstart"&gt;
  Set up your first project in minutes.
&lt;/Card&gt;
</code></pre>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>title</code></td>
<td><code>string</code></td>
<td>Card heading (required)</td>
</tr>
<tr>
<td><code>icon</code></td>
<td><code>string</code></td>
<td>Emoji or icon name</td>
</tr>
<tr>
<td><code>href</code></td>
<td><code>string</code></td>
<td>Link URL (makes the card clickable)</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="cardgroup"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#cardgroup"><span class="icon icon-link"></span></a>CardGroup</h2>
<p>Arranges cards in a responsive grid.</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;CardGroup cols={3}&gt;
  &lt;Card title="Install"&gt;Step 1&lt;/Card&gt;
  &lt;Card title="Configure"&gt;Step 2&lt;/Card&gt;
  &lt;Card title="Deploy"&gt;Step 3&lt;/Card&gt;
&lt;/CardGroup&gt;
</code></pre>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>cols</code></td>
<td><code>number</code></td>
<td><code>2</code></td>
<td>Number of columns</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="steps"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#steps"><span class="icon icon-link"></span></a>Steps</h2>
<p>Sequential instructions with numbered indicators.</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Steps&gt;
  &lt;div&gt;
    **Create a project**
    Run \`tome init my-docs\`.
  &lt;/div&gt;
  &lt;div&gt;
    **Install dependencies**
    Run \`npm install\`.
  &lt;/div&gt;
&lt;/Steps&gt;
</code></pre>
<p>Each child <code>&lt;div&gt;</code> becomes a numbered step. Use bold text on the first line for the step title.</p>
<hr>
<h2 id="accordion"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#accordion"><span class="icon icon-link"></span></a>Accordion</h2>
<p>Collapsible content sections for FAQs or optional details.</p>
<pre class="tome-code" data-lang="mdx"><code>&lt;Accordion title="How do I deploy?"&gt;
  Run \`tome build\` then upload the \`out/\` directory.
&lt;/Accordion&gt;
</code></pre>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>title</code></td>
<td><code>string</code></td>
<td>Clickable header text (required)</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="api-components"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#api-components"><span class="icon icon-link"></span></a>API components</h2>
<p>When an OpenAPI spec is configured, additional components are auto-generated:</p>
<ul>
<li><strong>ApiEndpoint</strong> — Renders an API endpoint with parameters and responses</li>
<li><strong>ApiPlayground</strong> — Interactive request builder</li>
<li><strong>ApiResponse</strong> — Formatted response viewer</li>
</ul>
<p>See the <a href="/docs/guides/api-reference">API reference guide</a> for setup.</p>
<hr>
<h2 id="md-vs-mdx"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#md-vs-mdx"><span class="icon icon-link"></span></a><code>.md</code> vs <code>.mdx</code></h2>
<p>Components are only available in <code>.mdx</code> files. Rename <code>.md</code> to <code>.mdx</code> to use them — no other changes needed.</p>`,headings:[{depth:2,text:"Callout",id:"callout"},{depth:2,text:"Tabs",id:"tabs"},{depth:2,text:"Card",id:"card"},{depth:2,text:"CardGroup",id:"cardgroup"},{depth:2,text:"Steps",id:"steps"},{depth:2,text:"Accordion",id:"accordion"},{depth:2,text:"API components",id:"api-components"},{depth:2,text:".md vs .mdx",id:"md-vs-mdx"}],raw:`
Tome includes built-in components available in any \`.mdx\` file without imports.

## Callout

Draw attention to important information.

\`\`\`mdx
<Callout type="info" title="Note">
  This is an informational callout.
</Callout>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`type\` | \`"info" \\| "tip" \\| "warning" \\| "danger"\` | \`"info"\` | Visual style and icon |
| \`title\` | \`string\` | — | Optional heading text |

Types: \`info\` (blue), \`tip\` (green), \`warning\` (amber), \`danger\` (red).

---

## Tabs

Present content variants — useful for multiple languages or platform-specific instructions.

\`\`\`mdx
<Tabs items={["npm", "yarn", "pnpm"]}>
  <div>npm install @tomehq/cli</div>
  <div>yarn add @tomehq/cli</div>
  <div>pnpm add @tomehq/cli</div>
</Tabs>
\`\`\`

| Prop | Type | Description |
|------|------|-------------|
| \`items\` | \`string[]\` | Tab labels (required) |

Each child \`<div>\` maps to a tab in order.

---

## Card

A linked or static content card.

\`\`\`mdx
<Card title="Getting Started" icon="rocket" href="/quickstart">
  Set up your first project in minutes.
</Card>
\`\`\`

| Prop | Type | Description |
|------|------|-------------|
| \`title\` | \`string\` | Card heading (required) |
| \`icon\` | \`string\` | Emoji or icon name |
| \`href\` | \`string\` | Link URL (makes the card clickable) |

---

## CardGroup

Arranges cards in a responsive grid.

\`\`\`mdx
<CardGroup cols={3}>
  <Card title="Install">Step 1</Card>
  <Card title="Configure">Step 2</Card>
  <Card title="Deploy">Step 3</Card>
</CardGroup>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`cols\` | \`number\` | \`2\` | Number of columns |

---

## Steps

Sequential instructions with numbered indicators.

\`\`\`mdx
<Steps>
  <div>
    **Create a project**
    Run \`tome init my-docs\`.
  </div>
  <div>
    **Install dependencies**
    Run \`npm install\`.
  </div>
</Steps>
\`\`\`

Each child \`<div>\` becomes a numbered step. Use bold text on the first line for the step title.

---

## Accordion

Collapsible content sections for FAQs or optional details.

\`\`\`mdx
<Accordion title="How do I deploy?">
  Run \`tome build\` then upload the \`out/\` directory.
</Accordion>
\`\`\`

| Prop | Type | Description |
|------|------|-------------|
| \`title\` | \`string\` | Clickable header text (required) |

---

## API components

When an OpenAPI spec is configured, additional components are auto-generated:

- **ApiEndpoint** — Renders an API endpoint with parameters and responses
- **ApiPlayground** — Interactive request builder
- **ApiResponse** — Formatted response viewer

See the [API reference guide](/docs/guides/api-reference) for setup.

---

## \`.md\` vs \`.mdx\`

Components are only available in \`.mdx\` files. Rename \`.md\` to \`.mdx\` to use them — no other changes needed.
`};export{n as default};
