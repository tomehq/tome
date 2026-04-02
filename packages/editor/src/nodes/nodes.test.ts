/**
 * Tests for Tome custom Tiptap node extensions.
 *
 * Since @tiptap/core is a peer dependency and may not resolve directly in vitest,
 * we mock it so that Node.create() returns the raw config object. This lets us
 * validate every node's name, attributes, parseHTML, renderHTML, and flags
 * without needing a live Tiptap editor instance.
 */
import { describe, it, expect, vi, beforeAll } from "vitest";

// Mock @tiptap/core before any node imports.
// Node.create(config) just returns config with a _isMocked flag.
// mergeAttributes merges objects (simplified).
vi.mock("@tiptap/core", () => ({
  Node: {
    create(config: Record<string, unknown>) {
      return { ...config, _isMocked: true };
    },
  },
  mergeAttributes(...objs: Record<string, unknown>[]) {
    return Object.assign({}, ...objs);
  },
}));

// Now import the nodes — they will use the mocked @tiptap/core
import {
  tomeNodes,
  CalloutNode,
  TabsNode,
  TabNode,
  CardNode,
  CardGroupNode,
  StepsNode,
  StepNode,
  AccordionNode,
  CodeBlockNode,
  FileTreeNode,
  FileTreeItemNode,
  PackageManagerNode,
  TypeTableNode,
  LinkCardNode,
  SnippetNode,
} from "./index.js";

// Helper: call addAttributes() if it exists on the mocked config
function getAttrs(node: Record<string, unknown>) {
  const fn = node.addAttributes as (() => Record<string, unknown>) | undefined;
  return fn ? fn() : {};
}

// Helper: call parseHTML() on the mocked config
function getParseRules(node: Record<string, unknown>) {
  const fn = node.parseHTML as (() => Array<{ tag: string }>) | undefined;
  return fn ? fn() : [];
}

// Helper: call renderHTML() on the mocked config
function callRenderHTML(node: Record<string, unknown>, attrs: Record<string, unknown> = {}) {
  const fn = node.renderHTML as ((opts: { HTMLAttributes: Record<string, unknown> }) => unknown[]) | undefined;
  return fn ? fn({ HTMLAttributes: attrs }) : [];
}

// ---------- tomeNodes array ----------

describe("tomeNodes", () => {
  it("is not empty", () => {
    expect(tomeNodes.length).toBeGreaterThan(0);
  });

  it("contains exactly 15 extensions", () => {
    expect(tomeNodes).toHaveLength(15);
  });

  it("every entry has a name property", () => {
    for (const node of tomeNodes) {
      expect((node as Record<string, unknown>).name).toBeTruthy();
    }
  });

  it("every entry has parseHTML and renderHTML", () => {
    for (const node of tomeNodes) {
      const n = node as Record<string, unknown>;
      expect(typeof n.parseHTML).toBe("function");
      expect(typeof n.renderHTML).toBe("function");
    }
  });
});

// ---------- Individual nodes ----------

describe("CalloutNode", () => {
  const node = CalloutNode as unknown as Record<string, unknown>;

  it("has name 'callout'", () => {
    expect(node.name).toBe("callout");
  });

  it("has type attribute with default 'info'", () => {
    const attrs = getAttrs(node);
    expect(attrs).toHaveProperty("type");
    expect((attrs as any).type.default).toBe("info");
  });

  it("has title attribute with default null", () => {
    const attrs = getAttrs(node);
    expect(attrs).toHaveProperty("title");
    expect((attrs as any).title.default).toBeNull();
  });

  it("parseHTML matches div[data-callout]", () => {
    const rules = getParseRules(node);
    expect(rules).toHaveLength(1);
    expect(rules[0].tag).toBe("div[data-callout]");
  });

  it("renderHTML produces div with callout class", () => {
    const output = callRenderHTML(node, { "data-callout-type": "warning" });
    expect(output[0]).toBe("div");
    expect((output[1] as Record<string, unknown>)["data-callout"]).toBe("");
    expect((output[1] as Record<string, unknown>).class).toContain("callout");
  });

  it("group is block", () => {
    expect(node.group).toBe("block");
  });

  it("content model accepts block+", () => {
    expect(node.content).toBe("block+");
  });
});

