import { describe, it, expect } from "vitest";
import {
  generateOgSvg,
  buildOgTemplate,
  buildOgConfig,
  generateOgMetaTags,
} from "./og-image.js";
import type { OgImageConfig } from "./og-image.js";
import type { PageRoute } from "./routes.js";
import type { TomeConfig } from "./config.js";

const defaultConfig: OgImageConfig = {
  siteName: "My Docs",
  accentColor: "#e8a845",
  backgroundColor: "#1a1a1a",
  textColor: "#ffffff",
  secondaryTextColor: "#a0a0a0",
};

const mockRoute = (overrides: Partial<PageRoute> = {}): PageRoute => ({
  id: "getting-started",
  filePath: "getting-started.md",
  absolutePath: "/pages/getting-started.md",
  urlPath: "/getting-started",
  frontmatter: {
    title: "Getting Started",
    description: "Learn how to get started with Tome",
    hidden: false,
  },
  isMdx: false,
  ...overrides,
});

const mockTomeConfig = (overrides: Partial<TomeConfig> = {}): TomeConfig => ({
  name: "Test Docs",
  theme: { preset: "amber", mode: "auto" },
  navigation: [],
  search: { provider: "local" },
  toc: { enabled: true, depth: 3 },
  strictLinks: false,
  lastUpdated: true,
  ...overrides,
} as TomeConfig);

// ── generateOgSvg ──────────────────────────────────────

describe("generateOgSvg", () => {
  it("generates valid SVG with title", () => {
    const svg = generateOgSvg("Hello World", undefined, defaultConfig);
    expect(svg).toContain("<svg");
    expect(svg).toContain('width="1200"');
    expect(svg).toContain('height="630"');
    expect(svg).toContain("Hello World");
  });

  it("includes site name", () => {
    const svg = generateOgSvg("Title", undefined, defaultConfig);
    expect(svg).toContain("My Docs");
  });

  it("includes description when provided", () => {
    const svg = generateOgSvg("Title", "A great description", defaultConfig);
    expect(svg).toContain("A great description");
  });

  it("omits description text element when not provided", () => {
    const svg = generateOgSvg("Title", undefined, defaultConfig);
    // Should not have a description text element (only 3 text elements: siteName, title, footer)
    const textCount = (svg.match(/<text /g) || []).length;
    expect(textCount).toBe(3); // siteName, title, footer
  });

  it("includes description text element when provided", () => {
    const svg = generateOgSvg("Title", "Description here", defaultConfig);
    const textCount = (svg.match(/<text /g) || []).length;
    expect(textCount).toBe(4); // siteName, title, description, footer
  });

  it("uses accent color for bar", () => {
    const svg = generateOgSvg("Title", undefined, defaultConfig);
    expect(svg).toContain("#e8a845");
  });

  it("truncates long titles", () => {
    const longTitle = "A".repeat(100);
    const svg = generateOgSvg(longTitle, undefined, defaultConfig);
    expect(svg).toContain("...");
    expect(svg).not.toContain("A".repeat(100));
  });

  it("truncates long descriptions", () => {
    const longDesc = "B".repeat(200);
    const svg = generateOgSvg("Title", longDesc, defaultConfig);
    expect(svg).toContain("...");
    expect(svg).not.toContain("B".repeat(200));
  });

  it("escapes special HTML characters", () => {
    const svg = generateOgSvg("Title & <Test>", 'Desc "quoted"', defaultConfig);
    expect(svg).toContain("&amp;");
    expect(svg).toContain("&lt;");
    expect(svg).toContain("&gt;");
    expect(svg).toContain("&quot;");
  });
});

// ── buildOgTemplate ────────────────────────────────────

describe("buildOgTemplate", () => {
  it("returns a div element tree", () => {
    const template = buildOgTemplate("Title", undefined, defaultConfig);
    expect(template.type).toBe("div");
    expect(template.props).toBeDefined();
  });

  it("includes title in children", () => {
    const template = buildOgTemplate("My Title", undefined, defaultConfig);
    const children = (template.props as any).children as any[];
    const titleChild = children.find(
      (c: any) => c?.props?.children === "My Title"
    );
    expect(titleChild).toBeDefined();
  });

  it("includes site name in children", () => {
    const template = buildOgTemplate("Title", undefined, defaultConfig);
    const children = (template.props as any).children as any[];
    const siteNameChild = children.find(
      (c: any) => c?.props?.children === "My Docs"
    );
    expect(siteNameChild).toBeDefined();
  });

  it("includes description when provided", () => {
    const template = buildOgTemplate("Title", "My description", defaultConfig);
    const children = (template.props as any).children as any[];
    const descChild = children.find(
      (c: any) => c?.props?.children === "My description"
    );
    expect(descChild).toBeDefined();
  });

  it("truncates long titles", () => {
    const longTitle = "A".repeat(100);
    const template = buildOgTemplate(longTitle, undefined, defaultConfig);
    const children = (template.props as any).children as any[];
    const titleChild = children.find(
      (c: any) => typeof c?.props?.children === "string" && c.props.children.endsWith("...")
    );
    expect(titleChild).toBeDefined();
  });
});

// ── buildOgConfig ──────────────────────────────────────

