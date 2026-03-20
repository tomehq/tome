import React, { useState, useEffect, useRef, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";

// ── Tome Landing Page ───────────────────────────────────
// Full-page section transitions on scroll

// ── Icons ───────────────────────────────────────────────

const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10" fill="var(--accentFaint)" stroke="none" />
    <path d="M8 12.5L11 15.5L16 9.5" />
  </svg>
);

const CheckIconWhite = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" stroke="none" />
    <path d="M8 12.5L11 15.5L16 9.5" />
  </svg>
);

const CiCdIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
    <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CodeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

// ── Config code example ─────────────────────────────────

const CONFIG_CODE = `export default {
  name: "My Docs",
  logo: "./assets/logo.svg",
  theme: {
    accent: "#8b3a2f",
    preset: "editorial",
  },
  sidebar: [
    { label: "Getting Started", path: "/start" },
    { label: "API Reference",   path: "/api"   },
    { label: "Guides",          path: "/guides" },
  ],
  search: { provider: "local" },
};`;

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

// ── Liquid border ring component ─────────────────────────
// Wrapper that shows a spinning gradient border on hover

function LiquidRing({ children, color = "var(--accent)", bg, radius = 6, block, style, darkRing }: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  radius?: number;
  block?: boolean;
  style?: React.CSSProperties;
  darkRing?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Tag = block ? "div" : "span";
  const InnerTag = block ? "div" : "span";

  const hotspot = darkRing ? "#888888" : "#ffffff";
  const base = darkRing ? "#1a1a1a" : color;

  const gradient = `conic-gradient(
    from 0deg,
    transparent 0%,
    ${base} 10%,
    transparent 20%,
    transparent 30%,
    ${base} 40%,
    ${hotspot} 44%,
    ${base} 48%,
    transparent 58%,
    transparent 68%,
    ${base} 78%,
    ${hotspot} 82%,
    ${base} 86%,
    transparent 96%,
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
        ...style,
      }}
    >
      <InnerTag style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: block ? "150%" : "150%",
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
        background: color,
        filter: "blur(8px)",
        opacity: hovered ? 0.15 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />
      <InnerTag style={{ position: "relative", zIndex: 2, display: block ? "block" : "inline-flex", borderRadius: radius, overflow: "hidden", background: bg ?? "transparent", ...(block ? { height: "100%" } : {}) }}>
        {children}
      </InnerTag>
    </Tag>
  );
}

// ── Theme tokens ────────────────────────────────────────

const THEMES = {
  light: {
    "--bg": "#f5f2ed", "--bgAlt": "#edeae4", "--sf": "#ffffff",
    "--bd": "#ddd9d0", "--bdLight": "#e8e4dc",
    "--tx": "#1a1716", "--tx2": "#4a443e", "--txM": "#8a847c",
    "--accent": "#8b3a2f", "--accentLight": "#a34838",
    "--accentFaint": "rgba(139,58,47,0.08)", "--accentGlow": "rgba(139,58,47,0.25)",
    "--hdBg": "rgba(245,242,237,0.92)",
    "--shadowColor": "rgba(0,0,0,0.12)", "--shadowColorLight": "rgba(0,0,0,0.06)",
    "--shadowHeavy": "rgba(0,0,0,0.2)",
  },
  dark: {
    "--bg": "#080c1f", "--bgAlt": "#0e1333", "--sf": "#0e1333",
    "--bd": "#1a2050", "--bdLight": "#252d66",
    "--tx": "#e8e6f0", "--tx2": "#b5b1c8", "--txM": "#9490ae",
    "--accent": "#ff6b4a", "--accentLight": "#ff8a70",
    "--accentFaint": "rgba(255,107,74,0.1)", "--accentGlow": "rgba(255,107,74,0.3)",
    "--hdBg": "rgba(8,12,31,0.92)",
    "--shadowColor": "rgba(0,0,0,0.3)", "--shadowColorLight": "rgba(0,0,0,0.15)",
    "--shadowHeavy": "rgba(0,0,0,0.5)",
  },
} as const;

// ── Section transition controller ───────────────────────

const SECTION_COUNT = 4;
const TRANSITION_MS = 1000;

function useSectionNav() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const transitioning = useRef(false);
  const touchStartY = useRef(0);

  const goTo = useCallback((idx: number, dir?: "up" | "down") => {
    if (idx < 0 || idx >= SECTION_COUNT || idx === current || transitioning.current) return;
    transitioning.current = true;
    setDirection(dir ?? (idx > current ? "down" : "up"));
    setCurrent(idx);
    setTimeout(() => { transitioning.current = false; }, TRANSITION_MS);
  }, [current]);

  const next = useCallback(() => goTo(current + 1, "down"), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1, "up"), [goTo, current]);

  useEffect(() => {
    let accumulated = 0;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulated += e.deltaY;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => { accumulated = 0; }, 150);
      if (Math.abs(accumulated) > 80) {
        if (accumulated > 0) next(); else prev();
        accumulated = 0;
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") { e.preventDefault(); next(); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); prev(); }
    };
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev(); }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (timeout) clearTimeout(timeout);
    };
  }, [next, prev]);

  return { current, direction, goTo };
}

// ── CSS ─────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{overflow:hidden;height:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}

/* ── Spring easing ──────────────────────────────────── */
/* Overshooting spring: cubic-bezier(0.34, 1.56, 0.64, 1) */
/* Smooth decel:        cubic-bezier(0.22, 1, 0.36, 1)    */

@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

/* ── Liquid border ring ──────────────────────────────── */
/* Uses a wrapper div approach — no pseudo-element hacks  */

@keyframes liquidSpin{
  0%{transform:translate(-50%,-50%) rotate(0deg)}
  100%{transform:translate(-50%,-50%) rotate(360deg)}
}

.nav-link{transition:color .2s ease;position:relative}
.nav-link:hover{color:var(--tx)!important}
.nav-signin{padding:8px 16px;border-radius:6px;transition:all .3s ease}
.nav-signin:hover{color:var(--accent)!important;text-decoration:underline;text-underline-offset:4px}

/* ── Liquid button effects ──────────────────────────── */


.btn-liquid{
  position:relative;overflow:hidden;
  box-shadow:0 4px 14px var(--shadowColor),0 1px 4px var(--shadowColorLight);
  transition:box-shadow .4s ease;
}
.btn-liquid:hover{
  box-shadow:0 10px 36px var(--shadowHeavy),0 4px 14px var(--shadowColor);
}
.btn-liquid:active{
  box-shadow:0 2px 8px var(--shadowColor);
  transition:box-shadow .12s ease;
}

.btn-liquid-outline{
  position:relative;overflow:hidden;
  box-shadow:0 4px 14px var(--shadowColor),0 1px 4px var(--shadowColorLight);
  transition:box-shadow .4s ease,border-color .3s ease;
}
.btn-liquid-outline:hover{
  border-color:var(--accent)!important;
  box-shadow:0 10px 36px var(--shadowHeavy),0 4px 14px var(--shadowColor);
}
.btn-liquid-outline:active{
  box-shadow:0 2px 8px var(--shadowColor);
  transition:box-shadow .12s ease;
}


.btn-cta-white{
  position:relative;overflow:hidden;
  box-shadow:0 4px 14px rgba(0,0,0,0.15),0 1px 4px rgba(0,0,0,0.08);
  transition:box-shadow .4s ease;
}
.btn-cta-white:hover{
  box-shadow:0 10px 36px rgba(0,0,0,0.3),0 4px 14px rgba(0,0,0,0.15);
}
.btn-cta-white:active{
  box-shadow:0 2px 8px rgba(0,0,0,0.12);
  transition:box-shadow .12s ease;
}

.btn-dark-outline{
  position:relative;overflow:hidden;
  box-shadow:0 4px 14px rgba(0,0,0,0.1),0 1px 4px rgba(0,0,0,0.06);
  transition:border-color .3s ease,box-shadow .4s ease;
}
.btn-dark-outline:hover{
  border-color:rgba(255,255,255,0.5)!important;
  box-shadow:0 10px 36px rgba(0,0,0,0.25),0 4px 14px rgba(0,0,0,0.12);
}
.btn-dark-outline:active{box-shadow:0 2px 8px rgba(0,0,0,0.1);transition:box-shadow .12s ease}

/* ── Feature cards with liquid hover ────────────────── */

.feature-card{
  transition:transform .5s cubic-bezier(0.34,1.56,0.64,1),box-shadow .4s ease;
  box-shadow:0 4px 16px var(--shadowColor),0 1px 4px var(--shadowColorLight);
}
.feature-card:hover{
  transform:translateY(-4px);
  box-shadow:0 12px 40px var(--shadowHeavy),0 4px 16px var(--shadowColor);
}

.feature-card-accent{
  transition:transform .5s cubic-bezier(0.34,1.56,0.64,1),box-shadow .4s ease;
  box-shadow:0 4px 16px var(--shadowColor),0 1px 4px var(--shadowColorLight);
}
.feature-card-accent:hover{
  transform:translateY(-4px);
  box-shadow:0 12px 40px var(--shadowHeavy),0 4px 16px var(--shadowColor);
}

/* ── Other elements ─────────────────────────────────── */

.footer-link{transition:color .2s ease}
.footer-link:hover{color:var(--accent)!important}

.theme-toggle{transition:color .3s ease,transform .4s cubic-bezier(0.34,1.56,0.64,1)}
.theme-toggle:hover{color:var(--accent)!important;transform:scale(1.15) rotate(15deg)}

.browser-mockup{
  border-radius:8px;overflow:hidden;
  box-shadow:0 8px 30px var(--shadowColor),0 2px 8px var(--shadowColorLight);
  border:1px solid #ddd9d0;background:#fff;
  transition:box-shadow .4s ease,transform .5s cubic-bezier(0.34,1.56,0.64,1);
}
.browser-mockup:hover{
  box-shadow:0 16px 50px var(--shadowHeavy),0 6px 20px var(--shadowColor);
  transform:translateY(-4px);
}

/* ── Section dots ───────────────────────────────────── */

.dot{
  width:8px;height:8px;border-radius:50%;
  border:1.5px solid var(--txM);background:transparent;
  cursor:pointer;padding:0;
  transition:all .4s cubic-bezier(0.34,1.56,0.64,1);
}
.dot:hover{border-color:var(--accent);transform:scale(1.4)}
.dot-active{
  background:var(--accent);border-color:var(--accent);
  transform:scale(1.3);
  box-shadow:0 0 8px var(--accentGlow);
}
`;

// ── Nav ─────────────────────────────────────────────────

function Nav({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  const s: React.CSSProperties = {
    color: "var(--tx2)", textDecoration: "none", fontSize: 14,
    fontFamily: "Inter, sans-serif", cursor: "pointer",
    background: "none", border: "none", padding: 0, fontWeight: 400,
  };
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 48px", maxWidth: 1200, margin: "0 auto",
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "transparent",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <a href="/" style={{ textDecoration: "none", color: "var(--accent)" }}>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, fontWeight: 600, fontStyle: "italic", letterSpacing: "-0.01em" }}>Tome.</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a className="nav-link" href="/docs" style={{ ...s, color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 4 }}>Guide</a>
          <a className="nav-link" href="https://github.com/tomehq/tome" style={s}>GitHub</a>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button className="theme-toggle" onClick={toggle} aria-label={isDark ? "Light mode" : "Dark mode"} style={{ background: "none", border: "none", color: "var(--txM)", cursor: "pointer", display: "flex", padding: 4 }}>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
        <a className="nav-link nav-signin" href="/dashboard" style={{ ...s, fontSize: 14 }}>Sign In</a>
      </div>
    </nav>
  );
}

