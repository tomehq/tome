const e={frontmatter:{title:"File-System Routing",description:"How Tome maps files in the pages/ directory to URLs — naming conventions, nested routes, i18n, and versioning.",hidden:!1,toc:!0},html:`<p>Every <code>.md</code> or <code>.mdx</code> file in the <code>pages/</code> directory becomes a page. The file path determines the URL.</p>
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
<p>The <code>current</code> directory serves at the root. Older versions are prefixed.</p>
<h2 id="file-discovery"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#file-discovery"><span class="icon icon-link"></span></a>File discovery</h2>
<p>Tome discovers pages by scanning <code>pages/</code> for <code>**/*.{md,mdx}</code> files. Discovery runs at startup and again whenever files are added, removed, or renamed during development.</p>`,headings:[{depth:2,text:"Basic routing",id:"basic-routing"},{depth:2,text:"Page IDs",id:"page-ids"},{depth:2,text:"Navigation vs. routing",id:"navigation-vs-routing"},{depth:2,text:"i18n routing",id:"i18n-routing"},{depth:2,text:"Versioned routing",id:"versioned-routing"},{depth:2,text:"File discovery",id:"file-discovery"}],raw:"\nEvery `.md` or `.mdx` file in the `pages/` directory becomes a page. The file path determines the URL.\n\n## Basic routing\n\n| File path | URL |\n|-----------|-----|\n| `pages/index.md` | `/` |\n| `pages/quickstart.md` | `/quickstart` |\n| `pages/guides/deployment.md` | `/guides/deployment` |\n| `pages/api/endpoints.md` | `/api/endpoints` |\n| `pages/api/index.md` | `/api` |\n\n**Rules:**\n\n- `index.md` serves at the directory's root path\n- File extensions are stripped from the URL\n- Directory nesting maps directly to URL segments\n\n## Page IDs\n\nEach page has an ID derived from its path relative to `pages/`:\n\n| File | Page ID |\n|------|---------|\n| `pages/index.md` | `index` |\n| `pages/quickstart.md` | `quickstart` |\n| `pages/guides/deployment.md` | `guides/deployment` |\n\nPage IDs are used in `navigation` config to control sidebar order.\n\n## Navigation vs. routing\n\nAll pages in `pages/` are routable regardless of whether they appear in `navigation`. Navigation only controls the sidebar.\n\nPages can be hidden from the sidebar using `hidden: true` in frontmatter while remaining accessible at their URL.\n\n## i18n routing\n\nWhen multiple locales are configured, organize pages by locale subdirectory:\n\n```text\npages/\n├── en/            # Default locale\n│   ├── index.md\n│   └── quickstart.md\n├── es/            # Spanish\n│   ├── index.md\n│   └── quickstart.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/en/index.md` | `/` (default — no prefix) |\n| `pages/es/index.md` | `/es/` |\n| `pages/es/quickstart.md` | `/es/quickstart` |\n\nThe default locale serves at the root without a prefix. When `fallback: true` and a page doesn't exist in a non-default locale, the default version is used.\n\n## Versioned routing\n\nWhen versioning is configured:\n\n```text\npages/\n├── current/       # Latest version\n│   ├── index.md\n│   └── api.md\n├── v1.0/\n│   ├── index.md\n│   └── api.md\n```\n\n| File | URL |\n|------|-----|\n| `pages/current/index.md` | `/` |\n| `pages/v1.0/index.md` | `/v1.0/` |\n| `pages/v1.0/api.md` | `/v1.0/api` |\n\nThe `current` directory serves at the root. Older versions are prefixed.\n\n## File discovery\n\nTome discovers pages by scanning `pages/` for `**/*.{md,mdx}` files. Discovery runs at startup and again whenever files are added, removed, or renamed during development.\n"};export{e as default};
