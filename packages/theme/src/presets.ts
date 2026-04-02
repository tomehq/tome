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
  cipher: {
    dark: {
      bg:"#050508",sf:"#0c0c12",sfH:"#12121a",bd:"#1a1a25",
      tx:"#d4ff00",tx2:"#8a90a0",txM:"#6a7080",
      ac:"#6666ff",acD:"rgba(102,102,255,0.10)",acT:"#8080ff",
      cdBg:"#08080e",cdTx:"#b0c870",sbBg:"#08080d",hdBg:"rgba(5,5,8,0.88)",
    },
    light: {
      bg:"#f0f2f5",sf:"#ffffff",sfH:"#e8eaef",bd:"#d0d4db",
      tx:"#0f1219",tx2:"#4a5060",txM:"#6a7080",
      ac:"#2020cc",acD:"rgba(32,32,204,0.08)",acT:"#1a1aa8",
      cdBg:"#e6e9ef",cdTx:"#2a3520",sbBg:"#ebedf2",hdBg:"rgba(240,242,245,0.90)",
    },
    fonts: { heading: "Bodoni Moda", body: "Space Grotesk", code: "Source Code Pro" },
  },
  mint: {
    dark: {
      bg:"#0d1117",sf:"#161b22",sfH:"#1c2129",bd:"#21262d",
      tx:"#e6edf3",tx2:"#8b949e",txM:"#6e7681",
      ac:"#0ea371",acD:"rgba(14,163,113,0.10)",acT:"#2dd4a0",
      cdBg:"#0a0e14",cdTx:"#adbac7",sbBg:"#0d1117",hdBg:"rgba(13,17,23,0.88)",
    },
    light: {
      bg:"#ffffff",sf:"#f6f8fa",sfH:"#eef1f5",bd:"#d8dee4",
      tx:"#1f2328",tx2:"#59636e",txM:"#6e7681",
      ac:"#0a7b53",acD:"rgba(10,123,83,0.07)",acT:"#087a50",
      cdBg:"#f0f3f6",cdTx:"#24292f",sbBg:"#f6f8fa",hdBg:"rgba(255,255,255,0.90)",
    },
    fonts: { heading: "Inter", body: "Inter", code: "Fira Code" },
  },
  ocean: {
    dark: {
      bg:"#0a1628",sf:"#0f1d33",sfH:"#142540",bd:"#1a2e50",
      tx:"#e0e8f0",tx2:"#8ca0b8",txM:"#6b8098",
      ac:"#0ea5e9",acD:"rgba(14,165,233,0.10)",acT:"#38bdf8",
      cdBg:"#081320",cdTx:"#94b4d0",sbBg:"#0a1628",hdBg:"rgba(10,22,40,0.90)",
    },
    light: {
      bg:"#f0f7ff",sf:"#ffffff",sfH:"#e8f0fa",bd:"#ccdcef",
      tx:"#0c1929",tx2:"#3d5a78",txM:"#5a7a98",
      ac:"#0369a1",acD:"rgba(3,105,161,0.07)",acT:"#025e8f",
      cdBg:"#e4edf7",cdTx:"#1a3050",sbBg:"#eef4fc",hdBg:"rgba(240,247,255,0.92)",
    },
    fonts: { heading: "Outfit", body: "Inter", code: "JetBrains Mono" },
  },
  rose: {
    dark: {
      bg:"#0f0a10",sf:"#171118",sfH:"#1e1620",bd:"#2a1f2c",
      tx:"#f0e4f0",tx2:"#b09ab0",txM:"#8a7890",
      ac:"#f43f5e",acD:"rgba(244,63,94,0.10)",acT:"#fb7185",
      cdBg:"#0d080e",cdTx:"#c8aec8",sbBg:"#0f0a10",hdBg:"rgba(15,10,16,0.88)",
    },
    light: {
      bg:"#fef7f7",sf:"#ffffff",sfH:"#fceef0",bd:"#f0d4d8",
      tx:"#1a0f12",tx2:"#6b4048",txM:"#8a5a64",
      ac:"#e11d48",acD:"rgba(225,29,72,0.06)",acT:"#be123c",
      cdBg:"#f8eaec",cdTx:"#3a1a22",sbBg:"#fdf2f4",hdBg:"rgba(254,247,247,0.92)",
    },
    fonts: { heading: "Playfair Display", body: "Source Sans 3", code: "Fira Code" },
  },
  forest: {
    dark: {
      bg:"#091209",sf:"#0f1a0f",sfH:"#152215",bd:"#1e2e1e",
      tx:"#e0f0e0",tx2:"#8aaa8a",txM:"#6a8a6a",
      ac:"#22c55e",acD:"rgba(34,197,94,0.10)",acT:"#4ade80",
      cdBg:"#070e07",cdTx:"#a0c4a0",sbBg:"#091209",hdBg:"rgba(9,18,9,0.90)",
    },
    light: {
      bg:"#f4faf4",sf:"#ffffff",sfH:"#e8f4e8",bd:"#c8e0c8",
      tx:"#0a1a0a",tx2:"#3a5a3a",txM:"#5a7a5a",
      ac:"#15803d",acD:"rgba(21,128,61,0.07)",acT:"#116d34",
      cdBg:"#e4f2e4",cdTx:"#1a3a1a",sbBg:"#eef6ee",hdBg:"rgba(244,250,244,0.92)",
    },
    fonts: { heading: "Merriweather", body: "Nunito Sans", code: "Source Code Pro" },
  },
  slate: {
    dark: {
      bg:"#0f1115",sf:"#16181e",sfH:"#1c1f26",bd:"#24272e",
      tx:"#e2e4e8",tx2:"#9498a0",txM:"#6e7278",
      ac:"#94a3b8",acD:"rgba(148,163,184,0.10)",acT:"#b0bec8",
      cdBg:"#0c0e12",cdTx:"#a8acb4",sbBg:"#0f1115",hdBg:"rgba(15,17,21,0.88)",
    },
    light: {
      bg:"#f8fafc",sf:"#ffffff",sfH:"#f1f5f9",bd:"#d8dfe7",
      tx:"#0f172a",tx2:"#475569",txM:"#64748b",
      ac:"#475569",acD:"rgba(71,85,105,0.07)",acT:"#3a4a5c",
      cdBg:"#f0f4f8",cdTx:"#1e293b",sbBg:"#f5f7fa",hdBg:"rgba(248,250,252,0.92)",
    },
    fonts: { heading: "Inter", body: "Inter", code: "JetBrains Mono" },
  },
  sunset: {
    dark: {
      bg:"#120c06",sf:"#1a1208",sfH:"#22180c",bd:"#2e2010",
      tx:"#f0e4d4",tx2:"#b0986a",txM:"#907850",
      ac:"#f97316",acD:"rgba(249,115,22,0.10)",acT:"#fb923c",
      cdBg:"#0e0a05",cdTx:"#c8aa78",sbBg:"#120c06",hdBg:"rgba(18,12,6,0.90)",
    },
    light: {
      bg:"#fffbf5",sf:"#ffffff",sfH:"#fef3e6",bd:"#f0d8b8",
      tx:"#1a1008",tx2:"#6a5030",txM:"#8a6840",
      ac:"#c2410c",acD:"rgba(194,65,12,0.06)",acT:"#a63a0a",
      cdBg:"#faf0e2",cdTx:"#3a2810",sbBg:"#fdf6ec",hdBg:"rgba(255,251,245,0.92)",
    },
    fonts: { heading: "Sora", body: "DM Sans", code: "Fira Code" },
  },
  carbon: {
    dark: {
      bg:"#080808",sf:"#101010",sfH:"#171717",bd:"#1f1f1f",
      tx:"#d4d4d4",tx2:"#888888",txM:"#666666",
      ac:"#e4e4e4",acD:"rgba(228,228,228,0.08)",acT:"#f0f0f0",
      cdBg:"#0a0a0a",cdTx:"#a0a0a0",sbBg:"#080808",hdBg:"rgba(8,8,8,0.90)",
    },
    light: {
      bg:"#f5f5f5",sf:"#ffffff",sfH:"#ebebeb",bd:"#d4d4d4",
      tx:"#171717",tx2:"#525252",txM:"#6b6b6b",
      ac:"#262626",acD:"rgba(38,38,38,0.06)",acT:"#1a1a1a",
      cdBg:"#eaeaea",cdTx:"#1a1a1a",sbBg:"#f0f0f0",hdBg:"rgba(245,245,245,0.92)",
    },
    fonts: { heading: "IBM Plex Sans", body: "IBM Plex Sans", code: "IBM Plex Mono" },
  },
} as const satisfies Record<string, ThemePreset>;

export type PresetName = keyof typeof THEME_PRESETS;