// ── Section dots ────────────────────────────────────────

function SectionDots({ current, goTo }: { current: number; goTo: (i: number) => void }) {
  return (
    <div style={{
      position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)",
      zIndex: 90, display: "flex", flexDirection: "column", gap: 12,
    }}>
      {Array.from({ length: SECTION_COUNT }).map((_, i) => (
        <button key={i} className={`dot ${i === current ? "dot-active" : ""}`} onClick={() => goTo(i)} aria-label={`Go to section ${i + 1}`} />
      ))}
    </div>
  );
}

// ── Section wrapper with spring + blur transitions ──────

function Section({ active, direction, children }: { active: boolean; direction: "up" | "down"; children: React.ReactNode }) {
  // Spring easing with overshoot for entering, smooth decel for leaving
  const springIn = "cubic-bezier(0.34, 1.56, 0.64, 1)";
  const smoothOut = "cubic-bezier(0.22, 1, 0.36, 1)";

  const enterY = direction === "down" ? "60px" : "-60px";
  const exitY = direction === "down" ? "-40px" : "40px";

  return (
    <div style={{
      position: "absolute", inset: 0, top: 60,
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: active ? 1 : 0,
      transform: active ? "translateY(0) scale(1)" : `translateY(${active ? enterY : exitY}) scale(0.96)`,
      filter: active ? "blur(0px)" : "blur(6px)",
      transition: active
        ? `opacity ${TRANSITION_MS}ms ${smoothOut}, transform ${TRANSITION_MS}ms ${springIn}, filter ${TRANSITION_MS * 0.6}ms ease`
        : `opacity ${TRANSITION_MS * 0.5}ms ease, transform ${TRANSITION_MS * 0.7}ms ${smoothOut}, filter ${TRANSITION_MS * 0.4}ms ease`,
      pointerEvents: active ? "auto" : "none",
      overflow: "auto",
      willChange: "transform, opacity, filter",
    }}>
      {children}
    </div>
  );
}

