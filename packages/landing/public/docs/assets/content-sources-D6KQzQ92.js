const s={frontmatter:{title:"Content Sources",description:"Pull documentation content from GitHub repositories or Notion databases alongside your local files.",icon:"cloud-download",hidden:!1,toc:!0,draft:!1},html:`<p>Content sources let you pull documentation from external services — GitHub repos, Notion databases, or custom APIs — and merge them with your local pages at build time. Remote pages are treated exactly like local files: they appear in navigation, search, and the route manifest.</p>
<h2 id="configuration"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#configuration"><span class="icon icon-link"></span></a>Configuration</h2>
<p>Add content sources to the <code>contentSources</code> array in your config:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { githubSource, notionSource } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@tomehq/core"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  contentSources: [</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    githubSource</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      owner: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"acme"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      repo: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"sdk-docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      path: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    }),</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<h2 id="github-source"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#github-source"><span class="icon icon-link"></span></a>GitHub source</h2>
<p>Pull <code>.md</code> and <code>.mdx</code> files from a GitHub repository:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { githubSource } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@tomehq/core"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">githubSource</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  owner: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"acme"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,          </span><span style="color:#6A737D;--shiki-dark:#6A737D">// GitHub org or user</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  repo: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"sdk-docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,       </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Repository name</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  branch: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"main"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,         </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Branch to pull from (default: "main")</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  path: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,           </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Directory within the repo (default: "docs")</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  token: process.env.</span><span style="color:#005CC5;--shiki-dark:#79B8FF">GH_TOKEN</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Optional — required for private repos</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">})</span></span></code></pre>
<p>The source fetches the repo tree via the GitHub API, then downloads each <code>.md</code> / <code>.mdx</code> file from the specified path. File paths within the directory become page IDs — <code>docs/getting-started.md</code> becomes the page ID <code>getting-started</code>.</p>
<h3 id="private-repositories"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#private-repositories"><span class="icon icon-link"></span></a>Private repositories</h3>
<p>For private repos, pass a GitHub personal access token (classic or fine-grained) with <code>contents:read</code> permission:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">githubSource</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  owner: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"acme"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  repo: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"internal-docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  token: process.env.</span><span style="color:#005CC5;--shiki-dark:#79B8FF">GH_TOKEN</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">})</span></span></code></pre>
<h2 id="notion-source"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#notion-source"><span class="icon icon-link"></span></a>Notion source</h2>
<p>Pull pages from a Notion database:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { notionSource } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@tomehq/core"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">notionSource</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  databaseId: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"abc123..."</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,           </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Notion database ID</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  apiKey: process.env.</span><span style="color:#005CC5;--shiki-dark:#79B8FF">NOTION_TOKEN</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Notion integration token</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">})</span></span></code></pre>
<p>Each page in the database is converted to Markdown:</p>
<ul>
<li>The page title becomes the <code>title</code> frontmatter field</li>
<li>Headings, paragraphs, lists, code blocks, quotes, and dividers are converted</li>
<li>Bold, italic, code, and link annotations are preserved</li>
<li>The title is slugified to create the page ID (<code>Getting Started</code> becomes <code>getting-started</code>)</li>
</ul>
<h3 id="setting-up-the-notion-integration"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#setting-up-the-notion-integration"><span class="icon icon-link"></span></a>Setting up the Notion integration</h3>
<ol>
<li>Go to <a href="https://www.notion.so/my-integrations">notion.so/my-integrations</a> and create a new integration</li>
<li>Copy the integration token</li>
<li>Share your database with the integration (click "..." on the database, then "Connections")</li>
</ol>
<h2 id="custom-content-sources"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#custom-content-sources"><span class="icon icon-link"></span></a>Custom content sources</h2>
<p>Use <code>defineContentSource</code> to create your own source with full type checking:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { defineContentSource } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@tomehq/core"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> apiSource</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> defineContentSource</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"my-api"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">  async</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> fetchPages</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">    const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> res</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#D73A49;--shiki-dark:#F97583"> await</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> fetch</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://api.example.com/docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">    const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> data</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#D73A49;--shiki-dark:#F97583"> await</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> res.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">json</span><span style="color:#24292E;--shiki-dark:#E1E4E8">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">    return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> data.pages.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">map</span><span style="color:#24292E;--shiki-dark:#E1E4E8">((</span><span style="color:#E36209;--shiki-dark:#FFAB70">page</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=&gt;</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      id: page.slug,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      content: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">\`---</span><span style="color:#005CC5;--shiki-dark:#79B8FF">\\n</span><span style="color:#032F62;--shiki-dark:#9ECBFF">title: \${</span><span style="color:#24292E;--shiki-dark:#E1E4E8">page</span><span style="color:#032F62;--shiki-dark:#9ECBFF">.</span><span style="color:#24292E;--shiki-dark:#E1E4E8">title</span><span style="color:#032F62;--shiki-dark:#9ECBFF">}</span><span style="color:#005CC5;--shiki-dark:#79B8FF">\\n</span><span style="color:#032F62;--shiki-dark:#9ECBFF">---</span><span style="color:#005CC5;--shiki-dark:#79B8FF">\\n\\n</span><span style="color:#032F62;--shiki-dark:#9ECBFF">\${</span><span style="color:#24292E;--shiki-dark:#E1E4E8">page</span><span style="color:#032F62;--shiki-dark:#9ECBFF">.</span><span style="color:#24292E;--shiki-dark:#E1E4E8">body</span><span style="color:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      format: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"md"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      lastModified: page.updatedAt,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    }));</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">});</span></span></code></pre>
<p>Each page must return:</p>
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
<td><code>id</code></td>
<td><code>string</code></td>
<td>Page identifier (used for URL and navigation)</td>
</tr>
<tr>
<td><code>content</code></td>
<td><code>string</code></td>
<td>Raw Markdown/MDX including frontmatter</td>
</tr>
<tr>
<td><code>format</code></td>
<td><code>"md"</code> or <code>"mdx"</code></td>
<td>File format</td>
</tr>
<tr>
<td><code>lastModified</code></td>
<td><code>string?</code></td>
<td>ISO 8601 date (optional)</td>
</tr>
</tbody>
</table>
<p>Custom sources can also implement an optional <code>watch</code> method for development mode — return a cleanup function to stop watching:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">defineContentSource</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"polling-api"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">  async</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> fetchPages</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() { </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* ... */</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  watch</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#E36209;--shiki-dark:#FFAB70">onChange</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">    const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> interval</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> setInterval</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#D73A49;--shiki-dark:#F97583">async</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> () </span><span style="color:#D73A49;--shiki-dark:#F97583">=&gt;</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">      const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> pages</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#D73A49;--shiki-dark:#F97583"> await</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> this</span><span style="color:#24292E;--shiki-dark:#E1E4E8">.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">fetchPages</span><span style="color:#24292E;--shiki-dark:#E1E4E8">();</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">      onChange</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(pages);</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    }, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">30000</span><span style="color:#24292E;--shiki-dark:#E1E4E8">); </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Poll every 30 seconds</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">    return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> () </span><span style="color:#D73A49;--shiki-dark:#F97583">=&gt;</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> clearInterval</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(interval);</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">});</span></span></code></pre>
<h2 id="using-multiple-sources"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#using-multiple-sources"><span class="icon icon-link"></span></a>Using multiple sources</h2>
<p>You can combine any number of content sources. Remote pages are merged with local files — if a remote page has the same ID as a local page, the local page takes priority.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { githubSource, notionSource } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@tomehq/core"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  contentSources: [</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    githubSource</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({ owner: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"acme"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, repo: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"sdk-docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, path: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> }),</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    notionSource</span><span style="color:#24292E;--shiki-dark:#E1E4E8">({ databaseId: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"abc123"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, apiKey: process.env.</span><span style="color:#005CC5;--shiki-dark:#79B8FF">NOTION_TOKEN</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> }),</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<p>Content is fetched once at build time (and on startup in dev mode). Failed sources log a warning but don't block the build — your local pages will still work.</p>`,headings:[{depth:2,text:"Configuration",id:"configuration"},{depth:2,text:"GitHub source",id:"github-source"},{depth:3,text:"Private repositories",id:"private-repositories"},{depth:2,text:"Notion source",id:"notion-source"},{depth:3,text:"Setting up the Notion integration",id:"setting-up-the-notion-integration"},{depth:2,text:"Custom content sources",id:"custom-content-sources"},{depth:2,text:"Using multiple sources",id:"using-multiple-sources"}],raw:`
Content sources let you pull documentation from external services — GitHub repos, Notion databases, or custom APIs — and merge them with your local pages at build time. Remote pages are treated exactly like local files: they appear in navigation, search, and the route manifest.

## Configuration

Add content sources to the \`contentSources\` array in your config:

\`\`\`javascript
import { githubSource, notionSource } from "@tomehq/core";

export default {
  name: "My Docs",
  contentSources: [
    githubSource({
      owner: "acme",
      repo: "sdk-docs",
      path: "docs",
    }),
  ],
};
\`\`\`

## GitHub source

Pull \`.md\` and \`.mdx\` files from a GitHub repository:

\`\`\`javascript
import { githubSource } from "@tomehq/core";

githubSource({
  owner: "acme",          // GitHub org or user
  repo: "sdk-docs",       // Repository name
  branch: "main",         // Branch to pull from (default: "main")
  path: "docs",           // Directory within the repo (default: "docs")
  token: process.env.GH_TOKEN,  // Optional — required for private repos
})
\`\`\`

The source fetches the repo tree via the GitHub API, then downloads each \`.md\` / \`.mdx\` file from the specified path. File paths within the directory become page IDs — \`docs/getting-started.md\` becomes the page ID \`getting-started\`.

### Private repositories

For private repos, pass a GitHub personal access token (classic or fine-grained) with \`contents:read\` permission:

\`\`\`javascript
githubSource({
  owner: "acme",
  repo: "internal-docs",
  token: process.env.GH_TOKEN,
})
\`\`\`

## Notion source

Pull pages from a Notion database:

\`\`\`javascript
import { notionSource } from "@tomehq/core";

notionSource({
  databaseId: "abc123...",           // Notion database ID
  apiKey: process.env.NOTION_TOKEN,  // Notion integration token
})
\`\`\`

Each page in the database is converted to Markdown:

- The page title becomes the \`title\` frontmatter field
- Headings, paragraphs, lists, code blocks, quotes, and dividers are converted
- Bold, italic, code, and link annotations are preserved
- The title is slugified to create the page ID (\`Getting Started\` becomes \`getting-started\`)

### Setting up the Notion integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) and create a new integration
2. Copy the integration token
3. Share your database with the integration (click "..." on the database, then "Connections")

## Custom content sources

Use \`defineContentSource\` to create your own source with full type checking:

\`\`\`javascript
import { defineContentSource } from "@tomehq/core";

const apiSource = defineContentSource({
  name: "my-api",

  async fetchPages() {
    const res = await fetch("https://api.example.com/docs");
    const data = await res.json();

    return data.pages.map((page) => ({
      id: page.slug,
      content: \`---\\ntitle: \${page.title}\\n---\\n\\n\${page.body}\`,
      format: "md",
      lastModified: page.updatedAt,
    }));
  },
});
\`\`\`

Each page must return:

| Field | Type | Description |
|-------|------|-------------|
| \`id\` | \`string\` | Page identifier (used for URL and navigation) |
| \`content\` | \`string\` | Raw Markdown/MDX including frontmatter |
| \`format\` | \`"md"\` or \`"mdx"\` | File format |
| \`lastModified\` | \`string?\` | ISO 8601 date (optional) |

Custom sources can also implement an optional \`watch\` method for development mode — return a cleanup function to stop watching:

\`\`\`javascript
defineContentSource({
  name: "polling-api",
  async fetchPages() { /* ... */ },

  watch(onChange) {
    const interval = setInterval(async () => {
      const pages = await this.fetchPages();
      onChange(pages);
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  },
});
\`\`\`

## Using multiple sources

You can combine any number of content sources. Remote pages are merged with local files — if a remote page has the same ID as a local page, the local page takes priority.

\`\`\`javascript
import { githubSource, notionSource } from "@tomehq/core";

export default {
  name: "My Docs",
  contentSources: [
    githubSource({ owner: "acme", repo: "sdk-docs", path: "docs" }),
    notionSource({ databaseId: "abc123", apiKey: process.env.NOTION_TOKEN }),
  ],
};
\`\`\`

Content is fetched once at build time (and on startup in dev mode). Failed sources log a warning but don't block the build — your local pages will still work.
`};export{s as default};
