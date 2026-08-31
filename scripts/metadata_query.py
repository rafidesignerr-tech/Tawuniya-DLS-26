#!/usr/bin/env python3
"""
Metadata Query — Tawuniya DLS Layer 2
=====================================
Queries the authored component metadata in ../metadata/*.ts

  stats                 coverage and field-depth report
  find <query>          search covered components
  show <component>      one component's record, verbatim
  depth                 which fields exist on how many records
  gaps                  covered components missing the high-value fields
  uncovered             indexed components with no metadata, ranked by usage

  --dir PATH            default ../metadata
  --index PATH          component index, for coverage/uncovered
  --json                machine-readable
"""

import argparse
import glob
import json
import os
import re
import sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DIR = os.path.join(HERE, "..", "metadata")
DEFAULT_IDX = os.path.join(HERE, "..", "index", "relationships", "component-usage.toon")

RECORD_RE = re.compile(r"export const (\w+)\s*=\s*\{(.*?)\n\};", re.S)
TOPKEY_RE = re.compile(r"^  ([a-zA-Z_]+):", re.M)

# The fields that carry real design intent, as opposed to identity.
HIGH_VALUE = ["usage", "designTokens", "accessibility", "composition"]


def parse_dir(path):
    """Prefer the generated JSON (machine-native); fall back to parsing .ts."""
    consolidated = os.path.join(path, "metadata-index.json")
    if os.path.exists(consolidated):
        data = json.load(open(consolidated, encoding="utf-8"))
        return [{"file": v.get("sourceFile"), "page": None, "export": v.get("export"),
                 "name": v["name"], "figmaId": v.get("figmaId"),
                 "category": v.get("category"), "fields": v.get("fields", []),
                 "body": json.dumps(v.get("record", {}), indent=1, ensure_ascii=False)}
                for v in data.values()]
    out = []
    for f in sorted(glob.glob(os.path.join(path, "*.ts"))):
        txt = open(f, encoding="utf-8").read()
        page = re.search(r'pageName:\s*"([^"]+)"', txt)
        for m in RECORD_RE.finditer(txt):
            body = m.group(2)
            name = re.search(r'name:\s*"([^"]+)"', body)
            if not name:
                continue
            out.append({
                "file": os.path.basename(f),
                "page": page.group(1) if page else None,
                "export": m.group(1),
                "name": name.group(1),
                "figmaId": (re.search(r'figmaId:\s*"([^"]+)"', body) or [None, None])[1]
                if re.search(r'figmaId:\s*"([^"]+)"', body) else None,
                "category": (re.search(r'category:\s*"([^"]+)"', body).group(1)
                             if re.search(r'category:\s*"([^"]+)"', body) else None),
                "fields": sorted(set(TOPKEY_RE.findall(body))),
                "body": body,
            })
    return out


def load_index(path):
    if not os.path.exists(path):
        return []
    sys.path.insert(0, HERE)
    try:
        from arc_query import load
        return load(path)
    except Exception:
        return []


def emit(payload, as_json):
    if as_json:
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return True
    return False


def cmd_stats(recs, idx, a):
    n = len(recs)
    depth = Counter()
    for r in recs:
        depth.update(r["fields"])
    covered = {r["name"] for r in recs}
    out = {
        "records": n,
        "files": len({r["file"] for r in recs}),
        "withFigmaId": sum(1 for r in recs if r["figmaId"]),
        "withCategory": sum(1 for r in recs if r["category"]),
        "categories": dict(Counter(r["category"] for r in recs if r["category"])),
        "highValueDepth": {f: f"{round(depth[f]/n*100)}%" for f in HIGH_VALUE},
    }
    if idx:
        names = {r["name"] for r in idx}
        out["indexComponents"] = len(names)
        out["coverage"] = f"{round(len(covered & names)/len(names)*100,1)}%"
    if emit(out, a.json):
        return
    print(f"Records         {n} across {out['files']} files")
    print(f"With figmaId    {out['withFigmaId']}/{n}")
    print(f"With category   {out['withCategory']}/{n}  {out['categories']}")
    if idx:
        print(f"Index coverage  {out['coverage']}  "
              f"({len(covered & {r['name'] for r in idx})}/{out['indexComponents']})")
    print("Intent depth   ", "  ".join(f"{k}={v}" for k, v in out["highValueDepth"].items()))


