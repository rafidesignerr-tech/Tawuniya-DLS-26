#!/usr/bin/env python3
"""
Token Query — Tawuniya DLS Layer 1
==================================
Deterministic queries against tokens.json. Same role for tokens that
arc_query.py plays for components: the index answers, exploration does not.

  stats                counts, collections, coverage
  find <query>         search token names
  show <token>         one token's full record, all modes
  audit                architecture findings, recomputed
  orphans              primitives no semantic token aliases
  aliases <primitive>  which semantic tokens point at a primitive
  modes                Light/Dark parity and identical-value report

  --tokens PATH        default ../tokens/tokens.json
  --json               machine-readable output
"""

import argparse
import json
import os
import sys
from collections import Counter, defaultdict

DEFAULT = os.path.join(os.path.dirname(__file__), "..", "tokens", "tokens.json")


def load(path):
    if not os.path.exists(path):
        raise SystemExit(f"error: tokens file not found: {path}")
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def all_vars(d):
    out = []
    for key, kind in (("colorVariables", "color"), ("floatVariables", "float"),
                      ("stringVariables", "string")):
        for v in d.get(key, []):
            r = dict(v)
            r["kind"] = kind
            out.append(r)
    return out


def emit(payload, as_json):
    if as_json:
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return True
    return False


def semantic(d):
    return [c for c in d.get("colorVariables", []) if c["collection"] != "Primitives"]


def primitives(d):
    return [c for c in d.get("colorVariables", []) if c["collection"] == "Primitives"]


def aliased_set(d):
    used = set()
    for c in semantic(d):
        for m in c.get("modes", {}).values():
            if m.get("alias"):
                used.add(m["alias"])
    return used


# ------------------------------------------------------------------ commands --

def cmd_stats(d, a):
    sem, prim = semantic(d), primitives(d)
    out = {
        "file": d.get("file"), "exported": d.get("date"),
        "totals": d.get("totals"),
        "collections": [{k: v for k, v in c.items() if k != "variables"}
                        for c in d.get("collections", [])],
        "semanticColors": len(sem), "primitiveColors": len(prim),
        "describedSemantic": sum(1 for c in sem if c.get("description")),
        "describedPrimitive": sum(1 for c in prim if c.get("description")),
    }
    if emit(out, a.json):
        return
    print(f"Source        {out['file']}   exported {out['exported']}")
    print(f"Totals        {out['totals']}")
    for c in out["collections"]:
        print(f"  {c['name']:<16} {c['varCount']:>4} vars   modes: {', '.join(c['modes'])}")
    print(f"Semantic      {out['semanticColors']}  "
          f"(described: {out['describedSemantic']})")
    print(f"Primitives    {out['primitiveColors']}  "
          f"(described: {out['describedPrimitive']})")


def cmd_find(d, a):
    q = a.query.lower()
    hits = [v for v in all_vars(d) if q in v["name"].lower()]
    if emit([{"name": v["name"], "collection": v["collection"], "kind": v["kind"]}
             for v in hits], a.json):
        return
    if not hits:
        print(f"no token matches {a.query!r}")
        return
    for v in sorted(hits, key=lambda x: x["name"]):
        print(f"  {v['name']:<50} {v['collection']:<14} {v['kind']}")


def cmd_show(d, a):
    hits = [v for v in all_vars(d) if v["name"] == a.token]
    if not hits:
        hits = [v for v in all_vars(d) if a.token.lower() in v["name"].lower()]
    if not hits:
        raise SystemExit(f"not found: {a.token!r}")
    if emit(hits, a.json):
        return
    for v in hits[:10]:
        print(f"\n{v['name']}   [{v['collection']}]")
        if v.get("description"):
            print(f"  description  {v['description']}")
        if "modes" in v:
            for mode, val in v["modes"].items():
                bits = [f"{k}={val[k]}" for k in val]
                print(f"  {mode:<8} {'  '.join(bits)}")
        elif "value" in v:
            print(f"  value    {v['value']}")


