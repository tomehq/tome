---
"@tomehq/core": patch
"@tomehq/cli": patch
"@tomehq/theme": patch
"@tomehq/components": patch
"@tomehq/editor": patch
---

Security: resolve 5 Dependabot alerts

- Bump `isomorphic-dompurify` to `^3.12.0` in `@tomehq/core`, lifting the transitive `dompurify` from `3.3.3` to `3.4.2`. Patches four medium-severity advisories: SAFE_FOR_TEMPLATES bypass in RETURN_DOM mode, FORBID_TAGS bypass via function-based ADD_TAGS predicate, prototype-pollution-to-XSS via CUSTOM_ELEMENT_HANDLING fallback, and the ADD_TAGS short-circuit FORBID_TAGS bypass.
- Bump `hono` to `^4.12.16` in `@tomehq/api` (private), patching improper JSX attribute handling that allowed HTML injection in `hono/jsx` SSR.
