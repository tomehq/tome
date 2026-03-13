const n={frontmatter:{title:"CLI Reference",description:"Complete reference for every command and flag in the Tome CLI.",icon:"terminal",hidden:!1,toc:!0},html:`<p>The <code>tome</code> CLI is the primary interface for creating, developing, building, and deploying documentation sites.</p>
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
<p>Creates <code>tome.config.js</code>, <code>package.json</code>, <code>index.html</code>, <code>.tome/entry.tsx</code>, starter pages in <code>pages/</code>, and <code>public/</code> and <code>styles/</code> directories.</p>
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
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> deploy</span></span></code></pre>
<p>Builds, collects output files, and uploads using hash-based deduplication.</p>
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
<h3 id="tome-algoliainit"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-algoliainit"><span class="icon icon-link"></span></a><code>tome algolia:init</code></h3>
<p>Initialize an Algolia DocSearch index. Prompts for credentials and creates a crawler configuration.</p>
<hr>
<h3 id="tome-mcp"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tome-mcp"><span class="icon icon-link"></span></a><code>tome mcp</code></h3>
<p>Start the MCP (Model Context Protocol) stdio server for AI tool integration. Exposes documentation content as MCP resources and tools.</p>`,headings:[{depth:2,text:"Installation",id:"installation"},{depth:2,text:"Commands",id:"commands"},{depth:3,text:"tome init [name]",id:"tome-init-name"},{depth:3,text:"tome dev",id:"tome-dev"},{depth:3,text:"tome build",id:"tome-build"},{depth:3,text:"tome deploy",id:"tome-deploy"},{depth:3,text:"tome login",id:"tome-login"},{depth:3,text:"tome domains:add &lt;domain&gt;",id:"tome-domainsadd-domain"},{depth:3,text:"tome domains:verify &lt;domain&gt;",id:"tome-domainsverify-domain"},{depth:3,text:"tome domains:list",id:"tome-domainslist"},{depth:3,text:"tome domains:remove &lt;domain&gt;",id:"tome-domainsremove-domain"},{depth:3,text:"tome algolia:init",id:"tome-algoliainit"},{depth:3,text:"tome mcp",id:"tome-mcp"}],raw:`
The \`tome\` CLI is the primary interface for creating, developing, building, and deploying documentation sites.

## Installation

\`\`\`bash
npm install -D @tomehq/cli
# or globally
npm install -g @tomehq/cli
\`\`\`

## Commands

### \`tome init [name]\`

Create a new Tome documentation project.

\`\`\`bash
tome init my-docs
\`\`\`

| Argument | Default | Description |
|----------|---------|-------------|
| \`name\` | \`my-docs\` | Project directory name |

| Flag | Default | Description |
|------|---------|-------------|
| \`-t, --template <name>\` | \`default\` | Starter template |

Creates \`tome.config.js\`, \`package.json\`, \`index.html\`, \`.tome/entry.tsx\`, starter pages in \`pages/\`, and \`public/\` and \`styles/\` directories.

---

### \`tome dev\`

Start the development server with hot reloading.

\`\`\`bash
tome dev
tome dev -p 4000
tome dev --host
\`\`\`

| Flag | Default | Description |
|------|---------|-------------|
| \`-p, --port <number>\` | \`3000\` | Server port |
| \`--host\` | \`false\` | Expose to network (bind \`0.0.0.0\`) |

Watches \`pages/\` for file changes and reloads automatically. Config changes trigger a full reload.

---

### \`tome build\`

Build the documentation site for production.

\`\`\`bash
tome build
tome build -o dist
\`\`\`

| Flag | Default | Description |
|------|---------|-------------|
| \`-o, --outDir <dir>\` | \`out\` | Output directory |

Produces a static site and runs Pagefind to build the search index.

---

### \`tome deploy\`

Deploy the site to Tome Cloud. Requires \`tome login\` first.

\`\`\`bash
tome deploy
\`\`\`

Builds, collects output files, and uploads using hash-based deduplication.

---

### \`tome login\`

Authenticate with Tome Cloud.

\`\`\`bash
tome login
\`\`\`

Prompts for email and sends a magic link. Stores the API token locally.

---

### \`tome domains:add <domain>\`

Add a custom domain. Returns DNS records to configure.

\`\`\`bash
tome domains:add docs.example.com
\`\`\`

### \`tome domains:verify <domain>\`

Verify DNS configuration for a custom domain.

\`\`\`bash
tome domains:verify docs.example.com
\`\`\`

### \`tome domains:list\`

List all custom domains for the current project.

### \`tome domains:remove <domain>\`

Remove a custom domain.

---

### \`tome algolia:init\`

Initialize an Algolia DocSearch index. Prompts for credentials and creates a crawler configuration.

---

### \`tome mcp\`

Start the MCP (Model Context Protocol) stdio server for AI tool integration. Exposes documentation content as MCP resources and tools.
`};export{n as default};
