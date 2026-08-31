# Layer 1 — Token Layers

> **Position:** **Tokens** → [Metadata](02-metadata.md) → [Indexing](03-indexing.md) → [Orchestration](04-orchestration.md)
> **Depends on:** the Figma file `ydDjnPsHFoe8baKAw1w9eY`
> **Feeds:** every other layer — tokens are the vocabulary the rest of the system speaks
> **Data:** [`../tokens/`](../tokens/README.md) · [`../foundations/`](../foundations/README.md)
> **Skill:** [`../skills/figma-variables-generator/`](../skills/figma-variables-generator/SKILL.md)
> **Script:** [`../scripts/token_query.py`](../scripts/token_query.py)
> **Status:** ✅ extracted · exported 2026-08-31

---

## 1. What This Layer Is

Tokens are the smallest unit of decision in the design system. Every colour, space, radius and type ramp above them is either a token or a violation.

Layer 1's job is to make those decisions **portable** — extracted out of Figma into a versioned, machine-readable form that code, agents and CI can all read from the same source. A token that exists only inside a Figma file is a decision the rest of the system has to guess at.

---

## 2. Current State

| | |
|---|---|
| Source file | `ydDjnPsHFoe8baKAw1w9eY` |
| Exported | 2026-08-31 |
| Total tokens | **680** |
| Colours | 564 |
| Floats (spacing, sizing, radius, typography) | 80 |
| Strings | 3 |
| Text styles | 23 |
| Effect styles | 10 |

### Collections

| Collection | Vars | Modes | Role |
|---|---|---|---|
| **Primitives** | 285 | `Mode 1` | Raw base ramps — the palette |
| **Colors (V4)** | 362 | `Light`, `Dark` | Semantic tokens — the meaning |

This is the correct two-tier shape: primitives hold values, semantic tokens hold *intent*, and the semantic layer references the primitive layer rather than repeating hex codes.

### Float namespaces

| Prefix | Count |
|---|---|
| `typography/` | 37 |
| `sizing/` | 20 |
| `spacing/` | 14 |
| `radius/` | 9 |

### Semantic namespaces (Colors V4)

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

## 3. Structure

Each semantic token carries a value **and an alias** per mode:

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

The `alias` is what makes theming work: `background/primary` does not *own* `#F9FAFC`, it points at `colors/grey/50`. Change the primitive and every semantic token referencing it moves with it.

`tokens.css` is the same data compiled to custom properties with light/dark blocks and typography classes.

---

## 4. Audit — What The Export Reveals

Computed from `tokens.json`, not estimated.

### Strong

**Alias discipline is near-total.** 359 of 362 semantic tokens resolve to a primitive in both modes. Only three sit on raw hex — the `feedback/info` family (`icon/feedback/Info`, `background/feedback/info`, `text/feedback/info`). Three exceptions in 362 is a well-kept architecture.

**Light/Dark parity is complete.** Zero tokens missing a mode, in either direction. Every semantic token is themed.

### Needs attention

**Documentation is effectively absent — 4 descriptions across 362 semantic tokens, and 0 across 202 primitives.** ~1% coverage. The token *names* carry intent but nothing states it. This is the same gap [Layer 2](02-metadata.md) closes for components, one level down: a token an agent cannot interpret is a token it will misuse.

**Two spellings of the same colour family.** 14 token names use `grey`, 15 use `gray`. Near-even split, so neither is "the typo". Any lookup, search or codemod has to try both.

**Half the primitive palette is unreferenced.** 106 of 202 primitive colours are never aliased by a semantic token. Some are intentional palette headroom; at 52% the rest is dead weight that inflates the surface an agent has to reason about.

**A parallel dark primitive ramp that is barely used.** 70 primitives sit under `colors dark/`, but semantic tokens alias into that namespace only 13 times. Dark theming is being handled twice — once by the `Dark` mode, and again by a separate primitive family — and the second mechanism is mostly idle.

**130 semantic tokens are identical in Light and Dark** (36%). Legitimate for brand colours and transparencies. Worth confirming none of them are simply unfinished.

**`button/` is 43% of the semantic layer** — 154 tokens across `text` (42), `fill` (40), `border` (37) and `icon` (35). One component holds more semantic tokens than backgrounds, text, borders, icons and cards combined. This is the classic tier-leak: component-specific decisions living in the semantic tier. Not urgent, but it means "add a button variant" currently means "add four tokens".

### Found by joining with [Layer 3](03-indexing.md)

These only became visible once component token bindings were extracted from Figma.

**111 legacy variables are bound in components but do not exist in `tokens.json`.** They come from an older library or stale local variables, and they are not marginal:

