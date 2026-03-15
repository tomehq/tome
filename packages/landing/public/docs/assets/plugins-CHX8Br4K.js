const s={frontmatter:{title:"Plugin System",description:"Extend Tome with plugins that hook into the build lifecycle — modify routes, inject head tags, and run custom logic.",icon:"puzzle",hidden:!1,toc:!0,draft:!1},html:`<p>Tome's plugin system lets you hook into the build lifecycle to modify configuration, transform routes, inject HTML tags, and run custom logic at build time.</p>
<h2 id="defining-a-plugin"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#defining-a-plugin"><span class="icon icon-link"></span></a>Defining a plugin</h2>
<p>A plugin is an object with a <code>name</code> and a <code>hooks</code> object. Add plugins to the <code>tomePlugins</code> array in your config:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">// tome.config.js</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  tomePlugins: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"my-plugin"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      hooks: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">        buildStart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">          console.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">log</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Build starting..."</span><span style="color:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">        },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<h2 id="available-hooks"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#available-hooks"><span class="icon icon-link"></span></a>Available hooks</h2>
<p>Plugins can define any combination of these hooks:</p>
<table>
<thead>
<tr>
<th>Hook</th>
<th>When it runs</th>
<th>Arguments</th>
<th>Return</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>configResolved</code></td>
<td>After config is loaded and validated</td>
<td><code>config</code></td>
<td>Modified config or <code>void</code></td>
</tr>
<tr>
<td><code>routesResolved</code></td>
<td>After all pages are discovered</td>
<td><code>routes[]</code></td>
<td>Modified routes or <code>void</code></td>
</tr>
<tr>
<td><code>headTags</code></td>
<td>When generating the HTML shell</td>
<td><em>(none)</em></td>
<td>Array of HTML strings</td>
</tr>
<tr>
<td><code>buildStart</code></td>
<td>Before the build begins</td>
<td><em>(none)</em></td>
<td><code>void</code> or <code>Promise&lt;void&gt;</code></td>
</tr>
<tr>
<td><code>buildEnd</code></td>
<td>After the build completes</td>
<td><code>outputDir</code></td>
<td><code>void</code> or <code>Promise&lt;void&gt;</code></td>
</tr>
</tbody>
</table>
<h3 id="configresolved"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#configresolved"><span class="icon icon-link"></span></a><code>configResolved</code></h3>
<p>Runs after the config file is loaded and validated. Return a modified config object to change settings programmatically:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  name</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"env-config"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  hooks</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    configResolved</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(config) {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">      return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">        ...</span><span style="color:#24292E;--shiki-dark:#E1E4E8">config,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">        baseUrl: process.env.</span><span style="color:#005CC5;--shiki-dark:#79B8FF">DOCS_URL</span><span style="color:#D73A49;--shiki-dark:#F97583"> ||</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> config.baseUrl,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      };</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h3 id="routesresolved"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#routesresolved"><span class="icon icon-link"></span></a><code>routesResolved</code></h3>
<p>Runs after all pages are discovered from the filesystem. Return a modified routes array to add, remove, or transform pages:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  name</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"sort-routes"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  hooks</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    routesResolved</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(routes) {</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">      // Add a "weight" sort based on frontmatter</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">      return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> routes.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">sort</span><span style="color:#24292E;--shiki-dark:#E1E4E8">((</span><span style="color:#E36209;--shiki-dark:#FFAB70">a</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#E36209;--shiki-dark:#FFAB70">b</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=&gt;</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">        const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> wa</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> a.frontmatter.weight </span><span style="color:#D73A49;--shiki-dark:#F97583">??</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 100</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">        const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> wb</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> b.frontmatter.weight </span><span style="color:#D73A49;--shiki-dark:#F97583">??</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 100</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">        return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> wa </span><span style="color:#D73A49;--shiki-dark:#F97583">-</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> wb;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      });</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>Each route object includes <code>id</code>, <code>filePath</code>, <code>absolutePath</code>, <code>urlPath</code>, <code>frontmatter</code>, and <code>isMdx</code>.</p>
<h3 id="headtags"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#headtags"><span class="icon icon-link"></span></a><code>headTags</code></h3>
<p>Return an array of HTML strings to inject into the <code>&lt;head&gt;</code> of every page:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  name</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"analytics"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  hooks</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    headTags</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">      return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="color:#032F62;--shiki-dark:#9ECBFF">        '&lt;script defer src="https://analytics.example.com/script.js"&gt;&lt;/script&gt;'</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#032F62;--shiki-dark:#9ECBFF">        '&lt;meta name="author" content="Acme Inc"&gt;'</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      ];</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h3 id="buildstart--buildend"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#buildstart--buildend"><span class="icon icon-link"></span></a><code>buildStart</code> / <code>buildEnd</code></h3>
<p>Run custom logic before or after the build. Both hooks support async functions:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  name</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"notify"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  hooks</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    async </span><span style="color:#6F42C1;--shiki-dark:#B392F0">buildStart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      console.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">log</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Build started at"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#D73A49;--shiki-dark:#F97583">new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">().</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toISOString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">());</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    async </span><span style="color:#6F42C1;--shiki-dark:#B392F0">buildEnd</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(outputDir) {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      console.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">log</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">\`Build complete. Output: \${</span><span style="color:#24292E;--shiki-dark:#E1E4E8">outputDir</span><span style="color:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="color:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">      // e.g., upload to S3, notify Slack, run a validator</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h2 id="full-example-analytics-plugin"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#full-example-analytics-plugin"><span class="icon icon-link"></span></a>Full example: analytics plugin</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">// plugins/analytics.js</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> analyticsPlugin</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#E36209;--shiki-dark:#FFAB70">trackingId</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">  return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"analytics"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    hooks: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">      headTags</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">        return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="color:#032F62;--shiki-dark:#9ECBFF">          \`&lt;script defer src="https://cdn.example.com/a.js" data-id="\${</span><span style="color:#24292E;--shiki-dark:#E1E4E8">trackingId</span><span style="color:#032F62;--shiki-dark:#9ECBFF">}"&gt;&lt;/script&gt;\`</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">        ];</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      },</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">      buildEnd</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#E36209;--shiki-dark:#FFAB70">outputDir</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">        console.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">log</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">\`Analytics tracking ID: \${</span><span style="color:#24292E;--shiki-dark:#E1E4E8">trackingId</span><span style="color:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="color:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  };</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">// tome.config.js</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { analyticsPlugin } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "./plugins/analytics.js"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  tomePlugins: [</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    analyticsPlugin</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"UA-123456"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">),</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<h2 id="full-example-route-filter-plugin"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#full-example-route-filter-plugin"><span class="icon icon-link"></span></a>Full example: route filter plugin</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">// tome.config.js</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  tomePlugins: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"hide-internal"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      hooks: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">        routesResolved</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#E36209;--shiki-dark:#FFAB70">routes</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">          // Remove pages with "internal" tag from the site</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">          return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> routes.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">filter</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">            (</span><span style="color:#E36209;--shiki-dark:#FFAB70">r</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=&gt;</span><span style="color:#D73A49;--shiki-dark:#F97583"> !</span><span style="color:#24292E;--shiki-dark:#E1E4E8">r.frontmatter.tags?.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">includes</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"internal"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">          );</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">        },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<h2 id="plugin-execution-order"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#plugin-execution-order"><span class="icon icon-link"></span></a>Plugin execution order</h2>
<p>When multiple plugins are registered, hooks run in array order. If a hook returns a value (like <code>configResolved</code> or <code>routesResolved</code>), that value is passed to the next plugin's hook.</p>`,headings:[{depth:2,text:"Defining a plugin",id:"defining-a-plugin"},{depth:2,text:"Available hooks",id:"available-hooks"},{depth:3,text:"configResolved",id:"configresolved"},{depth:3,text:"routesResolved",id:"routesresolved"},{depth:3,text:"headTags",id:"headtags"},{depth:3,text:"buildStart / buildEnd",id:"buildstart--buildend"},{depth:2,text:"Full example: analytics plugin",id:"full-example-analytics-plugin"},{depth:2,text:"Full example: route filter plugin",id:"full-example-route-filter-plugin"},{depth:2,text:"Plugin execution order",id:"plugin-execution-order"}],raw:`
Tome's plugin system lets you hook into the build lifecycle to modify configuration, transform routes, inject HTML tags, and run custom logic at build time.

## Defining a plugin

A plugin is an object with a \`name\` and a \`hooks\` object. Add plugins to the \`tomePlugins\` array in your config:

\`\`\`javascript
// tome.config.js
export default {
  name: "My Docs",
  tomePlugins: [
    {
      name: "my-plugin",
      hooks: {
        buildStart() {
          console.log("Build starting...");
        },
      },
    },
  ],
};
\`\`\`

## Available hooks

Plugins can define any combination of these hooks:

| Hook | When it runs | Arguments | Return |
|------|-------------|-----------|--------|
| \`configResolved\` | After config is loaded and validated | \`config\` | Modified config or \`void\` |
| \`routesResolved\` | After all pages are discovered | \`routes[]\` | Modified routes or \`void\` |
| \`headTags\` | When generating the HTML shell | *(none)* | Array of HTML strings |
| \`buildStart\` | Before the build begins | *(none)* | \`void\` or \`Promise<void>\` |
| \`buildEnd\` | After the build completes | \`outputDir\` | \`void\` or \`Promise<void>\` |

### \`configResolved\`

Runs after the config file is loaded and validated. Return a modified config object to change settings programmatically:

\`\`\`javascript
{
  name: "env-config",
  hooks: {
    configResolved(config) {
      return {
        ...config,
        baseUrl: process.env.DOCS_URL || config.baseUrl,
      };
    },
  },
}
\`\`\`

### \`routesResolved\`

Runs after all pages are discovered from the filesystem. Return a modified routes array to add, remove, or transform pages:

\`\`\`javascript
{
  name: "sort-routes",
  hooks: {
    routesResolved(routes) {
      // Add a "weight" sort based on frontmatter
      return routes.sort((a, b) => {
        const wa = a.frontmatter.weight ?? 100;
        const wb = b.frontmatter.weight ?? 100;
        return wa - wb;
      });
    },
  },
}
\`\`\`

Each route object includes \`id\`, \`filePath\`, \`absolutePath\`, \`urlPath\`, \`frontmatter\`, and \`isMdx\`.

### \`headTags\`

Return an array of HTML strings to inject into the \`<head>\` of every page:

\`\`\`javascript
{
  name: "analytics",
  hooks: {
    headTags() {
      return [
        '<script defer src="https://analytics.example.com/script.js"><\/script>',
        '<meta name="author" content="Acme Inc">',
      ];
    },
  },
}
\`\`\`

### \`buildStart\` / \`buildEnd\`

Run custom logic before or after the build. Both hooks support async functions:

\`\`\`javascript
{
  name: "notify",
  hooks: {
    async buildStart() {
      console.log("Build started at", new Date().toISOString());
    },
    async buildEnd(outputDir) {
      console.log(\`Build complete. Output: \${outputDir}\`);
      // e.g., upload to S3, notify Slack, run a validator
    },
  },
}
\`\`\`

## Full example: analytics plugin

\`\`\`javascript
// plugins/analytics.js
export function analyticsPlugin(trackingId) {
  return {
    name: "analytics",
    hooks: {
      headTags() {
        return [
          \`<script defer src="https://cdn.example.com/a.js" data-id="\${trackingId}"><\/script>\`,
        ];
      },
      buildEnd(outputDir) {
        console.log(\`Analytics tracking ID: \${trackingId}\`);
      },
    },
  };
}
\`\`\`

\`\`\`javascript
// tome.config.js
import { analyticsPlugin } from "./plugins/analytics.js";

export default {
  name: "My Docs",
  tomePlugins: [
    analyticsPlugin("UA-123456"),
  ],
};
\`\`\`

## Full example: route filter plugin

\`\`\`javascript
// tome.config.js
export default {
  name: "My Docs",
  tomePlugins: [
    {
      name: "hide-internal",
      hooks: {
        routesResolved(routes) {
          // Remove pages with "internal" tag from the site
          return routes.filter(
            (r) => !r.frontmatter.tags?.includes("internal")
          );
        },
      },
    },
  ],
};
\`\`\`

## Plugin execution order

When multiple plugins are registered, hooks run in array order. If a hook returns a value (like \`configResolved\` or \`routesResolved\`), that value is passed to the next plugin's hook.
`};export{s as default};
