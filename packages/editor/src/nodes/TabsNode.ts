import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Container for tabbed content. Wraps multiple TabNode children.
 * Markdown: <Tabs items={["Tab 1", "Tab 2"]}><Tab>content</Tab><Tab>content</Tab></Tabs>
 */
export const TabsNode = Node.create({
  name: "tabs",
  group: "block",
  content: "tab+",
  defining: true,

  addAttributes() {
    return {
      items: {
        default: [],
        parseHTML: (el) => {
          const raw = el.getAttribute("data-tab-items");
          if (!raw) return [];
          try {
            return JSON.parse(raw);
          } catch {
            return [];
          }
        },
        renderHTML: (attrs) => ({
          "data-tab-items": JSON.stringify(attrs.items),
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-tabs]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-tabs": "", class: "tabs" }),
      0,
    ];
  },
});

/**
 * Individual tab panel inside a Tabs container.
 */
export const TabNode = Node.create({
  name: "tab",
  group: "",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      label: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-tab-label") || "",
        renderHTML: (attrs) => ({ "data-tab-label": attrs.label }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-tab]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-tab": "", class: "tab" }),
      0,
    ];
  },
});
