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

SCALARS = ["name", "id", "page", "type", "category", "hasMetadata", "hasUsage", "hasA11y", "variantCount"]
ARRAYS = ["variantProps", "uses", "usedBy", "instances", "tokens", "props"]

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
    if not rec.get("category"):
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



def _tok_names():
    import os
    tp = os.path.join(os.path.dirname(__file__), "..", "tokens", "tokens.json")
    try:
        d = json.load(open(tp, encoding="utf-8"))
    except Exception:
        return set()
    n = set()
    for k in ("colorVariables", "floatVariables", "stringVariables"):
        n |= {v["name"] for v in d.get(k, [])}
    return n


def cmd_tokens(recs, by_name, a):
    name = resolve(by_name, a.component)
    toks = sorted({t for r in by_name[name] for t in r.get("tokens", [])})
    known = _tok_names()
    out = {"component": name, "total": len(toks),
           "layer1": [t for t in toks if t in known],
           "legacy": [t for t in toks if known and t not in known]}
    if emit(out, a.json):
        return
    print(f"\nTOKENS — {name}   ({len(toks)})")
    for t in out["layer1"]:
        print(f"    {t}")
    if out["legacy"]:
        print(f"\n  LEGACY (not in tokens.json) — {len(out['legacy'])}")
        for t in out["legacy"]:
            print(f"    {t}")


def cmd_token(recs, by_name, a):
    q = a.token.lower()
    hits = sorted({r["name"] for r in recs
                   for t in r.get("tokens", []) if q in t.lower()})
    exact = sorted({t for r in recs for t in r.get("tokens", []) if q in t.lower()})
    out = {"query": a.token, "matchedTokens": exact, "components": hits}
    if emit(out, a.json):
        return
    print(f"\nTOKEN USAGE — {a.token!r}")
    print(f"  matched tokens ({len(exact)}): {', '.join(exact[:8])}"
          + (" …" if len(exact) > 8 else ""))
    print(f"  used by {len(hits)} components:")
    for n in hits[:40]:
        print(f"    {n}")
    if len(hits) > 40:
        print(f"    … {len(hits)-40} more")


def cmd_legacy(recs, by_name, a):
    known = _tok_names()
    if not known:
        raise SystemExit("tokens.json not found — cannot classify")
    bad = {}
    for r in recs:
        for t in r.get("tokens", []):
            if t not in known:
                bad.setdefault(t, []).append(r["name"])
    if emit({k: sorted(v) for k, v in bad.items()}, a.json):
        return
    print(f"\nLEGACY TOKEN REFERENCES — {len(bad)} variables outside tokens.json\n")
    for t, comps in sorted(bad.items(), key=lambda x: -len(x[1])):
        print(f"  {t:<42} {len(comps)} components")



def cmd_gaps(recs, by_name, a):
    """Read the audit backlog produced alongside the index."""
    path = os.path.join(os.path.dirname(__file__), "..", "audit", "gaps.json")
    if not os.path.exists(path):
        raise SystemExit("audit/gaps.json not found")
    rows = json.load(open(path, encoding="utf-8"))
    if a.gap:
        rows = [r for r in rows if r["gap"] == a.gap]
    if a.severity:
        rows = [r for r in rows if r["severity"] == a.severity]
    if emit(rows[:a.n], a.json):
        return
    from collections import Counter
    print(f"\nGAPS REGISTRY — {len(rows)} work items"
          + (f"  (gap={a.gap})" if a.gap else "")
          + (f"  (severity={a.severity})" if a.severity else ""))
    print("  " + "  ".join(f"{k}={v}" for k, v in Counter(r["gap"] for r in rows).most_common()))
    print()
    print(f"  {'sev':<7}{'gap':<22}{'component':<40}{'usedBy':>6}")
    for r in rows[:a.n]:
        print(f"  {r['severity']:<7}{r['gap']:<22}{r['component'][:38]:<40}{r['usedBy']:>6}"
              + (f"   {r['detail']}" if r.get("detail") else ""))
    if len(rows) > a.n:
        print(f"  … {len(rows)-a.n} more (raise -n)")


COMMANDS = {
    "stats": cmd_stats, "find": cmd_find, "show": cmd_show,
    "impact": cmd_impact, "trace": cmd_trace, "similar": cmd_similar,
    "orphans": cmd_orphans, "duplicates": cmd_duplicates, "hubs": cmd_hubs,
    "tokens": cmd_tokens, "token": cmd_token, "legacy": cmd_legacy,
    "gaps": cmd_gaps,
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
    p = sub.add_parser("tokens");      p.add_argument("component")
    p = sub.add_parser("token");       p.add_argument("token")
    sub.add_parser("legacy")
    p = sub.add_parser("gaps")
    p.add_argument("--gap"); p.add_argument("--severity")
    p.add_argument("-n", type=int, default=25)

    a = ap.parse_args()
    recs = load(a.index)
    by_name = build(recs)
    COMMANDS[a.cmd](recs, by_name, a)


if __name__ == "__main__":
    main()
