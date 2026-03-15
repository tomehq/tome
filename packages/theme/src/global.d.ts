declare const __TOME_AI_API_KEY__: string | undefined;
declare const __TOME_VERSION__: string | undefined;

declare module "virtual:tome/config" {
  const config: any;
  export default config;
}

declare module "virtual:tome/routes" {
  export const routes: any[];
  export const navigation: any[];
  export const versions: any;
  export const i18n: any;
}

declare module "virtual:tome/page-loader" {
  export default function loadPageModule(id: string): Promise<any>;
}

declare module "virtual:tome/doc-context" {
  const docContext: Array<{ id: string; title: string; content: string }>;
  export default docContext;
}

declare module "virtual:tome/overrides" {
  const overrides: {
    Header?: React.ComponentType<any>;
    Footer?: React.ComponentType<any>;
    Sidebar?: React.ComponentType<any>;
    Toc?: React.ComponentType<any>;
    PageFooter?: React.ComponentType<any>;
  };
  export default overrides;
}
