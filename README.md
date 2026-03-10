<p align="center">
  <img src="https://tome.center/logo.svg" width="80" alt="Tome" />
</p>
<h1 align="center"><em>Tome.</em></h1>
<p align="center">Beautiful documentation that doesn't cost a fortune.</p>

<p align="center">
  <a href="https://github.com/vxcozy/tome/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" /></a>
  <a href="https://github.com/vxcozy/tome/actions"><img src="https://github.com/vxcozy/tome/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
</p>

---

Tome is an open-source documentation platform for developers. Write Markdown, get a beautiful docs site. Self-host for free or deploy to Tome Cloud.

## Quickstart

```bash
npx @tome/create my-docs
cd my-docs
npm run dev
```

That's it. Open [localhost:3000](http://localhost:3000) to see your docs.

## Why Tome?

| | Tome | Mintlify | Docusaurus |
|---|---|---|---|
| **Self-host** | Free forever | No | Free |
| **Managed hosting** | $19/mo | $300+/mo | No |
| **Unlimited sites** | Yes | $300 each | Manual |
| **API ref (OpenAPI)** | Built-in | Built-in | Plugin |
| **Search** | Pagefind + Algolia | Built-in | Algolia |
| **Setup time** | ~2 min | ~5 min | ~30 min |
| **Vendor lock-in** | None | Moderate | None |

## Features

- **Markdown & MDX** — Write docs in Markdown with React components
- **Syntax highlighting** — Shiki with every language and theme
- **Built-in search** — Pagefind (local) or Algolia DocSearch
- **API references** — Auto-generate from OpenAPI specs with interactive playground
- **Theming** — Full CSS control, dark/light mode, 6 built-in presets
- **Deploy anywhere** — Static output for Vercel, Netlify, S3, or self-host
- **AI chat** — Embedded AI assistant with BYOK (OpenAI + Anthropic)
- **MCP server** — Machine-readable output for AI tools
- **i18n** — Multi-language support with locale directories
- **Versioning** — Multi-version docs with version switcher
- **Analytics** — Privacy-first, no cookies, <1KB script
- **Custom domains** — Full DNS management with SSL

## Documentation

Visit [tome.center/docs](https://tome.center/docs) for the full documentation.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

MIT © [Tome Contributors](https://github.com/vxcozy/tome/graphs/contributors)
