#!/usr/bin/env bash
# ── Install Tome pre-commit hooks ──────────────────────────
# Usage: ./scripts/install-hooks.sh [repo-path]
# Defaults to current directory if no path given.

set -euo pipefail

REPO_DIR="${1:-.}"
HOOKS_DIR="$REPO_DIR/.git/hooks"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "Error: $REPO_DIR is not a git repository"
  exit 1
fi

mkdir -p "$HOOKS_DIR"

# Install pre-commit hook
cp "$SCRIPT_DIR/pre-commit-sanitize" "$HOOKS_DIR/pre-commit"
chmod +x "$HOOKS_DIR/pre-commit"

echo "Pre-commit sanitize hook installed at $HOOKS_DIR/pre-commit"
echo "The hook will run a 12-point security audit on every commit."
