#!/usr/bin/env node

// @tomehq/create simply delegates to `tome init`
// Usage: npx @tomehq/create my-docs

import { execSync } from "child_process";
const args = process.argv.slice(2).join(" ");
execSync(`npx @tomehq/cli init ${args}`, { stdio: "inherit" });
