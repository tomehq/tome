/** @type {import('@tomehq/core').TomeConfig} */
export default {
  name: "Tome",
  basePath: "/docs/",
  theme: {
    preset: "editorial",
    mode: "auto",
  },
  banner: {
    text: "New in v3 — Agent-friendly output, MDX mermaid & math, JSON-LD schema markup!",
    link: "/docs/configuration",
    dismissible: true,
  },
  socialLinks: [
    { platform: "github", url: "https://github.com/tomehq/tome" },
    { platform: "twitter", url: "https://x.com/tomedocs" },
  ],
  topNav: [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  versioning: {
    current: "v3",
    versions: ["v3", "v2", "v1"],
  },
  navigation: [
    {
      group: "Getting Started",
      pages: ["index", "quickstart", "installation", "project-structure"],
    },
    {
      group: "Core Concepts",
      pages: ["configuration", "pages-routing", "components", "theming"],
    },
    {
      group: "API Reference",
      pages: ["api-overview", "api-endpoints", "api-auth"],
    },
    {
      group: "Guides",
      pages: [
        "guides/search",
        "guides/versioning",
        "guides/migration",
        "guides/redirects",
        "guides/configuration",
        "guides/custom-theme",
        "guides/api-reference",
        "guides/draft-pages",
        "guides/plugins",
        "guides/content-sources",
        "guides/typedoc",
        "guides/code-blocks",
      ],
    },
    {
      group: "Tutorials",
      pages: [
        "tutorials/first-site",
        "tutorials/deploy-to-cloud",
      ],
    },
    {
      group: "Reference",
      pages: [
        "reference/cli",
        "reference/components",
        "reference/config",
        "reference/frontmatter",
        "reference/theme-presets",
      ],
    },
    {
      group: "Concepts",
      pages: [
        "concepts/architecture",
        "concepts/file-routing",
      ],
    },
    {
      group: "CLI",
      pages: ["cli"],
    },
  ],
};
