import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
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
  basePath = "",
}: {
  appId: string;
  apiKey: string;
  indexName: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
  basePath?: string;
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
      let pathname = parsed.pathname;
      // Strip basePath prefix
      if (basePath) {
        const bp = basePath.replace(/\/$/, "");
        if (pathname.startsWith(bp)) pathname = pathname.slice(bp.length);
      }
      return pathname
        .replace(/^\//, "")
        .replace(/\/index\.html$/, "")
        .replace(/\.html$/, "")
        || "index";
    } catch {
      return "index";
    }
  }, [basePath]);

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

// ── SOCIAL LINK ICONS ──────────────────────────────────
const SOCIAL_ICON_PATHS: Record<string, string> = {
  github: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",
  twitter: "M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z",
  discord: "M13.545 2.907a13.227 13.227 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 00-3.658 0 8.258 8.258 0 00-.412-.833.051.051 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 00-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 003.995 2.02.05.05 0 00.056-.019c.308-.42.582-.863.818-1.329a.05.05 0 00-.028-.07 8.735 8.735 0 01-1.248-.595.05.05 0 01-.005-.083c.084-.063.168-.129.248-.195a.05.05 0 01.051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 01.053.007c.08.066.164.132.248.195a.051.051 0 01-.004.085c-.399.232-.813.431-1.249.594a.05.05 0 00-.03.07c.24.465.515.909.817 1.329a.05.05 0 00.056.019 13.235 13.235 0 004.001-2.02.049.049 0 00.021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 00-.02-.019z",
  linkedin: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z",
  youtube: "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 011.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 01-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 01-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 010 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 011.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 017.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z",
  mastodon: "M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603.348-1.778.32-4.339.32-4.339 0-3.47-2.286-4.488-2.286-4.488C12.062.238 10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765 2.79.765.504 1.783.504 5.253c-.005.995-.01 2.19.013 3.44.075 4.21.56 8.354 3.383 9.386 1.302.476 2.418.576 3.317.507 1.628-.125 2.541-.8 2.541-.8l-.054-1.182s-1.163.366-2.47.322c-1.293-.044-2.658-.138-2.867-1.716a3.23 3.23 0 01-.028-.465s1.27.31 2.879.384c.984.045 1.905-.058 2.842-.17zM13 8.59V5.319c0-.67-.17-1.2-.507-1.592-.348-.4-.806-.605-1.373-.605-.656 0-1.154.252-1.486.756L9.2 4.595l-.434-.717c-.332-.504-.83-.756-1.486-.756-.567 0-1.025.204-1.373.605-.338.392-.507.923-.507 1.592V8.59h1.69V5.468c0-.67.285-1.012.855-1.012.63 0 .946.404.946 1.204V7.11h1.682V5.66c0-.8.316-1.204.946-1.204.57 0 .855.342.855 1.012V8.59H13z",
  bluesky: "M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.724-1.498 2.697-4.29 4.532-5.668C13.855 1.013 16 .638 16 3.14c0 .5-.286 4.2-.454 4.8-.585 2.093-2.716 2.628-4.544 2.305 3.195.564 4.007 2.433 2.25 4.302-3.337 3.548-4.8-1.244-5.252-2.547 0 0-.116-.334-.166-.334h.332C8.166 11.666 8.05 12 8.05 12c-.452 1.303-1.916 6.095-5.252 2.547-1.756-1.869-.946-3.738 2.25-4.302-1.829.323-3.96-.212-4.544-2.305C.336 7.34.05 3.64.05 3.14.05.638 2.195 1.013 3.468 1.948z",
};

const SocialIcon = ({ platform, customIcon }: { platform: string; customIcon?: string }) => {
  const d = platform === "custom" && customIcon ? customIcon : SOCIAL_ICON_PATHS[platform];
  if (!d) return null;
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
      <path d={d} />
    </svg>
  );
};

// ── SHELL COMPONENT ──────────────────────────────────────
export interface VersioningInfo {
  current: string;
  versions: string[];
}

