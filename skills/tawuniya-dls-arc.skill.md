---
name: tawuniya-dls-arc
version: 1.0.0
description: Run the ARC protocol (Audit → Report → Compose) against the Tawuniya Design System. Turns UI work from exploratory generation into deterministic assembly — every component chosen is proven to exist in the Layer 3 index, every composition is traced through its real dependency chain, and nothing is built before a reviewable spec is approved. Use when building a screen or component, deciding whether something already exists, assessing the blast radius of a change, auditing adoption or orphans, or answering any "what does the design system have" question.
layer: 4
system: Tawuniya Design System (Tawuniya DLS)
requires: Layer 3 index — component-usage.toon
---

# Tawuniya DLS — ARC Protocol (Layer 4)

**Audit → Report → Compose.** Three phases, in order, no skipping.

> A compiler does not explore your source hoping to find things. It parses against a known grammar and produces the same output every run. ARC does that to UI work.

---

## Why This Exists

Measured on an 11-trial benchmark, same model and same repo, the only variable being whether an indexed architecture existed:

| | Control | With ARC |
|---|---|---|
| Tokens | 27,211 | 28,166 *(+3.5%)* |
| Duration | 4:26 | **1:52** |
| Accuracy | 65% | **100%** |
| Variance | 26.5% | **0.04%** |

Token cost is a wash. What changes is **speed and determinism** — the control group answered the same question differently every run, and reported a **60% false-negative rate**: components called unused that were actually in use. That is not a slow answer, it is an answer that deletes live code.

Break-even is 3–5 queries into a session.

---

## The Contract

**Phase 1 — AUDIT.** Query the index. Never explore, never assume, never invent a component name. If it is not in the index, it does not exist.

**Phase 2 — REPORT.** Emit a spec naming every component, its variants, why it was chosen, and what was rejected and why. **This is a reviewable contract and it requires human approval before Compose begins.**

**Phase 3 — COMPOSE.** Build using *only* what the Report named. If something needed is missing from it — **stop and re-audit**. Do not reach outside the Report.

That last rule is where the 0.04% variance comes from. Every other part of ARC is bookkeeping in service of it.

---

## Index Location

All commands read the Layer 3 index:

```
component-usage.toon      ← authoritative (preserves duplicate names)
component-usage.json      ← fallback (duplicates collapse — 318 rows → 300 keys)
```

Repo: `github.com/rafidesignerr-tech/tawuniya-dls-index` → `src/.ai/`

Prefer the TOON file. The JSON is keyed by name, so components sharing a name overwrite each other and the count silently drops.

---

## Phase 1 — AUDIT

Run the query engine. Every command below is deterministic: same index, same answer, every time.

```bash
python arc_query.py stats                          # system overview
python arc_query.py find "button"                  # search inventory
python arc_query.py show "Mobile/Button"           # one component's record
python arc_query.py impact "Mobile/Button"         # blast radius (Protocol A)
python arc_query.py trace "Mobile/Accordion" --category atom   # deep trace (Protocol B)
python arc_query.py similar "copy to clipboard"    # search-before-create (Protocol C)
python arc_query.py orphans                        # unreferenced (Protocol E)
python arc_query.py duplicates                     # same name, different node
python arc_query.py hubs -n 20                     # highest blast radius

# machine-readable
python arc_query.py --json impact "Mobile/Button"
```

### The five protocols

**A · Blast radius** — `impact`. Walks `usedBy` recursively with cycle guarding, grouped by depth. Run before any API or variant change.

**B · Deep trace** — `trace`. Walks `uses` recursively to the leaves. A one-level lookup returns organisms and stops, confidently and wrongly. Add `--category atom` to filter.

**C · Search before create** — `similar`. Scores the inventory against your intent, ranked by match strength then adoption. **Run this before creating anything.**

**D · Coverage** — `stats`. Counts, density, orphans, category split. Metadata coverage lands here once Layer 2 exists.

**E · Orphan triage** — `orphans`. Grouped by page, so expected roots separate from genuine candidates for deprecation.

### Audit rules

- If `find` returns nothing, the component **does not exist**. Say so. Do not invent a plausible name.
- If a name is ambiguous, the engine lists candidates rather than guessing. Pick one explicitly.
- If the header row count disagrees with the rows parsed, **say so in the Report**. A truncated or incomplete index invalidates every answer built on it.