// ── Hero ────────────────────────────────────────────────

function HeroContent() {
  return (
    <div style={{ maxWidth: 1200, width: "100%", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "var(--accent)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 24 }}>
          <SparkleIcon /> INTRODUCING V3.0
        </div>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 24 }}>
          Documentation<br />
          <em style={{ color: "var(--accent)", fontWeight: 500 }}>that grows with you.</em>
        </h1>
        <p style={{ fontSize: 16, color: "var(--tx2)", lineHeight: 1.7, maxWidth: 440, marginBottom: 32, fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
          Tome blends the elegance of an academic journal with the high-performance requirements of modern engineering teams. Curate your technical wisdom.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <LiquidRing radius={6}><a className="btn-liquid" href="/dashboard" style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 6, padding: "14px 28px", fontSize: 15, fontWeight: 600, fontFamily: "Inter, sans-serif", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>Get Started</a></LiquidRing>
          <LiquidRing radius={6} darkRing><a className="btn-liquid-outline" href="https://github.com/tomehq/tome" style={{ background: "var(--bg)", color: "var(--tx)", border: "1px solid var(--bd)", borderRadius: 6, padding: "14px 28px", fontSize: 15, fontWeight: 500, fontFamily: "Inter, sans-serif", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}><GitHubIcon /> Star on GitHub</a></LiquidRing>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--tx2)", fontFamily: "Inter, sans-serif" }}><CheckIcon /> Open source · MIT licensed</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--tx2)", fontFamily: "Inter, sans-serif" }}><CheckIcon /> 5 theme presets included</span>
        </div>
      </div>
      <LiquidRing block radius={8} bg="#ffffff">
        <div style={{ padding: "8px 14px", background: "#edeae4", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #ddd9d0" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e74c3c" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f39c12" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27ae60" }} />
        </div>
        <div style={{ padding: 24, background: "#ffffff", fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4a443e", minHeight: 280 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ width: 140, borderRight: "1px solid #e8e4dc", paddingRight: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#8a847c", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Getting Started</div>
              <div style={{ fontSize: 11, marginBottom: 4, color: "#8b3a2f", fontWeight: 500 }}>Introduction</div>
              <div style={{ fontSize: 11, marginBottom: 4, color: "#4a443e" }}>Quickstart</div>
              <div style={{ fontSize: 11, marginBottom: 4, color: "#4a443e" }}>Installation</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#8a847c", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 14, marginBottom: 8 }}>Guides</div>
              <div style={{ fontSize: 11, marginBottom: 4, color: "#4a443e" }}>Configuration</div>
              <div style={{ fontSize: 11, marginBottom: 4, color: "#4a443e" }}>Components</div>
              <div style={{ fontSize: 11, color: "#4a443e" }}>Theming</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#1a1716", marginBottom: 8, fontFamily: '"Cormorant Garamond", serif' }}>Introduction</div>
              <div style={{ height: 6, width: "90%", background: "#edeae4", borderRadius: 3, marginBottom: 6 }} />
              <div style={{ height: 6, width: "75%", background: "#edeae4", borderRadius: 3, marginBottom: 6 }} />
              <div style={{ height: 6, width: "82%", background: "#edeae4", borderRadius: 3, marginBottom: 16 }} />
              <div style={{ padding: 12, background: "rgba(139,58,47,0.08)", borderRadius: 6 }}>
                <div style={{ height: 5, width: "60%", background: "rgba(139,58,47,0.15)", borderRadius: 3, marginBottom: 4 }} />
                <div style={{ height: 5, width: "45%", background: "rgba(139,58,47,0.15)", borderRadius: 3 }} />
              </div>
              <div style={{ height: 6, width: "88%", background: "#edeae4", borderRadius: 3, marginTop: 16, marginBottom: 6 }} />
              <div style={{ height: 6, width: "70%", background: "#edeae4", borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </LiquidRing>
    </div>
  );
}

// ── Domain typing animation ─────────────────────────────

const DOMAINS = ["ch4p.tome.center", "docs.acme.dev", "api.kinetic.sh", "wiki.lumina.io"];

function DomainAnimation() {
  const [text, setText] = useState("");
  const [domainIdx, setDomainIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const domain = DOMAINS[domainIdx];

    if (typing) {
      if (text.length < domain.length) {
        timerRef.current = setTimeout(() => setText(domain.slice(0, text.length + 1)), 80 + Math.random() * 40);
      } else {
        timerRef.current = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (text.length > 0) {
        timerRef.current = setTimeout(() => setText(text.slice(0, -1)), 40);
      } else {
        setDomainIdx((i) => (i + 1) % DOMAINS.length);
        setTyping(true);
      }
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text, typing, domainIdx]);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "10px 14px", background: "rgba(255,255,255,0.12)", borderRadius: 8,
      fontFamily: '"Fira Code", monospace', fontSize: 13,
    }}>
      <span style={{ opacity: 0.5, fontSize: 11 }}>https://</span>
      <span>{text}</span>
      <span style={{ opacity: 0.7, animation: "blink 1s step-end infinite" }}>|</span>
    </div>
  );
}

// ── Features ────────────────────────────────────────────

function FeaturesContent() {
  return (
    <div style={{ maxWidth: 1200, width: "100%", padding: "0 48px" }}>
      <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.01em", marginBottom: 48 }}>
        Crafted for the Technical Mind
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gridTemplateRows: "auto auto", gap: 16 }}>
        <LiquidRing block radius={12} bg="var(--sf)" style={{ height: "100%" }}>
          <div className="feature-card" style={{ background: "var(--sf)", borderRadius: 12, padding: 36, height: "100%" }}>
            <CiCdIcon />
            <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 600, marginTop: 16, marginBottom: 10, color: "var(--tx)" }}>CI/CD Integration</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--tx2)", lineHeight: 1.65, maxWidth: 360, marginBottom: 24 }}>
              Deploy your docs with every commit. GitHub, GitLab, and Bitbucket supported out of the box with zero-config preview environments.
            </p>
            <div style={{ background: "var(--bgAlt)", borderRadius: 8, padding: 16, border: "1px solid var(--bdLight)", fontFamily: '"Fira Code", monospace', fontSize: 12, lineHeight: 1.7 }}>
              <div style={{ color: "var(--accent)", marginBottom: 2 }}><span style={{ color: "var(--txM)" }}># </span>tome.yaml</div>
              <div style={{ color: "var(--accent)" }}>deploy:</div>
              <div style={{ color: "var(--tx2)", paddingLeft: 16 }}>on: push</div>
            </div>
          </div>
        </LiquidRing>
        <LiquidRing block radius={12} bg="var(--accent)" style={{ height: "100%" }}>
          <div className="feature-card-accent" style={{ background: "var(--accent)", borderRadius: 12, padding: 36, color: "#fff", height: "100%" }}>
            <GlobeIcon />
            <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 600, marginTop: 16, marginBottom: 10 }}>Custom Domains</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.65, opacity: 0.85, marginBottom: 20 }}>Your brand, your identity. Fully managed SSL certificates and global edge caching included.</p>
            <DomainAnimation />
          </div>
        </LiquidRing>
        <LiquidRing block radius={12} bg="var(--accent)" style={{ height: "100%" }}>
          <div className="feature-card-accent" style={{ background: "var(--accent)", borderRadius: 12, padding: 28, color: "#fff", height: "100%" }}>
            <CodeIcon />
            <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, marginTop: 12, marginBottom: 8 }}>DX-first</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.6, opacity: 0.85 }}>Markdown, MDX, and Markdoc support. Designed by developers who value speed.</p>
          </div>
        </LiquidRing>
        <LiquidRing block radius={12} bg="var(--sf)" style={{ height: "100%" }}>
          <div className="feature-card" style={{ background: "var(--sf)", borderRadius: 12, padding: 28, height: "100%" }}>
            <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--tx)" }}>Semantic Search</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--tx2)", lineHeight: 1.6, marginBottom: 20 }}>Instant results across all your projects with AI-powered semantic understanding.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "var(--bgAlt)", borderRadius: 8, border: "1px solid var(--bdLight)" }}>
              <SearchIcon />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--txM)" }}>How to authenticate via JWT?</span>
            </div>
          </div>
        </LiquidRing>
      </div>
    </div>
  );
}

