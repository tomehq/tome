const n={frontmatter:{title:"TypeDoc Generation",description:"Generate API documentation from TypeScript source code using the built-in TypeDoc integration.",icon:"file-code",hidden:!1,toc:!0,draft:!1},html:`<p>Tome includes a built-in TypeDoc integration that generates Markdown API reference pages from your TypeScript source code. It extracts exported functions, interfaces, types, classes, enums, and constants — along with their JSDoc comments — and outputs standard <code>.md</code> files that integrate directly with your docs.</p>
<h2 id="quick-start"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#quick-start"><span class="icon icon-link"></span></a>Quick start</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> typedoc</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --entry</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> src/index.ts</span></span></code></pre>
<p>This generates Markdown files in <code>pages/api/</code> by default, one per exported declaration, plus an <code>index.md</code> with a summary table.</p>
<h2 id="cli-flags"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#cli-flags"><span class="icon icon-link"></span></a>CLI flags</h2>
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
<td><code>--entry</code></td>
<td><em>(required)</em></td>
<td>TypeScript entry point file(s) to document</td>
</tr>
<tr>
<td><code>--out</code></td>
<td><code>pages/api</code></td>
<td>Output directory for generated <code>.md</code> files</td>
</tr>
<tr>
<td><code>--tsconfig</code></td>
<td><code>tsconfig.json</code></td>
<td>Path to your <code>tsconfig.json</code></td>
</tr>
</tbody>
</table>
<p>You can pass multiple entry points:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> typedoc</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --entry</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> src/client.ts</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --entry</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> src/server.ts</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --out</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> pages/api</span></span></code></pre>
<h2 id="what-gets-extracted"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#what-gets-extracted"><span class="icon icon-link"></span></a>What gets extracted</h2>
<p>The generator processes all <code>export</code>ed declarations in your entry point files:</p>
<table>
<thead>
<tr>
<th>Kind</th>
<th>What's documented</th>
</tr>
</thead>
<tbody>
<tr>
<td>Functions</td>
<td>Name, parameters (name, type, optional), return type, JSDoc description</td>
</tr>
<tr>
<td>Interfaces</td>
<td>Name, properties (name, type, optional), JSDoc on each member</td>
</tr>
<tr>
<td>Type aliases</td>
<td>Name, full type signature, object members if applicable</td>
</tr>
<tr>
<td>Classes</td>
<td>Name, properties, methods, JSDoc</td>
</tr>
<tr>
<td>Enums</td>
<td>Name, values, JSDoc on each member</td>
</tr>
<tr>
<td>Constants / variables</td>
<td>Name, type or initializer, JSDoc</td>
</tr>
</tbody>
</table>
<p>Non-exported declarations are skipped.</p>
<h2 id="writing-good-jsdoc"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#writing-good-jsdoc"><span class="icon icon-link"></span></a>Writing good JSDoc</h2>
<p>The generator reads standard JSDoc comments. Use <code>@param</code> for parameter descriptions and <code>@returns</code> for return values:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">/**</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"> * Create a new project with the given configuration.</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"> * </span><span style="color:#D73A49;--shiki-dark:#F97583">@param</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> name</span><span style="color:#6A737D;--shiki-dark:#6A737D"> The project name (must be unique)</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"> * </span><span style="color:#D73A49;--shiki-dark:#F97583">@param</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> options</span><span style="color:#6A737D;--shiki-dark:#6A737D"> Additional project settings</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"> * </span><span style="color:#D73A49;--shiki-dark:#F97583">@returns</span><span style="color:#6A737D;--shiki-dark:#6A737D"> The created project object</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"> */</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> createProject</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">  name</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">  options</span><span style="color:#D73A49;--shiki-dark:#F97583">?:</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ProjectOptions</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">)</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Project</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">  // ...</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>This produces a Markdown page with:</p>
<ul>
<li>A heading showing the full function signature</li>
<li>The description paragraph</li>
<li>A parameters table with name, type, required/optional, and description columns</li>
<li>A return type section</li>
</ul>
<h2 id="generated-output"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#generated-output"><span class="icon icon-link"></span></a>Generated output</h2>
<p>For each exported declaration, the generator creates a file named <code>&lt;lowercase-name&gt;.md</code>. For example, exporting <code>createProject</code> and <code>ProjectOptions</code> produces:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>pages/api/</span></span>
<span class="line"><span>├── index.md           # Summary table linking to each page</span></span>
<span class="line"><span>├── createproject.md   # Function documentation</span></span>
<span class="line"><span>└── projectoptions.md  # Interface documentation</span></span></code></pre>
<p>The index page groups declarations by kind (Functions, Interfaces, Types, etc.) with links to each detail page.</p>
<h2 id="adding-to-navigation"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#adding-to-navigation"><span class="icon icon-link"></span></a>Adding to navigation</h2>
<p>The generated pages are standard Markdown files. Add them to your navigation like any other pages:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">// tome.config.js</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  navigation: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Guides"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"quickstart"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"configuration"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"API Reference"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"api/index"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"api/createproject"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"api/projectoptions"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<h2 id="regenerating-docs"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#regenerating-docs"><span class="icon icon-link"></span></a>Regenerating docs</h2>
<p>Run the <code>typedoc</code> command whenever your TypeScript API changes. The output files are regular <code>.md</code> files checked into your repo — they don't regenerate automatically during <code>tome build</code>.</p>
<p>A typical workflow:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"># Regenerate API docs, then rebuild the site</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> typedoc</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> --entry</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> src/index.ts</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> build</span></span></code></pre>
<p>You can add this to a CI step or a <code>package.json</code> script:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">  "scripts"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">    "docs:api"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"tome typedoc --entry src/index.ts"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">    "docs:build"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"npm run docs:api &amp;&amp; tome build"</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`,headings:[{depth:2,text:"Quick start",id:"quick-start"},{depth:2,text:"CLI flags",id:"cli-flags"},{depth:2,text:"What gets extracted",id:"what-gets-extracted"},{depth:2,text:"Writing good JSDoc",id:"writing-good-jsdoc"},{depth:2,text:"Generated output",id:"generated-output"},{depth:2,text:"Adding to navigation",id:"adding-to-navigation"},{depth:2,text:"Regenerating docs",id:"regenerating-docs"}],raw:`
Tome includes a built-in TypeDoc integration that generates Markdown API reference pages from your TypeScript source code. It extracts exported functions, interfaces, types, classes, enums, and constants — along with their JSDoc comments — and outputs standard \`.md\` files that integrate directly with your docs.

## Quick start

\`\`\`bash
npx @tomehq/cli typedoc --entry src/index.ts
\`\`\`

This generates Markdown files in \`pages/api/\` by default, one per exported declaration, plus an \`index.md\` with a summary table.

## CLI flags

| Flag | Default | Description |
|------|---------|-------------|
| \`--entry\` | *(required)* | TypeScript entry point file(s) to document |
| \`--out\` | \`pages/api\` | Output directory for generated \`.md\` files |
| \`--tsconfig\` | \`tsconfig.json\` | Path to your \`tsconfig.json\` |

You can pass multiple entry points:

\`\`\`bash
npx @tomehq/cli typedoc --entry src/client.ts --entry src/server.ts --out pages/api
\`\`\`

## What gets extracted

The generator processes all \`export\`ed declarations in your entry point files:

| Kind | What's documented |
|------|-------------------|
| Functions | Name, parameters (name, type, optional), return type, JSDoc description |
| Interfaces | Name, properties (name, type, optional), JSDoc on each member |
| Type aliases | Name, full type signature, object members if applicable |
| Classes | Name, properties, methods, JSDoc |
| Enums | Name, values, JSDoc on each member |
| Constants / variables | Name, type or initializer, JSDoc |

Non-exported declarations are skipped.

## Writing good JSDoc

The generator reads standard JSDoc comments. Use \`@param\` for parameter descriptions and \`@returns\` for return values:

\`\`\`typescript
/**
 * Create a new project with the given configuration.
 * @param name The project name (must be unique)
 * @param options Additional project settings
 * @returns The created project object
 */
export function createProject(
  name: string,
  options?: ProjectOptions
): Project {
  // ...
}
\`\`\`

This produces a Markdown page with:

- A heading showing the full function signature
- The description paragraph
- A parameters table with name, type, required/optional, and description columns
- A return type section

## Generated output

For each exported declaration, the generator creates a file named \`<lowercase-name>.md\`. For example, exporting \`createProject\` and \`ProjectOptions\` produces:

\`\`\`text
pages/api/
├── index.md           # Summary table linking to each page
├── createproject.md   # Function documentation
└── projectoptions.md  # Interface documentation
\`\`\`

The index page groups declarations by kind (Functions, Interfaces, Types, etc.) with links to each detail page.

## Adding to navigation

The generated pages are standard Markdown files. Add them to your navigation like any other pages:

\`\`\`javascript
// tome.config.js
export default {
  name: "My Docs",
  navigation: [
    { group: "Guides", pages: ["quickstart", "configuration"] },
    {
      group: "API Reference",
      pages: ["api/index", "api/createproject", "api/projectoptions"],
    },
  ],
};
\`\`\`

## Regenerating docs

Run the \`typedoc\` command whenever your TypeScript API changes. The output files are regular \`.md\` files checked into your repo — they don't regenerate automatically during \`tome build\`.

A typical workflow:

\`\`\`bash
# Regenerate API docs, then rebuild the site
npx @tomehq/cli typedoc --entry src/index.ts
npx @tomehq/cli build
\`\`\`

You can add this to a CI step or a \`package.json\` script:

\`\`\`json
{
  "scripts": {
    "docs:api": "tome typedoc --entry src/index.ts",
    "docs:build": "npm run docs:api && tome build"
  }
}
\`\`\`
`};export{n as default};
