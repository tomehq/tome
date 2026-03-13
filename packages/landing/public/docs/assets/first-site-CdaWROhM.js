const s={frontmatter:{title:"Create Your First Site",description:"A step-by-step tutorial that walks you through creating a documentation site with Tome, from installation to running the dev server.",icon:"rocket",hidden:!1,toc:!0},html:`<p>This tutorial walks you through creating a Tome documentation site from scratch. By the end, you'll have a working docs site running locally with custom pages and navigation.</p>
<h2 id="prerequisites"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#prerequisites"><span class="icon icon-link"></span></a>Prerequisites</h2>
<p>You need <strong>Node.js 18+</strong> and a package manager (<code>npm</code>, <code>yarn</code>, or <code>pnpm</code>).</p>
<h2 id="1-scaffold-the-project"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#1-scaffold-the-project"><span class="icon icon-link"></span></a>1. Scaffold the project</h2>
<p>Run the init command to create a new project:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> init</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-docs</span></span></code></pre>
<p>This creates a directory with the following structure:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>my-docs/</span></span>
<span class="line"><span>├── tome.config.js     # Site configuration</span></span>
<span class="line"><span>├── package.json       # Dependencies and scripts</span></span>
<span class="line"><span>├── index.html         # Vite entry point</span></span>
<span class="line"><span>├── .tome/entry.tsx    # Theme bootstrap (don't edit)</span></span>
<span class="line"><span>├── pages/             # Your documentation pages</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   ├── quickstart.md</span></span>
<span class="line"><span>│   └── components.mdx</span></span>
<span class="line"><span>├── public/            # Static assets</span></span>
<span class="line"><span>└── styles/            # Custom CSS (optional)</span></span></code></pre>
<h2 id="2-install-dependencies"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#2-install-dependencies"><span class="icon icon-link"></span></a>2. Install dependencies</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">cd</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-docs</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span></span></code></pre>
<h2 id="3-start-the-dev-server"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#3-start-the-dev-server"><span class="icon icon-link"></span></a>3. Start the dev server</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> run</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> dev</span></span></code></pre>
<p>Open <code>http://localhost:3000</code>. You should see the starter documentation site. Every time you save a file, the page reloads automatically.</p>
<h2 id="4-add-a-new-page"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#4-add-a-new-page"><span class="icon icon-link"></span></a>4. Add a new page</h2>
<p>Create <code>pages/guides/deployment.md</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Deployment Guide</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">description</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">How to deploy your Tome site to production.</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold"># Deployment Guide</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">Run </span><span style="color:#005CC5;--shiki-dark:#79B8FF">\`npm run build\`</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> to produce static files in the </span><span style="color:#005CC5;--shiki-dark:#79B8FF">\`out/\`</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> directory.</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">Upload this directory to any static hosting provider.</span></span></code></pre>
<p>The page is immediately available at <code>/guides/deployment</code> in the dev server.</p>
<h2 id="5-configure-navigation"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#5-configure-navigation"><span class="icon icon-link"></span></a>5. Configure navigation</h2>
<p>Open <code>tome.config.js</code> and add your new page to the sidebar:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"my-docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  theme: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    preset: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"amber"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    mode: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"auto"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  navigation: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Getting Started"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"index"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"quickstart"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Guides"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"guides/deployment"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Reference"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"components"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<p>The sidebar updates to reflect the new structure.</p>
<h2 id="6-customize-the-theme"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#6-customize-the-theme"><span class="icon icon-link"></span></a>6. Customize the theme</h2>
<p>Change the preset to <code>editorial</code> and set a custom accent color:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"editorial"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  accent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"#ff6b4a"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  mode</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"auto"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">},</span></span></code></pre>
<p>The entire site switches to the editorial aesthetic with your accent color.</p>
<h2 id="7-build-for-production"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#7-build-for-production"><span class="icon icon-link"></span></a>7. Build for production</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> run</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> build</span></span></code></pre>
<p>This outputs a static site to <code>out/</code> with a pre-built search index. The output is ready to deploy to any hosting provider.</p>
<h2 id="next-steps"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#next-steps"><span class="icon icon-link"></span></a>Next steps</h2>
<ul>
<li><strong><a href="/docs/tutorials/deploy-to-cloud">Deploy to Tome Cloud</a></strong> to publish with a single command</li>
<li><strong><a href="/docs/guides/configuration">Configuration guide</a></strong> for all available options</li>
<li><strong><a href="/docs/reference/components">Components reference</a></strong> for the full list of MDX components</li>
</ul>`,headings:[{depth:2,text:"Prerequisites",id:"prerequisites"},{depth:2,text:"1. Scaffold the project",id:"1-scaffold-the-project"},{depth:2,text:"2. Install dependencies",id:"2-install-dependencies"},{depth:2,text:"3. Start the dev server",id:"3-start-the-dev-server"},{depth:2,text:"4. Add a new page",id:"4-add-a-new-page"},{depth:2,text:"5. Configure navigation",id:"5-configure-navigation"},{depth:2,text:"6. Customize the theme",id:"6-customize-the-theme"},{depth:2,text:"7. Build for production",id:"7-build-for-production"},{depth:2,text:"Next steps",id:"next-steps"}],raw:`
This tutorial walks you through creating a Tome documentation site from scratch. By the end, you'll have a working docs site running locally with custom pages and navigation.

## Prerequisites

You need **Node.js 18+** and a package manager (\`npm\`, \`yarn\`, or \`pnpm\`).

## 1. Scaffold the project

Run the init command to create a new project:

\`\`\`bash
npx @tomehq/cli init my-docs
\`\`\`

This creates a directory with the following structure:

\`\`\`text
my-docs/
├── tome.config.js     # Site configuration
├── package.json       # Dependencies and scripts
├── index.html         # Vite entry point
├── .tome/entry.tsx    # Theme bootstrap (don't edit)
├── pages/             # Your documentation pages
│   ├── index.md
│   ├── quickstart.md
│   └── components.mdx
├── public/            # Static assets
└── styles/            # Custom CSS (optional)
\`\`\`

## 2. Install dependencies

\`\`\`bash
cd my-docs
npm install
\`\`\`

## 3. Start the dev server

\`\`\`bash
npm run dev
\`\`\`

Open \`http://localhost:3000\`. You should see the starter documentation site. Every time you save a file, the page reloads automatically.

## 4. Add a new page

Create \`pages/guides/deployment.md\`:

\`\`\`markdown
---
title: Deployment Guide
description: How to deploy your Tome site to production.
---

# Deployment Guide

Run \`npm run build\` to produce static files in the \`out/\` directory.
Upload this directory to any static hosting provider.
\`\`\`

The page is immediately available at \`/guides/deployment\` in the dev server.

## 5. Configure navigation

Open \`tome.config.js\` and add your new page to the sidebar:

\`\`\`javascript
export default {
  name: "my-docs",
  theme: {
    preset: "amber",
    mode: "auto",
  },
  navigation: [
    {
      group: "Getting Started",
      pages: ["index", "quickstart"],
    },
    {
      group: "Guides",
      pages: ["guides/deployment"],
    },
    {
      group: "Reference",
      pages: ["components"],
    },
  ],
};
\`\`\`

The sidebar updates to reflect the new structure.

## 6. Customize the theme

Change the preset to \`editorial\` and set a custom accent color:

\`\`\`javascript
theme: {
  preset: "editorial",
  accent: "#ff6b4a",
  mode: "auto",
},
\`\`\`

The entire site switches to the editorial aesthetic with your accent color.

## 7. Build for production

\`\`\`bash
npm run build
\`\`\`

This outputs a static site to \`out/\` with a pre-built search index. The output is ready to deploy to any hosting provider.

## Next steps

- **[Deploy to Tome Cloud](/docs/tutorials/deploy-to-cloud)** to publish with a single command
- **[Configuration guide](/docs/guides/configuration)** for all available options
- **[Components reference](/docs/reference/components)** for the full list of MDX components
`};export{s as default};
