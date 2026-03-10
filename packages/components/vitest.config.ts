import { defineConfig } from "vitest/config";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: __dirname,
  test: {
    name: "components",
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.tsx"],
    setupFiles: [resolve(__dirname, "src/test-setup.ts")],
    coverage: {
      provider: "v8",
      include: ["src/**/*.tsx"],
      exclude: ["src/**/*.test.tsx", "src/test-setup.ts"],
    },
  },
});
