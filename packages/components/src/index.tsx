import React, { useState } from "react";

// ── API COMPONENTS (TOM-19) ─────────────────────────────
export {
  MethodBadge,
  EndpointCard,
  ParameterTable,
  RequestBodyBlock,
  ResponseBlock,
  CodeExamples,
  ApiReference,
} from "./api.js";

// ── API PLAYGROUND (TOM-20) ─────────────────────────────
export { ApiPlayground } from "./ApiPlayground.js";

// ── CHANGELOG (TOM-49) ─────────────────────────────────
export { ChangelogTimeline } from "./Changelog.js";
export type { ChangelogTimelineProps } from "./Changelog.js";

// ── CALLOUT ──────────────────────────────────────────────
export interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
}

const calloutStyles: Record<string, { color: string; label: string }> = {
  info: { color: "#3b82f6", label: "INFO" },
  warning: { color: "#f59e0b", label: "WARNING" },
  tip: { color: "var(--ac, #a78bfa)", label: "TIP" },
  danger: { color: "#ef4444", label: "DANGER" },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const s = calloutStyles[type] || calloutStyles.info;
  return (
    <div style={{
      borderLeft: `3px solid ${s.color}`,
      background: `${s.color}11`,
      borderRadius: "0 2px 2px 0",
      padding: "14px 18px",
      marginBottom: 20,
    }}>
      {title ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: 10, letterSpacing: ".08em", color: s.color, fontFamily: "var(--font-code, monospace)" }}>{s.label}</span>
          <span style={{ fontWeight: 600, fontSize: 13, color: s.color }}>{title}</span>
        </div>
      ) : (
        <div style={{ marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: 10, letterSpacing: ".08em", color: s.color, fontFamily: "var(--font-code, monospace)" }}>{s.label}</span>
        </div>
      )}
      <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--tx2)" }}>{children}</div>
    </div>
  );
}

// ── TABS ─────────────────────────────────────────────────
export interface TabsProps {
  items: string[];
  children: React.ReactNode[];
}

export function Tabs({ items, children }: TabsProps) {
  const [active, setActive] = useState(0);
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--bd)" }}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px",
              background: "none",
              border: "none",
              borderBottom: active === i ? "2px solid var(--ac)" : "2px solid transparent",
              color: active === i ? "var(--ac)" : "var(--txM)",
              fontWeight: active === i ? 600 : 400,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px 0" }}>
        {children[active]}
      </div>
    </div>
  );
}

// ── CARD ─────────────────────────────────────────────────
export interface CardProps {
  title: string;
  icon?: string;
  href?: string;
  children?: React.ReactNode;
}

export function Card({ title, icon, href, children }: CardProps) {
  const content = (
    <div style={{
      border: "1px solid var(--bd)",
      borderRadius: 2,
      padding: "20px",
      transition: "border-color 0.15s",
      cursor: href ? "pointer" : "default",
    }}>
      {icon && <span style={{ fontSize: 24, marginBottom: 8, display: "block" }}>{icon}</span>}
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{title}</div>
      {children && <div style={{ fontSize: 13, color: "var(--txM)", lineHeight: 1.5 }}>{children}</div>}
    </div>
  );

  if (href) {
    return <a href={href} style={{ textDecoration: "none", color: "inherit" }}>{content}</a>;
  }
  return content;
}

export function CardGroup({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 12,
      marginBottom: 20,
    }}>
      {children}
    </div>
  );
}

// ── STEPS ────────────────────────────────────────────────
export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingLeft: 24, borderLeft: "2px solid var(--bd)", marginBottom: 20 }}>
      {React.Children.map(children, (child, i) => (
        <div style={{ position: "relative", paddingBottom: 20 }}>
          <div style={{
            position: "absolute", left: -33, top: 0,
            width: 20, height: 20, borderRadius: "50%",
            background: "var(--ac)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700,
          }}>
            {i + 1}
          </div>
          <div style={{ paddingLeft: 8 }}>{child}</div>
        </div>
      ))}
    </div>
  );
}

// ── ACCORDION ────────────────────────────────────────────
export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid var(--bd)", borderRadius: 2, marginBottom: 8, overflow: "hidden" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "12px 16px", background: "var(--sf)",
          border: "none", cursor: "pointer", fontWeight: 500, fontSize: 14,
          color: "var(--tx)", fontFamily: "inherit",
        }}
      >
        {title}
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          ▾
        </span>
      </button>
      {open && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--bd)", fontSize: 14, color: "var(--tx2)", lineHeight: 1.65 }}>
          {children}
        </div>
      )}
    </div>
  );
}
