import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Card component with title, icon, href, and optional description content.
 * Markdown: <Card title="..." icon="..." href="...">description</Card>
 */
export const CardNode = Node.create({
  name: "card",
  group: "block",
  content: "inline*",
  defining: true,

  addAttributes() {
    return {
      title: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-card-title") || "",
        renderHTML: (attrs) => ({ "data-card-title": attrs.title }),
      },
      icon: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-card-icon") || null,
        renderHTML: (attrs) =>
          attrs.icon ? { "data-card-icon": attrs.icon } : {},
      },
      href: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-card-href") || null,
        renderHTML: (attrs) =>
          attrs.href ? { "data-card-href": attrs.href } : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-card]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-card": "", class: "card" }),
      0,
    ];
  },
});

/**
 * CardGroup — grid container for Card nodes.
 * Markdown: <CardGroup cols={2}>...</CardGroup>
 */
export const CardGroupNode = Node.create({
  name: "cardGroup",
  group: "block",
  content: "card+",
  defining: true,

  addAttributes() {
    return {
      cols: {
        default: 2,
        parseHTML: (el) => {
          const v = el.getAttribute("data-card-cols");
          return v ? parseInt(v, 10) : 2;
        },
        renderHTML: (attrs) => ({ "data-card-cols": String(attrs.cols) }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-card-group]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-card-group": "",
        class: "card-group",
      }),
      0,
    ];
  },
});
