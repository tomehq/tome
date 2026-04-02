/**
 * Tome custom Tiptap node extensions for MDX components.
 * Import `tomeNodes` and spread into your Tiptap extensions array.
 */

export { CalloutNode } from "./CalloutNode.js";
export { TabsNode, TabNode } from "./TabsNode.js";
export { CardNode, CardGroupNode } from "./CardNode.js";
export { StepsNode, StepNode } from "./StepsNode.js";
export { AccordionNode } from "./AccordionNode.js";
export { CodeBlockNode } from "./CodeBlockNode.js";
export { FileTreeNode, FileTreeItemNode } from "./FileTreeNode.js";
export { PackageManagerNode } from "./PackageManagerNode.js";
export { TypeTableNode } from "./TypeTableNode.js";
export { LinkCardNode } from "./LinkCardNode.js";
export { SnippetNode } from "./SnippetNode.js";

import { CalloutNode } from "./CalloutNode.js";
import { TabsNode, TabNode } from "./TabsNode.js";
import { CardNode, CardGroupNode } from "./CardNode.js";
import { StepsNode, StepNode } from "./StepsNode.js";
import { AccordionNode } from "./AccordionNode.js";
import { CodeBlockNode } from "./CodeBlockNode.js";
import { FileTreeNode, FileTreeItemNode } from "./FileTreeNode.js";
import { PackageManagerNode } from "./PackageManagerNode.js";
import { TypeTableNode } from "./TypeTableNode.js";
import { LinkCardNode } from "./LinkCardNode.js";
import { SnippetNode } from "./SnippetNode.js";

/** All Tome custom nodes as an array — spread into Tiptap extensions. */
export const tomeNodes = [
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
];
