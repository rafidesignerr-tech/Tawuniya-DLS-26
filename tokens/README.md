# tokens/ — Layer 1 Data

> **Generated from Figma. Do not edit by hand.**
> Concept and audit: [`../layers/01-tokens.md`](../layers/01-tokens.md) · Query: [`../scripts/token_query.py`](../scripts/token_query.py)

| File | Contents |
|---|---|
| `tokens.json` | Full structured export — all variables, mode values, aliases, descriptions, text and effect styles |
| `tokens.css` | Compiled CSS custom properties with light/dark blocks and typography classes |

Source: Figma file `ydDjnPsHFoe8baKAw1w9eY` · exported **2026-08-31**

---

## Contents

| | Count |
|---|---|
| Colour variables | 564 |
| Float variables | 80 |
| String variables | 3 |
| Text styles | 23 |
| Effect styles | 10 |
| **Total** | **680** |

| Collection | Vars | Modes | Role |
|---|---|---|---|
| Primitives | 285 | `Mode 1` | Raw ramps — the palette |
| Colors (V4) | 362 | `Light`, `Dark` | Semantic — the meaning |

---

## Schema

### Top level

```
file            source file name
date            export date
collections[]   { name, modes[], varCount }
totals          { colors, floats, strings, bools, textStyles, effectStyles, paintStyles }
colorVariables[]
floatVariables[]
stringVariables[]
textStyles[]
effectStyles[]
paintStyles[]
```

### Colour variable

```json
{
  "name": "background/primary",
  "collection": "Colors (V4)",
  "description": "Main page background, on top of which UI elements sit.",
  "modes": {
    "Light": { "hex": "#F9FAFC", "alias": "colors/grey/50" },
    "Dark":  { "hex": "#000000", "alias": "colors/neutral/Black" }
  }
}
```

| Field | Meaning |
|---|---|
| `name` | Slash-delimited path. The first segment is the namespace. |
| `collection` | `Primitives` or `Colors (V4)` |
| `description` | Optional. Present on **4 of 362** semantic tokens. |
| `modes` | One entry per mode. Primitives have only `Mode 1`. |
| `modes.*.hex` | Resolved value |
| `modes.*.alias` | The primitive this token points at — **this is what makes theming work** |
| `modes.*.opacity` | Optional, 0–100 |

A semantic token with no `alias` owns a raw value and will not follow a primitive change. There are three: `icon/feedback/Info`, `background/feedback/info`, `text/feedback/info`.

### Float variable

```json
{ "name": "spacing/spacing-xxs", "collection": "Primitives", "modes": { "Mode 1": { "value": 2 } } }
```

Namespaces: `typography/` (37) · `sizing/` (20) · `spacing/` (14) · `radius/` (9). All values in pixels.

### Text style

```json
{ "name": "Display", "font": "Tawuniya Medium", "size": 80, "lineHeight": "100", "letterSpacing": 0 }
```

### Effect style

```json
{ "name": "light/elevation-100-canvas", "effects": ["DROP_SHADOW blur:2 offset:0,1"] }
```

---

## Namespaces (Colors V4)

| Prefix | Count | Share |
|---|---|---|
| `button/` | 154 | 43% |
| `fill/` | 42 | 12% |
| `icon/` | 36 | 10% |
| `tag/` | 36 | 10% |
| `text/` | 34 | 9% |
| `border/` | 16 | 4% |
| `background/` | 11 | 3% |
| `toast/` | 10 | 3% |
| `branding/` | 10 | 3% |
| `controls/` | 7 | 2% |
| `cards/` | 6 | 2% |

---

## Known Defects

| Issue | Detail |
|---|---|
| **Documentation** | 4 of 362 semantic tokens have descriptions; 0 of 202 primitives |
| **Two spellings** | `grey` in 14 names, `gray` in 15 — neither is the typo |
| **Unreferenced primitives** | 106 of 202 never aliased by any semantic token |
| **Parallel dark ramp** | 70 primitives under `colors dark/`, aliased only 13 times |
| **Identical modes** | 130 of 362 semantic tokens have the same value in Light and Dark |
| **Count disagreement** | DLS context skill says 643; this export says 680 |
| **Raw hex** | 3 semantic tokens carry no alias (the `feedback/info` family) |

Recompute any of these at any time:

```bash
python ../scripts/token_query.py audit
python ../scripts/token_query.py orphans
python ../scripts/token_query.py modes
```

---

## Regeneration

`dls4-figma-sync-tokens` (GitHub Action) — **currently failing**: `403 Token expired`.

1. Regenerate the Figma PAT with no expiration and scope `file_variables:read`
2. Store the **raw token only** in the repo secret — no JSON wrapper, no quotes
3. If it still fails, the Variables REST API is Enterprise-gated — see [`../layers/01-tokens.md`](../layers/01-tokens.md#5-extraction-pipeline) for fallbacks

---

*[← Layer 1](../layers/01-tokens.md) · [README](../README.md)*
