import React from "react";

export interface LinkCardProps {
  href: string;
  title: string;
  description?: string;
  icon?: string;
  external?: boolean;
}

export function LinkCard({ href, title, description, icon, external }: LinkCardProps) {
  const isExternal = external ?? href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{
        display: "block",
        padding: "16px 20px",
        border: "1px solid var(--bd)",
        borderRadius: 8,
        textDecoration: "none",
        color: "inherit",
        background: "var(--sf)",
        transition: "border-color 0.15s, background 0.15s",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--ac)";
        (e.currentTarget as HTMLElement).style.background = "var(--sfH)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--bd)";
        (e.currentTarget as HTMLElement).style.background = "var(--sf)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
        <span style={{ fontWeight: 600, fontSize: 15, color: "var(--tx)" }}>{title}</span>
        <span style={{ marginLeft: "auto", color: "var(--tx2)", fontSize: 14 }}>
          {isExternal ? "↗" : "→"}
        </span>
      </div>
      {description && (
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--tx2)", lineHeight: 1.5 }}>
          {description}
        </p>
      )}
    </a>
  );
}

export interface CardGridProps {
  columns?: 2 | 3;
  children: React.ReactNode;
}

export function CardGrid({ columns = 2, children }: CardGridProps) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 12,
      marginTop: 16,
      marginBottom: 16,
    }}>
      {children}
    </div>
  );
}
