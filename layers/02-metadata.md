# Layer 2 — Intent Content Metadata

> **Position:** [Tokens](01-tokens.md) → **Metadata** → [Indexing](03-indexing.md) → [Orchestration](04-orchestration.md)
> **Depends on:** [Layer 1 tokens](01-tokens.md) — metadata names the tokens a component may use
> **Feeds:** [Layer 3](03-indexing.md) reports coverage · [Layer 4](04-orchestration.md) reads intent to interpret usage
> **Skill:** [`../skills/ai-component-metadata/`](../skills/ai-component-metadata/SKILL.md)
> **Framework:** [Intent-Driven Context](../context/intent-driven-context.md)
> **Data:** [`../metadata/`](../metadata/README.md) — 36 `.ts` files + generated JSON
> **Gaps:** [`../audit/gaps.toon`](../audit/README.md) — every missing field, as work items
> **Script:** [`../scripts/metadata_query.py`](../scripts/metadata_query.py)
> **Status:** 🟡 **127 component records · 42.5% coverage · 6.9% carry `usage`**

---

## 1. What This Layer Is

Layer 3 can tell an agent that `Mobile/Button` exists, is used 57 times, and contains no children. It cannot tell it **when to use one**, what a `Destructive` variant means, or that a button and a link are not interchangeable.

That knowledge is human judgement. It does not exist in the file structure and cannot be derived from it. Layer 2 is where it gets written down in a form a machine can read.

**The distinction that governs everything here:**

| | Metadata (Layer 2) | Index ([Layer 3](03-indexing.md)) |
|---|---|---|
| Answers | *How do I USE this?* | *WHERE is this used?* |
| Contains | Props, variants, do/don't, a11y, intent, tokens | Paths, `uses`/`usedBy`, instances, statistics |
| Authored | **By hand** — design intent | **Generated** — parsed from source |
| Changes when | A design decision changes | Any commit |
| Staleness risk | High — needs discipline | Low — CI regenerates |

**Never hand-write relationship data into metadata.** Anything derivable from source is generated; anything representing human intent is written. Duplicating one into the other is how both go stale.

---

## 2. The Volume Paradox

The instinct is to write more documentation. The evidence says volume is not the variable — **classification** is.

An agent handed 4,000 words of undifferentiated component documentation performs worse than one handed 400 words sorted into what it must obey, what it should prefer, what it needs to understand, and what it should do next. Undifferentiated context makes a hard constraint and a stylistic preference look identical.

So metadata is not "documentation in JSON". It is documentation **sorted by intent**, which is the [Intent-Driven Context framework](../context/intent-driven-context.md):

| Category | What it is | Delivery |
|---|---|---|
| **Constraints** | Must-obey rules. Violation is a defect. | Machine-checkable, enforced |
| **Guidelines** | Preferences. Deviation needs a reason. | Surfaced at authoring time |
| **Framing** | Background that shapes judgement. | Loaded as context |
| **Workflow** | Procedure — what to do, in order. | Executed step by step |

A rule in the wrong category is worse than a missing rule: a guideline treated as a constraint blocks legitimate work, and a constraint treated as a guideline gets ignored.

---

## 3. Schema

Each component gets a metadata record covering:

**Identity** — name, Figma node id, category, page, status (stable / beta / deprecated)

**Intent** — what this component is *for*, and the situations it is the wrong answer to. The single highest-value field, and the one most often skipped.

**Props / variants** — every variant property, its values, its default, and what each value means. `Mobile/Button` has 60 variants; enumerating them is not the same as explaining them.

**Tokens** — which [Layer 1](01-tokens.md) tokens this component is permitted to consume. This is what turns "use the right colour" into a checkable constraint.

**Composition** — what it may contain, what may contain it, and combinations that are prohibited.

**Accessibility** — contrast obligations, focus behaviour, screen-reader expectations, and RTL/LTR behaviour for the Arabic surface.

**Anti-patterns** — what people get wrong, stated as *don't*, with the reason. Agents follow explicit prohibitions far more reliably than implied ones.

**Examples** — correct usage, and at least one incorrect usage labelled as such.

---

## 4. Current State

**171 records across 36 files — 133 of 301 unique components, 44.2%.**

Every reference validates clean:

