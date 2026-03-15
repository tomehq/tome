import { describe, it, expect } from "vitest";
import { TomeConfigSchema, defineConfig } from "./config.js";

describe("TomeConfigSchema", () => {
  it("applies defaults when given an empty object", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.name).toBe("My Docs");
    expect(result.theme.preset).toBe("amber");
    expect(result.theme.mode).toBe("auto");
    expect(result.search.provider).toBe("local");
    expect(result.navigation).toEqual([]);
  });

  it("preserves provided values over defaults", () => {
    const result = TomeConfigSchema.parse({
      name: "Acme Docs",
      theme: { preset: "editorial", mode: "dark", accent: "#ff6b4a" },
    });
    expect(result.name).toBe("Acme Docs");
    expect(result.theme.preset).toBe("editorial");
    expect(result.theme.mode).toBe("dark");
    expect(result.theme.accent).toBe("#ff6b4a");
  });

  it("rejects an invalid theme preset", () => {
    expect(() => TomeConfigSchema.parse({ theme: { preset: "neon" } })).toThrow();
  });

  it("rejects a malformed accent hex", () => {
    expect(() => TomeConfigSchema.parse({ theme: { accent: "not-a-hex" } })).toThrow();
  });

  it("accepts a valid accent hex", () => {
    const result = TomeConfigSchema.parse({ theme: { accent: "#a1b2c3" } });
    expect(result.theme.accent).toBe("#a1b2c3");
  });

  it("rejects invalid theme mode", () => {
    expect(() => TomeConfigSchema.parse({ theme: { mode: "rainbow" } })).toThrow();
  });

  it("handles navigation groups correctly", () => {
    const result = TomeConfigSchema.parse({
      navigation: [{ group: "Getting Started", pages: ["index", "quickstart"] }],
    });
    expect(result.navigation).toHaveLength(1);
    expect(result.navigation[0].group).toBe("Getting Started");
    expect(result.navigation[0].pages).toEqual(["index", "quickstart"]);
  });

  it("supports nested navigation groups", () => {
    const result = TomeConfigSchema.parse({
      navigation: [
        {
          group: "API",
          pages: [
            "api/overview",
            { group: "Endpoints", pages: ["api/users", "api/posts"] },
          ],
        },
      ],
    });
    expect(result.navigation[0].pages).toHaveLength(2);
  });

  it("validates search config", () => {
    const result = TomeConfigSchema.parse({
      search: { provider: "algolia", appId: "MY_APP", apiKey: "MY_KEY", indexName: "docs" },
    });
    expect(result.search.provider).toBe("algolia");
    expect(result.search.appId).toBe("MY_APP");
  });

  it("rejects invalid search provider", () => {
    expect(() => TomeConfigSchema.parse({ search: { provider: "elastic" } })).toThrow();
  });

  it("allows topNav links", () => {
    const result = TomeConfigSchema.parse({
      topNav: [{ label: "Blog", href: "/blog" }],
    });
    expect(result.topNav).toEqual([{ label: "Blog", href: "/blog" }]);
  });

  it("applies toc defaults when not provided", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.toc.enabled).toBe(true);
    expect(result.toc.depth).toBe(3);
  });

  it("accepts custom toc config", () => {
    const result = TomeConfigSchema.parse({
      toc: { enabled: false, depth: 2 },
    });
    expect(result.toc.enabled).toBe(false);
    expect(result.toc.depth).toBe(2);
  });

  it("accepts toc with only depth", () => {
    const result = TomeConfigSchema.parse({
      toc: { depth: 4 },
    });
    expect(result.toc.enabled).toBe(true);
    expect(result.toc.depth).toBe(4);
  });

  it("rejects toc depth outside 2-4 range", () => {
    expect(() => TomeConfigSchema.parse({ toc: { depth: 1 } })).toThrow();
    expect(() => TomeConfigSchema.parse({ toc: { depth: 5 } })).toThrow();
  });

  it("accepts editLink config", () => {
    const result = TomeConfigSchema.parse({
      editLink: { repo: "org/repo", branch: "develop", dir: "docs" },
    });
    expect(result.editLink?.repo).toBe("org/repo");
    expect(result.editLink?.branch).toBe("develop");
    expect(result.editLink?.dir).toBe("docs");
  });

  it("applies editLink defaults for branch and dir", () => {
    const result = TomeConfigSchema.parse({
      editLink: { repo: "org/repo" },
    });
    expect(result.editLink?.repo).toBe("org/repo");
    expect(result.editLink?.branch).toBe("main");
    expect(result.editLink?.dir).toBe("");
  });

  it("allows omitting editLink entirely", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.editLink).toBeUndefined();
  });

  it("defaults strictLinks to false", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.strictLinks).toBe(false);
  });

  it("accepts strictLinks: true", () => {
    const result = TomeConfigSchema.parse({ strictLinks: true });
    expect(result.strictLinks).toBe(true);
  });

  it("defaults lastUpdated to true", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.lastUpdated).toBe(true);
  });

  it("accepts lastUpdated: false", () => {
    const result = TomeConfigSchema.parse({ lastUpdated: false });
    expect(result.lastUpdated).toBe(false);
  });

  it("allows plugins config with remark and rehype arrays", () => {
    const result = TomeConfigSchema.parse({
      plugins: {
        remark: ["remark-math", ["remark-directive", { option: true }]],
        rehype: ["rehype-katex"],
      },
    });
    expect(result.plugins?.remark).toHaveLength(2);
    expect(result.plugins?.rehype).toHaveLength(1);
  });

  it("defaults plugins to undefined when not provided", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.plugins).toBeUndefined();
  });

  it("allows empty plugin arrays", () => {
    const result = TomeConfigSchema.parse({
      plugins: { remark: [], rehype: [] },
    });
    expect(result.plugins?.remark).toHaveLength(0);
    expect(result.plugins?.rehype).toHaveLength(0);
  });
});