def cmd_depth(recs, idx, a):
    n = len(recs)
    depth = Counter()
    for r in recs:
        depth.update(r["fields"])
    rows = [{"field": f, "records": c, "pct": round(c / n * 100)}
            for f, c in depth.most_common() if c > 1]
    if emit(rows, a.json):
        return
    print(f"\nFIELD DEPTH — {n} records\n")
    for r in rows:
        bar = "#" * int(r["pct"] / 4)
        print(f"  {r['field']:<26} {r['records']:>4}  {r['pct']:>3}%  {bar}")
    once = sum(1 for f, c in depth.items() if c == 1)
    print(f"\n  {once} fields appear on exactly one record (page-specific shapes)")


def cmd_find(recs, idx, a):
    q = a.query.lower()
    hits = [r for r in recs if q in r["name"].lower()]
    if emit([{k: r[k] for k in ("name", "figmaId", "category", "file")} for r in hits], a.json):
        return
    for r in hits:
        print(f"  {r['name']:<44} {str(r['category']):<12} {len(r['fields']):>2} fields  {r['file'][:30]}")
    if not hits:
        print(f"no metadata for {a.query!r}")


def cmd_show(recs, idx, a):
    hits = [r for r in recs if r["name"] == a.component] or \
           [r for r in recs if a.component.lower() in r["name"].lower()]
    if not hits:
        raise SystemExit(f"no metadata for {a.component!r}")
    if emit([{k: v for k, v in r.items() if k != "body"} for r in hits], a.json):
        return
    for r in hits[:3]:
        print(f"\n=== {r['name']}  [{r['figmaId']}]  {r['category']} ===")
        print(f"file: {r['file']}   fields: {', '.join(r['fields'])}\n")
        print(r["body"].strip()[:4000])


def cmd_gaps(recs, idx, a):
    usage = {r["name"]: len(r.get("usedBy", [])) for r in idx} if idx else {}
    rows = []
    for r in recs:
        missing = [f for f in HIGH_VALUE if f not in r["fields"]]
        if missing:
            rows.append({"name": r["name"], "usedBy": usage.get(r["name"], 0),
                         "missing": missing})
    rows.sort(key=lambda x: -x["usedBy"])
    if emit(rows, a.json):
        return
    print(f"\nINTENT GAPS — {len(rows)} records missing high-value fields\n")
    print(f"  {'component':<44} {'usedBy':>6}  missing")
    for r in rows[:30]:
        print(f"  {r['name']:<44} {r['usedBy']:>6}  {', '.join(r['missing'])}")
    if len(rows) > 30:
        print(f"  … {len(rows)-30} more")


def cmd_uncovered(recs, idx, a):
    if not idx:
        raise SystemExit("index not found — pass --index")
    covered = {r["name"] for r in recs}
    rows = [{"name": r["name"], "usedBy": len(r.get("usedBy", [])), "page": r.get("page")}
            for r in idx if r["name"] not in covered]
    rows.sort(key=lambda x: -x["usedBy"])
    if emit(rows, a.json):
        return
    print(f"\nUNCOVERED — {len(rows)} indexed components with no metadata\n")
    for r in rows[:30]:
        print(f"  {r['name']:<44} usedBy={r['usedBy']:<4} {r['page']}")
    if len(rows) > 30:
        print(f"  … {len(rows)-30} more")


COMMANDS = {"stats": cmd_stats, "depth": cmd_depth, "find": cmd_find,
            "show": cmd_show, "gaps": cmd_gaps, "uncovered": cmd_uncovered}


def main():
    ap = argparse.ArgumentParser(description="Metadata query — Tawuniya DLS Layer 2")
    ap.add_argument("--dir", default=DEFAULT_DIR)
    ap.add_argument("--index", default=DEFAULT_IDX)
    ap.add_argument("--json", action="store_true")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("stats"); sub.add_parser("depth")
    p = sub.add_parser("find"); p.add_argument("query")
    p = sub.add_parser("show"); p.add_argument("component")
    sub.add_parser("gaps"); sub.add_parser("uncovered")
    a = ap.parse_args()
    recs = parse_dir(a.dir)
    if not recs:
        raise SystemExit(f"no metadata found in {a.dir}")
    idx = load_index(a.index)
    COMMANDS[a.cmd](recs, idx, a)


if __name__ == "__main__":
    main()
