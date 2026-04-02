---
title: AI Search
description: Augment keyword search results with AI-generated answers using your own API key.
---

AI search adds an LLM-powered answer card above your standard Pagefind search results. When a reader searches your docs, the AI reads the top matching pages and synthesizes a concise answer.

## Requirements

AI search requires two config options to be set:

1. `search.ai` must be `true`
2. `ai.enabled` must be `true` (this configures the AI provider and API key)

```js
// tome.config.js
export default {
  name: "My Docs",
  search: {
    ai: true,
  },
  ai: {
    enabled: true,
    provider: "anthropic", // or "openai"
    apiKeyEnv: "TOME_AI_KEY",
  },
};
```

## How it works

1. The reader types a query in the search modal (`Ctrl+K` / `Cmd+K`)
2. Pagefind runs its standard keyword search and returns matching pages
3. The top 5 results are sent as context to the configured LLM
4. The AI generates a 2-3 sentence answer based on the documentation content
5. The answer appears in a highlighted card above the keyword results

The keyword results remain fully functional. The AI answer is an addition, not a replacement.

## Bring your own key (BYOK)

AI search uses the same API key and provider as [AI Chat](/v3/guides/ai-chat). Set your API key in the environment variable specified by `apiKeyEnv` (default: `TOME_AI_KEY`):

```bash
TOME_AI_KEY=sk-ant-... npx @tomehq/cli dev
```

Supported providers:

| Provider | `provider` value | Models |
|----------|-----------------|--------|
| Anthropic | `"anthropic"` | Claude (default) |
| OpenAI | `"openai"` | GPT-4o (default) |

## Privacy

The API key is injected at build time and used client-side. Search queries and page content are sent directly from the reader's browser to the AI provider. Tome does not proxy or store these requests.

## Disabling AI search

Remove `search.ai` or set it to `false`:

```js
search: {
  ai: false,
},
```

Standard Pagefind keyword search continues to work without any AI features.
