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
