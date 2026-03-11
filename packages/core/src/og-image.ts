/**
 * OpenGraph image generation for documentation pages (TOM-50).
 * Auto-generates social preview cards at build time using satori + resvg.
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import type { PageRoute } from "./routes.js";
import type { TomeConfig } from "./config.js";

// ── TYPES ────────────────────────────────────────────────

export interface OgImageConfig {
  /** Site name to display */
  siteName: string;
  /** Theme accent color */
  accentColor: string;
  /** Background color */
  backgroundColor: string;
  /** Text color */
  textColor: string;
  /** Secondary text color */
  secondaryTextColor: string;
  /** Base URL for OG image references */
  baseUrl?: string;
}

export interface OgImageResult {
  /** Total images generated */
  generated: number;
  /** Total images skipped (custom ogImage set) */
  skipped: number;
  /** Output directory */
  outputDir: string;
}

// ── THEME COLORS ────────────────────────────────────────

const PRESET_COLORS: Record<string, { accent: string; bg: string; text: string; secondary: string }> = {
  amber: {
    accent: "#e8a845",
    bg: "#1a1a1a",
    text: "#ffffff",
    secondary: "#a0a0a0",
  },
  editorial: {
    accent: "#2563eb",
    bg: "#ffffff",
    text: "#111827",
    secondary: "#6b7280",
  },
};

// ── SVG TEMPLATE ────────────────────────────────────────

/**
 * Generate an OG image SVG template for a page.
 * This produces a 1200x630 SVG suitable for social media previews.
 */
