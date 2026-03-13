const e={frontmatter:{title:"Search",description:"How to set up search in your Tome documentation site — built-in Pagefind and optional Algolia DocSearch.",icon:"search",hidden:!1,toc:!0},html:`<p>Tome includes search out of the box. No configuration is needed for the default experience — Pagefind indexes your site at build time and provides fast, client-side search with zero external dependencies.</p>
<h2 id="built-in-search-pagefind"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#built-in-search-pagefind"><span class="icon icon-link"></span></a>Built-in search (Pagefind)</h2>
<p>Pagefind is the default search provider. It runs automatically during <code>tome build</code>:</p>
<ol>
<li>Tome builds your static site to <code>out/</code></li>
<li>Pagefind indexes all HTML pages</li>
<li>The search index is placed in <code>out/_pagefind/</code></li>
<li>The search UI loads the index on demand (&lt; 1KB initial JS)</li>
</ol>
<p>No configuration required. Search is available on every page via the header search bar or the <code>Ctrl+K</code> / <code>Cmd+K</code> keyboard shortcut.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">// Default — can be omitted entirely</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">search</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  provider</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"local"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h2 id="algolia-docsearch"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#algolia-docsearch"><span class="icon icon-link"></span></a>Algolia DocSearch</h2>
<p>For larger documentation sites, you can use Algolia DocSearch as an alternative:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">search</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  provider</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"algolia"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  appId</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"YOUR_APP_ID"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  apiKey</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"YOUR_SEARCH_API_KEY"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  indexName</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"your-index-name"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h3 id="initialize-the-algolia-index"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#initialize-the-algolia-index"><span class="icon icon-link"></span></a>Initialize the Algolia index</h3>
<p>Tome includes a helper command to set up your Algolia index:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> algolia:init</span></span></code></pre>
<p>This creates a crawler configuration optimized for Tome's HTML structure.</p>
<h3 id="when-to-use-algolia"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#when-to-use-algolia"><span class="icon icon-link"></span></a>When to use Algolia</h3>
<table>
<thead>
<tr>
<th>Feature</th>
<th>Pagefind</th>
<th>Algolia</th>
</tr>
</thead>
<tbody>
<tr>
<td>Setup</td>
<td>Zero config</td>
<td>Requires account</td>
</tr>
<tr>
<td>Cost</td>
<td>Free</td>
<td>Free tier available</td>
</tr>
<tr>
<td>Index size</td>
<td>Unlimited</td>
<td>10K records free</td>
</tr>
<tr>
<td>Typo tolerance</td>
<td>Basic</td>
<td>Advanced</td>
</tr>
<tr>
<td>Analytics</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Real-time indexing</td>
<td>At build time</td>
<td>Crawler-based</td>
</tr>
</tbody>
</table>
<p>For most documentation sites, Pagefind is sufficient. Consider Algolia if you need search analytics, advanced typo tolerance, or real-time indexing.</p>`,headings:[{depth:2,text:"Built-in search (Pagefind)",id:"built-in-search-pagefind"},{depth:2,text:"Algolia DocSearch",id:"algolia-docsearch"},{depth:3,text:"Initialize the Algolia index",id:"initialize-the-algolia-index"},{depth:3,text:"When to use Algolia",id:"when-to-use-algolia"}],raw:`
Tome includes search out of the box. No configuration is needed for the default experience — Pagefind indexes your site at build time and provides fast, client-side search with zero external dependencies.

## Built-in search (Pagefind)

Pagefind is the default search provider. It runs automatically during \`tome build\`:

1. Tome builds your static site to \`out/\`
2. Pagefind indexes all HTML pages
3. The search index is placed in \`out/_pagefind/\`
4. The search UI loads the index on demand (< 1KB initial JS)

No configuration required. Search is available on every page via the header search bar or the \`Ctrl+K\` / \`Cmd+K\` keyboard shortcut.

\`\`\`javascript
// Default — can be omitted entirely
search: {
  provider: "local",
}
\`\`\`

## Algolia DocSearch

For larger documentation sites, you can use Algolia DocSearch as an alternative:

\`\`\`javascript
search: {
  provider: "algolia",
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_SEARCH_API_KEY",
  indexName: "your-index-name",
}
\`\`\`

### Initialize the Algolia index

Tome includes a helper command to set up your Algolia index:

\`\`\`bash
npx tome algolia:init
\`\`\`

This creates a crawler configuration optimized for Tome's HTML structure.

### When to use Algolia

| Feature | Pagefind | Algolia |
|---------|----------|---------|
| Setup | Zero config | Requires account |
| Cost | Free | Free tier available |
| Index size | Unlimited | 10K records free |
| Typo tolerance | Basic | Advanced |
| Analytics | No | Yes |
| Real-time indexing | At build time | Crawler-based |

For most documentation sites, Pagefind is sufficient. Consider Algolia if you need search analytics, advanced typo tolerance, or real-time indexing.
`};export{e as default};
