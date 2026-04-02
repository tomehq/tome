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

// ── ASYNCAPI COMPONENTS (TOM-66) ────────────────────────
export {
  ProtocolBadge,
  DirectionBadge,
  ChannelCard,
  MessageBlock,
  AsyncParameterTable,
  AsyncApiReference,
} from "./asyncapi.js";

// ── API PLAYGROUND (TOM-20) ─────────────────────────────
export { ApiPlayground } from "./ApiPlayground.js";

// ── CODE SAMPLES (Phase 2.2) ────────────────────────────
export { CodeSamples } from "./CodeSamples.js";
export type { CodeSample, CodeSamplesProps } from "./CodeSamples.js";

// ── LINK CARD & CARD GRID (Phase 3.1) ──────────────────
export { LinkCard, CardGrid } from "./LinkCard.js";
export type { LinkCardProps, CardGridProps } from "./LinkCard.js";

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

const CARD_ICONS: Record<string, React.ReactNode> = {
  book: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  compass: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>,
  layers: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
  cpu: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>,
  terminal: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>,
  map: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>,
  search: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  grid: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  zap: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  lightbulb: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>,
};

export function Card({ title, icon, href, children }: CardProps) {
  const resolvedIcon = typeof icon === "string" && CARD_ICONS[icon] ? CARD_ICONS[icon] : icon;
  const content = (
    <div
      style={{
        border: "1px solid var(--bd)",
        borderRadius: 8,
        padding: "20px",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: href ? "pointer" : "default",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--ac)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
      onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--bd)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
    >
      {resolvedIcon && <span style={{ display: "block", marginBottom: 8, color: "var(--ac)" }}>{resolvedIcon}</span>}
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

// ── PACKAGE MANAGER ─────────────────────────────────────
const PM_MAP: Record<string, Record<string, string>> = {
  install: { npm: "npm install", yarn: "yarn add", pnpm: "pnpm add", bun: "bun add" },
  "install -D": { npm: "npm install -D", yarn: "yarn add -D", pnpm: "pnpm add -D", bun: "bun add -d" },
  uninstall: { npm: "npm uninstall", yarn: "yarn remove", pnpm: "pnpm remove", bun: "bun remove" },
  run: { npm: "npm run", yarn: "yarn", pnpm: "pnpm", bun: "bun run" },
  exec: { npm: "npx", yarn: "yarn dlx", pnpm: "pnpm dlx", bun: "bunx" },
  init: { npm: "npm init", yarn: "yarn init", pnpm: "pnpm init", bun: "bun init" },
  create: { npm: "npm create", yarn: "yarn create", pnpm: "pnpm create", bun: "bun create" },
};

function translateCommand(command: string, pm: string): string {
  for (const [verb, map] of Object.entries(PM_MAP)) {
    if (command.startsWith(verb + " ") || command === verb) {
      const rest = command.slice(verb.length);
      return (map[pm] || verb) + rest;
    }
  }
  return `${pm} ${command}`;
}

export function PackageManager({ command }: { command: string }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const pms = ["npm", "yarn", "pnpm", "bun"] as const;
  const cmd = translateCommand(command, pms[active]);

  return (
    <div style={{ border: "1px solid var(--bd)", borderRadius: 2, marginBottom: 16, overflow: "hidden" }}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--bd)", background: "var(--sf)", overflowX: "auto" }}>
        {pms.map((pm, i) => (
          <button key={pm} onClick={() => { setActive(i); setCopied(false); }} style={{
            padding: "8px 14px", background: "none", border: "none", cursor: "pointer",
            fontSize: 12, fontFamily: "var(--font-code)", fontWeight: i === active ? 600 : 400,
            color: i === active ? "var(--ac)" : "var(--txM)",
            borderBottom: i === active ? "2px solid var(--ac)" : "2px solid transparent",
            whiteSpace: "nowrap",
          }}>{pm}</button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", background: "var(--cdBg)", gap: 8 }}>
        <code style={{ flex: 1, fontFamily: "var(--font-code)", fontSize: 13, color: "var(--cdTx)", whiteSpace: "pre", overflowX: "auto" }}>
          {cmd}
        </code>
        <button onClick={() => { navigator.clipboard?.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{
          background: "none", border: "none", cursor: "pointer", color: "var(--txM)", fontSize: 12, fontFamily: "var(--font-code)", flexShrink: 0,
        }}>{copied ? "✓" : "Copy"}</button>
      </div>
    </div>
  );
}

// ── TYPE TABLE ──────────────────────────────────────────
interface TypeField {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description?: string;
}

export function TypeTable({ name, fields }: { name: string; fields: TypeField[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {name && <h4 style={{ fontFamily: "var(--font-code)", fontSize: 15, marginBottom: 8, color: "var(--tx)" }}>{name}</h4>}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "var(--font-body)" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--bd)" }}>
              {["Property", "Type", "Required", "Default", "Description"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "8px 10px", color: "var(--txM)", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map(f => (
              <tr key={f.name} style={{ borderBottom: "1px solid var(--bd)" }}>
                <td style={{ padding: "8px 10px", fontFamily: "var(--font-code)", fontWeight: 500, color: "var(--tx)" }}>{f.name}</td>
                <td style={{ padding: "8px 10px", fontFamily: "var(--font-code)", fontSize: 12, color: "var(--ac)" }}>{f.type}</td>
                <td style={{ padding: "8px 10px" }}>
                  {f.required && <span style={{ fontSize: 10, fontWeight: 600, color: "#e04040", background: "rgba(224,64,64,0.1)", padding: "2px 6px", borderRadius: 2 }}>required</span>}
                </td>
                <td style={{ padding: "8px 10px", fontFamily: "var(--font-code)", fontSize: 12, color: "var(--txM)" }}>{f.default || "—"}</td>
                <td style={{ padding: "8px 10px", color: "var(--tx2)" }}>{f.description || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── FILE TREE ───────────────────────────────────────────
function FileTreeFile({ name }: { name: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 0", fontFamily: "var(--font-code)", fontSize: 13, color: "var(--tx2)" }}>
      <span style={{ opacity: 0.6 }}>📄</span> {name}
    </div>
  );
}

function FileTreeFolder({ name, defaultOpen, children }: { name: string; defaultOpen?: boolean; children?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 6, padding: "3px 0",
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "var(--font-code)", fontSize: 13, color: "var(--tx)", fontWeight: 500,
      }}>
        <span>{open ? "📂" : "📁"}</span> {name}
      </button>
      {open && <div style={{ paddingLeft: 18, borderLeft: "1px solid var(--bd)", marginLeft: 8 }}>{children}</div>}
    </div>
  );
}

export function FileTree({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--bd)", borderRadius: 2, padding: "12px 16px", background: "var(--cdBg)", marginBottom: 16 }}>
      {children}
    </div>
  );
}
FileTree.File = FileTreeFile;
FileTree.Folder = FileTreeFolder;
