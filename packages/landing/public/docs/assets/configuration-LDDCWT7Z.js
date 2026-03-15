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
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  { label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"GitHub"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, href: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://github.com/example/docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span></code></pre>
<h2 id="theme"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#theme"><span class="icon icon-link"></span></a>Theme</h2>
<p>See the <a href="/docs/guides/custom-theme">Custom theme guide</a> for full details.</p>
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
<h2 id="base-path"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#base-path"><span class="icon icon-link"></span></a>Base path</h2>
<p>If your docs are served under a subpath (e.g., <code>example.com/docs/</code>), set <code>basePath</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">basePath</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/docs/"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span></code></pre>
<p>This configures Vite's <code>base</code> option so all asset paths resolve correctly.</p>
<h2 id="banner"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#banner"><span class="icon icon-link"></span></a>Banner</h2>
<p>Show an announcement at the top of every page:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">banner</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  text</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"We just launched v2.0!"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  link</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"/changelog"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,       </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Optional — wraps text in a link</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  dismissible</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,        </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Default true — shows close button</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">},</span></span></code></pre>
<p>The banner uses your accent color as its background. When a user dismisses it, a hash of the text is saved to localStorage. Change the text to show the banner again for all users.</p>
<h2 id="math--katex"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#math--katex"><span class="icon icon-link"></span></a>Math / KaTeX</h2>
<p>Enable LaTeX math rendering with:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">math</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span></code></pre>
<p>Then install the peer dependencies:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> remark-math</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> rehype-katex</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> katex</span></span></code></pre>
<p>Use <code>$...$</code> for inline math and <code>$$...$$</code> for display blocks in your Markdown pages.</p>
<h2 id="mermaid-diagrams"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#mermaid-diagrams"><span class="icon icon-link"></span></a>Mermaid diagrams</h2>
<p>Mermaid diagrams require no configuration. Use a <code>mermaid</code> code fence in any page:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`mermaid</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">flowchart LR</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    A["Input"] --&gt; B["Process"] --&gt; C["Output"]</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`</span></span></code></pre>
<p>Mermaid is loaded from a CDN on demand — no install needed. Diagrams adapt to your light/dark theme automatically.</p>
<h2 id="ai-discoverability-llmstxt"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#ai-discoverability-llmstxt"><span class="icon icon-link"></span></a>AI discoverability (llms.txt)</h2>
<p>At build time, Tome automatically generates:</p>
<ul>
<li><strong><code>llms.txt</code></strong> — Page index with titles, descriptions, and URLs</li>
<li><strong><code>llms-full.txt</code></strong> — Complete Markdown content of every non-hidden page</li>
</ul>
<p>No configuration needed. Hidden pages (frontmatter <code>hidden: true</code>) are excluded. These files help AI assistants and language models understand your documentation.</p>
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
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    { label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"GitHub"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, href: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://github.com/acme/docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  search: { provider: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"local"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<p>See the <a href="/docs/reference/config">Config reference</a> for every available field.</p>`,headings:[{depth:2,text:"Minimal config",id:"minimal-config"},{depth:2,text:"Site metadata",id:"site-metadata"},{depth:2,text:"Navigation",id:"navigation"},{depth:3,text:"Nested groups",id:"nested-groups"},{depth:2,text:"Top navigation",id:"top-navigation"},{depth:2,text:"Theme",id:"theme"},{depth:2,text:"Base path",id:"base-path"},{depth:2,text:"Banner",id:"banner"},{depth:2,text:"Math / KaTeX",id:"math--katex"},{depth:2,text:"Mermaid diagrams",id:"mermaid-diagrams"},{depth:2,text:"AI discoverability (llms.txt)",id:"ai-discoverability-llmstxt"},{depth:2,text:"Full example",id:"full-example"}],raw:`
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
  { label: "GitHub", href: "https://github.com/example/docs" },
],
\`\`\`

## Theme

See the [Custom theme guide](/docs/guides/custom-theme) for full details.

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

## Base path

If your docs are served under a subpath (e.g., \`example.com/docs/\`), set \`basePath\`:

\`\`\`javascript
basePath: "/docs/",
\`\`\`

This configures Vite's \`base\` option so all asset paths resolve correctly.

## Banner

Show an announcement at the top of every page:

\`\`\`javascript
banner: {
  text: "We just launched v2.0!",
  link: "/changelog",       // Optional — wraps text in a link
  dismissible: true,        // Default true — shows close button
},
\`\`\`

The banner uses your accent color as its background. When a user dismisses it, a hash of the text is saved to localStorage. Change the text to show the banner again for all users.

## Math / KaTeX

Enable LaTeX math rendering with:

\`\`\`javascript
math: true,
\`\`\`

Then install the peer dependencies:

\`\`\`bash
npm install remark-math rehype-katex katex
\`\`\`

Use \`$...$\` for inline math and \`$$...$$\` for display blocks in your Markdown pages.

## Mermaid diagrams

Mermaid diagrams require no configuration. Use a \`mermaid\` code fence in any page:

\`\`\`\`markdown
\`\`\`mermaid
flowchart LR
    A["Input"] --> B["Process"] --> C["Output"]
\`\`\`
\`\`\`\`

Mermaid is loaded from a CDN on demand — no install needed. Diagrams adapt to your light/dark theme automatically.

## AI discoverability (llms.txt)

At build time, Tome automatically generates:

- **\`llms.txt\`** — Page index with titles, descriptions, and URLs
- **\`llms-full.txt\`** — Complete Markdown content of every non-hidden page

No configuration needed. Hidden pages (frontmatter \`hidden: true\`) are excluded. These files help AI assistants and language models understand your documentation.

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
    { label: "GitHub", href: "https://github.com/acme/docs" },
  ],
  search: { provider: "local" },
};
\`\`\`

See the [Config reference](/docs/reference/config) for every available field.
`};export{s as default};
