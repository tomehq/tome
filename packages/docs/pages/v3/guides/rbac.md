---
title: Role-Based Access Control
description: Restrict page visibility based on user roles with page-level access gating.
---

RBAC lets you control which pages are visible to which users based on their assigned role. This is useful for sites where some content is restricted to editors, admins, or specific teams.

## Requirements

- Your site must be deployed to Tome Cloud
- [SSO](/v3/guides/sso) must be enabled (RBAC uses the authenticated email to look up roles)

## Role hierarchy

Tome defines four roles in ascending order of privilege:

| Role | Level | Description |
|------|-------|-------------|
| `viewer` | 1 | Can view pages gated at `viewer` level or below |
| `editor` | 2 | Can view pages gated at `editor` level or below |
| `admin` | 3 | Can view all pages, manage roles |
| `owner` | 4 | Full access, project owner |

A user with a higher-level role automatically has access to pages gated at lower levels. An `admin` can see `editor` and `viewer` pages.

## Page-level access

Add an `access` field to a page's frontmatter to restrict who can view it:

```markdown
---
title: Internal Architecture
access: editor
---

This page is only visible to users with the `editor` role or higher.
```

Pages without an `access` field are visible to any authenticated user (if SSO is enabled) or to everyone (if SSO is not enabled).

## Assigning roles

Use the Tome Cloud API to assign roles to email addresses:

### Add or update a role

```bash
curl -X POST https://api.tome.center/api/roles \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "projectSlug": "my-docs",
    "email": "alice@example.com",
    "role": "editor"
  }'
```

If the email already has a role, it is updated to the new value.

### List roles for a project

```bash
curl https://api.tome.center/api/roles/my-docs \
  -H "Authorization: Bearer <your-token>"
```

Returns all role assignments with email, role, and creation date.

### Remove a role

```bash
curl -X DELETE https://api.tome.center/api/roles \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "projectSlug": "my-docs",
    "email": "alice@example.com"
  }'
```

## Who can manage roles

Only project owners and users with the `admin` role can assign, list, or remove roles. The project owner (the account that created the project) always has full access regardless of role assignments.

## How access checks work

When a visitor requests a page with an `access` field:

1. Tome reads the visitor's email from the SSO session cookie
2. It looks up the visitor's role in the project's role table
3. If the visitor's role meets or exceeds the page's `access` requirement, the page is served
4. Otherwise, access is denied

If the visitor has no role entry at all, access is denied for any page that has an `access` field.
