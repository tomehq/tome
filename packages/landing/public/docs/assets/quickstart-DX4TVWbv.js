const s={frontmatter:{title:"Quickstart",description:"Get a Tome documentation site running in under a minute.",icon:"zap",hidden:!1,toc:!0,draft:!1,badge:"New"},html:`<p>Get a working documentation site in three commands.</p>
<h2 id="create-a-new-project"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#create-a-new-project"><span class="icon icon-link"></span></a>Create a new project</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> init</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-docs</span></span></code></pre>
<p>This scaffolds a complete documentation project with starter pages, configuration, and build scripts.</p>
<h2 id="install-and-run"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#install-and-run"><span class="icon icon-link"></span></a>Install and run</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">cd</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-docs</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> run</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> dev</span></span></code></pre>
<p>Open <code>http://localhost:3000</code>. You should see your documentation site with a sidebar, search, and starter content.</p>
<h2 id="edit-your-first-page"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#edit-your-first-page"><span class="icon icon-link"></span></a>Edit your first page</h2>
<p>Open <code>pages/index.md</code> in your editor. Change the title and save — the browser reloads automatically.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">My Project</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">description</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Documentation for my project.</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold"># My Project</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">Welcome to the docs.</span></span></code></pre>
<p>Every <code>.md</code> or <code>.mdx</code> file in <code>pages/</code> becomes a page on your site. Subdirectories create nested routes:</p>
<table>
<thead>
<tr>
<th>File</th>
<th>URL</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pages/index.md</code></td>
<td><code>/</code></td>
</tr>
<tr>
<td><code>pages/tutorials/getting-started.md</code></td>
<td><code>/tutorials/getting-started</code></td>
</tr>
<tr>
<td><code>pages/guides/configuration.md</code></td>
<td><code>/guides/configuration</code></td>
</tr>
<tr>
<td><code>pages/reference/cli.md</code></td>
<td><code>/reference/cli</code></td>
</tr>
</tbody>
</table>
<h2 id="add-navigation"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#add-navigation"><span class="icon icon-link"></span></a>Add navigation</h2>
<p>Open <code>tome.config.js</code> to customize your sidebar. The scaffold uses the <a href="https://diataxis.fr/">Diataxis framework</a> by default:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Project"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  navigation: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Overview"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"index"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Tutorials"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"tutorials/getting-started"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"tutorials/deploy"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Guides"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"guides/components"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"guides/configuration"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Reference"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"reference/config"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"reference/components"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"reference/cli"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Concepts"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"concepts/how-tome-works"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"concepts/file-routing"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<h2 id="build-for-production"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#build-for-production"><span class="icon icon-link"></span></a>Build for production</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> run</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> build</span></span></code></pre>
<p>This outputs a static site to <code>out/</code> ready to deploy to any hosting provider — Vercel, Netlify, Cloudflare Pages, or Tome Cloud.</p>
<h2 id="next-steps"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#next-steps"><span class="icon icon-link"></span></a>Next steps</h2>
<ul>
<li><strong><a href="installation">Installation</a></strong> for detailed setup and prerequisites</li>
<li><strong><a href="configuration">Configuration</a></strong> to customize your site</li>
<li><strong><a href="components">Components</a></strong> to use tabs, callouts, and other interactive elements</li>
</ul>`,headings:[{depth:2,text:"Create a new project",id:"create-a-new-project"},{depth:2,text:"Install and run",id:"install-and-run"},{depth:2,text:"Edit your first page",id:"edit-your-first-page"},{depth:2,text:"Add navigation",id:"add-navigation"},{depth:2,text:"Build for production",id:"build-for-production"},{depth:2,text:"Next steps",id:"next-steps"}],raw:`
Get a working documentation site in three commands.

## Create a new project

\`\`\`bash
npx @tomehq/cli init my-docs
\`\`\`

This scaffolds a complete documentation project with starter pages, configuration, and build scripts.

## Install and run

\`\`\`bash
cd my-docs
npm install
npm run dev
\`\`\`

Open \`http://localhost:3000\`. You should see your documentation site with a sidebar, search, and starter content.

## Edit your first page

Open \`pages/index.md\` in your editor. Change the title and save — the browser reloads automatically.

\`\`\`markdown
---
title: My Project
description: Documentation for my project.
---

# My Project

Welcome to the docs.
\`\`\`

Every \`.md\` or \`.mdx\` file in \`pages/\` becomes a page on your site. Subdirectories create nested routes:

| File | URL |
|------|-----|
| \`pages/index.md\` | \`/\` |
| \`pages/tutorials/getting-started.md\` | \`/tutorials/getting-started\` |
| \`pages/guides/configuration.md\` | \`/guides/configuration\` |
| \`pages/reference/cli.md\` | \`/reference/cli\` |

## Add navigation

Open \`tome.config.js\` to customize your sidebar. The scaffold uses the [Diataxis framework](https://diataxis.fr/) by default:

\`\`\`javascript
export default {
  name: "My Project",
  navigation: [
    { group: "Overview", pages: ["index"] },
    { group: "Tutorials", pages: ["tutorials/getting-started", "tutorials/deploy"] },
    { group: "Guides", pages: ["guides/components", "guides/configuration"] },
    { group: "Reference", pages: ["reference/config", "reference/components", "reference/cli"] },
    { group: "Concepts", pages: ["concepts/how-tome-works", "concepts/file-routing"] },
  ],
};
\`\`\`

## Build for production

\`\`\`bash
npm run build
\`\`\`

This outputs a static site to \`out/\` ready to deploy to any hosting provider — Vercel, Netlify, Cloudflare Pages, or Tome Cloud.

## Next steps

- **[Installation](installation)** for detailed setup and prerequisites
- **[Configuration](configuration)** to customize your site
- **[Components](components)** to use tabs, callouts, and other interactive elements
`};export{s as default};
