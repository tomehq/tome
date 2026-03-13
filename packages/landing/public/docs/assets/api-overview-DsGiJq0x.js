const e={frontmatter:{title:"Overview",description:"Generate interactive API documentation from OpenAPI specs with Tome.",icon:"code",hidden:!1,toc:!0},html:`<p>Tome generates a complete API reference from an OpenAPI 3.x specification. Point it at a spec file and get rendered endpoint documentation with an interactive playground — no manual writing required.</p>
<h2 id="setup"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#setup"><span class="icon icon-link"></span></a>Setup</h2>
<p>Add the <code>api</code> section to your <code>tome.config.js</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My API Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  api: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    spec: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"./openapi.yaml"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,   </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Path to your OpenAPI spec</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    playground: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      enabled: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,          </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Enable interactive playground</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<p>Tome parses the spec at build time and generates:</p>
<ul>
<li>Endpoint listing organized by tags</li>
<li>Request/response schema documentation</li>
<li>Parameter tables with types and descriptions</li>
<li>An interactive playground for testing endpoints</li>
</ul>
<h2 id="supported-formats"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#supported-formats"><span class="icon icon-link"></span></a>Supported formats</h2>
<table>
<thead>
<tr>
<th>Format</th>
<th>Extension</th>
</tr>
</thead>
<tbody>
<tr>
<td>OpenAPI 3.0</td>
<td><code>.json</code>, <code>.yaml</code>, <code>.yml</code></td>
</tr>
<tr>
<td>OpenAPI 3.1</td>
<td><code>.json</code>, <code>.yaml</code>, <code>.yml</code></td>
</tr>
</tbody>
</table>
<p>Swagger 2.x specs are not directly supported. Convert them first using tools like <code>swagger2openapi</code>.</p>
<h2 id="what-gets-generated"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#what-gets-generated"><span class="icon icon-link"></span></a>What gets generated</h2>
<p>From a single spec file, Tome creates:</p>
<ul>
<li><strong>Endpoint pages</strong> — Each operation (GET, POST, PUT, DELETE) gets its own section with method, path, description, and parameters.</li>
<li><strong>Schema documentation</strong> — Request bodies and response objects are rendered with type information.</li>
<li><strong>Tag grouping</strong> — Operations are organized by their OpenAPI tags.</li>
<li><strong>Try it</strong> — The playground lets users send real requests with custom parameters and see responses.</li>
</ul>
<h2 id="spec-organization"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#spec-organization"><span class="icon icon-link"></span></a>Spec organization</h2>
<p>For the best results, make sure your OpenAPI spec includes:</p>
<ul>
<li>Descriptive <code>summary</code> and <code>description</code> fields on each operation</li>
<li>Tags to group related endpoints</li>
<li>Schema definitions with <code>description</code> fields</li>
<li>Example values for parameters and request bodies</li>
</ul>
<h2 id="next-steps"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#next-steps"><span class="icon icon-link"></span></a>Next steps</h2>
<ul>
<li><strong><a href="#api-endpoints">Endpoints</a></strong> for details on how endpoints are rendered</li>
<li><strong><a href="#api-auth">Authentication</a></strong> for configuring auth in the playground</li>
</ul>`,headings:[{depth:2,text:"Setup",id:"setup"},{depth:2,text:"Supported formats",id:"supported-formats"},{depth:2,text:"What gets generated",id:"what-gets-generated"},{depth:2,text:"Spec organization",id:"spec-organization"},{depth:2,text:"Next steps",id:"next-steps"}],raw:`
Tome generates a complete API reference from an OpenAPI 3.x specification. Point it at a spec file and get rendered endpoint documentation with an interactive playground — no manual writing required.

## Setup

Add the \`api\` section to your \`tome.config.js\`:

\`\`\`javascript
export default {
  name: "My API Docs",
  api: {
    spec: "./openapi.yaml",   // Path to your OpenAPI spec
    playground: {
      enabled: true,          // Enable interactive playground
    },
  },
};
\`\`\`

Tome parses the spec at build time and generates:

- Endpoint listing organized by tags
- Request/response schema documentation
- Parameter tables with types and descriptions
- An interactive playground for testing endpoints

## Supported formats

| Format | Extension |
|--------|-----------|
| OpenAPI 3.0 | \`.json\`, \`.yaml\`, \`.yml\` |
| OpenAPI 3.1 | \`.json\`, \`.yaml\`, \`.yml\` |

Swagger 2.x specs are not directly supported. Convert them first using tools like \`swagger2openapi\`.

## What gets generated

From a single spec file, Tome creates:

- **Endpoint pages** — Each operation (GET, POST, PUT, DELETE) gets its own section with method, path, description, and parameters.
- **Schema documentation** — Request bodies and response objects are rendered with type information.
- **Tag grouping** — Operations are organized by their OpenAPI tags.
- **Try it** — The playground lets users send real requests with custom parameters and see responses.

## Spec organization

For the best results, make sure your OpenAPI spec includes:

- Descriptive \`summary\` and \`description\` fields on each operation
- Tags to group related endpoints
- Schema definitions with \`description\` fields
- Example values for parameters and request bodies

## Next steps

- **[Endpoints](#api-endpoints)** for details on how endpoints are rendered
- **[Authentication](#api-auth)** for configuring auth in the playground
`};export{e as default};
