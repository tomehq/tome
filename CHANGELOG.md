# Changelog

## 0.2.2

### Bug Fixes

- **Fix hosted domain** — replaced all `tome.dev` references with `tome.center` across deploy URLs, CORS config, DNS records, preview URLs, API routes, docs, and pre-built assets
- **Fix custom domain registration** — dashboard now strips protocol prefixes and trailing slashes from domain input; API-side normalization added as safety net
- **Fix dashboard routing** — replaced hash-based routing with History API for proper `/dashboard/` path handling
- **Fix duplicate headings** — removed double H1 tags from docs pages
- **Fix CLI test flakiness** — replaced `npx tsx` with local binary to eliminate concurrent subprocess resolution errors
- Rebuilt dashboard and docs pre-built assets with corrected domain

## 0.2.0

### New Features

- **Content linting** (`tome lint`) — check paragraph length, heading hierarchy, image alt text, empty links, banned words, with `--strict` mode
- **OG image generation** — auto-generates OpenGraph images for every page at build time; override with `ogImage` frontmatter
- **Preview deployments** — `tome deploy --preview` creates temporary preview URLs with optional expiry
- **Webhooks** — send deploy event notifications to Slack, Discord, or HTTP endpoints with HMAC signing
- **Changelog pages** — `<Changelog>` component for rendering release notes with version headers and dates
- **Plugin system** — `plugins` array in config for extending the Vite pipeline with custom transforms
- **Git-based dates** — automatic `lastUpdated` and `createdAt` timestamps from git history
- **Edit links** — `editLink` config to show "Edit on GitHub" links on every page
- **Table of contents config** — `tableOfContents` config with `minDepth`/`maxDepth` heading level control
- **Broken link checker** — detects dead internal links and missing anchors at build time

### Improvements

- Sticky landing page nav with backdrop blur — header stays accessible when scrolling
- Smooth scroll navigation — no more `#` fragments in URL bar
- Dashboard upgrade tooltips — hover to see plan features before upgrading
- Logo links back to landing page from docs/dashboard
- Removed duplicate H1 headings from all docs pages
- Added favicon and full OG/Twitter meta tags to docs, dashboard, and deployed copies
- Updated README with all new features, CLI reference, and config examples
- Updated reference docs (CLI, config, frontmatter) for new commands and fields

### Bug Fixes

- Fixed invalid `"pagefind"` search provider in landing page config (→ `"local"`)
- Fixed AI key naming mismatch (`__TOME_AI_KEY__` → `__TOME_AI_API_KEY__`)
- Dynamic version display in sidebar footer (reads from `__TOME_VERSION__`)

## 0.1.1

### Bug Fixes

- Full functionality audit: fix invalid search provider, AI key naming, hardcoded version
- Remove dead Stripe billing stubs
- Add 57 API route tests

## 0.1.0

- Initial release
