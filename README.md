# Tawuniya Design System — Agentic Infrastructure

Machine-readable infrastructure for the Tawuniya Design System (DLS): tokens, component intent, a relationship index, and the protocol that reads them.

**The premise:** an AI agent asked *"what is in this design system"* explores, and gets a different answer every time. Every layer here exists to replace exploration with lookup.

---

## Start Here

| If you want to… | Read |
|---|---|
| Understand how it all fits together | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Have an agent work in this repo | [CLAUDE.md](CLAUDE.md) — the router |
| Know what a token means | [Layer 1 — Tokens](layers/01-tokens.md) |
| Know how to use a component | [Layer 2 — Metadata](layers/02-metadata.md) |
| Know where a component is used | [Layer 3 — Indexing](layers/03-indexing.md) |
| Build something correctly | [Layer 4 — Orchestration](layers/04-orchestration.md) → [ARC](context/arc-protocol.md) |

---

## The Four Layers

```
┌──────────────────────────────────────────────────────────────┐
│  Layer 4 · ORCHESTRATION    strategy — which capability,      │
│                             on what context, producing what   │
├──────────────────────────────────────────────────────────────┤
│  Layer 3 · INDEXING         the map — what exists, what uses  │
│                             what, how heavily                 │
├──────────────────────────────────────────────────────────────┤
│  Layer 2 · METADATA         intent — how to use it, when not  │
│                             to, what it may not contain       │
├──────────────────────────────────────────────────────────────┤
│  Layer 1 · TOKENS           vocabulary — every colour, space, │
│                             radius and type decision          │
└──────────────────────────────────────────────────────────────┘
```

Each layer answers a question the one below it cannot.

| Layer | Question | Status |
|---|---|---|
| [1 · Tokens](layers/01-tokens.md) | What are the values? | ✅ **680 tokens + 2,087 icons, 23 type styles, 10 elevations** |
| [2 · Metadata](layers/02-metadata.md) | How is this used? | 🟡 **127 records · 42.5% coverage · gaps registered** |
| [3 · Indexing](layers/03-indexing.md) | Where is it used? | ✅ **320 components · 911 direct relationships · 418 token bindings** |
| [4 · Orchestration](layers/04-orchestration.md) | What should I do? | 🟡 **runnable · [1,290 audit items](audit/README.md) queued** |

---

## Repository Map

```
tawuniya-dls/
├── README.md                    you are here
├── ARCHITECTURE.md              how the layers connect, and why
├── CLAUDE.md                    router — what to load, when
│
├── layers/                      one doc per layer: concept + real state
│   ├── 01-tokens.md
│   ├── 02-metadata.md
│   ├── 03-indexing.md
│   └── 04-orchestration.md
│
├── context/                     the frameworks the layers are built on
│   ├── arc-protocol.md          Audit → Report → Compose
│   ├── intent-driven-context.md classifying context by intent
│   └── agentic-design-systems.md  the shift from docs to infrastructure
│
├── tokens/                      LAYER 1 DATA — variables
│   ├── tokens.json              680 tokens, 2 collections, Light + Dark
│   ├── tokens.css               compiled custom properties
│   └── README.md                schema and field reference
│
├── foundations/                 LAYER 1 DATA — foundation elements
│   ├── icons.*                  2,087 icon sets, with usedBy
│   ├── text-styles.toon         23 typography styles
│   ├── effect-styles.toon       10 elevations (light + dark)
│   ├── grids.toon               layout grid
│   ├── page-coverage.toon       all 62 Figma pages: indexed or not
│   └── README.md
│
├── metadata/                    LAYER 2 DATA
│   ├── *.ts                     36 authored files (source of truth)
│   ├── json/                    generated JSON mirror — machine-native
│   ├── metadata-index.json      consolidated, keyed by node id
│   └── README.md                validation, coverage, depth
│
├── audit/                       THE GAPS REGISTRY
│   ├── gaps.toon / .json        1,290 work items, ranked
│   ├── summary.json
│   └── README.md                why gaps are findings, not blockers
│
├── index/                       LAYER 3 DATA
│   ├── index.toon / .json       entry point + statistics
│   ├── relationships/
│   │   ├── component-usage.*    inventory + graph + token bindings
│   │   └── token-usage.*        token → components reverse map
│   └── README.md                schema, fields, known defects
│
├── skills/                      invocable capabilities
│   ├── tawuniya-dls-arc.skill.md
│   └── tawuniya-dls-codebase-index.skill.md
│
├── scripts/                     the query engines
│   ├── token_query.py           Layer 1
│   ├── metadata_query.py        Layer 2
│   ├── arc_query.py             Layer 3 + 4
│   └── index_codebase.py        Layer 3 generator (code repos)
│
└── .github/workflows/           regeneration
```

