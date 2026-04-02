---
title: Snippets
description: Reuse content across pages with snippet directives and variable substitution.
---

Snippets let you define a block of markdown once and include it in multiple pages. This is useful for shared warnings, installation steps, or any content that appears in more than one place.

## Basic usage

Use the `::snippet` directive to include a file:

```markdown
::snippet{file="shared-warning.md"}
```

Tome resolves snippet files from the configured snippets directory (default: `snippets/` at your project root). If you have a file at `snippets/shared-warning.md`, the directive above will inline its content at that position in the page.

## Variable substitution

Snippets support `{{variable}}` placeholders that you can fill in per-usage:

```markdown
<!-- snippets/install-note.md -->
Install version **{{version}}** with:

\`\`\`bash
npm install @acme/sdk@{{version}}
\`\`\`
```

Then reference it with variables:

```markdown
::snippet{file="install-note.md" version="2.4.0"}
```

The `{{version}}` placeholders are replaced with `2.4.0` in the output. Any unmatched placeholders are left as-is.

## Configuration

The default snippets directory is `snippets/`. You can change it in `tome.config.js`:

```js
export default {
  name: "My Docs",
  snippetsDir: "content/shared",
};
```

All snippet file paths are resolved relative to this directory.

## Nested snippets

Snippets can include other snippets. Tome resolves them recursively up to a maximum depth of 5 to prevent infinite loops.

```markdown
<!-- snippets/setup.md -->
::snippet{file="prereqs.md"}

Then run the installer:
...
```

## Frontmatter stripping

If a snippet file contains YAML frontmatter, it is automatically stripped before inclusion. This means you can keep metadata in your snippet files without it leaking into the output.

```markdown
---
description: Internal note about this snippet
---

This content will be included. The frontmatter above will not.
```

## Variable inheritance

When snippets are nested, variables from the parent are passed down to child snippets. Variables defined at the snippet call site override inherited values:

```markdown
<!-- Page: sets version="3.0" -->
::snippet{file="outer.md" version="3.0"}

<!-- snippets/outer.md: inherits version, adds platform -->
::snippet{file="inner.md" platform="linux"}

<!-- snippets/inner.md: receives both version="3.0" and platform="linux" -->
Supported on {{platform}} for version {{version}}.
```
