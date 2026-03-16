# @tomehq/cli

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

## 0.2.8

### Minor Changes

- `tome init` now scaffolds GitHub Actions deploy workflow (`.github/workflows/deploy.yml`)
- `tome migrate:gitbook` command for converting GitBook projects
- `tome migrate:mintlify` command for converting Mintlify projects
- Cleaner Pagefind output: suppress noisy logs, show summary only
- Updated Node.js requirement to 20+
- Updated dependencies
  - @tomehq/core@0.2.8

## 0.2.0

### Minor Changes

- Add `tome lint` command with paragraph length, heading hierarchy, image alt, empty link, and banned words checks
- Add `tome deploy --preview` for preview deployments with optional `--branch` and `--expires` flags
- Updated dependencies
  - @tomehq/core@0.2.0

## 0.1.1

### Patch Changes

- Updated dependencies
  - @tomehq/core@0.1.1
