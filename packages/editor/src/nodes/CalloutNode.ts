import { Node, mergeAttributes } from "@tiptap/core";

export const CalloutNode = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      type: {
        default: "info",
        parseHTML: (el) => el.getAttribute("data-callout-type") || "info",
        renderHTML: (attrs) => ({ "data-callout-type": attrs.type }),
      },
      title: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-callout-title") || null,
        renderHTML: (attrs) =>
          attrs.title ? { "data-callout-title": attrs.title } : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-callout]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-callout": "",
        class: `callout callout-${HTMLAttributes["data-callout-type"] || "info"}`,
      }),
      0,
    ];
  },
});
