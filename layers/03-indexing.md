# Layer 3 — Indexing & Relationship Mapping

> **Position:** [Tokens](01-tokens.md) → [Metadata](02-metadata.md) → **Indexing** → [Orchestration](04-orchestration.md)
> **Depends on:** the Figma file `ydDjnPsHFoe8baKAw1w9eY` (source of the current index)
> **Feeds:** [Layer 4](04-orchestration.md) — every ARC query reads this index
> **Data:** [`../index/`](../index/README.md) · [`../foundations/`](../foundations/README.md) · gaps in [`../audit/`](../audit/README.md)
> **Skill:** [`../skills/tawuniya-dls-codebase-index.skill.md`](../skills/tawuniya-dls-codebase-index.skill.md)
> **Script:** [`../scripts/index_codebase.py`](../scripts/index_codebase.py)
> **Status:** ✅ v3.1 · 320 components · 911 direct relationships · 418 token bindings

---

## 1. The Problem Layer 3 Solves

An AI agent asked "how many components does this design system have?" does not know. It has no inventory. So it explores — globbing directories, opening files, guessing at conventions — and it stops when it thinks it has enough.

The reference case is stark: a 55-component library, asked repeatedly to enumerate itself, returned **43 components on one run and 44 on the next**. Same repo, same question, different answers. Not a hallucination problem — a **discovery** problem. Manual exploration is non-deterministic by nature.

Now scale that failure:

| Agent task | Failure without an index |
|---|---|
| "Which screens use `Button`?" | Misses screens it never opened |
| "Is it safe to change `Tooltip`'s API?" | Cannot see that `CopyButton` → `Tooltip`, and `ThoughtCard` → `CopyButton` |
| "Audit metadata coverage" | Audits only what it happened to find |
| "Find duplicate components" | Cannot compare what it never enumerated |
| "Deprecate `LegacyCard`" | Leaves live usages behind |

Every one of these is a **governance** question. Layer 3 is what makes governance answerable rather than guessable.

### The core principle

> **Exploration is probabilistic. Indexing is deterministic.**
> An agent should never *search* for what the system can simply *tell* it.

---

## 2. What a Codebase Index Actually Is

A codebase index is a **queryable map of the system, generated from the source of truth (the code), not written by hand.**

It has three parts. All three are required — two out of three is a broken index.

### 2.1 Component Inventory
Every component, once, with its identity:

- **Name** — canonical component name
- **Path** — exact file location
- **Category** — atom / molecule / organism / template / page / layout / hook / context
- **Metadata status** — does a Layer 2 `.metadata.json` exist for it, yes or no

This alone converts "how many components do we have?" from an exploration into a lookup.

### 2.2 Relationship Graph
Who uses whom, in both directions:

- **`uses`** — the components this component renders (outbound)
- **`usedBy`** — the components that render this one (inbound)

Bidirectionality is not redundancy. `uses` answers *"what does this depend on?"* — the composition question. `usedBy` answers *"what breaks if I change this?"* — the blast-radius question. An index with only one direction can answer only half the governance questions.

Chains matter more than edges:

```
ThoughtCard → CopyButton → Tooltip
```

Changing `Tooltip` is a three-level-deep risk. No single-level lookup surfaces that.

### 2.3 Summary Statistics
The health readout, computed not estimated:

- Total components, and the count per category
- **Metadata coverage** — the percentage of components carrying Layer 2 metadata
- **Relationship density** — average connections per component
- Orphans (used by nothing), and hubs (used by many)

Statistics are what turn the index from a reference document into an **audit instrument**. This is the data the ARC Protocol's *Audit* phase consumes.

---

## 3. Why TOON, Not JSON

The index is written for a machine reader with a finite context budget. Format is therefore an engineering decision, not a stylistic one.

**TOON** (Token-Optimized Object Notation) encodes uniform records as a header plus rows, rather than repeating every key on every object.

**JSON — keys repeat on every record:**
```json
{
  "Button": {
    "path": "src/components/atoms/Button.tsx",
    "type": "atom",
    "framework": "react",
    "uses": [],
    "usedBy": ["Card", "Header", "Footer"]
  }
}
```

**TOON — keys declared once:**
```toon
components[3]{name,path,type,uses,usedBy}:
Button,src/components/atoms/Button.tsx,atom,[0]:,[3]: Card,Header,Footer
Card,src/components/molecules/Card.tsx,molecule,[1]: Button,[1]: Page
Footer,src/components/organisms/Footer.tsx,organism,[2]: Button,Icon,[0]:
```

| Aspect | TOON | JSON |
|---|---|---|
| Token count | **30–60% smaller** | baseline |
| LLM retrieval accuracy | **70.1%** | 65.4% |
| Human readable | yes | yes |
| Tooling compatibility | new format | universal |
| Best for | AI context | build tooling |

