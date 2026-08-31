# Layer 4 — Strategies, Queries & Orchestration

> **Position:** [Tokens](01-tokens.md) → [Metadata](02-metadata.md) → [Indexing](03-indexing.md) → **Orchestration**
> **Depends on:** [Layer 3 index](03-indexing.md) for the graph · [Layer 2](02-metadata.md) for intent
> **Feeds:** corrections back into Layers 2 and 3 — the loop is the product
> **Protocol:** [ARC](../context/arc-protocol.md)
> **Skill:** [`../skills/tawuniya-dls-arc.skill.md`](../skills/tawuniya-dls-arc.skill.md)
> **Script:** [`../scripts/arc_query.py`](../scripts/arc_query.py)
> **Router:** [`../CLAUDE.md`](../CLAUDE.md)
> **Status:** ⚠️ documented and runnable · not yet used on production work

---

## 1. The Problem Layer 4 Solves

An agent with a complete index can still build the wrong thing.

The canonical failure: asked to add a copy-to-clipboard control, an agent builds a button, then builds a tooltip, then wires them together — unaware that `CopyButton` already exists **and already contains `Tooltip`** as a composed pattern. Two duplicates enter the system in a single session. Neither was necessary. The index would have prevented it; nothing told the agent to read the index first.

That is the Layer 4 gap. Layer 3 makes the answer *available*. Layer 4 makes the agent *ask*.

The measurement problem is the same failure wearing a different hat. Control-group agents reported 43–44 components against a real inventory of 57 — not because the components were hidden, but because nothing instructed the agent to trace nested dependencies. The consequences compound:

- **False adoption metrics** — a component used three levels deep is invisible, so it looks unadopted
- **Broken deprecation analysis** — the blast radius is under-reported, and removal breaks screens nobody flagged
- **Duplicate proliferation** — every unsearched-for component is a component about to be rebuilt

### The core principle

> **Layer 3 makes the system knowable. Layer 4 makes the agent knowledgeable.**
> An index nobody is instructed to read is documentation with extra steps.

---

## 2. The Three Instruction Tiers

Layer 4 is not one file. It is three kinds of instruction that do different jobs and must not be collapsed into each other.

### 2.1 Skills — executable capability
Things the agent can *run*. Each has a trigger, an input, and an artifact it produces.

| Skill | Does |
|---|---|
| `/codebase-index` | Regenerates the Layer 3 dependency map |
| `/ai-component-metadata` | Generates structured Layer 2 metadata for a component |
| `/ai-ds-composer` | Guides component selection; flags anti-patterns before code is written |

Skills are **verbs**. They are invoked, they run, they leave something behind.

### 2.2 Rules — passive context
Constraints that load automatically based on **where** the agent is working, without being invoked. Atomic-design hierarchy, metadata schema shape, composition philosophy, naming conventions.

Rules are **path-scoped**. A rule bound to `src/components/**` loads when the agent touches a component and stays out of the way otherwise. This is what keeps context budget spent on what is relevant instead of on everything the system knows.

Rules are **adjectives**. They describe the conditions work happens under. They also *reference skills* — a rule can say "before creating, run `/ai-ds-composer`," which is how passive context triggers active capability.

### 2.3 Instructions — strategy
The orchestration methodology that binds the other two: when to invoke which skill, what artifact it produces, and which downstream step consumes that artifact. This is the layer people skip, and skipping it is why teams end up with a folder of skills nobody invokes at the right moment.

Instructions are **the sentence structure**. Skills and rules are inert without them.

### 2.4 The routing hierarchy

```
CLAUDE.md                    ← router: points, does not explain
   ↓
Rules (path-scoped)          ← loads only for the paths in play
   ↓
Skills (capabilities)        ← invoked per the rules and instructions
   ↓
Artifacts (outputs)          ← metadata, index, reports — feed back in
```

**`CLAUDE.md` is a router, not a knowledge base.** The temptation is to pour everything into it. That reproduces the Volume Paradox from our Intent-Driven Context work at the infrastructure level: more loaded context, worse output. The router's job is to point at the right rule, which points at the right skill. Nothing more.

---

## 3. Deep Tracing — Specified as an Algorithm

Layer 3 stores `uses[]` and `usedBy[]`. Layer 4 defines the traversal. Written as a procedure, not a description, because reproducibility is the point:

```
DEEP TRACE — find every atom reachable from a target screen

1. Collect the direct imports of the target page
2. For each import, read its `uses` field in the relationship graph
3. Recurse into each of those dependencies
4. Stop when a component's `uses[]` is empty (a leaf)
5. Filter the accumulated set by category == atom
6. Track visited nodes so cycles terminate
```

