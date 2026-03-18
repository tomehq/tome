---
"@tomehq/theme": minor
"@tomehq/core": minor
"@tomehq/cli": minor
"@tomehq/components": minor
---

Add cipher and mint theme presets, widen API reference layout, default to light mode

- **Cipher preset**: Cyberpunk aesthetic with acid yellow-green text (#d4ff00), vibrant blue accents (#6666ff), Bodoni Moda/Space Grotesk/Source Code Pro typography
- **Mint preset**: Mintlify-inspired with emerald green accents (#0ea371), Inter font, dark gray surfaces — clean SaaS-docs feel
- Both presets are WCAG 2.1 AA compliant (4.5:1 normal text, 3:1 large text)
- API reference pages now use 1100px max-width instead of 760px for better endpoint display
- Removed # prefix from h2 subheadings for cleaner content styling
- All apps default to light mode (respects system dark preference, falls back to light)
- All preset Google Fonts now loaded (amber, editorial, cipher, mint)
