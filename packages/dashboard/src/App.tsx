import React, { useState, useEffect, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────

interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  plan: string;
  createdAt: string;
}

interface Project {
  id: string;
  slug: string;
  name: string;
  deployStatus: string | null;
  lastDeployAt: string | null;
  fileCount: number;
  totalSize: number;
  url: string | null;
  createdAt: string;
}

interface Deployment {
  id: string;
  status: string;
  fileCount: number;
  totalSize: number;
  createdAt: string;
  finalizedAt: string | null;
  url: string | null;
}

interface DomainStatus {
  domain: string;
  verified: boolean;
  sslStatus: string;
  dnsRecords: { type: string; name: string; value: string; verified: boolean }[];
}

interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  topPages: { url: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
  viewsByDay: { date: string; views: number }[];
}

interface OAuthProvider {
  id: string;
  name: string;
  authorizeUrl: string;
}

type AuthState =
  | { status: "loading" }
  | { status: "logged_out" }
  | { status: "logged_in"; token: string; user: User };

// ── API helper ─────────────────────────────────────────────

const API_URL = import.meta.env.VITE_API_URL ?? "https://api.tome.center";
const DEV_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK === "1";

const MOCK_USER: User = {
  id: "usr_1", email: "dev@tome.center", name: "Dev User",
  plan: "cloud", avatarUrl: null, createdAt: "2025-01-15T00:00:00Z",
};
const MOCK_PROJECTS: Project[] = [
  { id: "prj_1", slug: "acme-docs", name: "Acme Docs", deployStatus: "live", lastDeployAt: "2026-03-14T12:00:00Z", fileCount: 42, totalSize: 1048576, url: "https://acme-docs.tome.sh", createdAt: "2025-06-01T00:00:00Z" },
  { id: "prj_2", slug: "internal-wiki", name: "Internal Wiki", deployStatus: "building", lastDeployAt: "2026-03-15T08:00:00Z", fileCount: 18, totalSize: 524288, url: null, createdAt: "2025-09-20T00:00:00Z" },
];
const MOCK_DEPLOYMENTS: Deployment[] = [
  { id: "dpl_1", status: "live", fileCount: 42, totalSize: 1048576, createdAt: "2026-03-14T12:00:00Z", finalizedAt: "2026-03-14T12:01:30Z", url: "https://acme-docs.tome.sh" },
  { id: "dpl_2", status: "superseded", fileCount: 40, totalSize: 1024000, createdAt: "2026-03-12T09:00:00Z", finalizedAt: "2026-03-12T09:01:00Z", url: "https://acme-docs--dpl_2.tome.sh" },
];
const MOCK_DATA: Record<string, unknown> = {
  "/api/auth/me": MOCK_USER,
  "/api/deploy/projects": MOCK_PROJECTS,
  "/api/analytics": { totalPageViews: 12453, uniqueVisitors: 3891, avgTimeOnPage: 42, topPages: [{ url: "/quickstart", views: 2341 }, { url: "/guides/search", views: 1102 }, { url: "/reference/config", views: 890 }] },
};

async function api<T>(
  path: string,
  opts: { method?: string; body?: unknown; token?: string } = {},
): Promise<T> {
  if (DEV_MOCK) {
    if (path.includes("/deployments")) return MOCK_DEPLOYMENTS as T;
    const mockKey = Object.keys(MOCK_DATA).find((k) => path.startsWith(k));
    if (mockKey) return MOCK_DATA[mockKey] as T;
    return {} as T;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method: opts.method ?? "GET",
    headers: {
      ...(opts.body ? { "Content-Type": "application/json" } : {}),
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
    },
    ...(opts.body ? { body: JSON.stringify(opts.body) } : {}),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error: string }).error);
  }
  return res.json() as Promise<T>;
}

// ── Icons ──────────────────────────────────────────────────

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="external-link-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ── Theme tokens ───────────────────────────────────────────

const THEMES = {
  light: {
    "--bg": "#f5f2ed", "--sf": "#ffffff", "--sfH": "#eeece6",
    "--bd": "#ddd9d0", "--bdA": "#c8c3b8", "--bdLight": "#e8e4dc",
    "--tx": "#1a1716", "--tx2": "#4a443e", "--txM": "#696360",
    "--accent": "#8b3a2f", "--accentLight": "#a34838",
    "--accentFaint": "rgba(139,58,47,0.08)", "--accentGlow": "rgba(139,58,47,0.25)",
    "--coralBtn": "#8b3a2f", "--coral": "#8b3a2f",
    "--coralD": "rgba(139,58,47,0.08)", "--coralT": "#a34838",
    "--green": "#15803d", "--yellow": "#a16207", "--red": "#b91c1c",
    "--cdBg": "#edeae4", "--cdTx": "#3a3530", "--cdBd": "#ddd9d0",
    "--shadowColor": "rgba(0,0,0,0.18)", "--shadowHeavy": "rgba(0,0,0,0.3)",
    "--shadowFloat": "0 8px 32px rgba(0,0,0,0.14), 0 3px 12px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.12)",
    "--shadowFloatHover": "0 20px 60px rgba(0,0,0,0.22), 0 8px 28px rgba(0,0,0,0.14), 0 0 1px rgba(0,0,0,0.12)",
    "--btnGlow": "rgba(0,0,0,0.2)",
  },
  dark: {
    "--bg": "#080c1f", "--sf": "#0e1333", "--sfH": "#141940",
    "--bd": "#1a2050", "--bdA": "#252d66", "--bdLight": "#252d66",
    "--tx": "#e8e6f0", "--tx2": "#b5b1c8", "--txM": "#9490ae",
    "--accent": "#ff6b4a", "--accentLight": "#ff8a70",
    "--accentFaint": "rgba(255,107,74,0.1)", "--accentGlow": "rgba(255,107,74,0.3)",
    "--coralBtn": "#c0402a", "--coral": "#ff6b4a",
    "--coralD": "rgba(255,107,74,0.1)", "--coralT": "#ff8a70",
    "--green": "#22c55e", "--yellow": "#eab308", "--red": "#f87171",
    "--cdBg": "#0a0e27", "--cdTx": "#b8b4cc", "--cdBd": "#1a2050",
    "--shadowColor": "rgba(0,0,0,0.4)", "--shadowHeavy": "rgba(0,0,0,0.6)",
    "--shadowFloat": "0 8px 32px rgba(0,0,0,0.5), 0 3px 12px rgba(0,0,0,0.35), 0 0 1px rgba(0,0,0,0.4)",
    "--shadowFloatHover": "0 20px 60px rgba(0,0,0,0.6), 0 8px 28px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.5)",
    "--btnGlow": "rgba(0,0,0,0.4)",
  },
} as const;

// ── Plans ──────────────────────────────────────────────────

const PLANS: Record<string, { name: string; price: string; features: string[] }> = {
  community: { name: "Community", price: "Free", features: ["10 deploys/mo", "Pagefind search", "Community support"] },
  cloud: { name: "Cloud", price: "$19.99/mo", features: ["Unlimited deploys", "1 custom domain", "Analytics", "Priority support"] },
  team: { name: "Team", price: "$49.99/mo", features: ["Unlimited everything", "SSO", "AI chat", "Team collaboration"] },
};

