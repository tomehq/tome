import{j as e}from"./index-BAkgIUFj.js";function t(a){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...a.components},{Callout:i}=n;return i||s("Callout"),e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["All site configuration lives in ",e.jsx(n.code,{children:"tome.config.js"})," (or ",e.jsx(n.code,{children:".mjs"})," / ",e.jsx(n.code,{children:".ts"}),") at your project root. Tome validates the config with Zod and provides clear error messages if anything is wrong."]}),`
`,e.jsx(n.h2,{children:"Minimal config"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`export default {
  name: "My Docs",
};
`})}),`
`,e.jsx(n.p,{children:"This is all you need. Tome uses sensible defaults for everything else."}),`
`,e.jsx(n.h2,{children:"Site metadata"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`export default {
  name: "My Docs",
  logo: "/logo.svg",        // Path relative to public/
  favicon: "/favicon.ico",  // Path relative to public/
  baseUrl: "https://docs.example.com",
};
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"baseUrl"})," is used for generating canonical URLs and analytics endpoints. It should be the full URL where your site is hosted."]}),`
`,e.jsx(n.h2,{children:"Navigation"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"navigation"})," array defines your sidebar structure. Each group has a label and a list of page IDs (filenames without extensions):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`navigation: [
  {
    group: "Getting Started",
    pages: ["index", "quickstart"],
  },
  {
    group: "API",
    pages: ["api/authentication", "api/endpoints", "api/errors"],
  },
],
`})}),`
`,e.jsx(n.p,{children:"Pages not listed in navigation still exist at their URL — they're just hidden from the sidebar."}),`
`,e.jsx(n.h3,{children:"Nested groups"}),`
`,e.jsx(n.p,{children:"Groups can be nested for complex documentation structures:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`navigation: [
  {
    group: "SDK",
    pages: [
      "sdk/overview",
      {
        group: "Languages",
        pages: ["sdk/javascript", "sdk/python", "sdk/go"],
      },
    ],
  },
],
`})}),`
`,e.jsx(n.h2,{children:"Top navigation"}),`
`,e.jsx(n.p,{children:"Add links to the header bar:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`topNav: [
  { label: "Blog", href: "https://blog.example.com" },
  { label: "Changelog", href: "/changelog" },
],
`})}),`
`,e.jsx(n.h2,{children:"Theme"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`theme: {
  preset: "editorial",   // "amber" or "editorial"
  accent: "#ff6b4a",     // Custom accent color (hex)
  mode: "auto",          // "light", "dark", or "auto"
  fonts: {
    heading: "Playfair Display",
    body: "Source Sans Pro",
    code: "Fira Code",
  },
},
`})}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(n.strong,{children:e.jsx(n.a,{href:"./theming",children:"Theming"})})," for full customization details."]}),`
`,e.jsx(n.h2,{children:"Base path"}),`
`,e.jsxs(n.p,{children:["If your docs are served under a subpath (e.g., ",e.jsx(n.code,{children:"example.com/docs/"}),"), set ",e.jsx(n.code,{children:"basePath"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`basePath: "/docs/",
`})}),`
`,e.jsxs(n.p,{children:["This configures Vite's ",e.jsx(n.code,{children:"base"})," option so all asset paths resolve correctly."]}),`
`,e.jsx(n.h2,{children:"Search"}),`
`,e.jsx(n.p,{children:"Pagefind is enabled by default with no configuration. To use Algolia DocSearch instead:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`search: {
  provider: "algolia",
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_SEARCH_KEY",
  indexName: "your-index",
},
`})}),`
`,e.jsx(n.h2,{children:"Banner"}),`
`,e.jsx(n.p,{children:"Display an announcement banner at the top of every page:"}),`
`,e.jsx(i,{type:"tip",title:"Live example",children:e.jsxs(n.p,{children:[`Look at the top of this page — the coral banner saying "New in v3" is a live banner configured in this site's `,e.jsx(n.code,{children:"tome.config.js"}),"."]})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`banner: {
  text: "v2.0 is now available!",
  link: "/changelog",         // Optional — makes the text a link
  dismissible: true,          // Default: true — shows a close button
},
`})}),`
`,e.jsxs(n.p,{children:["When a user dismisses the banner, it stays hidden until you change the text. Updating the ",e.jsx(n.code,{children:"text"})," value automatically shows the banner again for all users."]}),`
`,e.jsx(n.h2,{children:"Math rendering"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"```math"})," fenced code blocks for display math in both ",e.jsx(n.code,{children:".md"})," and ",e.jsx(n.code,{children:".mdx"})," files:"]}),`
`,e.jsx("div",{className:"tome-math tome-math-block","data-math":"RSA9IG1jXjI="}),`
`,e.jsx("div",{className:"tome-math tome-math-block","data-math":"XGludF97LVxpbmZ0eX1ee1xpbmZ0eX0gZV57LXheMn0gZHggPSBcc3FydHtccGl9"}),`
`,e.jsx(n.p,{children:"Math is rendered client-side with KaTeX loaded from CDN — no dependencies to install, no config flag needed. Just write the code block and it works."}),`
`,e.jsxs(n.p,{children:["For ",e.jsx(n.code,{children:".md"})," files, you can also enable inline math with ",e.jsx(n.code,{children:"$E = mc^2$"})," and display math with ",e.jsx(n.code,{children:"$$"})," blocks by setting:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`math: true,
`})}),`
`,e.jsx(n.h2,{children:"Mermaid diagrams"}),`
`,e.jsxs(n.p,{children:["Mermaid diagrams work out of the box with no configuration. Use a ",e.jsx(n.code,{children:"mermaid"})," code fence in any ",e.jsx(n.code,{children:".md"})," or ",e.jsx(n.code,{children:".mdx"})," file:"]}),`
`,e.jsx("div",{className:"tome-mermaid","data-mermaid":"Zmxvd2NoYXJ0IExSCiAgICBBWyJXcml0ZSBNYXJrZG93biJdIC0tPiBCWyJUb21lIGJ1aWxkcyJdCiAgICBCIC0tPiBDWyJCZWF1dGlmdWwgZG9jcyJd"}),`
`,e.jsx("div",{className:"tome-mermaid","data-mermaid":"c2VxdWVuY2VEaWFncmFtCiAgICBwYXJ0aWNpcGFudCBVc2VyCiAgICBwYXJ0aWNpcGFudCBUb21lCiAgICBwYXJ0aWNpcGFudCBDRE4KICAgIFVzZXItPj5Ub21lOiB0b21lIGJ1aWxkCiAgICBUb21lLT4+Q0ROOiBEZXBsb3kgc3RhdGljIGZpbGVzCiAgICBDRE4tLT4+VXNlcjogRmFzdCBkb2NzIHNpdGU="}),`
`,e.jsx(n.p,{children:"Diagrams are rendered client-side and automatically adapt to your site's light/dark theme. Colors, labels, and borders adjust for both light and dark mode with proper contrast."}),`
`,e.jsx(n.h2,{children:"Agent-friendly output"}),`
`,e.jsx(n.p,{children:"Tome automatically generates six machine-readable files at build time — no configuration needed:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"File"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"llms.txt"})}),e.jsx(n.td,{children:"Page index with titles, descriptions, and URLs"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"llms-full.txt"})}),e.jsx(n.td,{children:"Full raw Markdown content of all non-hidden pages"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"skill.md"})}),e.jsx(n.td,{children:"Agent capability file — site structure, available resources, and usage instructions"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"robots.txt"})}),e.jsx(n.td,{children:"Crawler directives — explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"search.json"})}),e.jsx(n.td,{children:"Structured page index with titles, headings, tags, and word counts"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"mcp.json"})}),e.jsx(n.td,{children:"MCP manifest with page metadata, headings, and optional content"})]})]})]}),`
`,e.jsxs(n.p,{children:["Every HTML page also gets ",e.jsx(n.strong,{children:"JSON-LD schema markup"})," injected into the ",e.jsx(n.code,{children:"<head>"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"WebSite"})," schema on the homepage (with ",e.jsx(n.code,{children:"SearchAction"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"TechArticle"})," schema on each documentation page"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Hidden pages (with ",e.jsx(n.code,{children:"hidden: true"})," in frontmatter) are excluded from all generated files."]}),`
`,e.jsx(n.h2,{children:"Full example"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`export default {
  name: "Acme Docs",
  logo: "/acme-logo.svg",
  favicon: "/favicon.ico",
  baseUrl: "https://docs.acme.com",
  theme: {
    preset: "editorial",
    accent: "#2563eb",
    mode: "auto",
  },
  navigation: [
    { group: "Overview", pages: ["index", "quickstart"] },
    { group: "Guides", pages: ["guides/auth", "guides/deploy"] },
    { group: "API", pages: ["api/rest", "api/webhooks"] },
  ],
  topNav: [
    { label: "Changelog", href: "/changelog" },
  ],
  search: { provider: "local" },
  banner: {
    text: "v2.0 is now available!",
    link: "/changelog",
    dismissible: true,
  },
  math: true,
};
`})})]})}function r(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(t,{...a})}):t(a)}function s(a,n){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}const o={frontmatter:{title:"Configuration",description:"How to configure your Tome site using tome.config.js — name, logo, navigation, theme, and more.",icon:"gear",hidden:!1,toc:!0,draft:!1},headings:[{depth:2,text:"Minimal config",id:"minimal-config"},{depth:2,text:"Site metadata",id:"site-metadata"},{depth:2,text:"Navigation",id:"navigation"},{depth:3,text:"Nested groups",id:"nested-groups"},{depth:2,text:"Top navigation",id:"top-navigation"},{depth:2,text:"Theme",id:"theme"},{depth:2,text:"Base path",id:"base-path"},{depth:2,text:"Search",id:"search"},{depth:2,text:"Banner",id:"banner"},{depth:2,text:"Math rendering",id:"math-rendering"},{depth:2,text:"Mermaid diagrams",id:"mermaid-diagrams"},{depth:2,text:"Agent-friendly output",id:"agent-friendly-output"},{depth:2,text:"Full example",id:"full-example"}]};export{r as default,o as meta};
