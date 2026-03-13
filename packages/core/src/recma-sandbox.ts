/**
 * recma-sandbox — A recma (estree) plugin that blocks dangerous JavaScript
 * patterns in MDX content at compile time.
 *
 * When enabled, this plugin walks the JavaScript AST that @mdx-js/mdx produces
 * and rejects any node that references dangerous globals, constructors, or
 * dynamic evaluation primitives. Safe patterns (JSX, literals, component props)
 * pass through untouched.
 */

import type { Program, Node } from "estree";
import { visit, SKIP } from "estree-util-visit";

// ── BLOCKED IDENTIFIERS ──────────────────────────────────

/** Globals that must never be referenced as standalone identifiers or MemberExpression roots */
const BLOCKED_GLOBALS = new Set([
  // Network
  "fetch", "XMLHttpRequest", "WebSocket", "EventSource",
  // Eval / code generation
  "eval", "Function",
  // DOM
  "window", "document", "navigator",
  // Storage
  "localStorage", "sessionStorage", "indexedDB",
  // Scope escape
  "globalThis", "self", "top", "parent", "frames",
  // Timer-based eval (string arg form)
  "setTimeout", "setInterval",
  // Worker spawning
  "Worker", "SharedWorker",
  // Tome-specific secret
  "__TOME_AI_API_KEY__",
]);

/** Identifiers that @mdx-js/mdx generates internally — always allowed */
const MDX_INTERNALS = new Set([
  "_jsx", "_jsxs", "_jsxDEV", "_Fragment",
  "_createMdxContent", "_components", "_provideComponents",
  "MDXLayout", "_missingMdxReference",
  "props", "children",
]);

// ── HELPERS ──────────────────────────────────────────────

export interface RecmaSandboxOptions {
  /** Additional global identifiers to allow (e.g. ["console"] for debugging) */
  allowedExpressions?: string[];
}

function isBlocked(name: string, allowed: Set<string>): boolean {
  if (allowed.has(name)) return false;
  if (MDX_INTERNALS.has(name)) return false;
  return BLOCKED_GLOBALS.has(name);
}

/**
 * Walk a MemberExpression chain to find the root Identifier name.
 * e.g. `window.location.href` → "window"
 */
function resolveRootIdentifier(node: any): string | null {
  if (node.type === "Identifier") return node.name;
  if (node.type === "MemberExpression") return resolveRootIdentifier(node.object);
  return null; // chain terminates in a call/other expression — can't statically resolve
}

function loc(node: any): string {
  if (node.start != null) return ` (offset ${node.start})`;
  if (node.loc?.start) return ` (${node.loc.start.line}:${node.loc.start.column})`;
  return "";
}

// ── PLUGIN ───────────────────────────────────────────────

export function recmaSandbox(options: RecmaSandboxOptions = {}) {
  const allowed = new Set(options.allowedExpressions || []);

  return (tree: Program, file: any) => {
    visit(tree, (node: Node, _key, _index, ancestors: Node[]) => {
      // Skip static imports/exports — these are MDX module-level wiring
      if (
        node.type === "ImportDeclaration" ||
        node.type === "ExportNamedDeclaration" ||
        node.type === "ExportDefaultDeclaration" ||
        node.type === "ExportAllDeclaration"
      ) {
        return SKIP;
      }

      // ── Dynamic import() ──
      if (node.type === "ImportExpression") {
        file.fail(
          `MDX sandbox: dynamic import() is not allowed${loc(node)}`,
          node
        );
      }

      // ── ThisExpression ──
      if (node.type === "ThisExpression") {
        file.fail(
          `MDX sandbox: 'this' is not allowed in sandboxed MDX${loc(node)}`,
          node
        );
      }

      // ── Identifier (standalone reference) ──
      if (node.type === "Identifier") {
        const name = (node as any).name;

        // Skip: property names in non-computed member expressions (props.fetch is fine)
        const parent = ancestors[ancestors.length - 1] as any;
        if (
          parent?.type === "MemberExpression" &&
          parent.property === node &&
          !parent.computed
        ) {
          return;
        }

        // Skip: import specifier names
        if (
          parent?.type === "ImportSpecifier" ||
          parent?.type === "ImportDefaultSpecifier" ||
          parent?.type === "ImportNamespaceSpecifier"
        ) {
          return;
        }

        // Skip: object keys in ObjectExpression/Property
        if (parent?.type === "Property" && parent.key === node && !parent.computed) {
          return;
        }

        if (isBlocked(name, allowed)) {
          file.fail(
            `MDX sandbox: access to '${name}' is not allowed${loc(node)}`,
            node
          );
        }
      }

      // ── MemberExpression ──
      if (node.type === "MemberExpression") {
        const root = resolveRootIdentifier(node);
        if (root && isBlocked(root, allowed)) {
          // For computed properties on blocked roots, always fail (can't know the property)
          const n = node as any;
          const propName = !n.computed && n.property?.type === "Identifier"
            ? `${root}.${n.property.name}`
            : root;
          file.fail(
            `MDX sandbox: access to '${propName}' is not allowed${loc(node)}`,
            node
          );
          return SKIP; // Don't visit children — we already flagged the root
        }
      }

      // ── NewExpression (new WebSocket, new Function, new Worker) ──
      if (node.type === "NewExpression") {
        const callee = (node as any).callee;
        if (callee.type === "Identifier" && isBlocked(callee.name, allowed)) {
          file.fail(
            `MDX sandbox: 'new ${callee.name}()' is not allowed${loc(node)}`,
            node
          );
        }
        if (callee.type === "MemberExpression") {
          const root = resolveRootIdentifier(callee);
          if (root && isBlocked(root, allowed)) {
            file.fail(
              `MDX sandbox: 'new ${root}...()'  is not allowed${loc(node)}`,
              node
            );
          }
        }
      }

      // ── AssignmentExpression (window.location = ...) ──
      if (node.type === "AssignmentExpression") {
        const left = (node as any).left;
        if (left.type === "Identifier" && isBlocked(left.name, allowed)) {
          file.fail(
            `MDX sandbox: assignment to '${left.name}' is not allowed${loc(node)}`,
            node
          );
        }
        if (left.type === "MemberExpression") {
          const root = resolveRootIdentifier(left);
          if (root && isBlocked(root, allowed)) {
            file.fail(
              `MDX sandbox: assignment to '${root}...' is not allowed${loc(node)}`,
              node
            );
          }
        }
      }
    });
  };
}

export default recmaSandbox;
