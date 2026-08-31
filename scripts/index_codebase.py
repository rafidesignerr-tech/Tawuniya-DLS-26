#!/usr/bin/env python3
"""
Codebase Index — Tawuniya DLS Layer 3
=====================================
Framework-agnostic component relationship & dependency indexer.

Generates a queryable map of a component-based codebase:
  - Component inventory (name, path, type, metadata status)
  - Relationship graph (uses / usedBy, with instance counts)
  - NPM dependencies, utilities, CSS tokens
  - Data-flow queries (fetch/axios/CMS patterns)
  - Summary statistics (counts, metadata coverage, relationship density)

Output: TOON (default, token-efficient) or JSON (tooling-compatible).

Usage:
    python index_codebase.py /path/to/project
    python index_codebase.py /path/to/project --framework react --format json
    python index_codebase.py /path/to/project --delimiter "\t"
    python index_codebase.py /path/to/project --both
"""

import argparse
import json
import os
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

VERSION = "1.2.0"

# ---------------------------------------------------------------- framework --

FRAMEWORKS = {
    "astro":   {"dep": "astro",          "ext": [".astro"]},
    "next":    {"dep": "next",           "ext": [".jsx", ".tsx"]},
    "react":   {"dep": "react",          "ext": [".jsx", ".tsx"]},
    "vue":     {"dep": "vue",            "ext": [".vue"]},
    "svelte":  {"dep": "svelte",         "ext": [".svelte"]},
    "angular": {"dep": "@angular/core",  "ext": [".ts"]},
    "solid":   {"dep": "solid-js",       "ext": [".jsx", ".tsx"]},
}

# Order matters: next before react, since Next projects also depend on react.
DETECT_ORDER = ["astro", "next", "nuxt", "svelte", "angular", "solid", "vue", "react"]

TYPE_PATTERNS = [
    ("/atoms/",     "atom"),
    ("/molecules/", "molecule"),
    ("/organisms/", "organism"),
    ("/templates/", "template"),
    ("/ui/",        "ui"),
    ("/layouts/",   "layout"),
    ("/layout/",    "layout"),
    ("/pages/",     "page"),
    ("/views/",     "page"),
    ("/routes/",    "page"),
    ("/screens/",   "page"),
    ("/hooks/",     "hook"),
    ("/contexts/",  "context"),
    ("/context/",   "context"),
    ("/providers/", "context"),
]

EXCLUDE_DIRS = {
    "node_modules", ".git", "dist", "build", ".next", ".nuxt", "out",
    ".astro", "coverage", ".turbo", ".cache", "storybook-static",
    "__snapshots__", ".svelte-kit", "vendor", ".venv", "venv",
}

SOURCE_DIR_CANDIDATES = ["src", "app", "components", "lib", "packages", "."]

IMPORT_RE = re.compile(
    r"""import\s+(?:type\s+)?(?:(?P<clause>[\w{},\s*]+?)\s+from\s+)?['"](?P<path>[^'"]+)['"]""",
    re.MULTILINE,
)
DYNAMIC_IMPORT_RE = re.compile(r"""import\(\s*['"](?P<path>[^'"]+)['"]\s*\)""")
REQUIRE_RE = re.compile(r"""require\(\s*['"](?P<path>[^'"]+)['"]\s*\)""")
QUERY_RE = re.compile(
    r"""(?P<kind>client\.fetch|sanityClient\.fetch|fetch|axios\.(?:get|post|put|delete)|"""
    r"""http\.(?:get|post|put|delete)|useQuery|useSWR|graphql)\s*[\(<]""",
)
CSS_VAR_RE = re.compile(r"--([a-zA-Z0-9-_]+)\s*:")
CLASS_RE = re.compile(r"\.([a-zA-Z][a-zA-Z0-9_-]*)\s*[,{]")


def log(msg):
    print(msg, file=sys.stderr)


# ------------------------------------------------------------------ helpers --

