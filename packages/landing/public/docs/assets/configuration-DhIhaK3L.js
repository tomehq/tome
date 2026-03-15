const s={frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1,toc:!0,draft:!1},html:`<p>All site configuration lives in <code>tome.config.js</code> (or <code>.mjs</code> / <code>.ts</code>) at your project root. Tome validates the config with Zod and provides clear error messages if anything is wrong.</p>
<h2 id="minimal-config"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#minimal-config"><span class="icon icon-link"></span></a>Minimal config</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<p>This is all you need. Tome uses sensible defaults for everything else.</p>
<h2 id="site-metadata"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#site-metadata"><span class="icon icon-link"></span></a>Site metadata</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  logo: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/logo.svg"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,        </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Path relative to public/</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  favicon: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/favicon.ico"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Path relative to public/</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  baseUrl: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://docs.example.com"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<p><code>baseUrl</code> is used for generating canonical URLs and analytics endpoints. It should be the full URL where your site is hosted.</p>
<h2 id="navigation"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#navigation"><span class="icon icon-link"></span></a>Navigation</h2>
<p>The <code>navigation</code> array defines your sidebar structure. Each group has a label and a list of page IDs (filenames without extensions):</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">navigation</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Getting Started"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"index"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"quickstart"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"API"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"api/authentication"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"api/endpoints"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"api/errors"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span></code></pre>
<p>Pages not listed in navigation still exist at their URL — they're just hidden from the sidebar.</p>
<h3 id="nested-groups"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#nested-groups"><span class="icon icon-link"></span></a>Nested groups</h3>
<p>Groups can be nested for complex documentation structures:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">navigation</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"SDK"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    pages: [</span></span>
<span class="line"><span style="color:#032F62;--shiki-dark:#9ECBFF">      "sdk/overview"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">        group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Languages"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">        pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"sdk/javascript"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"sdk/python"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"sdk/go"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span></code></pre>
<h2 id="top-navigation"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#top-navigation"><span class="icon icon-link"></span></a>Top navigation</h2>
<p>Add links to the header bar:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">topNav</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  { label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Blog"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, href: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://blog.example.com"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  { label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Changelog"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, href: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/changelog"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span></code></pre>
<h2 id="theme"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#theme"><span class="icon icon-link"></span></a>Theme</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"editorial"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,   </span><span style="color:#6A737D;--shiki-dark:#6A737D">// "amber" or "editorial"</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  accent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"#ff6b4a"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,     </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Custom accent color (hex)</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  mode</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"auto"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,          </span><span style="color:#6A737D;--shiki-dark:#6A737D">// "light", "dark", or "auto"</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  fonts</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    heading</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Playfair Display"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    body</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Source Sans Pro"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    code</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Fira Code"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">},</span></span></code></pre>
<p>See <strong><a href="#theming">Theming</a></strong> for full customization details.</p>
<h2 id="base-path"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#base-path"><span class="icon icon-link"></span></a>Base path</h2>
<p>If your docs are served under a subpath (e.g., <code>example.com/docs/</code>), set <code>basePath</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">basePath</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/docs/"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span></code></pre>
<p>This configures Vite's <code>base</code> option so all asset paths resolve correctly.</p>
<h2 id="search"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#search"><span class="icon icon-link"></span></a>Search</h2>
<p>Pagefind is enabled by default with no configuration. To use Algolia DocSearch instead:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">search</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  provider</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"algolia"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  appId</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"YOUR_APP_ID"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  apiKey</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"YOUR_SEARCH_KEY"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  indexName</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"your-index"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">},</span></span></code></pre>
<h2 id="banner"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#banner"><span class="icon icon-link"></span></a>Banner</h2>
<p>Display an announcement banner at the top of every page:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">banner</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  text</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"v2.0 is now available!"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  link</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/changelog"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,         </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Optional — makes the text a link</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  dismissible</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,          </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Default: true — shows a close button</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">},</span></span></code></pre>
<p>When a user dismisses the banner, it stays hidden until you change the text. Updating the <code>text</code> value automatically shows the banner again for all users.</p>
<h2 id="math-rendering"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#math-rendering"><span class="icon icon-link"></span></a>Math rendering</h2>
<p>Use <code>\`\`\`math</code> fenced code blocks for display math in both <code>.md</code> and <code>.mdx</code> files:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`math</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">E = mc^2</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`</span></span></code></pre>
<p>Math is rendered client-side with KaTeX loaded from CDN — no dependencies to install, no config flag needed. Just write the code block and it works.</p>
<p>For <code>.md</code> files, you can also enable inline math with <code>$E = mc^2$</code> and display math with <code>$$</code> blocks by setting:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">math</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span></code></pre>
<h2 id="mermaid-diagrams"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#mermaid-diagrams"><span class="icon icon-link"></span></a>Mermaid diagrams</h2>
<p>Mermaid diagrams work out of the box with no configuration. Use a <code>mermaid</code> code fence in any <code>.md</code> or <code>.mdx</code> file:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`mermaid</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">flowchart LR</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    A["Start"] --&gt; B["Process"]</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    B --&gt; C["End"]</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`</span></span></code></pre>
<p>Diagrams are rendered client-side and automatically adapt to your site's light/dark theme. Colors, labels, and borders adjust for both light and dark mode with proper contrast.</p>
<h2 id="agent-friendly-output"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#agent-friendly-output"><span class="icon icon-link"></span></a>Agent-friendly output</h2>
<p>Tome automatically generates six machine-readable files at build time — no configuration needed:</p>
<table>
<thead>
<tr>
<th>File</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>llms.txt</code></td>
<td>Page index with titles, descriptions, and URLs</td>
</tr>
<tr>
<td><code>llms-full.txt</code></td>
<td>Full raw Markdown content of all non-hidden pages</td>
</tr>
<tr>
<td><code>skill.md</code></td>
<td>Agent capability file — site structure, available resources, and usage instructions</td>
</tr>
<tr>
<td><code>robots.txt</code></td>
<td>Crawler directives — explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)</td>
</tr>
<tr>
<td><code>search.json</code></td>
<td>Structured page index with titles, headings, tags, and word counts</td>
</tr>
<tr>
<td><code>mcp.json</code></td>
<td>MCP manifest with page metadata, headings, and optional content</td>
</tr>
</tbody>
</table>
<p>Every HTML page also gets <strong>JSON-LD schema markup</strong> injected into the <code>&lt;head&gt;</code>:</p>
<ul>
<li><code>WebSite</code> schema on the homepage (with <code>SearchAction</code>)</li>
<li><code>TechArticle</code> schema on each documentation page</li>
</ul>
<p>Hidden pages (with <code>hidden: true</code> in frontmatter) are excluded from all generated files.</p>
<h2 id="full-example"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#full-example"><span class="icon icon-link"></span></a>Full example</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Acme Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  logo: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/acme-logo.svg"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  favicon: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/favicon.ico"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  baseUrl: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://docs.acme.com"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  theme: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    preset: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"editorial"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    accent: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"#2563eb"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    mode: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"auto"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  navigation: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Overview"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"index"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"quickstart"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Guides"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"guides/auth"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"guides/deploy"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { group: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"API"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, pages: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"api/rest"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"api/webhooks"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  topNav: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Changelog"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, href: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/changelog"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  search: { provider: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"local"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  banner: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    text: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"v2.0 is now available!"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    link: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/changelog"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    dismissible: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  math: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>`,headings:[{depth:2,text:"Minimal config",id:"minimal-config"},{depth:2,text:"Site metadata",id:"site-metadata"},{depth:2,text:"Navigation",id:"navigation"},{depth:3,text:"Nested groups",id:"nested-groups"},{depth:2,text:"Top navigation",id:"top-navigation"},{depth:2,text:"Theme",id:"theme"},{depth:2,text:"Base path",id:"base-path"},{depth:2,text:"Search",id:"search"},{depth:2,text:"Banner",id:"banner"},{depth:2,text:"Math rendering",id:"math-rendering"},{depth:2,text:"Mermaid diagrams",id:"mermaid-diagrams"},{depth:2,text:"Agent-friendly output",id:"agent-friendly-output"},{depth:2,text:"Full example",id:"full-example"}],raw:`
All site configuration lives in \`tome.config.js\` (or \`.mjs\` / \`.ts\`) at your project root. Tome validates the config with Zod and provides clear error messages if anything is wrong.

## Minimal config

\`\`\`javascript
export default {
  name: "My Docs",
};
\`\`\`

This is all you need. Tome uses sensible defaults for everything else.

## Site metadata

\`\`\`javascript
export default {
  name: "My Docs",
  logo: "/logo.svg",        // Path relative to public/
  favicon: "/favicon.ico",  // Path relative to public/
  baseUrl: "https://docs.example.com",
};
\`\`\`

\`baseUrl\` is used for generating canonical URLs and analytics endpoints. It should be the full URL where your site is hosted.

## Navigation

The \`navigation\` array defines your sidebar structure. Each group has a label and a list of page IDs (filenames without extensions):

\`\`\`javascript
navigation: [
  {
    group: "Getting Started",
    pages: ["index", "quickstart"],
  },
  {
    group: "API",
    pages: ["api/authentication", "api/endpoints", "api/errors"],
  },
],
\`\`\`

Pages not listed in navigation still exist at their URL — they're just hidden from the sidebar.

### Nested groups

Groups can be nested for complex documentation structures:

\`\`\`javascript
navigation: [
  {
    group: "SDK",
    pages: [
      "sdk/overview",
      {
        group: "Languages",
        pages: ["sdk/javascript", "sdk/python", "sdk/go"],
      },
    ],
  },
],
\`\`\`

## Top navigation

Add links to the header bar:

\`\`\`javascript
topNav: [
  { label: "Blog", href: "https://blog.example.com" },
  { label: "Changelog", href: "/changelog" },
],
\`\`\`

## Theme

\`\`\`javascript
theme: {
  preset: "editorial",   // "amber" or "editorial"
  accent: "#ff6b4a",     // Custom accent color (hex)
  mode: "auto",          // "light", "dark", or "auto"
  fonts: {
    heading: "Playfair Display",
    body: "Source Sans Pro",
    code: "Fira Code",
  },
},
\`\`\`

See **[Theming](#theming)** for full customization details.

## Base path

If your docs are served under a subpath (e.g., \`example.com/docs/\`), set \`basePath\`:

\`\`\`javascript
basePath: "/docs/",
\`\`\`

This configures Vite's \`base\` option so all asset paths resolve correctly.

## Search

Pagefind is enabled by default with no configuration. To use Algolia DocSearch instead:

\`\`\`javascript
search: {
  provider: "algolia",
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_SEARCH_KEY",
  indexName: "your-index",
},
\`\`\`

## Banner

Display an announcement banner at the top of every page:

\`\`\`javascript
banner: {
  text: "v2.0 is now available!",
  link: "/changelog",         // Optional — makes the text a link
  dismissible: true,          // Default: true — shows a close button
},
\`\`\`

When a user dismisses the banner, it stays hidden until you change the text. Updating the \`text\` value automatically shows the banner again for all users.

## Math rendering

Use \` \`\`\`math \` fenced code blocks for display math in both \`.md\` and \`.mdx\` files:

\`\`\`\`markdown
\`\`\`math
E = mc^2
\`\`\`
\`\`\`\`

Math is rendered client-side with KaTeX loaded from CDN — no dependencies to install, no config flag needed. Just write the code block and it works.

For \`.md\` files, you can also enable inline math with \`$E = mc^2$\` and display math with \`$$\` blocks by setting:

\`\`\`javascript
math: true,
\`\`\`

## Mermaid diagrams

Mermaid diagrams work out of the box with no configuration. Use a \`mermaid\` code fence in any \`.md\` or \`.mdx\` file:

\`\`\`\`markdown
\`\`\`mermaid
flowchart LR
    A["Start"] --> B["Process"]
    B --> C["End"]
\`\`\`
\`\`\`\`

Diagrams are rendered client-side and automatically adapt to your site's light/dark theme. Colors, labels, and borders adjust for both light and dark mode with proper contrast.

## Agent-friendly output

Tome automatically generates six machine-readable files at build time — no configuration needed:

| File | Description |
|------|-------------|
| \`llms.txt\` | Page index with titles, descriptions, and URLs |
| \`llms-full.txt\` | Full raw Markdown content of all non-hidden pages |
| \`skill.md\` | Agent capability file — site structure, available resources, and usage instructions |
| \`robots.txt\` | Crawler directives — explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) |
| \`search.json\` | Structured page index with titles, headings, tags, and word counts |
| \`mcp.json\` | MCP manifest with page metadata, headings, and optional content |

Every HTML page also gets **JSON-LD schema markup** injected into the \`<head>\`:
- \`WebSite\` schema on the homepage (with \`SearchAction\`)
- \`TechArticle\` schema on each documentation page

Hidden pages (with \`hidden: true\` in frontmatter) are excluded from all generated files.

## Full example

\`\`\`javascript
export default {
  name: "Acme Docs",
  logo: "/acme-logo.svg",
  favicon: "/favicon.ico",
  baseUrl: "https://docs.acme.com",
  theme: {
    preset: "editorial",
    accent: "#2563eb",
    mode: "auto",
  },
  navigation: [
    { group: "Overview", pages: ["index", "quickstart"] },
    { group: "Guides", pages: ["guides/auth", "guides/deploy"] },
    { group: "API", pages: ["api/rest", "api/webhooks"] },
  ],
  topNav: [
    { label: "Changelog", href: "/changelog" },
  ],
  search: { provider: "local" },
  banner: {
    text: "v2.0 is now available!",
    link: "/changelog",
    dismissible: true,
  },
  math: true,
};
\`\`\`
`};export{s as default};
