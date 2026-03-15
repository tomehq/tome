import { describe, it, expect } from "vitest";
import { extractDocEntriesFromSource, generateMarkdown } from "./typedoc.js";
import type { DocEntry } from "./typedoc.js";

describe("typedoc", () => {
  describe("extractDocEntriesFromSource", () => {
    it("extracts a function with parameters and return type", () => {
      const source = `
/**
 * Adds two numbers together.
 * @param a The first number
 * @param b The second number
 * @returns The sum
 */
export function add(a: number, b: number): number {
  return a + b;
}
`;
      const entries = extractDocEntriesFromSource(source);
      expect(entries).toHaveLength(1);
      const fn = entries[0];
      expect(fn.name).toBe("add");
      expect(fn.kind).toBe("function");
      expect(fn.exported).toBe(true);
      expect(fn.description).toBe("Adds two numbers together.");
      expect(fn.parameters).toHaveLength(2);
      expect(fn.parameters![0]).toEqual({
        name: "a",
        type: "number",
        optional: false,
        description: "The first number",
      });
      expect(fn.parameters![1]).toEqual({
        name: "b",
        type: "number",
        optional: false,
        description: "The second number",
      });
      expect(fn.returnType).toBe("number");
      expect(fn.signature).toBe("add(a: number, b: number): number");
    });

    it("extracts an interface with members", () => {
      const source = `
export interface User {
  /** The user's name */
  name: string;
  /** Optional email */
  email?: string;
}
`;
      const entries = extractDocEntriesFromSource(source);
      expect(entries).toHaveLength(1);
      const iface = entries[0];
      expect(iface.name).toBe("User");
      expect(iface.kind).toBe("interface");
      expect(iface.exported).toBe(true);
      expect(iface.members).toHaveLength(2);
      expect(iface.members![0]).toEqual({
        name: "name",
        type: "string",
        optional: false,
        description: "The user's name",
      });
      expect(iface.members![1]).toEqual({
        name: "email",
        type: "string",
        optional: true,
        description: "Optional email",
      });
    });

    it("extracts a type alias", () => {
      const source = `
/** A string or number identifier */
export type ID = string | number;
`;
      const entries = extractDocEntriesFromSource(source);
      expect(entries).toHaveLength(1);
      const typeAlias = entries[0];
      expect(typeAlias.name).toBe("ID");
      expect(typeAlias.kind).toBe("type");
      expect(typeAlias.exported).toBe(true);
      expect(typeAlias.description).toBe("A string or number identifier");
      expect(typeAlias.signature).toBe("type ID = string | number");
    });

    it("extracts a class with methods and properties", () => {
      const source = `
/** A greeter class */
export class Greeter {
  /** The greeting prefix */
  prefix: string;
  /** Greet someone */
  greet(name: string): string {
    return this.prefix + name;
  }
}
`;
      const entries = extractDocEntriesFromSource(source);
      expect(entries).toHaveLength(1);
      const cls = entries[0];
      expect(cls.name).toBe("Greeter");
      expect(cls.kind).toBe("class");
      expect(cls.exported).toBe(true);
      expect(cls.description).toBe("A greeter class");
      expect(cls.members).toHaveLength(2);
      expect(cls.members![0].name).toBe("prefix");
      expect(cls.members![0].type).toBe("string");
      expect(cls.members![1].name).toBe("greet");
      expect(cls.members![1].type).toBe("(name: string) => string");
    });

    it("extracts an enum", () => {
      const source = `
/** Log levels */
export enum LogLevel {
  /** Debug level */
  Debug = 0,
  /** Info level */
  Info = 1,
  /** Error level */
  Error = 2,
}
`;
      const entries = extractDocEntriesFromSource(source);
      expect(entries).toHaveLength(1);
      const enumEntry = entries[0];
      expect(enumEntry.name).toBe("LogLevel");
      expect(enumEntry.kind).toBe("enum");
      expect(enumEntry.exported).toBe(true);
      expect(enumEntry.description).toBe("Log levels");
      expect(enumEntry.members).toHaveLength(3);
      expect(enumEntry.members![0]).toEqual({
        name: "Debug",
        type: "0",
        optional: false,
        description: "Debug level",
      });
    });

    it("extracts JSDoc comments as descriptions", () => {
      const source = `
/**
 * Parses a configuration file.
 *
 * This supports JSON and YAML formats.
 */
export function parseConfig(path: string): object {
  return {};
}
`;
      const entries = extractDocEntriesFromSource(source);
      expect(entries).toHaveLength(1);
      expect(entries[0].description).toBe("Parses a configuration file.\n\nThis supports JSON and YAML formats.");
    });

    it("only includes exported declarations when filtering", () => {
      const source = `
/** Internal helper */
function helper(): void {}

/** Public API */
export function publicFn(): void {}

interface InternalType {
  x: number;
}

export interface PublicType {
  y: number;
}
`;
      const entries = extractDocEntriesFromSource(source);
      // All declarations are extracted, but `exported` flag distinguishes them
      const exported = entries.filter((e) => e.exported);
      const nonExported = entries.filter((e) => !e.exported);
      expect(exported).toHaveLength(2);
      expect(exported.map((e) => e.name).sort()).toEqual(["PublicType", "publicFn"]);
      expect(nonExported).toHaveLength(2);
      expect(nonExported.map((e) => e.name).sort()).toEqual(["InternalType", "helper"]);
    });

    it("extracts optional function parameters", () => {
      const source = `
export function greet(name: string, greeting?: string): string {
  return (greeting || "Hello") + " " + name;
}
`;
      const entries = extractDocEntriesFromSource(source);
      expect(entries[0].parameters![0].optional).toBe(false);
      expect(entries[0].parameters![1].optional).toBe(true);
    });

    it("extracts a constant variable", () => {
      const source = `
/** Default timeout in ms */
export const TIMEOUT: number = 5000;
`;
      const entries = extractDocEntriesFromSource(source);
      expect(entries).toHaveLength(1);
      expect(entries[0].name).toBe("TIMEOUT");
      expect(entries[0].kind).toBe("constant");
      expect(entries[0].exported).toBe(true);
      expect(entries[0].description).toBe("Default timeout in ms");
    });
  });

  describe("generateMarkdown", () => {
    it("produces correct frontmatter", () => {
      const entry: DocEntry = {
        name: "parseConfig",
        kind: "function",
        description: "Parses a configuration file.",
        signature: "parseConfig(path: string): object",
        parameters: [{ name: "path", type: "string", optional: false, description: "File path" }],
        returnType: "object",
        exported: true,
      };
      const md = generateMarkdown(entry);
      expect(md).toContain("---\ntitle: parseConfig\ndescription: Parses a configuration file.\n---");
    });

    it("produces a parameter table for functions", () => {
      const entry: DocEntry = {
        name: "connect",
        kind: "function",
        description: "Connect to a database.",
        signature: "connect(host: string, port?: number): Promise<void>",
        parameters: [
          { name: "host", type: "string", optional: false, description: "Database host" },
          { name: "port", type: "number", optional: true, description: "Port number" },
        ],
        returnType: "Promise<void>",
        exported: true,
      };
      const md = generateMarkdown(entry);
      expect(md).toContain("### Parameters");
      expect(md).toContain("| Name | Type | Required | Description |");
      expect(md).toContain("| host | `string` | Yes | Database host |");
      expect(md).toContain("| port | `number` | No | Port number |");
    });

    it("produces returns section for functions", () => {
      const entry: DocEntry = {
        name: "add",
        kind: "function",
        signature: "add(a: number, b: number): number",
        parameters: [],
        returnType: "number",
        exported: true,
      };
      const md = generateMarkdown(entry);
      expect(md).toContain("### Returns");
      expect(md).toContain("`number`");
    });

    it("produces properties table for interfaces", () => {
      const entry: DocEntry = {
        name: "User",
        kind: "interface",
        description: "A user object.",
        members: [
          { name: "name", type: "string", optional: false, description: "User name" },
          { name: "age", type: "number", optional: true, description: "User age" },
        ],
        exported: true,
      };
      const md = generateMarkdown(entry);
      expect(md).toContain("## interface `User`");
      expect(md).toContain("### Properties");
      expect(md).toContain("| name | `string` | Yes | User name |");
      expect(md).toContain("| age | `number` | No | User age |");
    });

    it("produces values table for enums", () => {
      const entry: DocEntry = {
        name: "Color",
        kind: "enum",
        members: [
          { name: "Red", type: "0", optional: false },
          { name: "Green", type: "1", optional: false },
        ],
        exported: true,
      };
      const md = generateMarkdown(entry);
      expect(md).toContain("## enum `Color`");
      expect(md).toContain("### Values");
      expect(md).toContain("| Red | `0` | Yes |");
    });

    it("generates markdown for type alias with signature", () => {
      const entry: DocEntry = {
        name: "ID",
        kind: "type",
        description: "A unique identifier.",
        signature: "type ID = string | number",
        exported: true,
      };
      const md = generateMarkdown(entry);
      expect(md).toContain("## `type ID = string | number`");
      expect(md).toContain("A unique identifier.");
    });
  });
});
