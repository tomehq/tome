-- Password protection for hosted documentation sites.
-- Adds columns to the projects table for optional password-gating.

ALTER TABLE projects ADD COLUMN password_required INTEGER NOT NULL DEFAULT 0;
ALTER TABLE projects ADD COLUMN password_hash TEXT;
