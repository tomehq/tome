const n={frontmatter:{title:"Config Reference",description:"Complete reference for every field in tome.config.js — types, defaults, and descriptions.",icon:"file-text",hidden:!1,toc:!0,draft:!1},html:`<p>The config file (<code>tome.config.js</code>, <code>.mjs</code>, or <code>.ts</code>) is validated at startup. Invalid values produce clear error messages with the field path and expected type.</p>
<h2 id="top-level-fields"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#top-level-fields"><span class="icon icon-link"></span></a>Top-level fields</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>name</code></td>
<td><code>string</code></td>
<td><code>"My Docs"</code></td>
<td>Site name shown in the header and browser tab</td>
</tr>
<tr>
<td><code>logo</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Path to logo image, relative to <code>public/</code></td>
</tr>
<tr>
<td><code>favicon</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Path to favicon, relative to <code>public/</code></td>
</tr>
<tr>
<td><code>baseUrl</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Full URL where the site is hosted (for analytics, canonical links)</td>
</tr>
<tr>
<td><code>basePath</code></td>
<td><code>string</code></td>
<td>—</td>
<td>URL subpath prefix (e.g., <code>"/docs/"</code>) — sets Vite's <code>base</code> option</td>
</tr>
<tr>
<td><code>theme</code></td>
<td><code>ThemeConfig</code></td>
<td><code>{}</code></td>
<td>Theme configuration (see below)</td>
</tr>
<tr>
<td><code>navigation</code></td>
<td><code>NavigationGroup[]</code></td>
<td><code>[]</code></td>
<td>Sidebar navigation structure</td>
</tr>
<tr>
<td><code>topNav</code></td>
<td><code>TopNavItem[]</code></td>
<td>—</td>
<td>Header navigation links</td>
</tr>
<tr>
<td><code>search</code></td>
<td><code>SearchConfig</code></td>
<td><code>{ provider: "local" }</code></td>
<td>Search provider configuration</td>
</tr>
<tr>
<td><code>api</code></td>
<td><code>ApiConfig</code></td>
<td>—</td>
<td>OpenAPI spec and playground settings</td>
</tr>
<tr>
<td><code>ai</code></td>
<td><code>AiConfig</code></td>
<td>—</td>
<td>AI chat widget configuration</td>
</tr>
<tr>
<td><code>mcp</code></td>
<td><code>McpConfig</code></td>
<td><code>{ enabled: true }</code></td>
<td>MCP server manifest generation</td>
</tr>
<tr>
<td><code>i18n</code></td>
<td><code>I18nConfig</code></td>
<td>—</td>
<td>Internationalization settings</td>
</tr>
<tr>
<td><code>versioning</code></td>
<td><code>VersioningConfig</code></td>
<td>—</td>
<td>Multi-version documentation</td>
</tr>
<tr>
<td><code>analytics</code></td>
<td><code>AnalyticsConfig</code></td>
<td>—</td>
<td>Analytics provider settings</td>
</tr>
<tr>
<td><code>banner</code></td>
<td><code>BannerConfig</code></td>
<td>—</td>
<td>Announcement banner at the top of every page</td>
</tr>
<tr>
<td><code>math</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Enable <code>$</code> inline and <code>$$</code> display math in <code>.md</code> files</td>
</tr>
<tr>
<td><code>webhooks</code></td>
<td><code>WebhookConfig[]</code></td>
<td>—</td>
<td>Webhook notifications for deploy events</td>
</tr>
<tr>
<td><code>socialLinks</code></td>
<td><code>SocialLink[]</code></td>
<td>—</td>
<td>Social media icons in the header</td>
</tr>
<tr>
<td><code>overrides</code></td>
<td><code>OverridesConfig</code></td>
<td>—</td>
<td>Custom React components to replace default UI sections</td>
</tr>
<tr>
<td><code>tomePlugins</code></td>
<td><code>TomePlugin[]</code></td>
<td>—</td>
<td>Plugins that hook into the build lifecycle</td>
</tr>
<tr>
<td><code>contentSources</code></td>
<td><code>ContentSource[]</code></td>
<td>—</td>
<td>Remote content sources (GitHub, Notion)</td>
</tr>
</tbody>
</table>
<h2 id="themeconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#themeconfig"><span class="icon icon-link"></span></a>ThemeConfig</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>preset</code></td>
<td><code>"amber" | "editorial"</code></td>
<td><code>"amber"</code></td>
<td>Base theme preset</td>
</tr>
<tr>
<td><code>accent</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Custom accent color (hex, e.g., <code>"#ff6b4a"</code>)</td>
</tr>
<tr>
<td><code>mode</code></td>
<td><code>"light" | "dark" | "auto"</code></td>
<td><code>"auto"</code></td>
<td>Color mode</td>
</tr>
<tr>
<td><code>fonts.heading</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Heading font family</td>
</tr>
<tr>
<td><code>fonts.body</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Body font family</td>
</tr>
<tr>
<td><code>fonts.code</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Code font family</td>
</tr>
<tr>
<td><code>radius</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Border radius (e.g., <code>"8px"</code>)</td>
</tr>
</tbody>
</table>
<h2 id="navigationgroup"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#navigationgroup"><span class="icon icon-link"></span></a>NavigationGroup</h2>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  group</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: string;</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  pages</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: Array</span><span style="color:#D73A49;--shiki-dark:#F97583">&lt;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">string </span><span style="color:#D73A49;--shiki-dark:#F97583">|</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> NavigationGroup</span><span style="color:#D73A49;--shiki-dark:#F97583">&gt;</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>Page IDs are filenames without extensions, relative to <code>pages/</code>. Nested groups are supported.</p>
<h2 id="searchconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#searchconfig"><span class="icon icon-link"></span></a>SearchConfig</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>provider</code></td>
<td><code>"local" | "algolia"</code></td>
<td><code>"local"</code></td>
<td>Search provider</td>
</tr>
<tr>
<td><code>appId</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Algolia application ID</td>
</tr>
<tr>
<td><code>apiKey</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Algolia search-only API key</td>
</tr>
<tr>
<td><code>indexName</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Algolia index name</td>
</tr>
</tbody>
</table>
<h2 id="apiconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#apiconfig"><span class="icon icon-link"></span></a>ApiConfig</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>spec</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Path to OpenAPI spec file (required)</td>
</tr>
<tr>
<td><code>playground</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Enable interactive API playground</td>
</tr>
<tr>
<td><code>baseUrl</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Base URL for playground requests</td>
</tr>
<tr>
<td><code>auth.type</code></td>
<td><code>"bearer" | "apiKey" | "oauth2"</code></td>
<td>—</td>
<td>Authentication type</td>
</tr>
<tr>
<td><code>auth.header</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Auth header name</td>
</tr>
</tbody>
</table>
<h2 id="aiconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#aiconfig"><span class="icon icon-link"></span></a>AiConfig</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>enabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Enable AI chat widget</td>
</tr>
<tr>
<td><code>provider</code></td>
<td><code>"openai" | "anthropic" | "custom"</code></td>
<td><code>"anthropic"</code></td>
<td>AI provider</td>
</tr>
<tr>
<td><code>model</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Model identifier</td>
</tr>
<tr>
<td><code>apiKeyEnv</code></td>
<td><code>string</code></td>
<td><code>"TOME_AI_KEY"</code></td>
<td>Environment variable for API key</td>
</tr>
</tbody>
</table>
<h2 id="mcpconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#mcpconfig"><span class="icon icon-link"></span></a>McpConfig</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>enabled</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Generate <code>mcp.json</code> manifest at build time</td>
</tr>
<tr>
<td><code>server</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Enable MCP stdio server</td>
</tr>
<tr>
<td><code>includeContent</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Include page content in the manifest</td>
</tr>
<tr>
<td><code>excludePages</code></td>
<td><code>string[]</code></td>
<td><code>[]</code></td>
<td>Page IDs to exclude</td>
</tr>
</tbody>
</table>
<h2 id="i18nconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#i18nconfig"><span class="icon icon-link"></span></a>I18nConfig</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>defaultLocale</code></td>
<td><code>string</code></td>
<td><code>"en"</code></td>
<td>Default locale code</td>
</tr>
<tr>
<td><code>locales</code></td>
<td><code>string[]</code></td>
<td><code>["en"]</code></td>
<td>All available locale codes</td>
</tr>
<tr>
<td><code>localeNames</code></td>
<td><code>Record&lt;string, string&gt;</code></td>
<td>—</td>
<td>Display names (e.g., <code>{ en: "English" }</code>)</td>
</tr>
<tr>
<td><code>fallback</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Fall back to default locale for missing translations</td>
</tr>
<tr>
<td><code>localeDirs</code></td>
<td><code>Record&lt;string, "ltr" | "rtl"&gt;</code></td>
<td>—</td>
<td>Text direction per locale (e.g., <code>{ ar: "rtl", he: "rtl" }</code>)</td>
</tr>
</tbody>
</table>
<h2 id="versioningconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#versioningconfig"><span class="icon icon-link"></span></a>VersioningConfig</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>current</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Label for the current version (required)</td>
</tr>
<tr>
<td><code>versions</code></td>
<td><code>string[]</code></td>
<td>—</td>
<td>All version labels, newest first (required)</td>
</tr>
</tbody>
</table>
<h2 id="analyticsconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#analyticsconfig"><span class="icon icon-link"></span></a>AnalyticsConfig</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>provider</code></td>
<td><code>"plausible" | "posthog" | "custom"</code></td>
<td>—</td>
<td>Analytics provider</td>
</tr>
<tr>
<td><code>key</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Site ID or API key</td>
</tr>
</tbody>
</table>
<h2 id="bannerconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#bannerconfig"><span class="icon icon-link"></span></a>BannerConfig</h2>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>text</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Banner message text (required)</td>
</tr>
<tr>
<td><code>link</code></td>
<td><code>string</code></td>
<td>—</td>
<td>URL to navigate to when clicked</td>
</tr>
<tr>
<td><code>dismissible</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Show a close button</td>
</tr>
</tbody>
</table>
<p>When a user dismisses the banner, it stays hidden until the <code>text</code> value changes. Updating the text resets dismissal for all users.</p>
<h2 id="webhookconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#webhookconfig"><span class="icon icon-link"></span></a>WebhookConfig</h2>
<p>Send notifications to Slack, Discord, or generic HTTP endpoints when deploy events occur.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">webhooks</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    url: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://hooks.slack.com/services/T.../B.../..."</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    channel: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"slack"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    events: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"deploy.succeeded"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"deploy.failed"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    url: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://discord.com/api/webhooks/..."</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    channel: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"discord"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    url: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://example.com/webhook"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    channel: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"http"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    secret: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"my-hmac-secret"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span></code></pre>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>url</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Webhook endpoint URL (required)</td>
</tr>
<tr>
<td><code>channel</code></td>
<td><code>"slack" | "discord" | "http"</code></td>
<td>—</td>
<td>Notification format (required)</td>
</tr>
<tr>
<td><code>events</code></td>
<td><code>WebhookEventType[]</code></td>
<td>all</td>
<td>Filter which events trigger the webhook</td>
</tr>
<tr>
<td><code>secret</code></td>
<td><code>string</code></td>
<td>—</td>
<td>HMAC-SHA256 secret for HTTP signature (<code>X-Tome-Signature</code> header)</td>
</tr>
</tbody>
</table>
<p><strong>Event types:</strong> <code>deploy.succeeded</code>, <code>deploy.failed</code>, <code>preview.deployed</code>, <code>domain.verified</code></p>
<h2 id="sociallinksconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#sociallinksconfig"><span class="icon icon-link"></span></a>SocialLinksConfig</h2>
<p>Add social media icons to the site header. Each entry specifies a platform and URL.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">socialLinks</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  { platform: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"github"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, url: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://github.com/my-org/my-repo"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  { platform: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"discord"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, url: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://discord.gg/my-server"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  { platform: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"twitter"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, url: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://twitter.com/my-handle"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  { platform: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"custom"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, url: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://mastodon.social/@me"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, icon: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"mastodon"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span></code></pre>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>platform</code></td>
<td><code>"github" | "twitter" | "discord" | "slack" | "linkedin" | "youtube" | "custom"</code></td>
<td>—</td>
<td>Social platform (required)</td>
</tr>
<tr>
<td><code>url</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Link URL (required)</td>
</tr>
<tr>
<td><code>icon</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Custom icon identifier (only used when <code>platform</code> is <code>"custom"</code>)</td>
</tr>
</tbody>
</table>
<h2 id="overridesconfig"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#overridesconfig"><span class="icon icon-link"></span></a>OverridesConfig</h2>
<p>Replace default UI sections with your own React components. Each field accepts a file path (relative to the project root) that exports a default React component.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">overrides</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  Header</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"./components/MyHeader.tsx"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  Footer</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"./components/MyFooter.tsx"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Header</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Path to a React component that replaces the default site header</td>
</tr>
<tr>
<td><code>Footer</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Path to a React component that replaces the default site footer</td>
</tr>
<tr>
<td><code>Sidebar</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Path to a React component that replaces the default sidebar</td>
</tr>
<tr>
<td><code>Toc</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Path to a React component that replaces the default table of contents</td>
</tr>
<tr>
<td><code>PageFooter</code></td>
<td><code>string</code></td>
<td>—</td>
<td>Path to a React component that replaces the default page footer</td>
</tr>
</tbody>
</table>`,headings:[{depth:2,text:"Top-level fields",id:"top-level-fields"},{depth:2,text:"ThemeConfig",id:"themeconfig"},{depth:2,text:"NavigationGroup",id:"navigationgroup"},{depth:2,text:"SearchConfig",id:"searchconfig"},{depth:2,text:"ApiConfig",id:"apiconfig"},{depth:2,text:"AiConfig",id:"aiconfig"},{depth:2,text:"McpConfig",id:"mcpconfig"},{depth:2,text:"I18nConfig",id:"i18nconfig"},{depth:2,text:"VersioningConfig",id:"versioningconfig"},{depth:2,text:"AnalyticsConfig",id:"analyticsconfig"},{depth:2,text:"BannerConfig",id:"bannerconfig"},{depth:2,text:"WebhookConfig",id:"webhookconfig"},{depth:2,text:"SocialLinksConfig",id:"sociallinksconfig"},{depth:2,text:"OverridesConfig",id:"overridesconfig"}],raw:'\nThe config file (`tome.config.js`, `.mjs`, or `.ts`) is validated at startup. Invalid values produce clear error messages with the field path and expected type.\n\n## Top-level fields\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `name` | `string` | `"My Docs"` | Site name shown in the header and browser tab |\n| `logo` | `string` | — | Path to logo image, relative to `public/` |\n| `favicon` | `string` | — | Path to favicon, relative to `public/` |\n| `baseUrl` | `string` | — | Full URL where the site is hosted (for analytics, canonical links) |\n| `basePath` | `string` | — | URL subpath prefix (e.g., `"/docs/"`) — sets Vite\'s `base` option |\n| `theme` | `ThemeConfig` | `{}` | Theme configuration (see below) |\n| `navigation` | `NavigationGroup[]` | `[]` | Sidebar navigation structure |\n| `topNav` | `TopNavItem[]` | — | Header navigation links |\n| `search` | `SearchConfig` | `{ provider: "local" }` | Search provider configuration |\n| `api` | `ApiConfig` | — | OpenAPI spec and playground settings |\n| `ai` | `AiConfig` | — | AI chat widget configuration |\n| `mcp` | `McpConfig` | `{ enabled: true }` | MCP server manifest generation |\n| `i18n` | `I18nConfig` | — | Internationalization settings |\n| `versioning` | `VersioningConfig` | — | Multi-version documentation |\n| `analytics` | `AnalyticsConfig` | — | Analytics provider settings |\n| `banner` | `BannerConfig` | — | Announcement banner at the top of every page |\n| `math` | `boolean` | `false` | Enable `$` inline and `$$` display math in `.md` files |\n| `webhooks` | `WebhookConfig[]` | — | Webhook notifications for deploy events |\n| `socialLinks` | `SocialLink[]` | — | Social media icons in the header |\n| `overrides` | `OverridesConfig` | — | Custom React components to replace default UI sections |\n| `tomePlugins` | `TomePlugin[]` | — | Plugins that hook into the build lifecycle |\n| `contentSources` | `ContentSource[]` | — | Remote content sources (GitHub, Notion) |\n\n## ThemeConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `preset` | `"amber" \\| "editorial"` | `"amber"` | Base theme preset |\n| `accent` | `string` | — | Custom accent color (hex, e.g., `"#ff6b4a"`) |\n| `mode` | `"light" \\| "dark" \\| "auto"` | `"auto"` | Color mode |\n| `fonts.heading` | `string` | — | Heading font family |\n| `fonts.body` | `string` | — | Body font family |\n| `fonts.code` | `string` | — | Code font family |\n| `radius` | `string` | — | Border radius (e.g., `"8px"`) |\n\n## NavigationGroup\n\n```typescript\n{\n  group: string;\n  pages: Array<string | NavigationGroup>;\n}\n```\n\nPage IDs are filenames without extensions, relative to `pages/`. Nested groups are supported.\n\n## SearchConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `provider` | `"local" \\| "algolia"` | `"local"` | Search provider |\n| `appId` | `string` | — | Algolia application ID |\n| `apiKey` | `string` | — | Algolia search-only API key |\n| `indexName` | `string` | — | Algolia index name |\n\n## ApiConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `spec` | `string` | — | Path to OpenAPI spec file (required) |\n| `playground` | `boolean` | `true` | Enable interactive API playground |\n| `baseUrl` | `string` | — | Base URL for playground requests |\n| `auth.type` | `"bearer" \\| "apiKey" \\| "oauth2"` | — | Authentication type |\n| `auth.header` | `string` | — | Auth header name |\n\n## AiConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `enabled` | `boolean` | `false` | Enable AI chat widget |\n| `provider` | `"openai" \\| "anthropic" \\| "custom"` | `"anthropic"` | AI provider |\n| `model` | `string` | — | Model identifier |\n| `apiKeyEnv` | `string` | `"TOME_AI_KEY"` | Environment variable for API key |\n\n## McpConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `enabled` | `boolean` | `true` | Generate `mcp.json` manifest at build time |\n| `server` | `boolean` | `false` | Enable MCP stdio server |\n| `includeContent` | `boolean` | `true` | Include page content in the manifest |\n| `excludePages` | `string[]` | `[]` | Page IDs to exclude |\n\n## I18nConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `defaultLocale` | `string` | `"en"` | Default locale code |\n| `locales` | `string[]` | `["en"]` | All available locale codes |\n| `localeNames` | `Record<string, string>` | — | Display names (e.g., `{ en: "English" }`) |\n| `fallback` | `boolean` | `true` | Fall back to default locale for missing translations |\n| `localeDirs` | `Record<string, "ltr" \\| "rtl">` | — | Text direction per locale (e.g., `{ ar: "rtl", he: "rtl" }`) |\n\n## VersioningConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `current` | `string` | — | Label for the current version (required) |\n| `versions` | `string[]` | — | All version labels, newest first (required) |\n\n## AnalyticsConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `provider` | `"plausible" \\| "posthog" \\| "custom"` | — | Analytics provider |\n| `key` | `string` | — | Site ID or API key |\n\n## BannerConfig\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `text` | `string` | — | Banner message text (required) |\n| `link` | `string` | — | URL to navigate to when clicked |\n| `dismissible` | `boolean` | `true` | Show a close button |\n\nWhen a user dismisses the banner, it stays hidden until the `text` value changes. Updating the text resets dismissal for all users.\n\n## WebhookConfig\n\nSend notifications to Slack, Discord, or generic HTTP endpoints when deploy events occur.\n\n```js\nwebhooks: [\n  {\n    url: "https://hooks.slack.com/services/T.../B.../...",\n    channel: "slack",\n    events: ["deploy.succeeded", "deploy.failed"],\n  },\n  {\n    url: "https://discord.com/api/webhooks/...",\n    channel: "discord",\n  },\n  {\n    url: "https://example.com/webhook",\n    channel: "http",\n    secret: "my-hmac-secret",\n  },\n]\n```\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `url` | `string` | — | Webhook endpoint URL (required) |\n| `channel` | `"slack" \\| "discord" \\| "http"` | — | Notification format (required) |\n| `events` | `WebhookEventType[]` | all | Filter which events trigger the webhook |\n| `secret` | `string` | — | HMAC-SHA256 secret for HTTP signature (`X-Tome-Signature` header) |\n\n**Event types:** `deploy.succeeded`, `deploy.failed`, `preview.deployed`, `domain.verified`\n\n## SocialLinksConfig\n\nAdd social media icons to the site header. Each entry specifies a platform and URL.\n\n```js\nsocialLinks: [\n  { platform: "github", url: "https://github.com/my-org/my-repo" },\n  { platform: "discord", url: "https://discord.gg/my-server" },\n  { platform: "twitter", url: "https://twitter.com/my-handle" },\n  { platform: "custom", url: "https://mastodon.social/@me", icon: "mastodon" },\n]\n```\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `platform` | `"github" \\| "twitter" \\| "discord" \\| "slack" \\| "linkedin" \\| "youtube" \\| "custom"` | — | Social platform (required) |\n| `url` | `string` | — | Link URL (required) |\n| `icon` | `string` | — | Custom icon identifier (only used when `platform` is `"custom"`) |\n\n## OverridesConfig\n\nReplace default UI sections with your own React components. Each field accepts a file path (relative to the project root) that exports a default React component.\n\n```js\noverrides: {\n  Header: "./components/MyHeader.tsx",\n  Footer: "./components/MyFooter.tsx",\n}\n```\n\n| Field | Type | Default | Description |\n|-------|------|---------|-------------|\n| `Header` | `string` | — | Path to a React component that replaces the default site header |\n| `Footer` | `string` | — | Path to a React component that replaces the default site footer |\n| `Sidebar` | `string` | — | Path to a React component that replaces the default sidebar |\n| `Toc` | `string` | — | Path to a React component that replaces the default table of contents |\n| `PageFooter` | `string` | — | Path to a React component that replaces the default page footer |\n'};export{n as default};
