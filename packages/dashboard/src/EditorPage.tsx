import React, { useState, useEffect, useCallback, useRef } from "react";
import { TomeEditor } from "@tomehq/editor";
import { sanitizeEditorContent } from "@tomehq/editor/sanitize";
import "@tomehq/editor/editor.css";

// ── Types ──────────────────────────────────────────────────
interface User { id: string; email: string; name: string | null; avatarUrl: string | null; plan: string; createdAt: string; }
interface PageEntry { id: string; path: string; title: string; description: string; status: "draft" | "published" | "changed"; content: string; updatedAt: string; }
type SaveStatus = "idle" | "saving" | "saved" | "unsaved";

// ── API helper (mirrors App.tsx pattern) ──────────────────
const API_URL = import.meta.env.VITE_API_URL ?? "https://api.tome.center";
const DEV_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK === "1";

async function api<T>(path: string, opts: { method?: string; body?: unknown; token?: string } = {}): Promise<T> {
  if (DEV_MOCK) return {} as T;
  const res = await fetch(`${API_URL}${path}`, {
    method: opts.method ?? "GET",
    headers: { ...(opts.body ? { "Content-Type": "application/json" } : {}), ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}) },
    ...(opts.body ? { body: JSON.stringify(opts.body) } : {}),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({ error: res.statusText })); throw new Error((err as { error: string }).error); }
  return res.json() as Promise<T>;
}

// ── Icons ──────────────────────────────────────────────────
const FileIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>);
const PlusIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>);
const TrashIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>);
const ChevronLeftIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>);

// ── Status Badge ──────────────────────────────────────────
const statusColors: Record<string, { bg: string; tx: string }> = {
  published: { bg: "rgba(21,128,61,0.1)", tx: "var(--green, #15803d)" },
  draft: { bg: "rgba(161,98,7,0.1)", tx: "var(--yellow, #a16207)" },
  changed: { bg: "rgba(139,58,47,0.1)", tx: "var(--coral, #8b3a2f)" },
};
function StatusBadge({ status }: { status: string }) {
  const c = statusColors[status] ?? statusColors.draft;
  return <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 500, fontFamily: "Inter, sans-serif", background: c.bg, color: c.tx }}>{status}</span>;
}

// ── New Page Modal ────────────────────────────────────────
function NewPageModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (path: string, title: string) => void }) {
  const [path, setPath] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (path.trim() && title.trim()) onSubmit(path.trim(), title.trim()); };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "var(--sf, #fff)", border: "1px solid var(--bd, #ddd9d0)", borderRadius: 12, padding: 32, width: 420, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontSize: 24, color: "var(--tx)", margin: "0 0 20px" }}>New Page</h3>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: 16 }}>
            <span style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--txM)", marginBottom: 6, fontWeight: 500 }}>Page Path</span>
            <input className="input-field" value={path} onChange={(e) => setPath(e.target.value)} placeholder="/guides/getting-started" autoFocus />
          </label>
          <label style={{ display: "block", marginBottom: 24 }}>
            <span style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--txM)", marginBottom: 6, fontWeight: 500 }}>Title</span>
            <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Getting Started" />
          </label>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button type="button" className="btn-ghost" style={{ padding: "8px 18px", fontSize: 13 }} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>Create Page</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Navigation helper ─────────────────────────────────────
const BASE = "/dashboard";
function nav(to: string) { const p = to.startsWith(BASE) ? to : `${BASE}${to}`; window.history.pushState(null, "", p); window.dispatchEvent(new PopStateEvent("popstate")); }

// Hover helpers (match App.tsx patterns)
const hoverLink = { onMouseOver: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "var(--coral)"), onMouseOut: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "var(--txM)") };