def detect_framework(root: Path, override=None):
    if override:
        return override
    pkg_path = root / "package.json"
    if not pkg_path.exists():
        return "react"  # safe default for component libraries
    try:
        pkg = json.loads(pkg_path.read_text(encoding="utf-8"))
    except Exception:
        return "react"
    deps = {}
    for key in ("dependencies", "devDependencies", "peerDependencies"):
        deps.update(pkg.get(key) or {})
    for name in DETECT_ORDER:
        spec = FRAMEWORKS.get(name)
        if spec and spec["dep"] in deps:
            return name
    return "react"


def extensions_for(framework):
    return FRAMEWORKS.get(framework, FRAMEWORKS["react"])["ext"]


def classify(rel_path: str) -> str:
    p = "/" + rel_path.replace(os.sep, "/").lstrip("/")
    low = p.lower()
    for pattern, kind in TYPE_PATTERNS:
        if pattern in low:
            return kind
    return "component"


def component_name(path: Path) -> str:
    stem = path.stem
    # Foo.component.ts (Angular) -> Foo ; index.tsx -> parent dir name
    stem = re.sub(r"\.(component|module|service)$", "", stem)
    if stem.lower() in ("index", "+page", "+layout"):
        return path.parent.name
    return stem


def source_dirs(root: Path):
    found = []
    for cand in SOURCE_DIR_CANDIDATES:
        d = root / cand if cand != "." else root
        if d.is_dir():
            found.append(d)
            if cand != ".":
                break
    if not found:
        found = [root]
    return found


def walk_files(root: Path, exts):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith(".")]
        for fn in filenames:
            if fn.endswith(".d.ts"):
                continue
            if any(fn.endswith(e) for e in exts):
                yield Path(dirpath) / fn


def load_aliases(root: Path):
    """Read path aliases from tsconfig/jsconfig so imports resolve correctly."""
    aliases = {}
    for name in ("tsconfig.json", "jsconfig.json"):
        cfg = root / name
        if not cfg.exists():
            continue
        try:
            raw = cfg.read_text(encoding="utf-8")
            raw = re.sub(r"//.*?$", "", raw, flags=re.MULTILINE)
            raw = re.sub(r"/\*.*?\*/", "", raw, flags=re.DOTALL)
            raw = re.sub(r",(\s*[}\]])", r"\1", raw)
            data = json.loads(raw)
        except Exception:
            continue
        opts = data.get("compilerOptions") or {}
        base = opts.get("baseUrl") or "."
        for key, targets in (opts.get("paths") or {}).items():
            if targets:
                aliases[key.rstrip("*").rstrip("/")] = str(
                    (root / base / targets[0].rstrip("*").rstrip("/")).resolve()
                )
    return aliases


# -------------------------------------------------------------------- scan --

