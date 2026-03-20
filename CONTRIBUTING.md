# Contributing to Tome

Thank you for your interest in contributing to Tome! This guide will help you get set up.

## Development Setup

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) 9+

### Getting Started

```bash
# Clone the repo
git clone https://github.com/tomehq/tome.git
cd tome

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start developing the CLI
pnpm dev
```

### Project Structure

```
tome/
├── packages/
│   ├── cli/          # @tomehq/cli — CLI tool (init, dev, build, deploy)
│   ├── core/         # @tomehq/core — Build engine, Markdown pipeline, Vite plugin
│   ├── theme/        # @tomehq/theme — Default themes and React app shell
│   ├── components/   # @tomehq/components — Built-in MDX components
│   └── create-tome/  # @tomehq/create — Project scaffolder
├── apps/
│   ├── docs/         # Tome's own documentation (dogfood)
│   └── web/          # Marketing site
└── templates/        # Starter templates
```

### Making Changes

1. Create a branch: `git checkout -b my-feature`
2. Make your changes
3. Add a changeset: `pnpm changeset`
4. Commit and push
5. Open a Pull Request

### Changesets

We use [Changesets](https://github.com/changesets/changesets) for versioning. When you make a change that affects published packages, run:

```bash
pnpm changeset
```

Follow the prompts to describe your change and select the appropriate version bump.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