Two details make TOON work rather than merely compress:

1. **Explicit lengths.** `components[42]{...}` declares the row count up front. The agent knows whether it received all 42 rows or a truncated 30. Truncation becomes detectable instead of silent — which is precisely the failure mode that produced "43 of 55."
2. **Uniform shape.** Component records are structurally identical, which is the exact case tabular encoding is built for.

**Rule for Tawuniya DLS:** ship **TOON for agent consumption**, and **JSON when a build tool or CI job needs to parse it.** The indexer emits either; generating both is cheap.

---

## 4. The Three Things Teams Skip

An index that stops at "list of components + direct imports" is a phone book. These three additions make it an instrument.

### 4.1 Deep Tracing (recursive resolution)
*"Which atoms appear on the Motor Insurance quote screen?"*

The screen imports organisms. The organisms import molecules. The molecules import atoms. A one-level lookup answers this **wrongly** — it returns the organisms and stops. Correct resolution walks the graph recursively to its leaves.

Deep tracing is what makes impact analysis honest. It is also where cycles must be guarded against, so the traversal tracks visited nodes.

### 4.2 Instance Counting (imports ≠ usage)
`Button` imported into a file **once** may be rendered in it **five times**.

- **Import count** answers *adoption*: how many files depend on this?
- **Instance count** answers *load*: how heavily is it actually used?

A component imported by 3 files but instantiated 40 times is a critical dependency wearing a small hat. Conflating the two systematically underweights the busiest components in the library — exactly the ones whose APIs deserve the most caution.

### 4.3 Query Protocols (the read instructions)
The index is data. A **query protocol** is the written instruction set teaching an agent how to read that data the same way every time:

> To find every screen affected by a change to component `X`:
> 1. Read `relationships/component-usage.toon`
> 2. Locate the row where `name == X`
> 3. Collect `usedBy`
> 4. For each entry, repeat steps 2–3 until `usedBy` is empty
> 5. Return the accumulated set of `type: page` nodes

Without the protocol, two agents given the same index produce two different traversals. The protocol is what makes the answer **reproducible**, and reproducibility is the entire point. Query protocols are the bridge from Layer 3 into **Layer 4 (Strategies / Queries)**.

---

## 5. Index vs. Metadata — Complementary, Not Overlapping

A recurring mistake is to let the two systems duplicate each other. They answer different questions and are produced differently.

| | **Component Metadata** (Layer 2) | **Codebase Index** (Layer 3) |
|---|---|---|
| Question answered | *How do I USE this?* | *WHERE is this used?* |
| Contains | Props, variants, do/don't, a11y, examples, intent | Paths, imports, `uses`/`usedBy`, dependencies, statistics |
| Authored | **Manually** — human design intent | **Auto-generated** — parsed from code |
| Update trigger | Design decision changes | Any commit |
| Source of truth | The design team | The repository |
| Staleness risk | High — needs discipline | Low — regenerated by CI |

**Never hand-write relationship data into metadata files.** Anything derivable from code is generated; anything representing human intent is written. Where they meet is the `hasMetadata` flag in the inventory — the index reports Layer 2 coverage, which is how the two layers audit each other.

---

## 6. Generation Workflow

The index is a **build artifact**, not a document. It is regenerated, never edited.

```
┌──────────────────────────────────────────────┐
│ 1. DETECT      read package.json → framework │
│ 2. DISCOVER    walk source dirs → files      │
│ 3. CLASSIFY    path pattern → component type │
│ 4. PARSE       extract imports per file      │
│ 5. RESOLVE     aliases → real paths          │
│ 6. GRAPH       build uses / usedBy, count    │
│                instances                     │
│ 7. AUDIT       check for .metadata.json      │
│ 8. COMPUTE     statistics + coverage         │
│ 9. EMIT        TOON (+ optional JSON)        │
└──────────────────────────────────────────────┘
```

**Framework detection** (from `package.json` dependencies):

| Dependency | Framework | Extensions |
|---|---|---|
| `astro` | Astro | `.astro` |
| `next` | Next.js | `.jsx`, `.tsx` |
| `react` | React | `.jsx`, `.tsx` |
| `vue` | Vue | `.vue` |
| `svelte` | Svelte | `.svelte` |
| `@angular/core` | Angular | `.ts` |
| `solid-js` | Solid | `.jsx`, `.tsx` |

**Type classification** (from directory path):

| Path contains | Type |
|---|---|
| `/atoms/` | atom |
| `/molecules/` | molecule |
| `/organisms/` | organism |
| `/templates/` | template |
| `/ui/` | ui |
| `/layouts/` | layout |
| `/pages/`, `/views/`, `/routes/` | page |
| `/hooks/` | hook |
| `/contexts/` | context |
| anything else | component |