def scan(root: Path, framework: str):
    exts = extensions_for(framework)
    aliases = load_aliases(root)
    dirs = source_dirs(root)

    components = {}        # name -> record
    by_resolved = {}       # resolved abs path (no ext) -> name
    raw_imports = {}       # name -> list of import specifiers
    npm_deps = defaultdict(set)
    utilities = defaultdict(set)
    queries = []
    css_tokens = set()
    css_classes = set()
    errors = []

    files = []
    for d in dirs:
        files.extend(walk_files(d, exts))
    files = sorted(set(files))

    # pass 1 — inventory
    for f in files:
        try:
            rel = str(f.relative_to(root))
        except ValueError:
            rel = str(f)
        name = component_name(f)
        if name in components:
            # disambiguate by parent folder
            name = f"{f.parent.name}/{name}"
        meta_exists = (
            f.with_suffix(".metadata.json").exists()
            or (f.parent / f"{f.stem}.metadata.json").exists()
        )
        components[name] = {
            "name": name,
            "path": rel.replace(os.sep, "/"),
            "type": classify(rel),
            "framework": framework,
            "hasMetadata": meta_exists,
            "uses": [],
            "usedBy": [],
            "instances": {},
        }
        by_resolved[str(f.resolve().with_suffix(""))] = name
        by_resolved[str((f.parent / f.stem).resolve())] = name
        if f.stem in ("index", "+page", "+layout"):
            by_resolved[str(f.parent.resolve())] = name

    # pass 2 — parse
    for f in files:
        try:
            rel = str(f.relative_to(root))
        except ValueError:
            rel = str(f)
        name = component_name(f)
        if name not in components:
            candidates = [k for k, v in components.items() if v["path"] == rel.replace(os.sep, "/")]
            if not candidates:
                continue
            name = candidates[0]
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception as e:
            errors.append(f"{rel}: {e}")
            continue

        specs = []
        for m in IMPORT_RE.finditer(text):
            specs.append(m.group("path"))
        for m in DYNAMIC_IMPORT_RE.finditer(text):
            specs.append(m.group("path"))
        for m in REQUIRE_RE.finditer(text):
            specs.append(m.group("path"))
        raw_imports[name] = specs

        for spec in specs:
            if spec.startswith("."):
                continue
            resolved_alias = None
            for a in aliases:
                if spec == a or spec.startswith(a + "/"):
                    resolved_alias = a
                    break
            if resolved_alias:
                continue
            pkg = "/".join(spec.split("/")[:2]) if spec.startswith("@") else spec.split("/")[0]
            npm_deps[pkg].add(name)

        for m in QUERY_RE.finditer(text):
            queries.append({"component": name, "kind": m.group("kind"), "path": rel.replace(os.sep, "/")})

    # pass 3 — resolve local imports into the relationship graph
    for name, specs in raw_imports.items():
        src = root / components[name]["path"]
        for spec in specs:
            target_path = None
            if spec.startswith("."):
                target_path = (src.parent / spec).resolve()
            else:
                for a, real in aliases.items():
                    if spec == a:
                        target_path = Path(real)
                        break
                    if spec.startswith(a + "/"):
                        target_path = Path(real) / spec[len(a) + 1:]
                        break
            if target_path is None:
                continue
            key = str(target_path.with_suffix("")) if target_path.suffix else str(target_path)
            target = by_resolved.get(key) or by_resolved.get(str(target_path))
            if target and target != name:
                if target not in components[name]["uses"]:
                    components[name]["uses"].append(target)
                if name not in components[target]["usedBy"]:
                    components[target]["usedBy"].append(name)

    # pass 4 — instance counts (rendered occurrences, not imports)
    for name, rec in components.items():
        if not rec["uses"]:
            continue
        f = root / rec["path"]
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        for child in rec["uses"]:
            short = child.split("/")[-1]
            count = len(re.findall(rf"<\s*{re.escape(short)}\b", text))
            if count:
                rec["instances"][child] = count

    # utilities + css
    for d in dirs:
        for sub in ("lib", "utils", "helpers", "utilities"):
            u = d / sub
            if not u.is_dir():
                continue
            for f in walk_files(u, [".ts", ".js", ".tsx", ".jsx"]):
                try:
                    rel = str(f.relative_to(root)).replace(os.sep, "/")
                except ValueError:
                    continue
                utilities[f.stem].add(rel)
        for f in walk_files(d, [".css", ".scss"]):
            try:
                text = f.read_text(encoding="utf-8", errors="ignore")
            except Exception:
                continue
            css_tokens.update(CSS_VAR_RE.findall(text))
            css_classes.update(CLASS_RE.findall(text))

    for rec in components.values():
        rec["uses"].sort()
        rec["usedBy"].sort()

    return {
        "components": components,
        "npm": {k: sorted(v) for k, v in npm_deps.items()},
        "utilities": {k: sorted(v) for k, v in utilities.items()},
        "queries": queries,
        "cssTokens": sorted(css_tokens),
        "cssClasses": sorted(css_classes),
        "errors": errors,
    }


