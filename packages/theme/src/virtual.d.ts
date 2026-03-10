declare module "virtual:tome/config" {
  const config: import("@tome/core").TomeConfig;
  export default config;
}

declare module "virtual:tome/routes" {
  export const routes: Array<{
    id: string;
    urlPath: string;
    frontmatter: import("@tome/core").PageFrontmatter;
    isMdx: boolean;
  }>;
  export const navigation: import("@tome/core").NavigationGroup[];
}
