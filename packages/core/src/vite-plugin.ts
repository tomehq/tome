import { resolve, join } from "path";
import { readFileSync, existsSync } from "fs";
import { createRequire } from "module";
import type { Plugin, ViteDevServer } from "vite";

const _require = createRequire(import.meta.url);
import { loadConfig, type TomeConfig } from "./config.js";
import { discoverPages, buildNavigation, type PageRoute, type NavigationGroup, type I18nConfig } from "./routes.js";
import { processMarkdown, extractHeadingsFromSource, type ProcessedPage, type MarkdownPluginOptions } from "./markdown.js";
import { parseOpenApiSpec, type ApiManifest } from "./openapi.js";
import { generateAnalyticsScript } from "./analytics.js";
import { getGitLastUpdated } from "./git-dates.js";
import { parseChangelog } from "./changelog.js";
import matter from "gray-matter";

// ── VIRTUAL MODULE IDS ───────────────────────────────────
const VIRTUAL_CONFIG = "virtual:tome/config";
const VIRTUAL_ROUTES = "virtual:tome/routes";
const VIRTUAL_PAGE_PREFIX = "virtual:tome/page/";
const VIRTUAL_PAGE_LOADER = "virtual:tome/page-loader";
const VIRTUAL_API = "virtual:tome/api";
const VIRTUAL_ANALYTICS = "virtual:tome/analytics";
const VIRTUAL_DOC_CONTEXT = "virtual:tome/doc-context";

const RESOLVED_CONFIG = "\0" + VIRTUAL_CONFIG;
const RESOLVED_ROUTES = "\0" + VIRTUAL_ROUTES;
const RESOLVED_PAGE_PREFIX = "\0" + VIRTUAL_PAGE_PREFIX;
const RESOLVED_PAGE_LOADER = "\0" + VIRTUAL_PAGE_LOADER;
const RESOLVED_API = "\0" + VIRTUAL_API;
const RESOLVED_ANALYTICS = "\0" + VIRTUAL_ANALYTICS;
const RESOLVED_DOC_CONTEXT = "\0" + VIRTUAL_DOC_CONTEXT;

// ── PLUGIN ───────────────────────────────────────────────
export interface TomePluginOptions {
  /** Root directory of the Tome project (default: process.cwd()) */
  root?: string;
  /** Pages directory relative to root (default: "pages") */
  pagesDir?: string;
}

