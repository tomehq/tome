/** @type {import('@tome/core').TomeConfig} */
export default {
  name: "Tome",
  basePath: "/docs/",
  theme: {
    preset: "editorial",
    mode: "auto",
  },
  topNav: [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
  ],
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
      group: "Advanced",
      pages: [
        "guides/search",
        "guides/versioning",
        "concepts/architecture",
      ],
    },
    {
      group: "CLI",
      pages: ["cli"],
    },
  ],
};