This is what catches `CopyButton → Tooltip` sitting three levels down a composition chain. A one-level lookup returns organisms and stops — confidently, and wrongly.

The reference measurement went **six levels deep** on a single page: `Link, Icon, Heading, Text, Button, CopyButton→Tooltip`. Any traversal that stopped at level one would have reported a fraction of that and looked complete.

---

## 4. Instance Counting — Multiplication Through Composition

Layer 3 counts instances per file. Layer 4 counts them **through the composition chain**, which is a different and larger number.

```html
<!-- Three direct DashboardCard instances -->
<DashboardCard title="Metrics">…</DashboardCard>
<DashboardCard title="Usage">…</DashboardCard>
<DashboardCard title="Components">…</DashboardCard>
```

If `DashboardCard` internally renders `Icon` twice, the true Icon count on this page is **3 × 2 = 6**, not 2. Naïve counting understates the components carrying the most real load — precisely the ones whose APIs deserve the most caution.

Three edge cases have to be handled explicitly or the number goes wrong in the other direction:

- **Slot components** — a component whose body is only `<slot />` passes children through. Recursing into it counts the same child twice. Skip recursive tracing for components containing only `<slot />` or plain HTML.
- **Conditional rendering** — a branch that may not render is a potential instance, not a guaranteed one. Count it, flag it.
- **Loops** — a component in an iterator has a count that is unknown at parse time. Record it as variable rather than as `1`.

---

## 5. Reading the Numbers — Adoption Needs Interpretation

This is the part that separates a dashboard from governance. Two components can show the same shape of number and mean opposite things.

**`Spacer` at 63% adoption** — read as a failure, this looks like a third of the org ignoring the system. It was in fact a deliberate preference for utility classes over a Spacer component. The number reflected **design philosophy**, not debt. Nothing to fix.

**`Tag` showing imports but low real usage** — teams were importing it and then styling with raw CSS classes (`.pill`, `.pill-alt`) instead. Same shape of number. This one *was* debt, and the kind that spreads.

The distinction is not visible in the metric. It is visible only when the layer reading the index carries the **intent** from Layer 2. This is where Layers 2 and 4 meet: metadata says what a component is *for*, the index says how it is actually *used*, and the gap between them is either a philosophy or a problem. Only intent tells you which.

> A report that lists numbers is measurement.
> A report that explains which numbers matter is governance.

---

## 6. The Feedback Loop — Reports Refine the Infrastructure

The output of Layer 4 is not the report. It is the correction the report triggers.

**Worked example — the Icon inflation.** A monthly report showed `Icon` at 31 instances against an actual 25. Investigation found slot-component detection was missing: Icons slotted *inside* Buttons were counted once as Button children and once as Icons. The fix went into the indexer — skip recursive tracing for slot-only components. The next report was correct.

**Worked example — the missing timestamps.** Production dashboards showed "Modified Date" as `N/A`, because filesystem timestamps do not survive a serverless build. The fix moved the timestamp into the component metadata itself (`*.metadata.ts`), extracted it during index regeneration into TOON, and consumed it from the generated artifact rather than from the filesystem.

Both corrections flowed **backwards**, into Layer 3 and Layer 2. That direction is the whole mechanism:

```
   Layer 3 index ──► Layer 4 query ──► report
        ▲                                 │
        └──────── refinement ◄────────────┘
```

> *Each report surfaces something. Each insight refines instructions or scripts. The next report is more accurate.*

This is the transition the whole four-layer stack exists to reach: **the agent stops being a consumer of the design system and becomes one of its maintainers.**

---

## 7. Composition Governance

The single highest-leverage rule to encode:

> **Prefer editing over creating.**
> Before creating a new component, search the index for similar components and extend an existing one with new props or variants rather than creating a duplicate.

This is the rule that prevents nine Button variants. It works because Layer 3 made "search the index for similar components" a real operation rather than an aspiration — and it is enforced by `/ai-ds-composer` at authoring time, not by a reviewer three days later when the duplicate is already merged.

Governance that runs before the code exists is prevention. Governance that runs at review is archaeology.

---

## 8. Query Protocols for Tawuniya DLS

Written protocols make the same question return the same answer every time. These are the five worth writing first, against our existing `component-usage.toon`.

### Protocol A — Blast radius of a change
```
1. Read relationships/component-usage.toon
2. Find the row where name == <component>
3. Collect `usedBy`
4. For each entry, repeat 2–3 until `usedBy` is empty
5. Return the accumulated set where type == page
```

### Protocol B — Every atom on a screen
```
1. Find the row for the target screen
2. Collect `uses`
3. Recurse into each entry's `uses` until empty
4. Filter accumulated set by type == atom
5. Track visited nodes; do not revisit
```

