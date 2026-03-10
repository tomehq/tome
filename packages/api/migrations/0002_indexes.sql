-- Performance indexes for analytics queries and lookups
CREATE INDEX IF NOT EXISTS idx_analytics_site_type_created
  ON analytics_events(site_id, type, created_at);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_token ON users(api_token);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON deployments(status);
CREATE INDEX IF NOT EXISTS idx_deployments_project_created ON deployments(project_id, created_at);