// ── CSS ────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

@keyframes revealUp{
  from{opacity:0;transform:translateY(16px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes liquidSpin{
  0%{transform:translate(-50%,-50%) rotate(0deg)}
  100%{transform:translate(-50%,-50%) rotate(360deg)}
}

/* Focus visible for keyboard navigation */
a:focus-visible,button:focus-visible{outline:2px solid var(--coral);outline-offset:2px;border-radius:4px}

/* Reduced motion */
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}
}

.rv{animation:revealUp .5s cubic-bezier(.22,1,.36,1) both}
.rv1{animation-delay:.05s}.rv2{animation-delay:.1s}.rv3{animation-delay:.15s}
.rv4{animation-delay:.2s}.rv5{animation-delay:.25s}

.input-field{
  width:100%;padding:10px 14px;background:var(--sf);color:var(--tx);
  border:1px solid var(--bd);border-radius:6px;font-family:Inter,sans-serif;
  font-size:14px;outline:none;transition:border-color .2s;
}
.input-field:focus{border-color:var(--coral)}
.input-field::placeholder{color:var(--txM)}

.btn-primary{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:12px 24px;background:var(--coralBtn);color:#fff;border:none;border-radius:6px;
  font-family:Inter,sans-serif;font-size:14px;font-weight:600;
  cursor:pointer;text-decoration:none;
  box-shadow:var(--shadowFloat);
  transition:all .4s cubic-bezier(.34,1.56,.64,1);
}
.btn-primary:hover{box-shadow:var(--shadowFloatHover);transform:translateY(-2px)}
.btn-primary:active{transform:translateY(0);box-shadow:var(--shadowFloat);transition:all .12s ease}
.btn-primary:active{box-shadow:0 2px 8px var(--shadowColor)}
.btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}

.btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:12px 24px;background:transparent;color:var(--tx);
  border:1px solid var(--bd);border-radius:6px;font-family:Inter,sans-serif;
  font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;
  box-shadow:var(--shadowFloat);
  transition:all .4s cubic-bezier(.34,1.56,.64,1);
}
.btn-ghost:hover{border-color:var(--coral);box-shadow:var(--shadowFloatHover);transform:translateY(-2px)}
.btn-danger{color:var(--red);border-color:rgba(239,68,68,0.3)}
.btn-danger:hover{border-color:var(--red) !important;color:var(--red) !important}

.card-accent{transition:filter .4s ease}
.card-accent:hover{filter:brightness(1.05)}
.btn-on-accent:hover{border-color:#fff !important;box-shadow:0 8px 30px rgba(0,0,0,0.25) !important}
.btn-ghost:active{box-shadow:0 2px 8px var(--shadowColor)}

.btn-sm{padding:6px 14px;font-size:12px}

.btn-oauth{
  display:flex;align-items:center;justify-content:center;gap:10px;
  width:100%;padding:12px 16px;background:var(--sf);color:var(--tx);
  border:1px solid var(--bd);border-radius:6px;font-family:Inter,sans-serif;
  font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;
  box-shadow:var(--shadowFloat);
  transition:all .4s cubic-bezier(.34,1.56,.64,1);
}
.btn-oauth:hover{border-color:var(--coral);box-shadow:var(--shadowFloatHover)}
.btn-oauth:active{box-shadow:0 2px 8px var(--shadowColor)}

.nav-link{
  color:var(--txM);text-decoration:none;font-size:14px;
  font-family:Inter,sans-serif;font-weight:400;
  transition:color .2s;cursor:pointer;background:none;border:none;
}
.nav-link:hover{color:var(--coral)}
.nav-link[data-active="true"]{color:var(--coral);text-decoration:underline;text-underline-offset:4px}

.action-link{
  color:var(--coral);text-decoration:none;font-family:Inter,sans-serif;
  font-size:13px;font-weight:500;display:inline-flex;align-items:center;gap:4px;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),letter-spacing .3s ease;
  transform-origin:left center;
}
.action-link:hover{transform:scale(1.04);letter-spacing:0.2px}
.action-link-white{
  color:#fff;text-decoration:none;font-family:Inter,sans-serif;font-size:13px;font-weight:500;
  display:inline-block;margin-top:16px;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),letter-spacing .3s ease;
  transform-origin:left center;
}
.action-link-white:hover{transform:scale(1.04);letter-spacing:0.2px}

.status-live{color:var(--green)}
.status-uploading{color:var(--yellow)}
.status-failed{color:var(--red)}

.card{
  background:var(--sf);border:1px solid var(--bd);border-radius:12px;padding:24px;
  box-shadow:var(--shadowFloat);
  transition:all .4s cubic-bezier(.34,1.56,.64,1);
}
.card:hover{box-shadow:var(--shadowFloatHover)}

.stat-card{
  background:var(--sf);border:1px solid var(--bd);border-radius:12px;padding:20px;
  text-align:center;box-shadow:var(--shadowFloat);
}

.token-box{
  background:var(--cdBg);border:1px solid var(--cdBd);border-radius:6px;padding:12px 16px;
  font-family:"Fira Code",monospace;font-size:13px;color:var(--cdTx);
  display:flex;align-items:center;gap:12px;
}

.dns-record{
  background:var(--cdBg);border:1px solid var(--cdBd);border-radius:6px;padding:10px 14px;
  font-family:"Fira Code",monospace;font-size:12px;color:var(--cdTx);
  margin:4px 0;
}

.section-title{
  font-family:"Cormorant Garamond",serif;font-weight:400;font-style:italic;
  font-size:28px;color:var(--tx);margin-bottom:20px;
}

.table-header{
  display:grid;padding:8px 0;border-bottom:1px solid var(--bd);
  font-size:11px;text-transform:uppercase;letter-spacing:1px;
  font-family:Inter,sans-serif;color:var(--txM);font-weight:600;
}
.table-row{
  display:grid;padding:12px 0;border-bottom:1px solid var(--bd);
  font-size:13px;font-family:Inter,sans-serif;color:var(--tx2);
  align-items:center;
}
.table-row:hover{background:var(--coralD);border-radius:6px}

.divider-text{
  display:flex;align-items:center;gap:12px;margin:16px 0;
  font-family:Inter,sans-serif;font-size:11px;
  color:var(--txM);text-transform:uppercase;letter-spacing:1px;
}
.divider-text::before,.divider-text::after{
  content:"";flex:1;height:1px;background:var(--bd);
}

.code-snippet{
  background:var(--cdBg);border:1px solid var(--cdBd);border-radius:6px;padding:14px 16px;
  font-family:"Fira Code",monospace;font-size:12.5px;color:var(--cdTx);
  line-height:1.6;overflow-x:auto;
}

.upgrade-wrap{position:relative;display:inline-flex}
.upgrade-wrap .upgrade-tooltip{
  display:none;position:absolute;bottom:calc(100% + 10px);left:50%;
  transform:translateX(-50%);width:260px;padding:14px 16px;
  background:var(--sf);border:1px solid var(--bd);
  box-shadow:0 8px 30px rgba(0,0,0,.12);z-index:200;
  font-family:"Bricolage Grotesque",sans-serif;font-size:12px;
  color:var(--tx2);line-height:1.5;pointer-events:none;
}
.upgrade-wrap .upgrade-tooltip::after{
  content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);
  border:6px solid transparent;border-top-color:var(--bd);
}
.upgrade-wrap:hover .upgrade-tooltip{display:block}

