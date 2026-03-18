import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";

// ── Editorial Brutalist Design ──────────────────────────
// Swiss poster meets literary magazine meets dev docs

// ── Icons ───────────────────────────────────────────────

const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// ── Theme tokens ────────────────────────────────────────

const THEMES = {
  dark: {
    "--bg": "#080c1f", "--sf": "#0e1333", "--sfH": "#141940",
    "--bd": "#1a2050", "--bdA": "#252d66",
    "--tx": "#e8e6f0", "--tx2": "#b5b1c8", "--txM": "#9490ae",
    "--coral": "#ff6b4a", "--coralBtn": "#bf3618", "--coralD": "rgba(255,107,74,0.1)", "--coralT": "#ff8a70",
    "--cdBg": "#0a0e27", "--cdTx": "#b8b4cc", "--cdBd": "#1a2050",
    "--sbBg": "#0a0e27", "--hdBg": "rgba(8,12,31,0.9)",
    "--glow1": "rgba(255,107,74,0.07)", "--glow2": "rgba(100,80,255,0.05)",
  },
  light: {
    "--bg": "#f6f4f0", "--sf": "#ffffff", "--sfH": "#eeece6",
    "--bd": "#ddd9d0", "--bdA": "#c8c3b8",
    "--tx": "#1a1716", "--tx2": "#4a443e", "--txM": "#5c5550",
    "--coral": "#a33520", "--coralBtn": "#a33520", "--coralD": "rgba(184,61,34,0.07)", "--coralT": "#9c3019",
    "--cdBg": "#edeae4", "--cdTx": "#3a3530", "--cdBd": "#ddd9d0",
    "--sbBg": "#f0ede8", "--hdBg": "rgba(246,244,240,0.92)",
    "--glow1": "rgba(217,74,43,0.04)", "--glow2": "rgba(100,80,180,0.03)",
  },
} as const;

// ── CSS ─────────────────────────────────────────────────

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
.rv4{animation-delay:.2s}.rv5{animation-delay:.25s}.rv6{animation-delay:.3s}
.rv7{animation-delay:.35s}.rv8{animation-delay:.4s}

.grain::before{
  content:"";position:fixed;inset:0;z-index:9999;pointer-events:none;
  opacity:.35;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-repeat:repeat;background-size:256px;
}

/* ── Hover interactions ───────────────────────────── */

.nav-link{transition:color .2s ease}
.nav-link:hover{color:var(--tx)!important}

.theme-toggle{transition:color .2s ease}
.theme-toggle:hover{color:var(--coral)!important}

.btn-primary{
  transition:background .2s ease,transform .15s ease,box-shadow .2s ease;
  position:relative;
}
.btn-primary:hover{
  background:var(--coralT)!important;
  transform:translateY(-1px);
  box-shadow:0 4px 20px rgba(255,107,74,0.25),0 0 40px rgba(255,107,74,0.08);
}
.btn-primary:active{transform:translateY(0)}

.btn-ghost{
  transition:border-color .2s ease,color .2s ease,transform .15s ease,background .2s ease;
}
.btn-ghost:hover{
  border-color:var(--bdA)!important;
  background:var(--sf)!important;
  transform:translateY(-1px);
  box-shadow:0 2px 12px rgba(255,107,74,0.06);
}
.btn-ghost:active{transform:translateY(0)}

.feature-card{
  transition:background .25s ease,border-left .2s ease;
  border-left:2px solid transparent;
}
.feature-card:hover{
  background:var(--sf)!important;
  border-left:2px solid var(--coral);
  box-shadow:inset 4px 0 12px rgba(255,107,74,0.06);
}
.feature-card:hover .feature-num{opacity:1!important}

.pricing-card{
  transition:background .25s ease,transform .2s ease;
}
.pricing-card:hover{
  background:var(--sf)!important;
  transform:translateY(-2px);
  box-shadow:0 6px 24px rgba(0,0,0,0.06);
}

