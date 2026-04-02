---
title: Feedback Widget
description: Collect page-level feedback from readers with built-in thumbs up/down and optional text input.
---

Tome includes a feedback widget at the bottom of every documentation page. Readers can rate pages with a thumbs up or thumbs down, helping you identify content that needs improvement.

## Default behavior

The feedback widget is **enabled by default**. No configuration is needed. Every page displays a "Was this page helpful?" prompt with thumbs up and thumbs down buttons.

## Configuration

Customize the feedback widget in `tome.config.js`:

```js
export default {
  name: "My Docs",
  feedback: {
    enabled: true,
    textInput: true,
  },
};
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Show or hide the feedback widget |
| `textInput` | `boolean` | `false` | Show a text input for additional comments after rating |

### Disabling feedback

```js
feedback: {
  enabled: false,
}
```

## Text input mode

When `textInput` is `true`, clicking a thumb button reveals a text field where the reader can leave an optional comment. The reader can submit the comment or skip it.

## Analytics integration

Feedback events are automatically tracked when [analytics](/v3/guides/search-analytics) is configured. Each feedback event includes:

- **Page ID** identifying which page was rated
- **Rating** (`up` or `down`)
- **Comment** (if text input is enabled and the reader provided one)

The feedback widget calls `window.__tome.trackFeedback(pageId, rating, comment)` to send events to your analytics endpoint.

## Persistence

Feedback state is stored in `localStorage` per page. If a reader has already rated a page, they see a "Thanks for your feedback!" message instead of the rating buttons on subsequent visits. This prevents duplicate submissions from the same browser.