export function generateOgSvg(
  title: string,
  description: string | undefined,
  config: OgImageConfig,
): string {
  const { siteName, accentColor, backgroundColor, textColor, secondaryTextColor } = config;

  // Truncate title if too long
  const displayTitle = title.length > 60 ? title.slice(0, 57) + "..." : title;
  // Truncate description if too long
  const displayDesc = description
    ? description.length > 120
      ? description.slice(0, 117) + "..."
      : description
    : "";

  // Escape XML entities
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${esc(backgroundColor)}" />
  <rect x="0" y="0" width="1200" height="6" fill="${esc(accentColor)}" />
  <text x="80" y="100" font-family="sans-serif" font-size="24" font-weight="400" fill="${esc(secondaryTextColor)}">${esc(siteName)}</text>
  <text x="80" y="300" font-family="sans-serif" font-size="56" font-weight="700" fill="${esc(textColor)}">${esc(displayTitle)}</text>
  ${displayDesc ? `<text x="80" y="380" font-family="sans-serif" font-size="28" font-weight="400" fill="${esc(secondaryTextColor)}">${esc(displayDesc)}</text>` : ""}
  <rect x="80" y="540" width="60" height="4" rx="2" fill="${esc(accentColor)}" />
  <text x="160" y="548" font-family="sans-serif" font-size="20" font-weight="400" fill="${esc(secondaryTextColor)}">Powered by Tome</text>
</svg>`;
}

// ── SATORI TEMPLATE ─────────────────────────────────────

/**
 * Generate a satori-compatible JSX-like element tree for OG images.
 * Returns a plain object tree that satori can render.
 */
export function buildOgTemplate(
  title: string,
  description: string | undefined,
  config: OgImageConfig,
): Record<string, unknown> {
  const { siteName, accentColor, backgroundColor, textColor, secondaryTextColor } = config;

  const displayTitle = title.length > 70 ? title.slice(0, 67) + "..." : title;
  const displayDesc = description
    ? description.length > 140
      ? description.slice(0, 137) + "..."
      : description
    : undefined;

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor,
        padding: "60px 80px",
        fontFamily: "sans-serif",
      },
      children: [
        // Accent bar at top
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              backgroundColor: accentColor,
            },
          },
        },
        // Site name
        {
          type: "div",
          props: {
            style: {
              fontSize: "24px",
              color: secondaryTextColor,
              marginBottom: "auto",
            },
            children: siteName,
          },
        },
        // Title
        {
          type: "div",
          props: {
            style: {
              fontSize: "56px",
              fontWeight: 700,
              color: textColor,
              lineHeight: 1.2,
              marginBottom: displayDesc ? "20px" : "auto",
            },
            children: displayTitle,
          },
        },
        // Description (if present)
        ...(displayDesc
          ? [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "28px",
                    color: secondaryTextColor,
                    lineHeight: 1.4,
                    marginBottom: "auto",
                  },
                  children: displayDesc,
                },
              },
            ]
          : []),
        // Footer
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: "60px",
                    height: "4px",
                    backgroundColor: accentColor,
                    borderRadius: "2px",
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "20px",
                    color: secondaryTextColor,
                  },
                  children: "Powered by Tome",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ── CONFIG BUILDER ──────────────────────────────────────

/**
 * Build OG image config from a TomeConfig.
 */
export function buildOgConfig(config: TomeConfig): OgImageConfig {
  const preset = PRESET_COLORS[config.theme.preset] || PRESET_COLORS.amber;
  const isDark = config.theme.mode === "dark" || config.theme.mode === "auto";

  return {
    siteName: config.name,
    accentColor: config.theme.accent || preset.accent,
    backgroundColor: isDark ? preset.bg : "#ffffff",
    textColor: isDark ? preset.text : "#111827",
    secondaryTextColor: isDark ? preset.secondary : "#6b7280",
    baseUrl: config.baseUrl,
  };
}

// ── OG IMAGE GENERATOR ─────────────────────────────────

/**
 * Generate OG images for all documentation pages.
 * Uses satori + resvg if available, falls back to SVG output.
 */
export async function generateOgImages(
  routes: PageRoute[],
  config: TomeConfig,
  outDir: string,
): Promise<OgImageResult> {
  const ogDir = join(outDir, "og");
  mkdirSync(ogDir, { recursive: true });

  const ogConfig = buildOgConfig(config);
  let generated = 0;
  let skipped = 0;

  // Try to load satori and resvg for PNG generation (optional deps)
  // Use variable-based imports to prevent bundlers from statically resolving them
  let satori: ((element: any, options: any) => Promise<string>) | null = null;
  let Resvg: (new (svg: string, options?: any) => { render: () => { asPng: () => Uint8Array } }) | null = null;

  try {
    const satoriPkg = "satori";
    const resvgPkg = "@resvg/resvg-js";
    const satoriMod = await import(/* @vite-ignore */ satoriPkg);
    satori = satoriMod.default;

    const resvgMod = await import(/* @vite-ignore */ resvgPkg);
    Resvg = resvgMod.Resvg;
  } catch {
    // satori/resvg not available — fall back to SVG
  }

  for (const route of routes) {
    if (route.filePath === "__api-reference__") continue;

    // Skip if page has custom ogImage
    const fm = route.frontmatter as Record<string, unknown>;
    if (fm.ogImage) {
      skipped++;
      continue;
    }

    const title = route.frontmatter.title;
    const description = route.frontmatter.description;
    const slug = route.id === "index" ? "index" : route.id.replace(/\//g, "-");

    if (satori && Resvg) {
      // Generate PNG using satori + resvg
      try {
        const element = buildOgTemplate(title, description, ogConfig);
        const svg = await satori(element, {
          width: 1200,
          height: 630,
          fonts: [],
        });
        const resvg = new Resvg(svg, {
          fitTo: { mode: "width" as const, value: 1200 },
        });
        const pngData = resvg.render().asPng();
        const pngPath = join(ogDir, `${slug}.png`);
        writeFileSync(pngPath, pngData);
        generated++;
      } catch {
        // Fall back to SVG for this page
        const svg = generateOgSvg(title, description, ogConfig);
        writeFileSync(join(ogDir, `${slug}.svg`), svg);
        generated++;
      }
    } else {
      // Fallback: generate SVG files
      const svg = generateOgSvg(title, description, ogConfig);
      writeFileSync(join(ogDir, `${slug}.svg`), svg);
      generated++;
    }
  }

  return {
    generated,
    skipped,
    outputDir: ogDir,
  };
}

// ── META TAG INJECTION ──────────────────────────────────

/**
 * Generate OG meta tag HTML for a page.
 */
export function generateOgMetaTags(
  route: PageRoute,
  config: TomeConfig,
  format: "png" | "svg" = "png",
): string {
  const fm = route.frontmatter as Record<string, unknown>;
  const baseUrl = (config.baseUrl || "").replace(/\/$/, "");
  const basePath = (config.basePath || "").replace(/\/$/, "");

  // Use custom ogImage if set
  let ogImageUrl: string;
  if (fm.ogImage) {
    ogImageUrl = String(fm.ogImage).startsWith("http")
      ? String(fm.ogImage)
      : `${baseUrl}${basePath}${String(fm.ogImage)}`;
  } else {
    const slug = route.id === "index" ? "index" : route.id.replace(/\//g, "-");
    ogImageUrl = `${baseUrl}${basePath}/og/${slug}.${format}`;
  }

  const title = route.frontmatter.title;
  const description = route.frontmatter.description || "";
  const pageUrl = `${baseUrl}${basePath}${route.urlPath}`;

  const tags: string[] = [
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />`,
  ];

  if (description) {
    tags.push(`<meta property="og:description" content="${escapeHtml(description)}" />`);
    tags.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  }

  return tags.join("\n    ");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
