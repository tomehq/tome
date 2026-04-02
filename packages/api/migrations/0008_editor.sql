-- WYSIWYG editor storage — pages and version history.

CREATE TABLE IF NOT EXISTS editor_pages (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id),
  path TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL DEFAULT '',
  frontmatter TEXT DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(project_id, path)
);

CREATE TABLE IF NOT EXISTS editor_versions (
  id TEXT PRIMARY KEY,
  page_id TEXT NOT NULL REFERENCES editor_pages(id),
  content TEXT NOT NULL,
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_editor_pages_project ON editor_pages(project_id);
CREATE INDEX IF NOT EXISTS idx_editor_pages_status ON editor_pages(project_id, status);
CREATE INDEX IF NOT EXISTS idx_editor_versions_page ON editor_versions(page_id);
