import{j as e}from"./index-C798uOFm.js";function t(o){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o.components},{Card:r,CardGroup:s}=n;return r||i("Card"),s||i("CardGroup"),e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"Tome"}),`
`,e.jsxs(s,{cols:2,children:[e.jsx(r,{title:"Tutorials",href:"./tutorials/first-site",icon:"book",children:e.jsx(n.p,{children:"Step-by-step walkthroughs to get started and deploy your first site."})}),e.jsx(r,{title:"Guides",href:"./guides/search",icon:"compass",children:e.jsx(n.p,{children:"How-to recipes for search, theming, migration, and more."})}),e.jsx(r,{title:"Reference",href:"./reference/cli",icon:"terminal",children:e.jsx(n.p,{children:"Complete specs for config, CLI, components, and frontmatter."})}),e.jsx(r,{title:"Concepts",href:"./concepts/architecture",icon:"lightbulb",children:e.jsx(n.p,{children:"Architecture, file routing, and how Tome works under the hood."})})]}),`
`,e.jsx(n.h2,{children:"What is Tome?"}),`
`,e.jsxs(n.p,{children:["Tome transforms your Markdown and MDX files into stunning, fully-searchable documentation sites. It handles navigation, theming, API references, code highlighting, and versioning — all from a simple folder of ",e.jsx(n.code,{children:".md"})," and ",e.jsx(n.code,{children:".mdx"})," files."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"OPEN SOURCE FOREVER"})}),`
`,e.jsx(n.p,{children:"Tome is MIT licensed. No vendor lock-in, no surprise pricing changes, no feature gates. Your docs are yours."}),`
`]}),`
`,e.jsx(n.h2,{children:"Why Tome?"}),`
`,e.jsx(n.p,{children:"Documentation platforms have become unreasonably expensive. Most charge hundreds per month for features that should be table stakes. Want custom domains? Pay more. Need versioning? Upgrade your plan. Multiple projects? That'll be $250/month — per project."}),`
`,e.jsx(n.p,{children:"We built Tome because we thought that was absurd. Every developer and team deserves polished, professional documentation without paying a premium for basic functionality. Tome gives you everything you need for free when self-hosted, or at a fraction of the cost on our cloud."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# Get started in 30 seconds
npx @tomehq/cli init my-docs
cd my-docs && npm install && npm run dev
`})}),`
`,e.jsx(n.h2,{children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Markdown and MDX"})," — Write docs in ",e.jsx(n.code,{children:".md"})," or use ",e.jsx(n.code,{children:".mdx"})," for interactive components like tabs, callouts, and code playgrounds."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"File-system routing"})," — Drop files into ",e.jsx(n.code,{children:"pages/"})," and they become pages. No router config, no manifest files."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Built-in components"})," — Callouts, tabs, cards, steps, accordions, and API playgrounds work out of the box."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Four theme presets"})," — Amber, Editorial, Cipher, and Mint. Each with light and dark mode support."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Search included"})," — Pagefind indexes your site at build time. No external service required."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"API reference"})," — Point Tome at an OpenAPI spec and get a rendered reference with an interactive playground."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Versioning"})," — Maintain multiple documentation versions side by side with a version switcher."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"i18n"})," — Serve docs in multiple languages with locale-based routing."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Agent-friendly"})," — Every build generates ",e.jsx(n.code,{children:"llms.txt"}),", ",e.jsx(n.code,{children:"skill.md"}),", ",e.jsx(n.code,{children:"robots.txt"}),", ",e.jsx(n.code,{children:"search.json"}),", ",e.jsx(n.code,{children:"mcp.json"}),", and JSON-LD schema markup. Your docs work for humans and machines."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mermaid and math"})," — Diagrams and LaTeX math render in both ",e.jsx(n.code,{children:".md"})," and ",e.jsx(n.code,{children:".mdx"})," files with zero config."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Deploy anywhere"})," — Static output works on Vercel, Netlify, Cloudflare Pages, or Tome Cloud."]}),`
`]})]})}function c(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}function i(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}const l={frontmatter:{title:"Introduction",description:"Tome is an open-source documentation platform for Markdown and MDX. Beautiful docs without the $250/month price tag.",hidden:!1,toc:!0,draft:!1},headings:[{depth:2,text:"What is Tome?",id:"what-is-tome"},{depth:2,text:"Why Tome?",id:"why-tome"},{depth:2,text:"Features",id:"features"}]};export{c as default,l as meta};
