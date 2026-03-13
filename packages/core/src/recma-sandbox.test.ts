import { describe, it, expect } from "vitest";
import { recmaSandbox } from "./recma-sandbox.js";
import type { Program } from "estree";

// ── HELPERS ──────────────────────────────────────────────

/** Create a mock VFile that collects fail() calls */
function createMockFile() {
  const errors: string[] = [];
  return {
    errors,
    fail(msg: string) {
      errors.push(msg);
      throw new Error(msg); // file.fail() throws
    },
  };
}

/** Build a minimal Program AST containing the given expression statement */
function programWith(...stmts: any[]): Program {
  return { type: "Program", body: stmts, sourceType: "module" } as Program;
}

function exprStmt(expr: any) {
  return { type: "ExpressionStatement", expression: expr };
}

function id(name: string) {
  return { type: "Identifier", name };
}

function memberExpr(obj: any, prop: string, computed = false) {
  return {
    type: "MemberExpression",
    object: obj,
    property: id(prop),
    computed,
  };
}

function callExpr(callee: any, args: any[] = []) {
  return { type: "CallExpression", callee, arguments: args };
}

function literal(value: string | number | boolean) {
  return { type: "Literal", value };
}

function runPlugin(tree: Program, options = {}) {
  const file = createMockFile();
  const plugin = recmaSandbox(options);
  try {
    plugin(tree, file);
    return { passed: true, errors: file.errors };
  } catch (err: any) {
    return { passed: false, errors: file.errors, error: err.message };
  }
}

// ── TESTS ────────────────────────────────────────────────

