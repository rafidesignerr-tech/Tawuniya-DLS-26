# audit/ — The Gaps Registry

> **Generated alongside the index. Do not edit by hand.**
> Query: `python ../scripts/arc_query.py --index ../index/relationships/component-usage.toon gaps`

## The principle

A missing `usage` block is **not a defect in the infrastructure**. It is a fact about the design system that the infrastructure has correctly recorded.

> Readability is not the same as completeness.
> The system is readable when it can tell you exactly what it does *not* know.

`hasUsage: no` in the index is a true, queryable statement. Every one of those becomes a row here — a work item with an owner, a severity, and a priority derived from how many components depend on the subject.

This is what makes the **Audit phase** possible before documentation is finished: the audit's first output is the documentation backlog itself.

## Contents

| File | What |
|---|---|
| `gaps.toon` | 1,290 work items, ranked |
| `gaps.json` | Same, machine-native |
| `summary.json` | Counts by type and severity |

## The rules

| Gap | Severity | Meaning |
|---|---|---|
| `missing-usage` | high | No use cases or anti-patterns — an agent cannot tell when *not* to use this |
| `missing-metadata` | high | No Layer 2 record at all |
| `legacy-tokens` | high | Binds variables absent from `tokens.json` — styled outside the token system |
| `missing-accessibility` | medium | No accessibility contract |
| `missing-category` | medium | No atomic category; the query engine falls back to a name-prefix guess |
| `missing-figma-id` | medium | Metadata exists but carries no node id — ambiguous against duplicated names |
| `no-tokens` | medium | Binds nothing — likely hardcoded values |
| `orphan` | low | Nothing references it; may be a legitimate root |

## Current state

**1,290 items** — 635 high, 485 medium, 170 low.

| Gap | Count |
|---|---|
| `missing-usage` | 298 |
| `missing-accessibility` | 285 |
| `missing-metadata` | 184 |
| `missing-category` | 184 |
| `orphan` | 170 |
| `legacy-tokens` | 153 |
| `missing-figma-id` | 10 |
| `no-tokens` | 6 |

**Where to start** — high severity, ranked by dependents:

| Component | Gap | usedBy |
|---|---|---|
| `Mobile/Button` | legacy-tokens | 57 |
| `Mobile/Icon Button` | legacy-tokens | 33 |
| `Mobile/Tag` | missing-usage + legacy-tokens | 35 |
| `_Atoms/Radio Icon` | missing-usage | 9 |
| `Mobile/Pricings` | missing-usage | 11 |

## Queries

```bash
IDX=../index/relationships/component-usage.toon
python ../scripts/arc_query.py --index $IDX gaps --severity high
python ../scripts/arc_query.py --index $IDX gaps --gap missing-usage -n 40
python ../scripts/arc_query.py --index $IDX gaps --gap legacy-tokens
python ../scripts/arc_query.py --index $IDX gaps --json > backlog.json
```

---

*[← Layer 4](../layers/04-orchestration.md) · [README](../README.md)*