describe("CardNode", () => {
  const node = CardNode as unknown as Record<string, unknown>;

  it("has name 'card'", () => {
    expect(node.name).toBe("card");
  });

  it("has title, icon, href attributes", () => {
    const attrs = getAttrs(node);
    expect(attrs).toHaveProperty("title");
    expect(attrs).toHaveProperty("icon");
    expect(attrs).toHaveProperty("href");
  });

  it("title defaults to empty string", () => {
    expect((getAttrs(node) as any).title.default).toBe("");
  });

  it("icon defaults to null", () => {
    expect((getAttrs(node) as any).icon.default).toBeNull();
  });

  it("href defaults to null", () => {
    expect((getAttrs(node) as any).href.default).toBeNull();
  });

  it("parseHTML matches div[data-card]", () => {
    expect(getParseRules(node)[0].tag).toBe("div[data-card]");
  });
});

describe("CardGroupNode", () => {
  const node = CardGroupNode as unknown as Record<string, unknown>;

  it("has name 'cardGroup'", () => {
    expect(node.name).toBe("cardGroup");
  });

  it("has cols attribute defaulting to 2", () => {
    expect((getAttrs(node) as any).cols.default).toBe(2);
  });

  it("content model is card+", () => {
    expect(node.content).toBe("card+");
  });
});

describe("CodeBlockNode", () => {
  const node = CodeBlockNode as unknown as Record<string, unknown>;

  it("has name 'codeBlock'", () => {
    expect(node.name).toBe("codeBlock");
  });

  it("has language attribute (default null)", () => {
    expect((getAttrs(node) as any).language.default).toBeNull();
  });

  it("has title attribute (default null)", () => {
    expect((getAttrs(node) as any).title.default).toBeNull();
  });

  it("is marked as code", () => {
    expect(node.code).toBe(true);
  });

  it("marks is empty string (no marks allowed)", () => {
    expect(node.marks).toBe("");
  });

  it("parseHTML matches pre tag", () => {
    const rules = getParseRules(node);
    expect(rules[0].tag).toBe("pre");
  });

  it("has keyboard shortcuts", () => {
    expect(typeof node.addKeyboardShortcuts).toBe("function");
  });
});

describe("AccordionNode", () => {
  const node = AccordionNode as unknown as Record<string, unknown>;

  it("has name 'accordion'", () => {
    expect(node.name).toBe("accordion");
  });

  it("has title attribute defaulting to empty string", () => {
    expect((getAttrs(node) as any).title.default).toBe("");
  });

  it("parseHTML matches div[data-accordion]", () => {
    expect(getParseRules(node)[0].tag).toBe("div[data-accordion]");
  });

  it("content model is block+", () => {
    expect(node.content).toBe("block+");
  });
});

describe("TabsNode", () => {
  const node = TabsNode as unknown as Record<string, unknown>;

  it("has name 'tabs'", () => {
    expect(node.name).toBe("tabs");
  });

  it("has items attribute defaulting to empty array", () => {
    const items = (getAttrs(node) as any).items;
    expect(items.default).toEqual([]);
  });

  it("content model is tab+", () => {
    expect(node.content).toBe("tab+");
  });

  it("parseHTML matches div[data-tabs]", () => {
    expect(getParseRules(node)[0].tag).toBe("div[data-tabs]");
  });
});

describe("TabNode", () => {
  const node = TabNode as unknown as Record<string, unknown>;

  it("has name 'tab'", () => {
    expect(node.name).toBe("tab");
  });

  it("has label attribute", () => {
    expect((getAttrs(node) as any).label.default).toBe("");
  });
});

