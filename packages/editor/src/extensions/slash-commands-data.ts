/**
 * Slash command definitions — pure data, no Tiptap dependency.
 * Separated so it can be imported in tests without @tiptap/core.
 */

export interface SlashCommandDef {
  name: string;
  label: string;
  description: string;
  icon?: string;
  /** MDX content to insert (for component commands) */
  insertContent?: string;
  /** Tiptap command name (for built-in commands) */
  tiptapCommand?: string;
  /** Heading level (for heading commands) */
  headingLevel?: number;
}

export const SLASH_COMMAND_DEFS: SlashCommandDef[] = [
  { name: "heading1", label: "Heading 1", description: "Large section heading", icon: "H1", tiptapCommand: "toggleHeading", headingLevel: 1 },
  { name: "heading2", label: "Heading 2", description: "Medium section heading", icon: "H2", tiptapCommand: "toggleHeading", headingLevel: 2 },
  { name: "heading3", label: "Heading 3", description: "Small section heading", icon: "H3", tiptapCommand: "toggleHeading", headingLevel: 3 },
  { name: "bulletList", label: "Bullet List", description: "Unordered list", icon: "•", tiptapCommand: "toggleBulletList" },
  { name: "orderedList", label: "Numbered List", description: "Ordered list", icon: "1.", tiptapCommand: "toggleOrderedList" },
  { name: "codeBlock", label: "Code Block", description: "Fenced code block", icon: "</>", tiptapCommand: "toggleCodeBlock" },
  { name: "blockquote", label: "Quote", description: "Blockquote", icon: '"', tiptapCommand: "toggleBlockquote" },
  { name: "horizontalRule", label: "Divider", description: "Horizontal rule", icon: "—", tiptapCommand: "setHorizontalRule" },
  { name: "callout", label: "Callout", description: "Info, warning, or tip callout", icon: "!", insertContent: '<Callout type="info">\n\n</Callout>' },
  { name: "tabs", label: "Tabs", description: "Tabbed content sections", icon: "⊞", insertContent: '<Tabs items={["Tab 1", "Tab 2"]}>\n<Tab>\n\n</Tab>\n<Tab>\n\n</Tab>\n</Tabs>' },
  { name: "steps", label: "Steps", description: "Numbered step-by-step guide", icon: "①", insertContent: '<Steps>\n\nStep 1 content\n\nStep 2 content\n\n</Steps>' },
  { name: "accordion", label: "Accordion", description: "Collapsible content section", icon: "▶", insertContent: '<Accordion title="Click to expand">\n\n</Accordion>' },
  { name: "card", label: "Card", description: "Feature or link card", icon: "□", insertContent: '<Card title="Card Title" icon="book">\nCard description\n</Card>' },
];

/**
 * Filter commands by query string (case-insensitive).
 */
export function filterSlashCommands(query: string): SlashCommandDef[] {
  if (!query) return SLASH_COMMAND_DEFS;
  const q = query.toLowerCase();
  return SLASH_COMMAND_DEFS.filter(
    (cmd) => cmd.name.toLowerCase().includes(q) || cmd.label.toLowerCase().includes(q),
  );
}