.pricing-card-hl{
  transition:background .25s ease,transform .2s ease;
}
.pricing-card-hl:hover{
  transform:translateY(-2px);
  box-shadow:0 6px 28px rgba(255,107,74,0.12),0 0 40px rgba(255,107,74,0.05);
}

.pricing-btn{
  transition:border-color .2s ease,color .2s ease,background .2s ease;
}
.pricing-btn:hover{
  border-color:var(--coral)!important;
  color:var(--coral)!important;
}

.pricing-btn-primary{
  transition:background .2s ease,box-shadow .2s ease;
}
.pricing-btn-primary:hover{
  background:var(--coralT)!important;
  box-shadow:0 4px 20px rgba(255,107,74,0.25),0 0 30px rgba(255,107,74,0.08);
}

.footer-link{transition:color .2s ease}
.footer-link:hover{color:var(--coral)!important}

.copy-btn{transition:color .15s ease}
.copy-btn:hover{color:var(--coral)!important}

.install-box{transition:border-color .2s ease,box-shadow .2s ease}
.install-box:hover{border-color:var(--coral)!important;box-shadow:0 0 20px rgba(255,107,74,0.06)}
`;

// ── Feature data ────────────────────────────────────────

const FEATURES = [
  { num: "01", title: "Markdown & MDX", description: "Write docs in Markdown or MDX with full component support. Use custom React components inline with your prose." },
  { num: "02", title: "Full-Text Search", description: "Built-in Pagefind for instant client-side search. Upgrade to Algolia for advanced faceting and analytics." },
  { num: "03", title: "API Reference", description: "Auto-generate beautiful API docs from OpenAPI specs or TypeScript source files. Always in sync with your code." },
  { num: "04", title: "AI Chat Assistant", description: "Embed an AI-powered chat trained on your docs. Bring your own key -- supports OpenAI, Anthropic, and more." },
  { num: "05", title: "Multi-Version Docs", description: "Ship docs for multiple versions side by side. Readers can switch versions instantly with the built-in picker." },
  { num: "06", title: "Analytics & Custom Domains", description: "Track page views, search queries, and user journeys. Serve your docs on any custom domain with automatic TLS." },
] as const;

// ── Pricing data ────────────────────────────────────────

const PRICING_TIERS = [
  {
    name: "Community", price: "Free", period: "",
    features: ["Unlimited public docs", "Pagefind search", "Community support", "10 deployments / month"],
    highlighted: false,
  },
  {
    name: "Cloud", price: "$19.99", period: "/mo",
    features: ["Custom domain", "Algolia search", "Analytics", "Priority support", "Unlimited deployments"],
    highlighted: true,
  },
  {
    name: "Team", price: "$49.99", period: "/mo",
    features: ["Everything in Cloud", "Unlimited custom domains", "Team collaboration", "AI chat assistant", "SSO"],
    highlighted: false,
  },
] as const;

// ── Config code example ─────────────────────────────────

const CONFIG_CODE = `export default {
  name: "My Docs",
  logo: "./assets/logo.svg",
  theme: {
    accent: "#ff6b4a",
    mode: "auto",
  },
  sidebar: [
    { label: "Getting Started", path: "/start" },
    { label: "API Reference",   path: "/api"   },
    { label: "Guides",          path: "/guides" },
  ],
  search: { provider: "local" },
};`;

// ── Nav ─────────────────────────────────────────────────

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Nav({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  const navLinkStyle: React.CSSProperties = {
    color: "var(--txM)", textDecoration: "none", fontSize: 13,
    fontFamily: '"Bricolage Grotesque", sans-serif', cursor: "pointer",
    background: "none", border: "none", padding: 0,
  };

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 40px", maxWidth: 1300, margin: "0 auto",
      position: "sticky", top: 0, zIndex: 100,
      background: "var(--hdBg)", backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{
          fontFamily: '"Cormorant Garamond", serif', fontSize: 28,
          fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em",
        }}>
          Tome
        </span>
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--coral)", display: "inline-block", marginLeft: 2,
        }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <a className="nav-link" href="/docs" style={navLinkStyle}>
          Docs
        </a>
        <button className="nav-link" onClick={() => scrollTo("features")} style={navLinkStyle}>
          Features
        </button>
        <button className="nav-link" onClick={() => scrollTo("pricing")} style={navLinkStyle}>
          Pricing
        </button>
        <a className="nav-link" href="https://github.com/tomehq/tome" style={navLinkStyle}>
          GitHub
        </a>
        <button className="theme-toggle" onClick={toggle} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} style={{
          background: "none", border: "none", color: "var(--txM)",
          cursor: "pointer", display: "flex",
        }}>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}

// ── Hero ────────────────────────────────────────────────

function Hero() {
  return (
    <div style={{
      maxWidth: 900, margin: "0 auto", padding: "100px 40px 80px",
      position: "relative", zIndex: 10,
    }}>
      <div className="rv rv1" style={{
        fontFamily: '"Fira Code", monospace', fontSize: 11, fontWeight: 500,
        color: "var(--coral)", letterSpacing: ".15em", textTransform: "uppercase",
        marginBottom: 24,
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 24, height: 1, background: "var(--coral)", display: "inline-block" }} />
          OPEN SOURCE &middot; MIT LICENSED
        </span>
      </div>

      <h1 className="rv rv2" style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 300, fontStyle: "italic",
        lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 28,
      }}>
        Beautiful docs,<br />
        <span style={{ color: "var(--coral)", fontWeight: 600 }}>zero friction</span>
        <span style={{ color: "var(--coral)" }}>.</span>
      </h1>

      <p className="rv rv3" style={{
        fontSize: 17, color: "var(--tx2)", lineHeight: 1.75, maxWidth: 480, marginBottom: 44,
        fontFamily: '"Bricolage Grotesque", sans-serif',
      }}>
        An open-source documentation platform with Markdown, full-text search,
        API references, AI chat, and everything you need to ship world-class docs.
      </p>

      <div className="rv rv4" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <a className="btn-primary" href="/dashboard" style={{
          background: "var(--coralBtn)", color: "#fff", border: "none", borderRadius: 2,
          padding: "14px 32px", fontSize: 13, fontWeight: 600,
          fontFamily: '"Bricolage Grotesque", sans-serif', cursor: "pointer",
          letterSpacing: ".03em", textTransform: "uppercase", textDecoration: "none",
          display: "inline-flex", alignItems: "center",
        }}>
          Get Started
        </a>
        <a className="btn-ghost" href="https://github.com/tomehq/tome" style={{
          background: "transparent", color: "var(--tx)", border: "1px solid var(--bd)",
          borderRadius: 2, padding: "14px 32px", fontSize: 13, fontWeight: 500,
          fontFamily: '"Bricolage Grotesque", sans-serif', cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
          letterSpacing: ".02em",
        }}>
          <GitHubIcon /> Star on GitHub
        </a>
      </div>

      <div className="rv rv5 install-box" style={{
        display: "inline-flex", alignItems: "center", gap: 12, marginTop: 40,
        padding: "12px 20px", background: "var(--cdBg)", border: "1px solid var(--cdBd)",
        borderRadius: 2, fontFamily: '"Fira Code", monospace', fontSize: 13,
      }}>
        <span style={{ color: "var(--coral)", fontWeight: 600 }}>$</span>
        <span style={{ color: "var(--cdTx)" }}>npx create-tome my-docs</span>
        <span style={{ color: "var(--txM)", animation: "pulse 2s infinite" }}>{"\u2588"}</span>
      </div>
    </div>
  );
}

// ── Features ────────────────────────────────────────────

function Features() {
  return (
    <section id="features" style={{ maxWidth: 1100, margin: "40px auto 60px", padding: "0 40px" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 1, background: "var(--bd)",
      }}>
        {FEATURES.map((f, i) => (
          <div key={f.title} className={`rv rv${i + 2} feature-card`} style={{
            background: "var(--bg)", padding: "28px 30px", cursor: "default",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
              <span className="feature-num" style={{
                fontFamily: '"Cormorant Garamond", serif', fontSize: 28,
                fontWeight: 300, fontStyle: "italic", color: "var(--coral)", opacity: 0.75,
              }}>
                {f.num}
              </span>
              <span style={{
                fontWeight: 600, fontSize: 14, letterSpacing: ".01em",
                fontFamily: '"Bricolage Grotesque", sans-serif',
              }}>
                {f.title}
              </span>
            </div>
            <div style={{
              fontSize: 13, color: "var(--txM)", lineHeight: 1.55, paddingLeft: 40,
              fontFamily: '"Bricolage Grotesque", sans-serif',
            }}>
              {f.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Code Example ────────────────────────────────────────

function CodeExample() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    try { navigator.clipboard.writeText(CONFIG_CODE); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto 60px", padding: "0 40px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          fontFamily: '"Fira Code", monospace', fontSize: 10, color: "var(--coral)",
          letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 12,
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 20, height: 1, background: "var(--coral)" }} />
            CONFIGURATION
            <span style={{ width: 20, height: 1, background: "var(--coral)" }} />
          </span>
        </div>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif', fontSize: 42,
          fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.02em",
        }}>
          Up and running in minutes<span style={{ color: "var(--coral)" }}>.</span>
        </h2>
      </div>

      <div style={{
        maxWidth: 640, margin: "0 auto",
        border: "1px solid var(--cdBd)", borderRadius: 2, overflow: "hidden",
        background: "var(--cdBg)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "6px 14px", borderBottom: "1px solid var(--cdBd)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--coral)" }} />
            <span style={{
              fontFamily: '"Fira Code", monospace', fontSize: 10, fontWeight: 600,
              color: "var(--coral)", textTransform: "uppercase", letterSpacing: ".1em",
            }}>
              JS
            </span>
            <span style={{
              fontSize: 11, color: "var(--txM)",
              fontFamily: '"Bricolage Grotesque", sans-serif',
            }}>
              tome.config.js
            </span>
          </div>
          <button className="copy-btn" onClick={copy} style={{
            background: "none", border: "none", color: "var(--txM)",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
            fontSize: 10, fontFamily: '"Fira Code", monospace', letterSpacing: ".05em",
          }}>
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
        <pre style={{
          padding: "18px 20px", margin: 0, overflow: "auto",
          fontFamily: '"Fira Code", monospace', fontSize: 12.5,
          lineHeight: 1.7, color: "var(--cdTx)", tabSize: 2,
        }}>
          <code>{CONFIG_CODE}</code>
        </pre>
      </div>
    </section>
  );
}

// ── Pricing ─────────────────────────────────────────────

function Pricing() {
  return (
    <section id="pricing" style={{
      maxWidth: 800, margin: "60px auto 120px", padding: "0 40px", textAlign: "center",
    }}>
      <div style={{
        fontFamily: '"Fira Code", monospace', fontSize: 10, color: "var(--coral)",
        letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 12,
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 20, height: 1, background: "var(--coral)" }} />
          PRICING
          <span style={{ width: 20, height: 1, background: "var(--coral)" }} />
        </span>
      </div>
      <h2 style={{
        fontFamily: '"Cormorant Garamond", serif', fontSize: 42,
        fontWeight: 300, fontStyle: "italic", marginBottom: 40, letterSpacing: "-0.02em",
      }}>
        Simple, transparent pricing<span style={{ color: "var(--coral)" }}>.</span>
      </h2>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 1, background: "var(--bd)", border: "1px solid var(--bd)",
      }}>
        {PRICING_TIERS.map((tier) => (
          <div key={tier.name} className={tier.highlighted ? "pricing-card-hl" : "pricing-card"} style={{
            background: tier.highlighted ? "var(--coralD)" : "var(--bg)",
            padding: "32px 24px", textAlign: "left",
          }}>
            <div style={{
              fontFamily: '"Fira Code", monospace', fontSize: 10, fontWeight: 600,
              color: tier.highlighted ? "var(--coral)" : "var(--txM)",
              letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8,
            }}>
              {tier.name}
            </div>
            <div style={{
              fontFamily: '"Cormorant Garamond", serif', fontSize: 48,
              fontWeight: 300, fontStyle: "italic", lineHeight: 1, marginBottom: 4,
            }}>
              {tier.price}
              <span style={{
                fontSize: 14, fontFamily: '"Bricolage Grotesque", sans-serif',
                fontWeight: 400, color: "var(--tx2)", fontStyle: "normal",
              }}>
                {tier.period}
              </span>
            </div>
            <div style={{ borderTop: "1px solid var(--bd)", marginTop: 16, paddingTop: 16 }}>
              {tier.features.map((feature) => (
                <div key={feature} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 13, color: "var(--tx2)", marginBottom: 6,
                  fontFamily: '"Bricolage Grotesque", sans-serif',
                }}>
                  <span style={{
                    width: 4, height: 4, borderRadius: "50%",
                    background: "var(--coral)", flexShrink: 0,
                  }} />
                  {feature}
                </div>
              ))}
            </div>
            <a className={tier.highlighted ? "pricing-btn-primary" : "pricing-btn"} href="/dashboard" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: 20, padding: "10px 20px", borderRadius: 2,
              fontSize: 12, fontWeight: 600, textDecoration: "none",
              fontFamily: '"Bricolage Grotesque", sans-serif',
              letterSpacing: ".03em", textTransform: "uppercase",
              background: tier.highlighted ? "var(--coralBtn)" : "transparent",
              color: tier.highlighted ? "#fff" : "var(--tx2)",
              border: tier.highlighted ? "none" : "1px solid var(--bd)",
            }}>
              {tier.name === "Community" ? "Get Started" : "Start Free Trial"}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────

function Footer() {
  const linkStyle: React.CSSProperties = {
    color: "var(--txM)", textDecoration: "none", fontSize: 13,
    fontFamily: '"Bricolage Grotesque", sans-serif',
  };

  return (
    <footer style={{
      borderTop: "1px solid var(--bd)", paddingTop: 40, paddingBottom: 40,
      marginTop: 40,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 40px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
      }}>
        <div style={{ display: "flex", gap: 24 }}>
          <a className="footer-link" href="https://github.com/tomehq/tome" style={linkStyle}>GitHub</a>
          <a className="footer-link" href="/docs" style={linkStyle}>Documentation</a>
          <a className="footer-link" href="https://x.com/vec0zy" style={linkStyle}>Contact</a>
        </div>
        <p style={{
          fontSize: 12, color: "var(--txM)",
          fontFamily: '"Bricolage Grotesque", sans-serif',
          margin: 0,
        }}>
          Built with Tome
        </p>
      </div>
    </footer>
  );
}

// ── App ─────────────────────────────────────────────────

export function App() {
  const [isDark, setDark] = useState(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  const theme = isDark ? THEMES.dark : THEMES.light;
  const toggle = () => setDark((d) => !d);

  return (
    <div style={{
      ...theme as React.CSSProperties,
      color: "var(--tx)", background: "var(--bg)",
      fontFamily: '"Bricolage Grotesque", sans-serif',
      minHeight: "100vh",
    }}>
      <style>{CSS}</style>
      <div className="grain" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        {/* Geometric accents */}
        <div style={{
          position: "absolute", top: 80, right: "8%", width: 300, height: 300,
          border: "1px solid var(--bd)", borderRadius: "50%", opacity: 0.3, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 160, right: "12%", width: 180, height: 180,
          border: "1px solid var(--coral)", borderRadius: "50%", opacity: 0.12, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -60, width: 500, height: 500,
          background: "radial-gradient(circle, var(--glow2), transparent 70%)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: -100, right: -100, width: 600, height: 600,
          background: "radial-gradient(circle, var(--glow1), transparent 60%)", pointerEvents: "none",
        }} />

        <Nav isDark={isDark} toggle={toggle} />
        <main>
          <Hero />
          <Features />
          <CodeExample />
          <Pricing />
        </main>
        <Footer />
      </div>
      <Analytics />
    </div>
  );
}
