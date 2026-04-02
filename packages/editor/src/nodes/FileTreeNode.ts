import { Node, mergeAttributes } from "@tiptap/core";

/**
 * File tree structure container.
 * Markdown: <FileTree>...</FileTree>
 *
 * The inner structure (files/folders) is stored as block content.
 * In the editor, this renders as a styled container; the actual tree
 * items are represented as nested block content.
 */
export const FileTreeNode = Node.create({
  name: "fileTree",
  group: "block",
  content: "block+",
  defining: true,

  parseHTML() {
    return [{ tag: "div[data-file-tree]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-file-tree": "",
        class: "file-tree",
      }),
      0,
    ];
  },
});

/**
 * File tree item — a single file or folder entry.
 */
export const FileTreeItemNode = Node.create({
  name: "fileTreeItem",
  group: "block",
  content: "inline*",
  defining: true,

  addAttributes() {
    return {
      name: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-name") || "",
        renderHTML: (attrs) => ({ "data-name": attrs.name }),
      },
      isFolder: {
        default: false,
        parseHTML: (el) => el.getAttribute("data-is-folder") === "true",
        renderHTML: (attrs) => ({ "data-is-folder": String(attrs.isFolder) }),
      },
      defaultOpen: {
        default: false,
        parseHTML: (el) => el.getAttribute("data-default-open") === "true",
        renderHTML: (attrs) => ({
          "data-default-open": String(attrs.defaultOpen),
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-file-tree-item]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-file-tree-item": "",
        class: "file-tree-item",
      }),
      0,
    ];
  },
});
