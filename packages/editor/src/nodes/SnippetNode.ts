import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Snippet reference — includes content from another file.
 * Markdown: ::snippet{file="path"}
 *
 * Atom node — the file path is the only attribute; content is resolved at build time.
 */
export const SnippetNode = Node.create({
  name: "snippet",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      file: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-snippet-file") || "",
        renderHTML: (attrs) => ({ "data-snippet-file": attrs.file }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-snippet]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-snippet": "",
        class: "snippet",
      }),
    ];
  },
});