describe("defineConfig", () => {
  it("is an identity pass-through", () => {
    const input = { name: "My Docs", theme: { preset: "amber" as const } };
    expect(defineConfig(input)).toBe(input);
  });

  it("accepts partial configs", () => {
    const cfg = defineConfig({ name: "Test" });
    expect(cfg.name).toBe("Test");
    expect(cfg.theme).toBeUndefined();
  });
});

describe("BannerSchema", () => {
  it("accepts banner config with text, link, and dismissible", () => {
    const result = TomeConfigSchema.parse({
      banner: { text: "New release!", link: "/changelog", dismissible: false },
    });
    expect(result.banner?.text).toBe("New release!");
    expect(result.banner?.link).toBe("/changelog");
    expect(result.banner?.dismissible).toBe(false);
  });

  it("accepts banner with only text", () => {
    const result = TomeConfigSchema.parse({
      banner: { text: "Hello world" },
    });
    expect(result.banner?.text).toBe("Hello world");
    expect(result.banner?.link).toBeUndefined();
  });

  it("allows omitting banner entirely", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.banner).toBeUndefined();
  });

  it("applies dismissible default of true when not specified", () => {
    const result = TomeConfigSchema.parse({
      banner: { text: "Notice" },
    });
    expect(result.banner?.dismissible).toBe(true);
  });
});

describe("Math config", () => {
  it("defaults math to false", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.math).toBe(false);
  });

  it("accepts math: true", () => {
    const result = TomeConfigSchema.parse({ math: true });
    expect(result.math).toBe(true);
  });
});

describe("SandboxSchema", () => {
  it("is undefined by default when not provided", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.sandbox).toBeUndefined();
  });

  it("parses sandbox with defaults", () => {
    const result = TomeConfigSchema.parse({ sandbox: { enabled: true } });
    expect(result.sandbox?.enabled).toBe(true);
    expect(result.sandbox?.allowedExpressions).toEqual([]);
  });

  it("accepts custom allowedExpressions", () => {
    const result = TomeConfigSchema.parse({
      sandbox: { enabled: true, allowedExpressions: ["console", "Math"] },
    });
    expect(result.sandbox?.enabled).toBe(true);
    expect(result.sandbox?.allowedExpressions).toEqual(["console", "Math"]);
  });
});

describe("SocialLinksSchema", () => {
  it("accepts a valid social link array", () => {
    const result = TomeConfigSchema.parse({
      socialLinks: [
        { platform: "github", url: "https://github.com/example/repo" },
        { platform: "twitter", url: "https://twitter.com/example", label: "Follow us" },
        { platform: "discord", url: "https://discord.gg/example" },
      ],
    });
    expect(result.socialLinks).toHaveLength(3);
    expect(result.socialLinks![0].platform).toBe("github");
    expect(result.socialLinks![0].url).toBe("https://github.com/example/repo");
    expect(result.socialLinks![1].label).toBe("Follow us");
  });

  it("rejects an invalid URL", () => {
    expect(() => TomeConfigSchema.parse({
      socialLinks: [{ platform: "github", url: "not-a-url" }],
    })).toThrow();
  });

  it("rejects an invalid platform", () => {
    expect(() => TomeConfigSchema.parse({
      socialLinks: [{ platform: "facebook", url: "https://facebook.com/example" }],
    })).toThrow();
  });

  it("accepts an empty array", () => {
    const result = TomeConfigSchema.parse({ socialLinks: [] });
    expect(result.socialLinks).toEqual([]);
  });

  it("allows omitting socialLinks entirely (undefined)", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.socialLinks).toBeUndefined();
  });

  it("accepts a custom platform with an icon", () => {
    const result = TomeConfigSchema.parse({
      socialLinks: [
        { platform: "custom", url: "https://example.com", label: "Website", icon: "M0 0h16v16H0z" },
      ],
    });
    expect(result.socialLinks![0].platform).toBe("custom");
    expect(result.socialLinks![0].icon).toBe("M0 0h16v16H0z");
  });
});