describe("buildOgConfig", () => {
  it("uses site name from config", () => {
    const ogConfig = buildOgConfig(mockTomeConfig());
    expect(ogConfig.siteName).toBe("Test Docs");
  });

  it("uses amber preset colors by default", () => {
    const ogConfig = buildOgConfig(mockTomeConfig());
    expect(ogConfig.accentColor).toBe("#e8a845");
  });

  it("uses custom accent color when provided", () => {
    const ogConfig = buildOgConfig(mockTomeConfig({
      theme: { preset: "amber", mode: "auto", accent: "#ff0000" },
    }));
    expect(ogConfig.accentColor).toBe("#ff0000");
  });

  it("uses dark theme colors for auto mode", () => {
    const ogConfig = buildOgConfig(mockTomeConfig({
      theme: { preset: "amber", mode: "auto" },
    }));
    expect(ogConfig.backgroundColor).toBe("#1a1a1a");
    expect(ogConfig.textColor).toBe("#ffffff");
  });

  it("uses light theme colors for light mode", () => {
    const ogConfig = buildOgConfig(mockTomeConfig({
      theme: { preset: "amber", mode: "light" },
    }));
    expect(ogConfig.backgroundColor).toBe("#ffffff");
    expect(ogConfig.textColor).toBe("#111827");
  });

  it("uses editorial preset colors", () => {
    const ogConfig = buildOgConfig(mockTomeConfig({
      theme: { preset: "editorial", mode: "dark" },
    }));
    expect(ogConfig.accentColor).toBe("#2563eb");
  });

  it("includes baseUrl when provided", () => {
    const ogConfig = buildOgConfig(mockTomeConfig({
      baseUrl: "https://docs.example.com",
    }));
    expect(ogConfig.baseUrl).toBe("https://docs.example.com");
  });
});

// ── generateOgMetaTags ─────────────────────────────────

describe("generateOgMetaTags", () => {
  it("generates og:title meta tag", () => {
    const tags = generateOgMetaTags(mockRoute(), mockTomeConfig());
    expect(tags).toContain('og:title');
    expect(tags).toContain("Getting Started");
  });

  it("generates og:image meta tag", () => {
    const tags = generateOgMetaTags(mockRoute(), mockTomeConfig());
    expect(tags).toContain('og:image');
    expect(tags).toContain("getting-started.png");
  });

  it("generates twitter:card meta tag", () => {
    const tags = generateOgMetaTags(mockRoute(), mockTomeConfig());
    expect(tags).toContain('twitter:card');
    expect(tags).toContain("summary_large_image");
  });

  it("generates og:description when available", () => {
    const tags = generateOgMetaTags(mockRoute(), mockTomeConfig());
    expect(tags).toContain('og:description');
    expect(tags).toContain("Learn how to get started");
  });

  it("uses custom ogImage from frontmatter", () => {
    const route = mockRoute({
      frontmatter: {
        title: "Custom",
        hidden: false,
        ogImage: "/images/custom-og.png",
      },
    });
    const tags = generateOgMetaTags(route, mockTomeConfig());
    expect(tags).toContain("/images/custom-og.png");
    expect(tags).not.toContain("/og/");
  });

  it("uses absolute URL for external ogImage", () => {
    const route = mockRoute({
      frontmatter: {
        title: "External",
        hidden: false,
        ogImage: "https://cdn.example.com/og.png",
      },
    });
    const tags = generateOgMetaTags(route, mockTomeConfig());
    expect(tags).toContain("https://cdn.example.com/og.png");
  });

  it("includes baseUrl in image paths", () => {
    const tags = generateOgMetaTags(
      mockRoute(),
      mockTomeConfig({ baseUrl: "https://docs.example.com" }),
    );
    expect(tags).toContain("https://docs.example.com/og/getting-started.png");
  });

  it("uses SVG format when specified", () => {
    const tags = generateOgMetaTags(mockRoute(), mockTomeConfig(), "svg");
    expect(tags).toContain("getting-started.svg");
  });

  it("generates og:url meta tag", () => {
    const tags = generateOgMetaTags(
      mockRoute(),
      mockTomeConfig({ baseUrl: "https://docs.example.com" }),
    );
    expect(tags).toContain('og:url');
    expect(tags).toContain("https://docs.example.com/getting-started");
  });

  it("generates image dimension meta tags", () => {
    const tags = generateOgMetaTags(mockRoute(), mockTomeConfig());
    expect(tags).toContain('og:image:width');
    expect(tags).toContain("1200");
    expect(tags).toContain('og:image:height');
    expect(tags).toContain("630");
  });

  it("handles index route slug", () => {
    const route = mockRoute({
      id: "index",
      urlPath: "/",
      frontmatter: { title: "Home", hidden: false },
    });
    const tags = generateOgMetaTags(route, mockTomeConfig());
    expect(tags).toContain("index.png");
  });

  it("handles nested route slugs", () => {
    const route = mockRoute({
      id: "api/endpoints",
      urlPath: "/api/endpoints",
      frontmatter: { title: "API Endpoints", hidden: false },
    });
    const tags = generateOgMetaTags(route, mockTomeConfig());
    expect(tags).toContain("api-endpoints.png");
  });

  it("escapes special characters in title", () => {
    const route = mockRoute({
      frontmatter: { title: 'Title & "Quotes"', hidden: false },
    });
    const tags = generateOgMetaTags(route, mockTomeConfig());
    expect(tags).toContain("&amp;");
    expect(tags).toContain("&quot;");
  });
});