export interface I18nInfo {
  defaultLocale: string;
  locales: string[];
  localeNames?: Record<string, string>;
  localeDirs?: Record<string, "ltr" | "rtl">;
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

// ── BREADCRUMBS ─────────────────────────────────────────
type BreadcrumbItem = { label: string; href: string | null };

function getBreadcrumbs(
  navigation: Array<{ section: string; pages: Array<{ title: string; id: string; urlPath: string }> }>,
  currentPageId: string,
  pageTitle: string,
): BreadcrumbItem[] {
  if (currentPageId === "index") return [];

  for (const section of navigation) {
    const found = section.pages.find(p => p.id === currentPageId);
    if (found) {
      const crumbs: BreadcrumbItem[] = [];
      // Section label — link to first page in section
      const firstPage = section.pages[0];
      crumbs.push({
        label: section.section,
        href: firstPage ? firstPage.urlPath : null,
      });
      // Current page (last crumb, not a link)
      crumbs.push({ label: pageTitle, href: null });
      return crumbs;
    }
  }
  return [];
}

interface ShellProps {
  config: {
    name: string;
    theme?: { preset?: string; mode?: string; accent?: string; fonts?: { heading?: string; body?: string; code?: string } };
    search?: { provider?: string; appId?: string; apiKey?: string; indexName?: string };
    ai?: { enabled?: boolean; provider?: "openai" | "anthropic" | "custom"; model?: string; apiKeyEnv?: string };
    toc?: { enabled?: boolean; depth?: number };
    topNav?: Array<{ label: string; href: string }>;
    banner?: { text: string; link?: string; dismissible?: boolean };
    socialLinks?: Array<{ platform: string; url: string; label?: string; icon?: string }>;
    [key: string]: unknown;
  };
  navigation: Array<{
    section: string;
    pages: Array<{ title: string; id: string; urlPath: string; icon?: string; badge?: { text: string; variant: string } }>;
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
  apiManifest?: any;
  apiBaseUrl?: string;
  apiPlayground?: boolean;
  apiAuth?: { type: "bearer" | "apiKey"; header?: string };
  ApiReferenceComponent?: React.ComponentType<{
    manifest: any;
    baseUrl?: string;
    showPlayground?: boolean;
    playgroundAuth?: { type: "bearer" | "apiKey"; header?: string };
  }>;
  onNavigate: (id: string) => void;
  allPages: Array<{ id: string; title: string; description?: string }>;
  versioning?: VersioningInfo;
  currentVersion?: string;
  i18n?: I18nInfo;
  currentLocale?: string;
  docContext?: Array<{ id: string; title: string; content: string }>;
  basePath?: string;
  isDraft?: boolean;
  dir?: "ltr" | "rtl";
  overrides?: {
    Header?: React.ComponentType<any>;
    Footer?: React.ComponentType<any>;
    Sidebar?: React.ComponentType<any>;
    Toc?: React.ComponentType<any>;
    PageFooter?: React.ComponentType<any>;
  };
}

export function Shell({
  config, navigation, currentPageId, pageHtml, pageComponent, mdxComponents,
  pageTitle, pageDescription, headings, tocEnabled = true, editUrl, lastUpdated, changelogEntries,
  apiManifest, apiBaseUrl, apiPlayground, apiAuth, ApiReferenceComponent, onNavigate, allPages,
  versioning, currentVersion, i18n, currentLocale, docContext, basePath = "", isDraft, dir: dirProp, overrides,
}: ShellProps) {
  // RTL support: resolve text direction from prop, i18n.localeDirs, or default to "ltr"
  const resolvedLocale = currentLocale || i18n?.defaultLocale || "en";
  const dir: "ltr" | "rtl" = dirProp || i18n?.localeDirs?.[resolvedLocale] || "ltr";
  const isRtl = dir === "rtl";

  const themeMode = config.theme?.mode || "auto";

  // TOM-12: Initialize dark mode from config.theme.mode + system preference
  const [isDark, setDark] = useState(() => {
    if (themeMode === "dark") return true;
    if (themeMode === "light") return false;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [sbOpen, setSb] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);
  const [searchOpen, setSearch] = useState(false);
  const [versionDropdownOpen, setVersionDropdown] = useState(false);
  const [localeDropdownOpen, setLocaleDropdown] = useState(false);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({});
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    if (!config.banner?.text) return true;
    try {
      const hash = Array.from(config.banner.text).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0).toString(36);
      return localStorage.getItem("tome-banner-dismissed") === hash;
    } catch { return false; }
  });