// ── Editor Page ──────────────────────────────────────────
export default function EditorPage({ slug, token }: { slug: string; token: string; user: { id: string; email: string; name: string | null; avatarUrl: string | null; plan: string; createdAt: string } }) {
  const [pages, setPages] = useState<PageEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [showNewPage, setShowNewPage] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedPage = pages.find((p) => p.id === selectedId) ?? null;

  // Load pages list
  const loadPages = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await api<PageEntry[]>(`/api/editor/pages?projectSlug=${slug}`, { token });
      const pageList = Array.isArray(data) ? data : [];
      setPages(pageList);
      if (pageList.length > 0 && !selectedId) setSelectedId(pageList[0].id);
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to load pages"); }
    finally { setLoading(false); }
  }, [slug, token, selectedId]);
  useEffect(() => { loadPages(); }, [loadPages]);

  // Load selected page content
  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    (async () => {
      try {
        const page = await api<PageEntry>(`/api/editor/pages/${selectedId}`, { token });
        if (cancelled) return;
        setEditTitle(page.title); setEditDescription(page.description ?? ""); setEditorContent(page.content ?? ""); setSaveStatus("idle");
      } catch { /* page may have been deleted */ }
    })();
    return () => { cancelled = true; };
  }, [selectedId, token]);

  // Auto-save with 2s debounce
  const saveContent = useCallback(async (content: string, title: string, description: string) => {
    if (!selectedId) return;
    setSaveStatus("saving");
    try {
      await api(`/api/editor/pages/${selectedId}`, { method: "PUT", body: { content: sanitizeEditorContent(content), title, description }, token });
      setSaveStatus("saved");
      setPages((prev) => prev.map((p) => p.id === selectedId ? { ...p, status: p.status === "published" ? "changed" : p.status, title, description } : p));
    } catch { setSaveStatus("unsaved"); }
  }, [selectedId, token]);

  const debouncedSave = useCallback((content: string, title: string, description: string) => {
    setSaveStatus("unsaved");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => saveContent(content, title, description), 2000);
  }, [saveContent]);
  useEffect(() => () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); }, []);

  // Handlers
  const handleEditorChange = useCallback((md: string) => { setEditorContent(md); debouncedSave(md, editTitle, editDescription); }, [debouncedSave, editTitle, editDescription]);
  const handleTitleChange = (v: string) => { setEditTitle(v); debouncedSave(editorContent, v, editDescription); };
  const handleDescriptionChange = (v: string) => { setEditDescription(v); debouncedSave(editorContent, editTitle, v); };

  const handlePublish = async () => {
    if (!selectedId) return;
    setPublishing(true);
    try {
      const result = await api<{ ok: boolean; method?: string; commitSha?: string }>(`/api/editor/pages/${selectedId}/publish`, { method: "POST", token });
      setPages((prev) => prev.map((p) => p.id === selectedId ? { ...p, status: "published" } : p));
      if (result.method === "github" && result.commitSha) {
        setSaveStatus(`Published & committed to GitHub (${result.commitSha.slice(0, 7)})`);
      } else {
        setSaveStatus("Published");
      }
    } catch (err) {
      setSaveStatus("Publish failed");
      console.error("Publish failed:", err);
    } finally { setPublishing(false); }
  };

  const handleNewPage = async (path: string, title: string) => {
    try {
      const page = await api<PageEntry>("/api/editor/pages", { method: "POST", body: { projectSlug: slug, path, title }, token });
      setPages((prev) => [...prev, page]); setSelectedId(page.id); setShowNewPage(false);
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to create page"); }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!window.confirm("Delete this page? This cannot be undone.")) return;
    try {
      await api(`/api/editor/pages/${pageId}`, { method: "DELETE", token });
      setPages((prev) => prev.filter((p) => p.id !== pageId));
      if (selectedId === pageId) { const rem = pages.filter((p) => p.id !== pageId); setSelectedId(rem.length > 0 ? rem[0].id : null); }
    } catch { /* silently fail */ }
  };

  const saveLabel = saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : saveStatus === "unsaved" ? "Unsaved changes" : "";
  const saveDot = saveStatus === "saved" ? "var(--green, #15803d)" : saveStatus === "unsaved" ? "var(--yellow, #a16207)" : saveStatus === "saving" ? "var(--txM)" : "transparent";
  const sortedPages = [...pages].sort((a, b) => a.path.localeCompare(b.path));

  return (
    <div className="rv" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 13 }}>
        <a href={`${BASE}/`} onClick={(e) => { e.preventDefault(); nav("/"); }} style={{ color: "var(--txM)", textDecoration: "none", transition: "color .2s" }} {...hoverLink}>Projects</a>
        <span style={{ color: "var(--txM)" }}>›</span>
        <a href={`${BASE}/project/${slug}`} onClick={(e) => { e.preventDefault(); nav(`/project/${slug}`); }} style={{ color: "var(--txM)", textDecoration: "none", transition: "color .2s" }} {...hoverLink}>{slug}</a>
        <span style={{ color: "var(--txM)" }}>›</span>
        <span style={{ color: "var(--tx)", fontWeight: 500 }}>Editor</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }} onClick={() => nav(`/project/${slug}`)}>
            <ChevronLeftIcon /> Back
          </button>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontSize: 32, color: "var(--tx)", margin: 0 }}>Editor</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {saveLabel && (
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--txM)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: saveDot, display: "inline-block" }} />{saveLabel}
            </span>
          )}
          {selectedPage && (
            <button className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }} onClick={handlePublish} disabled={publishing || selectedPage.status === "published"}>
              {publishing ? "Publishing..." : "Publish"}
            </button>
          )}
        </div>
      </div>

      {/* Error banner */}
      {error && <div style={{ padding: "10px 16px", background: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.2)", borderRadius: 6, color: "var(--red, #b91c1c)", fontSize: 13, marginBottom: 16 }}>{error}</div>}

      {/* Two-panel layout */}
      <div style={{ display: "flex", gap: 20, minHeight: "calc(100vh - 220px)" }}>
        {/* LEFT: Page tree sidebar */}
        <div style={{ width: 260, minWidth: 260, background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--txM)" }}>Pages</span>
            <button onClick={() => setShowNewPage(true)} style={{ background: "none", border: "1px solid var(--bd)", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--txM)", fontFamily: "Inter, sans-serif", transition: "border-color .2s, color .2s" }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--coral)"; e.currentTarget.style.color = "var(--coral)"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--bd)"; e.currentTarget.style.color = "var(--txM)"; }}>
              <PlusIcon /> New
            </button>
          </div>
          {loading ? <div style={{ padding: 24, textAlign: "center", color: "var(--txM)", fontSize: 13 }}>Loading...</div>
           : sortedPages.length === 0 ? <div style={{ padding: 24, textAlign: "center", color: "var(--txM)", fontSize: 13 }}>No pages yet. Create your first page to get started.</div>
           : <div style={{ flex: 1, overflow: "auto" }}>
              {sortedPages.map((page) => {
                const active = page.id === selectedId;
                return (
                  <div key={page.id} onClick={() => setSelectedId(page.id)} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", background: active ? "var(--coralD, rgba(139,58,47,0.08))" : "transparent", transition: "background .15s", marginBottom: 2, display: "flex", alignItems: "flex-start", gap: 8 }}
                    onMouseOver={(e) => { if (!active) e.currentTarget.style.background = "var(--sfH, #eeece6)"; }}
                    onMouseOut={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                    <span style={{ color: active ? "var(--coral)" : "var(--txM)", marginTop: 2, flexShrink: 0 }}><FileIcon /></span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "var(--coral)" : "var(--tx)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{page.title || page.path}</div>
                      <div style={{ fontSize: 11, color: "var(--txM)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{page.path}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <StatusBadge status={page.status} />
                      <button onClick={(e) => { e.stopPropagation(); handleDeletePage(page.id); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--txM)", transition: "color .2s", borderRadius: 4, display: "flex" }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "var(--red, #b91c1c)")} onMouseOut={(e) => (e.currentTarget.style.color = "var(--txM)")} title="Delete page"><TrashIcon /></button>
                    </div>
                  </div>
                );
              })}
            </div>}
        </div>

        {/* RIGHT: Editor panel */}
        <div style={{ flex: 1, background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 12, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          {selectedPage ? (
            <>
              {/* Frontmatter editor */}
              <div style={{ padding: "20px 24px 0", borderBottom: "1px solid var(--bd)" }}>
                <input value={editTitle} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Page title"
                  style={{ width: "100%", border: "none", background: "transparent", fontSize: 24, fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontStyle: "italic", color: "var(--tx)", outline: "none", padding: "0 0 8px" }} />
                <textarea value={editDescription} onChange={(e) => handleDescriptionChange(e.target.value)} placeholder="Page description (optional)" rows={2}
                  style={{ width: "100%", border: "none", background: "transparent", fontSize: 13, fontFamily: "Inter, sans-serif", color: "var(--txM)", outline: "none", padding: "0 0 16px", resize: "none", lineHeight: 1.5 }} />
              </div>
              <div style={{ flex: 1, overflow: "auto" }}>
                <TomeEditor content={editorContent} onChange={handleEditorChange} placeholder="Start writing your documentation..." />
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "var(--txM)" }}>
              <FileIcon /><span style={{ fontSize: 14 }}>Select a page to edit</span>
              {pages.length === 0 && !loading && <button className="btn-primary" style={{ marginTop: 8, padding: "8px 18px", fontSize: 13 }} onClick={() => setShowNewPage(true)}>Create First Page</button>}
            </div>
          )}
        </div>
      </div>

      {showNewPage && <NewPageModal onClose={() => setShowNewPage(false)} onSubmit={handleNewPage} />}
    </div>
  );
}
