# @tomehq/components

## 0.3.3

### Patch Changes

- 062349c: Fix MCP server stdout corruption, add dashboard mobile responsiveness, improve test coverage, and update docs.

  - Fix: MCP CLI banner no longer writes to stdout, preventing JSON-RPC protocol corruption
  - Fix: API Playground prop wiring and githubSource route crash
  - Feat: MCP server `createMcpServer()` exported for programmatic use with graceful shutdown
  - Feat: Dashboard mobile-responsive layout with media query breakpoints
  - Feat: 13 MCP server integration tests using InMemoryTransport
  - Docs: Add missing typedoc CLI command, fix social link examples, update package list

## 0.2.8

### Patch Changes

- Sync version with other packages
- Added comprehensive ChangelogTimeline test coverage

## 0.2.0

### Minor Changes

- Add `<Changelog>` component for rendering release notes with version headers and dates

## 0.1.1

### Patch Changes

- Sync version with other packages (no code changes)