---

## Quick Queries

```bash
# Layer 1 — tokens
python scripts/token_query.py stats
python scripts/token_query.py audit
python scripts/token_query.py show "background/primary"

# Layer 2 — metadata
python scripts/metadata_query.py stats
python scripts/metadata_query.py depth
python scripts/metadata_query.py gaps

# Layer 3 / 4 — components
IDX=index/relationships/component-usage.toon
python scripts/arc_query.py --index $IDX stats
python scripts/arc_query.py --index $IDX impact "Mobile/Button"
python scripts/arc_query.py --index $IDX tokens "Mobile/Button"
python scripts/arc_query.py --index $IDX token "button/fill/brand-primary/active"
python scripts/arc_query.py --index $IDX legacy
python scripts/arc_query.py --index $IDX gaps --severity high
python scripts/arc_query.py --index $IDX gaps --gap missing-usage -n 40
```

---

## Scope — what this is, and is not

This is a **projection** of the Figma file, not a mirror. [`foundations/page-coverage.toon`](foundations/page-coverage.toon) is the honest ledger: **43 of 62 pages** are represented — 38 component pages and 5 foundation pages. Cover, Getting Started, Release Notes, Dark Mode References, Style Guide, Playground and the deprecated pages are not.

It carries structure, relationships, token bindings and intent. It does not carry geometry, imagery, prototypes, or Figma's own component descriptions. It is a snapshot; nothing syncs.

---

## Findings

Every one of these is queryable, and every one is a row in the [gaps registry](audit/README.md).

| Where | Issue |
|---|---|
| [Tokens](layers/01-tokens.md) | **111 legacy variables** bound in components but absent from `tokens.json` — `Icons/Primary` (30 components), `Font Name` (26), `Button/Primary/Text` (15) |
| [Tokens](layers/01-tokens.md) | **340 of 647 tokens are never used** by any component |
| [Tokens](layers/01-tokens.md) | 4 of 362 semantic tokens documented; `grey` (14) vs `gray` (15) |
| [Tokens](layers/01-tokens.md) | Token count disagreement: DLS context says 643, export says **680** |
| [Metadata](metadata/README.md) | Coverage 45%, but **intent depth 12%** — `usage`/`antiPatterns` on a tenth of records |
| [Metadata](metadata/README.md) | 36 records carry no `figmaId` — ambiguous against duplicated names |
| [Metadata](metadata/README.md) | BETA components (78) and Sales Journeys (7) uncovered |
| [Index](index/README.md) | **19 duplicated names** — resolve by node id, never by name |
| [Index](index/README.md) | 170 orphans, untriaged |
| [Index](index/README.md) | 185 components uncategorised (no metadata → heuristic fallback) |
| Pipeline | Figma REST token sync failing; the plugin-API extractor is the working path |

### Headline findings

| Finding | Number |
|---|---|
| **Icons never used by any component** | **2,016 of 2,087** (97%) |
| Components with no `usage` documentation | 298 |
| Components binding legacy variables (off-system styling) | 153 |
| Tokens defined but never bound | 340 of 647 |
| Components with no metadata at all | 184 |
| Orphan components | 170 |

**Relationships re-extracted and confirmed at 911 direct edges** — consistent with the earlier export, so the composition graph was already sound. An intermediate extraction that counted transitively nested instances inflated this to 1,970; that was a measurement error, corrected in v3.1.

**Fixed in this revision:** the 320-vs-318 row count, guessed categories, the lossy JSON mirror, the missing Layer 1 ↔ Layer 3 join, the stale relationship graph, `.ts`-only metadata, and the absent foundation elements.

## Sources

- Figma DLS file — `ydDjnPsHFoe8baKAw1w9eY`
- Blueprint file — `G9eRetWyxZgWv6xOgq9Wv5`
- [`tawuniya-dls-index`](https://github.com/rafidesignerr-tech/tawuniya-dls-index) — original Layer 3 export
- [`design-tokens`](https://github.com/rafidesignerr-tech/design-tokens) — original Layer 1 export
