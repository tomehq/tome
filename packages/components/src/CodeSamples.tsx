import React, { useState } from "react";

export interface CodeSample {
  language: string;
  label: string;
  code: string;
}

export interface CodeSamplesProps {
  samples: CodeSample[];
}

export function CodeSamples({ samples }: CodeSamplesProps) {
  const [active, setActive] = useState(0);

  if (samples.length === 0) return null;

  return (
    <div
      data-testid="code-samples"
      style={{
        border: "1px solid var(--bd)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--bd)",
          background: "var(--sf)",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch" as any,
        }}
      >
        {samples.map((s, i) => (
          <button
            key={s.language}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              background: i === active ? "var(--cdBg)" : "transparent",
              color: i === active ? "var(--tx)" : "var(--tx2)",
              border: "none",
              borderBottom:
                i === active
                  ? "2px solid var(--ac)"
                  : "2px solid transparent",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <pre
        style={{
          margin: 0,
          padding: 16,
          background: "var(--cdBg)",
          overflow: "auto",
        }}
      >
        <code
          style={{
            fontSize: 13,
            fontFamily: "var(--font-code)",
          }}
        >
          {samples[active]?.code}
        </code>
      </pre>
    </div>
  );
}
