import { describe, it, expect } from "vitest";
import { filterSlashCommands, SLASH_COMMAND_DEFS } from "./slash-commands-data.js";

describe("SLASH_COMMAND_DEFS", () => {
  it("exports a non-empty list of commands", () => {
    expect(SLASH_COMMAND_DEFS.length).toBeGreaterThan(0);
  });

  it("each command has required fields", () => {
    for (const cmd of SLASH_COMMAND_DEFS) {
      expect(cmd.name).toBeTruthy();
      expect(cmd.label).toBeTruthy();
      expect(cmd.description).toBeTruthy();
    }
  });

  it("includes heading commands", () => {
    const names = SLASH_COMMAND_DEFS.map((c) => c.name);
    expect(names).toContain("heading1");
    expect(names).toContain("heading2");
    expect(names).toContain("heading3");
  });

  it("includes component commands", () => {
    const names = SLASH_COMMAND_DEFS.map((c) => c.name);
    expect(names).toContain("callout");
    expect(names).toContain("tabs");
    expect(names).toContain("steps");
    expect(names).toContain("accordion");
    expect(names).toContain("card");
  });

  it("includes block commands", () => {
    const names = SLASH_COMMAND_DEFS.map((c) => c.name);
    expect(names).toContain("codeBlock");
    expect(names).toContain("bulletList");
    expect(names).toContain("orderedList");
    expect(names).toContain("blockquote");
    expect(names).toContain("horizontalRule");
  });

  it("component commands have insertContent", () => {
    const components = SLASH_COMMAND_DEFS.filter((c) => c.insertContent);
    expect(components.length).toBeGreaterThanOrEqual(5);
    for (const cmd of components) {
      expect(cmd.insertContent).toContain("<");
    }
  });

  it("built-in commands have tiptapCommand", () => {
    const builtins = SLASH_COMMAND_DEFS.filter((c) => c.tiptapCommand);
    expect(builtins.length).toBeGreaterThanOrEqual(8);
  });
});

describe("filterSlashCommands", () => {
  it("returns all commands when query is empty", () => {
    expect(filterSlashCommands("")).toEqual(SLASH_COMMAND_DEFS);
  });

  it("filters by name", () => {
    const results = filterSlashCommands("heading");
    expect(results.length).toBe(3);
  });

  it("filters by label", () => {
    const results = filterSlashCommands("Bullet");
    expect(results.length).toBe(1);
    expect(results[0].name).toBe("bulletList");
  });

  it("is case-insensitive", () => {
    const results = filterSlashCommands("CALLOUT");
    expect(results.length).toBe(1);
  });

  it("returns empty for no matches", () => {
    expect(filterSlashCommands("nonexistent")).toHaveLength(0);
  });
});