---

## Phase 2 — REPORT

Never skip to Compose. The Report is the approval gate.

```markdown
## ARC Report — <what was requested>

### Audit
Index: component-usage.toon · <N> components · queried <date>

### Components selected
| Component | Node ID | Variants | Why |
|---|---|---|---|
| Mobile/Button | 921:… | 60 | Primary action; 57 usages, the system default |

### Composition chain
Mobile/Accordion → _Atoms/Rating Bar → _Atoms/Review Star → icon-24/star
(3 levels, traced — not assumed)

### Rejected
| Considered | Why not |
|---|---|
| _Atoms/Home Button | usedBy=1, page-specific, not a general control |

### Nothing new is being created
Searched "<intent>" — <N> candidates found. Extending <X> instead.

### Flags
- <duplicates, orphans, or index warnings that affect this work>

### Approval required before Compose.
```

Rejections carry as much weight as selections. A Report that only lists what was chosen hides the decision.

---

## Phase 3 — COMPOSE

Build from the approved Report and nothing else.

- Every component used appears in the Report. No exceptions.
- Need something not in it → **stop, re-audit, amend the Report, get approval.**
- Prefer extending an existing component with a new prop or variant over creating one.
- Respect the traced chain: if `Mobile/Accordion` already contains rating and star atoms, do not add them alongside it.

---

## Governance Rule

> **Prefer editing over creating.**
> Before creating a new component, search the index for similar components and extend an existing one with new props or variants rather than creating a duplicate.

This is what prevents nine Button variants, and it works only because `similar` made "search for something like this" a real operation. Enforced at authoring time, not at review — governance before the code exists is prevention; governance at review is archaeology.

---

## Known State of the Tawuniya Index

Findings from the current index. Read these before trusting a number.

**318 rows parsed, header declares 320.** Two components were counted by the generator and never emitted. The explicit-length property of TOON is what makes this visible at all — it is a generator bug, and it means every total is currently short by two. Fix at the source.

**300 unique names across 318 rows — 18 duplicated.** Same name, different node IDs. `Alert` exists twice (Cards, and Top Nav, both usedBy=2). `Mobile/List item Card` exists twice on the *same page*. Some are legitimate BETA-vs-production pairs; several are not. Run `duplicates` and resolve before anyone builds against a name.

**160 orphans of 318 — half the library.** Some legitimate: top-level patterns are supposed to be roots, and the BETA page is not expected to be composed yet. The remainder needs Protocol E.

**`Mobile/Button` — 57 direct consumers, 75 affected at full depth, 60 variants.** The widest blast radius in the system and the strongest candidate for "extend, do not create."

**Categories are inferred from name prefixes**, not stored. `_Atoms/*` and `icon-*` map to atoms, giving 82 atoms / 217 components / 19 internal. Real atomic categories belong in the index — until then `--category` is a heuristic, and the Report should say so.

**Instance counts are pre-slot-correction.** Components that only pass children through inflate the numbers. Expect totals to fall once slot handling lands, and read that fall as the data getting honest.

---

## Worked Example

```
$ python arc_query.py trace "Mobile/Accordion" --category atom

DEEP TRACE — Mobile/Accordion
  dependencies   6   max depth 3

  level 1 (4)
    _Atoms/Rating Bar
    icon-24/arrow-down  ·leaf
    icon-24/arrow-up  ·leaf
    icon-24/component  ·leaf

  level 2 (1)
    _Atoms/Review Star

  level 3 (1)
    icon-24/star  ·leaf
```

`icon-24/star` sits three levels down. It is never imported by the Accordion. An agent that looked only at direct dependencies would report the star as unused — which is precisely the false negative that gets working components deleted.

---

## Checklist

**Audit**
- [ ] Queried the index — did not explore or assume
- [ ] Ran `similar` before proposing anything new
- [ ] Traced composition rather than guessing at it
- [ ] Checked `duplicates` for any name being built against
- [ ] Noted the 318/320 discrepancy if totals matter

