# @tomehq/theme

## 0.3.3

### Patch Changes

- 062349c: Fix MCP server stdout corruption, add dashboard mobile responsiveness, improve test coverage, and update docs.

  - Fix: MCP CLI banner no longer writes to stdout, preventing JSON-RPC protocol corruption
  - Fix: API Playground prop wiring and githubSource route crash
  - Feat: MCP server `createMcpServer()` exported for programmatic use with graceful shutdown
  - Feat: Dashboard mobile-responsive layout with media query breakpoints
  - Feat: 13 MCP server integration tests using InMemoryTransport
  - Docs: Add missing typedoc CLI command, fix social link examples, update package list

- Updated dependencies [062349c]
  - @tomehq/core@0.3.3
  - @tomehq/components@0.3.3

## 0.2.8

### Minor Changes

- Replace hash-based SPA routing with History API (pushState + popstate + pathname parsing)
- Content link interception: in-content markdown links navigate via SPA instead of full page reload
- Banner link internal navigation support
- Algolia search basePath stripping for correct page ID extraction
- Extract routing helpers (`pathnameToPageId`, `pageIdToPath`) into testable `routing.ts` module
- Extract entry helpers (`loadPage`, `computeEditUrl`, `resolveInitialPageId`, `detectCurrentVersion`) into testable `entry-helpers.ts` module
- Pass `basePath` prop through Shell for correct URL construction
- Updated dependencies
  - @tomehq/core@0.2.8
  - @tomehq/components@0.2.8

## 0.2.0

### Minor Changes

- Shell: logo links back to landing page, dynamic version in sidebar footer
- Shell: edit link support, table of contents depth config, changelog page layout
- Entry: pass new config fields (editLink, tableOfContents, plugins) to Shell
- Updated dependencies
  - @tomehq/core@0.2.0
  - @tomehq/components@0.2.0

## 0.1.2

### Patch Changes

- Updated dependencies
  - @tomehq/components@0.1.1

## 0.1.1

### Patch Changes

- Fix bugs found in functionality audit: invalid search provider, AI key naming mismatch, hardcoded version. Remove dead billing stubs. Add 57 API route tests.
- Updated dependencies
  - @tomehq/core@0.1.1