def statistics(data):
    comps = data["components"]
    total = len(comps)
    by_type = defaultdict(int)
    for c in comps.values():
        by_type[c["type"]] += 1
    edges = sum(len(c["uses"]) for c in comps.values())
    with_meta = sum(1 for c in comps.values() if c["hasMetadata"])
    orphans = [n for n, c in comps.items() if not c["usedBy"] and c["type"] not in ("page", "layout")]
    hubs = sorted(comps.values(), key=lambda c: len(c["usedBy"]), reverse=True)[:5]
    return {
        "totalComponents": total,
        "byType": dict(sorted(by_type.items())),
        "totalRelationships": edges,
        "relationshipDensity": round(edges / total, 2) if total else 0,
        "withMetadata": with_meta,
        "metadataCoverage": f"{round(with_meta / total * 100, 1)}%" if total else "0%",
        "orphanComponents": len(orphans),
        "topHubs": [f"{h['name']}({len(h['usedBy'])})" for h in hubs if h["usedBy"]],
        "npmPackages": len(data["npm"]),
        "utilities": len(data["utilities"]),
        "dataQueries": len(data["queries"]),
        "cssTokens": len(data["cssTokens"]),
    }


# -------------------------------------------------------------------- TOON --

def esc(v, d):
    s = "" if v is None else str(v)
    if d in s or "\n" in s:
        s = '"' + s.replace('"', '\\"').replace("\n", " ") + '"'
    return s


def toon_array(values, d=","):
    if not values:
        return "[0]:"
    return f"[{len(values)}]: " + d.join(esc(v, d) for v in values)


def toon_kv(obj, indent=0):
    pad = "  " * indent
    out = []
    for k, v in obj.items():
        if isinstance(v, dict):
            out.append(f"{pad}{k}:")
            out.append(toon_kv(v, indent + 1))
        elif isinstance(v, list):
            out.append(f"{pad}{k}{toon_array(v)}")
        else:
            out.append(f"{pad}{k}: {v}")
    return "\n".join(out)


def toon_table(name, rows, fields, d=","):
    head = f"{name}[{len(rows)}]{{{d.join(fields)}}}:"
    lines = [head]
    for r in rows:
        cells = []
        for f in fields:
            v = r.get(f)
            cells.append(toon_array(v, d) if isinstance(v, list) else esc(v, d))
        lines.append(d.join(cells))
    return "\n".join(lines)


# ------------------------------------------------------------------- emit --