### Output layout

```
src/.ai/
├── index.toon                       ← entry point: metadata + statistics
└── relationships/
    ├── component-usage.toon         ← inventory + relationship graph
    ├── dependencies.toon            ← npm packages, utilities, CSS tokens
    └── data-flow.toon               ← API / CMS query patterns
```

`index.toon` is the entry point by convention. An agent reads it first, learns the shape of the system, then opens only the relationship file it needs — which is itself a token-budget decision.

---

## 7. Keeping It Alive

An index generated once is worse than no index: it is a **confident** wrong answer. Regeneration must be automatic.

**Git hook — regenerate after every merge:**
```bash
# .husky/post-merge
#!/bin/sh
python scripts/index_codebase.py . --format toon
git add src/.ai/
```

**CI — regenerate on push to main:**
```yaml
name: Update Codebase Index
on:
  push:
    branches: [main]
jobs:
  index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Index codebase
        run: python scripts/index_codebase.py . --format toon
      - name: Commit changes
        run: |
          git add src/.ai/
          git commit -m "chore: update codebase index" || true
          git push
```

Cost profile: 1–5 seconds for 50–200 components; 10–30 seconds beyond 500. Output lands at roughly 30–150 KB in TOON. There is no meaningful reason not to run it on every merge.

---

## 8. Tawuniya DLS Application

### What Layer 3 unlocks for us specifically

**Governance.** "Which Tawuniya components have no Layer 2 metadata?" becomes a single statistic instead of a manual audit. Coverage becomes a tracked number that can be held to a target.

**Impact analysis.** Before changing a shared atom — `Button`, `Input`, `Icon` — the exact set of affected molecules, organisms, and screens is enumerable, recursively, in seconds.

**Onboarding.** A new engineer, or a new agent session, reads one entry point and holds the shape of the whole system, instead of spending a week discovering it.

**Duplicate detection.** Two components with near-identical names and non-overlapping `usedBy` sets are the signature of accidental duplication. Only visible against a complete inventory.

**Bilingual surface.** Tawuniya ships Arabic and English. Deep tracing tells us exactly which atoms carry RTL responsibility, because it can resolve every atom reachable from an RTL-affected screen.

**Deprecation with a finish line.** Retiring a component becomes a countable task: N usages, tracked to zero, verified by regeneration.

### Adoption sequence

| Step | Action | Outcome |
|---|---|---|
| 1 | Run the indexer on the DLS repo | Baseline inventory + true component count |
| 2 | Read the statistics block | Metadata coverage baseline established |
| 3 | Commit `src/.ai/` to version control | Index becomes reviewable in PRs |
| 4 | Add the CI job | Index can no longer go stale |
| 5 | Write Tawuniya query protocols | Deterministic, repeatable agent answers |
| 6 | Feed statistics into the ARC Audit phase | Layer 3 becomes the input to governance |

### Definition of done for Layer 3

- [ ] Indexer runs clean against the DLS repo
- [ ] Component count verified by hand against the real library — no silent misses
- [ ] `uses` / `usedBy` spot-checked on at least one three-level chain
- [ ] Instance counts distinguished from import counts
- [ ] `hasMetadata` flag reflects actual Layer 2 file presence
- [ ] Statistics block includes coverage percentage
- [ ] Query protocols written for the five most common agent questions
- [ ] Regeneration automated in CI
- [ ] `src/.ai/` committed and reviewed

---

## 9. The Economics

Layer 3 costs real effort up front: writing the generator, resolving path aliases, wiring CI, verifying the first output by hand.

What it buys is **an accuracy premium that compounds.** Every agent interaction afterwards starts from a complete, deterministic picture instead of a partial, probabilistic one. The alternative is not "no cost" — it is a slow accumulation of decisions made against incomplete information: the duplicate component nobody knew existed, the breaking change nobody traced, the deprecation that never finished.

That is technical debt with a specific and unusual property: **it grows faster the more you use AI on the codebase.** Indexing is the intervention that inverts the curve.

---

## 10. Summary

| | |
|---|---|
| **Layer** | 3 — Indexing / Mapping |
| **Input** | The Tawuniya DLS repository |
| **Output** | `src/.ai/` — inventory, relationship graph, statistics |
| **Format** | TOON for agents, JSON for tooling |
| **Authoring** | Auto-generated; never hand-edited |
| **Refresh** | CI, on every merge to main |
| **Consumes** | Layer 2 metadata presence (coverage audit) |
| **Feeds** | Layer 4 query protocols; ARC Audit phase |
| **Converts** | Exploration → lookup; guessing → governance |

> The index does not make the agent smarter.
> It makes the agent **correct**, and correct the same way twice.

---

*[← Layer 2 Metadata](02-metadata.md) · [Layer 4 Orchestration →](04-orchestration.md)*