/* ── Responsive ────────────────────────────────── */

/* Tablet / half-screen: icon-only sidebar */
@media (max-width: 1200px) and (min-width: 768px) {
  .dash-sidebar {
    width: 60px !important; padding: 16px 8px !important; align-items: center !important;
  }
  .dash-sidebar .dash-logo { text-align: center !important; padding: 0 !important; }
  .dash-sidebar .dash-logo-text { display: none !important; }
  .dash-sidebar > nav a span { display: none !important; }
  .dash-sidebar > nav a { padding: 10px !important; justify-content: center !important; border-radius: 8px !important; }
  .dash-sidebar > nav a svg.external-link-icon { display: none !important; }
  .dash-sidebar > div:nth-child(3) { display: none !important; } /* hide divider */
  .dash-sidebar .dash-user-name { display: none !important; }
  .dash-sidebar .dash-bottom { align-items: center !important; }
  .dash-sidebar .dash-bottom a { justify-content: center !important; }
  .dash-sidebar .dash-bottom button { justify-content: center !important; }
  .dash-sidebar .dash-bottom button span { display: none !important; }
  .dash-main { padding: 32px 20px !important; }
}

@media (max-width: 767px) {
  /* Sidebar: collapse to bottom nav on mobile */
  .dash-layout { flex-direction: column !important; }
  .dash-sidebar {
    width: 100% !important; height: auto !important; position: fixed !important;
    bottom: 0 !important; top: auto !important; flex-direction: row !important;
    padding: 6px 0 !important; border-right: none !important;
    border-top: 1px solid var(--bd) !important; z-index: 100 !important;
    justify-content: center !important; align-items: center !important;
    gap: 0 !important;
  }
  /* Hide: logo, divider, external links nav, spacer, bottom user section */
  .dash-sidebar > a:first-child { display: none !important; }
  .dash-sidebar > nav:last-of-type { display: none !important; }
  .dash-sidebar > div { display: none !important; }
  /* Main nav: horizontal centered icons */
  .dash-sidebar > nav:first-of-type {
    display: flex !important; flex-direction: row !important; gap: 0 !important;
    width: 100% !important; justify-content: center !important;
  }
  .dash-sidebar > nav:first-of-type a {
    padding: 12px 16px !important; font-size: 0 !important;
    display: flex !important; align-items: center !important; justify-content: center !important;
    min-width: 44px !important; min-height: 44px !important;
    background: none !important;
  }
  .dash-sidebar > nav:first-of-type a span { display: none !important; }
  .dash-sidebar > nav:first-of-type a svg { margin: 0 !important; }

  /* Main content */
  .dash-main { padding: 24px 16px 80px !important; }
  .section-title { font-size: 20px !important; }

  /* Quick Actions: stack vertically */
  .dash-quick-actions { flex-direction: column !important; }
  .dash-quick-actions .code-snippet { width: 100% !important; }
  .dash-quick-actions .btn-primary { width: 100% !important; justify-content: center !important; }

  /* Danger Zone: stack text + button */
  .dash-danger-card { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
  .dash-danger-card button { align-self: flex-start !important; }

  /* Domain card actions: wrap */
  .dash-domain-header { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }

  /* Tables */
  .deploy-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .table-header, .table-row { font-size: 11px !important; min-width: 560px; }

  /* Steps */
  .step-buttons { flex-wrap: wrap !important; }
  .step-buttons button { flex: 1 1 45% !important; min-width: 0 !important; }

  /* Token */
  .token-box { flex-wrap: wrap; }

  /* Billing plan cards grid */
  .dash-plan-grid { grid-template-columns: 1fr !important; }

  /* Settings info grid */
  .dash-settings-grid { grid-template-columns: 1fr !important; }
  .dash-settings-grid > span:nth-child(odd) { font-weight: 600 !important; }

  /* Upgrade tooltip: pin to viewport edge instead of centering */
  .upgrade-wrap .upgrade-tooltip {
    left: auto !important; right: 0 !important;
    transform: none !important; width: min(260px, 80vw) !important;
  }
  .upgrade-wrap .upgrade-tooltip::after {
    left: auto !important; right: 16px !important; transform: none !important;
  }
}

@media (max-width: 480px) {
  .dash-nav { gap: 8px !important; }
  .dash-nav .nav-link { font-size: 11px !important; }
  .step-buttons button { flex: 1 1 100% !important; }
  .card { padding: 16px !important; }
  .stat-card { padding: 14px !important; }
}
`;

// ── Utilities ──────────────────────────────────────────────

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "Never";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// ── Router ─────────────────────────────────────────────────

const BASE = "/dashboard";

function matchRoute(path: string): { page: string; params: Record<string, string> } {
  const route = path.replace(BASE, "") || "/";
  if (route.startsWith("/project/")) {
    return { page: "project", params: { slug: route.slice(9) } };
  }
  const pages: Record<string, string> = {
    "/": "projects",
    "/login": "login",
    "/billing": "billing",
    "/settings": "settings",
  };
  return { page: pages[route] ?? "projects", params: {} };
}

function navigate(to: string) {
  const path = to.startsWith(BASE) ? to : `${BASE}${to}`;
  window.history.pushState(null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

// ── Login Page ─────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: (token: string, user: User) => void }) {
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<OAuthProvider[]>([]);
  const [providersLoaded, setProvidersLoaded] = useState(false);

  // Fetch available OAuth providers
  useEffect(() => {
    api<{ providers: OAuthProvider[]; emailEnabled: boolean }>("/api/auth/providers")
      .then((data) => { setProviders(data.providers); setProvidersLoaded(true); })
      .catch(() => { setProvidersLoaded(true); });
  }, []);

  // Handle OAuth callback on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state"); // "github" or "google"

    if (code && state) {
      setOauthLoading(true);
      setError(null);

      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);

      const redirectUri = `${window.location.origin}/dashboard`;
      api<{ token: string; userId: string; email: string }>("/api/auth/oauth/callback", {
        method: "POST",
        body: { provider: state, code, redirectUri },
      })
        .then(async (data) => {
          const user = await api<User>("/api/auth/me", { token: data.token });
          onLogin(data.token, user);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "OAuth sign in failed");
          setOauthLoading(false);
        });
    }
  }, [onLogin]);

  if (oauthLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 }}>
        <div className="rv" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic", fontSize: 36, color: "var(--tx)", fontWeight: 300 }}>
            Tome<span style={{ color: "var(--coral)" }}>.</span>
          </span>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)", marginTop: 24, animation: "pulse 2s infinite" }}>
            Completing sign in…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 }}>
      <div className="rv" style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic", fontSize: 36, color: "var(--tx)", fontWeight: 300 }}>
              Tome<span style={{ color: "var(--coral)" }}>.</span>
            </span>
          </a>
        </div>
        <div style={{ border: "1px solid var(--bd)", background: "var(--sf)", padding: 32, borderRadius: 12, boxShadow: "0 4px 16px var(--shadowColor)" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)", marginBottom: 20 }}>
            Sign in to your account
          </p>

          {error && (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--red)", marginBottom: 16 }}>{error}</p>
          )}

          {/* OAuth Providers */}
          {!providersLoaded ? (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--txM)", textAlign: "center", padding: "16px 0", animation: "pulse 2s infinite" }}>
              Loading…
            </p>
          ) : providers.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {providers.map((p) => (
                <LiquidRing key={p.id} block radius={6} bg="var(--sf)">
                  <a href={p.authorizeUrl} className="btn-oauth" style={{ borderRadius: 6, width: "100%" }}>
                    {p.id === "github" && <GitHubIcon />}
                    {p.id === "google" && <GoogleIcon />}
                    Continue with {p.name}
                  </a>
                </LiquidRing>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--txM)", textAlign: "center", padding: "16px 0" }}>
              No sign-in providers available. Please contact the administrator.
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, padding: "0 4px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--txM)" }}>
            No account? One will be created automatically.
          </p>
          <a href="/" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--txM)", textDecoration: "none", transition: "color .2s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "var(--coral)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "var(--txM)")}>
            &larr; Home
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar Icons ─────────────────────────────────────────

const ProjectsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2" /><path d="M8 3v18" /><path d="M2 9h6" /><path d="M2 15h6" />
  </svg>
);

const BillingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const DocsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// ── LiquidRing ────────────────────────────────────────────

function LiquidRing({ children, bg, radius = 6, block, style, onAccent }: {
  children: React.ReactNode;
  bg?: string;
  radius?: number;
  block?: boolean;
  style?: React.CSSProperties;
  onAccent?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Tag = block ? "div" : "span";
  const InnerTag = block ? "div" : "span";

  const gradient = onAccent
    ? `conic-gradient(
      from 0deg,
      transparent 0%,
      transparent 35%,
      #000000 42%,
      #ffffff 50%,
      #000000 58%,
      transparent 65%,
      transparent 100%
    )`
    : `conic-gradient(
      from 0deg,
      transparent 0%,
      transparent 35%,
      #1a1a1a 42%,
      #777777 50%,
      #1a1a1a 58%,
      transparent 65%,
      transparent 100%
    )`;

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: block ? "block" : "inline-flex",
        position: "relative",
        borderRadius: radius + 2,
        padding: 2,
        overflow: "hidden",
        background: bg ?? "transparent",
        boxShadow: "var(--shadowFloat)",
        transition: "box-shadow .4s ease",
        ...style,
      }}
    >
      <InnerTag style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "150%",
        height: block ? "150%" : "400%",
        background: gradient,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        animation: "liquidSpin 6s linear infinite",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <InnerTag style={{
        position: "absolute",
        inset: -2,
        borderRadius: radius + 4,
        background: onAccent ? "#ffffff" : "#1a1a1a",
        filter: "blur(8px)",
        opacity: hovered ? (onAccent ? 0.25 : 0.15) : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />
      <InnerTag style={{ position: "relative", zIndex: 2, display: block ? "block" : "inline-flex", borderRadius: radius, overflow: "hidden", background: bg ?? "transparent", ...(block ? { height: "100%" } : {}) }}>
        {children}
      </InnerTag>
    </Tag>
  );
}

// ── Shell (sidebar layout) ────────────────────────────────

function Shell({
  user, isDark, setDark, children,
}: {
  user: User;
  isDark: boolean;
  setDark: (v: boolean) => void;
  children: React.ReactNode;
}) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : BASE;
  const { page } = matchRoute(pathname);

  const sidebarLinkStyle = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
    borderRadius: 8, textDecoration: "none", transition: "all .2s",
    fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400,
    color: active ? "var(--coral)" : "var(--txM)",
    background: active ? "var(--coralD)" : "transparent",
    cursor: "pointer",
  });

  return (
    <div className="dash-layout" style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside className="dash-sidebar" style={{
        width: 220, flexShrink: 0, display: "flex", flexDirection: "column",
        padding: "24px 16px", borderRight: "1px solid var(--bd)",
        background: "var(--sf)", position: "sticky", top: 0, height: "100vh",
        overflowY: "auto",
      }}>
        {/* Logo */}
        <a className="dash-logo" href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate("/"); }} style={{ textDecoration: "none", marginBottom: 8, padding: "0 16px", display: "block", textAlign: "left" }}>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic", fontSize: 24, color: "var(--tx)", fontWeight: 300 }}>
            T<span className="dash-logo-text">ome</span><span style={{ color: "var(--coral)" }}>.</span>
          </span>
        </a>

        {/* Main nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 24 }}>
          <a href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate("/"); }} style={sidebarLinkStyle(page === "projects" || page === "project")}>
            <ProjectsIcon /> <span>Projects</span>
          </a>
          <a href={`${BASE}/billing`} onClick={(e) => { e.preventDefault(); navigate("/billing"); }} style={sidebarLinkStyle(page === "billing")}>
            <BillingIcon /> <span>Billing</span>
          </a>
          <a href={`${BASE}/settings`} onClick={(e) => { e.preventDefault(); navigate("/settings"); }} style={sidebarLinkStyle(page === "settings")}>
            <SettingsIcon /> <span>Settings</span>
          </a>
        </nav>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--bd)", margin: "16px 0" }} />

        {/* External links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <a href="/docs/" style={{ ...sidebarLinkStyle(false), color: "var(--txM)" }}>
            <DocsIcon /> <span>Docs</span> <ExternalLinkIcon />
          </a>
          <a href="/" style={{ ...sidebarLinkStyle(false), color: "var(--txM)" }}>
            <HomeIcon /> <span>Home</span> <ExternalLinkIcon />
          </a>
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom: user + theme toggle */}
        <div className="dash-bottom" style={{ borderTop: "1px solid var(--bd)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <a href={`${BASE}/settings`} onClick={(e) => { e.preventDefault(); navigate("/settings"); }} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", padding: "0 4px" }}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid var(--bd)" }} />
            ) : (
              <div style={{
                width: 28, height: 28, borderRadius: "50%", background: "var(--coral)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#fff",
              }}>
                {(user.name || user.email).charAt(0).toUpperCase()}
              </div>
            )}
            <span className="dash-user-name" style={{ overflow: "hidden" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "var(--tx)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                {user.name || user.email}
              </span>
            </span>
          </a>
          <button
            onClick={() => setDark(!isDark)}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
              background: "none", border: "1px solid var(--bd)", borderRadius: 8,
              cursor: "pointer", color: "var(--txM)", fontFamily: "Inter, sans-serif",
              fontSize: 12, transition: "all .3s cubic-bezier(.34,1.56,.64,1)", width: "100%",
            }}
            aria-label="Toggle theme"
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--coral)"; e.currentTarget.style.color = "var(--coral)"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--bd)"; e.currentTarget.style.color = "var(--txM)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="dash-main" style={{ flex: 1, padding: "40px 48px", maxWidth: 1000, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}

// ── Getting Started Card ────────────────────────────────────

function GettingStartedCard() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Install Tome CLI",
      code: "npm install -g @tomehq/cli",
      description: "The CLI is your main tool for creating, developing, and deploying docs.",
    },
    {
      title: "Create a new project",
      code: "tome init my-docs\ncd my-docs",
      description: "Scaffolds a new documentation project with example pages.",
    },
    {
      title: "Start developing",
      code: "tome dev",
      description: "Opens a local dev server with hot reload at localhost:3000.",
    },
    {
      title: "Deploy to production",
      code: "tome login\ntome deploy",
      description: "Authenticate and deploy your docs to a global CDN.",
    },
  ];

  return (
    <div className="card rv" style={{ marginBottom: 32, padding: 32 }}>
      <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontStyle: "italic", fontSize: 22, color: "var(--tx)", marginBottom: 4 }}>
        Get started with Tome
      </h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--txM)", marginBottom: 24 }}>
        Deploy your first documentation site in under 5 minutes.
      </p>

      {/* Step indicators */}
      <div className="step-buttons" style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            style={{
              flex: 1, padding: "8px 12px", background: i === step ? "var(--coralD)" : "var(--cdBg)",
              border: i === step ? "1px solid var(--coral)" : "1px solid var(--bd)",
              cursor: "pointer", fontFamily: "Inter, sans-serif",
              fontSize: 11, fontWeight: 600, letterSpacing: ".5px", textTransform: "uppercase",
              color: i === step ? "var(--coral)" : "var(--txM)", transition: "all .2s",
            }}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--tx2)", marginBottom: 12 }}>
        {steps[step].description}
      </p>
      <div className="code-snippet">
        {steps[step].code.split("\n").map((line, i) => (
          <div key={i}>
            <span style={{ color: "var(--coral)", marginRight: 8 }}>$</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Projects Page ──────────────────────────────────────────

function ProjectsPage({ token }: { token: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(() => {
    setLoading(true);
    api<Project[]>("/api/deploy/projects", { token })
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  const deleteProject = async (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Delete "${slug}"? All deployments, files, and custom domains will be permanently removed.`)) return;
    try {
      await api(`/api/deploy/projects/${slug}`, { method: "DELETE", token });
      loadProjects();
    } catch {
      // silently fail
    }
  };

  return (
    <div className="rv">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontStyle: "italic", fontSize: 32, color: "var(--tx)", marginBottom: 8 }}>
            Your Projects
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)", maxWidth: 460 }}>
            Manage your documentation sites. Each project is deployed to a global CDN with instant updates.
          </p>
        </div>
      </div>

      {loading ? (
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)", animation: "pulse 2s infinite" }}>Loading projects…</p>
      ) : projects.length === 0 ? (
        <>
          <GettingStartedCard />
          <div className="card" style={{ textAlign: "center", padding: 48 }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic", fontSize: 20, color: "var(--tx)", marginBottom: 12 }}>No projects yet</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)" }}>
              Deploy your first docs site with <code style={{ fontFamily: '"Fira Code", monospace', background: "var(--cdBg)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>tome deploy</code>
            </p>
          </div>
        </>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {projects.map((p) => (
            <LiquidRing key={p.id} block radius={12} bg="var(--sf)">
              <a href={`${BASE}/project/${p.slug}`} onClick={(e) => { e.preventDefault(); navigate(`/project/${p.slug}`); }} style={{ textDecoration: "none", cursor: "pointer", display: "block", padding: 24, background: "var(--sf)", borderRadius: 12 }}>
                {/* Deployment Preview */}
                <div style={{
                  width: "100%", height: 160, borderRadius: 8, overflow: "hidden",
                  border: "1px solid var(--bd)", marginBottom: 16, position: "relative",
                  background: "var(--bgAlt, var(--cdBg))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {/* Branded placeholder */}
                  <span style={{
                    fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic",
                    fontSize: 36, color: "var(--txM)", fontWeight: 300, userSelect: "none",
                  }}>
                    T<span style={{ color: "var(--coral)" }}>.</span>
                  </span>
                  {/* Live preview overlay — hidden until successfully loaded */}
                  {p.url && (
                    <iframe
                      src={p.url}
                      title={`${p.slug} preview`}
                      style={{
                        position: "absolute", top: 0, left: 0,
                        width: "200%", height: "200%", border: "none",
                        transform: "scale(0.5)", transformOrigin: "top left",
                        pointerEvents: "none", opacity: 0, transition: "opacity 0.3s ease",
                      }}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                      tabIndex={-1}
                      onLoad={(e) => {
                        try {
                          const doc = (e.target as HTMLIFrameElement).contentDocument;
                          if (doc && doc.body && doc.body.innerHTML.length > 100) {
                            (e.target as HTMLIFrameElement).style.opacity = "1";
                          }
                        } catch {
                          // Cross-origin — assume loaded successfully
                          (e.target as HTMLIFrameElement).style.opacity = "1";
                        }
                      }}
                    />
                  )}
                </div>

                {/* Header: name + status */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontSize: 22, color: "var(--tx)" }}>{p.slug}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.5px",
                      padding: "3px 10px", borderRadius: 4,
                      background: p.deployStatus === "live" ? "rgba(21,128,61,0.1)" : p.deployStatus === "failed" ? "rgba(185,28,28,0.1)" : "var(--coralD)",
                      color: p.deployStatus === "live" ? "var(--green)" : p.deployStatus === "failed" ? "var(--red)" : "var(--txM)",
                    }}>
                      {p.deployStatus ?? "No deploys"}
                    </span>
                    <button
                      className="btn-ghost btn-sm"
                      style={{ color: "var(--red)", fontSize: 11, padding: "3px 10px", minHeight: 0, borderRadius: 4 }}
                      onClick={(e) => deleteProject(p.slug, e)}
                      title="Delete project"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Files</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "var(--tx)" }}>{p.fileCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Size</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "var(--tx)" }}>{formatBytes(p.totalSize)}</div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--bd)" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--txM)", display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    Last update: {timeAgo(p.lastDeployAt)}
                  </span>
                  <span className="action-link">
                    View Details <span style={{ fontSize: 16 }}>→</span>
                  </span>
                </div>
              </a>
            </LiquidRing>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Project Detail Page ────────────────────────────────────

