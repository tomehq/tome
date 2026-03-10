import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/core/vitest.config.ts",
  "packages/components/vitest.config.ts",
  "packages/theme/vitest.config.ts",
]);
