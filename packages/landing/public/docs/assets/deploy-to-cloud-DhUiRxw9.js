const e={frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1,toc:!0,draft:!1},html:`<p>Tome Cloud hosts your documentation site on a global CDN with automatic SSL, custom domains, and analytics. This tutorial covers the full deployment flow.</p>
<h2 id="prerequisites"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#prerequisites"><span class="icon icon-link"></span></a>Prerequisites</h2>
<ul>
<li>A Tome documentation project (see <a href="/docs/tutorials/first-site">Create your first site</a>)</li>
<li>Node.js 18+</li>
</ul>
<h2 id="1-authenticate"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#1-authenticate"><span class="icon icon-link"></span></a>1. Authenticate</h2>
<p>Log in to your Tome Cloud account:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> login</span></span></code></pre>
<p>Enter your email address. You'll receive a magic link — click it to authenticate. Your API token is stored locally for future deployments.</p>
<h2 id="2-deploy"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#2-deploy"><span class="icon icon-link"></span></a>2. Deploy</h2>
<p>From your project directory:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> deploy</span></span></code></pre>
<p>Tome builds your site, collects the output files, and uploads them using hash-based deduplication. Only changed files are transferred, making subsequent deploys fast.</p>
<p>After deployment, your site is live at:</p>
<pre><code>https://your-project.tome.center
</code></pre>
<h2 id="3-add-a-custom-domain"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#3-add-a-custom-domain"><span class="icon icon-link"></span></a>3. Add a custom domain</h2>
<p>Register a custom domain for your docs:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> domains:add</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> docs.example.com</span></span></code></pre>
<p>Tome returns DNS records you need to configure with your domain registrar:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span>Type:  CNAME</span></span>
<span class="line"><span>Name:  docs</span></span>
<span class="line"><span>Value: your-project.tome.center</span></span></code></pre>
<p>After configuring DNS, verify the domain:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> domains:verify</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> docs.example.com</span></span></code></pre>
<p>SSL is provisioned automatically once DNS propagates.</p>
<h2 id="4-manage-domains"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#4-manage-domains"><span class="icon icon-link"></span></a>4. Manage domains</h2>
<p>List all domains attached to your project:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> domains:list</span></span></code></pre>
<p>Remove a domain:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> tome</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> domains:remove</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> docs.example.com</span></span></code></pre>
<h2 id="deployment-details"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#deployment-details"><span class="icon icon-link"></span></a>Deployment details</h2>
<p>Each deploy creates an immutable snapshot. You can view deployment history and analytics in the Tome Dashboard.</p>
<table>
<thead>
<tr>
<th>Detail</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>CDN</td>
<td>Cloudflare R2 (global edge)</td>
</tr>
<tr>
<td>SSL</td>
<td>Automatic via Cloudflare</td>
</tr>
<tr>
<td>Deduplication</td>
<td>Content-hash based</td>
</tr>
<tr>
<td>Rollback</td>
<td>Deploy any previous snapshot</td>
</tr>
</tbody>
</table>
<h2 id="next-steps"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#next-steps"><span class="icon icon-link"></span></a>Next steps</h2>
<ul>
<li><strong><a href="/docs/guides/configuration">Configuration guide</a></strong> to customize your site before deploying</li>
<li><strong><a href="/docs/reference/cli">CLI reference</a></strong> for the full list of deployment commands</li>
</ul>`,headings:[{depth:2,text:"Prerequisites",id:"prerequisites"},{depth:2,text:"1. Authenticate",id:"1-authenticate"},{depth:2,text:"2. Deploy",id:"2-deploy"},{depth:2,text:"3. Add a custom domain",id:"3-add-a-custom-domain"},{depth:2,text:"4. Manage domains",id:"4-manage-domains"},{depth:2,text:"Deployment details",id:"deployment-details"},{depth:2,text:"Next steps",id:"next-steps"}],raw:`
Tome Cloud hosts your documentation site on a global CDN with automatic SSL, custom domains, and analytics. This tutorial covers the full deployment flow.

## Prerequisites

- A Tome documentation project (see [Create your first site](/docs/tutorials/first-site))
- Node.js 18+

## 1. Authenticate

Log in to your Tome Cloud account:

\`\`\`bash
npx tome login
\`\`\`

Enter your email address. You'll receive a magic link — click it to authenticate. Your API token is stored locally for future deployments.

## 2. Deploy

From your project directory:

\`\`\`bash
npx tome deploy
\`\`\`

Tome builds your site, collects the output files, and uploads them using hash-based deduplication. Only changed files are transferred, making subsequent deploys fast.

After deployment, your site is live at:

\`\`\`
https://your-project.tome.center
\`\`\`

## 3. Add a custom domain

Register a custom domain for your docs:

\`\`\`bash
npx tome domains:add docs.example.com
\`\`\`

Tome returns DNS records you need to configure with your domain registrar:

\`\`\`text
Type:  CNAME
Name:  docs
Value: your-project.tome.center
\`\`\`

After configuring DNS, verify the domain:

\`\`\`bash
npx tome domains:verify docs.example.com
\`\`\`

SSL is provisioned automatically once DNS propagates.

## 4. Manage domains

List all domains attached to your project:

\`\`\`bash
npx tome domains:list
\`\`\`

Remove a domain:

\`\`\`bash
npx tome domains:remove docs.example.com
\`\`\`

## Deployment details

Each deploy creates an immutable snapshot. You can view deployment history and analytics in the Tome Dashboard.

| Detail | Value |
|--------|-------|
| CDN | Cloudflare R2 (global edge) |
| SSL | Automatic via Cloudflare |
| Deduplication | Content-hash based |
| Rollback | Deploy any previous snapshot |

## Next steps

- **[Configuration guide](/docs/guides/configuration)** to customize your site before deploying
- **[CLI reference](/docs/reference/cli)** for the full list of deployment commands
`};export{e as default};
