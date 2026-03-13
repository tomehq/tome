const n={frontmatter:{title:"Multi-Version Docs",description:"How to maintain multiple versions of your documentation with Tome's built-in versioning system.",icon:"layers",hidden:!1,toc:!0},html:`<p>Tome supports maintaining multiple versions of your documentation side by side. This is useful for libraries and APIs that need to document breaking changes across major versions.</p>
<h2 id="directory-structure"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#directory-structure"><span class="icon icon-link"></span></a>Directory structure</h2>
<p>Organize your pages by version using subdirectories:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>pages/</span></span>
<span class="line"><span>├── current/          # Latest version</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   ├── quickstart.md</span></span>
<span class="line"><span>│   └── api.md</span></span>
<span class="line"><span>├── v1.0/             # Previous version</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   ├── quickstart.md</span></span>
<span class="line"><span>│   └── api.md</span></span>
<span class="line"><span>└── v0.9/             # Older version</span></span>
<span class="line"><span>    ├── index.md</span></span>
<span class="line"><span>    └── api.md</span></span></code></pre>
<h2 id="configuration"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#configuration"><span class="icon icon-link"></span></a>Configuration</h2>
<p>Add the <code>versioning</code> section to your config:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  versioning: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    current: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"v2.0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    versions: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"v2.0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"v1.0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"v0.9"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
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
<td><code>current</code></td>
<td>string</td>
<td>The label for the current (latest) version</td>
</tr>
<tr>
<td><code>versions</code></td>
<td>string[]</td>
<td>All available versions, newest first</td>
</tr>
</tbody>
</table>
<h2 id="url-mapping"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#url-mapping"><span class="icon icon-link"></span></a>URL mapping</h2>
<table>
<thead>
<tr>
<th>Directory</th>
<th>URL</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pages/current/index.md</code></td>
<td><code>/</code></td>
</tr>
<tr>
<td><code>pages/current/api.md</code></td>
<td><code>/api</code></td>
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
<p>The <code>current</code> directory always serves at the root — no version prefix. Older versions are prefixed with their version string.</p>
<h2 id="version-switcher"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#version-switcher"><span class="icon icon-link"></span></a>Version switcher</h2>
<p>When versioning is configured, Tome automatically adds a version dropdown to the header. Users can switch between versions, and the URL updates to reflect the selected version.</p>
<p>If the current page exists in the target version, the user stays on that page. Otherwise, they're redirected to the version's index page.</p>
<h2 id="best-practices"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#best-practices"><span class="icon icon-link"></span></a>Best practices</h2>
<ul>
<li>Keep the <code>current</code> directory as your working copy</li>
<li>Copy <code>current</code> to a versioned directory (e.g., <code>v2.0</code>) when you cut a release</li>
<li>Remove pages from old versions that no longer apply rather than leaving stale content</li>
<li>Use the same page IDs across versions so the version switcher can navigate between them</li>
</ul>`,headings:[{depth:2,text:"Directory structure",id:"directory-structure"},{depth:2,text:"Configuration",id:"configuration"},{depth:2,text:"URL mapping",id:"url-mapping"},{depth:2,text:"Version switcher",id:"version-switcher"},{depth:2,text:"Best practices",id:"best-practices"}],raw:`
Tome supports maintaining multiple versions of your documentation side by side. This is useful for libraries and APIs that need to document breaking changes across major versions.

## Directory structure

Organize your pages by version using subdirectories:

\`\`\`text
pages/
├── current/          # Latest version
│   ├── index.md
│   ├── quickstart.md
│   └── api.md
├── v1.0/             # Previous version
│   ├── index.md
│   ├── quickstart.md
│   └── api.md
└── v0.9/             # Older version
    ├── index.md
    └── api.md
\`\`\`

## Configuration

Add the \`versioning\` section to your config:

\`\`\`javascript
export default {
  name: "My Docs",
  versioning: {
    current: "v2.0",
    versions: ["v2.0", "v1.0", "v0.9"],
  },
};
\`\`\`

| Field | Type | Description |
|-------|------|-------------|
| \`current\` | string | The label for the current (latest) version |
| \`versions\` | string[] | All available versions, newest first |

## URL mapping

| Directory | URL |
|-----------|-----|
| \`pages/current/index.md\` | \`/\` |
| \`pages/current/api.md\` | \`/api\` |
| \`pages/v1.0/index.md\` | \`/v1.0/\` |
| \`pages/v1.0/api.md\` | \`/v1.0/api\` |

The \`current\` directory always serves at the root — no version prefix. Older versions are prefixed with their version string.

## Version switcher

When versioning is configured, Tome automatically adds a version dropdown to the header. Users can switch between versions, and the URL updates to reflect the selected version.

If the current page exists in the target version, the user stays on that page. Otherwise, they're redirected to the version's index page.

## Best practices

- Keep the \`current\` directory as your working copy
- Copy \`current\` to a versioned directory (e.g., \`v2.0\`) when you cut a release
- Remove pages from old versions that no longer apply rather than leaving stale content
- Use the same page IDs across versions so the version switcher can navigate between them
`};export{n as default};
