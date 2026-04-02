-- SSO (SAML 2.0 + OIDC) support for hosted documentation sites.
-- Enterprise feature gated to team plan.

-- SSO configuration per project
CREATE TABLE IF NOT EXISTS sso_configs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id),
  sso_type TEXT NOT NULL CHECK(sso_type IN ('saml', 'oidc')),
  enabled INTEGER NOT NULL DEFAULT 0,
  -- SAML 2.0 fields
  saml_idp_sso_url TEXT,
  saml_idp_certificate TEXT,
  saml_entity_id TEXT,
  -- OIDC fields
  oidc_issuer TEXT,
  oidc_client_id TEXT,
  oidc_client_secret TEXT,
  -- Shared settings
  allowed_domains TEXT, -- JSON array: ["acme.com", "example.com"]
  auto_provision INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Link projects to SSO
ALTER TABLE projects ADD COLUMN sso_enabled INTEGER NOT NULL DEFAULT 0;
ALTER TABLE projects ADD COLUMN sso_config_id TEXT REFERENCES sso_configs(id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sso_configs_project ON sso_configs(project_id);