function ProjectDetailPage({ slug, token }: { slug: string; token: string }) {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [domains, setDomains] = useState<DomainStatus[]>([]);
  const [newDomain, setNewDomain] = useState("");
  const [domainError, setDomainError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [deps, doms] = await Promise.all([
        api<Deployment[]>(`/api/deploy/projects/${slug}/deployments`, { token }),
        api<DomainStatus[]>("/api/domains", { token }).catch(() => [] as DomainStatus[]),
      ]);
      setDeployments(deps);
      setDomains(doms);
      api<AnalyticsSummary>(`/api/analytics/summary?siteId=${slug}&range=30`)
        .then(setAnalytics)
        .catch(() => setAnalytics(null));
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [slug, token]);

  useEffect(() => { loadData(); }, [loadData]);

  const addDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    // Strip protocol and trailing slashes from domain input
    const cleanDomain = newDomain.trim().replace(/^https?:\/\//, "").replace(/\/+$/, "");
    if (!cleanDomain) return;
    setDomainError(null);
    try {
      await api("/api/domains", { method: "POST", body: { domain: cleanDomain, projectSlug: slug }, token });
      setNewDomain("");
      loadData();
    } catch (err) {
      setDomainError(err instanceof Error ? err.message : "Failed to add domain");
    }
  };

  const removeDomain = async (domain: string) => {
    try {
      await api(`/api/domains/${domain}`, { method: "DELETE", token });
      loadData();
    } catch {
      // silently fail
    }
  };

  const deleteDeployment = async (deploymentId: string) => {
    if (!window.confirm("Delete this deployment? This cannot be undone.")) return;
    try {
      await api(`/api/deploy/projects/${slug}/deployments/${deploymentId}`, { method: "DELETE", token });
      loadData();
    } catch {
      // silently fail
    }
  };

  const deleteProject = async () => {
    if (!window.confirm(`Delete project "${slug}"? This will remove all deployments, files, and custom domains. This cannot be undone.`)) return;
    try {
      await api(`/api/deploy/projects/${slug}`, { method: "DELETE", token });
      navigate("/");
    } catch {
      // silently fail
    }
  };

  if (loading) {
    return <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)", animation: "pulse 2s infinite" }}>Loading…</p>;
  }

  const gridCols = "2fr 1fr 1fr 1fr 1.5fr auto";
  const activeDeployment = deployments.find((d) => d.status === "live");
  const latestDeployment = deployments[0];

  return (
    <div className="rv">
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontFamily: "Inter, sans-serif", fontSize: 13 }}>
        <a href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate("/"); }} style={{ color: "var(--txM)", textDecoration: "none", transition: "color .2s" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--coral)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--txM)")}>
          Projects
        </a>
        <span style={{ color: "var(--txM)" }}>›</span>
        <span style={{ color: "var(--tx)", fontWeight: 500 }}>{slug}</span>
      </div>

      {/* Project Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontSize: 42, color: "var(--tx)", marginBottom: 8, letterSpacing: "-0.02em" }}>
            {slug}
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {latestDeployment?.url && (
              <a
                href={latestDeployment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ whiteSpace: "nowrap", textDecoration: "none", padding: "10px 20px", fontSize: 13, display: "flex", alignItems: "center", gap: 8, borderRadius: 6 }}
              >
                Visit Site <ExternalLinkIcon />
              </a>
          )}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
        <LiquidRing block radius={12} bg="var(--sf)">
          <div style={{ textAlign: "left", padding: 24, background: "var(--sf)", borderRadius: 12 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Current Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: activeDeployment ? "var(--green)" : "var(--txM)" }} />
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontWeight: 400, color: "var(--tx)" }}>
                {activeDeployment ? "Live" : "Offline"}
              </span>
            </div>
          </div>
        </LiquidRing>
        <LiquidRing block radius={12} bg="var(--sf)">
          <div style={{ textAlign: "left", padding: 24, background: "var(--sf)", borderRadius: 12 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Total Assets</div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontWeight: 400, color: "var(--tx)" }}>
              {(latestDeployment?.fileCount ?? 0).toLocaleString()} <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)" }}>Files</span>
            </div>
          </div>
        </LiquidRing>
        <LiquidRing block radius={12} bg="var(--sf)">
          <div style={{ textAlign: "left", padding: 24, background: "var(--sf)", borderRadius: 12 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Total Size</div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontWeight: 400, color: "var(--tx)" }}>
              {formatBytes(latestDeployment?.totalSize ?? 0)}
            </div>
          </div>
        </LiquidRing>
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontStyle: "italic", fontSize: 24, color: "var(--tx)", marginBottom: 16 }}>Analytics</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 16 }}>
            <div className="stat-card" style={{ textAlign: "left", padding: 24 }}>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 300, color: "var(--tx)" }}>
                {analytics.totalPageViews.toLocaleString()}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 4 }}>Page Views</div>
            </div>
            <div className="stat-card" style={{ textAlign: "left", padding: 24 }}>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 300, color: "var(--tx)" }}>
                {analytics.uniqueVisitors.toLocaleString()}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 4 }}>Visitors</div>
            </div>
          </div>
          {analytics.topPages.length > 0 && (
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Top Pages</p>
              {analytics.topPages.slice(0, 5).map((p) => (
                <div key={p.url} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--bd)", fontFamily: "Inter, sans-serif", fontSize: 13 }}>
                  <span style={{ color: "var(--tx2)" }}>{p.url}</span>
                  <span style={{ color: "var(--txM)", fontFamily: '"Fira Code", monospace', fontSize: 12 }}>{p.views}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Deployments */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontStyle: "italic", fontSize: 24, color: "var(--tx)" }}>Deployments</h3>
        </div>
        {deployments.length === 0 ? (
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)" }}>No deployments yet.</p>
        ) : (
          <div className="deploy-table-wrap">
            <div className="table-header" style={{ gridTemplateColumns: gridCols }}>
              <span>Deployment ID</span><span>Status</span><span>Files</span><span>Size</span><span>Created</span><span>Action</span>
            </div>
            {deployments.map((d) => (
              <div key={d.id} className="table-row" style={{ gridTemplateColumns: gridCols }}>
                <span style={{ fontFamily: '"Fira Code", monospace', fontSize: 12, color: d.status === "live" ? "var(--coral)" : "var(--tx2)" }}>{d.id.slice(0, 12)}</span>
                <span>
                  <span style={{
                    fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: "0.3px",
                    padding: "3px 10px", borderRadius: 4,
                    background: d.status === "live" ? "rgba(21,128,61,0.1)" : d.status === "failed" ? "rgba(185,28,28,0.1)" : "var(--coralD)",
                    color: d.status === "live" ? "var(--green)" : d.status === "failed" ? "var(--red)" : "var(--txM)",
                  }}>
                    {d.status === "live" ? "LIVE" : d.status === "failed" ? "FAILED" : "SUPERSEDED"}
                  </span>
                </span>
                <span>{d.fileCount.toLocaleString()}</span>
                <span>{formatBytes(d.totalSize)}</span>
                <span>{timeAgo(d.createdAt)}</span>
                <span>
                  <button
                    className="btn-ghost btn-sm"
                    style={{ color: "var(--red)", fontSize: 11, padding: "4px 12px", minHeight: 0, borderRadius: 4 }}
                    onClick={() => deleteDeployment(d.id)}
                    title={d.id === activeDeployment?.id ? "Delete active deployment (site will go offline)" : "Delete deployment"}
                  >
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Domains */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontStyle: "italic", fontSize: 24, color: "var(--tx)", marginBottom: 16 }}>Custom Domains</h3>
        {domains.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            {domains.map((d) => (
              <div key={d.domain} className="card" style={{ marginBottom: 12, padding: 20 }}>
                <div className="dash-domain-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: d.dnsRecords.length > 0 ? 12 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={d.verified ? "var(--green)" : "var(--yellow)"} strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "var(--tx)" }}>{d.domain}</span>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: d.verified ? "var(--green)" : "var(--yellow)", marginTop: 2 }}>
                        {d.verified ? "Verified & Active" : "Pending Verification"}
                      </div>
                    </div>
                  </div>
                  <button className="btn-ghost btn-sm" onClick={() => removeDomain(d.domain)} style={{ padding: "4px 12px", borderRadius: 4, minHeight: 0 }}>
                    Remove
                  </button>
                </div>
                {d.dnsRecords.map((rec, i) => (
                  <div key={i} className="dns-record">
                    {rec.type} {rec.name} → {rec.value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Add domain form */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Add New Domain</div>
          <form onSubmit={addDomain} style={{ display: "flex", gap: 10 }}>
            <input
              className="input-field"
              placeholder="e.g. docs.example.com"
              aria-label="Custom domain"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="btn-primary" type="submit" style={{ padding: "10px 24px", fontSize: 13 }}>Add</button>
          </form>
          {domainError && (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--red)", marginTop: 8 }}>{domainError}</p>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ paddingTop: 24, borderTop: "1px solid var(--bd)" }}>
        <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontStyle: "italic", fontSize: 24, color: "var(--red)", marginBottom: 16 }}>Danger Zone</h3>
        <div className="card dash-danger-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderColor: "rgba(239,68,68,0.3)", padding: 20 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "var(--tx)", marginBottom: 4 }}>Delete this project</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--txM)" }}>Permanently removes all deployments, files, and custom domains.</p>
          </div>
          <button
            className="btn-ghost btn-sm"
            style={{ color: "var(--red)", borderColor: "rgba(239,68,68,0.4)", whiteSpace: "nowrap", minHeight: 0, borderRadius: 4 }}
            onClick={deleteProject}
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Billing Page ───────────────────────────────────────────

function BillingPage({ token, user }: { token: string; user: User }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const plan = PLANS[user.plan] ?? PLANS.community;

  // Check for checkout success/cancel in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      setSuccess("Subscription activated! Your plan will update shortly.");
      window.history.replaceState(null, "", `${BASE}/billing`);
    } else if (params.get("checkout") === "cancelled") {
      setError("Checkout was cancelled.");
      window.history.replaceState(null, "", `${BASE}/billing`);
    }
  }, []);

  const handleCheckout = async (planId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const successUrl = `${window.location.origin}${BASE}/billing?checkout=success`;
      const cancelUrl = `${window.location.origin}${BASE}/billing?checkout=cancelled`;
      const data = await api<{ url: string }>("/api/billing/checkout", {
        method: "POST",
        body: { planId, successUrl, cancelUrl },
        token,
      });
      if (!data.url) throw new Error("No checkout URL returned");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout. Please try again.");
      setLoading(false);
    }
  };

  const handlePortal = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await api<{ url: string }>("/api/billing/portal", {
        method: "POST",
        body: { returnUrl: window.location.href },
        token,
      });
      if (!data.url) throw new Error("No portal URL returned");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open billing portal. Please try again.");
      setLoading(false);
    }
  };

  // Find the next tier up from current plan
  const planKeys = Object.keys(PLANS);
  const currentIdx = planKeys.indexOf(user.plan);
  const nextPlanKey = currentIdx >= 0 && currentIdx < planKeys.length - 1 ? planKeys[currentIdx + 1] : null;
  const nextPlan = nextPlanKey ? PLANS[nextPlanKey] : null;

  return (
    <div className="rv">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontStyle: "italic", fontSize: 32, color: "var(--tx)", marginBottom: 8 }}>
          Billing & Subscription
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)" }}>
          Manage your subscription tier and billing from one central hub.
        </p>
      </div>

      {/* Alerts */}
      {success && (
        <div style={{ padding: "14px 18px", marginBottom: 20, background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--green)" }}>
          {success}
        </div>
      )}
      {error && (
        <div style={{ padding: "14px 18px", marginBottom: 20, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--red)" }}>
          {error}
        </div>
      )}

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, alignItems: "start" }}>
        {/* Left: Current Plan */}
        <LiquidRing block radius={12} bg="var(--sf)">
        <div style={{ padding: 28, background: "var(--sf)", borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.5px",
                padding: "4px 10px", borderRadius: 4,
                background: "rgba(21,128,61,0.1)", color: "var(--green)",
              }}>
                Active
              </span>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 500, color: "var(--tx)", marginTop: 12 }}>
                {plan.name}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 400, color: "var(--coral)" }}>{plan.price === "Free" ? "Free" : plan.price.replace("/mo", "")}</span>
                {plan.price !== "Free" && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--txM)" }}>/mo</span>}
              </div>
              {plan.price !== "Free" && <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--txM)", marginTop: 6 }}>Billed monthly</div>}
            </div>
          </div>

          {/* Features */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--txM)", marginBottom: 12 }}>
              Included Features
            </div>
            {plan.features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--tx2)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {f}
              </div>
            ))}
          </div>

          {/* Manage billing button for paid plans */}
          {user.plan !== "community" && (
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--bd)" }}>
              <button className="btn-ghost" onClick={handlePortal} disabled={loading} style={{ fontSize: 13, padding: "10px 20px", borderRadius: 6 }}>
                {loading ? "Redirecting..." : "Manage Billing →"}
              </button>
            </div>
          )}
        </div>
        </LiquidRing>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Upgrade card (if not on highest tier) */}
          {nextPlan && (
            <LiquidRing block radius={12} bg="var(--coral)" onAccent>
            <div className="card-accent" style={{ padding: 28, background: "var(--coral)", color: "#fff", borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, fontWeight: 500 }}>
                  {nextPlan.name}
                </span>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, opacity: 0.85, lineHeight: 1.5, marginBottom: 20 }}>
                Unlock more with {nextPlan.name}: {nextPlan.features.slice(0, 2).join(", ")}, and more.
              </p>
              <button
                onClick={() => handleCheckout(nextPlanKey!)}
                disabled={loading}
                className="btn-ghost btn-on-accent"
                style={{
                  width: "100%", padding: "12px 24px", color: "#fff",
                  borderColor: "rgba(255,255,255,0.4)", borderRadius: 6, fontSize: 14,
                }}
              >
                {loading ? "Redirecting..." : `Upgrade to ${nextPlan.name} · ${nextPlan.price}`}
              </button>
            </div>
            </LiquidRing>
          )}

          {/* All plans comparison */}
          <LiquidRing block radius={12} bg="var(--sf)">
          <div style={{ padding: 28, background: "var(--sf)", borderRadius: 12 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--txM)", marginBottom: 16 }}>
              All Plans
            </div>
            {Object.entries(PLANS).map(([key, p]) => (
              <div key={key} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 0", borderBottom: "1px solid var(--bd)",
              }}>
                <div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: key === user.plan ? "var(--coral)" : "var(--tx)" }}>
                    {p.name}
                  </span>
                  {key === user.plan && (
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "var(--coral)", marginLeft: 8 }}>Current</span>
                  )}
                </div>
                <span style={{ fontFamily: '"Fira Code", monospace', fontSize: 13, color: "var(--txM)" }}>
                  {p.price}
                </span>
              </div>
            ))}
          </div>
          </LiquidRing>

          {/* Billing support */}
          <LiquidRing block radius={12} bg="var(--sf)">
          <div style={{ padding: 20, display: "flex", alignItems: "center", gap: 14, background: "var(--sf)", borderRadius: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: "var(--coralD)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "var(--tx)" }}>Billing Support</div>
              <a href="mailto:support@tome.center" className="action-link">
                Contact support →
              </a>
            </div>
          </div>
          </LiquidRing>
        </div>
      </div>
    </div>
  );
}

