const e={frontmatter:{title:"Project Structure",description:"How a Tome documentation project is organized — pages, config, entry point, and build output.",icon:"folder",hidden:!1,toc:!0},html:`<p>Every Tome project follows the same layout. Understanding it helps you customize and extend your docs.</p>
<h2 id="directory-layout"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#directory-layout"><span class="icon icon-link"></span></a>Directory layout</h2>
<pre><code>my-docs/
├── pages/                  # Your documentation content
│   ├── index.md            # Home page (/)
│   ├── quickstart.md       # /quickstart
│   ├── guides/
│   │   ├── setup.md        # /guides/setup
│   │   └── deploy.md       # /guides/deploy
│   └── api/
│       └── endpoints.mdx   # /api/endpoints (with components)
├── .tome/
│   └── entry.tsx           # App entry point
├── tome.config.js          # Site configuration
├── index.html              # HTML shell
├── package.json            # Dependencies and scripts
└── out/                    # Build output (after \`tome build\`)
</code></pre>
<h2 id="key-files"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#key-files"><span class="icon icon-link"></span></a>Key files</h2>
<h3 id="pages-directory"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#pages-directory"><span class="icon icon-link"></span></a><code>pages/</code> directory</h3>
<p>All your documentation lives here. Every <code>.md</code> and <code>.mdx</code> file becomes a page. The directory structure maps directly to URL paths:</p>
<table>
<thead>
<tr>
<th>File path</th>
<th>Page ID</th>
<th>URL path</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pages/index.md</code></td>
<td><code>index</code></td>
<td><code>/</code></td>
</tr>
<tr>
<td><code>pages/quickstart.md</code></td>
<td><code>quickstart</code></td>
<td><code>/quickstart</code></td>
</tr>
<tr>
<td><code>pages/guides/setup.md</code></td>
<td><code>guides/setup</code></td>
<td><code>/guides/setup</code></td>
</tr>
</tbody>
</table>
<p>Files named <code>index.md</code> in subdirectories resolve to the directory path. For example, <code>pages/guides/index.md</code> maps to <code>/guides</code>.</p>
<h3 id="tomeconfigjs"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tomeconfigjs"><span class="icon icon-link"></span></a><code>tome.config.js</code></h3>
<p>The central configuration file. Controls your site name, sidebar navigation, theme, search, and more:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  theme: { preset: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"amber"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mode: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"auto"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  navigation: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Getting Started"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"index"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"quickstart"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Guides"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"guides/setup"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"guides/deploy"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<p>See <strong><a href="#configuration">Configuration</a></strong> for the full schema.</p>
<h3 id="tomeentrytsx"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tomeentrytsx"><span class="icon icon-link"></span></a><code>.tome/entry.tsx</code></h3>
<p>The application entry point. For most projects, this is a single import:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@tomehq/theme/entry"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre>
<p>This boots the Tome shell — the sidebar, search, theme switcher, and content renderer. You generally don't need to modify this file.</p>
<h3 id="indexhtml"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#indexhtml"><span class="icon icon-link"></span></a><code>index.html</code></h3>
<p>The HTML shell that loads your documentation app. Contains the <code>&lt;div id="tome-root"&gt;</code> mount point and the script tag for the entry file.</p>
<h3 id="out-directory"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#out-directory"><span class="icon icon-link"></span></a><code>out/</code> directory</h3>
<p>Generated by <code>tome build</code>. Contains the static site output ready for deployment — HTML, JavaScript bundles, and a search index. This directory is gitignored by default.</p>
<h2 id="markdown-vs-mdx"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#markdown-vs-mdx"><span class="icon icon-link"></span></a>Markdown vs MDX</h2>
<p>Tome supports both file types:</p>
<ul>
<li><strong><code>.md</code> files</strong> — Standard Markdown with frontmatter. Processed at build time into HTML. Good for most documentation pages.</li>
<li><strong><code>.mdx</code> files</strong> — Markdown with JSX support. You can import and use React components like <code>&lt;Callout&gt;</code>, <code>&lt;Tabs&gt;</code>, and <code>&lt;Steps&gt;</code> directly in your content.</li>
</ul>
<p>Both file types support the same frontmatter fields and appear identically in the sidebar.</p>
<h2 id="next-steps"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#next-steps"><span class="icon icon-link"></span></a>Next steps</h2>
<ul>
<li><strong><a href="#pages-routing">Pages &amp; Routing</a></strong> for details on how files map to URLs</li>
<li><strong><a href="#components">Components</a></strong> for using interactive elements in <code>.mdx</code> files</li>
<li><strong><a href="#configuration">Configuration</a></strong> for the full config schema</li>
</ul>`,headings:[{depth:2,text:"Directory layout",id:"directory-layout"},{depth:2,text:"Key files",id:"key-files"},{depth:3,text:"pages/ directory",id:"pages-directory"},{depth:3,text:"tome.config.js",id:"tomeconfigjs"},{depth:3,text:".tome/entry.tsx",id:"tomeentrytsx"},{depth:3,text:"index.html",id:"indexhtml"},{depth:3,text:"out/ directory",id:"out-directory"},{depth:2,text:"Markdown vs MDX",id:"markdown-vs-mdx"},{depth:2,text:"Next steps",id:"next-steps"}],raw:`
Every Tome project follows the same layout. Understanding it helps you customize and extend your docs.

## Directory layout

\`\`\`
my-docs/
├── pages/                  # Your documentation content
│   ├── index.md            # Home page (/)
│   ├── quickstart.md       # /quickstart
│   ├── guides/
│   │   ├── setup.md        # /guides/setup
│   │   └── deploy.md       # /guides/deploy
│   └── api/
│       └── endpoints.mdx   # /api/endpoints (with components)
├── .tome/
│   └── entry.tsx           # App entry point
├── tome.config.js          # Site configuration
├── index.html              # HTML shell
├── package.json            # Dependencies and scripts
└── out/                    # Build output (after \`tome build\`)
\`\`\`

## Key files

### \`pages/\` directory

All your documentation lives here. Every \`.md\` and \`.mdx\` file becomes a page. The directory structure maps directly to URL paths:

| File path | Page ID | URL path |
|-----------|---------|----------|
| \`pages/index.md\` | \`index\` | \`/\` |
| \`pages/quickstart.md\` | \`quickstart\` | \`/quickstart\` |
| \`pages/guides/setup.md\` | \`guides/setup\` | \`/guides/setup\` |

Files named \`index.md\` in subdirectories resolve to the directory path. For example, \`pages/guides/index.md\` maps to \`/guides\`.

### \`tome.config.js\`

The central configuration file. Controls your site name, sidebar navigation, theme, search, and more:

\`\`\`javascript
export default {
  name: "My Docs",
  theme: { preset: "amber", mode: "auto" },
  navigation: [
    { group: "Getting Started", pages: ["index", "quickstart"] },
    { group: "Guides", pages: ["guides/setup", "guides/deploy"] },
  ],
};
\`\`\`

See **[Configuration](#configuration)** for the full schema.

### \`.tome/entry.tsx\`

The application entry point. For most projects, this is a single import:

\`\`\`tsx
import "@tomehq/theme/entry";
\`\`\`

This boots the Tome shell — the sidebar, search, theme switcher, and content renderer. You generally don't need to modify this file.

### \`index.html\`

The HTML shell that loads your documentation app. Contains the \`<div id="tome-root">\` mount point and the script tag for the entry file.

### \`out/\` directory

Generated by \`tome build\`. Contains the static site output ready for deployment — HTML, JavaScript bundles, and a search index. This directory is gitignored by default.

## Markdown vs MDX

Tome supports both file types:

- **\`.md\` files** — Standard Markdown with frontmatter. Processed at build time into HTML. Good for most documentation pages.
- **\`.mdx\` files** — Markdown with JSX support. You can import and use React components like \`<Callout>\`, \`<Tabs>\`, and \`<Steps>\` directly in your content.

Both file types support the same frontmatter fields and appear identically in the sidebar.

## Next steps

- **[Pages & Routing](#pages-routing)** for details on how files map to URLs
- **[Components](#components)** for using interactive elements in \`.mdx\` files
- **[Configuration](#configuration)** for the full config schema
`};export{e as default};
