# foundations/ — Layer 1 Foundation Elements

> **Generated from Figma. Do not edit by hand.**
> Concept: [`../layers/01-tokens.md`](../layers/01-tokens.md)

Tokens are only half of Layer 1. These are the rest — the foundation pages of the DLS, extracted as data.

| File | Contents |
|---|---|
| `icons.toon` / `.json` | **2,087 icon component sets**, 11,519 variants, with `usedBy` |
| `text-styles.toon` | 23 typography styles, all variable-bound |
| `effect-styles.toon` | 10 elevation styles — 5 light, 5 dark |
| `grids.toon` | 1 layout grid — `Grids/Mobile` |
| `page-coverage.toon` | **Ledger of all 62 Figma pages** and whether the infrastructure represents them |
| `foundations.json` | Everything above, machine-native |

---

## Iconography

**2,087 icon component sets — and only 71 are used by any UI component.**

`icon-24/*` (1,038) and `icon-16/*` (1,032) are the two families. The remainder are `Car Logos` (327 variants), `Payment Method Card`, `Payment Logos`, `Flags`, `Spinner`.

That 106-of-2,087 figure is the single largest inventory finding in the system. Some is a deliberate icon library kept ahead of demand; at 97% unused, most is not.

```bash
python ../scripts/arc_query.py --index icons.toon stats
```

## Typography

23 styles, every one bound to variables (`fontSize`, `fontFamily`, `lineHeight`, `fontWeight`, `letterSpacing`) — so typography is fully tokenised. Three `riyal-*` styles carry Arabic descriptions; the other 20 have none.

Scale: `Display` 80/100 → `heading1` 40/50 → … → `label-xxs-regular` 10/12.

## Elevation

10 effect styles in matched light/dark pairs: `elevation-100-canvas` → `elevation-500-modal-window`. Dark variants add `INNER_SHADOW` layers that light does not use.

## Page coverage

The honest ledger. **62 pages in the Figma file; 43 represented here** — 38 component pages plus 5 foundation pages.

**Not indexed:** Cover, Getting Started, Release Notes, Updates Hub, Dark Mode References, Components Directory, Out of Scope / Deprecated, Covers, Organisms (UI Shell), Part 1, Style Guide, Playground, and the separator pages.

This file exists so nobody mistakes the infrastructure for a complete mirror of the Figma file. It is a projection, and this names exactly what it projects.

---

*[← Layer 1](../layers/01-tokens.md) · [README](../README.md)*