// ── Settings Page ──────────────────────────────────────────

function SettingsPage({ user, token, onLogout }: { user: User; token: string; onLogout: () => void }) {
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const plan = PLANS[user.plan] ?? PLANS.community;

  const copyToken = () => {
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)",
    textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4,
  };

  const valueStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--tx)", fontWeight: 500,
  };

  return (
    <div className="rv">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontStyle: "italic", fontSize: 32, color: "var(--tx)", marginBottom: 8 }}>
          Account Settings
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)" }}>
          Manage your profile and developer credentials.
        </p>
      </div>

      {/* Two-column: Profile + API Token */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Profile Card */}
        <LiquidRing block radius={12} bg="var(--sf)">
        <div style={{ padding: 28, background: "var(--sf)", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" style={{ width: 64, height: 64, borderRadius: 12, border: "2px solid var(--bd)" }} />
            ) : (
              <div style={{
                width: 64, height: 64, borderRadius: 12, background: "var(--coralD)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 400, color: "var(--coral)",
                border: "2px solid var(--bd)",
              }}>
                {(user.name || user.email).charAt(0).toUpperCase()}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, fontWeight: 500, color: "var(--tx)" }}>
                  {user.name || user.email}
                </span>
                <span style={{
                  fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: "0.5px", padding: "4px 10px", borderRadius: 4,
                  background: "var(--coralD)", color: "var(--coral)", border: "1px solid var(--coral)",
                }}>
                  {plan.name}
                </span>
              </div>
              {user.name && (
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--txM)", marginTop: 4 }}>{user.email}</p>
              )}
            </div>
          </div>

          {/* Info grid */}
          <div className="dash-settings-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <div>
              <div style={labelStyle}>Email Address</div>
              <div style={valueStyle}>{user.email}</div>
            </div>
            <div>
              <div style={labelStyle}>Plan</div>
              <div style={valueStyle}>{plan.name} · {plan.price}</div>
            </div>
            <div>
              <div style={labelStyle}>Member Since</div>
              <div style={valueStyle}>{new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
            </div>
          </div>
        </div>
        </LiquidRing>

        {/* API Credentials Card */}
        <LiquidRing block radius={12} bg="var(--sf)">
        <div style={{ padding: 28, background: "var(--sf)", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--coral)" }}>
              API Credentials
            </span>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--txM)", marginBottom: 16, lineHeight: 1.5 }}>
            Use this token to authenticate your requests to the Tome API.
          </p>

          <div className="token-box" style={{ marginBottom: 8 }}>
            <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {showToken ? token : "•".repeat(32)}
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="nav-link" onClick={() => setShowToken(!showToken)} style={{ fontSize: 12, padding: "4px 8px" }}>
                {showToken ? "Hide" : "Show"}
              </button>
              <button className="nav-link" onClick={copyToken} style={{ fontSize: 12, padding: "4px 8px" }} aria-label="Copy API token">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--txM)", lineHeight: 1.5 }}>
            For security, never share your tokens in client-side code.
          </p>
        </div>
        </LiquidRing>
      </div>

      {/* Bottom row: Plan + Danger Zone */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Active Plan */}
        <LiquidRing block radius={12} bg="var(--coral)" onAccent>
        <div className="card-accent" style={{ padding: 28, background: "var(--coral)", color: "#fff", borderRadius: 12 }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", color: "rgba(255,255,255,0.9)", marginBottom: 8 }}>Active Plan</div>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 400, marginBottom: 4 }}>
            {plan.name}
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, opacity: 0.8 }}>
            {plan.price}
          </div>
          <a href={`${BASE}/billing`} onClick={(e) => { e.preventDefault(); navigate("/billing"); }} className="action-link-white">
            Manage plan →
          </a>
        </div>
        </LiquidRing>

        {/* Danger Zone */}
        <LiquidRing block radius={12} bg="var(--sf)">
        <div style={{ padding: 28, background: "var(--sf)", borderRadius: 12 }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--red)", marginBottom: 12 }}>
            Danger Zone
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--txM)", marginBottom: 16, lineHeight: 1.5 }}>
            Sign out of your account. Your projects and data will remain intact.
          </p>
          <button className="btn-ghost btn-danger" onClick={onLogout} style={{ padding: "8px 20px", fontSize: 13, borderRadius: 6 }}>
            Sign Out
          </button>
        </div>
        </LiquidRing>
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────

