// ── Theme Preset Types ────────────────────────────────────

export interface ThemeTokens {
  bg: string; sf: string; sfH: string; bd: string;
  tx: string; tx2: string; txM: string;
  ac: string; acD: string; acT: string;
  cdBg: string; cdTx: string; sbBg: string; hdBg: string;
}

export interface ThemePreset {
  dark: ThemeTokens;
  light: ThemeTokens;
  fonts: { heading: string; body: string; code: string };
}

// ── Theme Presets ─────────────────────────────────────────

export const THEME_PRESETS = {
  amber: {
    dark: {
      bg:"#09090b",sf:"#111114",sfH:"#18181c",bd:"#1e1e24",
      tx:"#e4e4e7",tx2:"#a1a1aa",txM:"#919199",
      ac:"#e8a845",acD:"rgba(232,168,69,0.12)",acT:"#fbbf24",
      cdBg:"#0c0c0f",cdTx:"#c4c4cc",sbBg:"#0c0c0e",hdBg:"rgba(9,9,11,0.85)",
    },
    light: {
      bg:"#fafaf9",sf:"#ffffff",sfH:"#f5f5f4",bd:"#e7e5e4",
      tx:"#1c1917",tx2:"#57534e",txM:"#706b66",
      ac:"#96640a",acD:"rgba(150,100,10,0.08)",acT:"#7a5208",
      cdBg:"#f5f3f0",cdTx:"#2c2520",sbBg:"#f5f5f3",hdBg:"rgba(250,250,249,0.85)",
    },
    fonts: { heading: "Instrument Serif", body: "DM Sans", code: "JetBrains Mono" },
  },
  editorial: {
    dark: {
      bg:"#080c1f",sf:"#0e1333",sfH:"#141940",bd:"#1a2050",
      tx:"#e8e6f0",tx2:"#b5b1c8",txM:"#9490ae",
      ac:"#ff6b4a",acD:"rgba(255,107,74,0.1)",acT:"#ff8a70",
      cdBg:"#0a0e27",cdTx:"#b8b4cc",sbBg:"#0a0e27",hdBg:"rgba(8,12,31,0.9)",
    },
    light: {
      bg:"#f6f4f0",sf:"#ffffff",sfH:"#eeece6",bd:"#ddd9d0",
      tx:"#1a1716",tx2:"#4a443e",txM:"#706960",
      ac:"#b83d22",acD:"rgba(184,61,34,0.07)",acT:"#9c3019",
      cdBg:"#edeae4",cdTx:"#3a3530",sbBg:"#f0ede8",hdBg:"rgba(246,244,240,0.92)",
    },
    fonts: { heading: "Cormorant Garamond", body: "Bricolage Grotesque", code: "Fira Code" },
  },
} as const satisfies Record<string, ThemePreset>;

export type PresetName = keyof typeof THEME_PRESETS;
