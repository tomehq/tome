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
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ── Theme tokens ───────────────────────────────────────────

const THEMES = {
  dark: {
    "--bg": "#080c1f", "--sf": "#0e1333", "--sfH": "#141940",
    "--bd": "#1a2050", "--bdA": "#252d66",
    "--tx": "#e8e6f0", "--tx2": "#b5b1c8", "--txM": "#9490ae",
    "--coral": "#ff6b4a", "--coralD": "rgba(255,107,74,0.1)", "--coralT": "#ff8a70",
    "--coralBtn": "#c0402a",
    "--green": "#22c55e", "--yellow": "#eab308", "--red": "#f87171",
    "--cdBg": "#0a0e27", "--cdTx": "#b8b4cc", "--cdBd": "#1a2050",
  },
  light: {
    "--bg": "#f6f4f0", "--sf": "#ffffff", "--sfH": "#eeece6",
    "--bd": "#ddd9d0", "--bdA": "#c8c3b8",
    "--tx": "#1a1716", "--tx2": "#4a443e", "--txM": "#706960",
    "--coral": "#a33520", "--coralD": "rgba(184,61,34,0.07)", "--coralT": "#8a2c18",
    "--coralBtn": "#a33520",
    "--green": "#15803d", "--yellow": "#a16207", "--red": "#b91c1c",
    "--cdBg": "#edeae4", "--cdTx": "#3a3530", "--cdBd": "#ddd9d0",
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
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Fira+Code:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

@keyframes revealUp{
  from{opacity:0;transform:translateY(16px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

.rv{animation:revealUp .5s cubic-bezier(.22,1,.36,1) both}
.rv1{animation-delay:.05s}.rv2{animation-delay:.1s}.rv3{animation-delay:.15s}
.rv4{animation-delay:.2s}.rv5{animation-delay:.25s}

.input-field{
  width:100%;padding:10px 14px;background:var(--sf);color:var(--tx);
  border:1px solid var(--bd);font-family:"Bricolage Grotesque",sans-serif;
  font-size:14px;outline:none;transition:border-color .2s;
}
.input-field:focus{border-color:var(--coral)}
.input-field::placeholder{color:var(--txM)}

.btn-primary{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:10px 24px;background:var(--coralBtn);color:#fff;border:none;
  font-family:"Bricolage Grotesque",sans-serif;font-size:13px;
  font-weight:600;letter-spacing:.5px;text-transform:uppercase;
  cursor:pointer;transition:all .2s cubic-bezier(.22,1,.36,1);
  text-decoration:none;
}
.btn-primary:hover{background:var(--coralT);transform:translateY(-1px);box-shadow:0 4px 20px rgba(255,107,74,0.25)}
.btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}

.btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:10px 24px;background:transparent;color:var(--tx);
  border:1px solid var(--bd);font-family:"Bricolage Grotesque",sans-serif;
  font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;
  text-decoration:none;
}
.btn-ghost:hover{border-color:var(--coral);color:var(--coral)}

.btn-sm{padding:6px 14px;font-size:12px}

.btn-oauth{
  display:flex;align-items:center;justify-content:center;gap:10px;
  width:100%;padding:11px 16px;background:var(--sf);color:var(--tx);
  border:1px solid var(--bd);font-family:"Bricolage Grotesque",sans-serif;
  font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;
  text-decoration:none;
}
.btn-oauth:hover{border-color:var(--coral);background:var(--sfH)}

.nav-link{
  color:var(--txM);text-decoration:none;font-size:13px;
  font-family:"Bricolage Grotesque",sans-serif;
  transition:color .2s;cursor:pointer;background:none;border:none;
}
.nav-link:hover{color:var(--coral)}
.nav-link[data-active="true"]{color:var(--coral)}

.status-live{color:var(--green)}
.status-uploading{color:var(--yellow)}
.status-failed{color:var(--red)}

.card{
  background:var(--sf);border:1px solid var(--bd);padding:24px;
  transition:all .25s cubic-bezier(.22,1,.36,1);
}
.card:hover{border-color:var(--bdA);background:var(--sfH)}

.stat-card{
  background:var(--sf);border:1px solid var(--bd);padding:20px;
  text-align:center;
}

.token-box{
  background:var(--cdBg);border:1px solid var(--cdBd);padding:12px 16px;
  font-family:"Fira Code",monospace;font-size:13px;color:var(--cdTx);
  display:flex;align-items:center;gap:12px;
}

.dns-record{
  background:var(--cdBg);border:1px solid var(--cdBd);padding:10px 14px;
  font-family:"Fira Code",monospace;font-size:12px;color:var(--cdTx);
  margin:4px 0;
}

.section-title{
  font-family:"Cormorant Garamond",serif;font-weight:400;font-style:italic;
  font-size:24px;color:var(--tx);margin-bottom:16px;
}

.table-header{
  display:grid;padding:8px 0;border-bottom:1px solid var(--bd);
  font-size:11px;text-transform:uppercase;letter-spacing:1px;
  font-family:"Bricolage Grotesque",sans-serif;color:var(--txM);font-weight:600;
}
.table-row{
  display:grid;padding:12px 0;border-bottom:1px solid var(--bd);
  font-size:13px;font-family:"Bricolage Grotesque",sans-serif;color:var(--tx2);
  align-items:center;
}
.table-row:hover{background:var(--coralD)}

.divider-text{
  display:flex;align-items:center;gap:12px;margin:16px 0;
  font-family:"Bricolage Grotesque",sans-serif;font-size:11px;
  color:var(--txM);text-transform:uppercase;letter-spacing:1px;
}
.divider-text::before,.divider-text::after{
  content:"";flex:1;height:1px;background:var(--bd);
}

.code-snippet{
  background:var(--cdBg);border:1px solid var(--cdBd);padding:14px 16px;
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
@media (max-width: 767px) {
  /* Header */
  .dash-header { padding: 0 12px !important; height: 48px !important; }
  .dash-header-left { gap: 12px !important; }
  .dash-nav { gap: 12px !important; }
  .dash-nav .nav-link { font-size: 12px !important; }
  .dash-header-right .nav-link-external { display: none !important; }
  .dash-header-right .dash-separator { display: none !important; }
  .dash-header-right .dash-user-name { display: none !important; }
  .dash-header-right { gap: 8px !important; }

  /* Main content */
  .dash-main { padding: 24px 16px !important; }
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
          <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 14, color: "var(--txM)", marginTop: 24, animation: "pulse 2s infinite" }}>
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
        <div style={{ border: "1px solid var(--bd)", background: "var(--sf)", padding: 32 }}>
          <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--txM)", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>
            Sign in to your account
          </p>

          {error && (
            <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--red)", marginBottom: 16 }}>{error}</p>
          )}

          {/* OAuth Providers */}
          {!providersLoaded ? (
            <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--txM)", textAlign: "center", padding: "16px 0", animation: "pulse 2s infinite" }}>
              Loading…
            </p>
          ) : providers.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {providers.map((p) => (
                <a key={p.id} href={p.authorizeUrl} className="btn-oauth">
                  {p.id === "github" && <GitHubIcon />}
                  {p.id === "google" && <GoogleIcon />}
                  Continue with {p.name}
                </a>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--txM)", textAlign: "center", padding: "16px 0" }}>
              No sign-in providers available. Please contact the administrator.
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, padding: "0 4px" }}>
          <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 12, color: "var(--txM)" }}>
            No account? One will be created automatically.
          </p>
          <a href="/" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 12, color: "var(--txM)", textDecoration: "none", transition: "color .2s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "var(--coral)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "var(--txM)")}>
            &larr; Home
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Shell (nav bar) ────────────────────────────────────────

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

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header className="dash-header" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 56, borderBottom: "1px solid var(--bd)",
        background: "var(--sf)", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div className="dash-header-left" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate("/"); }} style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic", fontSize: 22, color: "var(--tx)", fontWeight: 300 }}>
              Tome<span style={{ color: "var(--coral)" }}>.</span>
            </span>
          </a>
          <nav className="dash-nav" style={{ display: "flex", gap: 20 }}>
            <a className="nav-link" href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate("/"); }} data-active={page === "projects"}>Projects</a>
            <a className="nav-link" href={`${BASE}/billing`} onClick={(e) => { e.preventDefault(); navigate("/billing"); }} data-active={page === "billing"}>Billing</a>
            <a className="nav-link" href={`${BASE}/settings`} onClick={(e) => { e.preventDefault(); navigate("/settings"); }} data-active={page === "settings"}>Settings</a>
          </nav>
        </div>
        <div className="dash-header-right" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/docs/" className="nav-link nav-link-external" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            Docs <ExternalLinkIcon />
          </a>
          <a href="/" className="nav-link nav-link-external" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            Home <ExternalLinkIcon />
          </a>
          <span className="dash-separator" style={{ width: 1, height: 20, background: "var(--bd)" }} />
          <a href={`${BASE}/settings`} onClick={(e) => { e.preventDefault(); navigate("/settings"); }} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid var(--bd)" }}
              />
            ) : (
              <div style={{
                width: 24, height: 24, borderRadius: "50%", background: "var(--coral)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 11, fontWeight: 600, color: "#fff",
              }}>
                {(user.name || user.email).charAt(0).toUpperCase()}
              </div>
            )}
            <span className="dash-user-name" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 12, color: "var(--txM)" }}>
              {user.name || user.email}
            </span>
          </a>
          <button
            onClick={() => setDark(!isDark)}
            style={{ background: "none", border: "1px solid var(--bd)", padding: "6px 8px", cursor: "pointer", color: "var(--txM)", display: "flex", alignItems: "center", transition: "border-color .2s" }}
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>
      <main className="dash-main" style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>
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
      <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--txM)", marginBottom: 24 }}>
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
              cursor: "pointer", fontFamily: '"Bricolage Grotesque", sans-serif',
              fontSize: 11, fontWeight: 600, letterSpacing: ".5px", textTransform: "uppercase",
              color: i === step ? "var(--coral)" : "var(--txM)", transition: "all .2s",
            }}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--tx2)", marginBottom: 12 }}>
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
      <h2 className="section-title">Your Projects</h2>
      {loading ? (
        <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 14, color: "var(--txM)", animation: "pulse 2s infinite" }}>Loading projects…</p>
      ) : projects.length === 0 ? (
        <>
          <GettingStartedCard />
          <div className="card" style={{ textAlign: "center", padding: 48 }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic", fontSize: 20, color: "var(--tx)", marginBottom: 12 }}>No projects yet</p>
            <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--txM)" }}>
              Deploy your first docs site with <code style={{ fontFamily: '"Fira Code", monospace', background: "var(--cdBg)", padding: "2px 6px", fontSize: 12 }}>tome deploy</code>
            </p>
          </div>
        </>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {projects.map((p) => (
            <a key={p.id} href={`${BASE}/project/${p.slug}`} onClick={(e) => { e.preventDefault(); navigate(`/project/${p.slug}`); }} className="card" style={{ textDecoration: "none", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 600, fontSize: 15, color: "var(--tx)" }}>{p.slug}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className={`status-${p.deployStatus ?? "none"}`} style={{ fontFamily: '"Fira Code", monospace', fontSize: 11, textTransform: "uppercase" }}>
                    {p.deployStatus ?? "No deploys"}
                  </span>
                  <button
                    className="btn-ghost btn-sm"
                    style={{ color: "var(--red)", fontSize: 11, padding: "4px 10px", minHeight: 24, minWidth: 24 }}
                    onClick={(e) => deleteProject(p.slug, e)}
                    title="Delete project"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 12, color: "var(--txM)" }}>
                <span>{p.fileCount} files</span>
                <span>{formatBytes(p.totalSize)}</span>
                <span>{timeAgo(p.lastDeployAt)}</span>
              </div>
            </a>
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
    return <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 14, color: "var(--txM)", animation: "pulse 2s infinite" }}>Loading…</p>;
  }

  const gridCols = "2fr 1fr 1fr 1fr 1.5fr auto";
  const activeDeploymentId = deployments.find((d) => d.status === "live")?.id;

  return (
    <div className="rv">
      <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 16 }}>
        <a href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate("/"); }} className="nav-link" style={{ fontSize: 12 }}>&larr; Back</a>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontStyle: "italic", fontSize: 28, color: "var(--tx)" }}>
          {slug}
        </h2>
      </div>

      {/* Quick Actions */}
      <div className="dash-quick-actions" style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        <div className="code-snippet" style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--coral)" }}>$</span>
          <span>cd your-project && tome deploy</span>
        </div>
        {deployments.length > 0 && deployments[0].url && (
          <a
            href={deployments[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-sm"
            style={{ whiteSpace: "nowrap", textDecoration: "none" }}
          >
            Visit Site <ExternalLinkIcon />
          </a>
        )}
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div style={{ marginBottom: 40 }}>
          <h3 className="section-title" style={{ fontSize: 20 }}>Analytics</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 16 }}>
            <div className="stat-card">
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 300, color: "var(--tx)" }}>
                {analytics.totalPageViews.toLocaleString()}
              </div>
              <div style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: 1 }}>Page Views</div>
            </div>
            <div className="stat-card">
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 300, color: "var(--tx)" }}>
                {analytics.uniqueVisitors.toLocaleString()}
              </div>
              <div style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: 1 }}>Visitors</div>
            </div>
          </div>
          {analytics.topPages.length > 0 && (
            <div>
              <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Top Pages</p>
              {analytics.topPages.slice(0, 5).map((p) => (
                <div key={p.url} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--bd)", fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13 }}>
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
        <h3 className="section-title" style={{ fontSize: 20 }}>Deployments</h3>
        {deployments.length === 0 ? (
          <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--txM)" }}>No deployments yet.</p>
        ) : (
          <div className="deploy-table-wrap">
            <div className="table-header" style={{ gridTemplateColumns: gridCols }}>
              <span>ID</span><span>Status</span><span>Files</span><span>Size</span><span>Created</span><span></span>
            </div>
            {deployments.map((d) => (
              <div key={d.id} className="table-row" style={{ gridTemplateColumns: gridCols }}>
                <span style={{ fontFamily: '"Fira Code", monospace', fontSize: 12 }}>{d.id.slice(0, 8)}</span>
                <span className={`status-${d.status}`} style={{ fontFamily: '"Fira Code", monospace', fontSize: 12, textTransform: "uppercase" }}>{d.status}</span>
                <span>{d.fileCount}</span>
                <span>{formatBytes(d.totalSize)}</span>
                <span>{timeAgo(d.createdAt)}</span>
                <span>
                  <button
                    className="btn-ghost btn-sm"
                    style={{ color: "var(--red)", fontSize: 11, padding: "4px 10px", minHeight: 24, minWidth: 24 }}
                    onClick={() => deleteDeployment(d.id)}
                    title={d.id === activeDeploymentId ? "Delete active deployment (site will go offline)" : "Delete deployment"}
                  >
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Domains */}
      <div>
        <h3 className="section-title" style={{ fontSize: 20 }}>Custom Domains</h3>
        {domains.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            {domains.map((d) => (
              <div key={d.domain} className="card" style={{ marginBottom: 12 }}>
                <div className="dash-domain-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 600, fontSize: 14, color: "var(--tx)" }}>{d.domain}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: '"Fira Code", monospace', fontSize: 11, color: d.verified ? "var(--green)" : "var(--yellow)" }}>
                      {d.verified ? "VERIFIED" : "PENDING"}
                    </span>
                    <button className="btn-ghost btn-sm" onClick={() => removeDomain(d.domain)}>Remove</button>
                  </div>
                </div>
                {d.dnsRecords.map((rec, i) => (
                  <div key={i} className="dns-record">
                    {rec.type} {rec.name} &rarr; {rec.value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <form onSubmit={addDomain} style={{ display: "flex", gap: 8 }}>
          <input
            className="input-field"
            placeholder="docs.example.com"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="btn-primary btn-sm" type="submit">Add Domain</button>
        </form>
        {domainError && (
          <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--red)", marginTop: 8 }}>{domainError}</p>
        )}
      </div>

      {/* Danger Zone */}
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--bd)" }}>
        <h3 className="section-title" style={{ fontSize: 20, color: "var(--red)" }}>Danger Zone</h3>
        <div className="card dash-danger-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderColor: "rgba(239,68,68,0.3)" }}>
          <div>
            <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 600, fontSize: 14, color: "var(--tx)", marginBottom: 4 }}>Delete this project</p>
            <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 12, color: "var(--txM)" }}>Permanently removes all deployments, files, and custom domains.</p>
          </div>
          <button
            className="btn-ghost btn-sm"
            style={{ color: "var(--red)", borderColor: "rgba(239,68,68,0.4)", whiteSpace: "nowrap", minHeight: 24 }}
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

  return (
    <div className="rv">
      <h2 className="section-title">Billing</h2>
      {success && (
        <div style={{ padding: "12px 16px", marginBottom: 16, background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.3)", fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--green)" }}>
          {success}
        </div>
      )}
      {error && (
        <div style={{ padding: "12px 16px", marginBottom: 16, background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--red)" }}>
          {error}
        </div>
      )}
      <div className="card" style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Current Plan</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, fontWeight: 300, color: "var(--tx)" }}>{plan.name}</span>
          <span style={{ fontFamily: '"Fira Code", monospace', fontSize: 14, color: "var(--coral)" }}>{plan.price}</span>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {plan.features.map((f) => (
            <li key={f} style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13, color: "var(--tx2)", padding: "4px 0", borderBottom: "1px solid var(--bd)" }}>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {user.plan === "community" && (
          <>
            <div className="upgrade-wrap">
              <button className="btn-primary" onClick={() => handleCheckout("cloud")} disabled={loading}>
                {loading ? "Redirecting..." : "Upgrade to Cloud"}
              </button>
              <div className="upgrade-tooltip">
                <div style={{ fontWeight: 600, color: "var(--tx)", marginBottom: 6, fontSize: 11, textTransform: "uppercase", letterSpacing: ".5px" }}>Everything on Community, plus:</div>
                <div>Custom domain</div>
                <div>Algolia search</div>
                <div>Analytics dashboard</div>
                <div>Priority support</div>
                <div>Unlimited deployments</div>
                <div style={{ marginTop: 8, fontFamily: '"Fira Code", monospace', fontSize: 11, color: "var(--coral)" }}>$19.99/mo</div>
              </div>
            </div>
            <div className="upgrade-wrap">
              <button className="btn-ghost" onClick={() => handleCheckout("team")} disabled={loading}>
                {loading ? "Redirecting..." : "Upgrade to Team"}
              </button>
              <div className="upgrade-tooltip">
                <div style={{ fontWeight: 600, color: "var(--tx)", marginBottom: 6, fontSize: 11, textTransform: "uppercase", letterSpacing: ".5px" }}>Everything on Cloud, plus:</div>
                <div>Unlimited custom domains</div>
                <div>Team collaboration</div>
                <div>AI chat assistant</div>
                <div>SSO</div>
                <div>Unlimited team members</div>
                <div style={{ marginTop: 8, fontFamily: '"Fira Code", monospace', fontSize: 11, color: "var(--coral)" }}>$49.99/mo</div>
              </div>
            </div>
          </>
        )}
        {user.plan !== "community" && (
          <button className="btn-ghost" onClick={handlePortal} disabled={loading}>
            {loading ? "Redirecting..." : "Manage Billing"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Settings Page ──────────────────────────────────────────

function SettingsPage({ user, token, onLogout }: { user: User; token: string; onLogout: () => void }) {
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rv">
      <h2 className="section-title">Settings</h2>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid var(--bd)" }}
            />
          ) : (
            <div style={{
              width: 56, height: 56, borderRadius: "50%", background: "var(--coral)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontWeight: 300, color: "#fff",
            }}>
              {(user.name || user.email).charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 16, fontWeight: 600, color: "var(--tx)" }}>
              {user.name || user.email}
            </p>
            <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 12, color: "var(--txM)" }}>
              {user.name ? user.email : ""}
            </p>
          </div>
        </div>
        <div className="dash-settings-grid" style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "8px 16px", fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 13 }}>
          <span style={{ color: "var(--txM)" }}>Email</span>
          <span style={{ color: "var(--tx)" }}>{user.email}</span>
          {user.name && <>
            <span style={{ color: "var(--txM)" }}>Name</span>
            <span style={{ color: "var(--tx)" }}>{user.name}</span>
          </>}
          <span style={{ color: "var(--txM)" }}>Plan</span>
          <span style={{ color: "var(--tx)" }}>{(PLANS[user.plan] ?? PLANS.community).name}</span>
          <span style={{ color: "var(--txM)" }}>Member since</span>
          <span style={{ color: "var(--tx)" }}>{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 11, color: "var(--txM)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>API Token</p>
        <div className="token-box">
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {showToken ? token : "\u2022".repeat(32)}
          </span>
          <button className="nav-link" onClick={() => setShowToken(!showToken)} style={{ fontSize: 12 }}>
            {showToken ? "Hide" : "Show"}
          </button>
          <button className="nav-link" onClick={copyToken} style={{ fontSize: 12 }}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 12, color: "var(--txM)", marginTop: 8 }}>
          Use this token with <code style={{ fontFamily: '"Fira Code", monospace', background: "var(--cdBg)", padding: "2px 6px", fontSize: 11 }}>tome login</code>
        </p>
      </div>

      <button className="btn-ghost" onClick={onLogout}>Sign Out</button>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────

export function App() {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [isDark, setDark] = useState(true);
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
          <p style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontSize: 14, color: "var(--txM)", animation: "pulse 2s infinite" }}>Loading…</p>
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
