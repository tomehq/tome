/**
 * Editor toolbar — formatting buttons for the Tiptap editor.
 * Styled to match Tome dashboard design tokens.
 */

import React from "react";
import type { Editor } from "@tiptap/react";

interface ToolbarProps {
  editor: Editor;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, active, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        background: active ? "var(--coralD, rgba(139,58,47,0.1))" : "none",
        border: "1px solid transparent",
        borderRadius: 4,
        padding: "4px 8px",
        cursor: disabled ? "not-allowed" : "pointer",
        color: active ? "var(--coral, #8b3a2f)" : "var(--txM, #696360)",
        fontSize: 13,
        fontFamily: "Inter, sans-serif",
        fontWeight: active ? 600 : 400,
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.15s",
        display: "flex",
        alignItems: "center",
        gap: 4,
        minWidth: 28,
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 20, background: "var(--bd, #ddd9d0)", margin: "0 4px" }} />;
}

export function EditorToolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "8px 12px",
        borderBottom: "1px solid var(--bd, #ddd9d0)",
        background: "var(--sf, #ffffff)",
        flexWrap: "wrap",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        title="Bold (Cmd+B)"
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        title="Italic (Cmd+I)"
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
        title="Inline code (Cmd+E)"
      >
        <code style={{ fontSize: 11 }}>&lt;/&gt;</code>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        title="Strikethrough"
      >
        <s>S</s>
      </ToolbarButton>

      <Divider />

      {/* Headings */}
      {([1, 2, 3, 4] as const).map((level) => (
        <ToolbarButton
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          active={editor.isActive("heading", { level })}
          title={`Heading ${level}`}
        >
          H{level}
        </ToolbarButton>
      ))}

      <Divider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        title="Bullet list"
      >
        &bull;
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        title="Numbered list"
      >
        1.
      </ToolbarButton>

      <Divider />

      {/* Blocks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        title="Blockquote"
      >
        &ldquo;
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal rule"
      >
        &#8212;
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          const url = window.prompt("Link URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        active={editor.isActive("link")}
        title="Add link"
      >
        &#128279;
      </ToolbarButton>

      <Divider />

      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Cmd+Z)"
      >
        &#8617;
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Cmd+Shift+Z)"
      >
        &#8618;
      </ToolbarButton>
    </div>
  );
}