| Check | Result |
|---|---|
| Names resolving to the [index](03-indexing.md) | **171 / 171** |
| Figma node ids resolving | **135 / 135** |
| Token references resolving to [Layer 1](01-tokens.md) | **48 / 48** |
| Top 10 hubs covered | **10 / 10** |

Categories stated: **59 atoms, 75 molecules, 28 organisms** — this is what replaced the name-prefix guess in [Layer 3](03-indexing.md).

### Depth is the real limitation

| Field | Present in |
|---|---|
| `component` (identity) | 74% |
| `variants` | 70% |
| `aiHints` | 46% |
| `properties` | 37% |
| `accessibility` | 19% |
| `usage` — use cases, anti-patterns | **12%** |
| `composition` | 8% |
| `designTokens` | **6%** |

`Button` is the reference record. Most others are identity plus variants.

**What this means for auditing:** an anti-pattern or intent audit currently covers a tenth of the system while appearing to cover all of it. Report scope, always.

**What it no longer blocks:** token analysis. [Layer 3](03-indexing.md) now carries *actual* token bindings for 314 of 320 components, extracted from Figma. Metadata's `designTokens` records **intent**; the index records **fact**. Disagreement between them is itself a finding.

```bash
python ../scripts/metadata_query.py depth
python ../scripts/metadata_query.py gaps
python ../scripts/metadata_query.py uncovered
```

## 5. Where To Start

Not all 318. The [index](03-indexing.md) already ranks components by real usage — start at the top of that list.

| Priority | Component | usedBy | Why first |
|---|---|---|---|
| 1 | `Mobile/Button` | 57 | Widest blast radius, 60 variants, most-misused |
| 2 | `Mobile/Tag` | 35 | Second hub |
| 3 | `Mobile/Icon Button` | 33 | Frequently confused with Button — needs the boundary stated |
| 4 | `Mobile/Pricings` | 11 | Domain-specific, least self-explanatory |
| 5 | `Mobile/General Input Field` | 11 | Form foundation |

Twenty components covers the components carrying real load. That is the point at which adoption numbers become interpretable rather than merely countable.

```bash
python ../scripts/arc_query.py hubs -n 20     # the work queue, ranked by usage
```

---

## 6. Definition of Done

- [ ] Schema frozen — 80 keys currently appear on exactly one record
- [x] Top 20 hubs covered at identity level
- [ ] Top 20 hubs carrying `usage` and `antiPatterns`
- [ ] Every record classifies its content into the four intent categories
- [ ] Token permissions reference real [Layer 1](01-tokens.md) token names
- [ ] RTL/LTR behaviour stated for every component with directional layout
- [x] `hasMetadata` added to the [Layer 3 index](03-indexing.md)
- [x] Coverage reported in `index.toon` statistics
- [ ] `figmaId` on all 171 records (36 missing)
- [ ] BETA (78) and Sales Journeys (7) covered, or explicitly excluded
- [ ] Anti-patterns written for the five most-misused components

---

## 6b. Gaps Are Findings, Not Blockers

A component with no `usage` block is not a hole in the infrastructure. It is a **fact the infrastructure has correctly recorded** — `hasUsage: no`, queryable, in the index.

That fact becomes a row in the [gaps registry](../audit/README.md), ranked by how many components depend on the subject. The audit's first deliverable is therefore its own backlog:

| Gap | Items |
|---|---|
| `missing-usage` | 298 |
| `missing-accessibility` | 285 |
| `missing-metadata` | 184 |

```bash
python ../scripts/arc_query.py --index ../index/relationships/component-usage.toon gaps --gap missing-usage
```

Top of that list: `Mobile/Tag` (35 dependents), `_Atoms/Radio Icon` (22), `Mobile/Pricings` (17). Write those first — not the 298 in alphabetical order.

---

## 7. How This Connects

**Down to [Layer 1](01-tokens.md)** — the `tokens` block names permitted tokens. Layer 1's own documentation gap (4 descriptions across 362 semantic tokens) is the same problem one level lower.

**Across to [Layer 3](03-indexing.md)** — the index reports whether metadata exists; metadata never reports relationships. Each audits the other.

**Up to [Layer 4](04-orchestration.md)** — ARC's Audit phase reads intent to choose between components, and its Report cites intent as the reason for each choice. Without Layer 2, Reports can say *what* was chosen but not *why*.

---

*[← Layer 1 Tokens](01-tokens.md) · [Layer 3 Indexing →](03-indexing.md)*
