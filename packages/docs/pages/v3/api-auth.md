---
title: Authentication
description: Configure API authentication for the interactive playground — Bearer tokens, API keys, and custom headers.
icon: lock
---

The API playground supports several authentication methods. Users can enter credentials that are included in test requests.

## Configuration

Add auth settings to your API config:

```javascript
export default {
  api: {
    spec: "./openapi.yaml",
    playground: true,
    auth: {
      type: "bearer",  // "bearer", "apiKey", or "basic"
    },
  },
};
```

## Bearer token

The most common pattern for modern APIs. A token input appears in the playground header:

```javascript
auth: {
  type: "bearer",
}
```

Requests include the header:
```
Authorization: Bearer <user-entered-token>
```

## API key

For APIs that use key-based authentication:

```javascript
auth: {
  type: "apiKey",
  name: "X-API-Key",     // Header name
  in: "header",          // "header" or "query"
}
```

When `in` is `"query"`, the key is appended as a URL parameter instead.

## Basic auth

For username/password authentication:

```javascript
auth: {
  type: "basic",
}
```

The playground shows username and password fields. The value is sent as a Base64-encoded `Authorization: Basic` header.

## OpenAPI security schemes

If your OpenAPI spec defines security schemes, Tome reads them automatically:

```yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
```

When security schemes are defined in the spec, Tome uses them instead of the manual config. You don't need to configure `auth` separately.

## Security notes

- Credentials entered in the playground are stored only in browser memory for the current session
- Credentials are never sent to Tome's servers — requests go directly from the browser to your API
- CORS must be enabled on your API server for playground requests to work
- For production APIs, consider providing a sandbox environment URL through the `baseUrl` config
