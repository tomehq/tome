const n={frontmatter:{title:"Pages & Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",icon:"map",hidden:!1,toc:!0},html:`<p>Every <code>.md</code> or <code>.mdx</code> file in the <code>pages/</code> directory becomes a page. The file path determines the URL.</p>
<h2 id="basic-routing"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#basic-routing"><span class="icon icon-link"></span></a>Basic routing</h2>
<table>
<thead>
<tr>
<th>File path</th>
<th>URL</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pages/index.md</code></td>
<td><code>/</code></td>
</tr>
<tr>
<td><code>pages/quickstart.md</code></td>
<td><code>/quickstart</code></td>
</tr>
<tr>
<td><code>pages/guides/deployment.md</code></td>
<td><code>/guides/deployment</code></td>
</tr>
<tr>
<td><code>pages/api/endpoints.md</code></td>
<td><code>/api/endpoints</code></td>
</tr>
<tr>
<td><code>pages/api/index.md</code></td>
<td><code>/api</code></td>
</tr>
</tbody>
</table>
<p><strong>Rules:</strong></p>
<ul>
<li><code>index.md</code> serves at the directory's root path</li>
<li>File extensions are stripped from the URL</li>
<li>Directory nesting maps directly to URL segments</li>
<li>Both <code>.md</code> and <code>.mdx</code> files are supported</li>
</ul>
<h2 id="page-ids"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#page-ids"><span class="icon icon-link"></span></a>Page IDs</h2>
<p>Each page has an ID derived from its path relative to <code>pages/</code>:</p>
<table>
<thead>
<tr>
<th>File</th>
<th>Page ID</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pages/index.md</code></td>
<td><code>index</code></td>
</tr>
<tr>
<td><code>pages/quickstart.md</code></td>
<td><code>quickstart</code></td>
</tr>
<tr>
<td><code>pages/guides/deployment.md</code></td>
<td><code>guides/deployment</code></td>
</tr>
</tbody>
</table>
<p>Page IDs are used in <code>navigation</code> config to control sidebar order.</p>
<h2 id="navigation-vs-routing"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#navigation-vs-routing"><span class="icon icon-link"></span></a>Navigation vs. routing</h2>
<p>All pages in <code>pages/</code> are routable regardless of whether they appear in <code>navigation</code>. Navigation only controls the sidebar.</p>
<p>Pages can be hidden from the sidebar using <code>hidden: true</code> in frontmatter while remaining accessible at their URL.</p>
<h2 id="frontmatter"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#frontmatter"><span class="icon icon-link"></span></a>Frontmatter</h2>
<p>Every page can include YAML frontmatter at the top of the file:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">My Page</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">description</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">A brief description for SEO and navigation.</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">icon</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">book</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">sidebarTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Short Title</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">hidden</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">tags</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">guide</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">setup</span><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold"># My Page</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">Content starts here.</span></span></code></pre>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>title</code></td>
<td>string</td>
<td>Page title (falls back to first <code>#</code> heading)</td>
</tr>
<tr>
<td><code>description</code></td>
<td>string</td>
<td>Description for metadata and navigation</td>
</tr>
<tr>
<td><code>icon</code></td>
<td>string</td>
<td>Icon identifier shown in the sidebar</td>
</tr>
<tr>
<td><code>sidebarTitle</code></td>
<td>string</td>
<td>Override title shown in the sidebar</td>
</tr>
<tr>
<td><code>hidden</code></td>
<td>boolean</td>
<td>Hide page from sidebar (still accessible via URL)</td>
</tr>
<tr>
<td><code>tags</code></td>
<td>string[]</td>
<td>Tags for categorization and search</td>
</tr>
</tbody>
</table>
<h2 id="i18n-routing"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#i18n-routing"><span class="icon icon-link"></span></a>i18n routing</h2>
<p>When multiple locales are configured, organize pages by locale subdirectory:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>pages/</span></span>
<span class="line"><span>├── en/            # Default locale</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   └── quickstart.md</span></span>
<span class="line"><span>├── es/            # Spanish</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   └── quickstart.md</span></span></code></pre>
<table>
<thead>
<tr>
<th>File</th>
<th>URL</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pages/en/index.md</code></td>
<td><code>/</code> (default — no prefix)</td>
</tr>
<tr>
<td><code>pages/es/index.md</code></td>
<td><code>/es/</code></td>
</tr>
<tr>
<td><code>pages/es/quickstart.md</code></td>
<td><code>/es/quickstart</code></td>
</tr>
</tbody>
</table>
<p>The default locale serves at the root without a prefix. When <code>fallback: true</code> and a page doesn't exist in a non-default locale, the default version is used.</p>
<h2 id="versioned-routing"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#versioned-routing"><span class="icon icon-link"></span></a>Versioned routing</h2>
<p>When versioning is configured:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>pages/</span></span>
<span class="line"><span>├── current/       # Latest version</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   └── api.md</span></span>
<span class="line"><span>├── v1.0/</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   └── api.md</span></span></code></pre>
<table>
<thead>
<tr>
<th>File</th>
<th>URL</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pages/current/index.md</code></td>
<td><code>/</code></td>
</tr>
<tr>
<td><code>pages/v1.0/index.md</code></td>
<td><code>/v1.0/</code></td>
</tr>
<tr>
<td><code>pages/v1.0/api.md</code></td>
<td><code>/v1.0/api</code></td>
</tr>
</tbody>
</table>
<p>The <code>current</code> directory serves at the root. Older versions are prefixed with their version string.</p>
<h2 id="file-discovery"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#file-discovery"><span class="icon icon-link"></span></a>File discovery</h2>
<p>Tome discovers pages by scanning <code>pages/</code> for <code>**/*.{md,mdx}</code> files. Discovery runs at startup and again whenever files are added, removed, or renamed during development. Changes to existing files trigger a hot reload.</p>`,headings:[{depth:2,text:"Basic routing",id:"basic-routing"},{depth:2,text:"Page IDs",id:"page-ids"},{depth:2,text:"Navigation vs. routing",id:"navigation-vs-routing"},{depth:2,text:"Frontmatter",id:"frontmatter"},{depth:2,text:"i18n routing",id:"i18n-routing"},{depth:2,text:"Versioned routing",id:"versioned-routing"},{depth:2,text:"File discovery",id:"file-discovery"}],raw:"\nEvery `.md` or `.mdx` file in the `pages/` directory becomes a page. The file path determines the URL.\n\n## Basic routing\n\n| File path | URL |\n|-----------|-----|\n| `pages/index.md` | `/` |\n| `pages/quickstart.md` | `/quickstart` |\n| `pages/guides/deployment.md` | `/guides/deployment` |\n| `pages/api/endpoints.md` | `/api/endpoints` |\n| `pages/api/index.md` | `/api` |\n\n**Rules:**\n\n- `index.md` serves at the directory's root path\n- File extensions are stripped from the URL\n- Directory nesting maps directly to URL segments\n- Both `.md` and `.mdx` files are supported\n\n## Page IDs\n\nEach page has an ID derived from its path relative to `pages/`:\n\n| File | Page ID |\n|------|---------|\n| `pages/index.md` | `index` |\n| `pages/quickstart.md` | `quickstart` |\n| `pages/guides/deployment.md` | `guides/deployment` |\n\nPage IDs are used in `navigation` config to control sidebar order.\n\n## Navigation vs. routing\n\nAll pages in `pages/` are routable regardless of whether they appear in `navigation`. Navigation only controls the sidebar.\n\nPages can be hidden from the sidebar using `hidden: true` in frontmatter while remaining accessible at their URL.\n\n## Frontmatter\n\nEvery page can include YAML frontmatter at the top of the file:\n\n```markdown\n---\ntitle: My Page\ndescription: A brief description for SEO and navigation.\nicon: book\nsidebarTitle: Short Title\nhidden: false\ntags: [guide, setup]\n---\n\n# My Page\n\nContent starts here.\n```\n\n| Field | Type | Description |\n|-------|------|-------------|\n| `title` | string | Page title (falls back to first `#` heading) |\n| `description` | string | Description for metadata and navigation |\n| `icon` | string | Icon identifier shown in the sidebar |\n| `sidebarTitle` | string | Override title shown in the sidebar |\n| `hidden` | boolean | Hide page from sidebar (still accessible via URL) |\n| `tags` | string[] | Tags for categorization and search |\n\n## i18n routing\n\nWhen multiple locales are configured, organize pages by locale subdirectory:\n\n```text\npages/\n├── en/            # Default locale\n│   ├── index.md\n│   └── quickstart.md\n├── es/            # Spanish\n│   ├── index.md\n│   └── quickstart.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/en/index.md` | `/` (default — no prefix) |\n| `pages/es/index.md` | `/es/` |\n| `pages/es/quickstart.md` | `/es/quickstart` |\n\nThe default locale serves at the root without a prefix. When `fallback: true` and a page doesn't exist in a non-default locale, the default version is used.\n\n## Versioned routing\n\nWhen versioning is configured:\n\n```text\npages/\n├── current/       # Latest version\n│   ├── index.md\n│   └── api.md\n├── v1.0/\n│   ├── index.md\n│   └── api.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/current/index.md` | `/` |\n| `pages/v1.0/index.md` | `/v1.0/` |\n| `pages/v1.0/api.md` | `/v1.0/api` |\n\nThe `current` directory serves at the root. Older versions are prefixed with their version string.\n\n## File discovery\n\nTome discovers pages by scanning `pages/` for `**/*.{md,mdx}` files. Discovery runs at startup and again whenever files are added, removed, or renamed during development. Changes to existing files trigger a hot reload.\n"};export{n as default};
