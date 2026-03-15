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
