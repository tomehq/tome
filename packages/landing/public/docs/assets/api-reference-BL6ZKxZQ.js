const e={frontmatter:{title:"API Reference Setup",description:"How to generate an interactive API reference from an OpenAPI specification in Tome.",icon:"code",hidden:!1,toc:!0},html:`<p>Tome can generate a full API reference from an OpenAPI 3.x specification. The reference includes endpoint documentation, request/response schemas, and an interactive playground for testing endpoints.</p>
<h2 id="1-add-your-openapi-spec"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#1-add-your-openapi-spec"><span class="icon icon-link"></span></a>1. Add your OpenAPI spec</h2>
<p>Place your OpenAPI spec file (JSON or YAML) in your project:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>my-docs/</span></span>
<span class="line"><span>├── openapi.yaml      # Your API spec</span></span>
<span class="line"><span>├── tome.config.js</span></span>
<span class="line"><span>└── pages/</span></span></code></pre>
<h2 id="2-configure-tome"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#2-configure-tome"><span class="icon icon-link"></span></a>2. Configure Tome</h2>
<p>Add the <code>api</code> section to your config:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My API Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  api: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    spec: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"./openapi.yaml"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    playground: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    baseUrl: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"https://api.example.com"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    auth: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      type: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"bearer"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      header: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Authorization"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<h3 id="options"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#options"><span class="icon icon-link"></span></a>Options</h3>
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
<td>string</td>
<td>—</td>
<td>Path to your OpenAPI spec file (required)</td>
</tr>
<tr>
<td><code>playground</code></td>
<td>boolean</td>
<td><code>true</code></td>
<td>Enable the interactive API playground</td>
</tr>
<tr>
<td><code>baseUrl</code></td>
<td>string</td>
<td>—</td>
<td>Base URL for playground requests</td>
</tr>
<tr>
<td><code>auth.type</code></td>
<td>string</td>
<td>—</td>
<td>Auth type: <code>"bearer"</code>, <code>"apiKey"</code>, or <code>"oauth2"</code></td>
</tr>
<tr>
<td><code>auth.header</code></td>
<td>string</td>
<td>—</td>
<td>Header name for the auth token</td>
</tr>
</tbody>
</table>
<h2 id="3-view-the-reference"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#3-view-the-reference"><span class="icon icon-link"></span></a>3. View the reference</h2>
<p>Start the dev server and navigate to <code>/api</code>. Tome parses the spec and renders:</p>
<ul>
<li><strong>Endpoint groups</strong> organized by OpenAPI tags</li>
<li><strong>Request parameters</strong> with types, descriptions, and required markers</li>
<li><strong>Response schemas</strong> with expandable nested objects</li>
<li><strong>Code examples</strong> for <code>curl</code>, JavaScript, and Python</li>
</ul>
<h2 id="4-interactive-playground"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#4-interactive-playground"><span class="icon icon-link"></span></a>4. Interactive playground</h2>
<p>When <code>playground: true</code>, each endpoint includes a "Try It" panel where users can:</p>
<ul>
<li>Set path parameters and query strings</li>
<li>Edit the request body with JSON validation</li>
<li>Add authentication headers</li>
<li>Send requests and view formatted responses</li>
</ul>
<p>The playground sends requests directly from the browser, so CORS must be configured on your API server.</p>
<h2 id="supported-spec-formats"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#supported-spec-formats"><span class="icon icon-link"></span></a>Supported spec formats</h2>
<p>Tome supports OpenAPI 3.0 and 3.1 specifications in JSON or YAML format. Swagger 2.x specs are not supported — convert them with tools like <code>swagger2openapi</code>.</p>`,headings:[{depth:2,text:"1. Add your OpenAPI spec",id:"1-add-your-openapi-spec"},{depth:2,text:"2. Configure Tome",id:"2-configure-tome"},{depth:3,text:"Options",id:"options"},{depth:2,text:"3. View the reference",id:"3-view-the-reference"},{depth:2,text:"4. Interactive playground",id:"4-interactive-playground"},{depth:2,text:"Supported spec formats",id:"supported-spec-formats"}],raw:`
Tome can generate a full API reference from an OpenAPI 3.x specification. The reference includes endpoint documentation, request/response schemas, and an interactive playground for testing endpoints.

## 1. Add your OpenAPI spec

Place your OpenAPI spec file (JSON or YAML) in your project:

\`\`\`text
my-docs/
├── openapi.yaml      # Your API spec
├── tome.config.js
└── pages/
\`\`\`

## 2. Configure Tome

Add the \`api\` section to your config:

\`\`\`javascript
export default {
  name: "My API Docs",
  api: {
    spec: "./openapi.yaml",
    playground: true,
    baseUrl: "https://api.example.com",
    auth: {
      type: "bearer",
      header: "Authorization",
    },
  },
};
\`\`\`

### Options

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| \`spec\` | string | — | Path to your OpenAPI spec file (required) |
| \`playground\` | boolean | \`true\` | Enable the interactive API playground |
| \`baseUrl\` | string | — | Base URL for playground requests |
| \`auth.type\` | string | — | Auth type: \`"bearer"\`, \`"apiKey"\`, or \`"oauth2"\` |
| \`auth.header\` | string | — | Header name for the auth token |

## 3. View the reference

Start the dev server and navigate to \`/api\`. Tome parses the spec and renders:

- **Endpoint groups** organized by OpenAPI tags
- **Request parameters** with types, descriptions, and required markers
- **Response schemas** with expandable nested objects
- **Code examples** for \`curl\`, JavaScript, and Python

## 4. Interactive playground

When \`playground: true\`, each endpoint includes a "Try It" panel where users can:

- Set path parameters and query strings
- Edit the request body with JSON validation
- Add authentication headers
- Send requests and view formatted responses

The playground sends requests directly from the browser, so CORS must be configured on your API server.

## Supported spec formats

Tome supports OpenAPI 3.0 and 3.1 specifications in JSON or YAML format. Swagger 2.x specs are not supported — convert them with tools like \`swagger2openapi\`.
`};export{e as default};
