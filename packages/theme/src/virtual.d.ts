declare module "virtual:tome/config" {
  const config: import("@tomehq/core").TomeConfig;
  export default config;
}

declare module "virtual:tome/routes" {
  export const routes: Array<{
    id: string;
    urlPath: string;
    frontmatter: import("@tomehq/core").PageFrontmatter;
    isMdx: boolean;
  }>;
  export const navigation: import("@tomehq/core").NavigationGroup[];
}
