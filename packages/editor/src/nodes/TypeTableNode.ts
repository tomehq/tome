import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Property/type table — displays typed fields with name, type, required, default, description.
 * Markdown: <TypeTable name="Props" fields={[...]} />
 *
 * Atom node — the fields data is stored as a JSON attribute, not as editable content.
 */
export const TypeTableNode = Node.create({
  name: "typeTable",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      name: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-type-table-name") || "",
        renderHTML: (attrs) => ({ "data-type-table-name": attrs.name }),
      },
      fields: {
        default: [],
        parseHTML: (el) => {
          const raw = el.getAttribute("data-type-table-fields");
          if (!raw) return [];
          try {
            return JSON.parse(raw);
          } catch {
            return [];
          }
        },
        renderHTML: (attrs) => ({
          "data-type-table-fields": JSON.stringify(attrs.fields),
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type-table]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type-table": "",
        class: "type-table",
      }),
    ];
  },
});
