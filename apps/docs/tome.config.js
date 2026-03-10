import { defineConfig } from "@tome/core";

export default defineConfig({
  name: "Tome Docs",
  theme: {
    preset: "amber",
    mode: "auto",
  },
  navigation: [
    {
      group: "Getting Started",
      pages: ["index", "quickstart"],
    },
    {
      group: "Guide",
      pages: ["configuration", "components", "theming", "routing", "markdown"],
    },
    {
      group: "Features",
      pages: ["search", "openapi", "mcp", "analytics", "i18n"],
    },
    {
      group: "Cloud",
      pages: ["deploy", "domains"],
    },
    {
      group: "Reference",
      pages: ["cli"],
    },
  ],
});
