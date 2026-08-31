# ARC Protocol — Audit → Report → Compose

> **Used by:** [Layer 4](../layers/04-orchestration.md) · **Reads:** [Layer 3 index](../layers/03-indexing.md), [Layer 2 intent](../layers/02-metadata.md)
> **Skill:** [`../skills/tawuniya-dls-arc.skill.md`](../skills/tawuniya-dls-arc.skill.md)
> **Engine:** [`../scripts/arc_query.py`](../scripts/arc_query.py)

---

## The Idea

**Design systems as compilers.**

A compiler does not explore your source hoping to find things. It parses against a known grammar and produces the same output every run. ARC applies that to UI work: analysis becomes *structured assembly* rather than exploratory generation.

---

## The Evidence

11 trials, 24–27 December 2025, Astro portfolio repo, Claude Sonnet 4.5. Five control runs, six with indexed architecture. Same model, same repo, same questions — the only variable was whether the index existed.

| | Control | With ARC |
|---|---|---|
| Tokens | 27,211 | 28,166 *(+3.5%)* |
| Duration | 4:26 | **1:52** *(−58%)* |
| Accuracy | 65% | **100%** |
| Variance | 26.5% | **0.04%** |

**Token cost is a wash.** What changes is speed and determinism.

The variance figure is the real result: the control group answered the same question differently on every run. It also produced a **60% false-negative rate** — components reported as unused that were in fact in use. That is not a slow answer; it is an answer that deletes live code.

Break-even: 3–5 queries into a session.

> Figures come from one repo, one model, one author. Treat the direction as sound and the percentages as indicative.

---

## The Three Phases

### 1 · AUDIT — query, never explore

Read the index. Resolve the request against what actually exists. Trace composition recursively rather than assuming it.

```bash
python ../scripts/arc_query.py --index ../index/relationships/component-usage.toon similar "<intent>"
python ../scripts/arc_query.py --index ../index/relationships/component-usage.toon impact "<component>"
python ../scripts/arc_query.py --index ../index/relationships/component-usage.toon trace "<component>"
```

**Rules:** if it is not in the index, it does not exist — say so rather than inventing a plausible name. If a name is ambiguous, resolve it explicitly. If the index's declared row count disagrees with the rows read, flag it: a truncated index invalidates everything built on it.

### 2 · REPORT — a reviewable contract

```markdown
## ARC Report — <request>

### Audit
Index: component-usage.toon · 320 components · <date>

### Selected
| Component | Node ID | Variants | Why |

### Composition chain
A → B → C   (traced, not assumed)

### Rejected
| Considered | Why not |

### Nothing new is being created
Searched "<intent>" — N candidates. Extending <X>.

### Flags
<duplicates, orphans, index warnings affecting this work>

### Approval required before Compose.
```

Rejections carry as much weight as selections. A report listing only what was chosen hides the decision.

### 3 · COMPOSE — build only what was approved

Every component used appears in the Report. If something needed is missing — **stop, re-audit, amend, re-approve.** Do not reach outside the Report.

**This constraint is where the 0.04% variance comes from.** Everything else in ARC is bookkeeping in service of it.

---

## Two Algorithms

**Deep tracing** — walk `uses` recursively to the leaves, guarding against cycles. A one-level lookup returns organisms and stops, confidently and wrongly. In this system: `Mobile/Accordion → _Atoms/Rating Bar → _Atoms/Review Star → icon-24/star`. The star is three levels down and never directly referenced.

**Instance counting** — multiplied through composition. Three cards each rendering two icons is six icons, not two. Slot-only components must be excluded from recursion or they double-count.

---

## Reading Numbers

Two components can show the same shape of number and mean opposite things.

- A component at 63% adoption may reflect a deliberate preference for another approach — **philosophy**, nothing to fix.
- A component imported but bypassed with raw CSS is **debt**, and it spreads.

The metric cannot tell them apart. Only [intent](../layers/02-metadata.md) can — which is why Layer 2 sitting at 6.9% `usage` coverage currently limits what a Report can say.

---

## The Feedback Loop

The output of ARC is not the report. It is the correction the report triggers.

```
   Layer 3 index ──► ARC Audit ──► Report
        ▲                             │
        └────────── refinement ◄──────┘
```

Every discrepancy — the missing two rows, a duplicate name, an instance count that does not match reality — goes back into the **generator**, not into a note. That is how the agent stops consuming the design system and starts maintaining it.

---

## Source

*Design systems as compilers: ARC architecture trial* — 11 trials, Dec 2025.

---

*[← Layer 4](../layers/04-orchestration.md) · [Intent-Driven Context →](intent-driven-context.md)*
