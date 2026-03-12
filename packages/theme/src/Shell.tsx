import React, { useState, useEffect, useRef, useCallback } from "react";
import { THEME_PRESETS, type PresetName } from "./presets.js";
import { AiChat } from "./AiChat.js";

// ── ACCENT PALETTE GENERATION (TOM-12) ───────────────────
function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function buildAccentOverride(hex: string, isDark: boolean) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb;
  // Dim variant: low-opacity fill
  const acD = `rgba(${r},${g},${b},${isDark ? 0.12 : 0.08})`;
  // Hover variant: slightly lighter in dark, darker in light
  const factor = isDark ? 1.15 : 0.85;
  const tr = Math.min(255, Math.round(r * factor));
  const tg = Math.min(255, Math.round(g * factor));
  const tb = Math.min(255, Math.round(b * factor));
  const acT = `rgb(${tr},${tg},${tb})`;
  return { ac: hex, acD, acT };
}

// ── ICONS ────────────────────────────────────────────────
const Icon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const SearchIcon = () => <Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" />;
const ChevRight = () => <Icon d="M9 18l6-6-6-6" size={14} />;
const ChevDown = () => <Icon d="M6 9l6 6 6-6" size={14} />;
const CopyIcon = () => <Icon d="M9 9h13v13H9zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" size={14} />;
const CheckIcon = () => <Icon d="M20 6L9 17l-5-5" size={14} />;
const MenuIcon = () => <Icon d="M3 12h18M3 6h18M3 18h18" size={20} />;
const XIcon = () => <Icon d="M18 6L6 18M6 6l12 12" size={18} />;
const MoonIcon = () => <Icon d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
const SunIcon = () => <Icon d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-4a1 1 0 0 1 1-1v-1a1 1 0 0 1-2 0v1a1 1 0 0 1 1 1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm18-1h-1a1 1 0 0 1 0 2h1a1 1 0 0 1 0-2ZM6.34 6.34a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41Zm12.73-2.12-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 1 1 1.41 1.41ZM6.34 17.66l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 1.41Zm12.73 2.12-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1-1.41 1.41Z" />;
const ArrowLeft = () => <Icon d="M19 12H5M12 19l-7-7 7-7" size={14} />;
const ArrowRight = () => <Icon d="M5 12h14M12 5l7 7-7 7" size={14} />;
const PencilIcon = () => <Icon d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" size={13} />;