// ── Code Example ────────────────────────────────────────

function CodeExampleContent() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try { navigator.clipboard.writeText(CONFIG_CODE); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div style={{ maxWidth: 700, width: "100%", padding: "0 48px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, color: "var(--accent)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>
          Configuration
        </div>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em" }}>
          Up and running in minutes<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
      </div>

      <LiquidRing block radius={8} bg="var(--bgAlt)">
      <div style={{ borderRadius: 8, overflow: "hidden", background: "var(--bgAlt)", boxShadow: "0 4px 16px var(--shadowColor), 0 1px 4px var(--shadowColorLight)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", borderBottom: "1px solid var(--bd)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />
            <span style={{ fontFamily: '"Fira Code", monospace', fontSize: 10, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em" }}>JS</span>
            <span style={{ fontSize: 12, color: "var(--txM)", fontFamily: "Inter, sans-serif" }}>tome.config.js</span>
          </div>
          <button onClick={copy} style={{ background: "none", border: "none", color: copied ? "var(--accent)" : "var(--txM)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontFamily: '"Fira Code", monospace', letterSpacing: ".05em", transition: "color .2s ease" }}>
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
        <pre style={{ padding: "20px 24px", margin: 0, overflow: "auto", fontFamily: '"Fira Code", monospace', fontSize: 13, lineHeight: 1.7, color: "var(--tx2)", tabSize: 2 }}>
          <code>{CONFIG_CODE}</code>
        </pre>
      </div>
      </LiquidRing>
    </div>
  );
}

// ── CTA ─────────────────────────────────────────────────

function CTAContent() {
  return (
    <div style={{ maxWidth: 900, width: "100%", padding: "0 48px" }}>
      <LiquidRing block radius={16} bg="var(--accent)">
        <div style={{ background: "var(--accent)", borderRadius: 16, padding: "80px 48px", textAlign: "center", boxShadow: "0 8px 30px var(--shadowColor), 0 2px 8px var(--shadowColorLight)" }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, fontStyle: "italic", color: "#fff", marginBottom: 32, letterSpacing: "-0.01em" }}>
            Ready to build your legacy?
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 28 }}>
            <LiquidRing radius={6} darkRing><a className="btn-cta-white" href="/dashboard" style={{ background: "#fff", color: "var(--accent)", border: "none", borderRadius: 6, padding: "14px 28px", fontSize: 15, fontWeight: 600, fontFamily: "Inter, sans-serif", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>Get Started for Free</a></LiquidRing>
            <LiquidRing radius={6}><a className="btn-dark-outline" href="/docs" style={{ background: "var(--accent)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 6, padding: "14px 28px", fontSize: 15, fontWeight: 500, fontFamily: "Inter, sans-serif", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>View the Docs</a></LiquidRing>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}><CheckIconWhite /> Open source core</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}><CheckIconWhite /> Built-in AI chat</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}><CheckIconWhite /> Deploy in seconds</span>
          </div>
        </div>
      </LiquidRing>
      {/* Inline footer */}
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 32 }}>
        <a className="footer-link" href="/docs" style={{ color: "var(--txM)", textDecoration: "none", fontSize: 12, fontFamily: "Inter, sans-serif" }}>Documentation</a>
        <a className="footer-link" href="https://github.com/tomehq/tome" style={{ color: "var(--txM)", textDecoration: "none", fontSize: 12, fontFamily: "Inter, sans-serif" }}>GitHub</a>
        <a className="footer-link" href="https://x.com/tomedocs" style={{ color: "var(--txM)", textDecoration: "none", fontSize: 12, fontFamily: "Inter, sans-serif" }}>Twitter</a>
      </div>
      <div style={{ textAlign: "center", marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--txM)" }}>
        &copy; {new Date().getFullYear()} Tome. Curating technical wisdom.
      </div>
    </div>
  );
}

// ── App ─────────────────────────────────────────────────

export function App() {
  const [isDark, setDark] = useState(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  const theme = isDark ? THEMES.dark : THEMES.light;
  const toggle = useCallback(() => setDark((d) => !d), []);
  const { current, direction, goTo } = useSectionNav();

  return (
    <div style={{
      ...theme as React.CSSProperties,
      color: "var(--tx)", background: "var(--bg)",
      fontFamily: "Inter, sans-serif",
      height: "100vh", overflow: "hidden", position: "relative",
      transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <style>{CSS}</style>
      <Nav isDark={isDark} toggle={toggle} />
      <SectionDots current={current} goTo={goTo} />
      <Section active={current === 0} direction={direction}><HeroContent /></Section>
      <Section active={current === 1} direction={direction}><FeaturesContent /></Section>
      <Section active={current === 2} direction={direction}><CodeExampleContent /></Section>
      <Section active={current === 3} direction={direction}><CTAContent /></Section>
      <Analytics />
    </div>
  );
}
