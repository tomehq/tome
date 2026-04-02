/**
 * Frontmatter generation utilities for the WYSIWYG editor.
 *
 * When the editor saves a page, this module builds the YAML frontmatter
 * block that precedes the markdown content.
 */

export interface FrontmatterFields {
  title: string;
  description?: string;
  [key: string]: unknown;
}

/**
 * Build a YAML frontmatter block from structured fields.
 * Returns a string like:
 * ```
 * ---
 * title: My Page
 * description: A short description
 * ---
 * ```
 */
export function buildFrontmatter(fields: FrontmatterFields): string {
  const lines: string[] = ["---"];

  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value === "") continue;

    if (typeof value === "string") {
      // Quote strings that contain colons, hash signs, or leading/trailing spaces
      if (/[:#\[\]{}>|]/.test(value) || value !== value.trim()) {
        lines.push(`${key}: "${value.replace(/"/g, '\\"')}"`);
      } else {
        lines.push(`${key}: ${value}`);
      }
    } else if (typeof value === "boolean" || typeof value === "number") {
      lines.push(`${key}: ${value}`);
    } else if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${item}`);
      }
    }
  }

  lines.push("---");
  return lines.join("\n");
}

/**
 * Combine frontmatter and markdown body into a complete document.
 */
export function buildDocument(fields: FrontmatterFields, body: string): string {
  const fm = buildFrontmatter(fields);
  return `${fm}\n\n${body}`;
}

/**
 * Parse frontmatter from a markdown document.
 * Returns the fields and the body content.
 */
export function parseFrontmatter(doc: string): { fields: Record<string, string>; body: string } {
  const match = doc.match(/^---\n([\s\S]*?)\n---\n?\n?([\s\S]*)$/);
  if (!match) return { fields: {}, body: doc };

  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Remove surrounding quotes
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    fields[key] = value;
  }

  return { fields, body: match[2] };
}