// ── RELATIVE DATE FORMATTER (TOM-54) ─────────────────────
function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (isNaN(diffMs)) return "";
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  if (years >= 1) return `${years} year${years === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── PAGEFIND CLIENT (TOM-15) ─────────────────────────────
let pagefindInstance: any = null;
const PAGEFIND_PATH = "/_pagefind/pagefind.js";
async function initPagefind(): Promise<any> {
  if (pagefindInstance) return pagefindInstance;
  try {
    // Dynamic path variable prevents Vite from resolving at build time
    pagefindInstance = await import(/* @vite-ignore */ PAGEFIND_PATH);
    await pagefindInstance.init();
    return pagefindInstance;
  } catch {
    return null;
  }
}

// ── ALGOLIA DOCSEARCH (TOM-16) ──────────────────────────
let docSearchLoaded: Promise<any> | null = null;
function loadDocSearch(): Promise<any> {
  if (docSearchLoaded) return docSearchLoaded;
  docSearchLoaded = import("@docsearch/react").catch(() => null);
  return docSearchLoaded;
}

function AlgoliaSearchModal({
  appId,
  apiKey,
  indexName,
  onNavigate,
  onClose,
}: {
  appId: string;
  apiKey: string;
  indexName: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  const [DocSearchComponent, setDocSearchComponent] = useState<React.ComponentType<any> | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    loadDocSearch().then((mod) => {
      if (mod && mod.DocSearch) {
        setDocSearchComponent(() => mod.DocSearch);
      } else if (mod && mod.default) {
        setDocSearchComponent(() => mod.default);
      } else {
        setLoadFailed(true);
      }
    });
  }, []);

  // Extract page ID from a DocSearch result URL
  const extractPageId = useCallback((url: string): string => {
    try {
      const parsed = new URL(url, "http://localhost");
      const pathname = parsed.pathname;
      return pathname
        .replace(/^\//, "")
        .replace(/\/index\.html$/, "")
        .replace(/\.html$/, "")
        || "index";
    } catch {
      return "index";
    }
  }, []);

  if (loadFailed) {
    return (
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-start",
        justifyContent: "center", paddingTop: "12vh",
      }}>
        <div onClick={e => e.stopPropagation()} style={{
          background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 12,
          width: "100%", maxWidth: 520, boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          padding: "32px 18px", textAlign: "center", color: "var(--txM)", fontSize: 14,
        }}>
          Algolia DocSearch is not available. Install @docsearch/react to enable it.
        </div>
      </div>
    );
  }

  if (!DocSearchComponent) {
    // Loading state
    return (
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-start",
        justifyContent: "center", paddingTop: "12vh",
      }}>
        <div style={{
          background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 12,
          width: "100%", maxWidth: 520, boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          padding: "32px 18px", textAlign: "center", color: "var(--txM)", fontSize: 14,
        }}>
          Loading search...
        </div>
      </div>
    );
  }

  return (
    <div data-testid="algolia-search-modal">
      <DocSearchComponent
        appId={appId}
        apiKey={apiKey}
        indexName={indexName}
        navigator={{
          navigate({ itemUrl }: { itemUrl: string }) {
            const pageId = extractPageId(itemUrl);
            onNavigate(pageId);
          },
        }}
        hitComponent={({ hit, children }: { hit: { url: string }; children: React.ReactNode }) => (
          <a href={hit.url} onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            const pageId = extractPageId(hit.url);
            onNavigate(pageId);
          }}>
            {children}
          </a>
        )}
      />
    </div>
  );
}

// ── VERSION SWITCHER ICON (TOM-30) ───────────────────────
const VersionIcon = () => <Icon d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" size={14} />;

// ── LANGUAGE SWITCHER ICON (TOM-34) ──────────────────────
const GlobeIcon = () => <Icon d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" size={14} />;

// ── TOP NAV EXTERNAL LINK ICON ────────────────────────────
const ExtLinkIcon = () => <Icon d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" size={11} />;

// ── SHELL COMPONENT ──────────────────────────────────────
export interface VersioningInfo {
  current: string;
  versions: string[];
}

export interface I18nInfo {
  defaultLocale: string;
  locales: string[];
  localeNames?: Record<string, string>;
}

// ── CHANGELOG VIEW (TOM-49) ─────────────────────────────
const CHANGELOG_SECTION_COLORS: Record<string, string> = {
  Added: "#22c55e", Changed: "#3b82f6", Deprecated: "#f59e0b",
  Removed: "#ef4444", Fixed: "#8b5cf6", Security: "#f97316",
};

interface ChangelogViewEntry {
  version: string;
  date?: string;
  url?: string;
  sections: Array<{ type: string; items: string[] }>;
}

function ChangelogView({ entries }: { entries: ChangelogViewEntry[] }) {
  const [showAll, setShowAll] = useState(entries.length <= 5);
  const visible = showAll ? entries : entries.slice(0, 5);

  return (
    <div data-testid="changelog-timeline" style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 2, background: "var(--bd)" }} />
      {visible.map((entry, i) => (
        <div key={entry.version} data-testid={`changelog-entry-${entry.version}`}
          style={{ position: "relative", paddingLeft: 44, paddingBottom: i < visible.length - 1 ? 32 : 0 }}>
          <div style={{
            position: "absolute", left: 8, top: 6, width: 16, height: 16, borderRadius: "50%",
            background: entry.version === "Unreleased" ? "var(--txM)" : "var(--ac)",
            border: "3px solid var(--bg, #1a1a1a)",
          }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "var(--tx)", fontFamily: "var(--font-heading, inherit)" }}>
              {entry.url ? (
                <a href={entry.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{entry.version}</a>
              ) : entry.version}
            </span>
            {entry.date && <span style={{ fontSize: 13, color: "var(--txM)", fontFamily: "var(--font-code, monospace)" }}>{entry.date}</span>}
          </div>
          {entry.sections.map((section) => {
            const sColor = CHANGELOG_SECTION_COLORS[section.type] || "#6b7280";
            return (
              <div key={section.type} style={{ marginBottom: 16 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: sColor }} />
                  <span style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: sColor, fontFamily: "var(--font-code, monospace)" }}>{section.type}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, listStyleType: "disc", color: "var(--tx2)" }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 14, lineHeight: 1.7, color: "var(--tx2)", marginBottom: 2 }}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
      {!showAll && entries.length > 5 && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button data-testid="changelog-show-more" onClick={() => setShowAll(true)}
            style={{ background: "none", border: "1px solid var(--bd)", borderRadius: 2, padding: "8px 20px", color: "var(--tx2)", fontSize: 13, fontFamily: "var(--font-body, inherit)", cursor: "pointer" }}>
            Show all {entries.length} releases
          </button>
        </div>
      )}
    </div>
  );
}

interface ShellProps {
  config: {
    name: string;
    theme?: { preset?: string; mode?: string; accent?: string; fonts?: { heading?: string; body?: string; code?: string } };
    search?: { provider?: string; appId?: string; apiKey?: string; indexName?: string };
    ai?: { enabled?: boolean; provider?: "openai" | "anthropic" | "custom"; model?: string; apiKeyEnv?: string };
    toc?: { enabled?: boolean; depth?: number };
    topNav?: Array<{ label: string; href: string }>;
    [key: string]: unknown;
  };
  navigation: Array<{
    section: string;
    pages: Array<{ title: string; id: string; urlPath: string; icon?: string }>;
  }>;
  currentPageId: string;
  pageHtml?: string;
  pageComponent?: React.ComponentType<{ components?: Record<string, React.ComponentType> }>;
  mdxComponents?: Record<string, React.ComponentType>;
  pageTitle: string;
  pageDescription?: string;
  headings: Array<{ depth: number; text: string; id: string }>;
  tocEnabled?: boolean;
  editUrl?: string;
  lastUpdated?: string;
  changelogEntries?: Array<{ version: string; date?: string; url?: string; sections: Array<{ type: string; items: string[] }> }>;
  onNavigate: (id: string) => void;
  allPages: Array<{ id: string; title: string; description?: string }>;
  versioning?: VersioningInfo;
  currentVersion?: string;
  i18n?: I18nInfo;
  currentLocale?: string;
  docContext?: Array<{ id: string; title: string; content: string }>;
}

export function Shell({
  config, navigation, currentPageId, pageHtml, pageComponent, mdxComponents,
  pageTitle, pageDescription, headings, tocEnabled = true, editUrl, lastUpdated, changelogEntries, onNavigate, allPages,
  versioning, currentVersion, i18n, currentLocale, docContext,
}: ShellProps) {
  const themeMode = config.theme?.mode || "auto";

  // TOM-12: Initialize dark mode from config.theme.mode + system preference
  const [isDark, setDark] = useState(() => {
    if (themeMode === "dark") return true;
    if (themeMode === "light") return false;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
  });

  const [sbOpen, setSb] = useState(true);
  const [searchOpen, setSearch] = useState(false);
  const [versionDropdownOpen, setVersionDropdown] = useState(false);
  const [localeDropdownOpen, setLocaleDropdown] = useState(false);

  // TOM-30: Determine if viewing an old version
  const isOldVersion = versioning && currentVersion && currentVersion !== versioning.current;
  const [expanded, setExpanded] = useState<string[]>(navigation.map(n => n.section));
  const contentRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(true);

  const preset = (config.theme?.preset || "amber") as PresetName;
  const baseTokens = THEME_PRESETS[preset]?.[isDark ? "dark" : "light"] || THEME_PRESETS.amber.dark;

  // TOM-12: Custom accent color override
  const accentOverride = config.theme?.accent
    ? buildAccentOverride(config.theme.accent, isDark)
    : null;

  const t = accentOverride
    ? { ...baseTokens, ...accentOverride }
    : baseTokens;

  // TOM-12: Custom font override
  const presetFonts = THEME_PRESETS[preset]?.fonts || THEME_PRESETS.amber.fonts;
  const fonts = {
    heading: config.theme?.fonts?.heading || presetFonts.heading,
    body: config.theme?.fonts?.body || presetFonts.body,
    code: config.theme?.fonts?.code || presetFonts.code,
  };

  // TOM-12: Listen to system preference changes when mode is "auto"
  useEffect(() => {
    if (themeMode !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [themeMode]);

  // Sync dark mode class on <html> so global CSS selectors (e.g. Shiki dual-theme) work
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const c = () => setWide(window.innerWidth > 1100);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  useEffect(() => { contentRef.current?.scrollTo(0, 0); }, [currentPageId]);

  // ── TOC: Config-based depth filtering + frontmatter opt-out ──
  const tocConfig = config.toc;
  const tocDepth = tocConfig?.depth ?? 3;
  const tocGlobalEnabled = tocConfig?.enabled !== false;
  const showToc = tocGlobalEnabled && tocEnabled;
  const filteredHeadings = headings.filter(h => h.depth <= tocDepth);

  // ── TOC: Scroll-spy with IntersectionObserver ──
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");

  useEffect(() => {
    if (!showToc || filteredHeadings.length < 2) return;

    const scrollRoot = contentRef.current;
    if (!scrollRoot) return;

    // Small delay to ensure DOM headings are rendered (especially after page load)
    const timerId = setTimeout(() => {
      const headingElements: Element[] = [];
      for (const h of filteredHeadings) {
        const el = scrollRoot.querySelector(`#${CSS.escape(h.id)}`);
        if (el) headingElements.push(el);
      }
      if (headingElements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          // Find the topmost visible heading
          const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) {
            setActiveHeadingId(visible[0].target.id);
          }
        },
        {
          root: scrollRoot,
          // Trigger when heading enters the top 20% of the scroll container
          rootMargin: "0px 0px -80% 0px",
          threshold: 0,
        }
      );

      for (const el of headingElements) observer.observe(el);
      observerRef.current = observer;
    }, 100);

    return () => {
      clearTimeout(timerId);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [currentPageId, showToc, filteredHeadings.map(h => h.id).join(",")]);

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset active heading when page changes
  useEffect(() => { setActiveHeadingId(""); }, [currentPageId]);

  // Smooth scroll handler for TOC links
  const scrollToHeading = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const scrollRoot = contentRef.current;
    if (!scrollRoot) return;
    const target = scrollRoot.querySelector(`#${CSS.escape(id)}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveHeadingId(id);
    }
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearch(true); }
      if (e.key === "Escape") setSearch(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // Prev / Next
  const allNavPages = navigation.flatMap(g => g.pages);
  const idx = allNavPages.findIndex(p => p.id === currentPageId);
  const prev = idx > 0 ? allNavPages[idx - 1] : null;
  const next = idx < allNavPages.length - 1 ? allNavPages[idx + 1] : null;

  const togSec = (s: string) => setExpanded(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const cssVars: Record<string, string> = {
    "--bg": t.bg, "--sf": t.sf, "--sfH": t.sfH, "--bd": t.bd,
    "--tx": t.tx, "--tx2": t.tx2, "--txM": t.txM,
    "--ac": t.ac, "--acD": t.acD, "--acT": t.acT,
    "--cdBg": t.cdBg, "--cdTx": t.cdTx, "--sbBg": t.sbBg, "--hdBg": t.hdBg,
    "--font-heading": `"${fonts.heading}", serif`,
    "--font-body": `"${fonts.body}", sans-serif`,
    "--font-code": `"${fonts.code}", monospace`,
  };

  const PageComponent = pageComponent;

  return (
    <div className="tome-grain" style={{ ...cssVars as React.CSSProperties, color: "var(--tx)", background: "var(--bg)", fontFamily: "var(--font-body)", minHeight: "100vh" }}>
      {/* Search Modal (TOM-16: branch on provider) */}
      {searchOpen && config.search?.provider === "algolia" && config.search.appId && config.search.apiKey && config.search.indexName ? (
        <AlgoliaSearchModal
          appId={config.search.appId}
          apiKey={config.search.apiKey}
          indexName={config.search.indexName}
          onNavigate={(id) => { onNavigate(id); setSearch(false); }}
          onClose={() => setSearch(false)}
        />
      ) : searchOpen ? (
        <SearchModal
          allPages={allPages}
          onNavigate={(id) => { onNavigate(id); setSearch(false); }}
          onClose={() => setSearch(false)}
        />
      ) : null}

      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <aside style={{
          width: sbOpen ? 270 : 0, minWidth: sbOpen ? 270 : 0,
          background: "var(--sbBg)", borderRight: "1px solid var(--bd)",
          display: "flex", flexDirection: "column",
          transition: "width .2s, min-width .2s", overflow: "hidden",
        }}>
          <a href="/" style={{ padding: "18px 20px", display: "flex", alignItems: "baseline", gap: 6, borderBottom: "1px solid var(--bd)", textDecoration: "none", color: "inherit" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, fontStyle: "italic" }}>
              {config.name}
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ac)", display: "inline-block" }} />
          </a>

          <div style={{ padding: "12px 14px" }}>
            <button onClick={() => setSearch(true)} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%",
              background: "var(--cdBg)", border: "1px solid var(--bd)", borderRadius: 2,
              padding: "8px 12px", cursor: "pointer", color: "var(--txM)", fontSize: 12.5,
              fontFamily: "var(--font-body)",
            }}>
              <SearchIcon /><span style={{ flex: 1, textAlign: "left" }}>Search...</span>
              <kbd style={{ fontFamily: "var(--font-code)", fontSize: 9, background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 2, padding: "2px 6px" }}>{"\u2318K"}</kbd>
            </button>
          </div>

          <nav style={{ flex: 1, overflow: "auto", padding: "4px 10px 20px" }}>
            {navigation.map(sec => (
              <div key={sec.section} style={{ marginBottom: 8 }}>
                <button onClick={() => togSec(sec.section)} style={{
                  display: "flex", alignItems: "center", gap: 6, width: "100%",
                  background: "none", border: "none", padding: "8px 10px", cursor: "pointer",
                  borderRadius: 2, color: "var(--txM)", fontSize: 10, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: ".1em", fontFamily: "var(--font-code)",
                }}>
                  {expanded.includes(sec.section) ? <ChevDown /> : <ChevRight />}{sec.section}
                </button>
                {expanded.includes(sec.section) && <div style={{ marginLeft: 8, borderLeft: "1px solid var(--bd)", paddingLeft: 0 }}>
                  {sec.pages.map(p => {
                    const active = currentPageId === p.id;
                    return (
                      <button key={p.id} onClick={() => onNavigate(p.id)} style={{
                        display: "flex", alignItems: "center", gap: 10, width: "100%",
                        textAlign: "left", background: "none",
                        border: "none", borderRadius: 0,
                        borderLeft: active ? "2px solid var(--ac)" : "2px solid transparent",
                        padding: "7px 14px", cursor: "pointer",
                        color: active ? "var(--ac)" : "var(--tx2)", fontSize: 13,
                        fontWeight: active ? 500 : 400, fontFamily: "var(--font-body)",
                        transition: "all .12s",
                      }}>
                        {p.title}
                      </button>
                    );
                  })}
                </div>}
              </div>
            ))}
          </nav>

          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* TOM-12: Only show toggle when mode is "auto" */}
            {themeMode === "auto" ? (
              <button onClick={() => setDark(d => !d)} style={{ background: "none", border: "none", color: "var(--txM)", cursor: "pointer", display: "flex" }}>
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
            ) : <div />}
            <span style={{ fontSize: 11, color: "var(--txM)", letterSpacing: 0.2 }}>Built with {"\u2661"} by Tome</span>
            <span style={{ fontFamily: "var(--font-code)", fontSize: 10, color: "var(--txM)" }}>{typeof __TOME_VERSION__ !== "undefined" && __TOME_VERSION__ ? `v${__TOME_VERSION__}` : "v0.1.0"}</span>
          </div>
        </aside>

        {/* Main area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header */}
          <header style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 24px",
            borderBottom: "1px solid var(--bd)", background: "var(--hdBg)", backdropFilter: "blur(12px)",
          }}>
            <button onClick={() => setSb(!sbOpen)} style={{ background: "none", border: "none", color: "var(--txM)", cursor: "pointer", display: "flex" }}>
              {sbOpen ? <XIcon /> : <MenuIcon />}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-code)", fontSize: 11, color: "var(--txM)", letterSpacing: ".03em", flex: 1 }}>
              {navigation.map(s => {
                const f = s.pages.find(p => p.id === currentPageId);
                if (!f) return null;
                return <span key={s.section} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{s.section}</span><ChevRight /><span style={{ color: "var(--ac)" }}>{f.title}</span>
                </span>;
              })}
            </div>

            {/* Top Nav Links */}
            {config.topNav && config.topNav.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {config.topNav.map((link) => {
                  const isExternal = link.href.startsWith("http") || !link.href.startsWith("#");
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      style={{
                        display: "flex", alignItems: "center", gap: 4,
                        color: "var(--txM)", textDecoration: "none", fontSize: 12,
                        fontFamily: "var(--font-body)", fontWeight: 500,
                        transition: "color .15s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "var(--ac)")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "var(--txM)")}
                    >
                      {link.label}
                      {isExternal && <ExtLinkIcon />}
                    </a>
                  );
                })}
                <span style={{ width: 1, height: 16, background: "var(--bd)" }} />
              </div>
            )}

            {/* TOM-30: Version Switcher */}
            {versioning && (
              <div style={{ position: "relative" }}>
                <button
                  data-testid="version-switcher"
                  onClick={() => setVersionDropdown(o => !o)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 2,
                    padding: "5px 10px", cursor: "pointer", color: "var(--tx2)", fontSize: 12,
                    fontFamily: "var(--font-code)",
                  }}
                >
                  <VersionIcon />
                  {currentVersion || versioning.current}
                  <ChevDown />
                </button>
                {versionDropdownOpen && (
                  <div
                    data-testid="version-dropdown"
                    style={{
                      position: "absolute", top: "100%", right: 0, marginTop: 4,
                      background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 2,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)", overflow: "hidden", zIndex: 100,
                      minWidth: 120,
                    }}
                  >
                    {versioning.versions.map(v => (
                      <button
                        key={v}
                        onClick={() => {
                          setVersionDropdown(false);
                          // Navigate to the version's root page
                          const targetUrl = v === versioning.current ? "/" : `/${v}`;
                          window.location.href = targetUrl;
                        }}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          background: v === (currentVersion || versioning.current) ? "var(--acD)" : "none",
                          border: "none", padding: "8px 14px", cursor: "pointer",
                          color: v === (currentVersion || versioning.current) ? "var(--ac)" : "var(--tx2)",
                          fontSize: 12, fontFamily: "var(--font-code)",
                          fontWeight: v === versioning.current ? 600 : 400,
                        }}
                      >
                        {v}{v === versioning.current ? " (latest)" : ""}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TOM-34: Language Switcher */}
            {i18n && i18n.locales.length > 1 && (
              <div style={{ position: "relative" }}>
                <button
                  data-testid="language-switcher"
                  onClick={() => setLocaleDropdown(o => !o)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 2,
                    padding: "5px 10px", cursor: "pointer", color: "var(--tx2)", fontSize: 12,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <GlobeIcon />
                  {i18n.localeNames?.[currentLocale || i18n.defaultLocale] || currentLocale || i18n.defaultLocale}
                  <ChevDown />
                </button>
                {localeDropdownOpen && (
                  <div
                    data-testid="language-dropdown"
                    style={{
                      position: "absolute", top: "100%", right: 0, marginTop: 4,
                      background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 2,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)", overflow: "hidden", zIndex: 100,
                      minWidth: 120,
                    }}
                  >
                    {i18n.locales.map(locale => {
                      const isActive = locale === (currentLocale || i18n.defaultLocale);
                      const displayName = i18n.localeNames?.[locale] || locale;

                      // Compute the target URL: switch locale but keep the same page
                      const activeLocale = currentLocale || i18n.defaultLocale;
                      // Get the base page path (strip locale prefix from current page ID)
                      let basePageId = currentPageId;
                      if (activeLocale !== i18n.defaultLocale && currentPageId.startsWith(`${activeLocale}/`)) {
                        basePageId = currentPageId.slice(activeLocale.length + 1);
                      }
                      const targetId = locale === i18n.defaultLocale
                        ? basePageId
                        : `${locale}/${basePageId}`;

                      return (
                        <button
                          key={locale}
                          onClick={() => {
                            setLocaleDropdown(false);
                            onNavigate(targetId);
                          }}
                          style={{
                            display: "block", width: "100%", textAlign: "left",
                            background: isActive ? "var(--acD)" : "none",
                            border: "none", padding: "8px 14px", cursor: "pointer",
                            color: isActive ? "var(--ac)" : "var(--tx2)",
                            fontSize: 12, fontFamily: "var(--font-body)",
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          {displayName}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </header>

          {/* TOM-30: Old version banner */}
          {isOldVersion && (
            <div
              data-testid="old-version-banner"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "var(--acD)", borderBottom: "1px solid var(--bd)",
                padding: "8px 24px", fontSize: 13, color: "var(--tx2)",
              }}
            >
              <span>You're viewing docs for {currentVersion}.</span>
              <button
                onClick={() => { window.location.href = "/"; }}
                style={{
                  background: "none", border: "none", color: "var(--ac)",
                  cursor: "pointer", fontWeight: 600, fontSize: 13,
                  fontFamily: "var(--font-body)", textDecoration: "underline",
                }}
              >
                Switch to latest.
              </button>
            </div>
          )}

          {/* Content + TOC */}
          <div ref={contentRef} style={{ flex: 1, overflow: "auto", display: "flex" }}>
            <main style={{ flex: 1, maxWidth: 760, padding: "40px 48px 80px", margin: "0 auto" }}>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 38, fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, marginBottom: 8 }}>
                {pageTitle}
              </h1>
              {pageDescription && <p style={{ fontSize: 16, color: "var(--tx2)", lineHeight: 1.6, marginBottom: 32 }}>{pageDescription}</p>}
              <div style={{ borderTop: "1px solid var(--bd)", paddingTop: 28 }}>
                {/* TOM-49: Changelog page type */}
                {changelogEntries && changelogEntries.length > 0 ? (
                  <ChangelogView entries={changelogEntries} />
                ) : PageComponent ? (
                  <div className="tome-content">
                    <PageComponent components={mdxComponents || {}} />
                  </div>
                ) : (
                  <div
                    className="tome-content"
                    dangerouslySetInnerHTML={{ __html: (pageHtml || "").replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/, "") }}
                  />
                )}
              </div>

              {/* TOM-48: Edit this page link + TOM-54: Last updated */}
              {(editUrl || lastUpdated) && (
                <div style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  {editUrl && (
                    <div data-testid="edit-page-link">
                      <a
                        href={editUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          color: "var(--txM)", textDecoration: "none", fontSize: 13,
                          fontFamily: "var(--font-body)", transition: "color .15s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "var(--ac)")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "var(--txM)")}
                      >
                        <PencilIcon /> Edit this page on GitHub
                      </a>
                    </div>
                  )}
                  {lastUpdated && (
                    <div data-testid="last-updated" style={{ fontSize: 12, color: "var(--txM)", fontFamily: "var(--font-body)" }}>
                      Last updated {formatRelativeDate(lastUpdated)}
                    </div>
                  )}
                </div>
              )}

              {/* Prev / Next */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: (editUrl || lastUpdated) ? 16 : 48, paddingTop: 24, borderTop: "1px solid var(--bd)", gap: 16 }}>
                {prev ? (
                  <button onClick={() => onNavigate(prev.id)} style={{
                    display: "flex", alignItems: "center", gap: 8, background: "none",
                    border: "1px solid var(--bd)", borderRadius: 2, padding: "10px 16px",
                    cursor: "pointer", color: "var(--tx2)", fontSize: 13, fontFamily: "var(--font-body)",
                    transition: "border-color .15s, color .15s",
                  }}><ArrowLeft /> {prev.title}</button>
                ) : <div />}
                {next ? (
                  <button onClick={() => onNavigate(next.id)} style={{
                    display: "flex", alignItems: "center", gap: 8, background: "none",
                    border: "1px solid var(--bd)", borderRadius: 2, padding: "10px 16px",
                    cursor: "pointer", color: "var(--tx2)", fontSize: 13, fontFamily: "var(--font-body)",
                    transition: "border-color .15s, color .15s",
                  }}>{next.title} <ArrowRight /></button>
                ) : <div />}
              </div>
            </main>

            {/* TOC (TOM-52) */}
            {showToc && filteredHeadings.length >= 2 && wide && (
              <aside data-testid="toc-sidebar" style={{ width: 200, padding: "40px 16px 40px 0", position: "sticky", top: 0, alignSelf: "flex-start", flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--txM)", marginBottom: 12, fontFamily: "var(--font-code)" }}>On this page</div>
                <nav aria-label="Table of contents" style={{ borderLeft: "1px solid var(--bd)", paddingLeft: 0 }}>
                  {filteredHeadings.map((h, i) => {
                    const isActive = activeHeadingId === h.id;
                    return (
                      <a
                        key={i}
                        href={`#${h.id}`}
                        onClick={(e) => scrollToHeading(e, h.id)}
                        data-testid={`toc-link-${h.id}`}
                        style={{
                          display: "block", fontSize: 12,
                          color: isActive ? "var(--ac)" : "var(--txM)",
                          fontWeight: isActive ? 500 : 400,
                          textDecoration: "none",
                          padding: "4px 12px",
                          paddingLeft: 12 + (h.depth - 2) * 12,
                          lineHeight: 1.4,
                          transition: "color .15s, font-weight .15s",
                          borderLeft: isActive ? "2px solid var(--ac)" : "2px solid transparent",
                          marginLeft: -1,
                        }}
                      >{h.text}</a>
                    );
                  })}
                </nav>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* TOM-32: AI Chat Widget (BYOK) */}
      {config.ai?.enabled && (
        <AiChat
          provider={config.ai.provider || "anthropic"}
          model={config.ai.model}
          apiKey={typeof __TOME_AI_API_KEY__ !== "undefined" && __TOME_AI_API_KEY__ ? __TOME_AI_API_KEY__ : undefined}
          context={docContext?.map((d) => `## ${d.title}\n${d.content}`).join("\n\n") ?? allPages.map((p) => `- ${p.title}${p.description ? ": " + p.description : ""}`).join("\n")}
        />
      )}
    </div>
  );
}

