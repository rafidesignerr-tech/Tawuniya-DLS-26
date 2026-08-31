# CLAUDE.md — Router

**This file points. It does not explain.**

Loading everything the design system knows into context produces worse output, not better. Follow the pointer for the task at hand and load nothing else.

---

## Non-negotiables

1. **Never invent a component or token name.** If it is not in the index or `tokens.json`, it does not exist. Say so.
2. **Search before creating.** Run `similar` first, always. Extend an existing component rather than adding a near-duplicate.
3. **No raw values in output.** Colours, spacing and radii come from [tokens](tokens/tokens.json). A hex code in generated output is a defect.
4. **Report before Compose.** Component work follows [ARC](context/arc-protocol.md). The Report is an approval gate, not a formality.
5. **Never hand-edit generated files.** `tokens/` and `index/` are build artifacts. Fix the generator.
6. **State known defects when they affect the answer.** See the table in [README](README.md).

---

## Route by task

| Task | Load | Then |
|---|---|---|
| Build a screen or component | [context/arc-protocol.md](context/arc-protocol.md) | run Audit → Report → Compose |
| "Do we already have X?" | — | `arc_query.py similar "X"` |
| "What breaks if I change X?" | — | `arc_query.py impact "X"` |
| "What is X made of?" | — | `arc_query.py trace "X"` |
| Choose a colour / spacing value | [layers/01-tokens.md](layers/01-tokens.md) | `token_query.py find` |
| "What does token X mean?" | — | `token_query.py show "X"` |
| Write component documentation | [layers/02-metadata.md](layers/02-metadata.md) + [context/intent-driven-context.md](context/intent-driven-context.md) | classify by intent category |
| Regenerate the index | [layers/03-indexing.md](layers/03-indexing.md) | [skills/tawuniya-dls-codebase-index.skill.md](skills/tawuniya-dls-codebase-index.skill.md) |
| Audit adoption / orphans / duplicates | [layers/04-orchestration.md](layers/04-orchestration.md) | `arc_query.py orphans` · `duplicates` |
| "Which tokens does X use?" | — | `arc_query.py tokens "X"` |
| "Which components use token T?" | — | `arc_query.py token "T"` |
| Find off-system styling | [layers/01-tokens.md](layers/01-tokens.md) | `arc_query.py legacy` |
| Check metadata depth before auditing | [metadata/README.md](metadata/README.md) | `metadata_query.py depth` |
| What work is outstanding | [audit/README.md](audit/README.md) | `arc_query.py gaps --severity high` |
| Find an icon | [foundations/README.md](foundations/README.md) | search `foundations/icons.toon` |
| Typography / elevation / grid | [foundations/README.md](foundations/README.md) | `foundations/*-styles.toon` |
| Is page X represented at all | — | `foundations/page-coverage.toon` |
| Understand the whole system | [ARCHITECTURE.md](ARCHITECTURE.md) | — |

---

## Path-scoped rules

Load only the rule for the path being touched.

| Path | Rule |
|---|---|
| `tokens/**` | Generated from Figma. Do not edit by hand. Semantic tokens must alias a primitive, never carry raw hex. Both modes required. → [Layer 1](layers/01-tokens.md) |
| `index/**` | Generated. Do not edit by hand. `component-usage.toon` is authoritative. Resolve components by node `id` — 19 names are duplicated. → [Layer 3](layers/03-indexing.md) |
| `metadata/**/*.ts` | **Authored — edit these.** One file per Figma page. Every record needs `figmaId`. → [Layer 2](layers/02-metadata.md) |
| `metadata/json/**`, `metadata/metadata-index.json` | Generated from the `.ts`. Do not edit. |
| `foundations/**`, `audit/**` | Generated. Do not edit — a gap is fixed at its source, not in the registry. |
| `layers/**`, `context/**` | Authored. Keep the nav header block accurate when structure changes. |
| `skills/**` | Authored. Each skill states its layer and its required inputs. |
| `scripts/**` | Python 3.8+, no third-party dependencies. Every query must be deterministic. |

---

## Commands

```bash
# Layer 1 — tokens
python scripts/token_query.py stats | audit | orphans | modes
python scripts/token_query.py find "button"
python scripts/token_query.py show "background/primary"
python scripts/token_query.py aliases "colors/grey/50"

# Layer 3 / 4 — components   (add --index index/relationships/component-usage.toon)
python scripts/arc_query.py --index index/relationships/component-usage.toon stats
python scripts/arc_query.py --index index/relationships/component-usage.toon find "button"
python scripts/arc_query.py --index index/relationships/component-usage.toon impact "Mobile/Button"
python scripts/arc_query.py --index index/relationships/component-usage.toon trace "Mobile/Accordion" --category atom
python scripts/arc_query.py --index index/relationships/component-usage.toon similar "copy to clipboard"
python scripts/arc_query.py --index index/relationships/component-usage.toon orphans | duplicates | hubs
python scripts/arc_query.py --index index/relationships/component-usage.toon tokens "Mobile/Button"
python scripts/arc_query.py --index index/relationships/component-usage.toon token "button/fill/brand-primary/active"
python scripts/arc_query.py --index index/relationships/component-usage.toon legacy

# Layer 2 — metadata
python scripts/metadata_query.py stats | depth | gaps | uncovered
python scripts/metadata_query.py show "Mobile/Button"

# The audit backlog
python scripts/arc_query.py --index index/relationships/component-usage.toon gaps --severity high
python scripts/arc_query.py --index index/relationships/component-usage.toon gaps --gap missing-usage -n 40
```

---

## Facts an agent should hold

- **320** components · 38 component pages · **911** relationships · density 2.85
- **19** duplicated names → **resolve by node id, never by name**
- **`Mobile/Button`**: 57 direct consumers, 75 at full depth, 60 variants, binds 64 tokens
- **680** tokens; **307** bound by components; **340 unused**; **111 legacy variables** in use
- **2,087** icons — only **71** are used by any component
- **127** metadata records · 42.5% coverage · **6.9%** carry `usage`
- **1,290 open audit items** — a missing field is a *finding*, not an error. Say so, cite the gap, carry on.
- **43 of 62 Figma pages** are represented. This is a projection, not a mirror.

---

*[README](README.md) · [ARCHITECTURE](ARCHITECTURE.md)*
