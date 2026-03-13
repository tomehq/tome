const s={frontmatter:{title:"Authentication",description:"Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.",icon:"lock",hidden:!1,toc:!0},html:`<p>The API playground supports several authentication methods. Users can enter credentials that are included in test requests.</p>
<h2 id="configuration"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#configuration"><span class="icon icon-link"></span></a>Configuration</h2>
<p>Add auth settings to your API config:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  api: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    spec: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"./openapi.yaml"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    playground: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      enabled: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      auth: {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">        type: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"bearer"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// "bearer", "apiKey", or "basic"</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<h2 id="bearer-token"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#bearer-token"><span class="icon icon-link"></span></a>Bearer token</h2>
<p>The most common pattern for modern APIs. A token input appears in the playground header:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">auth</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"bearer"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>Requests include the header:</p>
<pre><code>Authorization: Bearer &lt;user-entered-token&gt;
</code></pre>
<h2 id="api-key"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#api-key"><span class="icon icon-link"></span></a>API key</h2>
<p>For APIs that use key-based authentication:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">auth</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"apiKey"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  name</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"X-API-Key"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,     </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Header name</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  in</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"header"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,          </span><span style="color:#6A737D;--shiki-dark:#6A737D">// "header" or "query"</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>When <code>in</code> is <code>"query"</code>, the key is appended as a URL parameter instead.</p>
<h2 id="basic-auth"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#basic-auth"><span class="icon icon-link"></span></a>Basic auth</h2>
<p>For username/password authentication:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">auth</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"basic"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>The playground shows username and password fields. The value is sent as a Base64-encoded <code>Authorization: Basic</code> header.</p>
<h2 id="openapi-security-schemes"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#openapi-security-schemes"><span class="icon icon-link"></span></a>OpenAPI security schemes</h2>
<p>If your OpenAPI spec defines security schemes, Tome reads them automatically:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">components</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">  securitySchemes</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">    BearerAuth</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      type</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">http</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      scheme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">bearer</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">    ApiKeyAuth</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      type</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">apiKey</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      in</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">header</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">      name</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">X-API-Key</span></span></code></pre>
<p>When security schemes are defined in the spec, Tome uses them instead of the manual config. You don't need to configure <code>auth</code> separately.</p>
<h2 id="security-notes"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#security-notes"><span class="icon icon-link"></span></a>Security notes</h2>
<ul>
<li>Credentials entered in the playground are stored only in browser memory for the current session</li>
<li>Credentials are never sent to Tome's servers — requests go directly from the browser to your API</li>
<li>CORS must be enabled on your API server for playground requests to work</li>
<li>For production APIs, consider providing a sandbox environment URL through the <code>baseUrl</code> config</li>
</ul>`,headings:[{depth:2,text:"Configuration",id:"configuration"},{depth:2,text:"Bearer token",id:"bearer-token"},{depth:2,text:"API key",id:"api-key"},{depth:2,text:"Basic auth",id:"basic-auth"},{depth:2,text:"OpenAPI security schemes",id:"openapi-security-schemes"},{depth:2,text:"Security notes",id:"security-notes"}],raw:`
The API playground supports several authentication methods. Users can enter credentials that are included in test requests.

## Configuration

Add auth settings to your API config:

\`\`\`javascript
export default {
  api: {
    spec: "./openapi.yaml",
    playground: {
      enabled: true,
      auth: {
        type: "bearer",  // "bearer", "apiKey", or "basic"
      },
    },
  },
};
\`\`\`

## Bearer token

The most common pattern for modern APIs. A token input appears in the playground header:

\`\`\`javascript
auth: {
  type: "bearer",
}
\`\`\`

Requests include the header:
\`\`\`
Authorization: Bearer <user-entered-token>
\`\`\`

## API key

For APIs that use key-based authentication:

\`\`\`javascript
auth: {
  type: "apiKey",
  name: "X-API-Key",     // Header name
  in: "header",          // "header" or "query"
}
\`\`\`

When \`in\` is \`"query"\`, the key is appended as a URL parameter instead.

## Basic auth

For username/password authentication:

\`\`\`javascript
auth: {
  type: "basic",
}
\`\`\`

The playground shows username and password fields. The value is sent as a Base64-encoded \`Authorization: Basic\` header.

## OpenAPI security schemes

If your OpenAPI spec defines security schemes, Tome reads them automatically:

\`\`\`yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
\`\`\`

When security schemes are defined in the spec, Tome uses them instead of the manual config. You don't need to configure \`auth\` separately.

## Security notes

- Credentials entered in the playground are stored only in browser memory for the current session
- Credentials are never sent to Tome's servers — requests go directly from the browser to your API
- CORS must be enabled on your API server for playground requests to work
- For production APIs, consider providing a sandbox environment URL through the \`baseUrl\` config
`};export{s as default};
