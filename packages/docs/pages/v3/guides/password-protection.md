---
title: Password Protection
description: Restrict access to your hosted documentation site with a password.
---

Password protection adds a login screen to your Tome Cloud site, requiring visitors to enter a password before they can view any page. This is useful for internal documentation, pre-release content, or client-facing docs that should not be publicly accessible.

## Setting a password

Use the `tome protect` command to enable password protection:

```bash
npx @tomehq/cli protect
```

You will be prompted to enter a password. The password is hashed locally before being sent to the server. The plaintext password is never transmitted or stored.

## Removing password protection

To make your site publicly accessible again:

```bash
npx @tomehq/cli protect --remove
```

## How it works

When password protection is enabled:

1. Visitors who navigate to your site are redirected to a branded password page
2. After entering the correct password, a session cookie (`tome_site_session`) is set
3. The cookie is valid for **24 hours**, after which the visitor must re-enter the password
4. The cookie is `HttpOnly` and `SameSite=Lax` for security

## Requirements

- Your site must be deployed to Tome Cloud (`tome deploy`)
- You must be authenticated (`tome login`)
- The project slug is read from your local `.tome/` config

## Notes

- Password protection applies to the entire site. You cannot protect individual pages with this feature. For page-level access control, see [RBAC](/v3/guides/rbac).
- The password is hashed with a secure one-way hash. There is no way to recover a forgotten password. Use `tome protect` to set a new one.
- Search engines and AI agents cannot access password-protected sites.
