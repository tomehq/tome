const n={frontmatter:{title:"Deploy to Tome Cloud",description:"Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.",icon:"cloud",hidden:!1,toc:!0,draft:!1},html:`<p>Tome Cloud hosts your documentation site on a global CDN with automatic SSL, custom domains, and analytics. This tutorial covers the full deployment flow.</p>
<h2 id="prerequisites"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#prerequisites"><span class="icon icon-link"></span></a>Prerequisites</h2>
<ul>
<li>A Tome documentation project (see <a href="/docs/tutorials/first-site">Create your first site</a>)</li>
<li>Node.js 20+</li>
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
<h2 id="5-automatic-deploys-with-cicd"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#5-automatic-deploys-with-cicd"><span class="icon icon-link"></span></a>5. Automatic deploys with CI/CD</h2>
<p>Projects created with <code>tome init</code> include a GitHub Actions workflow (<code>.github/workflows/deploy.yml</code>) that deploys automatically:</p>
<ul>
<li><strong>Push to main</strong> → production deploy</li>
<li><strong>Pull requests</strong> → preview deploy with a unique URL</li>
</ul>
<h3 id="setup"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#setup"><span class="icon icon-link"></span></a>Setup</h3>
<ol>
<li>Generate a deploy token by running <code>npx tome login</code>, then copy the token from <code>~/.tome/config</code></li>
<li>In your GitHub repository, go to <strong>Settings → Secrets and variables → Actions</strong></li>
<li>Create a secret named <code>TOME_TOKEN</code> with your deploy token</li>
</ol>
<p>That's it — every push to <code>main</code> triggers a production deploy, and every PR gets a preview URL.</p>
<h3 id="gitlab-ci"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#gitlab-ci"><span class="icon icon-link"></span></a>GitLab CI</h3>
<p>Create <code>.gitlab-ci.yml</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">deploy</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">  image</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">node:20</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">  script</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">npm ci</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">npm run build</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">npx tome deploy</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">  only</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">    - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">main</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">  variables</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">    TOME_TOKEN</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">$TOME_TOKEN</span></span></code></pre>
<p>Add <code>TOME_TOKEN</code> in <strong>Settings → CI/CD → Variables</strong>.</p>
<h3 id="bitbucket-pipelines"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#bitbucket-pipelines"><span class="icon icon-link"></span></a>Bitbucket Pipelines</h3>
<p>Add to <code>bitbucket-pipelines.yml</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">pipelines</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">  branches</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">    main</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">      - </span><span style="color:#22863A;--shiki-dark:#85E89D">step</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">          name</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Deploy docs</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">          image</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">node:20</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">          script</span><span style="color:#24292E;--shiki-dark:#E1E4E8">:</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">            - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">npm ci</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">            - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">npm run build</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">            - </span><span style="color:#032F62;--shiki-dark:#9ECBFF">npx tome deploy</span></span></code></pre>
<p>Add <code>TOME_TOKEN</code> in <strong>Repository settings → Pipelines → Variables</strong>.</p>
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
</ul>`,headings:[{depth:2,text:"Prerequisites",id:"prerequisites"},{depth:2,text:"1. Authenticate",id:"1-authenticate"},{depth:2,text:"2. Deploy",id:"2-deploy"},{depth:2,text:"3. Add a custom domain",id:"3-add-a-custom-domain"},{depth:2,text:"4. Manage domains",id:"4-manage-domains"},{depth:2,text:"5. Automatic deploys with CI/CD",id:"5-automatic-deploys-with-cicd"},{depth:3,text:"Setup",id:"setup"},{depth:3,text:"GitLab CI",id:"gitlab-ci"},{depth:3,text:"Bitbucket Pipelines",id:"bitbucket-pipelines"},{depth:2,text:"Deployment details",id:"deployment-details"},{depth:2,text:"Next steps",id:"next-steps"}],raw:`
Tome Cloud hosts your documentation site on a global CDN with automatic SSL, custom domains, and analytics. This tutorial covers the full deployment flow.

## Prerequisites

- A Tome documentation project (see [Create your first site](/docs/tutorials/first-site))
- Node.js 20+

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

## 5. Automatic deploys with CI/CD

Projects created with \`tome init\` include a GitHub Actions workflow (\`.github/workflows/deploy.yml\`) that deploys automatically:

- **Push to main** → production deploy
- **Pull requests** → preview deploy with a unique URL

### Setup

1. Generate a deploy token by running \`npx tome login\`, then copy the token from \`~/.tome/config\`
2. In your GitHub repository, go to **Settings → Secrets and variables → Actions**
3. Create a secret named \`TOME_TOKEN\` with your deploy token

That's it — every push to \`main\` triggers a production deploy, and every PR gets a preview URL.

### GitLab CI

Create \`.gitlab-ci.yml\`:

\`\`\`yaml
deploy:
  image: node:20
  script:
    - npm ci
    - npm run build
    - npx tome deploy
  only:
    - main
  variables:
    TOME_TOKEN: $TOME_TOKEN
\`\`\`

Add \`TOME_TOKEN\` in **Settings → CI/CD → Variables**.

### Bitbucket Pipelines

Add to \`bitbucket-pipelines.yml\`:

\`\`\`yaml
pipelines:
  branches:
    main:
      - step:
          name: Deploy docs
          image: node:20
          script:
            - npm ci
            - npm run build
            - npx tome deploy
\`\`\`

Add \`TOME_TOKEN\` in **Repository settings → Pipelines → Variables**.

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
`};export{n as default};
