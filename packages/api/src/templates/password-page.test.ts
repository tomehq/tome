import { describe, it, expect } from "vitest";
import { passwordPageHtml } from "./password-page.js";

describe("passwordPageHtml", () => {
  it("returns valid HTML with form", () => {
    const html = passwordPageHtml("my-docs");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("Password Required");
    expect(html).toContain('type="password"');
    expect(html).toContain('name="password"');
    expect(html).toContain("my-docs");
  });

  it("includes the slug in the form action", () => {
    const html = passwordPageHtml("test-project");
    expect(html).toContain("/api/sites/test-project/authenticate");
  });

  it("shows error message when provided", () => {
    const html = passwordPageHtml("my-docs", "Wrong password");
    expect(html).toContain("Wrong password");
    expect(html).toContain('class="error"');
  });

  it("does not show error div when no error", () => {
    const html = passwordPageHtml("my-docs");
    expect(html).not.toContain('class="error"');
  });
});
