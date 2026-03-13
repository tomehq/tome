const s={frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1,toc:!0},html:`<p>Tome requires Node.js and works with npm, pnpm, or yarn.</p>
<h2 id="prerequisites"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#prerequisites"><span class="icon icon-link"></span></a>Prerequisites</h2>
<table>
<thead>
<tr>
<th>Requirement</th>
<th>Minimum</th>
</tr>
</thead>
<tbody>
<tr>
<td>Node.js</td>
<td>18.0 or higher</td>
</tr>
<tr>
<td>Package manager</td>
<td>npm, pnpm, or yarn</td>
</tr>
</tbody>
</table>
<h2 id="create-a-new-project"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#create-a-new-project"><span class="icon icon-link"></span></a>Create a new project</h2>
<p>The fastest way to start is with the CLI:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> init</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-docs</span></span></code></pre>
<p>This creates a new directory with everything you need:</p>
<pre><code>my-docs/
├── pages/
│   ├── index.md
│   ├── quickstart.md
│   └── components.mdx
├── .tome/
│   └── entry.tsx
├── tome.config.js
├── index.html
├── package.json
└── .gitignore
</code></pre>
<h2 id="install-dependencies"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#install-dependencies"><span class="icon icon-link"></span></a>Install dependencies</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">cd</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-docs</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span></span></code></pre>
<p>Or with pnpm / yarn:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">pnpm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"># or</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">yarn</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span></span></code></pre>
<h2 id="start-the-dev-server"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#start-the-dev-server"><span class="icon icon-link"></span></a>Start the dev server</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> run</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> dev</span></span></code></pre>
<p>The dev server starts at <code>http://localhost:3000</code> with hot reload enabled. Changes to any <code>.md</code> or <code>.mdx</code> file in <code>pages/</code> trigger an instant refresh. Config changes in <code>tome.config.js</code> trigger a full reload.</p>
<h2 id="add-to-an-existing-project"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#add-to-an-existing-project"><span class="icon icon-link"></span></a>Add to an existing project</h2>
<p>If you already have a project and want to add Tome documentation:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/theme</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> react</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> react-dom</span></span></code></pre>
<p>Create the required files:</p>
<p><strong><code>tome.config.js</code></strong></p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Project Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  navigation: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"index"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<p><strong><code>pages/index.md</code></strong></p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Introduction</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold"># Welcome</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">Your documentation starts here.</span></span></code></pre>
<p><strong><code>index.html</code></strong></p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">html lang="en"&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">head&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">  &amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">meta charset="UTF-8" /&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">  &amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">  &amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">title&gt;Docs</span><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">/title&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">/head&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">body&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">  &amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">div id="tome-root"&gt;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">/div&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">  &amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">script type="module" src=".tome/entry.tsx"&gt;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">/script&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">/body&gt;</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">&amp;#x3C;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">/html&gt;</span></span></code></pre>
<p><strong><code>.tome/entry.tsx</code></strong></p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@tomehq/theme/entry"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre>
<p>Add scripts to <code>package.json</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">  "scripts"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">    "dev"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"tome dev"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">    "build"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"tome build"</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h2 id="next-steps"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#next-steps"><span class="icon icon-link"></span></a>Next steps</h2>
<ul>
<li><strong><a href="#project-structure">Project Structure</a></strong> to understand how files are organized</li>
<li><strong><a href="#configuration">Configuration</a></strong> to customize your site</li>
</ul>`,headings:[{depth:2,text:"Prerequisites",id:"prerequisites"},{depth:2,text:"Create a new project",id:"create-a-new-project"},{depth:2,text:"Install dependencies",id:"install-dependencies"},{depth:2,text:"Start the dev server",id:"start-the-dev-server"},{depth:2,text:"Add to an existing project",id:"add-to-an-existing-project"},{depth:2,text:"Next steps",id:"next-steps"}],raw:`
Tome requires Node.js and works with npm, pnpm, or yarn.

## Prerequisites

| Requirement | Minimum |
|-------------|---------|
| Node.js | 18.0 or higher |
| Package manager | npm, pnpm, or yarn |

## Create a new project

The fastest way to start is with the CLI:

\`\`\`bash
npx @tomehq/cli init my-docs
\`\`\`

This creates a new directory with everything you need:

\`\`\`
my-docs/
├── pages/
│   ├── index.md
│   ├── quickstart.md
│   └── components.mdx
├── .tome/
│   └── entry.tsx
├── tome.config.js
├── index.html
├── package.json
└── .gitignore
\`\`\`

## Install dependencies

\`\`\`bash
cd my-docs
npm install
\`\`\`

Or with pnpm / yarn:

\`\`\`bash
pnpm install
# or
yarn install
\`\`\`

## Start the dev server

\`\`\`bash
npm run dev
\`\`\`

The dev server starts at \`http://localhost:3000\` with hot reload enabled. Changes to any \`.md\` or \`.mdx\` file in \`pages/\` trigger an instant refresh. Config changes in \`tome.config.js\` trigger a full reload.

## Add to an existing project

If you already have a project and want to add Tome documentation:

\`\`\`bash
npm install @tomehq/cli @tomehq/theme react react-dom
\`\`\`

Create the required files:

**\`tome.config.js\`**
\`\`\`javascript
export default {
  name: "My Project Docs",
  navigation: [
    { group: "Docs", pages: ["index"] },
  ],
};
\`\`\`

**\`pages/index.md\`**
\`\`\`markdown
---
title: Introduction
---

# Welcome

Your documentation starts here.
\`\`\`

**\`index.html\`**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Docs</title>
</head>
<body>
  <div id="tome-root"></div>
  <script type="module" src=".tome/entry.tsx"><\/script>
</body>
</html>
\`\`\`

**\`.tome/entry.tsx\`**
\`\`\`tsx
import "@tomehq/theme/entry";
\`\`\`

Add scripts to \`package.json\`:

\`\`\`json
{
  "scripts": {
    "dev": "tome dev",
    "build": "tome build"
  }
}
\`\`\`

## Next steps

- **[Project Structure](#project-structure)** to understand how files are organized
- **[Configuration](#configuration)** to customize your site
`};export{s as default};