describe("StepsNode", () => {
  const node = StepsNode as unknown as Record<string, unknown>;

  it("has name 'steps'", () => {
    expect(node.name).toBe("steps");
  });

  it("group is block", () => {
    expect(node.group).toBe("block");
  });

  it("content model is step+", () => {
    expect(node.content).toBe("step+");
  });

  it("parseHTML matches div[data-steps]", () => {
    expect(getParseRules(node)[0].tag).toBe("div[data-steps]");
  });
});

describe("StepNode", () => {
  const node = StepNode as unknown as Record<string, unknown>;

  it("has name 'step'", () => {
    expect(node.name).toBe("step");
  });

  it("content model is block+", () => {
    expect(node.content).toBe("block+");
  });
});

describe("FileTreeNode", () => {
  const node = FileTreeNode as unknown as Record<string, unknown>;

  it("has name 'fileTree'", () => {
    expect(node.name).toBe("fileTree");
  });

  it("parseHTML matches div[data-file-tree]", () => {
    expect(getParseRules(node)[0].tag).toBe("div[data-file-tree]");
  });
});

describe("FileTreeItemNode", () => {
  const node = FileTreeItemNode as unknown as Record<string, unknown>;

  it("has name 'fileTreeItem'", () => {
    expect(node.name).toBe("fileTreeItem");
  });

  it("has name, isFolder, defaultOpen attributes", () => {
    const attrs = getAttrs(node);
    expect(attrs).toHaveProperty("name");
    expect(attrs).toHaveProperty("isFolder");
    expect(attrs).toHaveProperty("defaultOpen");
  });

  it("isFolder defaults to false", () => {
    expect((getAttrs(node) as any).isFolder.default).toBe(false);
  });
});

describe("PackageManagerNode", () => {
  const node = PackageManagerNode as unknown as Record<string, unknown>;

  it("has name 'packageManager'", () => {
    expect(node.name).toBe("packageManager");
  });

  it("is an atom node", () => {
    expect(node.atom).toBe(true);
  });

  it("has command attribute defaulting to 'install'", () => {
    expect((getAttrs(node) as any).command.default).toBe("install");
  });
});

describe("TypeTableNode", () => {
  const node = TypeTableNode as unknown as Record<string, unknown>;

  it("has name 'typeTable'", () => {
    expect(node.name).toBe("typeTable");
  });

  it("is an atom node", () => {
    expect(node.atom).toBe(true);
  });

  it("has name and fields attributes", () => {
    const attrs = getAttrs(node);
    expect(attrs).toHaveProperty("name");
    expect(attrs).toHaveProperty("fields");
  });

  it("fields defaults to empty array", () => {
    expect((getAttrs(node) as any).fields.default).toEqual([]);
  });
});

describe("LinkCardNode", () => {
  const node = LinkCardNode as unknown as Record<string, unknown>;

  it("has name 'linkCard'", () => {
    expect(node.name).toBe("linkCard");
  });

  it("is an atom node (not editable content)", () => {
    expect(node.atom).toBe(true);
  });

  it("has title, href, description attributes", () => {
    const attrs = getAttrs(node);
    expect(attrs).toHaveProperty("title");
    expect(attrs).toHaveProperty("href");
    expect(attrs).toHaveProperty("description");
  });

  it("description defaults to null", () => {
    expect((getAttrs(node) as any).description.default).toBeNull();
  });

  it("parseHTML matches div[data-link-card]", () => {
    expect(getParseRules(node)[0].tag).toBe("div[data-link-card]");
  });
});

describe("SnippetNode", () => {
  const node = SnippetNode as unknown as Record<string, unknown>;

  it("has name 'snippet'", () => {
    expect(node.name).toBe("snippet");
  });

  it("is an atom node", () => {
    expect(node.atom).toBe(true);
  });

  it("has file attribute defaulting to empty string", () => {
    expect((getAttrs(node) as any).file.default).toBe("");
  });

  it("parseHTML matches div[data-snippet]", () => {
    expect(getParseRules(node)[0].tag).toBe("div[data-snippet]");
  });
});
