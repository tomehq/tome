# @tomehq/cli

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
