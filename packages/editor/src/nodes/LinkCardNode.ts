import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Clickable link card — a standalone card that links to a URL.
 * Markdown: <LinkCard title="..." href="..." />
 *
 * Atom node — no editable inline content.
 */
export const LinkCardNode = Node.create({
  name: "linkCard",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      title: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-link-card-title") || "",
        renderHTML: (attrs) => ({ "data-link-card-title": attrs.title }),
      },
      href: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-link-card-href") || "",
        renderHTML: (attrs) => ({ "data-link-card-href": attrs.href }),
      },
      description: {
        default: null,
        parseHTML: (el) =>
          el.getAttribute("data-link-card-description") || null,
        renderHTML: (attrs) =>
          attrs.description
            ? { "data-link-card-description": attrs.description }
            : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-link-card]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-link-card": "",
        class: "link-card",
      }),
    ];
  },
});