export default function tomePlugin(options: TomePluginOptions = {}): Plugin[] {
  const root = options.root || process.cwd();
  const pagesDir = resolve(root, options.pagesDir || "pages");

  let config: TomeConfig;
  let routes: PageRoute[] = [];
  let navigation: NavigationGroup[] = [];
  let server: ViteDevServer | undefined;
  let apiManifest: ApiManifest | null = null;

  // Cache processed pages (HTML only — MDX pages are loaded directly by Vite)
  const pageCache = new Map<string, ProcessedPage>();
  // TOM-54: Cache git last-updated dates per page
  const gitDates = new Map<string, string>();
  // TOM-57: Resolved markdown plugins
  let resolvedPlugins: MarkdownPluginOptions | undefined;

  async function loadAll() {
    config = await loadConfig(root);

    // TOM-57: Resolve custom markdown plugins from config
    resolvedPlugins = undefined;
    if (config.plugins) {
      const resolved: MarkdownPluginOptions = {};

      if (config.plugins.remark && config.plugins.remark.length > 0) {
        resolved.remarkPlugins = [];
        for (const entry of config.plugins.remark) {
          try {
            const [name, options] = Array.isArray(entry) ? entry : [entry, undefined];
            const mod = await import(name as string);
            const plugin = mod.default || mod;
            resolved.remarkPlugins.push(options ? [plugin, options] : [plugin]);
          } catch (err) {
            console.warn(`[tome] Failed to load remark plugin: ${err instanceof Error ? err.message : String(err)}`);
          }
        }
      }

      if (config.plugins.rehype && config.plugins.rehype.length > 0) {
        resolved.rehypePlugins = [];
        for (const entry of config.plugins.rehype) {
          try {
            const [name, options] = Array.isArray(entry) ? entry : [entry, undefined];
            const mod = await import(name as string);
            const plugin = mod.default || mod;
            resolved.rehypePlugins.push(options ? [plugin, options] : [plugin]);
          } catch (err) {
            console.warn(`[tome] Failed to load rehype plugin: ${err instanceof Error ? err.message : String(err)}`);
          }
        }
      }

      if ((resolved.remarkPlugins && resolved.remarkPlugins.length > 0) ||
          (resolved.rehypePlugins && resolved.rehypePlugins.length > 0)) {
        resolvedPlugins = resolved;
      }
    }
    // Build i18n config if configured with multiple locales
    const i18nConfig: I18nConfig | undefined = config.i18n && config.i18n.locales.length > 1
      ? {
          defaultLocale: config.i18n.defaultLocale,
          locales: config.i18n.locales,
          localeNames: config.i18n.localeNames,
          fallback: config.i18n.fallback,
        }
      : undefined;
    routes = await discoverPages(pagesDir, config.versioning ?? undefined, i18nConfig);
    navigation = buildNavigation(routes, config);
    pageCache.clear();

    // TOM-19: Parse OpenAPI spec if configured
    apiManifest = null;
    if (config.api?.spec) {
      const specPath = resolve(root, config.api.spec);
      try {
        apiManifest = await parseOpenApiSpec(specPath);
      } catch (err) {
        console.warn(`[tome] Failed to parse OpenAPI spec: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // TOM-54: Compute git last-updated dates
    gitDates.clear();
    if (config.lastUpdated !== false) {
      for (const route of routes) {
        // Use frontmatter override first, then git
        if (route.frontmatter.lastUpdated) {
          gitDates.set(route.id, route.frontmatter.lastUpdated);
        } else {
          const date = getGitLastUpdated(route.absolutePath);
          if (date) gitDates.set(route.id, date);
        }
      }
    }

    // Add synthetic API reference route
    if (apiManifest) {
      routes.push({
        id: "api-reference",
        filePath: "__api-reference__",
        absolutePath: "__api-reference__",
        urlPath: "/api",
        frontmatter: { title: "API Reference", hidden: false },
        isMdx: false,
      } as PageRoute);
    }
  }

  async function getPage(id: string): Promise<ProcessedPage | null> {
    if (pageCache.has(id)) return pageCache.get(id)!;

    const route = routes.find((r) => r.id === id);
    if (!route) return null;

    const source = readFileSync(route.absolutePath, "utf-8");
    const processed = await processMarkdown(source, route.absolutePath, resolvedPlugins);
    pageCache.set(id, processed);
    return processed;
  }

  // ── MDX METADATA EXTRACTOR ─────────────────────────────
  // For MDX pages we extract frontmatter + headings from raw source,
  // letting @mdx-js/rollup handle the JSX compilation separately.
  function getMdxMeta(route: PageRoute) {
    const source = readFileSync(route.absolutePath, "utf-8");
    const { data, content } = matter(source);

    let title = data.title as string | undefined;
    if (!title) {
      const m = content.match(/^#\s+(.+)$/m);
      title = m ? m[1].trim() : "Untitled";
    }

    return {
      frontmatter: {
        title,
        description: data.description as string | undefined,
        icon: data.icon as string | undefined,
        sidebarTitle: data.sidebarTitle as string | undefined,
        hidden: (data.hidden as boolean | undefined) ?? false,
        tags: data.tags as string[] | undefined,
        toc: (data.toc as boolean | undefined) ?? true,
        lastUpdated: data.lastUpdated as string | undefined,
        type: data.type as string | undefined,
      },
      headings: extractHeadingsFromSource(content),
    };
  }

  // ── CORE PLUGIN ────────────────────────────────────────
  const corePlugin: Plugin = {
    name: "vite-plugin-tome",
    enforce: "pre",

    async config() {
      const cfg = await loadConfig(root);
      const result: Record<string, unknown> = {};

      if (cfg.basePath) {
        result.base = cfg.basePath;
      }

      // Inject version at build time
      let tomeVersion = "0.0.0";
      try {
        const corePkg = _require.resolve("@tomehq/core/package.json");
        tomeVersion = JSON.parse(readFileSync(corePkg, "utf-8")).version ?? "0.0.0";
      } catch { /* fallback */ }
      const defines: Record<string, string> = {
        "__TOME_VERSION__": JSON.stringify(tomeVersion),
      };

      // Inject AI API key from environment at build time
      if (cfg.ai?.enabled && cfg.ai?.apiKeyEnv) {
        const key = process.env[cfg.ai.apiKeyEnv] ?? "";
        defines["__TOME_AI_API_KEY__"] = JSON.stringify(key);
      }

      result.define = defines;

      return result;
    },

    async configResolved() {
      await loadAll();
    },

    configureServer(srv) {
      server = srv;

      // Watch pages directory for changes
      srv.watcher.add(pagesDir);

      srv.watcher.on("change", async (file) => {
        if (file.startsWith(pagesDir) && /\.(md|mdx)$/.test(file)) {
          // Invalidate cache for changed page
          const rel = file.slice(pagesDir.length + 1);
          const id = rel.replace(/\.(md|mdx)$/, "").replace(/\/?index$/, "") || "index";
          pageCache.delete(id);

          // Reload routes in case frontmatter changed
          const i18nCfg: I18nConfig | undefined = config.i18n && config.i18n.locales.length > 1
            ? { defaultLocale: config.i18n.defaultLocale, locales: config.i18n.locales, localeNames: config.i18n.localeNames, fallback: config.i18n.fallback }
            : undefined;
          routes = await discoverPages(pagesDir, config.versioning ?? undefined, i18nCfg);
          navigation = buildNavigation(routes, config);

          // Trigger HMR
          const mod = srv.moduleGraph.getModuleById(RESOLVED_ROUTES);
          if (mod) srv.moduleGraph.invalidateModule(mod);

          const pageMod = srv.moduleGraph.getModuleById(RESOLVED_PAGE_PREFIX + id);
          if (pageMod) srv.moduleGraph.invalidateModule(pageMod);

          srv.ws.send({ type: "full-reload" });
        }

        // Watch config changes
        if (file.includes("tome.config")) {
          await loadAll();
          srv.ws.send({ type: "full-reload" });
        }
      });

      srv.watcher.on("add", async (file) => {
        if (file.startsWith(pagesDir) && /\.(md|mdx)$/.test(file)) {
          await loadAll();
          srv.ws.send({ type: "full-reload" });
        }
      });

      srv.watcher.on("unlink", async (file) => {
        if (file.startsWith(pagesDir) && /\.(md|mdx)$/.test(file)) {
          await loadAll();
          srv.ws.send({ type: "full-reload" });
        }
      });
    },

    resolveId(id) {
      if (id === VIRTUAL_CONFIG) return RESOLVED_CONFIG;
      if (id === VIRTUAL_ROUTES) return RESOLVED_ROUTES;
      if (id === VIRTUAL_PAGE_LOADER) return RESOLVED_PAGE_LOADER;
      if (id === VIRTUAL_API) return RESOLVED_API;
      if (id === VIRTUAL_ANALYTICS) return RESOLVED_ANALYTICS;
      if (id === VIRTUAL_DOC_CONTEXT) return RESOLVED_DOC_CONTEXT;
      if (id.startsWith(VIRTUAL_PAGE_PREFIX)) return "\0" + id;
      return null;
    },

    async load(id) {
      // Serve config as virtual module
      if (id === RESOLVED_CONFIG) {
        return `export default ${JSON.stringify(config)};`;
      }

      // Serve route manifest as virtual module
      if (id === RESOLVED_ROUTES) {
        const routeData = routes.map((r) => ({
          id: r.id,
          filePath: r.filePath,
          urlPath: r.urlPath,
          frontmatter: r.frontmatter,
          isMdx: r.isMdx,
          ...(r.version ? { version: r.version } : {}),
          ...(r.locale ? { locale: r.locale } : {}),
          ...(gitDates.has(r.id) ? { lastUpdated: gitDates.get(r.id) } : {}),
        }));
        const versioningData = config.versioning
          ? { current: config.versioning.current, versions: config.versioning.versions }
          : null;
        const i18nData = config.i18n && config.i18n.locales.length > 1
          ? {
              defaultLocale: config.i18n.defaultLocale,
              locales: config.i18n.locales,
              localeNames: config.i18n.localeNames || {},
            }
          : null;
        return `
          export const routes = ${JSON.stringify(routeData)};
          export const navigation = ${JSON.stringify(navigation)};
          export const versions = ${JSON.stringify(versioningData)};
          export const i18n = ${JSON.stringify(i18nData)};
        `;
      }

      // TOM-19: Serve API manifest as virtual module
      if (id === RESOLVED_API) {
        if (!apiManifest) return `export default null;`;
        return `export default ${JSON.stringify(apiManifest)};`;
      }

      // TOM-24: Serve analytics config as virtual module
      if (id === RESOLVED_ANALYTICS) {
        const analyticsConfig = config.analytics
          ? { provider: config.analytics.provider, key: config.analytics.key }
          : null;
        return `export default ${JSON.stringify(analyticsConfig)};`;
      }

      // Page loader — enumerates all pages with explicit imports so Vite can bundle them
      if (id === RESOLVED_PAGE_LOADER) {
        const entries = routes.map((r) => {
          const importPath = `virtual:tome/page/${r.id}`;
          return `  ${JSON.stringify(r.id)}: () => import(${JSON.stringify(importPath)})`;
        });
        return `
          const loaders = {\n${entries.join(",\n")}\n          };
          export default function loadPageModule(id) {
            const loader = loaders[id];
            return loader ? loader() : Promise.resolve({ default: null });
          }
        `;
      }

      // Doc context for AI RAG — exports full page content for the AI chat widget
      if (id === RESOLVED_DOC_CONTEXT) {
        const docs: { id: string; title: string; content: string }[] = [];
        let totalChars = 0;
        const MAX_CHARS = 50000;

        for (const route of routes) {
          if (route.frontmatter.hidden || route.filePath === "__api-reference__") continue;
          if (totalChars >= MAX_CHARS) break;
          try {
            const source = readFileSync(route.absolutePath, "utf-8");
            const { content } = matter(source);
            const trimmed = content.slice(0, MAX_CHARS - totalChars);
            docs.push({
              id: route.id,
              title: route.frontmatter.title || route.id,
              content: trimmed,
            });
            totalChars += trimmed.length;
          } catch {
            // Skip unreadable files
          }
        }

        return `export default ${JSON.stringify(docs)};`;
      }

      // Serve individual processed pages
      if (id.startsWith(RESOLVED_PAGE_PREFIX)) {
        const pageId = id.slice(RESOLVED_PAGE_PREFIX.length);

        // TOM-19: Synthetic API reference page
        if (pageId === "api-reference" && apiManifest) {
          return `
            export const isApiReference = true;
            export const apiManifest = ${JSON.stringify(apiManifest)};
            export default ${JSON.stringify({
              html: "",
              headings: apiManifest.tags.map((t) => ({ depth: 2, text: t.name, id: t.name.toLowerCase().replace(/\s+/g, "-") })),
              frontmatter: { title: "API Reference" },
            })};
          `;
        }

        const route = routes.find((r) => r.id === pageId);
        if (!route) return `export default null;`;

        if (route.isMdx) {
          // TOM-8: MDX pages — emit virtual module that re-exports from the real file.
          // @mdx-js/rollup will transform the .mdx file to a React component.
          const meta = getMdxMeta(route);
          return [
            `export { default } from ${JSON.stringify(route.absolutePath)};`,
            `export const meta = ${JSON.stringify(meta)};`,
          ].join("\n");
        }

        // Regular .md pages — return processed HTML
        const page = await getPage(pageId);
        if (!page) return `export default null;`;

        // TOM-49: Changelog page type — also export parsed changelog entries
        if (route.frontmatter.type === "changelog") {
          const source = readFileSync(route.absolutePath, "utf-8");
          const { content } = matter(source);
          const changelogEntries = parseChangelog(content);
          return `
            export const isChangelog = true;
            export const changelogEntries = ${JSON.stringify(changelogEntries)};
            export default ${JSON.stringify(page)};
          `;
        }

        return `export default ${JSON.stringify(page)};`;
      }

      return null;
    },

    // Generate MCP manifest + analytics injection at build time
    async generateBundle(_outputOptions, bundle) {
      // TOM-24: Inject analytics script into HTML files
      if (config.analytics?.provider && config.analytics?.key) {
        const endpoint = "https://tome-api.tome-api.workers.dev/api/analytics/event";
        const script = generateAnalyticsScript({
          endpoint,
          siteId: config.analytics.key,
        });

        for (const fileName of Object.keys(bundle)) {
          const chunk = bundle[fileName];
          if (
            chunk.type === "asset" &&
            fileName.endsWith(".html") &&
            typeof chunk.source === "string"
          ) {
            chunk.source = chunk.source.replace("</head>", `${script}</head>`);
          }
        }
      }

      // Generate MCP manifest at build time (TOM-33)
      if (config.mcp?.enabled !== false) {
        const manifest = {
          name: config.name,
          version: "1.0.0",
          pages: await Promise.all(
            routes
              .filter((r) => !r.frontmatter.hidden)
              .filter((r) => !config.mcp?.excludePages?.includes(r.id))
              .map(async (r) => {
                const page = r.isMdx ? null : await getPage(r.id);
                return {
                  url: r.urlPath,
                  title: r.frontmatter.title,
                  description: r.frontmatter.description || "",
                  headings: page?.headings.map((h) => h.text) || [],
                  tags: r.frontmatter.tags || [],
                  ...(config.mcp?.includeContent !== false
                    ? { content: page?.raw || "" }
                    : {}),
                };
              })
          ),
        };

        this.emitFile({
          type: "asset",
          fileName: "mcp.json",
          source: JSON.stringify(manifest, null, 2),
        });
      }
    },
  };

  // ── MDX PLUGIN (TOM-8) ─────────────────────────────────
  // Dynamically load @mdx-js/rollup so it's optional at startup
  let mdxPlugin: Plugin | null = null;
  try {
    const { default: createMdxPlugin } = _require("@mdx-js/rollup");
    const remarkGfm = _require("remark-gfm").default;
    const remarkFrontmatter = _require("remark-frontmatter").default;
    mdxPlugin = createMdxPlugin({
      remarkPlugins: [remarkGfm, [remarkFrontmatter, ["yaml"]]],
      rehypePlugins: [],
    }) as Plugin;
  } catch {
    // @mdx-js/rollup not available — MDX files will fall back to HTML processing
  }

  return mdxPlugin ? [mdxPlugin, corePlugin] : [corePlugin];
}
