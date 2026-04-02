-- GitHub App integration for auto-deploy.
-- Adds columns to projects table for repo connection.

ALTER TABLE projects ADD COLUMN github_repo TEXT;
ALTER TABLE projects ADD COLUMN github_installation_id INTEGER;
ALTER TABLE projects ADD COLUMN github_branch TEXT DEFAULT 'main';

CREATE INDEX IF NOT EXISTS idx_projects_github_repo ON projects(github_repo);