**Report**
- [ ] Every component named with node ID and reason
- [ ] Rejections listed with reasons
- [ ] Composition chain shown at full depth
- [ ] Flags surfaced
- [ ] **Approval obtained**

**Compose**
- [ ] Only Report components used
- [ ] Re-audited rather than improvised when something was missing
- [ ] Extended rather than duplicated

---

## Feedback Loop

The output of ARC is not the report. It is the correction the report triggers.

Every discrepancy found — the missing two rows, the duplicate `Alert`, an instance count that does not match reality — goes **back into Layer 3's generator**, not into a note. Next run is more accurate. That is the mechanism by which the agent stops consuming the design system and starts maintaining it.

```
   Layer 3 index ──► ARC Audit ──► Report
        ▲                             │
        └────────── refinement ◄──────┘
```

---

# Bundled Script

Save as `arc_query.py` beside the index files. Python 3.8+, no third-party packages.

```bash
# from the folder holding component-usage.toon
python arc_query.py stats
python arc_query.py --index /path/to/component-usage.toon impact "Mobile/Button"
```

<!-- BEGIN arc_query.py -->
```python
#!/usr/bin/env python3
"""
ARC Query — Tawuniya DLS Layer 4
================================
Deterministic queries against the Layer 3 index. This is the AUDIT engine:
every answer comes from the index, never from exploration.

Reads component-usage.toon (authoritative — preserves duplicate names) and
falls back to component-usage.json when the TOON file is absent.

Commands
--------
  stats                          system overview
  find <query>                   search the inventory by name
  show <component>               one component's full record
  impact <component>             blast radius — everything that breaks (Protocol A)
  trace <component> [--category] leaf dependencies, recursive (Protocol B)
  similar <intent>               search-before-create (Protocol C)
  orphans [--exclude-pages]      components nothing references (Protocol E)
  duplicates                     same name, different node id
  hubs [-n N]                    most-depended-on components

Every command accepts --index PATH (default: ./component-usage.toon)
and --json for machine-readable output.
"""

import argparse
import json
import os
import re
import sys
from collections import defaultdict

VERSION = "1.0.0"

SCALARS = ["name", "id", "page", "type", "variantCount"]
ARRAYS = ["variantProps", "uses", "usedBy", "instances"]

# Name-prefix → atomic category. Tune these to your conventions.
CATEGORY_RULES = [
    (r"^icon-\d+/", "atom"),
    (r"^_Atoms/", "atom"),
    (r"^_", "internal"),
    (r"/", "component"),
]


def categorize(name):
    for pattern, cat in CATEGORY_RULES:
        if re.search(pattern, name):
            return cat
    return "component"


# ---------------------------------------------------------------- parsing --

def parse_toon(path):
    """Parse the tabular TOON block into records, preserving duplicate names."""
    with open(path, encoding="utf-8") as fh:
        lines = fh.read().splitlines()

    header_idx, fields = None, None
    for i, line in enumerate(lines):
        m = re.match(r"^components\[(\d+)\]\{(.+)\}:\s*$", line)
        if m:
            header_idx = i
            fields = m.group(2).split(",")
            declared = int(m.group(1))
            break
    if header_idx is None:
        raise SystemExit(f"error: no components[...] table found in {path}")

    records = []
    for line in lines[header_idx + 1:]:
        if not line.strip() or line.startswith("#"):
            continue
        rec = parse_row(line, fields)
        if rec:
            records.append(rec)

    if len(records) != declared:
        print(f"warning: header declares {declared} rows, parsed {len(records)}",
              file=sys.stderr)
    return records


ID_RE = re.compile(r"^\d+[:I]\d+$")
TYPE_VALUES = {"COMPONENT_SET", "COMPONENT", "INSTANCE", "FRAME"}


def parse_row(line, fields):
    tokens = line.split(",")
    rec, pos = {}, 0
    for field in fields:
        if pos >= len(tokens):
            return None
        # Names and page titles may themselves contain commas. Anchor on the
        # fields that have a known shape: id is "123:456", type is a fixed
        # vocabulary. Absorb tokens greedily until the next anchor matches.
        if field == "name":
            start = pos
            while pos < len(tokens) and not ID_RE.match(tokens[pos].strip()):
                pos += 1
            rec["name"] = ",".join(tokens[start:pos]).strip()
            continue
        if field == "page":
            start = pos
            while pos < len(tokens) and tokens[pos].strip() not in TYPE_VALUES:
                pos += 1
            rec["page"] = ",".join(tokens[start:pos]).strip()
            continue
        if field in ARRAYS:
            tok = tokens[pos]
            m = re.match(r"^\s*\[(\d+)\]:\s*(.*)$", tok)
            if not m:
                rec[field] = []
                pos += 1
                continue
            n, first = int(m.group(1)), m.group(2)
            pos += 1
            if n == 0:
                rec[field] = []
            else:
                items = [first]
                take = n - 1
                items.extend(t.strip() for t in tokens[pos:pos + take])
                pos += take
                rec[field] = [i.strip() for i in items if i.strip()]
        else:
            rec[field] = tokens[pos].strip()
            pos += 1
    rec["category"] = categorize(rec.get("name", ""))
    return rec


def parse_json(path):
    with open(path, encoding="utf-8") as fh:
        data = json.load(fh)
    comps = data.get("components", data)
    records = []
    for name, rec in comps.items():
        r = dict(rec)
        r.setdefault("name", name)
        r["category"] = categorize(r["name"])
        records.append(r)
    return records


def load(path):
    if os.path.exists(path):
        return parse_toon(path) if path.endswith(".toon") else parse_json(path)
    alt = path.replace(".toon", ".json")
    if os.path.exists(alt):
        print(f"note: {path} not found, using {alt} "
              "(duplicate names collapse in JSON)", file=sys.stderr)
        return parse_json(alt)
    raise SystemExit(f"error: index not found: {path}")


def build(records):
    by_name = defaultdict(list)
    for r in records:
        by_name[r["name"]].append(r)
    return by_name


def resolve(by_name, query):
    """Exact match first, then case-insensitive, then suffix, then substring."""
    if query in by_name:
        return query
    low = {k.lower(): k for k in by_name}
    if query.lower() in low:
        return low[query.lower()]
    tail = [k for k in by_name if k.split("/")[-1].lower() == query.lower()]
    if len(tail) == 1:
        return tail[0]
    part = [k for k in by_name if query.lower() in k.lower()]
    if len(part) == 1:
        return part[0]
    if tail or part:
        cands = sorted(set(tail + part))[:12]
        raise SystemExit("ambiguous — did you mean:\n  " + "\n  ".join(cands))
    raise SystemExit(f"not in the index: {query!r}  (try: find {query})")


# ------------------------------------------------------------- traversals --

def walk(by_name, start, field, max_depth=20):
    """Recursive traversal with cycle guarding. Returns {name: depth}."""
    seen, frontier, depth = {}, [start], 0
    while frontier and depth < max_depth:
        depth += 1
        nxt = []
        for node in frontier:
            for rec in by_name.get(node, []):
                for child in rec.get(field, []):
                    if child not in seen and child != start:
                        seen[child] = depth
                        nxt.append(child)
        frontier = nxt
    return seen


# ---------------------------------------------------------------- output --

def emit(payload, as_json):
    if as_json:
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return True
    return False


# -------------------------------------------------------------- commands --

def cmd_stats(recs, by_name, a):
    pages = defaultdict(int)
    cats = defaultdict(int)
    for r in recs:
        pages[r.get("page", "?")] += 1
        cats[r["category"]] += 1
    edges = sum(len(r.get("uses", [])) for r in recs)
    dupes = {n: len(v) for n, v in by_name.items() if len(v) > 1}
    orph = [r["name"] for r in recs if not r.get("usedBy")]
    out = {
        "totalComponents": len(recs),
        "uniqueNames": len(by_name),
        "duplicateNames": len(dupes),
        "pages": len(pages),
        "relationships": edges,
        "density": round(edges / len(recs), 2) if recs else 0,
        "orphans": len(orph),
        "byCategory": dict(sorted(cats.items())),
    }
    if emit(out, a.json):
        return
    print(f"Components      {out['totalComponents']}  "
          f"({out['uniqueNames']} unique names, {out['duplicateNames']} duplicated)")
    print(f"Pages           {out['pages']}")
    print(f"Relationships   {out['relationships']}  (density {out['density']})")
    print(f"Orphans         {out['orphans']}")
    print("Categories      " + ", ".join(f"{k}:{v}" for k, v in out["byCategory"].items()))


def cmd_find(recs, by_name, a):
    q = a.query.lower()
    hits = [r for r in recs if q in r["name"].lower()]
    if emit([{"name": r["name"], "page": r.get("page"), "id": r.get("id"),
              "usedBy": len(r.get("usedBy", []))} for r in hits], a.json):
        return
    if not hits:
        print(f"no match for {a.query!r}")
        return
    for r in sorted(hits, key=lambda x: -len(x.get("usedBy", []))):
        print(f"{r['name']:<45} {r.get('page','?'):<22} "
              f"usedBy={len(r.get('usedBy', []))}  {r.get('id','')}")


def cmd_show(recs, by_name, a):
    name = resolve(by_name, a.component)
    out = by_name[name]
    if emit(out, a.json):
        return
    for r in out:
        print(f"\n{r['name']}   [{r.get('id','')}]")
        print(f"  page          {r.get('page','?')}")
        print(f"  type          {r.get('type','?')}   category={r['category']}")
        print(f"  variants      {r.get('variantCount','?')}  "
              f"({', '.join(r.get('variantProps', [])) or 'none'})")
        print(f"  uses          {', '.join(r.get('uses', [])) or '—'}")
        print(f"  usedBy        {', '.join(r.get('usedBy', [])) or '—'}")
        print(f"  instances     {', '.join(r.get('instances', [])) or '—'}")
        if len(out) > 1:
            print("  ** duplicate name — more than one node carries it **")


def cmd_impact(recs, by_name, a):
    name = resolve(by_name, a.component)
    reached = walk(by_name, name, "usedBy")
    direct = sorted({c for r in by_name[name] for c in r.get("usedBy", [])})
    out = {"component": name, "direct": direct,
           "totalAffected": len(reached),
           "byDepth": {str(d): sorted(n for n, dd in reached.items() if dd == d)
                       for d in sorted(set(reached.values()))}}
    if emit(out, a.json):
        return
    print(f"\nBLAST RADIUS — {name}")
    print(f"  direct consumers   {len(direct)}")
    print(f"  total affected     {len(reached)}")
    for d in sorted(set(reached.values())):
        names = sorted(n for n, dd in reached.items() if dd == d)
        print(f"\n  level {d} ({len(names)})")
        for n in names[:30]:
            print(f"    {n}")
        if len(names) > 30:
            print(f"    … {len(names)-30} more")
    if not reached:
        print("  nothing depends on this component")


def cmd_trace(recs, by_name, a):
    name = resolve(by_name, a.component)
    reached = walk(by_name, name, "uses")
    leaves = [n for n in reached
              if not any(r.get("uses") for r in by_name.get(n, []))]
    filtered = ([n for n in reached if categorize(n) == a.category]
                if a.category else sorted(reached))
    out = {"component": name, "totalDependencies": len(reached),
           "maxDepth": max(reached.values()) if reached else 0,
           "leaves": sorted(leaves), "filtered": sorted(filtered)}
    if emit(out, a.json):
        return
    print(f"\nDEEP TRACE — {name}")
    print(f"  dependencies   {len(reached)}   max depth {out['maxDepth']}")
    for d in sorted(set(reached.values())):
        names = sorted(n for n, dd in reached.items() if dd == d)
        print(f"\n  level {d} ({len(names)})")
        for n in names[:30]:
            mark = "  ·leaf" if n in leaves else ""
            print(f"    {n}{mark}")
        if len(names) > 30:
            print(f"    … {len(names)-30} more")
    if a.category:
        print(f"\n  category={a.category}: {len(filtered)}")
        for n in sorted(filtered):
            print(f"    {n}")


def cmd_similar(recs, by_name, a):
    terms = [t for t in re.split(r"[\s/_-]+", a.intent.lower()) if len(t) > 2]
    scored = []
    for r in recs:
        hay = (r["name"] + " " + " ".join(r.get("variantProps", []))).lower()
        score = sum(1 for t in terms if t in hay)
        if score:
            scored.append((score, len(r.get("usedBy", [])), r))
    scored.sort(key=lambda x: (-x[0], -x[1]))
    top = scored[:15]
    if emit([{"name": r["name"], "score": s, "usedBy": u,
              "variants": r.get("variantCount")} for s, u, r in top], a.json):
        return
    print(f"\nSEARCH BEFORE CREATE — {a.intent!r}")
    if not top:
        print("  no overlap found — creating may be justified")
        return
    print("  extend one of these before creating anything new:\n")
    for s, u, r in top:
        print(f"    {r['name']:<45} match={s} usedBy={u} "
              f"variants={r.get('variantCount','?')}")


def cmd_orphans(recs, by_name, a):
    orph = [r for r in recs if not r.get("usedBy")]
    if a.exclude_pages:
        orph = [r for r in orph if r["category"] != "internal"]
    groups = defaultdict(list)
    for r in orph:
        groups[r.get("page", "?")].append(r["name"])
    if emit({k: sorted(v) for k, v in groups.items()}, a.json):
        return
    print(f"\nORPHANS — {len(orph)} components nothing references\n")
    for page in sorted(groups):
        print(f"  {page} ({len(groups[page])})")
        for n in sorted(groups[page])[:15]:
            print(f"    {n}")
        if len(groups[page]) > 15:
            print(f"    … {len(groups[page])-15} more")


def cmd_duplicates(recs, by_name, a):
    dupes = {n: v for n, v in by_name.items() if len(v) > 1}
    out = {n: [{"id": r.get("id"), "page": r.get("page"),
                "usedBy": len(r.get("usedBy", []))} for r in v]
           for n, v in dupes.items()}
    if emit(out, a.json):
        return
    print(f"\nDUPLICATE NAMES — {len(dupes)}\n")
    for n, v in sorted(dupes.items()):
        print(f"  {n}  ({len(v)} nodes)")
        for r in v:
            print(f"    {r.get('id',''):<16} {r.get('page','?'):<22} "
                  f"usedBy={len(r.get('usedBy', []))}")


def cmd_hubs(recs, by_name, a):
    ranked = sorted(recs, key=lambda r: -len(r.get("usedBy", [])))[:a.n]
    if emit([{"name": r["name"], "usedBy": len(r.get("usedBy", []))}
             for r in ranked], a.json):
        return
    print(f"\nTOP HUBS — highest blast radius\n")
    for r in ranked:
        print(f"  {r['name']:<45} usedBy={len(r.get('usedBy', []))}")


COMMANDS = {
    "stats": cmd_stats, "find": cmd_find, "show": cmd_show,
    "impact": cmd_impact, "trace": cmd_trace, "similar": cmd_similar,
    "orphans": cmd_orphans, "duplicates": cmd_duplicates, "hubs": cmd_hubs,
}


def main():
    ap = argparse.ArgumentParser(description="ARC Audit engine — Tawuniya DLS Layer 4")
    ap.add_argument("--index", default="component-usage.toon")
    ap.add_argument("--json", action="store_true")
    sub = ap.add_subparsers(dest="cmd", required=True)

    sub.add_parser("stats")
    p = sub.add_parser("find");        p.add_argument("query")
    p = sub.add_parser("show");        p.add_argument("component")
    p = sub.add_parser("impact");      p.add_argument("component")
    p = sub.add_parser("trace");       p.add_argument("component"); p.add_argument("--category")
    p = sub.add_parser("similar");     p.add_argument("intent")
    p = sub.add_parser("orphans");     p.add_argument("--exclude-pages", action="store_true")
    sub.add_parser("duplicates")
    p = sub.add_parser("hubs");        p.add_argument("-n", type=int, default=15)

    a = ap.parse_args()
    recs = load(a.index)
    by_name = build(recs)
    COMMANDS[a.cmd](recs, by_name, a)


if __name__ == "__main__":
    main()
```
<!-- END arc_query.py -->

---

## Source

*Design systems as compilers: ARC architecture trial* — 11 trials, Dec 24–27 2025, Claude Sonnet 4.5.
Figures are from a single repo and a single author; treat the direction as sound and the percentages as indicative.

---

*Tawuniya Design System · Agentic Infrastructure · Layer 4 — Strategies / Queries*
