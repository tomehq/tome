#!/usr/bin/env node

// @tome/create simply delegates to `tome init`
// Usage: npx @tome/create my-docs

import { execSync } from "child_process";
const args = process.argv.slice(2).join(" ");
execSync(`npx @tome/cli init ${args}`, { stdio: "inherit" });
