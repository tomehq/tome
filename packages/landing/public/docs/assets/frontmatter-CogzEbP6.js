const e={frontmatter:{title:"Frontmatter",description:"Reference for all YAML frontmatter fields supported in Tome documentation pages.",icon:"file-text",hidden:!1,toc:!0},html:`<p>Every Tome page can include YAML frontmatter at the top of the file. Frontmatter controls metadata like the page title, description, sidebar behavior, and search tags.</p>
<h2 id="syntax"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#syntax"><span class="icon icon-link"></span></a>Syntax</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">My Page Title</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">description</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">A brief summary of the page content.</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold"># My Page Title</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">Page content starts here.</span></span></code></pre>
<h2 id="fields"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#fields"><span class="icon icon-link"></span></a>Fields</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>title</code></td>
<td><code>string</code></td>
<td>First <code>#</code> heading</td>
<td>Page title for sidebar, browser tab, and search</td>
</tr>
<tr>
<td><code>description</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Short summary for SEO and search results</td>
</tr>
<tr>
<td><code>icon</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Icon identifier shown in the sidebar</td>
</tr>
<tr>
<td><code>sidebarTitle</code></td>
<td><code>string</code></td>
<td><code>title</code></td>
<td>Override the title shown in sidebar navigation</td>
</tr>
<tr>
<td><code>hidden</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Hide this page from sidebar navigation</td>
</tr>
<tr>
<td><code>tags</code></td>
<td><code>string[]</code></td>
<td>—</td>
<td>Tags for search indexing and categorization</td>
</tr>
<tr>
<td><code>ogImage</code></td>
<td><code>string</code></td>
<td>auto-generated</td>
<td>Custom OpenGraph image URL or path</td>
</tr>
</tbody>
</table>
<h2 id="title-resolution"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#title-resolution"><span class="icon icon-link"></span></a>Title resolution</h2>
<p>If <code>title</code> is not set in frontmatter, Tome uses the first <code># Heading</code> in the page content. If neither exists, the page is titled "Untitled".</p>
<p>The <code>sidebarTitle</code> field lets you show a shorter name in the sidebar:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Configuring Authentication with OAuth 2.0</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">sidebarTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Authentication</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span></code></pre>
<h2 id="hidden-pages"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#hidden-pages"><span class="icon icon-link"></span></a>Hidden pages</h2>
<p>Pages with <code>hidden: true</code> are excluded from sidebar navigation but remain accessible at their URL. Useful for:</p>
<ul>
<li>Landing pages that shouldn't appear in the sidebar</li>
<li>Draft pages shared via direct link</li>
<li>Internal reference pages linked from other content</li>
</ul>
<h2 id="tags"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tags"><span class="icon icon-link"></span></a>Tags</h2>
<p>Tags improve search results by adding keywords that may not appear in the page content:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Deployment</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">tags</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">hosting</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">vercel</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">netlify</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">cloudflare</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">static</span><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span></code></pre>
<p>Tags are indexed by both Pagefind and Algolia (when configured) and appear in MCP manifest output.</p>
<h2 id="icons"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#icons"><span class="icon icon-link"></span></a>Icons</h2>
<p>The <code>icon</code> field accepts identifiers displayed in the sidebar. Common values: <code>rocket</code>, <code>gear</code>, <code>code</code>, <code>terminal</code>, <code>puzzle</code>, <code>search</code>, <code>layers</code>, <code>cloud</code>, <code>file-text</code>, <code>palette</code>.</p>
<h2 id="opengraph-images"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#opengraph-images"><span class="icon icon-link"></span></a>OpenGraph images</h2>
<p>By default, Tome auto-generates OG images for every page at build time. Use <code>ogImage</code> to override with a custom image:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Getting Started</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">ogImage</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">/images/custom-og.png</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span></code></pre>
<p>The value can be a relative path (resolved from your site root) or a full URL. Pages with a custom <code>ogImage</code> skip auto-generation.</p>`,headings:[{depth:2,text:"Syntax",id:"syntax"},{depth:2,text:"Fields",id:"fields"},{depth:2,text:"Title resolution",id:"title-resolution"},{depth:2,text:"Hidden pages",id:"hidden-pages"},{depth:2,text:"Tags",id:"tags"},{depth:2,text:"Icons",id:"icons"},{depth:2,text:"OpenGraph images",id:"opengraph-images"}],raw:'\nEvery Tome page can include YAML frontmatter at the top of the file. Frontmatter controls metadata like the page title, description, sidebar behavior, and search tags.\n\n## Syntax\n\n```markdown\n---\ntitle: My Page Title\ndescription: A brief summary of the page content.\n---\n\n# My Page Title\n\nPage content starts here.\n```\n\n## Fields\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `title` | `string` | First `#` heading | Page title for sidebar, browser tab, and search |\n| `description` | `string` | — | Short summary for SEO and search results |\n| `icon` | `string` | — | Icon identifier shown in the sidebar |\n| `sidebarTitle` | `string` | `title` | Override the title shown in sidebar navigation |\n| `hidden` | `boolean` | `false` | Hide this page from sidebar navigation |\n| `tags` | `string[]` | — | Tags for search indexing and categorization |\n| `ogImage` | `string` | auto-generated | Custom OpenGraph image URL or path |\n\n## Title resolution\n\nIf `title` is not set in frontmatter, Tome uses the first `# Heading` in the page content. If neither exists, the page is titled "Untitled".\n\nThe `sidebarTitle` field lets you show a shorter name in the sidebar:\n\n```markdown\n---\ntitle: Configuring Authentication with OAuth 2.0\nsidebarTitle: Authentication\n---\n```\n\n## Hidden pages\n\nPages with `hidden: true` are excluded from sidebar navigation but remain accessible at their URL. Useful for:\n\n- Landing pages that shouldn\'t appear in the sidebar\n- Draft pages shared via direct link\n- Internal reference pages linked from other content\n\n## Tags\n\nTags improve search results by adding keywords that may not appear in the page content:\n\n```markdown\n---\ntitle: Deployment\ntags: [hosting, vercel, netlify, cloudflare, static]\n---\n```\n\nTags are indexed by both Pagefind and Algolia (when configured) and appear in MCP manifest output.\n\n## Icons\n\nThe `icon` field accepts identifiers displayed in the sidebar. Common values: `rocket`, `gear`, `code`, `terminal`, `puzzle`, `search`, `layers`, `cloud`, `file-text`, `palette`.\n\n## OpenGraph images\n\nBy default, Tome auto-generates OG images for every page at build time. Use `ogImage` to override with a custom image:\n\n```markdown\n---\ntitle: Getting Started\nogImage: /images/custom-og.png\n---\n```\n\nThe value can be a relative path (resolved from your site root) or a full URL. Pages with a custom `ogImage` skip auto-generation.\n'};export{e as default};