export function App() {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [isDark, setDark] = useState(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  const [route, setRoute] = useState(window.location.pathname || `${BASE}/`);

  // Listen for popstate (back/forward + navigate() calls)
  useEffect(() => {
    const onNav = () => setRoute(window.location.pathname || `${BASE}/`);
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  // Check for existing token on mount
  useEffect(() => {
    if (DEV_MOCK) {
      setAuth({ status: "logged_in", token: "mock", user: MOCK_USER });
      return;
    }
    const token = localStorage.getItem("tome_token");
    if (!token) {
      setAuth({ status: "logged_out" });
      return;
    }
    api<User>("/api/auth/me", { token })
      .then((user) => setAuth({ status: "logged_in", token, user }))
      .catch(() => {
        localStorage.removeItem("tome_token");
        setAuth({ status: "logged_out" });
      });
  }, []);

  // Apply theme
  const theme = isDark ? THEMES.dark : THEMES.light;
  useEffect(() => {
    const root = document.documentElement;
    for (const [key, val] of Object.entries(theme)) {
      root.style.setProperty(key, val);
    }
  }, [theme]);

  const handleLogin = useCallback((token: string, user: User) => {
    localStorage.setItem("tome_token", token);
    setAuth({ status: "logged_in", token, user });
    navigate("/");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tome_token");
    setAuth({ status: "logged_out" });
    navigate("/login");
  };

  // Loading state
  if (auth.status === "loading") {
    return (
      <>
        <style>{CSS}</style>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--txM)", animation: "pulse 2s infinite" }}>Loading…</p>
        </div>
      </>
    );
  }

  // Logged out
  if (auth.status === "logged_out") {
    return (
      <>
        <style>{CSS}</style>
        <LoginPage onLogin={handleLogin} />
      </>
    );
  }

  // Logged in — route to page
  const { page, params } = matchRoute(route);
  const { token, user } = auth;

  let content: React.ReactNode;
  switch (page) {
    case "project":
      content = <ProjectDetailPage slug={params.slug} token={token} />;
      break;
    case "billing":
      content = <BillingPage token={token} user={user} />;
      break;
    case "settings":
      content = <SettingsPage user={user} token={token} onLogout={handleLogout} />;
      break;
    default:
      content = <ProjectsPage token={token} />;
  }

  return (
    <>
      <style>{CSS}</style>
      <Shell user={user} isDark={isDark} setDark={setDark}>
        {content}
      </Shell>
    </>
  );
}
