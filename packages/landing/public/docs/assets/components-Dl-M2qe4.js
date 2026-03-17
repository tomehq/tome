import{j as e}from"./index-BAkgIUFj.js";function u(s){const n={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components},{Accordion:o,Callout:l,Card:r,CardGrid:c,CardGroup:h,CodeSamples:p,FileTree:i,LinkCard:d,PackageManager:a,Steps:x,Tabs:m,TypeTable:j}=n;return o||t("Accordion"),l||t("Callout"),r||t("Card"),c||t("CardGrid"),h||t("CardGroup"),p||t("CodeSamples"),i||t("FileTree"),i.File||t("FileTree.File"),i.Folder||t("FileTree.Folder"),d||t("LinkCard"),a||t("PackageManager"),x||t("Steps"),m||t("Tabs"),j||t("TypeTable"),e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:["Tome includes a set of built-in components available in any ",e.jsx(n.code,{children:".mdx"})," file. No imports needed — they're injected automatically."]}),`
`,e.jsx(n.h2,{children:"Callout"}),`
`,e.jsx(n.p,{children:"Highlight important information with a styled callout:"}),`
`,e.jsx(l,{title:"Important",children:e.jsx(n.p,{children:"This is critical information that users should not miss."})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<Callout title="Important">
  This is critical information that users should not miss.
</Callout>
`})}),`
`,e.jsxs(n.p,{children:["Callouts support a ",e.jsx(n.code,{children:"type"})," prop for different styles:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Use case"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"info"})}),e.jsx(n.td,{children:"General information (default)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"warning"})}),e.jsx(n.td,{children:"Cautions and potential issues"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"error"})}),e.jsx(n.td,{children:"Critical warnings and breaking changes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"tip"})}),e.jsx(n.td,{children:"Helpful suggestions and best practices"})]})]})]}),`
`,e.jsx(l,{type:"warning",title:"Deprecation Notice",children:e.jsx(n.p,{children:"This API endpoint will be removed in v3.0."})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<Callout type="warning" title="Deprecation Notice">
  This API endpoint will be removed in v3.0.
</Callout>
`})}),`
`,e.jsx(n.h2,{children:"Tabs"}),`
`,e.jsx(n.p,{children:"Present content variants — useful for multiple languages or platform-specific instructions:"}),`
`,e.jsxs(m,{items:["npm","pnpm","yarn"],children:[e.jsx("div",{children:"npm install @tomehq/cli"}),e.jsx("div",{children:"pnpm add @tomehq/cli"}),e.jsx("div",{children:"yarn add @tomehq/cli"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<Tabs items={["npm", "pnpm", "yarn"]}>
  <div>npm install @tomehq/cli</div>
  <div>pnpm add @tomehq/cli</div>
  <div>yarn add @tomehq/cli</div>
</Tabs>
`})}),`
`,e.jsx(n.p,{children:"The active tab persists across page navigations within the same session."}),`
`,e.jsx(n.h2,{children:"Card"}),`
`,e.jsx(n.p,{children:"Link to related pages or external resources:"}),`
`,e.jsx(r,{title:"Quickstart",href:"./quickstart",children:e.jsx(n.p,{children:"Get up and running in under a minute."})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<Card title="Quickstart" href="./quickstart">
  Get up and running in under a minute.
</Card>
`})}),`
`,e.jsx(n.h3,{children:"Card group"}),`
`,e.jsx(n.p,{children:"Arrange cards in a responsive grid:"}),`
`,e.jsxs(h,{cols:3,children:[e.jsx(r,{title:"Setup",children:"Step 1"}),e.jsx(r,{title:"Configure",children:"Step 2"}),e.jsx(r,{title:"Deploy",children:"Step 3"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<CardGroup cols={3}>
  <Card title="Setup">Step 1</Card>
  <Card title="Configure">Step 2</Card>
  <Card title="Deploy">Step 3</Card>
</CardGroup>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"cols"})," prop accepts ",e.jsx(n.code,{children:"2"}),", ",e.jsx(n.code,{children:"3"}),", or ",e.jsx(n.code,{children:"4"}),". Defaults to ",e.jsx(n.code,{children:"2"}),"."]}),`
`,e.jsx(n.h2,{children:"Steps"}),`
`,e.jsx(n.p,{children:"Ordered procedural instructions with visual step indicators:"}),`
`,e.jsxs(x,{children:[e.jsxs("div",{children:[e.jsx(n.strong,{children:"Install dependencies"})," — Run ",e.jsx(n.code,{children:"npm install"})," in your project directory."]}),e.jsxs("div",{children:[e.jsx(n.strong,{children:"Configure"})," — Edit ",e.jsx(n.code,{children:"tome.config.js"})," with your settings."]}),e.jsxs("div",{children:[e.jsx(n.strong,{children:"Deploy"})," — Run ",e.jsx(n.code,{children:"tome deploy"})," to publish your site."]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:"<Steps>\n  <div>**Install dependencies** — Run `npm install` in your project directory.</div>\n  <div>**Configure** — Edit `tome.config.js` with your settings.</div>\n  <div>**Deploy** — Run `tome deploy` to publish your site.</div>\n</Steps>\n"})}),`
`,e.jsx(n.h2,{children:"Accordion"}),`
`,e.jsx(n.p,{children:"Collapsible content sections for FAQs or optional details:"}),`
`,e.jsx(o,{title:"How do I deploy?",children:e.jsxs(n.p,{children:["Run ",e.jsx(n.code,{children:"npx @tomehq/cli deploy"})," from your project directory. See the deployment guide for details."]})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<Accordion title="How do I deploy?">
  Run \`npx @tomehq/cli deploy\` from your project directory. See the deployment guide for details.
</Accordion>
`})}),`
`,e.jsx(n.p,{children:"Multiple accordions stack vertically. Only one opens at a time by default."}),`
`,e.jsx(n.h2,{children:"PackageManager"}),`
`,e.jsx(n.p,{children:"Display install commands across all package managers with automatic translation:"}),`
`,e.jsx(a,{command:"install @tomehq/cli"}),`
`,e.jsx(n.p,{children:"Pass any npm command string and Tome translates it for yarn, pnpm, and bun:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<PackageManager command="install @tomehq/cli" />
`})}),`
`,e.jsx(n.p,{children:"It works with dev dependencies too:"}),`
`,e.jsx(a,{command:"install -D vitest"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<PackageManager command="install -D vitest" />
`})}),`
`,e.jsx(n.h2,{children:"TypeTable"}),`
`,e.jsx(n.p,{children:"Document TypeScript interfaces and prop types with a structured table:"}),`
`,e.jsx(j,{name:"TomeConfig",fields:[{name:"name",type:"string",required:!0,description:"Your documentation site name"},{name:"theme",type:"ThemeConfig",required:!1,default:'{ preset: "amber" }',description:"Theme and appearance settings"},{name:"navigation",type:"NavGroup[]",required:!0,description:"Sidebar navigation structure"},{name:"math",type:"boolean",required:!1,default:"false",description:"Enable KaTeX math rendering"},{name:"banner",type:"BannerConfig",required:!1,description:"Top-of-page announcement banner"}]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<TypeTable
  name="TomeConfig"
  fields={[
    { name: "name", type: "string", required: true, description: "Site name" },
    { name: "theme", type: "ThemeConfig", default: '{ preset: "amber" }', description: "Theme settings" },
    { name: "math", type: "boolean", default: "false", description: "Enable KaTeX" },
  ]}
/>
`})}),`
`,e.jsx(n.h2,{children:"FileTree"}),`
`,e.jsx(n.p,{children:"Visualize directory structures with collapsible folders:"}),`
`,e.jsxs(i,{children:[e.jsxs(i.Folder,{name:"pages",defaultOpen:!0,children:[e.jsx(i.File,{name:"index.md"}),e.jsx(i.File,{name:"quickstart.mdx"}),e.jsxs(i.Folder,{name:"guides",children:[e.jsx(i.File,{name:"setup.md"}),e.jsx(i.File,{name:"deploy.md"})]})]}),e.jsx(i.Folder,{name:".tome",children:e.jsx(i.File,{name:"entry.tsx"})}),e.jsx(i.File,{name:"tome.config.js"}),e.jsx(i.File,{name:"package.json"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<FileTree>
  <FileTree.Folder name="pages" defaultOpen>
    <FileTree.File name="index.md" />
    <FileTree.File name="quickstart.mdx" />
    <FileTree.Folder name="guides">
      <FileTree.File name="setup.md" />
      <FileTree.File name="deploy.md" />
    </FileTree.Folder>
  </FileTree.Folder>
  <FileTree.File name="tome.config.js" />
</FileTree>
`})}),`
`,e.jsxs(n.p,{children:["Click any folder to expand or collapse it. Use ",e.jsx(n.code,{children:"defaultOpen"})," to start a folder in the expanded state."]}),`
`,e.jsx(n.h2,{children:"LinkCard"}),`
`,e.jsxs(n.p,{children:["A card component that links to another page or URL. Use ",e.jsx(n.code,{children:"CardGrid"})," to arrange multiple cards in a responsive grid."]}),`
`,e.jsx(d,{title:"Getting Started",description:"Learn the basics of Tome",href:"./quickstart"}),`
`,e.jsxs(c,{children:[e.jsx(d,{title:"Configuration",description:"Customize your site",href:"./configuration"}),e.jsx(d,{title:"Theming",description:"Change colors and fonts",href:"./theming"}),e.jsx(d,{title:"Components",description:"Built-in MDX components",href:"./components"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<LinkCard title="Getting Started" description="Learn the basics of Tome" href="/quickstart" />

<CardGrid>
  <LinkCard title="Configuration" description="Customize your site" href="/configuration" />
  <LinkCard title="Theming" description="Change colors and fonts" href="/theming" />
  <LinkCard title="Components" description="Built-in MDX components" href="/components" />
</CardGrid>
`})}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Required"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"title"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Card heading text"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"description"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"Short description below the title"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"href"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Link destination (page path or URL)"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"CardGrid"})," renders children in a responsive 2–3 column grid."]}),`
`,e.jsx(n.h2,{children:"CodeSamples"}),`
`,e.jsx(n.p,{children:"Display tabbed code samples, typically used for showing API calls in multiple languages."}),`
`,e.jsx(p,{samples:[{label:"cURL",language:"bash",code:"curl -X GET https://api.example.com/users"},{label:"JavaScript",language:"js",code:'const res = await fetch("https://api.example.com/users")'},{label:"Python",language:"python",code:'requests.get("https://api.example.com/users")'}]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<CodeSamples
  samples={[
    { label: "cURL", language: "bash", code: 'curl -X GET https://api.example.com/users' },
    { label: "JavaScript", language: "js", code: 'const res = await fetch("https://api.example.com/users")' },
    { label: "Python", language: "python", code: 'requests.get("https://api.example.com/users")' },
  ]}
/>
`})}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Required"}),e.jsx(n.th,{children:"Description"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"samples"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"{ label: string, language: string, code: string }[]"})}),e.jsx(n.td,{children:"Yes"}),e.jsx(n.td,{children:"Array of code samples to display as tabs"})]})})]}),`
`,e.jsx(n.h2,{children:"Using components"}),`
`,e.jsxs(n.p,{children:["Components are only available in ",e.jsx(n.code,{children:".mdx"})," files. If your file uses the ",e.jsx(n.code,{children:".md"})," extension, rename it to ",e.jsx(n.code,{children:".mdx"})," to enable component support."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`pages/
├── index.md          # Standard Markdown only
├── quickstart.mdx    # Markdown + components
`})}),`
`,e.jsx(n.p,{children:"No import statements are needed. Tome injects all built-in components automatically:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`---
title: Getting Started
---

# Getting Started

<Callout type="tip" title="Prerequisites">
  Make sure you have Node.js 20+ installed.
</Callout>

<Steps>
  <Step title="Create project">
    Run \`npx @tomehq/cli init my-docs\`
  </Step>
  <Step title="Start dev server">
    Run \`npm run dev\`
  </Step>
</Steps>
`})})]})}function f(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(u,{...s})}):u(s)}function t(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}const y={frontmatter:{title:"Components",description:"Built-in MDX components — Callout, Tabs, Card, Steps, Accordion, PackageManager, TypeTable, FileTree, and more.",icon:"puzzle",hidden:!1,toc:!0,draft:!1},headings:[{depth:2,text:"Callout",id:"callout"},{depth:2,text:"Tabs",id:"tabs"},{depth:2,text:"Card",id:"card"},{depth:3,text:"Card group",id:"card-group"},{depth:2,text:"Steps",id:"steps"},{depth:2,text:"Accordion",id:"accordion"},{depth:2,text:"PackageManager",id:"packagemanager"},{depth:2,text:"TypeTable",id:"typetable"},{depth:2,text:"FileTree",id:"filetree"},{depth:2,text:"LinkCard",id:"linkcard"},{depth:2,text:"CodeSamples",id:"codesamples"},{depth:2,text:"Using components",id:"using-components"}]};export{f as default,y as meta};