### Protocol C — Before creating a component
```
1. Read the inventory
2. Search names and metadata for functional overlap with the intent
3. If a candidate exists → propose extending it (new prop or variant)
4. If none → confirm no near-duplicate in `topHubs` and adjacent categories
5. Only then create
```

### Protocol D — Metadata coverage audit
```
1. Read index.toon statistics
2. Report metadataCoverage and the gap to target
3. Rank uncovered components by `usedBy` count
4. Return the top N — highest usage, no metadata — as the work queue
```

### Protocol E — Orphan triage
```
1. Collect components where usedBy is empty
2. Partition into: top-level patterns (expected) | BETA (expected)
                 | everything else (investigate)
3. For the third group, check for a near-duplicate that IS used
4. Return candidates for deprecation or merge
```

---

## 9. Applied to Our Current Index

Our Figma-sourced Layer 3 index gives Layer 4 something concrete to work on from day one:

| Signal | Value | What Layer 4 does with it |
|---|---|---|
| Total components | 320 (264 sets + 56 standalone) | Baseline inventory for Protocol C |
| Pages | 38 | Scope for per-page deep tracing |
| Relationships | 917 | Graph for Protocols A and B |
| Instance references | 6,999 | Load data — before slot correction |
| Density | 2.87 | System health baseline |
| Orphans | **170 of 320** | Protocol E, immediately |
| Top hub | `Mobile/Button` (57) | Highest-caution API in the system |

**The orphan number is the first real question.** 170 of 320 components referenced by nothing is half the library. Some of that is legitimate — top-level patterns are supposed to be roots, and the 78 BETA components are not expected to be composed yet. Subtract those and a meaningful remainder is still unexplained. Protocol E is what sorts genuine roots from genuine duplicates.

**`Mobile/Button` at 57 usages** is the component where "prefer editing over creating" matters most, and simultaneously the one where any API change carries the widest blast radius. Both facts come from the same number.

**6,999 instance references is pre-correction.** Per §4, slot-passthrough components inflate this. Expect it to fall once slot detection lands — and treat that fall as the infrastructure getting more honest, not as usage declining.

---

## 10. Build Sequence

| Step | Action | Produces |
|---|---|---|
| 1 | Write `CLAUDE.md` as a router — pointers only | Entry point |
| 2 | Write path-scoped rules for `components/**`, `tokens/**` | Passive context |
| 3 | Encode "prefer editing over creating" as a rule | Duplicate prevention |
| 4 | Write Protocols A–E against the real index | Deterministic answers |
| 5 | Implement deep tracing with cycle guarding | Correct multi-level answers |
| 6 | Add slot-aware instance counting | Honest load numbers |
| 7 | Run the first adoption report | Baseline + first infrastructure bugs |
| 8 | Feed every correction back into Layers 2–3 | The loop closes |

### Definition of done for Layer 4

- [ ] `CLAUDE.md` routes; it does not explain
- [ ] Rules load path-specifically, not globally
- [ ] Protocols A–E written and returning identical results across runs
- [ ] Deep tracing verified against a hand-traced chain at least four levels deep
- [ ] Slot components excluded from recursive instance counting
- [ ] First adoption report separates philosophy from debt, with reasoning
- [ ] At least one report finding has been fed back into Layer 2 or 3
- [ ] `/ai-ds-composer` blocks a duplicate before it is written

---

## 11. Summary

| | |
|---|---|
| **Layer** | 4 — Strategies / Queries / Orchestration |
| **Input** | Layer 2 metadata + Layer 3 index |
| **Output** | Deterministic answers, adoption reports, prevented duplicates |
| **Structure** | Skills (verbs) · Rules (adjectives) · Instructions (strategy) |
| **Routing** | `CLAUDE.md` → rules → skills → artifacts |
| **Core algorithms** | Deep tracing; slot-aware instance counting |
| **Governance rule** | Prefer editing over creating |
| **Feeds back into** | Layers 2 and 3 — the loop is the product |
| **Converts** | Available information → applied judgement |

> Layer 3 gave the agent a map.
> Layer 4 teaches it to read the map the same way twice — and to redraw it when the map turns out to be wrong.

---

## Source

*Agent orchestration for design systems* — Design Systems Collective
https://www.designsystemscollective.com/agent-orchestration-for-design-systems-da0f6a5f24fb

> **Note on figures:** this article cites 43–44 components found against **57** actual; the Layer 3 article cites **55**. Same system measured at different times. Use the ratio, not the absolute number.

---

*[← Layer 3 Indexing](03-indexing.md) · [Architecture →](../ARCHITECTURE.md)*
