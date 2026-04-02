/**
 * Tome WYSIWYG Editor — Tiptap-based block editor with markdown round-tripping.
 * Renders a Notion-like editing experience with Tome theme integration.
 */

import React, { useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Markdown } from "tiptap-markdown";
import { EditorToolbar } from "./toolbar.js";

export interface TomeEditorProps {
  /** Initial markdown content */
  content?: string;
  /** Called when content changes (debounced) */
  onChange?: (markdown: string) => void;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** CSS class for the editor container */
  className?: string;
}

export function TomeEditor({
  content = "",
  onChange,
  placeholder = "Start writing...",
  readOnly = false,
  className,
}: TomeEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        codeBlock: false, // We'll use a custom code block
      }),
      Placeholder.configure({ placeholder }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "tome-editor-link" } }),
      Image.configure({ inline: false, allowBase64: true }),
      Markdown.configure({
        html: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      if (onChange) {
        const md = editor.storage.markdown.getMarkdown();
        onChange(md);
      }
    },
  });

  // Update content when prop changes (e.g. loading a different page)
  useEffect(() => {
    if (editor && content !== undefined) {
      const currentMd = editor.storage.markdown?.getMarkdown() ?? "";
      if (currentMd !== content) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  // Update editable state
  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [editor, readOnly]);

  if (!editor) return null;

  return (
    <div className={`tome-editor ${className || ""}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {!readOnly && <EditorToolbar editor={editor} />}
      <div className="tome-editor-content" style={{ flex: 1, overflow: "auto" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

/**
 * Get the current markdown content from the editor instance.
 */
export function getEditorMarkdown(editor: ReturnType<typeof useEditor>): string {
  if (!editor) return "";
  return editor.storage.markdown?.getMarkdown() ?? "";
}

export default TomeEditor;
