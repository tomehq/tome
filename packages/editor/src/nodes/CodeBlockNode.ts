import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Enhanced code block with language and optional title/filename.
 * Markdown: ```lang title="filename"\ncode\n```
 */
export const CodeBlockNode = Node.create({
  name: "codeBlock",
  group: "block",
  content: "text*",
  marks: "",
  code: true,
  defining: true,

  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-language") || null,
        renderHTML: (attrs) =>
          attrs.language ? { "data-language": attrs.language } : {},
      },
      title: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-title") || null,
        renderHTML: (attrs) =>
          attrs.title ? { "data-title": attrs.title } : {},
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "pre",
      mergeAttributes(HTMLAttributes, { class: "code-block" }),
      ["code", {}, 0],
    ];
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () =>
        this.editor.commands.toggleNode(this.name, "paragraph"),
      Tab: () => {
        if (this.editor.isActive(this.name)) {
          this.editor.commands.insertContent("\t");
          return true;
        }
        return false;
      },
    };
  },
});
