import { resolve, join } from "path";
import { readFileSync, existsSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { createRequire } from "module";
import type { Plugin, ViteDevServer } from "vite";

const _require = createRequire(import.meta.url);
import { loadConfig, type TomeConfig, type TomePlugin } from "./config.js";
import { discoverPages, buildNavigation, type PageRoute, type NavigationGroup, type I18nConfig } from "./routes.js";
import { fetchRemoteContent, type ContentSource } from "./content-source.js";
import { processMarkdown, extractHeadingsFromSource, type ProcessedPage, type MarkdownPluginOptions, type MarkdownMathOptions } from "./markdown.js";
import { parseOpenApiSpec, type ApiManifest } from "./openapi.js";
import { recmaSandbox } from "./recma-sandbox.js";
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
const VIRTUAL_OVERRIDES = "virtual:tome/overrides";

const RESOLVED_CONFIG = "\0" + VIRTUAL_CONFIG;
const RESOLVED_ROUTES = "\0" + VIRTUAL_ROUTES;
const RESOLVED_PAGE_PREFIX = "\0" + VIRTUAL_PAGE_PREFIX;
const RESOLVED_PAGE_LOADER = "\0" + VIRTUAL_PAGE_LOADER;
const RESOLVED_API = "\0" + VIRTUAL_API;
const RESOLVED_ANALYTICS = "\0" + VIRTUAL_ANALYTICS;
const RESOLVED_DOC_CONTEXT = "\0" + VIRTUAL_DOC_CONTEXT;
const RESOLVED_OVERRIDES = "\0" + VIRTUAL_OVERRIDES;

// ── TOME PLUGIN HOOK RUNNER ──────────────────────────────
function runPluginHook<T>(plugins: TomePlugin[], hook: keyof NonNullable<TomePlugin['hooks']>, arg?: T): T {
  let result = arg as T;
  for (const plugin of plugins) {
    const fn = plugin.hooks?.[hook] as ((a: any) => any) | undefined;
    if (fn) {
      const ret = fn(result);
      if (ret !== undefined) result = ret;
    }
  }
  return result;
}

async function runPluginHookAsync(plugins: TomePlugin[], hook: 'buildStart' | 'buildEnd', arg?: string): Promise<void> {
  for (const plugin of plugins) {
    const fn = plugin.hooks?.[hook];
    if (fn) {
      await (fn as any)(arg);
    }
  }
}

function collectHeadTags(plugins: TomePlugin[]): string[] {
  const tags: string[] = [];
  for (const plugin of plugins) {
    if (plugin.hooks?.headTags) {
      tags.push(...plugin.hooks.headTags());
    }
  }
  return tags;
}

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
  let isDevMode = false;

  // Cache processed pages (HTML only — MDX pages are loaded directly by Vite)
  const pageCache = new Map<string, ProcessedPage>();
  // TOM-54: Cache git last-updated dates per page
  const gitDates = new Map<string, string>();
  // TOM-57: Resolved markdown plugins
  let resolvedPlugins: MarkdownPluginOptions | undefined;

  async function loadAll() {
    config = await loadConfig(root);

    // Run configResolved hook for Tome plugins
    const tomePlugins: TomePlugin[] = (config as any).tomePlugins || [];
    config = runPluginHook(tomePlugins, 'configResolved', config);

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

    // ── Content Sources: fetch remote pages and merge with local ──
    const contentSources: ContentSource[] = config.contentSources || [];
    if (contentSources.length > 0) {
      const remotePages = await fetchRemoteContent(contentSources);
      const remoteDir = resolve(root, ".tome", "remote");

      // Clean previous remote content
      if (existsSync(remoteDir)) {
        rmSync(remoteDir, { recursive: true, force: true });
      }

      // Track local page IDs so local pages take precedence on conflicts
      const localIds = new Set(routes.map((r) => r.id));

      for (const page of remotePages) {
        if (localIds.has(page.id)) continue; // local wins

        // Write remote page to temp directory so existing pipeline can process it
        const fileName = (page.id || "index") + "." + page.format;
        const filePath = join(remoteDir, fileName);
        const fileDir = join(remoteDir, ...fileName.split("/").slice(0, -1));
        mkdirSync(fileDir, { recursive: true });
        writeFileSync(filePath, page.content, "utf-8");

        // Build route entry matching the PageRoute interface
        const ext = "." + page.format;
        let id = page.id;
        if (id.endsWith("/index") || id === "index") {
          id = id.replace(/\/?index$/, "") || "index";
        }
        const urlPath = id === "" || id === "index" ? "/" : `/${id}`;

        // Extract title from frontmatter or first heading
        let title = "Untitled";
        try {
          const { data, content } = matter(page.content);
          if (data.title) {
            title = data.title;
          } else {
            const m = content.match(/^#\s+(.+)$/m);
            if (m) title = m[1].trim();
          }

          routes.push({
            id: id || "index",
            filePath: `__remote__/${fileName}`,
            absolutePath: filePath,
            urlPath,
            frontmatter: {
              title,
              description: data.description,
              icon: data.icon,
              sidebarTitle: data.sidebarTitle,
              hidden: data.hidden ?? false,
              tags: data.tags,
              badge: data.badge,
              draft: data.draft ?? false,
            } as any,
            isMdx: page.format === "mdx",
          });
        } catch {
          routes.push({
            id: id || "index",
            filePath: `__remote__/${fileName}`,
            absolutePath: filePath,
            urlPath,
            frontmatter: { title, hidden: false } as any,
            isMdx: page.format === "mdx",
          });
        }
      }
    }

    // Run routesResolved hook for Tome plugins
    routes = runPluginHook(tomePlugins, 'routesResolved', routes);

    // In production, filter out draft pages from routes used for navigation and outputs
    const navRoutes = isDevMode ? routes : routes.filter(r => !r.frontmatter.draft);
    navigation = buildNavigation(navRoutes, config);
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
    if (id === "api-reference") return null; // synthetic route — no file on disk
    if (pageCache.has(id)) return pageCache.get(id)!;

    const route = routes.find((r) => r.id === id);
    if (!route) return null;

    const source = readFileSync(route.absolutePath, "utf-8");
    const mathOpts: MarkdownMathOptions = { math: config.math === true };
    const processed = await processMarkdown(source, route.absolutePath, resolvedPlugins, mathOpts);

    // Resolve relative `./pageId` links to bare page IDs.
    // Vite's import analysis scans module source for "./" and "/" patterns and rewrites
    // them as if they are module imports, corrupting href values inside JSON-stringified
    // HTML. Using bare page IDs (e.g. "quickstart") avoids this — the Shell's content
    // link interceptor resolves them to the correct URL at runtime.
    // For versioned pages, prefix with the version directory so the Shell can resolve
    // cross-version links correctly (e.g. "v2/quickstart").
    const versionPrefix = route.version && route.version !== (config.versioning?.current || "") ? `${route.version}/` : "";
    processed.html = processed.html.replace(
      /href="\.\/([^"]+)"/g,
      (_match, relPath) => `href="${versionPrefix}${relPath}"`
    );
    processed.raw = processed.raw.replace(
      /\]\(\.\/([^)]+)\)/g,
      (_match, relPath) => `](${versionPrefix}${relPath})`
    );

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
        draft: (data.draft as boolean | undefined) ?? false,
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
        const pluginDir = new URL(".", import.meta.url);
        // Walk up from src/ or dist/ to find package.json
        const corePkgPath = new URL("../package.json", pluginDir);
        tomeVersion = JSON.parse(readFileSync(corePkgPath, "utf-8")).version ?? "0.0.0";
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

    async configResolved(resolvedConfig: any) {
      isDevMode = resolvedConfig?.command === "serve";
      await loadAll();
    },

    // Sandbox CSP: inject Content-Security-Policy meta tag when sandbox is enabled
    transformIndexHtml(html) {
      let result = html;

      // TOM-24: Inject analytics script
      if (config.analytics?.provider && config.analytics?.key) {
        const endpoint = "https://api.tome.center/api/analytics/event";
        const script = generateAnalyticsScript({
          endpoint,
          siteId: config.analytics.key,
        });
        result = result.replace("</head>", `${script}\n</head>`);
      }

      // Inject head tags from Tome plugins
      const pluginHeadTags = collectHeadTags((config as any).tomePlugins || []);
      if (pluginHeadTags.length > 0) {
        result = result.replace('</head>', pluginHeadTags.join('\n') + '\n</head>');
      }

      // Inject WebSite JSON-LD schema into the main index.html
      const siteUrlForJsonLd = (config.baseUrl || "").replace(/\/$/, "");
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: config.name,
        url: siteUrlForJsonLd || undefined,
        description: `Documentation site powered by Tome`,
        potentialAction: {
          "@type": "SearchAction",
          target: siteUrlForJsonLd ? `${siteUrlForJsonLd}/search?q={search_term_string}` : undefined,
          "query-input": "required name=search_term_string",
        },
      };
      result = result.replace(
        "</head>",
        `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>\n</head>`
      );

      if (!config?.sandbox?.enabled) return result;
      // Build connect-src dynamically: always allow self + mermaid/KaTeX CDN
      const connectSrc = ["'self'", "https://cdn.jsdelivr.net"];
      // If AI chat is enabled, allow the provider's API endpoint
      if (config.ai?.enabled) {
        if (config.ai.provider === "openai") connectSrc.push("https://api.openai.com");
        else if (config.ai.provider === "anthropic") connectSrc.push("https://api.anthropic.com");
      }
      const csp = [
        `default-src 'self'`,
        `script-src 'self' 'unsafe-inline'`,
        `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net`,
        `font-src 'self' https://fonts.gstatic.com`,
        `img-src 'self' data: https:`,
        `connect-src ${connectSrc.join(" ")}`,
      ].join("; ");
      return result.replace(
        "<head>",
        `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}">`
      );
    },

    configureServer(srv) {
      server = srv;

      // Redirect middleware — matches config-level and frontmatter-level redirects
      srv.middlewares.use((req, res, next) => {
        if (!req.url || !config) return next();
        const urlPath = req.url.split("?")[0];

        // Check config-level redirects
        const configRedirect = config.redirects?.find((r) => r.from === urlPath);
        if (configRedirect) {
          res.writeHead(301, { Location: configRedirect.to });
          res.end();
          return;
        }

        // Check frontmatter-level redirect_from
        for (const route of routes) {
          if (route.frontmatter.redirect_from) {
            for (const from of route.frontmatter.redirect_from) {
              if (from === urlPath) {
                res.writeHead(301, { Location: route.urlPath });
                res.end();
                return;
              }
            }
          }
        }

        next();
      });

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
      if (id === VIRTUAL_OVERRIDES) return RESOLVED_OVERRIDES;
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
        const routesSrc = isDevMode ? routes : routes.filter(r => !r.frontmatter.draft);
        const routeData = routesSrc.map((r) => ({
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
              localeDirs: config.i18n.localeDirs || {},
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
        const loaderRoutes = isDevMode ? routes : routes.filter(r => !r.frontmatter.draft);
        const entries = loaderRoutes.map((r) => {
          const importPath = `virtual:tome/page/${r.id}`;
          return `  ${JSON.stringify(r.id)}: () => import(${JSON.stringify(importPath)})`;
        });
        return `
          const loaders = {\n${entries.join(",\n")}\n          };
          export default function loadPageModule(id) {
            const loader = loaders[id];
            if (!loader) throw new Error("Unknown page: " + id);
            return loader();
          }
        `;
      }

      // Doc context for AI RAG — exports full page content for the AI chat widget
      if (id === RESOLVED_DOC_CONTEXT) {
        const docs: { id: string; title: string; content: string }[] = [];
        let totalChars = 0;
        const MAX_CHARS = 50000;

        for (const route of routes) {
          if (route.frontmatter.hidden || route.frontmatter.draft || route.filePath === "__api-reference__") continue;
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

      // Serve component overrides as virtual module
      if (id === RESOLVED_OVERRIDES) {
        const overrides = (config as any).overrides || {};
        const imports: string[] = [];
        const exportNames: string[] = [];

        const slots = ["Header", "Footer", "Sidebar", "Toc", "PageFooter"] as const;
        for (const slot of slots) {
          if (overrides[slot]) {
            imports.push(`import ${slot} from ${JSON.stringify(overrides[slot])};`);
            exportNames.push(slot);
          }
        }

        return `${imports.join("\n")}
export default { ${exportNames.join(", ")} };
`;
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
      // Run buildStart hook for Tome plugins
      const tomePluginsForBuild: TomePlugin[] = (config as any).tomePlugins || [];
      await runPluginHookAsync(tomePluginsForBuild, 'buildStart');

      // TOM-24: Analytics injection moved to transformIndexHtml

      // Generate MCP manifest at build time (TOM-33)
      if (config.mcp?.enabled !== false) {
        const manifest = {
          name: config.name,
          version: "1.0.0",
          pages: await Promise.all(
            routes
              .filter((r) => !r.frontmatter.hidden && !r.frontmatter.draft)
              .filter((r) => r.filePath !== "__api-reference__")
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

      // ── llms.txt generation ─────────────────────────────────
      // In production builds (generateBundle), always filter out drafts
      const visibleRoutes = routes.filter((r) => !r.frontmatter.hidden && !r.frontmatter.draft);
      const baseUrl = config.baseUrl || "";

      // llms.txt — page index with titles, descriptions, URLs
      const llmsTxtLines = [
        `# ${config.name}`,
        "",
        "> Documentation site powered by Tome",
        "",
        ...visibleRoutes.map((r) => {
          const url = baseUrl ? `${baseUrl.replace(/\/$/, "")}${r.urlPath}` : r.urlPath;
          const desc = r.frontmatter.description ? ` - ${r.frontmatter.description}` : "";
          return `- [${r.frontmatter.title}](${url})${desc}`;
        }),
      ];

      this.emitFile({
        type: "asset",
        fileName: "llms.txt",
        source: llmsTxtLines.join("\n"),
      });

      // llms-full.txt — full raw markdown of all non-hidden pages
      const fullParts: string[] = [`# ${config.name}\n`];
      for (const r of visibleRoutes) {
        if (r.isMdx || r.filePath === "__api-reference__") continue;
        try {
          const page = await getPage(r.id);
          if (page?.raw) {
            fullParts.push(`## ${r.frontmatter.title}\n\n${page.raw.trim()}\n`);
          }
        } catch {}
      }

      this.emitFile({
        type: "asset",
        fileName: "llms-full.txt",
        source: fullParts.join("\n---\n\n"),
      });

      // ── Redirect generation ───────────────────────────────
      const allRedirects: Array<{ from: string; to: string }> = [
        ...(config.redirects || []),
      ];

      // Collect frontmatter-level redirect_from
      for (const r of routes) {
        if (r.frontmatter.redirect_from) {
          for (const from of r.frontmatter.redirect_from) {
            allRedirects.push({ from, to: r.urlPath });
          }
        }
      }

      if (allRedirects.length > 0) {
        // _redirects file (Netlify/Vercel/Cloudflare-compatible)
        const redirectLines = allRedirects.map((r) => `${r.from}  ${r.to}  301`);
        this.emitFile({
          type: "asset",
          fileName: "_redirects",
          source: redirectLines.join("\n"),
        });

        // Emit meta-refresh HTML files for each redirect source path
        // (ensures redirects work on any static hosting platform)
        for (const r of allRedirects) {
          const filePath = r.from.replace(/^\//, "") || "index";
          this.emitFile({
            type: "asset",
            fileName: `${filePath}.html`,
            source: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${r.to}"><link rel="canonical" href="${r.to}"></head><body><a href="${r.to}">Moved here</a></body></html>`,
          });
        }
      }

      // ── Per-page HTML shells for Pagefind indexing + static hosting ──
      // Each page gets a lightweight HTML file that:
      // 1. Contains page text in data-pagefind-body for search indexing
      // 2. Loads the SPA entry point so client-side routing takes over
      const bp = (config.basePath || "/").replace(/\/$/, "");

      // Find the main entry JS + CSS assets from the bundle
      let entryJs = "";
      let entryCss = "";
      if (bundle) {
        for (const fileName of Object.keys(bundle)) {
          const chunk = bundle[fileName];
          if (chunk.type === "chunk" && chunk.isEntry) {
            entryJs = fileName;
          }
          if (chunk.type === "asset" && fileName.endsWith(".css")) {
            entryCss = fileName;
          }
        }
      }

      for (const route of routes) {
        if (route.frontmatter.hidden || route.frontmatter.draft) continue;
        if (route.filePath === "__api-reference__") continue;
        // Skip root index — Vite already generates it
        if (route.urlPath === "/" || route.urlPath === "") continue;

        const title = route.frontmatter.title || "Untitled";
        const description = route.frontmatter.description || "";
        const canonical = `${bp}${route.urlPath}`;

        // Get page text content for Pagefind indexing
        let textContent = "";
        if (!route.isMdx) {
          try {
            const page = await getPage(route.id);
            if (page?.raw) {
              // Use raw markdown (strip frontmatter) — plain text for search
              textContent = page.raw.trim();
            }
          } catch {}
        }

        // Build the HTML shell
        const htmlParts = [
          `<!DOCTYPE html>`,
          `<html lang="en">`,
          `<head>`,
          `<meta charset="utf-8">`,
          `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
          `<title>${title} | ${config.name}</title>`,
          description ? `<meta name="description" content="${description.replace(/"/g, "&quot;")}">` : "",
          `<link rel="canonical" href="${canonical}">`,
          entryCss ? `<link rel="stylesheet" href="${bp}/${entryCss}">` : "",
          entryJs ? `<script type="module" src="${bp}/${entryJs}"></script>` : "",
          `</head>`,
          `<body>`,
          `<div id="tome-root"></div>`,
          textContent ? `<div data-pagefind-body style="display:none"><h1>${title}</h1>\n${textContent}</div>` : "",
          `</body>`,
          `</html>`,
        ].filter(Boolean).join("\n");

        // Emit at urlPath as directory index (e.g., "quickstart/index.html")
        const filePath = route.urlPath.replace(/^\//, "");
        this.emitFile({
          type: "asset",
          fileName: `${filePath}/index.html`,
          source: htmlParts,
        });
      }

      // ── JSON-LD schema markup injection ──────────────────────
      // Inject structured data into every HTML file in the bundle
      const siteUrl = (baseUrl || "").replace(/\/$/, "");

      // WebSite schema for the main index.html
      const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: config.name,
        url: siteUrl || undefined,
        description: `Documentation site powered by Tome`,
        potentialAction: {
          "@type": "SearchAction",
          target: siteUrl ? `${siteUrl}/search?q={search_term_string}` : undefined,
          "query-input": "required name=search_term_string",
        },
      };

      // Inject JSON-LD into all HTML assets in the bundle
      for (const fileName of Object.keys(bundle || {})) {
        const chunk = bundle[fileName];
        if (
          chunk.type === "asset" &&
          fileName.endsWith(".html") &&
          typeof chunk.source === "string"
        ) {
          // Determine page-specific schema based on route match
          const routeMatch = routes.find((r) => {
            const routeFile = r.urlPath.replace(/^\//, "");
            return fileName === `${routeFile}/index.html` || (fileName === "index.html" && (r.urlPath === "/" || r.urlPath === ""));
          });

          const schemas: any[] = [];

          if (fileName === "index.html") {
            schemas.push(websiteJsonLd);
          }

          if (routeMatch) {
            const articleUrl = siteUrl ? `${siteUrl}${routeMatch.urlPath}` : routeMatch.urlPath;
            schemas.push({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: routeMatch.frontmatter.title,
              description: routeMatch.frontmatter.description || undefined,
              url: articleUrl,
              isPartOf: {
                "@type": "WebSite",
                name: config.name,
                url: siteUrl || undefined,
              },
            });
          }

          if (schemas.length > 0) {
            const jsonLdTags = schemas
              .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
              .join("\n");
            chunk.source = chunk.source.replace("</head>", `${jsonLdTags}\n</head>`);
          }
        }
      }

      // ── skill.md generation ──────────────────────────────────
      // Agent-readable file describing the site's capabilities and structure
      const skillParts: string[] = [
        `# ${config.name}`,
        "",
        `> Documentation site powered by [Tome](https://tome.dev)`,
        "",
        "## Overview",
        "",
        `This is the documentation for **${config.name}**. It is a static documentation site with full-text search, structured data, and machine-readable formats.`,
        "",
        "## Available Resources",
        "",
        "| Resource | Path | Description |",
        "|----------|------|-------------|",
        "| llms.txt | /llms.txt | Lightweight page index with titles, descriptions, and URLs |",
        "| llms-full.txt | /llms-full.txt | Full raw markdown content of all pages |",
        "| MCP manifest | /mcp.json | Machine-readable page metadata with headings and tags |",
        "| skill.md | /skill.md | This file — agent capabilities and site structure |",
        "| robots.txt | /robots.txt | Crawler directives with AI agent permissions |",
        "| Search API | /search.json | Pagefind search index metadata for programmatic search |",
        "",
        "## Site Structure",
        "",
        "### Pages",
        "",
        ...visibleRoutes.map((r) => {
          const url = siteUrl ? `${siteUrl}${r.urlPath}` : r.urlPath;
          const desc = r.frontmatter.description ? ` — ${r.frontmatter.description}` : "";
          return `- **[${r.frontmatter.title}](${url})**${desc}`;
        }),
        "",
        "## How to Use This Site",
        "",
        "### For AI Agents",
        "",
        "1. **Quick overview**: Read `/llms.txt` for a page index with titles and URLs",
        "2. **Full content**: Read `/llms-full.txt` for complete raw markdown of all pages",
        "3. **Structured data**: Parse `/mcp.json` for machine-readable metadata including headings, tags, and content",
        "4. **Search**: Use Pagefind search at `/pagefind/pagefind.js` or check `/search.json` for index metadata",
        "",
        "### Capabilities",
        "",
        `- **Search provider**: ${config.search?.provider || "local (Pagefind)"}`,
        ...(config.api ? [`- **API reference**: Available at /api-reference`] : []),
        ...(config.ai?.enabled ? [`- **AI chat**: Built-in AI assistant available`] : []),
        ...(config.versioning ? [`- **Versioned docs**: ${config.versioning.versions.join(", ")} (current: ${config.versioning.current})`] : []),
        ...(config.i18n && config.i18n.locales.length > 1 ? [`- **Internationalization**: ${config.i18n.locales.join(", ")}`] : []),
        "",
      ];

      this.emitFile({
        type: "asset",
        fileName: "skill.md",
        source: skillParts.join("\n"),
      });

      // ── robots.txt generation ────────────────────────────────
      // Explicitly allows AI crawlers and points to machine-readable resources
      const robotsLines = [
        "# Tome Documentation Site",
        "# https://tome.dev",
        "",
        "User-agent: *",
        "Allow: /",
        "",
        "# AI Crawlers — explicitly allowed",
        "User-agent: GPTBot",
        "Allow: /",
        "",
        "User-agent: ClaudeBot",
        "Allow: /",
        "",
        "User-agent: Claude-Web",
        "Allow: /",
        "",
        "User-agent: Amazonbot",
        "Allow: /",
        "",
        "User-agent: anthropic-ai",
        "Allow: /",
        "",
        "User-agent: Bytespider",
        "Allow: /",
        "",
        "User-agent: CCBot",
        "Allow: /",
        "",
        "User-agent: cohere-ai",
        "Allow: /",
        "",
        "User-agent: PerplexityBot",
        "Allow: /",
        "",
        "# Machine-readable resources",
        ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`] : []),
        "",
        "# AI/LLM Resources",
        `# llms.txt: ${siteUrl ? siteUrl + "/llms.txt" : "/llms.txt"}`,
        `# llms-full.txt: ${siteUrl ? siteUrl + "/llms-full.txt" : "/llms-full.txt"}`,
        `# skill.md: ${siteUrl ? siteUrl + "/skill.md" : "/skill.md"}`,
        `# MCP manifest: ${siteUrl ? siteUrl + "/mcp.json" : "/mcp.json"}`,
        "",
      ];

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: robotsLines.join("\n"),
      });

      // ── search.json — structured search API metadata ─────────
      // Exposes page index as a simple JSON file so agents can
      // programmatically search without loading JavaScript
      const searchIndex = {
        version: 1,
        generator: "tome",
        site: config.name,
        totalPages: visibleRoutes.length,
        searchEndpoint: "/pagefind/pagefind.js",
        pages: await Promise.all(
          visibleRoutes.map(async (r) => {
            const url = siteUrl ? `${siteUrl}${r.urlPath}` : r.urlPath;
            let headings: string[] = [];
            let wordCount = 0;

            if (!r.isMdx && r.filePath !== "__api-reference__") {
              try {
                const page = await getPage(r.id);
                if (page) {
                  headings = page.headings.map((h) => h.text);
                  wordCount = (page.raw || "").split(/\s+/).filter(Boolean).length;
                }
              } catch {}
            }

            return {
              id: r.id,
              url,
              title: r.frontmatter.title,
              description: r.frontmatter.description || "",
              headings,
              tags: r.frontmatter.tags || [],
              wordCount,
            };
          })
        ),
      };

      this.emitFile({
        type: "asset",
        fileName: "search.json",
        source: JSON.stringify(searchIndex, null, 2),
      });

      // Run buildEnd hook for Tome plugins
      const outputDir = typeof _outputOptions?.dir === 'string' ? _outputOptions.dir : 'dist';
      await runPluginHookAsync(tomePluginsForBuild, 'buildEnd', outputDir);
    },
  };

  // ── MDX PLUGIN (TOM-8) ─────────────────────────────────
  // Dynamically load @mdx-js/rollup so it's optional at startup
  let mdxPlugin: Plugin | null = null;
  try {
    const { default: createMdxPlugin } = _require("@mdx-js/rollup");
    const remarkGfm = _require("remark-gfm").default;
    const remarkFrontmatter = _require("remark-frontmatter").default;
    // Sandbox: recma plugin that blocks dangerous JS patterns in MDX.
    // We wrap the plugin so it reads config lazily at transform time
    // (config is assigned in configResolved, after plugin construction).
    const lazySandbox = () => (tree: any, file: any) => {
      if (!(config as any)?.sandbox?.enabled) return;
      return recmaSandbox({ allowedExpressions: (config as any).sandbox.allowedExpressions ?? [] })(tree, file);
    };
    const recmaPlugins: any[] = [[lazySandbox]];

    // Remark plugin: transform ```mermaid code blocks into JSX placeholder divs
    // so the client-side mermaid renderer in entry.tsx can pick them up.
    // Uses mdxJsxFlowElement (native MDX AST node) — no rehype-raw needed.
    const walkTree = (node: any, fn: (n: any, i: number, parent: any) => void, parent?: any, index?: number) => {
      fn(node, index ?? 0, parent);
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          walkTree(node.children[i], fn, node, i);
        }
      }
    };
    const remarkMermaid = () => (tree: any) => {
      walkTree(tree, (node: any, index: number, parent: any) => {
        if (node.type === "code" && node.lang === "mermaid" && parent && typeof index === "number") {
          const encoded = Buffer.from((node.value || "").trim()).toString("base64");
          parent.children[index] = {
            type: "mdxJsxFlowElement",
            name: "div",
            attributes: [
              { type: "mdxJsxAttribute", name: "className", value: "tome-mermaid" },
              { type: "mdxJsxAttribute", name: "data-mermaid", value: encoded },
            ],
            children: [],
            data: { _mdxExplicitJsx: true },
          };
        }
      });
    };

    // Remark plugin: transform math blocks into JSX for client-side KaTeX rendering.
    // remark-math + rehype-katex are ESM-only so we can't _require() them.
    // Instead, emit placeholder elements that entry.tsx renders with KaTeX CDN.
    const remarkMathToJsx = () => (tree: any) => {
      walkTree(tree, (node: any, index: number, parent: any) => {
        if (!parent || typeof index !== "number") return;
        // Block math: ```math or $$ fenced
        if (node.type === "code" && node.lang === "math") {
          const encoded = Buffer.from((node.value || "").trim()).toString("base64");
          parent.children[index] = {
            type: "mdxJsxFlowElement",
            name: "div",
            attributes: [
              { type: "mdxJsxAttribute", name: "className", value: "tome-math tome-math-block" },
              { type: "mdxJsxAttribute", name: "data-math", value: encoded },
            ],
            children: [],
            data: { _mdxExplicitJsx: true },
          };
        }
      });
    };

    // Build remark/rehype plugin arrays
    const remarkPlugins: any[] = [remarkGfm, [remarkFrontmatter, ["yaml"]], remarkMermaid, remarkMathToJsx];
    const rehypePlugins: any[] = [];

    mdxPlugin = createMdxPlugin({
      remarkPlugins,
      rehypePlugins,
      recmaPlugins,
    }) as Plugin;
  } catch {
    // @mdx-js/rollup not available — MDX files will fall back to HTML processing
  }

  return mdxPlugin ? [mdxPlugin, corePlugin] : [corePlugin];
}