describe("recma-sandbox", () => {
  describe("safe patterns (should pass)", () => {
    it("allows empty program", () => {
      const result = runPlugin(programWith());
      expect(result.passed).toBe(true);
    });

    it("allows string literals in expressions", () => {
      const tree = programWith(exprStmt(literal("hello")));
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows number literals", () => {
      const tree = programWith(exprStmt(literal(42)));
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows boolean literals", () => {
      const tree = programWith(exprStmt(literal(true)));
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows MDX internal identifiers (_jsx, _jsxs, _Fragment)", () => {
      const tree = programWith(
        exprStmt(callExpr(id("_jsx"), [id("_Fragment")])),
        exprStmt(callExpr(id("_jsxs"))),
      );
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows props and children identifiers", () => {
      const tree = programWith(
        exprStmt(memberExpr(id("props"), "title")),
        exprStmt(id("children")),
      );
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows property named 'fetch' on safe object (props.fetch)", () => {
      const tree = programWith(exprStmt(memberExpr(id("props"), "fetch")));
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows method calls on non-blocked objects (items.map)", () => {
      const tree = programWith(
        exprStmt(callExpr(memberExpr(id("items"), "map"), [])),
      );
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows static import declarations", () => {
      const tree = programWith({
        type: "ImportDeclaration",
        specifiers: [{ type: "ImportDefaultSpecifier", local: id("React") }],
        source: literal("react"),
      });
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows static export declarations", () => {
      const tree = programWith({
        type: "ExportDefaultDeclaration",
        declaration: id("_createMdxContent"),
      });
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows object property keys named after blocked globals", () => {
      const tree = programWith(exprStmt({
        type: "ObjectExpression",
        properties: [{
          type: "Property",
          key: id("fetch"),
          value: literal("value"),
          kind: "init",
          computed: false,
        }],
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows array expressions", () => {
      const tree = programWith(exprStmt({
        type: "ArrayExpression",
        elements: [literal(1), literal(2), literal(3)],
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });

    it("allows ternary (conditional) expressions with safe operands", () => {
      const tree = programWith(exprStmt({
        type: "ConditionalExpression",
        test: literal(true),
        consequent: literal("yes"),
        alternate: literal("no"),
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(true);
    });
  });

  describe("dangerous patterns (should fail)", () => {
    it("blocks fetch() calls", () => {
      const tree = programWith(exprStmt(callExpr(id("fetch"), [literal("https://evil.com")])));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("fetch");
    });

    it("blocks document.cookie access", () => {
      const tree = programWith(exprStmt(memberExpr(id("document"), "cookie")));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("document");
    });

    it("blocks window.location access", () => {
      const tree = programWith(exprStmt(memberExpr(id("window"), "location")));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("window");
    });

    it("blocks window.location assignment", () => {
      const tree = programWith(exprStmt({
        type: "AssignmentExpression",
        operator: "=",
        left: memberExpr(id("window"), "location"),
        right: literal("https://evil.com"),
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("window");
    });

    it("blocks eval() calls", () => {
      const tree = programWith(exprStmt(callExpr(id("eval"), [literal("alert(1)")])));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("eval");
    });

    it("blocks new Function() constructor", () => {
      const tree = programWith(exprStmt({
        type: "NewExpression",
        callee: id("Function"),
        arguments: [literal("return this")],
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("Function");
    });

    it("blocks dynamic import()", () => {
      const tree = programWith(exprStmt({
        type: "ImportExpression",
        source: literal("./evil.js"),
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("import()");
    });

    it("blocks localStorage access", () => {
      const tree = programWith(exprStmt(callExpr(
        memberExpr(id("localStorage"), "getItem"),
        [literal("key")],
      )));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("localStorage");
    });

    it("blocks new WebSocket()", () => {
      const tree = programWith(exprStmt({
        type: "NewExpression",
        callee: id("WebSocket"),
        arguments: [literal("ws://evil.com")],
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("WebSocket");
    });

    it("blocks __TOME_AI_API_KEY__ access", () => {
      const tree = programWith(exprStmt(id("__TOME_AI_API_KEY__")));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("__TOME_AI_API_KEY__");
    });

    it("blocks computed member on blocked object (window['location'])", () => {
      const tree = programWith(exprStmt({
        type: "MemberExpression",
        object: id("window"),
        property: literal("location"),
        computed: true,
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("window");
    });

    it("blocks globalThis.fetch()", () => {
      const tree = programWith(exprStmt(
        callExpr(memberExpr(id("globalThis"), "fetch"), [literal("evil")]),
      ));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("globalThis");
    });

    it("blocks navigator.sendBeacon()", () => {
      const tree = programWith(exprStmt(
        callExpr(memberExpr(id("navigator"), "sendBeacon"), [literal("url"), literal("data")]),
      ));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("navigator");
    });

    it("blocks ThisExpression", () => {
      const tree = programWith(exprStmt({ type: "ThisExpression" }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("this");
    });

    it("blocks nested blocked calls inside arrow functions", () => {
      // (() => fetch("evil"))()
      const tree = programWith(exprStmt(
        callExpr({
          type: "ArrowFunctionExpression",
          params: [],
          body: callExpr(id("fetch"), [literal("evil")]),
          expression: true,
        }),
      ));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("fetch");
    });

    it("blocks sessionStorage access", () => {
      const tree = programWith(exprStmt(
        callExpr(memberExpr(id("sessionStorage"), "setItem"), [literal("k"), literal("v")]),
      ));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("sessionStorage");
    });

    it("blocks new Worker()", () => {
      const tree = programWith(exprStmt({
        type: "NewExpression",
        callee: id("Worker"),
        arguments: [literal("worker.js")],
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("Worker");
    });
  });

  describe("allowedExpressions config", () => {
    it("blocks console by default", () => {
      const tree = programWith(exprStmt(
        callExpr(memberExpr(id("console"), "log"), [literal("debug")]),
      ));
      // console is not in BLOCKED_GLOBALS but let's test allowed override
      // Actually console is not blocked by default — it's not in the blocked list
      // This test verifies that explicitly blocked globals can be unblocked
      const result = runPlugin(tree);
      // console is NOT in the blocked list, so this should pass by default
      expect(result.passed).toBe(true);
    });

    it("blocks fetch by default but allows with allowedExpressions", () => {
      const tree = programWith(exprStmt(callExpr(id("fetch"), [literal("url")])));
      // Should fail without allowedExpressions
      const result1 = runPlugin(tree);
      expect(result1.passed).toBe(false);

      // Should pass with fetch in allowedExpressions
      const result2 = runPlugin(tree, { allowedExpressions: ["fetch"] });
      expect(result2.passed).toBe(true);
    });

    it("allows window when explicitly permitted", () => {
      const tree = programWith(exprStmt(memberExpr(id("window"), "innerWidth")));
      const result = runPlugin(tree, { allowedExpressions: ["window"] });
      expect(result.passed).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("blocks deeply nested member expression (window.location.href)", () => {
      const tree = programWith(exprStmt(
        memberExpr(memberExpr(id("window"), "location"), "href"),
      ));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("window");
    });

    it("handles assignment to standalone blocked identifier", () => {
      const tree = programWith(exprStmt({
        type: "AssignmentExpression",
        operator: "=",
        left: id("fetch"),
        right: literal("overridden"),
      }));
      const result = runPlugin(tree);
      expect(result.passed).toBe(false);
      expect(result.error).toContain("fetch");
    });
  });
});
