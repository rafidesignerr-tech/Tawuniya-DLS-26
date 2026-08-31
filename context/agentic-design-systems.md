# Agentic Design Systems

Why this repository exists.

> **Frames:** all four layers · **Related:** [ARC](arc-protocol.md) · [Intent-Driven Context](intent-driven-context.md)

---

## The Shift

A traditional design system is **passive**. It documents; humans read; humans apply. Its quality is measured by how well it reads.

An agentic design system is **infrastructure**. It is queried, not read. Its quality is measured by whether the same question returns the same answer twice.

| | Traditional | Agentic |
|---|---|---|
| Primary reader | Human | Agent, then human |
| Format | Prose, images | Structured, machine-readable |
| Consumption | Read once, half-remembered | Queried per task |
| Governance | Review, after the fact | Enforced, before the fact |
| Success metric | Documentation completeness | Answer determinism |
| Failure mode | Nobody reads it | Nobody can query it |

This is not a replacement. The human-facing documentation still matters. What changes is that it stops being the *only* interface.

---

## Why It Became Necessary

Designers and engineers now build with AI in the loop. An agent that cannot query the design system does not stop — it guesses. And it guesses plausibly:

- builds a component that already exists, slightly differently
- misses that a component is used three levels deep and calls it unused
- picks a colour that looks right and is not a token
- reports a component count that changes between runs

None of these look like errors. They look like output. They accumulate as **technical debt with an unusual property: it grows faster the more you use AI on the system.** Indexing is the intervention that inverts that curve.

---

## The Three Pieces

Everything in this repository is one of these.

**1 · Component metadata** — [Layer 2](../layers/02-metadata.md). What a component is *for*. Authored by hand, because intent cannot be parsed out of a file.

**2 · The index** — [Layer 3](../layers/03-indexing.md). What exists and what uses what. Generated, because it must never disagree with reality.

**3 · Query protocols** — [Layer 4](../layers/04-orchestration.md). How to read the first two, the same way every time. Written, and enforced.

Two of the three is not two-thirds of the benefit. Metadata without an index is documentation nobody can find; an index without protocols is a file nobody is instructed to read.

---

## The ARC Protocol

Three phases, in order — see [ARC](arc-protocol.md) for the full contract.

**Audit** — query the index, trace composition, establish what exists.
**Report** — emit a spec naming every choice and every rejection. A human approves it.
**Compose** — build using only what was approved.

Measured against a control group: accuracy 65% → 100%, variance 26.5% → 0.04%, duration cut 58%, token cost unchanged.

---

## Maturity

| Phase | Capability | Tawuniya status |
|---|---|---|
| 1 · Audit | Answer questions about the system correctly and repeatably | Infrastructure built, not yet routine |
| 2 · Report | Produce adoption, coverage and drift analysis | Possible; not yet run |
| 3 · Compose | Build correctly by default; block duplicates before they exist | Protocol written, untested in production |

Phases cannot be skipped. Composing on top of an audit you do not trust produces confident, wrong output faster.

---

## Where Tawuniya Stands

**Built:** [tokens and foundations](../layers/01-tokens.md) — 680 tokens, 2,087 icons, 23 type styles, 10 elevations. [Index generated](../layers/03-indexing.md) — 320 components, 911 direct relationships, 418 token bindings. [ARC runnable](arc-protocol.md). A [gaps registry](../audit/README.md) of 1,290 ranked work items.

**Thin:** [metadata](../layers/02-metadata.md) — 42.5% of components have a record, 6.9% carry `usage`.

**The honest read:** the structural layers are complete and one vintage. Intent is the thin layer, and its thinness is now *recorded rather than hidden* — every missing field is a ranked audit item. ARC can report what was chosen and what it binds; it can only sometimes say why.

The path out is not more architecture. It is `usage` written for the twenty components that carry real load, and the registry names them.

---

## The Test

The system is working when a question about the design system is answered by a **lookup** rather than a search — and returns the same answer tomorrow.

Everything else here is in service of that.

---

*[← Intent-Driven Context](intent-driven-context.md) · [Architecture →](../ARCHITECTURE.md)*
