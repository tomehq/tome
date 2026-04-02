---
title: API Diff
description: Compare OpenAPI specs to detect breaking changes and generate changelogs automatically.
---

The `api:diff` command compares two OpenAPI specifications and reports what changed between them. It detects breaking changes, additions, deprecations, and documentation updates.

## Usage

```bash
npx @tomehq/cli api:diff <old-spec> <new-spec>
```

Both arguments are paths to OpenAPI spec files (JSON or YAML):

```bash
npx @tomehq/cli api:diff openapi-v1.yaml openapi-v2.yaml
```

The output is a Keep-a-Changelog formatted markdown summary.

## What gets detected

### Breaking changes

- Removed endpoints
- Removed required parameters
- Parameter type changes (e.g., `string` to `integer`)
- Parameter made required (was optional)
- Removed request body
- Request body content type changed
- Request body made required (was optional)
- Removed success responses (2xx status codes)

### Non-breaking changes

- Added endpoints
- Added optional parameters
- Parameter made optional (was required)
- Added responses
- Removed non-success responses

### Deprecations

- Endpoints marked as deprecated

### Documentation-only changes

- Updated summary or description text (not included in the changelog output)

## Output formats

### Markdown (default)

The default output is a changelog entry in Keep-a-Changelog format:

```
## [2.0.0] - 2026-04-02

### Breaking Changes
- Removed GET /users/{id}/legacy
- Parameter `filter` type changed from `string` to `integer` on GET /users

### Added
- Added POST /users/bulk

### Deprecated
- Deprecated GET /users/search
```

### JSON

Use the `--json` flag to get structured output for programmatic use:

```bash
npx @tomehq/cli api:diff old.yaml new.yaml --json
```

Returns a JSON object with `changes` (array of change objects), `summary` (counts by severity), `hasBreaking`, `oldVersion`, and `newVersion`.

## CI integration

### Fail on breaking changes

Use `--fail-on-breaking` to exit with code 1 when breaking changes are detected:

```bash
npx @tomehq/cli api:diff old.yaml new.yaml --fail-on-breaking
```

This is useful in CI pipelines to block merges that introduce breaking API changes.

### Example GitHub Actions step

```yaml
- name: Check for breaking API changes
  run: npx @tomehq/cli api:diff api/v1.yaml api/v2.yaml --fail-on-breaking
```

## Combining both flags

```bash
npx @tomehq/cli api:diff old.yaml new.yaml --json --fail-on-breaking
```

Outputs JSON and exits with code 1 if any breaking change is found. The JSON `hasBreaking` field indicates whether breaking changes exist.
