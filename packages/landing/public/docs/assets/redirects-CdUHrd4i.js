const e={frontmatter:{title:"Redirects",description:"Set up URL redirects to preserve links when pages move. Supports config-level and per-page frontmatter redirects.",icon:"arrow-turn-right",hidden:!1,toc:!0,draft:!1},html:`<p>Tome supports URL redirects at two levels: global config and per-page frontmatter. Redirects return a 301 (permanent) status in development and generate static redirect files for production builds.</p>
<h2 id="config-level-redirects"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#config-level-redirects"><span class="icon icon-link"></span></a>Config-level redirects</h2>
<p>Add a <code>redirects</code> array to <code>tome.config.js</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { defineConfig } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@tomehq/core"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> defineConfig</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  redirects: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { from: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/old-page"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, to: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/new-page"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { from: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/docs/setup"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, to: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/docs/getting-started"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { from: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/api"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, to: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/docs/reference/api"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">});</span></span></code></pre>
<p>Each entry needs a <code>from</code> path (the old URL) and a <code>to</code> path (the new URL).</p>
<h2 id="frontmatter-redirects"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#frontmatter-redirects"><span class="icon icon-link"></span></a>Frontmatter redirects</h2>
<p>Add <code>redirect_from</code> to a page's frontmatter to redirect old URLs to that page:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Getting Started</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">redirect_from</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">/docs/setup</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">/docs/installation</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">/quickstart</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">Welcome to the getting started guide.</span></span></code></pre>
<p>Any request to <code>/docs/setup</code>, <code>/docs/installation</code>, or <code>/quickstart</code> will redirect to this page.</p>
<h2 id="how-redirects-work"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#how-redirects-work"><span class="icon icon-link"></span></a>How redirects work</h2>
<h3 id="development"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#development"><span class="icon icon-link"></span></a>Development</h3>
<p>The dev server intercepts requests and returns a <code>301 Moved Permanently</code> response for any matched redirect path. Both config-level and frontmatter redirects are active during development.</p>
<h3 id="production-builds"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#production-builds"><span class="icon icon-link"></span></a>Production builds</h3>
<p>During <code>tome build</code>, Tome emits two types of redirect outputs to ensure compatibility across hosting platforms:</p>
<ol>
<li>
<p><strong><code>_redirects</code> file</strong> — A Netlify/Vercel-compatible redirects file in the build output root. Each line maps a source path to a destination with a 301 status code.</p>
</li>
<li>
<p><strong>Meta-refresh HTML files</strong> — For each redirect source path, Tome generates a small HTML file with a <code>&lt;meta http-equiv="refresh"&gt;</code> tag. This ensures redirects work on any static hosting platform, including S3 and GitHub Pages.</p>
</li>
</ol>
<h2 id="migration-redirects"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#migration-redirects"><span class="icon icon-link"></span></a>Migration redirects</h2>
<p>When migrating from GitBook or Mintlify, the migration tools automatically extract redirects from the source project configuration and add them to your <code>tome.config.js</code>. See the <a href="/docs/guides/migration">Migration guide</a> for details.</p>`,headings:[{depth:2,text:"Config-level redirects",id:"config-level-redirects"},{depth:2,text:"Frontmatter redirects",id:"frontmatter-redirects"},{depth:2,text:"How redirects work",id:"how-redirects-work"},{depth:3,text:"Development",id:"development"},{depth:3,text:"Production builds",id:"production-builds"},{depth:2,text:"Migration redirects",id:"migration-redirects"}],raw:`
Tome supports URL redirects at two levels: global config and per-page frontmatter. Redirects return a 301 (permanent) status in development and generate static redirect files for production builds.

## Config-level redirects

Add a \`redirects\` array to \`tome.config.js\`:

\`\`\`js
import { defineConfig } from "@tomehq/core";

export default defineConfig({
  name: "My Docs",
  redirects: [
    { from: "/old-page", to: "/new-page" },
    { from: "/docs/setup", to: "/docs/getting-started" },
    { from: "/api", to: "/docs/reference/api" },
  ],
});
\`\`\`

Each entry needs a \`from\` path (the old URL) and a \`to\` path (the new URL).

## Frontmatter redirects

Add \`redirect_from\` to a page's frontmatter to redirect old URLs to that page:

\`\`\`md
---
title: Getting Started
redirect_from:
  - /docs/setup
  - /docs/installation
  - /quickstart
---

Welcome to the getting started guide.
\`\`\`

Any request to \`/docs/setup\`, \`/docs/installation\`, or \`/quickstart\` will redirect to this page.

## How redirects work

### Development

The dev server intercepts requests and returns a \`301 Moved Permanently\` response for any matched redirect path. Both config-level and frontmatter redirects are active during development.

### Production builds

During \`tome build\`, Tome emits two types of redirect outputs to ensure compatibility across hosting platforms:

1. **\`_redirects\` file** — A Netlify/Vercel-compatible redirects file in the build output root. Each line maps a source path to a destination with a 301 status code.

2. **Meta-refresh HTML files** — For each redirect source path, Tome generates a small HTML file with a \`<meta http-equiv="refresh">\` tag. This ensures redirects work on any static hosting platform, including S3 and GitHub Pages.

## Migration redirects

When migrating from GitBook or Mintlify, the migration tools automatically extract redirects from the source project configuration and add them to your \`tome.config.js\`. See the [Migration guide](/docs/guides/migration) for details.
`};export{e as default};
