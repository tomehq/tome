---
title: Custom Theme
description: How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.
icon: palette
---

Tome ships with two theme presets and extensive customization options. Every visual aspect — colors, fonts, spacing — can be adjusted through configuration or CSS variables.

## Presets

Choose between two built-in presets:

### Amber (default)

A warm, approachable aesthetic with golden accent tones. Good for developer documentation and technical guides.

```javascript
theme: {
  preset: "amber",
}
```

### Editorial

A refined, high-contrast aesthetic inspired by Swiss poster design and literary magazines. Features serif headings and a more dramatic visual presence.

```javascript
theme: {
  preset: "editorial",
}
```

See [Theme presets reference](/docs/reference/theme-presets) for the exact color values.

## Accent color

Override the preset's accent color with any hex value:

```javascript
theme: {
  preset: "amber",
  accent: "#2563eb",  // Blue accent instead of amber
}
```

Tome derives tint and dim variants automatically from your accent color.

## Color mode

Control dark/light mode behavior:

| Value | Behavior |
|-------|----------|
| `"auto"` | Follows system preference (default) |
| `"light"` | Always light mode |
| `"dark"` | Always dark mode |

Users can toggle the mode using the theme switch in the header.

## Custom fonts

Override any font family. Make sure to add the appropriate `<link>` tag to `index.html` if using custom Google Fonts.

```javascript
theme: {
  fonts: {
    heading: "Playfair Display",
    body: "Source Sans Pro",
    code: "Fira Code",
  },
}
```

## CSS variables

For fine-grained control, override CSS variables in a custom stylesheet. The key variables are:

| Variable | Description |
|----------|-------------|
| `--ac` | Accent color |
| `--acD` | Accent dark variant |
| `--acT` | Accent tint |
| `--bg` | Page background |
| `--sf` | Surface (cards, sidebar) |
| `--sfH` | Surface hover state |
| `--bd` | Border color |
| `--tx` | Primary text |
| `--tx2` | Secondary text |
| `--txM` | Muted text |

See the [Theme presets reference](/docs/reference/theme-presets) for the complete variable list with values per preset.

## Border radius

Adjust the global border radius:

```javascript
theme: {
  radius: "4px",   // Sharper corners
  radius: "12px",  // Rounder corners
}
```