def emit(root: Path, data, stats, framework, fmt, delim, out_dir: Path):
    (out_dir / "relationships").mkdir(parents=True, exist_ok=True)
    comps = data["components"]
    rows = []
    for c in sorted(comps.values(), key=lambda x: (x["type"], x["name"])):
        rows.append({
            "name": c["name"],
            "path": c["path"],
            "type": c["type"],
            "hasMetadata": "yes" if c["hasMetadata"] else "no",
            "uses": c["uses"],
            "usedBy": c["usedBy"],
            "instances": [f"{k}:{v}" for k, v in sorted(c["instances"].items())],
        })

    meta = {
        "generator": "codebase-index",
        "version": VERSION,
        "framework": framework,
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "root": str(root),
    }

    written = []

    if fmt in ("toon", "both"):
        cu = (
            "# Tawuniya DLS — Component Inventory & Relationship Graph\n"
            "# uses = renders these | usedBy = rendered by these | instances = render count\n\n"
            + toon_table("components", rows,
                         ["name", "path", "type", "hasMetadata", "uses", "usedBy", "instances"], delim)
        )
        p = out_dir / "relationships" / "component-usage.toon"
        p.write_text(cu + "\n", encoding="utf-8"); written.append(p)

        dep_rows = [{"package": k, "usedBy": v} for k, v in sorted(data["npm"].items())]
        util_rows = [{"utility": k, "paths": v} for k, v in sorted(data["utilities"].items())]
        deps = (
            "# Tawuniya DLS — Dependencies\n\n"
            + toon_table("npmPackages", dep_rows, ["package", "usedBy"], delim)
            + "\n\n"
            + toon_table("utilities", util_rows, ["utility", "paths"], delim)
            + "\n\ncssTokens" + toon_array(data["cssTokens"], delim)
            + "\ncssClasses" + toon_array(data["cssClasses"][:200], delim)
        )
        p = out_dir / "relationships" / "dependencies.toon"
        p.write_text(deps + "\n", encoding="utf-8"); written.append(p)

        df = ("# Tawuniya DLS — Data Flow\n\n"
              + toon_table("queries", data["queries"], ["component", "kind", "path"], delim))
        p = out_dir / "relationships" / "data-flow.toon"
        p.write_text(df + "\n", encoding="utf-8"); written.append(p)

        idx = ("# Tawuniya DLS — Codebase Index (entry point)\n"
               "# Read this first, then open only the relationship file you need.\n\n"
               + toon_kv(meta) + "\n\nstatistics:\n" + toon_kv(stats, 1)
               + "\n\nfiles:\n  componentUsage: relationships/component-usage.toon"
                 "\n  dependencies: relationships/dependencies.toon"
                 "\n  dataFlow: relationships/data-flow.toon")
        p = out_dir / "index.toon"
        p.write_text(idx + "\n", encoding="utf-8"); written.append(p)

    if fmt in ("json", "both"):
        payload = {"meta": meta, "statistics": stats,
                   "components": {c["name"]: c for c in comps.values()}}
        p = out_dir / "index.json"
        p.write_text(json.dumps(payload, indent=2), encoding="utf-8"); written.append(p)
        p = out_dir / "relationships" / "dependencies.json"
        p.write_text(json.dumps({"npm": data["npm"], "utilities": data["utilities"],
                                 "cssTokens": data["cssTokens"]}, indent=2), encoding="utf-8")
        written.append(p)
        p = out_dir / "relationships" / "data-flow.json"
        p.write_text(json.dumps(data["queries"], indent=2), encoding="utf-8"); written.append(p)

    return written


# -------------------------------------------------------------------- main --

def main():
    ap = argparse.ArgumentParser(description="Generate a codebase index (Tawuniya DLS Layer 3)")
    ap.add_argument("project", help="Path to the project root")
    ap.add_argument("--framework", choices=list(FRAMEWORKS) + ["nuxt"], help="Override auto-detection")
    ap.add_argument("--format", choices=["toon", "json", "both"], default="toon")
    ap.add_argument("--both", action="store_true", help="Shorthand for --format both")
    ap.add_argument("--delimiter", default=",")
    ap.add_argument("--out", help="Output directory (default: <src>/.ai)")
    args = ap.parse_args()

    root = Path(args.project).expanduser().resolve()
    if not root.is_dir():
        log(f"error: not a directory: {root}"); sys.exit(1)

    fmt = "both" if args.both else args.format
    delim = args.delimiter.replace("\\t", "\t")

    framework = detect_framework(root, args.framework)
    log(f"Scanning {framework} codebase at {root} ...")

    data = scan(root, framework)
    stats = statistics(data)

    out_dir = Path(args.out).resolve() if args.out else (source_dirs(root)[0] / ".ai")
    written = emit(root, data, stats, framework, fmt, delim, out_dir)

    log("")
    log(f"  Framework: {framework}")
    log(f"  Format:    {fmt.upper()}")
    log(f"  {stats['totalComponents']} components indexed")
    log(f"  {stats['totalRelationships']} relationships mapped  (density {stats['relationshipDensity']})")
    log(f"  Metadata coverage: {stats['metadataCoverage']} ({stats['withMetadata']}/{stats['totalComponents']})")
    log(f"  {stats['npmPackages']} npm packages · {stats['utilities']} utilities · {stats['dataQueries']} queries")
    if stats["topHubs"]:
        log(f"  Top hubs: {', '.join(stats['topHubs'])}")
    if data["errors"]:
        log(f"  {len(data['errors'])} files skipped")
    log("")
    for p in written:
        log(f"  wrote {p}")

    print(json.dumps({"statistics": stats, "outputDir": str(out_dir)}, indent=2))


if __name__ == "__main__":
    main()
