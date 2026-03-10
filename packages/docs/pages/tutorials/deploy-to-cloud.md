---
title: Deploy to Tome Cloud
description: Publish your documentation site to Tome Cloud with a single command. Includes custom domain setup.
icon: cloud
---

# Deploy to Tome Cloud

Tome Cloud hosts your documentation site on a global CDN with automatic SSL, custom domains, and analytics. This tutorial covers the full deployment flow.

## Prerequisites

- A Tome documentation project (see [Create your first site](/docs/tutorials/first-site))
- Node.js 18+

## 1. Authenticate

Log in to your Tome Cloud account:

```bash
npx tome login
```

Enter your email address. You'll receive a magic link — click it to authenticate. Your API token is stored locally for future deployments.

## 2. Deploy

From your project directory:

```bash
npx tome deploy
```

Tome builds your site, collects the output files, and uploads them using hash-based deduplication. Only changed files are transferred, making subsequent deploys fast.

After deployment, your site is live at:

```
https://your-project.tome.dev
```

## 3. Add a custom domain

Register a custom domain for your docs:

```bash
npx tome domains:add docs.example.com
```

Tome returns DNS records you need to configure with your domain registrar:

```text
Type:  CNAME
Name:  docs
Value: your-project.tome.dev
```

After configuring DNS, verify the domain:

```bash
npx tome domains:verify docs.example.com
```

SSL is provisioned automatically once DNS propagates.

## 4. Manage domains

List all domains attached to your project:

```bash
npx tome domains:list
```

Remove a domain:

```bash
npx tome domains:remove docs.example.com
```

## Deployment details

Each deploy creates an immutable snapshot. You can view deployment history and analytics in the Tome Dashboard.

| Detail | Value |
|--------|-------|
| CDN | Cloudflare R2 (global edge) |
| SSL | Automatic via Cloudflare |
| Deduplication | Content-hash based |
| Rollback | Deploy any previous snapshot |

## Next steps

- **[Configuration guide](/docs/guides/configuration)** to customize your site before deploying
- **[CLI reference](/docs/reference/cli)** for the full list of deployment commands
