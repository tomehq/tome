/**
 * Remark plugin for reusable content snippets.
 *
 * Syntax:
 *   ::snippet{file="path/to/file.md"}
 *   ::snippet{file="path/to/file.md" var1="value1" var2="value2"}
 *
 * Snippets are resolved from the configured snippets directory.
 * Variables in snippet content are substituted using {{varName}} syntax.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import type { Root, Paragraph, Text } from "mdast";
import type { Plugin } from "unified";

export interface RemarkSnippetsOptions {
  /** Absolute path to the snippets directory */
  snippetsDir: string;
  /** Maximum recursion depth to prevent infinite loops */
  maxDepth?: number;
}

/** Regex to match ::snippet{file="..." ...} directives */
const SNIPPET_REGEX = /^::snippet\{([^}]+)\}$/;

/** Parse attributes from the directive string, e.g. file="foo" var="bar" */
function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const attrRegex = /(\w+)="([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(attrString)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

/** Substitute {{varName}} placeholders in content */
function substituteVariables(content: string, vars: Record<string, string>): string {
  return content.replace(/\{\{(\w+)\}\}/g, (_, name) => {
    return vars[name] !== undefined ? vars[name] : `{{${name}}}`;
  });
}

/** Parse markdown string into an mdast tree */
function parseMarkdown(source: string): Root {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkGfm);
  return processor.parse(source) as Root;
}

/**
 * Resolve a snippet file path and return its raw content.
 * Throws a descriptive error if the file doesn't exist.
 */
export function resolveSnippet(snippetsDir: string, filePath: string): string {
  const fullPath = resolve(snippetsDir, filePath);

  if (!existsSync(fullPath)) {
    throw new Error(`Snippet not found: ${filePath} (looked in ${snippetsDir})`);
  }

  return readFileSync(fullPath, "utf-8");
}

/**
 * Walk an AST tree and replace ::snippet directives with resolved content.
 * Supports recursion with depth limiting.
 */
function resolveSnippetsInTree(
  tree: Root,
  snippetsDir: string,
  variables: Record<string, string>,
  depth: number,
  maxDepth: number,
): Root {
  if (depth > maxDepth) {
    return tree;
  }

  const newChildren: Root["children"] = [];

  for (const node of tree.children) {
    // Check if this is a paragraph containing only a snippet directive
    if (node.type === "paragraph") {
      const para = node as Paragraph;
      if (para.children.length === 1 && para.children[0].type === "text") {
        const child = para.children[0] as Text;
        const match = SNIPPET_REGEX.exec(child.value.trim());
        if (match) {
          const attrs = parseAttributes(match[1]);
          const { file, ...snippetVars } = attrs;

          if (!file) {
            newChildren.push(node);
            continue;
          }

          try {
            let content = resolveSnippet(snippetsDir, file);

            // Strip frontmatter from snippet content
            const fmMatch = content.match(/^---\n[\s\S]*?\n---\n/);
            if (fmMatch) {
              content = content.slice(fmMatch[0].length);
            }

            // Merge parent variables with snippet-level variables
            const mergedVars = { ...variables, ...snippetVars };
            content = substituteVariables(content, mergedVars);

            // Parse snippet content as markdown AST
            const snippetTree = parseMarkdown(content);

            // Recursively resolve nested snippets
            const resolved = resolveSnippetsInTree(
              snippetTree,
              snippetsDir,
              mergedVars,
              depth + 1,
              maxDepth,
            );

            // Splice snippet children into parent
            newChildren.push(...resolved.children);
          } catch (err) {
            // On error, emit a warning paragraph
            const errorText: Text = {
              type: "text",
              value: `[Snippet error: ${(err as Error).message}]`,
            };
            const errorParagraph: Paragraph = {
              type: "paragraph",
              children: [errorText],
            };
            newChildren.push(errorParagraph);
          }
          continue;
        }
      }
    }

    newChildren.push(node);
  }

  tree.children = newChildren;
  return tree;
}

/**
 * Remark plugin that resolves ::snippet{} directives.
 *
 * Usage in the markdown pipeline:
 *   processor.use(remarkSnippets, { snippetsDir: "/path/to/snippets" })
 */
const remarkSnippets: Plugin<[RemarkSnippetsOptions], Root> = (options) => {
  const { snippetsDir, maxDepth = 5 } = options;

  return (tree: Root) => {
    resolveSnippetsInTree(tree, snippetsDir, {}, 0, maxDepth);
  };
};

export default remarkSnippets;
