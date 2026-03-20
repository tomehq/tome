import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx", "src/entry.tsx"],
  format: ["esm"],
  dts: true,
  external: [
    "react",
    "react-dom",
    "virtual:tome/config",
    "virtual:tome/routes",
    "virtual:tome/page-loader",
    "virtual:tome/doc-context",
    "virtual:tome/overrides",
    "@tomehq/components",
  ],
});
