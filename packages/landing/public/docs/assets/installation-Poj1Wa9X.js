import{j as e}from"./index-BAkgIUFj.js";function d(r){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components},{FileTree:t,PackageManager:i}=n;return t||s("FileTree"),t.File||s("FileTree.File"),t.Folder||s("FileTree.Folder"),i||s("PackageManager"),e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"Tome requires Node.js and works with npm, pnpm, yarn, or bun."}),`
`,e.jsx(n.h2,{children:"Prerequisites"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Requirement"}),e.jsx(n.th,{children:"Minimum"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Node.js"}),e.jsx(n.td,{children:"20.0 or higher"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Package manager"}),e.jsx(n.td,{children:"npm, pnpm, yarn, or bun"})]})]})]}),`
`,e.jsx(n.h2,{children:"Create a new project"}),`
`,e.jsx(n.p,{children:"The fastest way to start is with the CLI:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npx @tomehq/cli init my-docs
`})}),`
`,e.jsx(n.p,{children:"This creates a new directory with everything you need:"}),`
`,e.jsx(t,{children:e.jsxs(t.Folder,{name:"my-docs",defaultOpen:!0,children:[e.jsxs(t.Folder,{name:"pages",defaultOpen:!0,children:[e.jsx(t.File,{name:"index.md"}),e.jsx(t.File,{name:"quickstart.md"}),e.jsx(t.File,{name:"components.mdx"})]}),e.jsx(t.Folder,{name:".tome",children:e.jsx(t.File,{name:"entry.tsx"})}),e.jsx(t.File,{name:"tome.config.js"}),e.jsx(t.File,{name:"index.html"}),e.jsx(t.File,{name:"package.json"}),e.jsx(t.File,{name:".gitignore"})]})}),`
`,e.jsx(n.h2,{children:"Install dependencies"}),`
`,e.jsx(i,{command:"install"}),`
`,e.jsx(n.h2,{children:"Start the dev server"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run dev
`})}),`
`,e.jsxs(n.p,{children:["The dev server starts at ",e.jsx(n.code,{children:"http://localhost:3000"})," with hot reload enabled. Changes to any ",e.jsx(n.code,{children:".md"})," or ",e.jsx(n.code,{children:".mdx"})," file in ",e.jsx(n.code,{children:"pages/"})," trigger an instant refresh. Config changes in ",e.jsx(n.code,{children:"tome.config.js"})," trigger a full reload."]}),`
`,e.jsx(n.h2,{children:"Add to an existing project"}),`
`,e.jsx(n.p,{children:"If you already have a project and want to add Tome documentation:"}),`
`,e.jsx(i,{command:"install @tomehq/cli @tomehq/theme react react-dom"}),`
`,e.jsx(n.p,{children:"Create the required files:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"tome.config.js"})})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`export default {
  name: "My Project Docs",
  navigation: [
    { group: "Docs", pages: ["index"] },
  ],
};
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"pages/index.md"})})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-markdown",children:`---
title: Introduction
---

# Welcome

Your documentation starts here.
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"index.html"})})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Docs</title>
</head>
<body>
  <div id="tome-root"></div>
  <script type="module" src=".tome/entry.tsx"><\/script>
</body>
</html>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:".tome/entry.tsx"})})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import "@tomehq/theme/entry";
`})}),`
`,e.jsxs(n.p,{children:["Add scripts to ",e.jsx(n.code,{children:"package.json"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
  "scripts": {
    "dev": "tome dev",
    "build": "tome build"
  }
}
`})}),`
`,e.jsx(n.h2,{children:"Next steps"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"./project-structure",children:"Project Structure"})})," to understand how files are organized"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"./configuration",children:"Configuration"})})," to customize your site"]}),`
`]})]})}function o(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}function s(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}const a={frontmatter:{title:"Installation",description:"System requirements and detailed installation instructions for Tome.",icon:"download",hidden:!1,toc:!0,draft:!1},headings:[{depth:2,text:"Prerequisites",id:"prerequisites"},{depth:2,text:"Create a new project",id:"create-a-new-project"},{depth:2,text:"Install dependencies",id:"install-dependencies"},{depth:2,text:"Start the dev server",id:"start-the-dev-server"},{depth:2,text:"Add to an existing project",id:"add-to-an-existing-project"},{depth:2,text:"Next steps",id:"next-steps"}]};export{o as default,a as meta};
