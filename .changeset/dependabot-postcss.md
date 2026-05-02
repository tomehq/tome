---
"@tomehq/core": patch
"@tomehq/cli": patch
"@tomehq/theme": patch
"@tomehq/components": patch
"@tomehq/editor": patch
---

Security: pin transitive `postcss` to `>= 8.5.10` via pnpm override. Patches a medium-severity advisory ([GHSA](https://github.com/tomehq/tome/security/dependabot/42)) where unescaped `</style>` in PostCSS's CSS stringify output enables an XSS vector.
