import { defineConfig, type Plugin } from "vitest/config";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Vite plugin that resolves virtual:tome/* imports to real files on disk.
// In production, these are resolved by vite-plugin-tome; in tests we need
// concrete files so that vi.mock can intercept them.
function virtualTomeStubs(): Plugin {
  const stubs: Record<string, string> = {
    "virtual:tome/config": resolve(__dirname, "src/__virtual_stubs/config.ts"),
    "virtual:tome/routes": resolve(__dirname, "src/__virtual_stubs/routes.ts"),
    "virtual:tome/page-loader": resolve(__dirname, "src/__virtual_stubs/page-loader.ts"),
    "virtual:tome/doc-context": resolve(__dirname, "src/__virtual_stubs/doc-context.ts"),
    "virtual:tome/overrides": resolve(__dirname, "src/__virtual_stubs/overrides.ts"),
  };

  return {
    name: "virtual-tome-stubs",
    enforce: "pre",
    resolveId(id) {
      const resolved = stubs[id];
      if (resolved) return resolved;
      return null;
    },
  };
}

export default defineConfig({
  root: __dirname,
  plugins: [virtualTomeStubs()],
  test: {
    name: "theme",
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
    setupFiles: [resolve(__dirname, "src/test-setup.ts")],
    server: {
      deps: {
        // Force Vite to transform entry.tsx and its virtual imports inline
        inline: [/virtual:tome/],
      },
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.tsx", "src/**/*.ts"],
      exclude: ["src/**/*.test.*", "src/test-setup.ts", "src/virtual.d.ts"],
    },
  },
});
