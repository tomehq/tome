import { z } from "zod";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { pathToFileURL } from "url";

// ── CONFIG SCHEMA ────────────────────────────────────────
export const ThemeSchema = z.object({
  preset: z.enum(["amber", "editorial", "cipher", "mint"]).default("amber"),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  mode: z.enum(["light", "dark", "auto"]).default("auto"),
  fonts: z.object({
    heading: z.string().optional(),
    body: z.string().optional(),
    code: z.string().optional(),
  }).optional(),
  radius: z.string().optional(),
}).default({ preset: "amber" as const, mode: "auto" as const });

type NavigationGroup = {
  group: string;
  pages: Array<string | NavigationGroup>;
};

export const NavigationGroupSchema: z.ZodType<NavigationGroup> = z.object({
  group: z.string(),
  pages: z.array(z.union([
    z.string(),
    z.lazy(() => NavigationGroupSchema),
  ])),
});

export const SearchSchema = z.object({
  provider: z.enum(["local", "algolia"]).default("local"),
  appId: z.string().optional(),
  apiKey: z.string().optional(),
  indexName: z.string().optional(),
}).default({ provider: "local" as const });

export const ApiSchema = z.object({
  spec: z.string(),
  playground: z.boolean().default(true),
  baseUrl: z.string().optional(),
  auth: z.object({
    type: z.enum(["bearer", "apiKey", "oauth2"]).optional(),
    header: z.string().optional(),
  }).optional(),
}).optional();

export const AiSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.enum(["openai", "anthropic", "custom"]).default("anthropic"),
  model: z.string().optional(),
  apiKeyEnv: z.string().default("TOME_AI_KEY"),
}).optional();

export const McpSchema = z.object({
  enabled: z.boolean().default(true),
  server: z.boolean().default(false),
  includeContent: z.boolean().default(true),
  excludePages: z.array(z.string()).default([]),
}).optional();

export const I18nSchema = z.object({
  defaultLocale: z.string().default("en"),
  locales: z.array(z.string()).default(["en"]),
  localeNames: z.record(z.string(), z.string()).optional(),
  localeDirs: z.record(z.string(), z.enum(["ltr", "rtl"])).optional(),
  fallback: z.boolean().default(true),
}).optional();

export const VersioningSchema = z.object({
  current: z.string(),
  versions: z.array(z.string()),
}).optional();

export const AnalyticsSchema = z.object({
  provider: z.enum(["plausible", "posthog", "custom"]).optional(),
  key: z.string().optional(),
}).optional();

export const WebhookSchema = z.object({
  url: z.string().url(),
  channel: z.enum(["slack", "discord", "http"]),
  events: z.array(z.enum(["deploy.succeeded", "deploy.failed", "preview.deployed", "domain.verified"])).optional(),
  secret: z.string().optional(),
});

export const RedirectSchema = z.object({
  from: z.string(),
  to: z.string(),
}).strict();

export const SandboxSchema = z.object({
  enabled: z.boolean().default(false),
  allowedExpressions: z.array(z.string()).default([]),
}).optional();

export const OverridesSchema = z.object({
  Header: z.string().optional(),
  Footer: z.string().optional(),
  Sidebar: z.string().optional(),
  Toc: z.string().optional(),
  PageFooter: z.string().optional(),
}).optional();

export const SocialLinkSchema = z.object({
  platform: z.enum(["github", "twitter", "discord", "linkedin", "youtube", "mastodon", "bluesky", "custom"]),
  url: z.string().url(),
  label: z.string().optional(),
  icon: z.string().optional(),
});

export const SocialLinksSchema = z.array(SocialLinkSchema).optional();

export const BannerSchema = z.object({
  text: z.string(),
  link: z.string().optional(),
  dismissible: z.boolean().default(true),
}).optional();

export const TocSchema = z.object({
  enabled: z.boolean().default(true),
  depth: z.number().min(2).max(4).default(3),
}).default({ enabled: true, depth: 3 });

export const EditLinkSchema = z.object({
  repo: z.string(),
  branch: z.string().default("main"),
  dir: z.string().default(""),
}).optional();

export const TomeConfigSchema = z.object({
  name: z.string().default("My Docs"),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  baseUrl: z.string().optional(),
  basePath: z.string().optional(),
  theme: ThemeSchema,
  navigation: z.array(NavigationGroupSchema).default([]),
  search: SearchSchema,
  api: ApiSchema,
  ai: AiSchema,
  mcp: McpSchema,
  i18n: I18nSchema,
  versioning: VersioningSchema,
  toc: TocSchema,
  banner: BannerSchema,
  editLink: EditLinkSchema,
  math: z.boolean().default(false),
  strictLinks: z.boolean().default(false),
  lastUpdated: z.boolean().default(true),
  plugins: z.object({
    remark: z.array(z.union([
      z.string(),
      z.tuple([z.string(), z.record(z.string(), z.unknown())]),
    ])).default([]),
    rehype: z.array(z.union([
      z.string(),
      z.tuple([z.string(), z.record(z.string(), z.unknown())]),
    ])).default([]),
  }).optional(),
  analytics: AnalyticsSchema,
  topNav: z.array(z.object({
    label: z.string(),
    href: z.string(),
  })).optional(),
  webhooks: z.array(WebhookSchema).optional(),
  redirects: z.array(RedirectSchema).default([]),
  sandbox: SandboxSchema,
  socialLinks: SocialLinksSchema,
  overrides: OverridesSchema,
  contentSources: z.array(z.any()).optional(),  // ContentSource instances — validated at runtime, not by zod
  tomePlugins: z.array(z.any()).optional(),  // validated at runtime, not by zod (plugins are class instances)
});

export type TomeConfig = z.infer<typeof TomeConfigSchema>;

// ── PLUGIN INTERFACE ────────────────────────────────────
export interface TomePlugin {
  name: string;
  hooks?: {
    configResolved?: (config: TomeConfig) => TomeConfig | void;
    routesResolved?: (routes: PageRoute[]) => PageRoute[] | void;
    headTags?: () => string[];
    buildStart?: () => void | Promise<void>;
    buildEnd?: (outputDir: string) => void | Promise<void>;
  };
}

// Forward-declared PageRoute type for plugin interface (matches routes.ts)
interface PageRoute {
  id: string;
  filePath: string;
  absolutePath: string;
  urlPath: string;
  frontmatter: Record<string, unknown>;
  isMdx: boolean;
  version?: string;
  locale?: string;
}

// ── CONFIG LOADER ────────────────────────────────────────
const CONFIG_FILES = [
  "tome.config.js",
  "tome.config.mjs",
  "tome.config.ts",
];

export async function loadConfig(root: string): Promise<TomeConfig> {
  let rawConfig: Record<string, unknown> = {};

  for (const file of CONFIG_FILES) {
    const configPath = resolve(root, file);
    if (existsSync(configPath)) {
      try {
        const configUrl = pathToFileURL(configPath).href;
        const mod = await import(configUrl);
        rawConfig = mod.default || mod;
        break;
      } catch (err) {
        throw new Error(
          `Failed to load config from ${file}:\n${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
  }

  const result = TomeConfigSchema.safeParse(rawConfig);

  if (!result.success) {
    const errors = result.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid tome.config.js:\n${errors}`);
  }

  return result.data;
}

export function defineConfig(config: Partial<TomeConfig>): Partial<TomeConfig> {
  return config;
}
