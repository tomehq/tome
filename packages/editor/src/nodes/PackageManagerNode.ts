import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Package manager command display — shows install commands for npm/yarn/pnpm/bun.
 * Markdown: <PackageManager command="install @tomehq/core" />
 *
 * This is a leaf node (no editable content). The command attribute
 * contains the base command that gets translated per package manager.
 */
export const PackageManagerNode = Node.create({
  name: "packageManager",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      command: {
        default: "install",
        parseHTML: (el) => el.getAttribute("data-pm-command") || "install",
        renderHTML: (attrs) => ({ "data-pm-command": attrs.command }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-package-manager]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-package-manager": "",
        class: "package-manager",
      }),
    ];
  },
});
