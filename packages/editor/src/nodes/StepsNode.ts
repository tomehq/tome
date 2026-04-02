import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Steps container — renders numbered step children.
 * Markdown: <Steps>content</Steps>
 */
export const StepsNode = Node.create({
  name: "steps",
  group: "block",
  content: "step+",
  defining: true,

  parseHTML() {
    return [{ tag: "div[data-steps]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-steps": "", class: "steps" }),
      0,
    ];
  },
});

/**
 * Individual step inside a Steps container.
 */
export const StepNode = Node.create({
  name: "step",
  group: "",
  content: "block+",
  defining: true,

  parseHTML() {
    return [{ tag: "div[data-step]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-step": "", class: "step" }),
      0,
    ];
  },
});
