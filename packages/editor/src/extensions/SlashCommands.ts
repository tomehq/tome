/**
 * Slash commands extension for the Tome editor.
 * Type "/" to open a command menu for inserting components and blocks.
 */

import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";

export interface SlashCommand {
  name: string;
  label: string;
  description: string;
  icon?: string;
  action: (view: EditorView) => void;
}

const SLASH_COMMANDS: SlashCommand[] = [
  {
    name: "heading1",
    label: "Heading 1",
    description: "Large section heading",
    icon: "H1",
    action: (view) => {
      const { state, dispatch } = view;
      // Delete the "/" character
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      // Insert heading
      const { commands } = (view as any).editor;
      commands?.toggleHeading({ level: 1 });
    },
  },
  {
    name: "heading2",
    label: "Heading 2",
    description: "Medium section heading",
    icon: "H2",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.toggleHeading({ level: 2 });
    },
  },
  {
    name: "heading3",
    label: "Heading 3",
    description: "Small section heading",
    icon: "H3",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.toggleHeading({ level: 3 });
    },
  },
  {
    name: "bulletList",
    label: "Bullet List",
    description: "Unordered list",
    icon: "•",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.toggleBulletList();
    },
  },
  {
    name: "orderedList",
    label: "Numbered List",
    description: "Ordered list",
    icon: "1.",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.toggleOrderedList();
    },
  },
  {
    name: "codeBlock",
    label: "Code Block",
    description: "Fenced code block",
    icon: "</>",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.toggleCodeBlock();
    },
  },
  {
    name: "blockquote",
    label: "Quote",
    description: "Blockquote",
    icon: '"',
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.toggleBlockquote();
    },
  },
  {
    name: "horizontalRule",
    label: "Divider",
    description: "Horizontal rule",
    icon: "—",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.setHorizontalRule();
    },
  },
  {
    name: "callout",
    label: "Callout",
    description: "Info, warning, or tip callout",
    icon: "!",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      // Insert callout MDX via markdown
      const { commands } = (view as any).editor;
      commands?.insertContent('<Callout type="info">\n\n</Callout>');
    },
  },
  {
    name: "tabs",
    label: "Tabs",
    description: "Tabbed content sections",
    icon: "⊞",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.insertContent('<Tabs items={["Tab 1", "Tab 2"]}>\n<Tab>\n\n</Tab>\n<Tab>\n\n</Tab>\n</Tabs>');
    },
  },
  {
    name: "steps",
    label: "Steps",
    description: "Numbered step-by-step guide",
    icon: "①",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.insertContent('<Steps>\n\nStep 1 content\n\nStep 2 content\n\n</Steps>');
    },
  },
  {
    name: "accordion",
    label: "Accordion",
    description: "Collapsible content section",
    icon: "▶",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.insertContent('<Accordion title="Click to expand">\n\n</Accordion>');
    },
  },
  {
    name: "card",
    label: "Card",
    description: "Feature or link card",
    icon: "□",
    action: (view) => {
      const { state, dispatch } = view;
      const tr = state.tr.delete(state.selection.from - 1, state.selection.from);
      dispatch(tr);
      const { commands } = (view as any).editor;
      commands?.insertContent('<Card title="Card Title" icon="book">\nCard description\n</Card>');
    },
  },
];

/**
 * Get slash commands filtered by query string.
 */
export function filterSlashCommands(query: string): SlashCommand[] {
  if (!query) return SLASH_COMMANDS;
  const q = query.toLowerCase();
  return SLASH_COMMANDS.filter(
    (cmd) => cmd.name.toLowerCase().includes(q) || cmd.label.toLowerCase().includes(q),
  );
}

/**
 * Slash commands Tiptap extension.
 * Listens for "/" at the start of a line and shows a command menu.
 * The actual menu rendering is handled by the dashboard EditorPage.
 */
export const SlashCommandsExtension = Extension.create({
  name: "slashCommands",

  addKeyboardShortcuts() {
    return {
      // Cmd+S for save (handled by dashboard)
      "Mod-s": () => {
        // Emit custom event for dashboard to handle
        document.dispatchEvent(new CustomEvent("tome-editor-save"));
        return true;
      },
      // Cmd+Shift+P for publish (handled by dashboard)
      "Mod-Shift-p": () => {
        document.dispatchEvent(new CustomEvent("tome-editor-publish"));
        return true;
      },
    };
  },
});

export { SLASH_COMMANDS };
