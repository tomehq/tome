const n={frontmatter:{title:"Migrate from GitBook or Mintlify",description:"Move your existing documentation to Tome with a single command. Covers content conversion, navigation, redirects, and assets.",icon:"arrow-right-arrow-left",hidden:!1,toc:!0,draft:!1},html:`<p>Tome provides automated migration from GitBook and Mintlify. The CLI handles navigation restructuring, component syntax conversion, redirect mapping, and asset copying.</p>
<h2 id="migrate-from-gitbook"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#migrate-from-gitbook"><span class="icon icon-link"></span></a>Migrate from GitBook</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> gitbook</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./path-to-gitbook-project</span></span></code></pre>
<h3 id="what-gets-converted"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#what-gets-converted"><span class="icon icon-link"></span></a>What gets converted</h3>
<table>
<thead>
<tr>
<th>GitBook</th>
<th>Tome</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>SUMMARY.md</code> navigation</td>
<td><code>tome.config.js</code> navigation array</td>
</tr>
<tr>
<td><code>.gitbook.yaml</code> config</td>
<td><code>tome.config.js</code> settings</td>
</tr>
<tr>
<td><code>{% hint style="info" %}</code></td>
<td><code>&lt;Callout type="info"&gt;</code></td>
</tr>
<tr>
<td><code>{% hint style="warning" %}</code></td>
<td><code>&lt;Callout type="warning"&gt;</code></td>
</tr>
<tr>
<td><code>{% hint style="danger" %}</code></td>
<td><code>&lt;Callout type="danger"&gt;</code></td>
</tr>
<tr>
<td><code>{% hint style="success" %}</code></td>
<td><code>&lt;Callout type="tip"&gt;</code></td>
</tr>
<tr>
<td><code>{% tabs %}</code> / <code>{% tab %}</code></td>
<td><code>&lt;Tabs&gt;</code> / <code>&lt;Tab&gt;</code></td>
</tr>
<tr>
<td><code>{% code title="file.js" %}</code></td>
<td>Fenced code block with title</td>
</tr>
<tr>
<td><code>{% embed url="..." %}</code></td>
<td>Plain markdown link</td>
</tr>
<tr>
<td><code>.gitbook.yaml</code> redirects</td>
<td><code>tome.config.js</code> redirects</td>
</tr>
<tr>
<td>Images / assets</td>
<td>Copied to <code>public/</code></td>
</tr>
</tbody>
</table>
<h3 id="options"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#options"><span class="icon icon-link"></span></a>Options</h3>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"># Output to a specific directory</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> gitbook</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./gitbook-docs</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --out</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./my-new-docs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"># Preview without writing files</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> gitbook</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./gitbook-docs</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --dry-run</span></span></code></pre>
<h3 id="how-it-works"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#how-it-works"><span class="icon icon-link"></span></a>How it works</h3>
<ol>
<li>Reads <code>SUMMARY.md</code> for navigation structure and <code>.gitbook.yaml</code> for project settings</li>
<li>Walks all Markdown files and converts GitBook-specific syntax to Tome MDX components</li>
<li>Files containing converted JSX components are renamed from <code>.md</code> to <code>.mdx</code></li>
<li>Copies static assets (images, <code>.gitbook/assets/</code>) to <code>public/</code></li>
<li>Generates <code>tome.config.js</code> with navigation, redirects, and project name</li>
<li>Reports a summary of pages converted, redirects created, and any warnings</li>
</ol>
<hr>
<h2 id="migrate-from-mintlify"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#migrate-from-mintlify"><span class="icon icon-link"></span></a>Migrate from Mintlify</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> mintlify</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./path-to-mintlify-project</span></span></code></pre>
<p>Both <code>docs.json</code> (Mintlify's current config format) and <code>mint.json</code> (deprecated) are supported. The migration tool automatically detects which file is present, preferring <code>docs.json</code> if both exist.</p>
<h3 id="what-gets-converted-1"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#what-gets-converted-1"><span class="icon icon-link"></span></a>What gets converted</h3>
<table>
<thead>
<tr>
<th>Mintlify</th>
<th>Tome</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>docs.json</code> / <code>mint.json</code> navigation</td>
<td><code>tome.config.js</code> navigation array</td>
</tr>
<tr>
<td><code>docs.json</code> / <code>mint.json</code> colors</td>
<td><code>tome.config.js</code> theme accent</td>
</tr>
<tr>
<td><code>docs.json</code> / <code>mint.json</code> logo / favicon</td>
<td><code>tome.config.js</code> logo / favicon</td>
</tr>
<tr>
<td><code>docs.json</code> / <code>mint.json</code> topbar links</td>
<td><code>tome.config.js</code> topNav</td>
</tr>
<tr>
<td><code>docs.json</code> / <code>mint.json</code> redirects</td>
<td><code>tome.config.js</code> redirects</td>
</tr>
<tr>
<td><code>docs.json</code> / <code>mint.json</code> openapi</td>
<td><code>tome.config.js</code> api.spec</td>
</tr>
<tr>
<td><code>&lt;Note&gt;</code> / <code>&lt;Info&gt;</code></td>
<td><code>&lt;Callout type="info"&gt;</code></td>
</tr>
<tr>
<td><code>&lt;Warning&gt;</code></td>
<td><code>&lt;Callout type="warning"&gt;</code></td>
</tr>
<tr>
<td><code>&lt;Tip&gt;</code> / <code>&lt;Check&gt;</code></td>
<td><code>&lt;Callout type="tip"&gt;</code></td>
</tr>
<tr>
<td><code>&lt;CodeGroup&gt;</code></td>
<td><code>&lt;Tabs&gt;</code> wrapper</td>
</tr>
<tr>
<td><code>&lt;AccordionGroup&gt;</code></td>
<td>Removed (individual <code>&lt;Accordion&gt;</code> kept)</td>
</tr>
<tr>
<td><code>&lt;Frame&gt;</code></td>
<td>Removed (content preserved)</td>
</tr>
<tr>
<td><code>&lt;Snippet file="..." /&gt;</code></td>
<td>Inlined file content</td>
</tr>
</tbody>
</table>
<p>Components that are already compatible (<code>&lt;Card&gt;</code>, <code>&lt;CardGroup&gt;</code>, <code>&lt;Steps&gt;</code>, <code>&lt;Tabs&gt;</code>, <code>&lt;Accordion&gt;</code>) are kept as-is.</p>
<h3 id="options-1"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#options-1"><span class="icon icon-link"></span></a>Options</h3>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"># Output to a specific directory</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> mintlify</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./mintlify-docs</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --out</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./my-new-docs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"># Preview without writing files</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> mintlify</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./mintlify-docs</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --dry-run</span></span></code></pre>
<hr>
<h2 id="after-migration"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#after-migration"><span class="icon icon-link"></span></a>After migration</h2>
<h3 id="review-redirects"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#review-redirects"><span class="icon icon-link"></span></a>Review redirects</h3>
<p>Both migration tools automatically extract redirects from the source project and add them to <code>tome.config.js</code>. Check the generated config to verify redirect paths are correct:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> defineConfig</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  redirects: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { from: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/old-page"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, to: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/new-page"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">});</span></span></code></pre>
<p>See the <a href="guides/redirects">Redirects guide</a> for more on how redirects work.</p>
<h3 id="start-the-dev-server"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#start-the-dev-server"><span class="icon icon-link"></span></a>Start the dev server</h3>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">cd</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-new-docs</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> run</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> dev</span></span></code></pre>
<p>Open <a href="http://localhost:3000">localhost:3000</a> and review the converted pages. Some manual adjustments may be needed for complex custom components or layouts that don't have a direct Tome equivalent.</p>
<h3 id="deploy"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#deploy"><span class="icon icon-link"></span></a>Deploy</h3>
<p>Once everything looks good, deploy to Tome Cloud:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> login</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> deploy</span></span></code></pre>
<p>Or push to your git repository — if you scaffold with <code>tome init</code>, a GitHub Actions workflow is included that deploys automatically on push to <code>main</code>.</p>`,headings:[{depth:2,text:"Migrate from GitBook",id:"migrate-from-gitbook"},{depth:3,text:"What gets converted",id:"what-gets-converted"},{depth:3,text:"Options",id:"options"},{depth:3,text:"How it works",id:"how-it-works"},{depth:2,text:"Migrate from Mintlify",id:"migrate-from-mintlify"},{depth:3,text:"What gets converted",id:"what-gets-converted-1"},{depth:3,text:"Options",id:"options-1"},{depth:2,text:"After migration",id:"after-migration"},{depth:3,text:"Review redirects",id:"review-redirects"},{depth:3,text:"Start the dev server",id:"start-the-dev-server"},{depth:3,text:"Deploy",id:"deploy"}],raw:'\nTome provides automated migration from GitBook and Mintlify. The CLI handles navigation restructuring, component syntax conversion, redirect mapping, and asset copying.\n\n## Migrate from GitBook\n\n```bash\nnpx @tomehq/cli migrate gitbook ./path-to-gitbook-project\n```\n\n### What gets converted\n\n| GitBook | Tome |\n|---------|------|\n| `SUMMARY.md` navigation | `tome.config.js` navigation array |\n| `.gitbook.yaml` config | `tome.config.js` settings |\n| `{% hint style="info" %}` | `<Callout type="info">` |\n| `{% hint style="warning" %}` | `<Callout type="warning">` |\n| `{% hint style="danger" %}` | `<Callout type="danger">` |\n| `{% hint style="success" %}` | `<Callout type="tip">` |\n| `{% tabs %}` / `{% tab %}` | `<Tabs>` / `<Tab>` |\n| `{% code title="file.js" %}` | Fenced code block with title |\n| `{% embed url="..." %}` | Plain markdown link |\n| `.gitbook.yaml` redirects | `tome.config.js` redirects |\n| Images / assets | Copied to `public/` |\n\n### Options\n\n```bash\n# Output to a specific directory\nnpx @tomehq/cli migrate gitbook ./gitbook-docs --out ./my-new-docs\n\n# Preview without writing files\nnpx @tomehq/cli migrate gitbook ./gitbook-docs --dry-run\n```\n\n### How it works\n\n1. Reads `SUMMARY.md` for navigation structure and `.gitbook.yaml` for project settings\n2. Walks all Markdown files and converts GitBook-specific syntax to Tome MDX components\n3. Files containing converted JSX components are renamed from `.md` to `.mdx`\n4. Copies static assets (images, `.gitbook/assets/`) to `public/`\n5. Generates `tome.config.js` with navigation, redirects, and project name\n6. Reports a summary of pages converted, redirects created, and any warnings\n\n---\n\n## Migrate from Mintlify\n\n```bash\nnpx @tomehq/cli migrate mintlify ./path-to-mintlify-project\n```\n\nBoth `docs.json` (Mintlify\'s current config format) and `mint.json` (deprecated) are supported. The migration tool automatically detects which file is present, preferring `docs.json` if both exist.\n\n### What gets converted\n\n| Mintlify | Tome |\n|----------|------|\n| `docs.json` / `mint.json` navigation | `tome.config.js` navigation array |\n| `docs.json` / `mint.json` colors | `tome.config.js` theme accent |\n| `docs.json` / `mint.json` logo / favicon | `tome.config.js` logo / favicon |\n| `docs.json` / `mint.json` topbar links | `tome.config.js` topNav |\n| `docs.json` / `mint.json` redirects | `tome.config.js` redirects |\n| `docs.json` / `mint.json` openapi | `tome.config.js` api.spec |\n| `<Note>` / `<Info>` | `<Callout type="info">` |\n| `<Warning>` | `<Callout type="warning">` |\n| `<Tip>` / `<Check>` | `<Callout type="tip">` |\n| `<CodeGroup>` | `<Tabs>` wrapper |\n| `<AccordionGroup>` | Removed (individual `<Accordion>` kept) |\n| `<Frame>` | Removed (content preserved) |\n| `<Snippet file="..." />` | Inlined file content |\n\nComponents that are already compatible (`<Card>`, `<CardGroup>`, `<Steps>`, `<Tabs>`, `<Accordion>`) are kept as-is.\n\n### Options\n\n```bash\n# Output to a specific directory\nnpx @tomehq/cli migrate mintlify ./mintlify-docs --out ./my-new-docs\n\n# Preview without writing files\nnpx @tomehq/cli migrate mintlify ./mintlify-docs --dry-run\n```\n\n---\n\n## After migration\n\n### Review redirects\n\nBoth migration tools automatically extract redirects from the source project and add them to `tome.config.js`. Check the generated config to verify redirect paths are correct:\n\n```js\nexport default defineConfig({\n  redirects: [\n    { from: "/old-page", to: "/new-page" },\n  ],\n});\n```\n\nSee the [Redirects guide](guides/redirects) for more on how redirects work.\n\n### Start the dev server\n\n```bash\ncd my-new-docs\nnpm install\nnpm run dev\n```\n\nOpen [localhost:3000](http://localhost:3000) and review the converted pages. Some manual adjustments may be needed for complex custom components or layouts that don\'t have a direct Tome equivalent.\n\n### Deploy\n\nOnce everything looks good, deploy to Tome Cloud:\n\n```bash\nnpx @tomehq/cli login\nnpx @tomehq/cli deploy\n```\n\nOr push to your git repository — if you scaffold with `tome init`, a GitHub Actions workflow is included that deploys automatically on push to `main`.\n'};export{n as default};
