import React, { useState, useEffect, useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Shell } from "./Shell.js";
import { pathnameToPageId as _pathnameToPageId, pageIdToPath as _pageIdToPath } from "./routing.js";
import {
  loadPage,
  computeEditUrl,
  resolveInitialPageId,
  detectCurrentVersion,
  type LoadedPage,
} from "./entry-helpers.js";

// @ts-ignore — resolved by vite-plugin-tome
import config from "virtual:tome/config";
// @ts-ignore — resolved by vite-plugin-tome
import { routes, navigation, versions, i18n } from "virtual:tome/routes";
// @ts-ignore — resolved by vite-plugin-tome
import loadPageModule from "virtual:tome/page-loader";
// @ts-ignore — resolved by vite-plugin-tome
import docContext from "virtual:tome/doc-context";
// @ts-ignore — resolved by vite-plugin-tome
import overrides from "virtual:tome/overrides";

// TOM-8: Built-in MDX components from @tomehq/components
// These are injected into every MDX page automatically
import {
  Callout,
  Tabs,
  Card,
  CardGroup,
  Steps,
  Accordion,
  ChangelogTimeline,
  PackageManager,
  TypeTable,
  FileTree,
  CodeSamples,
  LinkCard,
  CardGrid,
  ApiReference,
} from "@tomehq/components";

const MDX_COMPONENTS: Record<string, React.ComponentType<any>> = {
  Callout,
  Tabs,
  Card,
  CardGroup,
  Steps,
  Accordion,
  ChangelogTimeline,
  PackageManager,
  TypeTable,
  FileTree, // Sub-components accessible as <FileTree.File /> and <FileTree.Folder /> in MDX
  CodeSamples,
  LinkCard,
  CardGrid,
};

