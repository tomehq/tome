---
"@tomehq/cli": patch
"@tomehq/core": patch
"@tomehq/theme": patch
"@tomehq/components": patch
---

fix: analytics script injection now works in built sites

Moved analytics script injection from generateBundle (which doesn't process the SPA index.html) to transformIndexHtml. Analytics tracking now works correctly for all deployed Tome sites.