describe("RedirectSchema", () => {
  it("defaults redirects to empty array", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.redirects).toEqual([]);
  });

  it("accepts valid redirect entries", () => {
    const result = TomeConfigSchema.parse({
      redirects: [
        { from: "/old-page", to: "/new-page" },
        { from: "/legacy/docs", to: "/docs" },
      ],
    });
    expect(result.redirects).toHaveLength(2);
    expect(result.redirects[0].from).toBe("/old-page");
    expect(result.redirects[0].to).toBe("/new-page");
  });

  it("rejects redirect missing required fields", () => {
    expect(() => TomeConfigSchema.parse({
      redirects: [{ from: "/old" }],
    })).toThrow();
  });

  it("rejects redirect with extra fields (strict mode)", () => {
    expect(() => TomeConfigSchema.parse({
      redirects: [{ from: "/old", to: "/new", status: 302 }],
    })).toThrow();
  });
});

describe("tomePlugins config", () => {
  it("defaults tomePlugins to undefined when not provided", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.tomePlugins).toBeUndefined();
  });

  it("accepts an empty tomePlugins array", () => {
    const result = TomeConfigSchema.parse({ tomePlugins: [] });
    expect(result.tomePlugins).toEqual([]);
  });

  it("accepts tomePlugins with plugin objects", () => {
    const plugin = { name: "test-plugin", hooks: {} };
    const result = TomeConfigSchema.parse({ tomePlugins: [plugin] });
    expect(result.tomePlugins).toHaveLength(1);
    expect(result.tomePlugins![0].name).toBe("test-plugin");
  });
});

describe("OverridesSchema", () => {
  it("accepts undefined overrides (not provided)", () => {
    const result = TomeConfigSchema.parse({});
    expect(result.overrides).toBeUndefined();
  });

  it("accepts empty overrides object", () => {
    const result = TomeConfigSchema.parse({ overrides: {} });
    expect(result.overrides).toEqual({});
  });

  it("accepts partial overrides (just Header)", () => {
    const result = TomeConfigSchema.parse({
      overrides: { Header: "./components/MyHeader.tsx" },
    });
    expect(result.overrides?.Header).toBe("./components/MyHeader.tsx");
    expect(result.overrides?.Footer).toBeUndefined();
    expect(result.overrides?.Sidebar).toBeUndefined();
    expect(result.overrides?.Toc).toBeUndefined();
    expect(result.overrides?.PageFooter).toBeUndefined();
  });

  it("accepts all override slots", () => {
    const result = TomeConfigSchema.parse({
      overrides: {
        Header: "./MyHeader.tsx",
        Footer: "./MyFooter.tsx",
        Sidebar: "./MySidebar.tsx",
        Toc: "./MyToc.tsx",
        PageFooter: "./MyPageFooter.tsx",
      },
    });
    expect(result.overrides?.Header).toBe("./MyHeader.tsx");
    expect(result.overrides?.Footer).toBe("./MyFooter.tsx");
    expect(result.overrides?.Sidebar).toBe("./MySidebar.tsx");
    expect(result.overrides?.Toc).toBe("./MyToc.tsx");
    expect(result.overrides?.PageFooter).toBe("./MyPageFooter.tsx");
  });
});

describe("I18nSchema localeDirs (RTL support)", () => {
  it("accepts localeDirs with valid ltr/rtl values", () => {
    const result = TomeConfigSchema.parse({
      i18n: {
        defaultLocale: "en",
        locales: ["en", "ar", "he"],
        localeDirs: { ar: "rtl", he: "rtl" },
      },
    });
    expect(result.i18n?.localeDirs).toEqual({ ar: "rtl", he: "rtl" });
  });

  it("accepts localeDirs with ltr values", () => {
    const result = TomeConfigSchema.parse({
      i18n: {
        defaultLocale: "en",
        locales: ["en", "fr"],
        localeDirs: { en: "ltr", fr: "ltr" },
      },
    });
    expect(result.i18n?.localeDirs).toEqual({ en: "ltr", fr: "ltr" });
  });

  it("rejects invalid direction values in localeDirs", () => {
    expect(() => TomeConfigSchema.parse({
      i18n: {
        defaultLocale: "en",
        locales: ["en", "ar"],
        localeDirs: { ar: "bidi" },
      },
    })).toThrow();
  });

  it("allows omitting localeDirs entirely", () => {
    const result = TomeConfigSchema.parse({
      i18n: {
        defaultLocale: "en",
        locales: ["en", "ar"],
      },
    });
    expect(result.i18n?.localeDirs).toBeUndefined();
  });

  it("accepts empty localeDirs object", () => {
    const result = TomeConfigSchema.parse({
      i18n: {
        defaultLocale: "en",
        locales: ["en"],
        localeDirs: {},
      },
    });
    expect(result.i18n?.localeDirs).toEqual({});
  });
});
