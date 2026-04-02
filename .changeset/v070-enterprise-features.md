---
"@tomehq/core": minor
"@tomehq/cli": minor
"@tomehq/theme": minor
"@tomehq/components": minor
---

v0.7.0 — Enterprise features, expanded platform

Core:
- Configurable API reference path (api.path config)
- White labeling (branding.powered toggle)
- Content negotiation (.md suffix, Accept header, llms.txt link tag)
- Reusable content snippets (::snippet{} directive with variables)
- User feedback widget enhancement (text input, analytics tracking)
- Search and feedback analytics (trackSearch, trackFeedback)
- Password protection for hosted sites (tome protect CLI, HMAC-signed sessions)
- AsyncAPI 2.x support (channels, protocols, code samples)
- API spec diff engine (tome api:diff CLI, breaking change detection)
- Calendar-based relative date formatting

CLI:
- tome protect / tome protect --remove
- tome api:diff with --json and --fail-on-breaking flags
- tome migrate docusaurus
- tome migrate vitepress

Theme:
- 6 new presets (ocean, rose, forest, slate, sunset, carbon) — 10 total
- WCAG 2.1 AA compliant contrast ratios across all presets
- AI semantic search (search.ai config, LLM-augmented answer card)
- Feedback widget with configurable text input
- URL-based route resolution for synthetic pages

Components:
- AsyncApiReference, ChannelCard, MessageBlock, ProtocolBadge, DirectionBadge
- AsyncParameterTable for channel parameters

Enterprise (API Worker):
- SSO (SAML 2.0 + OIDC) with signed JWT sessions
- RBAC (viewer/editor/admin/owner roles, access frontmatter)
- GitHub App auto-deploy (webhook handler, workflow dispatch)
- Dashboard UI for password, GitHub, SSO, RBAC, analytics tabs
- Domain scoping fix (per-project instead of global)
- Verify DNS button for pending custom domains

Security:
- HMAC-SHA256 signed password session tokens
- SAML signature validation in ACS endpoint
- XSS prevention in password page template
- ReDoS fixes across migration tools
- Error message sanitization