// ── SEARCH RESULT TYPE (TOM-15) ──────────────────────────
interface SearchResult {
  id: string;
  title: string;
  excerpt?: string;
}

// ── SEARCH MODAL (TOM-15) ────────────────────────────────
function SearchModal({ allPages, onNavigate, onClose }: {
  allPages: Array<{ id: string; title: string; description?: string }>;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const [pagefindReady, setPagefindReady] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Try to initialize Pagefind on mount
  useEffect(() => {
    initPagefind().then((pf) => setPagefindReady(!!pf));
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  // Fallback search: filter allPages by title/description
  const fallbackSearch = useCallback((query: string): SearchResult[] => {
    if (!query.trim()) return [];
    const ql = query.toLowerCase();
    return allPages
      .filter(p => p.title.toLowerCase().includes(ql) || (p.description || "").toLowerCase().includes(ql))
      .slice(0, 8)
      .map(p => ({ id: p.id, title: p.title, excerpt: p.description }));
  }, [allPages]);

  // Search handler: use Pagefind if available, otherwise fallback
  const doSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setSelected(0);
      return;
    }

    // Try Pagefind first
    const pf = pagefindInstance;
    if (pf) {
      try {
        const search = await pf.search(query);
        const items: SearchResult[] = [];
        for (const result of search.results.slice(0, 8)) {
          const data = await result.data();
          // Pagefind URLs look like "/index.html" or "/quickstart/index.html"
          // Extract the page ID from the URL path
          const url: string = data.url || "";
          const id = url
            .replace(/^\//, "")
            .replace(/\/index\.html$/, "")
            .replace(/\.html$/, "")
            || "index";
          items.push({
            id,
            title: data.meta?.title || id,
            excerpt: data.excerpt || undefined,
          });
        }
        setResults(items);
        setSelected(0);
        return;
      } catch {
        // Pagefind search failed, fall through to fallback
      }
    }

    // Fallback: client-side filtering
    setResults(fallbackSearch(query));
    setSelected(0);
  }, [fallbackSearch]);

  // Debounced search on query change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(q), 120);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [q, doSearch]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      onNavigate(results[selected].id);
    }
  }, [results, selected, onNavigate]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-start",
      justifyContent: "center", paddingTop: "12vh",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 2,
        width: "100%", maxWidth: 520, boxShadow: "0 24px 80px rgba(0,0,0,0.4)", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid var(--bd)" }}>
          <SearchIcon />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--tx)", fontSize: 15, fontFamily: "var(--font-body)" }}
          />
          <kbd style={{ fontFamily: "var(--font-code)", fontSize: 10, color: "var(--txM)", background: "var(--cdBg)", padding: "2px 6px", borderRadius: 2, border: "1px solid var(--bd)" }}>ESC</kbd>
        </div>
        {results.length > 0 && <div style={{ padding: 6, maxHeight: 360, overflow: "auto" }}>
          {results.map((r, i) => (
            <button key={r.id + i} onClick={() => onNavigate(r.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: i === selected ? "var(--acD)" : "none",
              border: "none", borderRadius: 2, padding: "10px 14px", cursor: "pointer", color: "var(--tx)",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={() => setSelected(i)}
            >
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 2 }}>{r.title}</div>
              {r.excerpt && <div style={{
                fontSize: 12, color: "var(--txM)", lineHeight: 1.3,
              }} dangerouslySetInnerHTML={{ __html: r.excerpt }} />}
            </button>
          ))}
        </div>}
        {q && !results.length && (
          <div style={{ padding: "32px 18px", textAlign: "center", color: "var(--txM)", fontSize: 14 }}>
            No results found
          </div>
        )}
        {pagefindReady === false && q && results.length > 0 && (
          <div style={{ padding: "6px 18px 10px", fontSize: 11, color: "var(--txM)", textAlign: "center" }}>
            Showing title matches. Build your site for full-text search.
          </div>
        )}
      </div>
    </div>
  );
}

export default Shell;
