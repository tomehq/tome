import { describe, it, expect } from "vitest";
import { THEME_PRESETS } from "./presets.js";
import type { PresetName } from "./presets.js";

const TOKEN_KEYS = [
  "bg", "sf", "sfH", "bd",
  "tx", "tx2", "txM",
  "ac", "acD", "acT",
  "cdBg", "cdTx", "sbBg", "hdBg",
] as const;

const FONT_KEYS = ["heading", "body", "code"] as const;

const PRESET_NAMES: PresetName[] = ["amber", "editorial", "cipher", "mint"];

describe("THEME_PRESETS", () => {
  it("contains all presets", () => {
    expect(THEME_PRESETS).toHaveProperty("amber");
    expect(THEME_PRESETS).toHaveProperty("editorial");
    expect(THEME_PRESETS).toHaveProperty("cipher");
    expect(THEME_PRESETS).toHaveProperty("mint");
  });

  for (const name of PRESET_NAMES) {
    describe(`${name} preset`, () => {
      it("has dark and light token sets", () => {
        expect(THEME_PRESETS[name]).toHaveProperty("dark");
        expect(THEME_PRESETS[name]).toHaveProperty("light");
      });

      for (const mode of ["dark", "light"] as const) {
        describe(`${mode} tokens`, () => {
          it(`has all 14 token properties`, () => {
            const tokens = THEME_PRESETS[name][mode];
            for (const key of TOKEN_KEYS) {
              expect(tokens).toHaveProperty(key);
              expect(typeof tokens[key]).toBe("string");
              expect(tokens[key].length).toBeGreaterThan(0);
            }
          });

          it("has exactly 14 token properties", () => {
            const tokens = THEME_PRESETS[name][mode];
            expect(Object.keys(tokens)).toHaveLength(14);
          });
        });
      }

      describe("fonts", () => {
        it("has heading, body, and code font families defined", () => {
          const fonts = THEME_PRESETS[name].fonts;
          for (const key of FONT_KEYS) {
            expect(fonts).toHaveProperty(key);
            expect(typeof fonts[key]).toBe("string");
            expect(fonts[key].length).toBeGreaterThan(0);
          }
        });
      });
    });
  }
});
