import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { buildSystemPrompt, getDefaultModel } from "../ai-api.js";

describe("buildSystemPrompt", () => {
  it("returns base instruction when no context", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("documentation assistant");
  });

  it("includes context when provided", () => {
    const prompt = buildSystemPrompt("Some doc content");
    expect(prompt).toContain("Some doc content");
    expect(prompt).toContain("Documentation:");
  });

  it("truncates long context", () => {
    const longContext = "x".repeat(200000);
    const prompt = buildSystemPrompt(longContext);
    expect(prompt.length).toBeLessThan(200000);
    expect(prompt).toContain("[Documentation truncated...]");
  });

  it("uses custom instruction when provided", () => {
    const prompt = buildSystemPrompt("docs", "You are a search assistant.");
    expect(prompt).toContain("You are a search assistant.");
    expect(prompt).not.toContain("documentation assistant");
  });
});

describe("getDefaultModel", () => {
  it("returns gpt-4o-mini for openai", () => {
    expect(getDefaultModel("openai")).toBe("gpt-4o-mini");
  });

  it("returns claude model for anthropic", () => {
    expect(getDefaultModel("anthropic")).toContain("claude");
  });

  it("returns claude model for custom provider", () => {
    expect(getDefaultModel("custom")).toContain("claude");
  });
});
