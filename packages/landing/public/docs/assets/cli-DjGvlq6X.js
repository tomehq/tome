const n={frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1,toc:!0,draft:!1},html:`<p>The <code>tome</code> CLI is the primary interface for creating, developing, building, and deploying documentation sites.</p>
<h2 id="installation"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#installation"><span class="icon icon-link"></span></a>Installation</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> -D</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"># or globally</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> -g</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span></span></code></pre>
<h2 id="commands"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#commands"><span class="icon icon-link"></span></a>Commands</h2>
<h3 id="tome-init-name"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-init-name"><span class="icon icon-link"></span></a><code>tome init [name]</code></h3>
<p>Create a new Tome documentation project.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> init</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-docs</span></span></code></pre>
<table>
<thead>
<tr>
<th>Argument</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>name</code></td>
<td><code>my-docs</code></td>
<td>Project directory name</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>Flag</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-t, --template &lt;name&gt;</code></td>
<td><code>default</code></td>
<td>Starter template</td>
</tr>
</tbody>
</table>
<p>Creates <code>tome.config.js</code>, <code>package.json</code>, <code>index.html</code>, <code>.tome/entry.tsx</code>, starter pages in <code>pages/</code>, <code>public/</code> and <code>styles/</code> directories, and a <code>.github/workflows/deploy.yml</code> GitHub Actions workflow for automatic deploys.</p>
<hr>
<h3 id="tome-dev"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-dev"><span class="icon icon-link"></span></a><code>tome dev</code></h3>
<p>Start the development server with hot reloading.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> dev</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> dev</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> -p</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 4000</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> dev</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --host</span></span></code></pre>
<table>
<thead>
<tr>
<th>Flag</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-p, --port &lt;number&gt;</code></td>
<td><code>3000</code></td>
<td>Server port</td>
</tr>
<tr>
<td><code>--host</code></td>
<td><code>false</code></td>
<td>Expose to network (bind <code>0.0.0.0</code>)</td>
</tr>
</tbody>
</table>
<p>Watches <code>pages/</code> for file changes and reloads automatically. Config changes trigger a full reload.</p>
<hr>
<h3 id="tome-build"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-build"><span class="icon icon-link"></span></a><code>tome build</code></h3>
<p>Build the documentation site for production.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> build</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> build</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> -o</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> dist</span></span></code></pre>
<table>
<thead>
<tr>
<th>Flag</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-o, --outDir &lt;dir&gt;</code></td>
<td><code>out</code></td>
<td>Output directory</td>
</tr>
</tbody>
</table>
<p>Produces a static site and runs Pagefind to build the search index.</p>
<hr>
<h3 id="tome-deploy"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-deploy"><span class="icon icon-link"></span></a><code>tome deploy</code></h3>
<p>Deploy the site to Tome Cloud. Requires <code>tome login</code> first.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> deploy</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> deploy</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --preview</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --branch</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> feature/auth</span></span></code></pre>
<table>
<thead>
<tr>
<th>Flag</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--preview</code></td>
<td><code>false</code></td>
<td>Deploy as a preview (branch-based URL)</td>
</tr>
<tr>
<td><code>--branch &lt;name&gt;</code></td>
<td>auto-detect</td>
<td>Git branch name for preview</td>
</tr>
<tr>
<td><code>--expires &lt;days&gt;</code></td>
<td><code>7</code></td>
<td>Preview expiry in days</td>
</tr>
</tbody>
</table>
<p>Builds, collects output files, and uploads using hash-based deduplication. With <code>--preview</code>, deploys to a branch-specific URL (e.g., <code>feature-auth.preview.my-docs.tome.center</code>) and injects a preview banner.</p>
<hr>
<h3 id="tome-lint"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-lint"><span class="icon icon-link"></span></a><code>tome lint</code></h3>
<p>Lint documentation content for common issues.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> lint</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> lint</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --strict</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> lint</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --banned-words</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "simply,obviously"</span></span></code></pre>
<table>
<thead>
<tr>
<th>Flag</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--max-paragraph &lt;n&gt;</code></td>
<td><code>300</code></td>
<td>Max words per paragraph</td>
</tr>
<tr>
<td><code>--no-heading-increment</code></td>
<td>—</td>
<td>Disable heading increment check</td>
</tr>
<tr>
<td><code>--no-image-alt</code></td>
<td>—</td>
<td>Disable missing alt text check</td>
</tr>
<tr>
<td><code>--no-single-h1</code></td>
<td>—</td>
<td>Disable single H1 check</td>
</tr>
<tr>
<td><code>--no-empty-links</code></td>
<td>—</td>
<td>Disable empty link check</td>
</tr>
<tr>
<td><code>--banned-words &lt;words&gt;</code></td>
<td>—</td>
<td>Comma-separated list of banned words</td>
</tr>
<tr>
<td><code>--strict</code></td>
<td><code>false</code></td>
<td>Treat warnings as errors</td>
</tr>
</tbody>
</table>
<p>Checks all pages for heading hierarchy issues, missing image alt text, overly long paragraphs, duplicate H1 tags, empty links, and banned words.</p>
<hr>
<h3 id="tome-login"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-login"><span class="icon icon-link"></span></a><code>tome login</code></h3>
<p>Authenticate with Tome Cloud.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> login</span></span></code></pre>
<p>Prompts for email and sends a magic link. Stores the API token locally.</p>
<hr>
<h3 id="tome-domainsadd-domain"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-domainsadd-domain"><span class="icon icon-link"></span></a><code>tome domains:add &lt;domain&gt;</code></h3>
<p>Add a custom domain. Returns DNS records to configure.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> domains:add</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> docs.example.com</span></span></code></pre>
<h3 id="tome-domainsverify-domain"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-domainsverify-domain"><span class="icon icon-link"></span></a><code>tome domains:verify &lt;domain&gt;</code></h3>
<p>Verify DNS configuration for a custom domain.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> domains:verify</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> docs.example.com</span></span></code></pre>
<h3 id="tome-domainslist"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-domainslist"><span class="icon icon-link"></span></a><code>tome domains:list</code></h3>
<p>List all custom domains for the current project.</p>
<h3 id="tome-domainsremove-domain"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-domainsremove-domain"><span class="icon icon-link"></span></a><code>tome domains:remove &lt;domain&gt;</code></h3>
<p>Remove a custom domain.</p>
<hr>
<h3 id="tome-migrate-gitbook-source-dir"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-migrate-gitbook-source-dir"><span class="icon icon-link"></span></a><code>tome migrate gitbook &lt;source-dir&gt;</code></h3>
<p>Migrate a GitBook documentation project to Tome.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> gitbook</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./my-gitbook-docs</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> gitbook</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./my-gitbook-docs</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --out</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./converted</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> gitbook</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./my-gitbook-docs</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --dry-run</span></span></code></pre>
<table>
<thead>
<tr>
<th>Flag</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--out &lt;dir&gt;</code></td>
<td><code>.</code> (current directory)</td>
<td>Output directory for converted project</td>
</tr>
<tr>
<td><code>--dry-run</code></td>
<td><code>false</code></td>
<td>Preview changes without writing files</td>
</tr>
</tbody>
</table>
<p>Reads <code>SUMMARY.md</code> for navigation structure and <code>.gitbook.yaml</code> for configuration. Converts GitBook-specific syntax to Tome components:</p>
<ul>
<li><code>{% hint %}</code> blocks → <code>&lt;Callout&gt;</code> components</li>
<li><code>{% tabs %}</code> blocks → <code>&lt;Tabs&gt;</code> / <code>&lt;Tab&gt;</code> components</li>
<li><code>{% code title="..." %}</code> → fenced code blocks with titles</li>
<li><code>{% embed %}</code> → plain links</li>
<li>Redirects from <code>.gitbook.yaml</code> → Tome <code>redirects</code> config</li>
</ul>
<p>Files are copied to <code>pages/</code> preserving directory structure. Files containing converted JSX components are renamed from <code>.md</code> to <code>.mdx</code>. Static assets are copied to <code>public/</code>.</p>
<hr>
<h3 id="tome-migrate-mintlify-source-dir"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-migrate-mintlify-source-dir"><span class="icon icon-link"></span></a><code>tome migrate mintlify &lt;source-dir&gt;</code></h3>
<p>Migrate a Mintlify documentation project to Tome.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> mintlify</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./my-mintlify-docs</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> mintlify</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./my-mintlify-docs</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --out</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./converted</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> migrate</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> mintlify</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> ./my-mintlify-docs</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --dry-run</span></span></code></pre>
<table>
<thead>
<tr>
<th>Flag</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--out &lt;dir&gt;</code></td>
<td><code>.</code> (current directory)</td>
<td>Output directory for converted project</td>
</tr>
<tr>
<td><code>--dry-run</code></td>
<td><code>false</code></td>
<td>Preview changes without writing files</td>
</tr>
</tbody>
</table>
<p>Reads <code>mint.json</code> for configuration and navigation. Converts Mintlify-specific syntax to Tome components:</p>
<ul>
<li><code>&lt;Note&gt;</code>, <code>&lt;Warning&gt;</code>, <code>&lt;Info&gt;</code>, <code>&lt;Tip&gt;</code>, <code>&lt;Check&gt;</code> → <code>&lt;Callout&gt;</code> components</li>
<li><code>&lt;CodeGroup&gt;</code> → <code>&lt;Tabs&gt;</code> wrapper</li>
<li><code>&lt;AccordionGroup&gt;</code> → stripped (individual <code>&lt;Accordion&gt;</code> components kept)</li>
<li><code>&lt;Frame&gt;</code> → stripped (content preserved)</li>
<li><code>&lt;Snippet file="..." /&gt;</code> → inlined file content</li>
</ul>
<p>Maps <code>mint.json</code> settings to <code>tome.config.js</code>: colors, logo, favicon, navigation, redirects, topbar links, and OpenAPI configuration.</p>
<hr>
<h3 id="tome-algoliainit"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-algoliainit"><span class="icon icon-link"></span></a><code>tome algolia:init</code></h3>
<p>Initialize an Algolia DocSearch index. Prompts for credentials and creates a crawler configuration.</p>
<hr>
<h3 id="tome-mcp"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-mcp"><span class="icon icon-link"></span></a><code>tome mcp</code></h3>
<p>Start the MCP (Model Context Protocol) stdio server for AI tool integration. Exposes documentation content as MCP resources and tools.</p>`,headings:[{depth:2,text:"Installation",id:"installation"},{depth:2,text:"Commands",id:"commands"},{depth:3,text:"tome init [name]",id:"tome-init-name"},{depth:3,text:"tome dev",id:"tome-dev"},{depth:3,text:"tome build",id:"tome-build"},{depth:3,text:"tome deploy",id:"tome-deploy"},{depth:3,text:"tome lint",id:"tome-lint"},{depth:3,text:"tome login",id:"tome-login"},{depth:3,text:"tome domains:add &lt;domain&gt;",id:"tome-domainsadd-domain"},{depth:3,text:"tome domains:verify &lt;domain&gt;",id:"tome-domainsverify-domain"},{depth:3,text:"tome domains:list",id:"tome-domainslist"},{depth:3,text:"tome domains:remove &lt;domain&gt;",id:"tome-domainsremove-domain"},{depth:3,text:"tome migrate gitbook &lt;source-dir&gt;",id:"tome-migrate-gitbook-source-dir"},{depth:3,text:"tome migrate mintlify &lt;source-dir&gt;",id:"tome-migrate-mintlify-source-dir"},{depth:3,text:"tome algolia:init",id:"tome-algoliainit"},{depth:3,text:"tome mcp",id:"tome-mcp"}],raw:'\nThe `tome` CLI is the primary interface for creating, developing, building, and deploying documentation sites.\n\n## Installation\n\n```bash\nnpm install -D @tomehq/cli\n# or globally\nnpm install -g @tomehq/cli\n```\n\n## Commands\n\n### `tome init [name]`\n\nCreate a new Tome documentation project.\n\n```bash\ntome init my-docs\n```\n\n| Argument | Default | Description |\n|----------|---------|-------------|\n| `name` | `my-docs` | Project directory name |\n\n| Flag | Default | Description |\n|------|---------|-------------|\n| `-t, --template <name>` | `default` | Starter template |\n\nCreates `tome.config.js`, `package.json`, `index.html`, `.tome/entry.tsx`, starter pages in `pages/`, `public/` and `styles/` directories, and a `.github/workflows/deploy.yml` GitHub Actions workflow for automatic deploys.\n\n---\n\n### `tome dev`\n\nStart the development server with hot reloading.\n\n```bash\ntome dev\ntome dev -p 4000\ntome dev --host\n```\n\n| Flag | Default | Description |\n|------|---------|-------------|\n| `-p, --port <number>` | `3000` | Server port |\n| `--host` | `false` | Expose to network (bind `0.0.0.0`) |\n\nWatches `pages/` for file changes and reloads automatically. Config changes trigger a full reload.\n\n---\n\n### `tome build`\n\nBuild the documentation site for production.\n\n```bash\ntome build\ntome build -o dist\n```\n\n| Flag | Default | Description |\n|------|---------|-------------|\n| `-o, --outDir <dir>` | `out` | Output directory |\n\nProduces a static site and runs Pagefind to build the search index.\n\n---\n\n### `tome deploy`\n\nDeploy the site to Tome Cloud. Requires `tome login` first.\n\n```bash\ntome deploy\ntome deploy --preview --branch feature/auth\n```\n\n| Flag | Default | Description |\n|------|---------|-------------|\n| `--preview` | `false` | Deploy as a preview (branch-based URL) |\n| `--branch <name>` | auto-detect | Git branch name for preview |\n| `--expires <days>` | `7` | Preview expiry in days |\n\nBuilds, collects output files, and uploads using hash-based deduplication. With `--preview`, deploys to a branch-specific URL (e.g., `feature-auth.preview.my-docs.tome.center`) and injects a preview banner.\n\n---\n\n### `tome lint`\n\nLint documentation content for common issues.\n\n```bash\ntome lint\ntome lint --strict\ntome lint --banned-words "simply,obviously"\n```\n\n| Flag | Default | Description |\n|------|---------|-------------|\n| `--max-paragraph <n>` | `300` | Max words per paragraph |\n| `--no-heading-increment` | — | Disable heading increment check |\n| `--no-image-alt` | — | Disable missing alt text check |\n| `--no-single-h1` | — | Disable single H1 check |\n| `--no-empty-links` | — | Disable empty link check |\n| `--banned-words <words>` | — | Comma-separated list of banned words |\n| `--strict` | `false` | Treat warnings as errors |\n\nChecks all pages for heading hierarchy issues, missing image alt text, overly long paragraphs, duplicate H1 tags, empty links, and banned words.\n\n---\n\n### `tome login`\n\nAuthenticate with Tome Cloud.\n\n```bash\ntome login\n```\n\nPrompts for email and sends a magic link. Stores the API token locally.\n\n---\n\n### `tome domains:add <domain>`\n\nAdd a custom domain. Returns DNS records to configure.\n\n```bash\ntome domains:add docs.example.com\n```\n\n### `tome domains:verify <domain>`\n\nVerify DNS configuration for a custom domain.\n\n```bash\ntome domains:verify docs.example.com\n```\n\n### `tome domains:list`\n\nList all custom domains for the current project.\n\n### `tome domains:remove <domain>`\n\nRemove a custom domain.\n\n---\n\n### `tome migrate gitbook <source-dir>`\n\nMigrate a GitBook documentation project to Tome.\n\n```bash\ntome migrate gitbook ./my-gitbook-docs\ntome migrate gitbook ./my-gitbook-docs --out ./converted\ntome migrate gitbook ./my-gitbook-docs --dry-run\n```\n\n| Flag | Default | Description |\n|------|---------|-------------|\n| `--out <dir>` | `.` (current directory) | Output directory for converted project |\n| `--dry-run` | `false` | Preview changes without writing files |\n\nReads `SUMMARY.md` for navigation structure and `.gitbook.yaml` for configuration. Converts GitBook-specific syntax to Tome components:\n\n- `{% hint %}` blocks → `<Callout>` components\n- `{% tabs %}` blocks → `<Tabs>` / `<Tab>` components\n- `{% code title="..." %}` → fenced code blocks with titles\n- `{% embed %}` → plain links\n- Redirects from `.gitbook.yaml` → Tome `redirects` config\n\nFiles are copied to `pages/` preserving directory structure. Files containing converted JSX components are renamed from `.md` to `.mdx`. Static assets are copied to `public/`.\n\n---\n\n### `tome migrate mintlify <source-dir>`\n\nMigrate a Mintlify documentation project to Tome.\n\n```bash\ntome migrate mintlify ./my-mintlify-docs\ntome migrate mintlify ./my-mintlify-docs --out ./converted\ntome migrate mintlify ./my-mintlify-docs --dry-run\n```\n\n| Flag | Default | Description |\n|------|---------|-------------|\n| `--out <dir>` | `.` (current directory) | Output directory for converted project |\n| `--dry-run` | `false` | Preview changes without writing files |\n\nReads `mint.json` for configuration and navigation. Converts Mintlify-specific syntax to Tome components:\n\n- `<Note>`, `<Warning>`, `<Info>`, `<Tip>`, `<Check>` → `<Callout>` components\n- `<CodeGroup>` → `<Tabs>` wrapper\n- `<AccordionGroup>` → stripped (individual `<Accordion>` components kept)\n- `<Frame>` → stripped (content preserved)\n- `<Snippet file="..." />` → inlined file content\n\nMaps `mint.json` settings to `tome.config.js`: colors, logo, favicon, navigation, redirects, topbar links, and OpenAPI configuration.\n\n---\n\n### `tome algolia:init`\n\nInitialize an Algolia DocSearch index. Prompts for credentials and creates a crawler configuration.\n\n---\n\n### `tome mcp`\n\nStart the MCP (Model Context Protocol) stdio server for AI tool integration. Exposes documentation content as MCP resources and tools.\n'};export{n as default};