// ── CONTENT STYLES ───────────────────────────────────────
const contentStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Fira+Code:wght@400;500;600&display=swap');

  html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
  #tome-root { height: 100%; overflow: hidden; }

  .tome-content h1 { display: none; }
  .tome-content h2 { font-family: var(--font-body); font-size: 1.35em; font-weight: 600; margin-top: 2em; margin-bottom: 0.5em; display: flex; align-items: center; gap: 10px; letter-spacing: 0.01em; }
  .tome-content h2::before { content: "#"; font-family: var(--font-heading); font-size: 1.2em; font-weight: 300; font-style: italic; color: var(--ac); opacity: 0.5; }
  .tome-content h3 { font-family: var(--font-body); font-size: 1.15em; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.5em; }
  .tome-content h4 { font-family: var(--font-body); font-size: 1.05em; font-weight: 600; margin-top: 1.2em; margin-bottom: 0.5em; }
  .tome-content p { color: var(--tx2); line-height: 1.8; margin-bottom: 1em; font-size: 14.5px; }
  .tome-content a { color: var(--ac); text-decoration: none; }
  .tome-content a:hover { text-decoration: underline; }
  .tome-content .heading-anchor { display: none; }
  .tome-content ul, .tome-content ol { color: var(--tx2); padding-inline-start: 1.5em; margin-bottom: 1em; }
  .tome-content li { margin-bottom: 0.3em; line-height: 1.7; }
  .tome-content code { font-family: var(--font-code); font-size: 0.88em; background: var(--cdBg); padding: 0.15em 0.4em; border-radius: 2px; color: var(--ac); }
  .tome-content pre { margin-bottom: 1.2em; border-radius: 2px; overflow-x: auto; border: 1px solid var(--bd); }
  .tome-content pre code { background: none; padding: 1em 1.2em; display: block; font-size: 12.5px; line-height: 1.7; color: var(--cdTx); }
  .tome-content blockquote { border-inline-start: 3px solid var(--ac); padding: 0.5em 1em; margin: 1em 0; background: var(--acD); border-radius: 0 2px 2px 0; }
  .tome-content blockquote p { color: var(--tx2); margin: 0; }
  .tome-content table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
  .tome-content th, .tome-content td { padding: 0.5em 0.8em; border: 1px solid var(--bd); text-align: start; font-size: 0.9em; }
  .tome-content th { background: var(--sf); font-weight: 600; }
  .tome-content img { max-width: 100%; border-radius: 2px; cursor: zoom-in; }
  .tome-content hr { border: none; border-top: 1px solid var(--bd); margin: 2em 0; }
  .tome-mermaid { margin: 1.2em 0; text-align: center; overflow-x: auto; }
  .tome-mermaid svg { max-width: 100%; height: auto; overflow: visible; }
  .tome-mermaid svg .nodeLabel { overflow: visible; white-space: nowrap; }
  /* Ensure mermaid text meets WCAG AA contrast in light mode */
  /* Mermaid v11 uses foreignObject with inline-styled spans — !important needed */
  html:not(.dark) .tome-mermaid svg .nodeLabel,
  html:not(.dark) .tome-mermaid svg .nodeLabel span,
  html:not(.dark) .tome-mermaid svg .nodeLabel div,
  html:not(.dark) .tome-mermaid svg foreignObject div,
  html:not(.dark) .tome-mermaid svg foreignObject span { color: #1a1a1a !important; }
  html:not(.dark) .tome-mermaid svg .edgeLabel,
  html:not(.dark) .tome-mermaid svg .edgeLabel span { color: #333 !important; }
  html:not(.dark) .tome-mermaid svg text { fill: #1a1a1a !important; }
  html:not(.dark) .tome-mermaid svg .node rect,
  html:not(.dark) .tome-mermaid svg .node polygon { stroke: #555 !important; }
  /* Dark mode: force bright text in mermaid nodes for readability */
  html.dark .tome-mermaid svg .nodeLabel,
  html.dark .tome-mermaid svg .nodeLabel span,
  html.dark .tome-mermaid svg .nodeLabel div,
  html.dark .tome-mermaid svg foreignObject div,
  html.dark .tome-mermaid svg foreignObject span { color: #f0f0f0 !important; }
  html.dark .tome-mermaid svg .edgeLabel,
  html.dark .tome-mermaid svg .edgeLabel span { color: #ddd !important; }
  html.dark .tome-mermaid svg text { fill: #f0f0f0 !important; }

  /* Mobile responsive content */
  @media (max-width: 767px) {
    .tome-content h2 { font-size: 1.2em; margin-top: 1.5em; }
    .tome-content h3 { font-size: 1.05em; }
    .tome-content pre code { font-size: 12px; padding: 0.8em 1em; }
    .tome-content table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .tome-content blockquote { margin: 0.8em 0; }
  }

  /* Selection style */
  ::selection { background: var(--acD); color: var(--ac); }

  /* Scrollbar style */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--bd); border-radius: 10px; }

  /* Grain overlay */
  .tome-grain::before {
    content: ""; position: fixed; inset: 0; z-index: 9999; pointer-events: none;
    opacity: .35;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-repeat: repeat; background-size: 256px;
  }

  /* ── Expressive code blocks ───────────────────────────── */

  /* Code block wrapper (for titled blocks) */
  .tome-code-block-wrapper { position: relative; margin-bottom: 1.2em; border: 1px solid var(--bd); border-radius: 2px; overflow: hidden; }
  .tome-code-block-wrapper pre { margin-bottom: 0; border: none; border-radius: 0; }
  .tome-code-title {
    font-family: var(--font-code); font-size: 12px; color: var(--tx2);
    background: var(--sf); padding: 6px 12px; border-bottom: 1px solid var(--bd);
    letter-spacing: 0.01em; font-weight: 500;
  }

  /* Line highlighting */
  .tome-content pre .line.tome-line-highlight {
    background: rgba(139, 148, 158, 0.1);
    display: inline-block; width: 100%; margin: 0 -1.2em; padding: 0 1.2em;
  }
  html.dark .tome-content pre .line.tome-line-highlight {
    background: rgba(200, 210, 220, 0.08);
  }

  /* Diff lines */
  .tome-content pre .line.tome-line-added {
    background: rgba(34, 197, 94, 0.12);
    display: inline-block; width: 100%; margin: 0 -1.2em; padding: 0 1.2em;
  }
  .tome-content pre .line.tome-line-removed {
    background: rgba(239, 68, 68, 0.12);
    display: inline-block; width: 100%; margin: 0 -1.2em; padding: 0 1.2em;
  }
  html.dark .tome-content pre .line.tome-line-added { background: rgba(34, 197, 94, 0.15); }
  html.dark .tome-content pre .line.tome-line-removed { background: rgba(239, 68, 68, 0.15); }

  /* Line numbers (CSS counter) */
  .tome-content pre[data-line-numbers] code {
    counter-reset: line;
  }
  .tome-content pre[data-line-numbers] .line::before {
    counter-increment: line;
    content: counter(line);
    display: inline-block; width: 2.5em; margin-inline-end: 1em;
    text-align: end; color: var(--txM); opacity: 0.4;
    font-size: 0.85em; user-select: none;
    border-inline-end: 1px solid var(--bd); padding-inline-end: 0.8em; margin-inline-end: 0.8em;
  }

  /* Word highlighting */
  .tome-word-highlight {
    background: rgba(139, 148, 158, 0.2); border-radius: 2px;
    padding: 1px 3px; margin: 0 -1px;
  }
  html.dark .tome-word-highlight {
    background: rgba(200, 210, 220, 0.15);
  }

  /* Copy button */
  .tome-content pre { position: relative; }
  .tome-copy-btn {
    position: absolute; top: 8px; inset-inline-end: 8px;
    font-family: var(--font-code); font-size: 11px;
    color: var(--tx2); background: var(--sf); border: 1px solid var(--bd);
    padding: 3px 8px; border-radius: 2px; cursor: pointer;
    opacity: 0; transition: opacity 0.15s;
    z-index: 2; line-height: 1.4;
  }
  .tome-content pre:hover .tome-copy-btn,
  .tome-copy-btn:focus { opacity: 1; }
  .tome-copy-btn:hover { background: var(--sfH); }

  /* Shiki dual-theme support */
  .shiki { background: var(--cdBg) !important; }

  /* Dark mode: switch Shiki tokens from light-theme inline colors to --shiki-dark CSS vars */
  html.dark .shiki,
  html.dark .shiki span {
    color: var(--shiki-dark) !important;
  }

  /* Brighten dim comment tokens (github-dark #6A737D is too low-contrast on dark backgrounds) */
  html.dark .shiki span[style*="--shiki-dark:#6A737D"] {
    --shiki-dark: #a0aab5 !important;
  }

  /* Light mode: darken low-contrast github-light tokens for WCAG AA on --cdBg backgrounds */
  html:not(.dark) .shiki span[style*="color:#6A737D"] { color: #57606a !important; }
  html:not(.dark) .shiki span[style*="color:#E36209"] { color: #b35405 !important; }
  html:not(.dark) .shiki span[style*="color:#6F42C1"] { color: #5a32a3 !important; }
  html:not(.dark) .shiki span[style*="color:#22863A"] { color: #1a6e2e !important; }
  html:not(.dark) .shiki span[style*="color:#D73A49"] { color: #b62324 !important; }
  html:not(.dark) .shiki span[style*="color:#005CC5"] { color: #0349b4 !important; }

  /* ── Twoslash type hover tooltips ───────────────────── */
  .twoslash-hover {
    position: relative;
    border-bottom: 1px dotted var(--tx2);
    cursor: help;
  }
  .twoslash-popup-container {
    position: absolute;
    opacity: 0;
    display: none;
    z-index: 10;
    left: 0;
    top: 100%;
    margin-top: 4px;
    padding: 6px 10px;
    background: var(--sf);
    border: 1px solid var(--bd);
    border-radius: 6px;
    font-size: 12px;
    font-family: var(--font-code);
    color: var(--tx);
    white-space: pre-wrap;
    max-width: 500px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    pointer-events: none;
  }
  .twoslash-hover:hover .twoslash-popup-container {
    opacity: 1;
    display: block;
  }
  /* Twoslash error/warning underlines */
  .twoslash-error {
    position: relative;
    background: rgba(239, 68, 68, 0.1);
    border-bottom: 2px wavy rgba(239, 68, 68, 0.6);
  }
  /* Twoslash highlighted identifiers */
  .twoslash-highlighted {
    background: rgba(139, 148, 158, 0.15);
    border-radius: 2px;
    padding: 1px 2px;
  }
  /* Twoslash type annotation line (^?) */
  .twoslash-popup-code .shiki { background: transparent !important; padding: 0; margin: 0; }
  .twoslash-popup-code .shiki code { padding: 0; font-size: 12px; }
  html.dark .twoslash-popup-container {
    background: var(--sf);
    border-color: var(--bd);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
`;

// ── ROUTING HELPERS ──────────────────────────────────────
const basePath = (config.basePath || "/").replace(/\/$/, "");

function pathnameToPageId(pathname: string): string | null {
  return _pathnameToPageId(pathname, basePath, routes);
}

function pageIdToPath(id: string): string {
  return _pageIdToPath(id, basePath, routes);
}

// ── EAGER INITIAL PAGE LOAD ──────────────────────────────
// Start loading the initial page at module scope — before React mounts —
// so the data is ready (or nearly ready) by the time App first renders.
// This eliminates the "Loading..." flash on production.
const _initialPageId = resolveInitialPageId(
  window.location.pathname,
  window.location.hash,
  routes,
  basePath,
  _pathnameToPageId,
);
const _initialPagePromise = loadPage(_initialPageId, routes, loadPageModule);

// ── APP ──────────────────────────────────────────────────
function App() {
  const [currentPageId, setCurrentPageId] = useState(_initialPageId);

  const [pageData, setPageData] = useState<LoadedPage | null>(null);
  const [loading, setLoading] = useState(true);

  const navigateTo = useCallback(async (id: string, opts?: { replace?: boolean; skipScroll?: boolean }) => {
    setLoading(true);
    setCurrentPageId(id);
    const fullPath = pageIdToPath(id);
    if (opts?.replace) {
      window.history.replaceState(null, "", fullPath);
    } else {
      window.history.pushState(null, "", fullPath);
    }
    const data = await loadPage(id, routes, loadPageModule);
    setPageData(data);
    setLoading(false);
    // Scroll to heading anchor if present, otherwise scroll to top
    if (!opts?.skipScroll) {
      const anchor = window.location.hash.slice(1);
      if (anchor) {
        requestAnimationFrame(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  // Initial page load — use the eagerly-started promise from module scope
  useEffect(() => {
    // If user landed on a legacy hash URL, redirect to clean path
    const hash = window.location.hash.slice(1);
    if (hash && routes.some((r: any) => r.id === hash)) {
      const fullPath = pageIdToPath(hash);
      window.history.replaceState(null, "", fullPath);
      navigateTo(hash, { replace: true });
    } else {
      // Use the pre-fetched promise instead of starting a new load
      const fullPath = pageIdToPath(currentPageId);
      window.history.replaceState(null, "", fullPath);
      _initialPagePromise.then((data) => {
        setPageData(data);
        setLoading(false);
      });
    }
  }, []);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      const id = pathnameToPageId(window.location.pathname);
      if (id && id !== currentPageId) {
        navigateTo(id, { replace: true, skipScroll: true });
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [currentPageId, navigateTo]);

  // Mermaid diagram rendering: load from CDN and render .tome-mermaid elements.
  // Also re-renders when theme changes (dark ↔ light) so colors stay correct.
  const mermaidModuleRef = useRef<any>(null);
  const [mermaidTheme, setMermaidTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    // Check the class first (already set), then fall back to config + system preference
    // to avoid a white flash before Shell syncs the dark class onto <html>
    if (document.documentElement.classList.contains("dark")) return "dark";
    const mode = config.theme?.mode || "auto";
    if (mode === "dark") return "dark";
    if (mode === "light") return "light";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Watch for dark class changes on <html> to trigger mermaid re-render
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setMermaidTheme(isDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".tome-mermaid[data-mermaid]");
    if (els.length === 0) return;
    let cancelled = false;

    const MERMAID_CDN = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

    (async () => {
      try {
        if (!mermaidModuleRef.current) {
          mermaidModuleRef.current = (await import(/* @vite-ignore */ MERMAID_CDN)).default;
        }
        const mermaid = mermaidModuleRef.current;
        if (cancelled) return;
        const isDark = mermaidTheme === "dark";
        const resolvedFont = getComputedStyle(document.documentElement).getPropertyValue("--font-body").trim() || "sans-serif";
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          fontFamily: resolvedFont,
          flowchart: { padding: 15, nodeSpacing: 30, rankSpacing: 40 },
        });

        for (let i = 0; i < els.length; i++) {
          const el = els[i] as HTMLElement;
          const encoded = el.getAttribute("data-mermaid");
          if (!encoded) continue;
          try {
            const code = atob(encoded);
            // Render new SVG off-screen first, then swap — avoids white flash on theme change
            const { svg } = await mermaid.render(`tome-mermaid-${i}-${Date.now()}`, code);
            if (!cancelled) {
              el.innerHTML = svg;
            }
          } catch (err) {
            console.warn("[tome] Mermaid render failed:", err);
            el.textContent = "Diagram rendering failed";
            (el as HTMLElement).style.cssText = "padding:16px;color:var(--txM);font-size:13px;border:1px dashed var(--bd);border-radius:2px;text-align:center;";
          }
        }
      } catch (err) {
        console.warn("[tome] Failed to load mermaid from CDN:", err);
        els.forEach((el) => {
          (el as HTMLElement).textContent = "Failed to load diagram renderer";
          (el as HTMLElement).style.cssText = "padding:16px;color:var(--txM);font-size:13px;border:1px dashed var(--bd);border-radius:2px;text-align:center;";
        });
      }
    })();

    return () => { cancelled = true; };
  }, [pageData, loading, mermaidTheme]);

  // Add copy buttons to all pre blocks (expressive code blocks)
  useEffect(() => {
    if (loading) return;
    const preBlocks = document.querySelectorAll(".tome-content pre");
    const buttons: HTMLButtonElement[] = [];
    preBlocks.forEach((pre) => {
      // Skip if already has a copy button
      if (pre.querySelector(".tome-copy-btn")) return;
      const btn = document.createElement("button");
      btn.className = "tome-copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        if (code) {
          try {
            await navigator.clipboard.writeText(code.textContent || "");
            btn.textContent = "Copied!";
            setTimeout(() => { btn.textContent = "Copy"; }, 2000);
          } catch {
            // Fallback for non-HTTPS contexts
            btn.textContent = "Failed";
            setTimeout(() => { btn.textContent = "Copy"; }, 2000);
          }
        }
      });
      pre.appendChild(btn);
      buttons.push(btn);
    });
    return () => {
      buttons.forEach((btn) => btn.remove());
    };
  }, [pageData, loading]);

  const allPages = routes.map((r: any) => ({
    id: r.id,
    title: r.frontmatter.title,
    description: r.frontmatter.description,
  }));

  // Compute current version from route metadata
  const currentRoute = routes.find((r: any) => r.id === currentPageId);
  const currentVersion = detectCurrentVersion(currentRoute, versions);
  const editUrl = computeEditUrl(config.editLink, currentRoute?.filePath);

  // RTL: detect current locale and compute text direction
  const currentLocale = currentRoute?.locale || i18n?.defaultLocale || "en";
  const dir: "ltr" | "rtl" = i18n?.localeDirs?.[currentLocale] || "ltr";

  // KaTeX CSS: inject stylesheet when math is enabled or math placeholders exist
  useEffect(() => {
    const hasMathPlaceholders = document.querySelectorAll(".tome-math[data-math]").length > 0;
    if (!(config as any).math && !hasMathPlaceholders) return;
    const id = "tome-katex-css";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, [pageData, loading]);

  // Client-side KaTeX rendering for MDX math placeholders (.tome-math[data-math])
  useEffect(() => {
    const els = document.querySelectorAll(".tome-math[data-math]");
    if (els.length === 0) return;
    let cancelled = false;

    const KATEX_CDN = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.mjs";

    (async () => {
      try {
        const katex = (await import(/* @vite-ignore */ KATEX_CDN)).default;
        if (cancelled) return;
        for (const el of els) {
          const encoded = el.getAttribute("data-math");
          if (!encoded) continue;
          try {
            const tex = atob(encoded);
            const isBlock = el.classList.contains("tome-math-block");
            katex.render(tex, el as HTMLElement, {
              displayMode: isBlock,
              throwOnError: false,
            });
          } catch (err) {
            console.warn("[tome] KaTeX render failed:", err);
          }
        }
      } catch (err) {
        console.warn("[tome] Failed to load KaTeX from CDN:", err);
      }
    })();

    return () => { cancelled = true; };
  }, [pageData, loading]);

  return (
    <>
      <style>{contentStyles}</style>
      <Shell
        config={config}
        navigation={navigation}
        currentPageId={currentPageId}
        pageHtml={!pageData?.isMdx ? (loading ? "" : pageData?.html || "<p>Page not found</p>") : undefined}
        pageComponent={pageData?.isMdx ? pageData.component : undefined}
        mdxComponents={MDX_COMPONENTS}
        pageTitle={pageData?.frontmatter.title || (loading ? "" : "Not Found")}
        pageDescription={pageData?.frontmatter.description}
        headings={pageData?.headings || []}
        tocEnabled={pageData?.frontmatter.toc !== false}
        editUrl={editUrl}
        lastUpdated={currentRoute?.lastUpdated}
        changelogEntries={!pageData?.isMdx ? pageData?.changelogEntries : undefined}
        apiManifest={(!pageData?.isMdx && pageData?.isApiReference) ? pageData.apiManifest : undefined}
        apiBaseUrl={config.api?.baseUrl}
        apiPlayground={config.api?.playground}
        apiAuth={config.api?.auth}
        ApiReferenceComponent={ApiReference}
        onNavigate={navigateTo}
        allPages={allPages}
        docContext={docContext}
        versioning={versions || undefined}
        currentVersion={currentVersion}
        basePath={basePath}
        isDraft={currentRoute?.frontmatter?.draft === true}
        dir={dir}
        i18n={i18n || undefined}
        currentLocale={currentLocale}
        overrides={overrides}
      />
    </>
  );
}

// ── MOUNT ────────────────────────────────────────────────
const container = document.getElementById("tome-root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

export default App;
