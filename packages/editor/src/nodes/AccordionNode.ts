import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Collapsible accordion section with a title.
 * Markdown: <Accordion title="...">content</Accordion>
 */
export const AccordionNode = Node.create({
  name: "accordion",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      title: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-accordion-title") || "",
        renderHTML: (attrs) => ({ "data-accordion-title": attrs.title }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-accordion]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-accordion": "",
        class: "accordion",
      }),
      0,
    ];
  },
});
