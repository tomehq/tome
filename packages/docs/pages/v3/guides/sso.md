---
title: Single Sign-On (SSO)
description: Authenticate documentation visitors with SAML 2.0 or OpenID Connect through your identity provider.
---

SSO lets you restrict access to your hosted documentation site to members of your organization. Visitors authenticate through your identity provider (IdP) before they can view any page.

## Supported protocols

| Protocol | Standard | Use case |
|----------|----------|----------|
| SAML 2.0 | XML-based | Enterprise IdPs (Okta, Azure AD, OneLogin) |
| OIDC | OAuth 2.0 + JWT | Modern IdPs (Auth0, Google Workspace, Keycloak) |

## Requirements

- Your site must be deployed to Tome Cloud
- A Team plan is required for SSO
- You need admin access to your identity provider to configure the integration

## Configuring SAML 2.0

### 1. Get your SP metadata

Tome exposes a Service Provider metadata endpoint for your site:

```
https://api.tome.center/api/sso/sites/<your-slug>/metadata
```

Provide this URL to your IdP when creating a new SAML application. The metadata includes:

- **Entity ID**: Your site's unique identifier
- **ACS URL**: The Assertion Consumer Service endpoint where SAML responses are sent
- **NameID format**: Email address

### 2. Configure your IdP

In your IdP, create a new SAML application and set:

- **ACS URL**: `https://api.tome.center/api/sso/sites/<your-slug>/saml/acs`
- **Entity ID**: `https://api.tome.center/api/sso/sites/<your-slug>/metadata`
- **NameID format**: Email
- **Attributes**: Map `email` (required), `name` (optional), `groups` (optional)

### 3. Save the SSO config

Use the Tome Cloud API to save your SAML configuration:

```bash
curl -X POST https://api.tome.center/api/sso/config \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "projectSlug": "my-docs",
    "ssoType": "saml",
    "samlIdpSsoUrl": "https://idp.example.com/sso/saml",
    "samlIdpCertificate": "-----BEGIN CERTIFICATE-----\n...",
    "allowedDomains": ["example.com"]
  }'
```

## Configuring OIDC

### 1. Register a client

In your IdP, create a new OIDC application with:

- **Redirect URI**: `https://api.tome.center/api/sso/sites/<your-slug>/oidc/callback`
- **Scopes**: `openid email profile`
- **Grant type**: Authorization Code with PKCE

### 2. Save the SSO config

```bash
curl -X POST https://api.tome.center/api/sso/config \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "projectSlug": "my-docs",
    "ssoType": "oidc",
    "oidcIssuer": "https://idp.example.com",
    "oidcClientId": "your-client-id",
    "oidcClientSecret": "your-client-secret",
    "allowedDomains": ["example.com"]
  }'
```

Tome uses OIDC Discovery (`/.well-known/openid-configuration`) to auto-detect your IdP's authorization, token, userinfo, and JWKS endpoints.

## Allowed email domains

The `allowedDomains` field restricts which email addresses can authenticate. If a user's email domain is not in the list, access is denied after authentication.

```json
"allowedDomains": ["example.com", "contractor.example.com"]
```

Omit `allowedDomains` or pass an empty array to allow any email that successfully authenticates with your IdP.

## Session management

After successful authentication, Tome sets an `HttpOnly` session cookie (`tome_sso_session`) that is valid for **8 hours**. The session is a signed JWT (HMAC-SHA256) containing the user's email and group memberships.

When the session expires, the visitor is redirected to your IdP to re-authenticate.

## Managing SSO config

| Action | Method | Endpoint |
|--------|--------|----------|
| Create | `POST` | `/api/sso/config` |
| Read | `GET` | `/api/sso/config/:slug` |
| Delete | `DELETE` | `/api/sso/config/:slug` |

All management endpoints require a Bearer token from `tome login`.

## Combining with RBAC

SSO authenticates the visitor. For page-level access control based on roles, see [RBAC](/v3/guides/rbac). RBAC uses the email and groups from the SSO session to determine which pages a visitor can access.