  // TOM-30: Determine if viewing an old version
  const isOldVersion = versioning && currentVersion && currentVersion !== versioning.current;
  const [expanded, setExpanded] = useState<string[]>(navigation.map(n => n.section));
  const contentRef = useRef<HTMLDivElement>(null);
  const htmlContentRef = useRef<HTMLDivElement>(null);
  const lastHtmlRef = useRef<string>("");
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.innerWidth > 1100);

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
    const handleResize = () => {
      const w = window.innerWidth;
      setWide(w > 1100);
      setMobile(w < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobile && sbOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [mobile, sbOpen]);

  useEffect(() => { contentRef.current?.scrollTo(0, 0); }, [currentPageId]);

  // ── Image zoom: delegate click on .tome-content img ──
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" && target.closest(".tome-content")) {
        setZoomSrc((target as HTMLImageElement).src);
      }
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  // ── Content link interception: delegate click on .tome-content a ──
  // Intercepts internal links in rendered markdown so they navigate via pushState
  // instead of triggering a full page reload.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // Skip external links, mailto, tel, pure anchors
      if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("//")) return;
      // Pure heading anchor — let default scrolling work
      if (href.startsWith("#")) return;
      // Internal link — resolve page ID by stripping basePath
      e.preventDefault();
      let pageId = href.replace(/^\.\//, "").replace(/^\//, "").replace(/\.mdx?$/, "").replace(/\/$/, "");
      // Strip basePath prefix (e.g. "docs/" from "/docs/quickstart")
      if (basePath) {
        const normalized = basePath.replace(/^\//, "").replace(/\/$/, "");
        if (normalized && pageId.startsWith(normalized + "/")) {
          pageId = pageId.slice(normalized.length + 1);
        } else if (normalized && pageId === normalized) {
          pageId = "index";
        }
      }
      if (!pageId) pageId = "index";
      onNavigate(pageId);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [onNavigate, basePath]);

  // ── Image zoom: Escape to dismiss ──
  useEffect(() => {
    if (!zoomSrc) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomSrc(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [zoomSrc]);

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

  // Set HTML content via ref so React doesn't re-set innerHTML on re-renders
  // (scroll-spy state changes would otherwise destroy client-side mermaid SVGs)
  // useLayoutEffect ensures innerHTML is set synchronously before paint — no flash
  useLayoutEffect(() => {
    if (!htmlContentRef.current || !pageHtml) return;
    const stripped = pageHtml.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/, "");
    htmlContentRef.current.innerHTML = stripped;
    lastHtmlRef.current = stripped;
  }, [pageHtml, currentPageId]);

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
  const prev = idx > 0 ? allNavPages[idx - 1] : allNavPages[allNavPages.length - 1] ?? null;
  const next = idx < allNavPages.length - 1 ? allNavPages[idx + 1] : allNavPages[0] ?? null;

  // Breadcrumbs
  const breadcrumbs = getBreadcrumbs(navigation, currentPageId, pageTitle);

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

  // Compute banner link properties
  const bannerLink = config.banner?.link;
  const bannerIsInternal = bannerLink ? (bannerLink.startsWith("#") || (basePath && bannerLink.startsWith(basePath + "/"))) : false;

  return (
    <div dir={dir} className="tome-grain" style={{ ...cssVars as React.CSSProperties, color: "var(--tx)", background: "var(--bg)", fontFamily: "var(--font-body)", height: "100vh", overflow: "clip" }}>
      {/* Banner */}
      {config.banner?.text && !bannerDismissed && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          background: "var(--ac)", color: "#fff", padding: "8px 16px",
          fontSize: 13, fontFamily: "var(--font-body)", fontWeight: 500, textAlign: "center",
          width: "100vw", boxSizing: "border-box",
        }}>
          {config.banner.link ? (
            <a
              href={bannerIsInternal && bannerLink!.startsWith("#") ? (basePath + "/" + bannerLink!.slice(1)) : bannerLink!}
              {...(bannerIsInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              style={{ color: "#fff", textDecoration: "underline" }}
              onClick={bannerIsInternal ? (e: React.MouseEvent) => {
                e.preventDefault();
                const bp = basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const pageId = bannerLink!.startsWith("#") ? bannerLink!.slice(1) : bannerLink!.replace(new RegExp("^" + bp + "/?"), "");
                onNavigate(pageId || "index");
              } : undefined}
            >
              {config.banner.text}
            </a>
          ) : (
            <span>{config.banner.text}</span>
          )}
          {config.banner.dismissible !== false && (
            <button
              onClick={() => {
                setBannerDismissed(true);
                try {
                  const hash = Array.from(config.banner!.text).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0).toString(36);
                  localStorage.setItem("tome-banner-dismissed", hash);
                } catch {}
              }}
              aria-label="Dismiss banner"
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0, opacity: 0.8 }}
            >
              &times;
            </button>
          )}
        </div>
      )}

      {/* Search Modal (TOM-16: branch on provider) */}
      {searchOpen && config.search?.provider === "algolia" && config.search.appId && config.search.apiKey && config.search.indexName ? (
        <AlgoliaSearchModal
          appId={config.search.appId}
          apiKey={config.search.apiKey}
          indexName={config.search.indexName}
          onNavigate={(id) => { onNavigate(id); setSearch(false); }}
          onClose={() => setSearch(false)}
          basePath={basePath}
        />
      ) : searchOpen ? (
        <SearchModal
          allPages={allPages}
          onNavigate={(id) => { onNavigate(id); setSearch(false); }}
          onClose={() => setSearch(false)}
          mobile={mobile}
        />
      ) : null}

      <div style={{ display: "flex", flexDirection: isRtl ? "row-reverse" : "row", flex: 1, height: config.banner?.text && !bannerDismissed ? "calc(100vh - 32px)" : "100vh" }}>
        {/* Mobile sidebar backdrop */}
        {mobile && sbOpen && (
          <div onClick={() => setSb(false)} style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)",
          }} />
        )}
        {/* Sidebar */}
        {overrides?.Sidebar ? (
          <overrides.Sidebar
            config={config}
            navigation={navigation}
            currentPageId={currentPageId}
            onNavigate={onNavigate}
            mobile={mobile}
            sbOpen={sbOpen}
            setSbOpen={setSb}
            versioning={versioning}
            currentVersion={currentVersion}
          />
        ) : (
        <aside style={{
          width: sbOpen ? 270 : 0, minWidth: sbOpen ? 270 : 0,
          background: "var(--sbBg)", [isRtl ? "borderLeft" : "borderRight"]: "1px solid var(--bd)",
          display: "flex", flexDirection: "column",
          transition: "width .2s, min-width .2s", overflow: "hidden",
          ...(mobile ? { position: "fixed" as const, top: 0, [isRtl ? "right" : "left"]: 0, bottom: 0, zIndex: 201 } : {}),
        }}>
          <a href="/" style={{ padding: "18px 20px", display: "flex", alignItems: "baseline", gap: 6, borderBottom: "1px solid var(--bd)", textDecoration: "none", color: "inherit" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, fontStyle: "italic" }}>
              {config.name}
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ac)", display: "inline-block" }} />
          </a>

          <div style={{ padding: "12px 14px" }}>
            <button onClick={() => { setSearch(true); if (mobile) setSb(false); }} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%",
              background: "var(--cdBg)", border: "1px solid var(--bd)", borderRadius: 2,
              padding: "8px 12px", cursor: "pointer", color: "var(--txM)", fontSize: 12.5,
              fontFamily: "var(--font-body)",
            }}>
              <SearchIcon /><span style={{ flex: 1, textAlign: isRtl ? "right" : "left" }}>Search...</span>
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
                {expanded.includes(sec.section) && <div style={{ [isRtl ? "marginRight" : "marginLeft"]: 8, [isRtl ? "borderRight" : "borderLeft"]: "1px solid var(--bd)", [isRtl ? "paddingRight" : "paddingLeft"]: 0 }}>
                  {sec.pages.map(p => {
                    const active = currentPageId === p.id;
                    return (
                      <button key={p.id} onClick={() => { onNavigate(p.id); if (mobile) setSb(false); }} style={{
                        display: "flex", alignItems: "center", gap: 10, width: "100%",
                        textAlign: isRtl ? "right" : "left", background: "none",
                        border: "none", borderRadius: 0,
                        [isRtl ? "borderRight" : "borderLeft"]: active ? "2px solid var(--ac)" : "2px solid transparent",
                        padding: "7px 14px", cursor: "pointer",
                        color: active ? "var(--ac)" : "var(--tx2)", fontSize: 13,
                        fontWeight: active ? 500 : 400, fontFamily: "var(--font-body)",
                        transition: "all .12s",
                      }}>
                        {p.title}
                        {p.badge && (() => {
                          const badgeColors: Record<string, { bg: string; text: string }> = {
                            default: { bg: "var(--sf)", text: "var(--tx2)" },
                            info: { bg: "rgba(59,130,246,0.15)", text: "rgb(59,130,246)" },
                            success: { bg: "rgba(34,197,94,0.15)", text: "rgb(34,197,94)" },
                            warning: { bg: "rgba(234,179,8,0.15)", text: "rgb(202,138,4)" },
                            danger: { bg: "rgba(239,68,68,0.15)", text: "rgb(239,68,68)" },
                          };
                          const bc = badgeColors[p.badge!.variant || "default"] || badgeColors.default;
                          return (
                            <span style={{
                              fontSize: 10, fontWeight: 600, padding: "2px 6px",
                              borderRadius: 4, marginLeft: 6, whiteSpace: "nowrap",
                              background: bc.bg, color: bc.text,
                            }}>{p.badge!.text}</span>
                          );
                        })()}
                      </button>
                    );
                  })}
                </div>}
              </div>
            ))}
          </nav>

          {/* Mobile version switcher in sidebar footer */}
          {versioning && mobile && (
            <div style={{ padding: "8px 16px", borderTop: "1px solid var(--bd)", display: "flex", gap: 6 }}>
              {versioning.versions.map(v => (
                <button
                  key={v}
                  onClick={() => {
                    // Navigate to the version's index page via hash routing
                    const targetId = v === versioning.current ? "index" : `${v}/index`;
                    onNavigate(targetId);
                  }}
                  style={{
                    flex: 1, padding: "3px 0", textAlign: "center",
                    background: v === (currentVersion || versioning.current) ? "var(--acD)" : "var(--sf)",
                    border: "1px solid var(--bd)", borderRadius: 2, cursor: "pointer",
                    color: v === (currentVersion || versioning.current) ? "var(--ac)" : "var(--tx2)",
                    fontSize: 11, fontFamily: "var(--font-code)",
                    fontWeight: v === versioning.current ? 600 : 400,
                  }}
                >
                  {v}{v === versioning.current ? " (latest)" : ""}
                </button>
              ))}
            </div>
          )}
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* TOM-12: Only show toggle when mode is "auto" */}
            {themeMode === "auto" ? (
              <button aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark(d => !d)} style={{ background: "none", border: "none", color: "var(--txM)", cursor: "pointer", display: "flex" }}>
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
            ) : <div />}
            <span style={{ fontSize: 11, color: "var(--txM)", letterSpacing: 0.2 }}>Built with {"\u2661"} by Tome</span>
            <span style={{ fontFamily: "var(--font-code)", fontSize: 10, color: "var(--txM)" }}>{typeof __TOME_VERSION__ !== "undefined" && __TOME_VERSION__ ? `v${__TOME_VERSION__}` : "v0.1.0"}</span>
          </div>
        </aside>
        )}

        {/* Main area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header */}
          {overrides?.Header ? (
            <overrides.Header
              config={config}
              navigation={navigation}
              currentPageId={currentPageId}
              onNavigate={onNavigate}
              mobile={mobile}
              sbOpen={sbOpen}
              setSbOpen={setSb}
              isDark={isDark}
              setDark={setDark}
              versioning={versioning}
              currentVersion={currentVersion}
              i18n={i18n}
              currentLocale={currentLocale}
              onSearchOpen={() => setSearch(true)}
              basePath={basePath}
            />
          ) : (
          <header style={{
            display: "flex", alignItems: "center", gap: mobile ? 8 : 12, padding: mobile ? "8px 12px" : "10px 24px",
            borderBottom: "1px solid var(--bd)", background: "var(--hdBg)", backdropFilter: "blur(12px)",
            maxWidth: "100vw", overflow: "visible", position: "relative", zIndex: 200,
          }}>
            <button aria-label={sbOpen ? "Close sidebar" : "Open sidebar"} onClick={() => setSb(!sbOpen)} style={{ background: "none", border: "none", color: "var(--txM)", cursor: "pointer", display: "flex" }}>
              {sbOpen ? <XIcon /> : <MenuIcon />}
            </button>
            {mobile ? (
              <span style={{ fontSize: 13, color: "var(--ac)", fontFamily: "var(--font-code)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {navigation.flatMap(s => s.pages).find(p => p.id === currentPageId)?.title || ""}
              </span>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-code)", fontSize: 11, color: "var(--txM)", letterSpacing: ".03em", flex: 1 }}>
                {navigation.map(s => {
                  const f = s.pages.find(p => p.id === currentPageId);
                  if (!f) return null;
                  return <span key={s.section} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span>{s.section}</span><ChevRight /><span style={{ color: "var(--ac)" }}>{f.title}</span>
                  </span>;
                })}
              </div>
            )}

            {/* Top Nav Links */}
            {config.topNav && config.topNav.length > 0 && !mobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {config.topNav.map((link) => {
                  const isInternal = link.href.startsWith("#") || (basePath && link.href.startsWith(basePath + "/"));
                  const isExternal = !isInternal;
                  return (
                    <a
                      key={link.label}
                      href={isInternal && link.href.startsWith("#") ? (basePath + "/" + link.href.slice(1)) : link.href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      onClick={isInternal ? (e: React.MouseEvent) => {
                        e.preventDefault();
                        const pageId = link.href.startsWith("#") ? link.href.slice(1) : link.href.replace(new RegExp("^" + basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/?"), "");
                        onNavigate(pageId);
                      } : undefined}
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

            {/* Social Links */}
            {config.socialLinks && config.socialLinks.length > 0 && !mobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {config.socialLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label || link.platform}
                    data-testid={`social-link-${link.platform}`}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--tx2)", cursor: "pointer", transition: "color .15s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "var(--tx)")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "var(--tx2)")}
                  >
                    <SocialIcon platform={link.platform} customIcon={link.icon} />
                  </a>
                ))}
              </div>
            )}

            {/* Theme toggle in header on mobile */}
            {mobile && themeMode === "auto" && (
              <button aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark(d => !d)} style={{ background: "none", border: "none", color: "var(--txM)", cursor: "pointer", display: "flex", flexShrink: 0 }}>
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
            )}

            {/* TOM-30: Version Switcher — hidden on mobile */}
            {versioning && !mobile && (
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
                          // Navigate to the version's index page via hash routing
                          const targetId = v === versioning.current ? "index" : `${v}/index`;
                          onNavigate(targetId);
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

            {/* TOM-34: Language Switcher — hidden on mobile */}
            {i18n && i18n.locales.length > 1 && !mobile && (
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
          )}

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
                onClick={() => { onNavigate("index"); }}
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
            <main style={{ flex: 1, maxWidth: mobile ? "100%" : apiManifest ? 1100 : 760, padding: mobile ? "24px 16px 60px" : "40px 48px 80px", margin: "0 auto", minWidth: 0 }}>
              {breadcrumbs.length > 0 && (
                <nav aria-label="Breadcrumbs" data-testid="breadcrumbs" style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 13, color: "var(--tx2)", marginBottom: 8,
                }}>
                  {breadcrumbs.map((crumb, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span style={{ color: "var(--tx2)", opacity: 0.5 }}>{"\u203A"}</span>}
                      {i < breadcrumbs.length - 1 && crumb.href !== null ? (
                        <a
                          href={crumb.href}
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            // Find the page id for this href
                            const page = navigation.flatMap(s => s.pages).find(p => p.urlPath === crumb.href);
                            if (page) onNavigate(page.id);
                          }}
                          style={{ color: "var(--tx2)", textDecoration: "none", cursor: "pointer" }}
                        >
                          {crumb.label}
                        </a>
                      ) : (
                        <span style={i === breadcrumbs.length - 1 ? { color: "var(--tx)" } : undefined}>{crumb.label}</span>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              )}
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: mobile ? 26 : 38, fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, marginBottom: 8 }}>
                {pageTitle}
              </h1>
              {isDraft && (
                <div data-testid="draft-banner" style={{ background: "#fef3c7", color: "#92400e", padding: "8px 16px", borderRadius: 6, fontSize: 13, marginBottom: 16 }}>
                  Draft — This page is only visible in development
                </div>
              )}
              {pageDescription && <p style={{ fontSize: 16, color: "var(--tx2)", lineHeight: 1.6, marginBottom: 32 }}>{pageDescription}</p>}
              <div style={{ borderTop: "1px solid var(--bd)", paddingTop: 28 }}>
                {/* TOM-19: API Reference page */}
                {apiManifest && ApiReferenceComponent ? (
                  <ApiReferenceComponent manifest={apiManifest} baseUrl={apiBaseUrl} showPlayground={apiPlayground} playgroundAuth={apiAuth} />
                ) : /* TOM-49: Changelog page type */
                changelogEntries && changelogEntries.length > 0 ? (
                  <ChangelogView entries={changelogEntries} />
                ) : PageComponent ? (
                  <div className="tome-content">
                    <PageComponent components={mdxComponents || {}} />
                  </div>
                ) : (
                  <div
                    key={currentPageId}
                    className="tome-content"
                    ref={htmlContentRef}
                  />
                )}
              </div>

              {/* TOM-48: Edit this page link + TOM-54: Last updated + Feedback + Prev/Next */}
              {!pageHtml && !pageComponent ? null : overrides?.PageFooter ? (
                <overrides.PageFooter
                  editUrl={editUrl}
                  lastUpdated={lastUpdated}
                  currentPageId={currentPageId}
                  prev={prev}
                  next={next}
                  onNavigate={onNavigate}
                  mobile={mobile}
                />
              ) : (
              <>
              {(editUrl || lastUpdated) && (
                <div style={{ marginTop: 40, display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "flex-start" : "center", justifyContent: "space-between", gap: mobile ? 8 : 16 }}>
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

              {/* Feedback widget */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, padding: "12px 0" }}>
                {feedbackGiven[currentPageId] ? (
                  <span style={{ fontSize: 13, color: "var(--txM)", fontFamily: "var(--font-body)" }}>Thanks for your feedback!</span>
                ) : (
                  <>
                    <span style={{ fontSize: 13, color: "var(--txM)", fontFamily: "var(--font-body)" }}>Was this helpful?</span>
                    <button onClick={() => { setFeedbackGiven(prev => ({ ...prev, [currentPageId]: true })); try { localStorage.setItem(`tome-feedback-${currentPageId}`, "up"); } catch {} }} style={{
                      background: "none", border: "1px solid var(--bd)", borderRadius: 2, padding: "4px 10px", cursor: "pointer", fontSize: 13, color: "var(--txM)", transition: "border-color .15s",
                    }}>👍</button>
                    <button onClick={() => { setFeedbackGiven(prev => ({ ...prev, [currentPageId]: true })); try { localStorage.setItem(`tome-feedback-${currentPageId}`, "down"); } catch {} }} style={{
                      background: "none", border: "1px solid var(--bd)", borderRadius: 2, padding: "4px 10px", cursor: "pointer", fontSize: 13, color: "var(--txM)", transition: "border-color .15s",
                    }}>👎</button>
                  </>
                )}
              </div>

              {/* Prev / Next link cards */}
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", marginTop: 24, paddingTop: 32, paddingBottom: 40, borderTop: "1px solid var(--bd)", gap: 16 }}>
                {prev ? (
                  <button onClick={() => onNavigate(prev.id)} style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6,
                    background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 8,
                    padding: "16px 20px", cursor: "pointer", textAlign: "left",
                    fontFamily: "var(--font-body)", transition: "all .3s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--ac)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--bd)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
                  >
                    <span style={{ fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 4 }}>
                      {isRtl ? <ArrowRight /> : <ArrowLeft />} Previous
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--tx)" }}>{prev.title}</span>
                  </button>
                ) : <div />}
                {next ? (
                  <button onClick={() => onNavigate(next.id)} style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6,
                    background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 8,
                    padding: "16px 20px", cursor: "pointer", textAlign: "right",
                    fontFamily: "var(--font-body)", transition: "all .3s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--ac)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--bd)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
                  >
                    <span style={{ fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 4 }}>
                      Next {isRtl ? <ArrowLeft /> : <ArrowRight />}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--tx)" }}>{next.title}</span>
                  </button>
                ) : <div />}
              </div>
              </>
              )}
            </main>

            {/* TOC (TOM-52) */}
            {overrides?.Toc ? (
              showToc && filteredHeadings.length >= 2 && wide && (
                <overrides.Toc
                  headings={filteredHeadings}
                  activeHeadingId={activeHeadingId}
                  onScrollToHeading={scrollToHeading}
                />
              )
            ) : (
            showToc && filteredHeadings.length >= 2 && wide && (
              <aside data-testid="toc-sidebar" style={{ width: 200, padding: isRtl ? "40px 0 40px 16px" : "40px 16px 40px 0", position: "sticky", top: 0, alignSelf: "flex-start", flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--txM)", marginBottom: 12, fontFamily: "var(--font-code)" }}>On this page</div>
                <nav aria-label="Table of contents" style={{ [isRtl ? "borderRight" : "borderLeft"]: "1px solid var(--bd)", [isRtl ? "paddingRight" : "paddingLeft"]: 0 }}>
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
                          [isRtl ? "paddingRight" : "paddingLeft"]: 12 + (h.depth - 2) * 12,
                          lineHeight: 1.4,
                          transition: "color .15s, font-weight .15s",
                          [isRtl ? "borderRight" : "borderLeft"]: isActive ? "2px solid var(--ac)" : "2px solid transparent",
                          [isRtl ? "marginRight" : "marginLeft"]: -1,
                        }}
                      >{h.text}</a>
                    );
                  })}
                </nav>
              </aside>
            )
            )}
          </div>
        </div>
      </div>

      {/* Footer override */}
      {overrides?.Footer && (
        <overrides.Footer
          config={config}
          navigation={navigation}
          currentPageId={currentPageId}
          onNavigate={onNavigate}
        />
      )}

      {/* TOM-32: AI Chat Widget (BYOK) */}
      {config.ai?.enabled && (
        <AiChat
          provider={config.ai.provider || "anthropic"}
          model={config.ai.model}
          apiKey={typeof __TOME_AI_API_KEY__ !== "undefined" && __TOME_AI_API_KEY__ ? __TOME_AI_API_KEY__ : undefined}
          context={docContext?.map((d) => `## ${d.title}\n${d.content}`).join("\n\n") ?? allPages.map((p) => `- ${p.title}${p.description ? ": " + p.description : ""}`).join("\n")}
        />
      )}

      {/* Image zoom overlay */}
      {zoomSrc && (
        <div onClick={() => setZoomSrc(null)} style={{
          position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", cursor: "zoom-out",
        }}>
          <img src={zoomSrc} alt="" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 4, boxShadow: "0 16px 64px rgba(0,0,0,0.4)" }} />
        </div>
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
function SearchModal({ allPages, onNavigate, onClose, mobile }: {
  allPages: Array<{ id: string; title: string; description?: string }>;
  onNavigate: (id: string) => void;
  onClose: () => void;
  mobile?: boolean;
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
      backdropFilter: "blur(6px)", display: "flex",
      alignItems: mobile ? "stretch" : "flex-start",
      justifyContent: "center", paddingTop: mobile ? 0 : "12vh",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--sf)", border: mobile ? "none" : "1px solid var(--bd)", borderRadius: mobile ? 0 : 2,
        width: "100%", maxWidth: mobile ? "100%" : 520, boxShadow: mobile ? "none" : "0 24px 80px rgba(0,0,0,0.4)",
        overflow: "hidden", display: "flex", flexDirection: "column" as const,
        ...(mobile ? { height: "100%" } : {}),
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
        {results.length > 0 && <div style={{ padding: 6, maxHeight: mobile ? "none" : 360, overflow: "auto", flex: mobile ? 1 : undefined }}>
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
