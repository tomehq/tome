const n={frontmatter:{title:"Endpoints",description:"How Tome renders API endpoints from your OpenAPI spec — methods, parameters, schemas, and the interactive playground.",icon:"globe",hidden:!1,toc:!0},html:`<p>Tome renders each API operation from your OpenAPI spec as a structured endpoint section with method badges, parameter tables, request/response schemas, and an optional interactive playground.</p>
<h2 id="endpoint-layout"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#endpoint-layout"><span class="icon icon-link"></span></a>Endpoint layout</h2>
<p>Each endpoint displays:</p>
<ol>
<li><strong>Method badge</strong> — Color-coded (GET, POST, PUT, DELETE, PATCH)</li>
<li><strong>Path</strong> — The endpoint URL with path parameters highlighted</li>
<li><strong>Description</strong> — From the operation's <code>summary</code> and <code>description</code> fields</li>
<li><strong>Parameters</strong> — Path, query, and header parameters in a table</li>
<li><strong>Request body</strong> — Schema rendered with types and descriptions</li>
<li><strong>Responses</strong> — Status codes with response schemas</li>
</ol>
<h2 id="tag-grouping"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#tag-grouping"><span class="icon icon-link"></span></a>Tag grouping</h2>
<p>Endpoints are organized by their OpenAPI tags. Each tag becomes a section heading:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">paths</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">  /users</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">    get</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      tags</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">Users</span><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      summary</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">List all users</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">  /users/{id}</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">    get</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      tags</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">Users</span><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      summary</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Get user by ID</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">  /projects</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">    get</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      tags</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: [</span><span style="color:#032F62;--shiki-dark:#9ECBFF">Projects</span><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      summary</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">List projects</span></span></code></pre>
<p>This generates two groups: "Users" with two endpoints and "Projects" with one.</p>
<h2 id="parameter-rendering"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#parameter-rendering"><span class="icon icon-link"></span></a>Parameter rendering</h2>
<p>Parameters are rendered in a table with type information:</p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>In</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>id</code></td>
<td>string</td>
<td>path</td>
<td>yes</td>
<td>The user ID</td>
</tr>
<tr>
<td><code>limit</code></td>
<td>integer</td>
<td>query</td>
<td>no</td>
<td>Max results (default: 20)</td>
</tr>
<tr>
<td><code>offset</code></td>
<td>integer</td>
<td>query</td>
<td>no</td>
<td>Pagination offset</td>
</tr>
</tbody>
</table>
<h2 id="schema-display"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#schema-display"><span class="icon icon-link"></span></a>Schema display</h2>
<p>Request and response schemas are rendered recursively. Nested objects show their properties with types:</p>
<pre><code>UserResponse {
  id: string          — Unique identifier
  name: string        — Display name
  email: string       — Email address
  created_at: string  — ISO 8601 timestamp
  settings: {
    theme: string     — "light" or "dark"
    locale: string    — Language code
  }
}
</code></pre>
<p>Arrays, enums, and <code>oneOf</code>/<code>anyOf</code> unions are all supported.</p>
<h2 id="interactive-playground"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#interactive-playground"><span class="icon icon-link"></span></a>Interactive playground</h2>
<p>When <code>playground.enabled</code> is true in your config, each endpoint gets a "Try it" section where users can:</p>
<ul>
<li>Fill in path and query parameters</li>
<li>Edit the request body as JSON</li>
<li>Set authentication headers</li>
<li>Send the request and view the response</li>
</ul>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">api</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  spec</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"./openapi.yaml"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  playground</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    enabled</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    baseUrl</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://api.example.com"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Override base URL</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">},</span></span></code></pre>
<p>The playground uses <code>fetch</code> directly from the browser. CORS must be enabled on your API for cross-origin requests.</p>`,headings:[{depth:2,text:"Endpoint layout",id:"endpoint-layout"},{depth:2,text:"Tag grouping",id:"tag-grouping"},{depth:2,text:"Parameter rendering",id:"parameter-rendering"},{depth:2,text:"Schema display",id:"schema-display"},{depth:2,text:"Interactive playground",id:"interactive-playground"}],raw:`
Tome renders each API operation from your OpenAPI spec as a structured endpoint section with method badges, parameter tables, request/response schemas, and an optional interactive playground.

## Endpoint layout

Each endpoint displays:

1. **Method badge** — Color-coded (GET, POST, PUT, DELETE, PATCH)
2. **Path** — The endpoint URL with path parameters highlighted
3. **Description** — From the operation's \`summary\` and \`description\` fields
4. **Parameters** — Path, query, and header parameters in a table
5. **Request body** — Schema rendered with types and descriptions
6. **Responses** — Status codes with response schemas

## Tag grouping

Endpoints are organized by their OpenAPI tags. Each tag becomes a section heading:

\`\`\`yaml
paths:
  /users:
    get:
      tags: [Users]
      summary: List all users
  /users/{id}:
    get:
      tags: [Users]
      summary: Get user by ID
  /projects:
    get:
      tags: [Projects]
      summary: List projects
\`\`\`

This generates two groups: "Users" with two endpoints and "Projects" with one.

## Parameter rendering

Parameters are rendered in a table with type information:

| Name | Type | In | Required | Description |
|------|------|----|----------|-------------|
| \`id\` | string | path | yes | The user ID |
| \`limit\` | integer | query | no | Max results (default: 20) |
| \`offset\` | integer | query | no | Pagination offset |

## Schema display

Request and response schemas are rendered recursively. Nested objects show their properties with types:

\`\`\`
UserResponse {
  id: string          — Unique identifier
  name: string        — Display name
  email: string       — Email address
  created_at: string  — ISO 8601 timestamp
  settings: {
    theme: string     — "light" or "dark"
    locale: string    — Language code
  }
}
\`\`\`

Arrays, enums, and \`oneOf\`/\`anyOf\` unions are all supported.

## Interactive playground

When \`playground.enabled\` is true in your config, each endpoint gets a "Try it" section where users can:

- Fill in path and query parameters
- Edit the request body as JSON
- Set authentication headers
- Send the request and view the response

\`\`\`javascript
api: {
  spec: "./openapi.yaml",
  playground: {
    enabled: true,
    baseUrl: "https://api.example.com",  // Override base URL
  },
},
\`\`\`

The playground uses \`fetch\` directly from the browser. CORS must be enabled on your API for cross-origin requests.
`};export{n as default};