| Legacy variable | Components binding it |
|---|---|
| `Icons/Primary` | 30 |
| `Font Name` | 26 |
| `Button/Primary/Text` | 15 |
| `Button/Primary/Icon` | 13 |
| `Checkbox & Radio/Default` | 9 |
| `Hieght/Buttons/XS` *(sic)* | 8 |
| `Icons/Dark`, `Icons/Gray` | 8 each |

Every one of these is a component styled outside the V4 token system. This is the single largest source of theme drift in the library.

```bash
python ../scripts/arc_query.py --index ../index/relationships/component-usage.toon legacy
```

**340 of 647 tokens are never bound by any component** — 53%. Only **307** are in real use. Some is deliberate headroom; at this scale most is not.

### Discrepancy to resolve

The DLS context skill states **643 tokens**; this export reports **680**. Reconcile before either number is quoted externally.

---

## 4b. Foundation Elements

Tokens are half of Layer 1. The DLS foundation pages are the other half, and they are now extracted — see [`../foundations/`](../foundations/README.md).

| Foundation | Count | File |
|---|---|---|
| Icon component sets | **2,087** (11,519 variants) | [`icons.toon`](../foundations/icons.toon) |
| Typography styles | 23 | [`text-styles.toon`](../foundations/text-styles.toon) |
| Elevation styles | 10 (5 light / 5 dark) | [`effect-styles.toon`](../foundations/effect-styles.toon) |
| Layout grids | 1 | [`grids.toon`](../foundations/grids.toon) |

**The finding: 71 of 2,087 icons are used by any UI component.** 97% of the icon library is unreferenced. Some of that is a library deliberately kept ahead of demand — at this scale, most is not.

Typography is fully tokenised: every one of the 23 styles binds `fontSize`, `fontFamily`, `lineHeight`, `fontWeight` and `letterSpacing` to variables. Elevation comes in matched light/dark pairs, with the dark set adding inner-shadow layers the light set does not use.

---

## 5. Extraction Pipeline

**Current path:** the `dls4-figma-sync-tokens` GitHub Action calls the Figma REST API, splits Light/Dark, and opens a PR.

**Current status: broken.** The Action fails with `403 Token expired`. Two things to check in order:

1. The personal access token expired → regenerate with **no expiration** and scope `file_variables:read`, then update the repo secret with **the raw token only** — no JSON wrapper, no quotes.
2. If it still fails: the Figma Variables REST API is **Enterprise-only** — *"you must have a Full seat in an Enterprise org"*. If Tawuniya is not on Enterprise, this route is closed regardless of the token.

**Fallback if REST is closed:** the `figma-console` plugin bridge (`figma_get_variables`, `figma_export_tokens`) reads the same variables through the plugin API — no Enterprise requirement, no token to expire, but it needs Figma open, so it is manual rather than scheduled. Failing that, the Variables Import/Export plugin exports the same JSON by hand.

Either way, keep the second half of the Action — the merge, light/dark split and PR creation are still worth automating even when extraction is manual.

---

## 6. Querying

```bash
python ../scripts/token_query.py stats            # counts, collections, coverage
python ../scripts/token_query.py find "button"    # search token names
python ../scripts/token_query.py show "background/primary"
python ../scripts/token_query.py audit            # the findings in §4, recomputed
python ../scripts/token_query.py orphans          # primitives nothing aliases
```

---

## 7. Definition of Done

- [x] Tokens extracted from Figma into versioned JSON + CSS
- [x] Two-tier structure with semantic tokens aliasing primitives
- [x] Full Light/Dark parity
- [ ] Extraction pipeline running unattended
- [ ] One spelling of grey/gray
- [ ] Descriptions on semantic tokens (currently ~1%)
- [ ] Unreferenced primitives triaged (106 never aliased)
- [ ] **111 legacy variable bindings migrated to V4 tokens**
- [ ] **340 unused tokens triaged**
- [ ] `colors dark/` namespace resolved or removed
- [ ] 643 vs 680 discrepancy settled

---

## 8. How This Connects

**Up to [Layer 2](02-metadata.md)** — component metadata names the tokens each component is allowed to use. Without Layer 1 those are strings; with it they are checkable references.

**Up to [Layer 3](03-indexing.md)** — the index maps components; tokens are what those components are made of. Joining them answers "which components use `button/fill/primary`".

**Up to [Layer 4](04-orchestration.md)** — ARC's Compose phase builds from tokens, not from raw values. A hex code in output is a protocol violation.

---

*[← Architecture](../ARCHITECTURE.md) · [Layer 2 → Metadata](02-metadata.md)*
