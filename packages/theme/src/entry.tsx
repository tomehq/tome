import React, { useState, useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { Shell } from "./Shell.js";

// @ts-ignore — resolved by vite-plugin-tome
import config from "virtual:tome/config";
// @ts-ignore — resolved by vite-plugin-tome
import { routes, navigation } from "virtual:tome/routes";
// @ts-ignore — resolved by vite-plugin-tome
import loadPageModule from "virtual:tome/page-loader";
// @ts-ignore — resolved by vite-plugin-tome
import docContext from "virtual:tome/doc-context";

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
};

// ── CONTENT STYLES ───────────────────────────────────────
const contentStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Fira+Code:wght@400;500;600&display=swap');

  .tome-content h1 { display: none; }
  .tome-content h2 { font-family: var(--font-body); font-size: 1.35em; font-weight: 600; margin-top: 2em; margin-bottom: 0.5em; display: flex; align-items: center; gap: 10px; letter-spacing: 0.01em; }
  .tome-content h2::before { content: "#"; font-family: var(--font-heading); font-size: 1.2em; font-weight: 300; font-style: italic; color: var(--ac); opacity: 0.5; }
  .tome-content h3 { font-family: var(--font-body); font-size: 1.15em; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.5em; }
  .tome-content h4 { font-family: var(--font-body); font-size: 1.05em; font-weight: 600; margin-top: 1.2em; margin-bottom: 0.5em; }
  .tome-content p { color: var(--tx2); line-height: 1.8; margin-bottom: 1em; font-size: 14.5px; }
  .tome-content a { color: var(--ac); text-decoration: none; }
  .tome-content a:hover { text-decoration: underline; }
  .tome-content .heading-anchor { display: none; }
  .tome-content ul, .tome-content ol { color: var(--tx2); padding-left: 1.5em; margin-bottom: 1em; }
  .tome-content li { margin-bottom: 0.3em; line-height: 1.7; }
  .tome-content code { font-family: var(--font-code); font-size: 0.88em; background: var(--cdBg); padding: 0.15em 0.4em; border-radius: 2px; color: var(--ac); }
  .tome-content pre { margin-bottom: 1.2em; border-radius: 2px; overflow-x: auto; border: 1px solid var(--bd); }
  .tome-content pre code { background: none; padding: 1em 1.2em; display: block; font-size: 12.5px; line-height: 1.7; color: var(--cdTx); }
  .tome-content blockquote { border-left: 3px solid var(--ac); padding: 0.5em 1em; margin: 1em 0; background: var(--acD); border-radius: 0 2px 2px 0; }
  .tome-content blockquote p { color: var(--tx2); margin: 0; }
  .tome-content table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
  .tome-content th, .tome-content td { padding: 0.5em 0.8em; border: 1px solid var(--bd); text-align: left; font-size: 0.9em; }
  .tome-content th { background: var(--sf); font-weight: 600; }
  .tome-content img { max-width: 100%; border-radius: 2px; cursor: zoom-in; }
  .tome-content hr { border: none; border-top: 1px solid var(--bd); margin: 2em 0; }
  .tome-mermaid { margin: 1.2em 0; text-align: center; }
  .tome-mermaid svg { max-width: 100%; height: auto; }

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
`;

// ── PAGE TYPES ────────────────────────────────────────────
interface HtmlPage {
  isMdx: false;
  html: string;
  frontmatter: { title: string; description?: string; toc?: boolean; type?: string };
  headings: Array<{ depth: number; text: string; id: string }>;
  changelogEntries?: Array<{ version: string; date?: string; url?: string; sections: Array<{ type: string; items: string[] }> }>;
}

interface MdxPage {
  isMdx: true;
  component: React.ComponentType<{ components?: Record<string, React.ComponentType> }>;
  frontmatter: { title: string; description?: string; toc?: boolean; type?: string };
  headings: Array<{ depth: number; text: string; id: string }>;
}

type LoadedPage = HtmlPage | MdxPage;

// ── PAGE LOADER ──────────────────────────────────────────
async function loadPage(id: string): Promise<LoadedPage | null> {
  try {
    const route = routes.find((r: any) => r.id === id);
    const mod = await loadPageModule(id);

    if (route?.isMdx && mod.meta) {
      // TOM-8: MDX page — mod.default is the React component
      return {
        isMdx: true,
        component: mod.default,
        frontmatter: mod.meta.frontmatter,
        headings: mod.meta.headings,
      };
    }

    // Regular .md page — mod.default is { html, frontmatter, headings }
    if (!mod.default) return null;

    // TOM-49: Changelog page type
    if (mod.isChangelog && mod.changelogEntries) {
      return { isMdx: false, ...mod.default, changelogEntries: mod.changelogEntries };
    }

    return { isMdx: false, ...mod.default };
  } catch (err) {
    console.error(`Failed to load page: ${id}`, err);
    return null;
  }
}

// ── APP ──────────────────────────────────────────────────
function App() {
  const [currentPageId, setCurrentPageId] = useState(() => {
    const hash = window.location.hash.slice(1);
    if (hash && routes.some((r: any) => r.id === hash)) return hash;
    return routes[0]?.id || "index";
  });

  const [pageData, setPageData] = useState<LoadedPage | null>(null);
  const [loading, setLoading] = useState(true);

  const navigateTo = useCallback(async (id: string) => {
    setLoading(true);
    setCurrentPageId(id);
    window.location.hash = id;
    const data = await loadPage(id);
    setPageData(data);
    setLoading(false);
  }, []);

  useEffect(() => { navigateTo(currentPageId); }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      // Only navigate if hash matches a known route ID (ignore heading anchors)
      if (hash && hash !== currentPageId && routes.some((r: any) => r.id === hash)) {
        navigateTo(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [currentPageId, navigateTo]);

  // Mermaid diagram rendering: load from CDN and render .tome-mermaid elements
  useEffect(() => {
    const els = document.querySelectorAll(".tome-mermaid[data-mermaid]");
    if (els.length === 0) return;
    let cancelled = false;

    const MERMAID_CDN = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

    (async () => {
      try {
        // Load mermaid from CDN (ESM) — works in all browsers, no bundler dependency
        const { default: mermaid } = await import(/* @vite-ignore */ MERMAID_CDN);
        if (cancelled) return;
        const isDark = document.documentElement.classList.contains("dark");
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          fontFamily: "var(--font-body)",
        });

        for (let i = 0; i < els.length; i++) {
          const el = els[i] as HTMLElement;
          if (el.querySelector("svg")) continue; // already rendered
          const encoded = el.getAttribute("data-mermaid");
          if (!encoded) continue;
          try {
            const code = atob(encoded);
            const { svg } = await mermaid.render(`tome-mermaid-${i}-${Date.now()}`, code);
            if (!cancelled) el.innerHTML = svg;
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
  }, [pageData, loading]);

  const allPages = routes.map((r: any) => ({
    id: r.id,
    title: r.frontmatter.title,
    description: r.frontmatter.description,
  }));

  // TOM-48: Compute edit URL for current page
  const currentRoute = routes.find((r: any) => r.id === currentPageId);
  let editUrl: string | undefined;
  if (config.editLink && currentRoute?.filePath) {
    const { repo, branch = "main", dir = "" } = config.editLink;
    const dirPrefix = dir ? `${dir.replace(/\/$/, "")}/` : "";
    editUrl = `https://github.com/${repo}/edit/${branch}/${dirPrefix}${currentRoute.filePath}`;
  }

  // KaTeX CSS: inject stylesheet when math is enabled
  useEffect(() => {
    if (!(config as any).math) return;
    const id = "tome-katex-css";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style>{contentStyles}</style>
      <Shell
        config={config}
        navigation={navigation}
        currentPageId={currentPageId}
        pageHtml={!pageData?.isMdx ? (loading ? "<p>Loading...</p>" : pageData?.html || "<p>Page not found</p>") : undefined}
        pageComponent={pageData?.isMdx ? pageData.component : undefined}
        mdxComponents={MDX_COMPONENTS}
        pageTitle={pageData?.frontmatter.title || (loading ? "Loading..." : "Not Found")}
        pageDescription={pageData?.frontmatter.description}
        headings={pageData?.headings || []}
        tocEnabled={pageData?.frontmatter.toc !== false}
        editUrl={editUrl}
        lastUpdated={currentRoute?.lastUpdated}
        changelogEntries={!pageData?.isMdx ? pageData?.changelogEntries : undefined}
        onNavigate={navigateTo}
        allPages={allPages}
        docContext={docContext}
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
