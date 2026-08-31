# Architecture

How the four layers connect, what each one owes the others, and why the order matters.

> [README](README.md) · [CLAUDE router](CLAUDE.md) · Layers: [1](layers/01-tokens.md) · [2](layers/02-metadata.md) · [3](layers/03-indexing.md) · [4](layers/04-orchestration.md)

---

## 1. The Shape

Each layer answers a question the layer below it cannot, using data the layer below it provides.

```
        ┌─────────────────────────────────────────────┐
        │  4 · ORCHESTRATION                          │
        │  "What should I build, and from what?"      │
        │  → skills, rules, protocols, reports        │
        └───────────────┬─────────────────────────────┘
                        │ reads the graph, reads intent
        ┌───────────────┴─────────────────────────────┐
        │  3 · INDEXING                               │
        │  "Where is this used? What breaks?"         │
        │  → inventory, uses/usedBy, statistics       │
        └───────────────┬─────────────────────────────┘
                        │ indexes components
        ┌───────────────┴─────────────────────────────┐
        │  2 · METADATA                               │
        │  "How is this used? When is it wrong?"      │
        │  → intent, variants, a11y, anti-patterns    │
        └───────────────┬─────────────────────────────┘
                        │ names permitted tokens
        ┌───────────────┴─────────────────────────────┐
        │  1 · TOKENS                                 │
        │  "What are the values?"                     │
        │  → primitives, semantic tokens, modes       │
        └─────────────────────────────────────────────┘
```

---

## 2. The Contracts Between Layers

Each arrow is a specific dependency, not a vague relationship.

| From → To | What crosses the boundary |
|---|---|
| [1 → 2](layers/01-tokens.md) | Token **names**. Metadata's `tokens` block references real token identifiers, which makes "use the right colour" checkable rather than aspirational. |
| [2 → 3](layers/02-metadata.md) | A **presence flag**. The index records whether a component has metadata; it never copies the metadata itself. |
| [3 → 4](layers/03-indexing.md) | The **graph**. `uses`, `usedBy`, `instances` — every ARC query is a traversal of these fields. |
| [2 → 4](layers/02-metadata.md) | **Intent**. Numbers alone cannot distinguish deliberate scarcity from poor adoption. Intent is what makes a statistic interpretable. |
| [4 → 3, 4 → 2](layers/04-orchestration.md) | **Corrections**. Every defect a report exposes goes back into the generator or the metadata — not into a note. |

That last row is the one people skip, and it is the mechanism that makes the system improve rather than merely exist.

---

## 3. Generated vs. Authored

The single most useful distinction in this repo. Getting it wrong is how both halves go stale.

| | **Generated** | **Authored** |
|---|---|---|
| Layers | 1 (tokens, foundations), 3 (index), audit/ | 2 (metadata), 4 (rules, protocols) |
| Source of truth | Figma file / source code | Human judgement |
| Update trigger | Any change upstream | A decision changes |
| Editing by hand | **Never** — fix the generator | Always |
| Staleness risk | Low, if CI runs | High — needs discipline |

**Rule:** anything derivable from source is generated. Anything representing a decision is written. Never copy one into the other — a relationship hand-written into a metadata file is a lie waiting to happen.

---

## 4. Why This Order

The layers are numbered by dependency, not by importance or by build order.

**Tokens first** because everything above them refers to them. A metadata file that says "use the primary fill" without a token name is prose.

**Metadata before indexing** in principle — though in practice the index was built first, because it can be generated and metadata cannot. The index now carries `hasMetadata`, `hasUsage` and `hasA11y`, so the absence of intent is itself indexed.

**Indexing before orchestration** absolutely. Layer 4 is traversal logic over Layer 3's graph. Without the graph it has nothing to traverse, and an agent falls back to exploration — which is the failure the whole stack exists to eliminate.

### The current shape

Layers 1, 3 and 4 are complete and one vintage. Layer 2 is real but shallow: 42.5% of components have a record, and 6.9% carry `usage`.

The practical consequence: ARC can report *what* was chosen and *what it binds*, but can only sometimes say *why*. That is not a blocker — it is [1,290 registered work items](audit/README.md), ranked. Write `usage` for the twenty components that carry real load and the Report phase becomes fully articulate.

---

## 5. Scope — Projection, Not Mirror

62 pages exist in the Figma file. **43 are represented here**: 38 component pages and 5 foundation pages. [`foundations/page-coverage.toon`](foundations/page-coverage.toon) is the ledger, and it exists so nobody mistakes this for the whole file.

What is carried: components, variants, properties, composition relationships, instance counts, token bindings, icons, type styles, elevations, grids, and authored intent.

What is not: geometry, imagery, prototypes and interactions, Figma's own component descriptions, text content, and anything on the 19 unindexed pages.

It is also a **snapshot**. Nothing syncs; the file moves on and this does not until it is regenerated.

---

## 6. Source Boundary

The current [index](layers/03-indexing.md) is **Figma-sourced**, not code-sourced. This matters more than it first appears:

- `type` is `COMPONENT_SET` / `COMPONENT` — Figma node types, not atomic categories. Categories are inferred from name prefixes (`_Atoms/`, `icon-`), which works but is a heuristic.
- Relationships are **instance nesting** in Figma, not import statements in code.
- "Prefer editing over creating" currently governs the design file. It does not reach the codebase.

[`scripts/index_codebase.py`](scripts/index_codebase.py) indexes a code repository in the same shape. Running both and joining on component name is what closes the design–code loop — and is the point at which [drift](layers/03-indexing.md) between the two becomes measurable rather than anecdotal.

---

## 5b. Gaps Are Part of the Model  

The infrastructure is not required to be complete. It is required to be **honest about what it does not contain**.

Every absence is recorded as a queryable fact — `hasUsage: no`, `category: ""`, `hasMetadata: no` — and every such fact becomes a ranked row in the [gaps registry](audit/README.md). That inverts the usual dependency: you do not need finished documentation before you can audit. **The audit's first output is the documentation backlog.**

```
   absence in Figma ──► recorded as a field ──► ranked as a work item
          ▲                                              │
          └──────────── someone writes it ◄──────────────┘
```

1,290 items today, ranked by severity and by how many components depend on the subject. `Mobile/Tag` missing `usage` outranks 297 others because 35 things depend on it.

---

## 7. What Good Looks Like

The stack is working when all of these are true:

- [ ] A component question is answered by a **lookup**, never a search
- [ ] The same question asked twice returns the **same answer**
- [ ] Every number in a report can be traced to a file, not a recollection
- [ ] Creating a duplicate component is **blocked before** it is built, not caught at review
- [ ] Regeneration is automatic; no one hand-edits generated files
- [ ] A defect found in a report changes a **generator**, not a note
- [ ] Every gap is registered and ranked, not merely known

---

## 8. Reading Order

**New to this repo:** [README](README.md) → this file → [Layer 3](layers/03-indexing.md) (the load-bearing one) → [ARC](context/arc-protocol.md)

**Building something:** [CLAUDE.md](CLAUDE.md) → [ARC](context/arc-protocol.md) → run the Audit

**Fixing the infrastructure:** the Known Defects table in [README](README.md) → the relevant layer doc → the generator

---

*[← README](README.md) · [Router →](CLAUDE.md)*
