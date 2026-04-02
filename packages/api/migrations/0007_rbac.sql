CREATE TABLE IF NOT EXISTS project_roles (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id),
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('viewer', 'editor', 'admin', 'owner')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(project_id, email)
);

CREATE INDEX IF NOT EXISTS idx_project_roles_project ON project_roles(project_id);
CREATE INDEX IF NOT EXISTS idx_project_roles_email ON project_roles(email);
