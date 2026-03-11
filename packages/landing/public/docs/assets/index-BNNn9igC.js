const e={frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1,toc:!0},html:`<h1 id="tome"><a class="heading-anchor" aria-hidden tabindex="-1" href="#tome"><span class="icon icon-link"></span></a>Tome</h1>
<p>Welcome to Tome — beautiful documentation, zero vendor lock-in.</p>
<hr>
<p>Tome is an open-source documentation platform built for developers who believe great docs shouldn't cost $250/month. Write in Markdown or MDX, deploy anywhere, and own your content forever.</p>
<h2 id="what-is-tome"><a class="heading-anchor" aria-hidden tabindex="-1" href="#what-is-tome"><span class="icon icon-link"></span></a>What is Tome?</h2>
<p>Tome transforms your Markdown and MDX files into stunning, fully-searchable documentation sites. It handles navigation, theming, API references, code highlighting, and versioning — all from a simple folder of <code>.md</code> and <code>.mdx</code> files.</p>
<blockquote>
<p><strong>OPEN SOURCE FOREVER</strong></p>
<p>Tome is MIT licensed. No vendor lock-in, no surprise pricing changes, no feature gates. Your docs are yours.</p>
</blockquote>
<h2 id="why-tome"><a class="heading-anchor" aria-hidden tabindex="-1" href="#why-tome"><span class="icon icon-link"></span></a>Why Tome?</h2>
<p>Documentation platforms have become unreasonably expensive. Most charge hundreds per month for features that should be table stakes. Want custom domains? Pay more. Need versioning? Upgrade your plan. Multiple projects? That'll be $250/month — per project.</p>
<p>We built Tome because we thought that was absurd. Every developer and team deserves polished, professional documentation without paying a premium for basic functionality. Tome gives you everything you need for free when self-hosted, or at a fraction of the cost on our cloud.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D"># Get started in 30 seconds</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npx</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @tomehq/cli</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> init</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-docs</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#79B8FF">cd</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> my-docs</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> &#x26;#x26;&#x26;#x26; npm install &#x26;#x26;&#x26;#x26; npm run dev</span></span></code></pre>
<h2 id="features"><a class="heading-anchor" aria-hidden tabindex="-1" href="#features"><span class="icon icon-link"></span></a>Features</h2>
<ul>
<li><strong>Markdown and MDX</strong> — Write docs in <code>.md</code> or use <code>.mdx</code> for interactive components like tabs, callouts, and code playgrounds.</li>
<li><strong>File-system routing</strong> — Drop files into <code>pages/</code> and they become pages. No router config, no manifest files.</li>
<li><strong>Built-in components</strong> — Callouts, tabs, cards, steps, accordions, and API playgrounds work out of the box.</li>
<li><strong>Two theme presets</strong> — Ship with a warm amber aesthetic or an editorial brutalist look. Both support dark mode.</li>
<li><strong>Search included</strong> — Pagefind indexes your site at build time. No external service required.</li>
<li><strong>API reference</strong> — Point Tome at an OpenAPI spec and get a rendered reference with an interactive playground.</li>
<li><strong>Versioning</strong> — Maintain multiple documentation versions side by side with a version switcher.</li>
<li><strong>i18n</strong> — Serve docs in multiple languages with locale-based routing.</li>
<li><strong>Deploy anywhere</strong> — Static output works on Vercel, Netlify, Cloudflare Pages, or Tome Cloud.</li>
</ul>
<h2 id="learn-more"><a class="heading-anchor" aria-hidden tabindex="-1" href="#learn-more"><span class="icon icon-link"></span></a>Learn more</h2>
<ul>
<li><strong><a href="#quickstart">Quickstart</a></strong> — Get a docs site running in under a minute.</li>
<li><strong><a href="#installation">Installation</a></strong> — Detailed setup instructions and prerequisites.</li>
<li><strong><a href="#configuration">Configuration</a></strong> — Customize your site name, navigation, theme, and more.</li>
<li><strong><a href="#cli">CLI Reference</a></strong> — Every command and flag available in the <code>tome</code> CLI.</li>
</ul>`,headings:[{depth:2,text:"What is Tome?",id:"what-is-tome"},{depth:2,text:"Why Tome?",id:"why-tome"},{depth:2,text:"Features",id:"features"},{depth:2,text:"Learn more",id:"learn-more"}],raw:`
# Tome

Welcome to Tome — beautiful documentation, zero vendor lock-in.

---

Tome is an open-source documentation platform built for developers who believe great docs shouldn't cost $250/month. Write in Markdown or MDX, deploy anywhere, and own your content forever.

## What is Tome?

Tome transforms your Markdown and MDX files into stunning, fully-searchable documentation sites. It handles navigation, theming, API references, code highlighting, and versioning — all from a simple folder of \`.md\` and \`.mdx\` files.

> **OPEN SOURCE FOREVER**
>
> Tome is MIT licensed. No vendor lock-in, no surprise pricing changes, no feature gates. Your docs are yours.

## Why Tome?

Documentation platforms have become unreasonably expensive. Most charge hundreds per month for features that should be table stakes. Want custom domains? Pay more. Need versioning? Upgrade your plan. Multiple projects? That'll be $250/month — per project.

We built Tome because we thought that was absurd. Every developer and team deserves polished, professional documentation without paying a premium for basic functionality. Tome gives you everything you need for free when self-hosted, or at a fraction of the cost on our cloud.

\`\`\`bash
# Get started in 30 seconds
npx @tomehq/cli init my-docs
cd my-docs && npm install && npm run dev
\`\`\`

## Features

- **Markdown and MDX** — Write docs in \`.md\` or use \`.mdx\` for interactive components like tabs, callouts, and code playgrounds.
- **File-system routing** — Drop files into \`pages/\` and they become pages. No router config, no manifest files.
- **Built-in components** — Callouts, tabs, cards, steps, accordions, and API playgrounds work out of the box.
- **Two theme presets** — Ship with a warm amber aesthetic or an editorial brutalist look. Both support dark mode.
- **Search included** — Pagefind indexes your site at build time. No external service required.
- **API reference** — Point Tome at an OpenAPI spec and get a rendered reference with an interactive playground.
- **Versioning** — Maintain multiple documentation versions side by side with a version switcher.
- **i18n** — Serve docs in multiple languages with locale-based routing.
- **Deploy anywhere** — Static output works on Vercel, Netlify, Cloudflare Pages, or Tome Cloud.

## Learn more

- **[Quickstart](#quickstart)** — Get a docs site running in under a minute.
- **[Installation](#installation)** — Detailed setup instructions and prerequisites.
- **[Configuration](#configuration)** — Customize your site name, navigation, theme, and more.
- **[CLI Reference](#cli)** — Every command and flag available in the \`tome\` CLI.
`};export{e as default};