def cmd_audit(d, a):
    sem, prim = semantic(d), primitives(d)
    raw = [c["name"] for c in sem
           if any("alias" not in m for m in c.get("modes", {}).values())]
    names = [c["name"] for c in d.get("colorVariables", [])]
    grey = sum(1 for n in names if "grey" in n.lower())
    gray = sum(1 for n in names if "gray" in n.lower())
    used = aliased_set(d)
    pnames = {c["name"] for c in prim}
    orphan = sorted(pnames - used)
    identical = [c["name"] for c in sem
                 if "Dark" in c.get("modes", {})
                 and c["modes"].get("Light", {}).get("hex")
                 == c["modes"].get("Dark", {}).get("hex")]
    prefixes = Counter(c["name"].split("/")[0] for c in sem)
    out = {
        "rawHexSemantic": raw,
        "greySpellings": {"grey": grey, "gray": gray},
        "unreferencedPrimitives": len(orphan),
        "primitiveTotal": len(pnames),
        "identicalAcrossModes": len(identical),
        "describedSemantic": sum(1 for c in sem if c.get("description")),
        "semanticTotal": len(sem),
        "topPrefix": prefixes.most_common(1)[0] if prefixes else None,
    }
    if emit(out, a.json):
        return
    print("\nTOKEN ARCHITECTURE AUDIT\n")
    print(f"  alias discipline     {len(sem)-len(raw)}/{len(sem)} semantic tokens aliased")
    if raw:
        print(f"    raw hex: {', '.join(raw)}")
    print(f"  documentation        {out['describedSemantic']}/{len(sem)} "
          f"semantic tokens described")
    print(f"  naming               grey={grey}  gray={gray}"
          f"{'   ← two spellings' if grey and gray else ''}")
    print(f"  unreferenced prims   {len(orphan)}/{len(pnames)}")
    print(f"  identical L/D        {len(identical)}/{len(sem)}")
    if out["topPrefix"]:
        p, n = out["topPrefix"]
        print(f"  largest namespace    {p}/ = {n} ({round(n/len(sem)*100)}% of semantic layer)")


def cmd_orphans(d, a):
    used = aliased_set(d)
    orphan = sorted({c["name"] for c in primitives(d)} - used)
    groups = defaultdict(list)
    for n in orphan:
        groups["/".join(n.split("/")[:2])].append(n)
    if emit(groups, a.json):
        return
    print(f"\nUNREFERENCED PRIMITIVES — {len(orphan)}\n")
    for g in sorted(groups):
        print(f"  {g} ({len(groups[g])})")
        for n in groups[g][:8]:
            print(f"    {n}")
        if len(groups[g]) > 8:
            print(f"    … {len(groups[g])-8} more")


def cmd_aliases(d, a):
    hits = []
    for c in semantic(d):
        for mode, m in c.get("modes", {}).items():
            if m.get("alias") and a.primitive.lower() in m["alias"].lower():
                hits.append({"token": c["name"], "mode": mode, "alias": m["alias"]})
    if emit(hits, a.json):
        return
    if not hits:
        print(f"nothing aliases {a.primitive!r}")
        return
    print(f"\nSEMANTIC TOKENS POINTING AT {a.primitive!r} — {len(hits)}\n")
    for h in hits:
        print(f"  {h['token']:<45} {h['mode']:<6} → {h['alias']}")


def cmd_modes(d, a):
    sem = semantic(d)
    no_dark = [c["name"] for c in sem if "Dark" not in c.get("modes", {})]
    no_light = [c["name"] for c in sem if "Light" not in c.get("modes", {})]
    identical = [c["name"] for c in sem
                 if "Dark" in c.get("modes", {})
                 and c["modes"].get("Light", {}).get("hex")
                 == c["modes"].get("Dark", {}).get("hex")]
    out = {"missingDark": no_dark, "missingLight": no_light,
           "identical": identical, "semanticTotal": len(sem)}
    if emit(out, a.json):
        return
    print(f"\nMODE PARITY — {len(sem)} semantic tokens\n")
    print(f"  missing Dark    {len(no_dark)}")
    print(f"  missing Light   {len(no_light)}")
    print(f"  identical L/D   {len(identical)}")
    for n in identical[:20]:
        print(f"    {n}")
    if len(identical) > 20:
        print(f"    … {len(identical)-20} more")


COMMANDS = {"stats": cmd_stats, "find": cmd_find, "show": cmd_show,
            "audit": cmd_audit, "orphans": cmd_orphans,
            "aliases": cmd_aliases, "modes": cmd_modes}


def main():
    ap = argparse.ArgumentParser(description="Token query engine — Tawuniya DLS Layer 1")
    ap.add_argument("--tokens", default=DEFAULT)
    ap.add_argument("--json", action="store_true")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("stats")
    p = sub.add_parser("find");    p.add_argument("query")
    p = sub.add_parser("show");    p.add_argument("token")
    sub.add_parser("audit")
    sub.add_parser("orphans")
    p = sub.add_parser("aliases"); p.add_argument("primitive")
    sub.add_parser("modes")
    a = ap.parse_args()
    COMMANDS[a.cmd](load(a.tokens), a)


if __name__ == "__main__":
    main()
