# Changelog

## 0.2.8

### New Features

- **History API routing** — docs theme now uses `pushState`/`popstate` instead of hash fragments, enabling clean URLs (`/docs/quickstart` instead of `/#quickstart`), proper SEO, and heading anchor links
- **Per-page HTML generation** — build emits individual HTML files per route with `data-pagefind-body` content, enabling Pagefind search indexing and static host compatibility
- **Redirects** — config-level `redirects` array and frontmatter `redirect_from` field with `_redirects` file generation for Netlify/Vercel/Cloudflare
- **MDX sandbox** — `recma-sandbox` plugin blocks dangerous JavaScript patterns (eval, fetch, DOM access) in MDX content at compile time; enable with `sandbox.enabled: true`
- **GitBook migration** — `tome migrate:gitbook` converts GitBook projects (SUMMARY.md, .gitbook.yaml) to Tome structure
- **Mintlify migration** — `tome migrate:mintlify` converts Mintlify projects (mint.json, MDX components) to Tome equivalents
- **Content-Security-Policy** — auto-injects CSP meta tag when sandbox is enabled, with dynamic `connect-src` for AI providers
- **GitHub Actions workflow** — `tome init` now scaffolds a `.github/workflows/deploy.yml` for automated preview + production deploys

### Improvements

- SPA content link interception — in-content markdown links navigate via pushState instead of full page reloads
- Algolia search now strips `basePath` when extracting page IDs from result URLs
- Banner links support internal navigation (not just external URLs)
- Pagefind output is cleaner — suppresses noisy indexing logs, shows summary only
- Dashboard responsive layout for mobile and tablet viewports
- Hex HTML entity decoding in code blocks (`&#x26;`, `&#x3C;`, etc.) for proper Shiki highlighting
- Multi-version docs structure with v1/v2 directories
- Extracted routing and entry helpers into testable pure-function modules
- 986 tests across 44 files with 90%+ coverage per package

### Bug Fixes

- Fixed content link clicks causing full page reloads instead of SPA navigation
- Fixed Algolia search results navigating to wrong pages when `basePath` is set

## 0.2.4

### Bug Fixes

- **Fix dark mode code blocks (for real this time)** — the `html.dark` class was never set on the document element, so the Shiki dual-theme CSS selectors from v0.2.3 never matched; added `useEffect` in Shell to sync `isDark` state to `document.documentElement.classList`

## 0.2.3

### New Features

- **Delete deployments & projects** — dashboard now has delete buttons for individual deployments and full project teardown (R2 files, DB records, Cloudflare custom hostnames)
- **Custom domains pipeline** — end-to-end Cloudflare for SaaS integration: `tome domains:add`, CNAME verification, auto SSL provisioning, and serving via Worker

### Improvements

- Migrated all API URL references from `tome-api.tome-api.workers.dev` to `api.tome.center`
- DNS record instructions now show the actual domain name instead of a generic placeholder
- Analytics event endpoint allows any origin (CORS `*`) so sites on custom domains can send pageview beacons
- Worker middleware proxies `www.tome.center` and `tome.center` to Vercel origin, preventing false 404s from wildcard route

### Bug Fixes

- **Fix dark mode code block contrast** — Shiki dual-theme CSS was targeting selectors that don't exist in Shiki v1, causing light-theme colors (near-black text) to render on dark backgrounds; fixed by switching to `var(--shiki-dark)` CSS variables
- Brightened github-dark comment token color (`#6A737D` → `#a0aab5`) for better contrast on dark code backgrounds

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
