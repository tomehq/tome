const e={frontmatter:{title:"Draft Pages",description:"Mark pages as drafts to hide them from production builds while keeping them visible in development.",icon:"eye-off",hidden:!1,toc:!0,draft:!1},html:`<p>Tome supports draft pages — content that is visible during local development but automatically excluded from production builds. This is useful for work-in-progress content, internal notes, or pages you want to preview before publishing.</p>
<h2 id="marking-a-page-as-a-draft"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#marking-a-page-as-a-draft"><span class="icon icon-link"></span></a>Marking a page as a draft</h2>
<p>Add <code>draft: true</code> to the page's frontmatter:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">title</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">Upcoming Feature</span></span>
<span class="line"><span style="color:#22863A;--shiki-dark:#85E89D">draft</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">true</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">This page is a work in progress. It won't appear in production.</span></span></code></pre>
<p>That's it. No other configuration is needed.</p>
<h2 id="how-drafts-behave"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#how-drafts-behave"><span class="icon icon-link"></span></a>How drafts behave</h2>
<h3 id="development-tome-dev"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#development-tome-dev"><span class="icon icon-link"></span></a>Development (<code>tome dev</code>)</h3>
<p>Draft pages are <strong>included</strong> in development. They appear in the sidebar navigation and are fully routable. A yellow banner is shown at the top of the page:</p>
<blockquote>
<p>Draft — This page is only visible in development</p>
</blockquote>
<p>This makes it easy to tell at a glance which pages are drafts while you work.</p>
<h3 id="production-tome-build"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#production-tome-build"><span class="icon icon-link"></span></a>Production (<code>tome build</code>)</h3>
<p>Draft pages are <strong>excluded</strong> from production builds:</p>
<ul>
<li>Removed from the sidebar navigation</li>
<li>Removed from the route manifest (no URL is generated)</li>
<li>Excluded from <code>llms.txt</code> and <code>search.json</code></li>
<li>Not included in the page loader bundle</li>
</ul>
<p>If someone navigates to a draft page's URL in production, they'll get a 404.</p>
<h2 id="use-cases"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#use-cases"><span class="icon icon-link"></span></a>Use cases</h2>
<p><strong>Work-in-progress content.</strong> Start writing a new guide and set <code>draft: true</code>. Preview it locally, share the dev URL with teammates, then remove the flag when it's ready.</p>
<p><strong>Internal notes.</strong> Keep internal-only pages (runbooks, architecture decisions) as permanent drafts so they never leak into the public site.</p>
<p><strong>Staged launches.</strong> Write docs for an upcoming feature ahead of time. When the feature ships, remove <code>draft: true</code> from all related pages and redeploy.</p>
<h2 id="combining-with-hidden"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#combining-with-hidden"><span class="icon icon-link"></span></a>Combining with <code>hidden</code></h2>
<p>Drafts and hidden pages are different:</p>
<table>
<thead>
<tr>
<th>Frontmatter</th>
<th>Dev sidebar</th>
<th>Dev URL</th>
<th>Prod sidebar</th>
<th>Prod URL</th>
</tr>
</thead>
<tbody>
<tr>
<td><em>(default)</em></td>
<td>Visible</td>
<td>Works</td>
<td>Visible</td>
<td>Works</td>
</tr>
<tr>
<td><code>hidden: true</code></td>
<td>Hidden</td>
<td>Works</td>
<td>Hidden</td>
<td>Works</td>
</tr>
<tr>
<td><code>draft: true</code></td>
<td>Visible</td>
<td>Works</td>
<td>Hidden</td>
<td>404</td>
</tr>
</tbody>
</table>
<p>Use <code>hidden</code> for pages that should exist in production but not appear in navigation (e.g., linked from other pages). Use <code>draft</code> for pages that should not exist in production at all.</p>`,headings:[{depth:2,text:"Marking a page as a draft",id:"marking-a-page-as-a-draft"},{depth:2,text:"How drafts behave",id:"how-drafts-behave"},{depth:3,text:"Development (tome dev)",id:"development-tome-dev"},{depth:3,text:"Production (tome build)",id:"production-tome-build"},{depth:2,text:"Use cases",id:"use-cases"},{depth:2,text:"Combining with hidden",id:"combining-with-hidden"}],raw:`
Tome supports draft pages — content that is visible during local development but automatically excluded from production builds. This is useful for work-in-progress content, internal notes, or pages you want to preview before publishing.

## Marking a page as a draft

Add \`draft: true\` to the page's frontmatter:

\`\`\`markdown
---
title: Upcoming Feature
draft: true
---

This page is a work in progress. It won't appear in production.
\`\`\`

That's it. No other configuration is needed.

## How drafts behave

### Development (\`tome dev\`)

Draft pages are **included** in development. They appear in the sidebar navigation and are fully routable. A yellow banner is shown at the top of the page:

> Draft — This page is only visible in development

This makes it easy to tell at a glance which pages are drafts while you work.

### Production (\`tome build\`)

Draft pages are **excluded** from production builds:

- Removed from the sidebar navigation
- Removed from the route manifest (no URL is generated)
- Excluded from \`llms.txt\` and \`search.json\`
- Not included in the page loader bundle

If someone navigates to a draft page's URL in production, they'll get a 404.

## Use cases

**Work-in-progress content.** Start writing a new guide and set \`draft: true\`. Preview it locally, share the dev URL with teammates, then remove the flag when it's ready.

**Internal notes.** Keep internal-only pages (runbooks, architecture decisions) as permanent drafts so they never leak into the public site.

**Staged launches.** Write docs for an upcoming feature ahead of time. When the feature ships, remove \`draft: true\` from all related pages and redeploy.

## Combining with \`hidden\`

Drafts and hidden pages are different:

| Frontmatter | Dev sidebar | Dev URL | Prod sidebar | Prod URL |
|-------------|-------------|---------|-------------- |----------|
| *(default)* | Visible | Works | Visible | Works |
| \`hidden: true\` | Hidden | Works | Hidden | Works |
| \`draft: true\` | Visible | Works | Hidden | 404 |

Use \`hidden\` for pages that should exist in production but not appear in navigation (e.g., linked from other pages). Use \`draft\` for pages that should not exist in production at all.
`};export{e as default};
