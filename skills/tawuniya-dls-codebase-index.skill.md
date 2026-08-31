---
name: tawuniya-dls-codebase-index
version: 1.2.0
description: Generate the Tawuniya Design System's Layer 3 index — a deterministic, queryable map of component inventory, relationship graph (uses/usedBy with instance counts), dependencies, and metadata coverage. Framework-agnostic auto-detection (React, Next.js, Vue, Svelte, Astro, Angular, Solid). Emits TOON (30–60% token savings) or JSON. Use when indexing the DLS, mapping component relationships, auditing metadata coverage, tracing impact before a breaking change, or onboarding an agent to the codebase.
layer: 3
system: Tawuniya Design System (Tawuniya DLS)
---

# Tawuniya DLS — Codebase Index (Layer 3)

Generates the machine-readable map that Layer 4 queries and the ARC *Audit* phase depend on.

> **Layer 2** tells an agent *how to use* a component.
> **Layer 3** tells it *where that component lives, what it touches, and what breaks if it changes.*

---

## Why This Skill Exists

An agent without an index does not know the system — it explores it. Exploration is non-deterministic: the same repo, asked the same question twice, returns different component counts. Every governance question built on top of that answer inherits the error.

This skill replaces exploration with lookup.

| Agent question | Without index | With index |
|---|---|---|
| How many components do we have? | a guess that varies per run | one number, from the inventory |
| Which screens use `Button`? | the ones it happened to open | complete `usedBy`, traced recursively |
| Safe to change `Tooltip`'s API? | unknowable | exact blast radius |
| What's our metadata coverage? | manual audit | a computed statistic |
| Any duplicate components? | invisible | visible against a full inventory |

---

## What It Generates

Three required parts. Two out of three is a broken index.

**1 · Component inventory** — every component once: `name`, `path`, `type`, `hasMetadata`
**2 · Relationship graph** — `uses` (what it renders) and `usedBy` (what renders it), plus per-child `instances` counts
**3 · Summary statistics** — totals per category, metadata coverage %, relationship density, orphans, top hubs

Plus: npm dependency usage, shared utilities, CSS design tokens, and data-flow query patterns.

### Bidirectionality is not redundancy

`uses` answers the **composition** question. `usedBy` answers the **blast-radius** question. An index carrying only one direction answers only half of governance.

---

## Quick Start

```bash
# Auto-detect framework, emit TOON into <src>/.ai/
python scripts/index_codebase.py /path/to/tawuniya-dls

# Force framework and format
python scripts/index_codebase.py /path/to/tawuniya-dls --framework react --format json

# Both formats — TOON for agents, JSON for tooling
python scripts/index_codebase.py /path/to/tawuniya-dls --both

# Tab delimiter — often tokenizes tighter than commas
python scripts/index_codebase.py /path/to/tawuniya-dls --delimiter "\t"
```

---

## Framework Auto-Detection

Read from `package.json`. Order matters — `next` is checked before `react`, since Next projects also depend on React.

| Dependency | Framework | Extensions |
|---|---|---|
| `astro` | Astro | `.astro` |
| `next` | Next.js | `.jsx`, `.tsx` |
| `react` | React | `.jsx`, `.tsx` |
| `vue` | Vue | `.vue` |
| `svelte` | Svelte | `.svelte` |
| `@angular/core` | Angular | `.ts` |
| `solid-js` | Solid | `.jsx`, `.tsx` |

Override with `--framework` when detection is wrong (monorepos, unusual setups).

---

## Component Type Classification

Derived from the directory path:

| Path contains | Type |
|---|---|
| `/atoms/` | atom |
| `/molecules/` | molecule |
| `/organisms/` | organism |
| `/templates/` | template |
| `/ui/` | ui |
| `/layouts/`, `/layout/` | layout |
| `/pages/`, `/views/`, `/routes/`, `/screens/` | page |
| `/hooks/` | hook |
| `/contexts/`, `/context/`, `/providers/` | context |
| anything else | component |

---

## Output Layout

```
src/.ai/
├── index.toon                       ← entry point: meta + statistics
└── relationships/
    ├── component-usage.toon         ← inventory + relationship graph
    ├── dependencies.toon            ← npm, utilities, CSS tokens
    └── data-flow.toon               ← fetch / axios / CMS query patterns
```

`index.toon` is read **first**, always. It carries the shape of the system and the statistics; the agent then opens only the relationship file the task requires. That is a token-budget decision, not an organisational one.

---

## Why TOON

Format is an engineering decision here, not a stylistic one — the reader is a machine with a finite context budget.

**JSON — keys repeat on every record:**
```json
{
  "Button": {
    "path": "src/components/atoms/Button.tsx",
    "type": "atom",
    "uses": [],
    "usedBy": ["Card", "Header", "Footer"]
  }
}
```

**TOON — keys declared once:**
```toon
components[3]{name,path,type,hasMetadata,uses,usedBy,instances}:
Button,src/components/atoms/Button.tsx,atom,yes,[0]:,[3]: Card,Header,Footer,[0]:
Card,src/components/molecules/Card.tsx,molecule,no,[1]: Button,[1]: Page,[1]: Button:2
Footer,src/components/organisms/Footer.tsx,organism,no,[2]: Button,Icon,[0]:,[2]: Button:1,Icon:3
```

| Aspect | TOON | JSON |
|---|---|---|
| Token count | **30–60% smaller** | baseline |
| LLM retrieval accuracy | **70.1%** | 65.4% |
| Human readable | yes | yes |
| Tooling compatibility | new format | universal |
| Best for | agent context | build tooling |

Two properties matter beyond compression:

1. **Explicit lengths.** `components[42]{...}` declares the row count up front, so a truncated read is *detectable* rather than silent — the exact failure that produces "43 of 55."
2. **Uniform shape.** Component records are structurally identical, which is precisely the case tabular encoding is built for.

**Rule for Tawuniya DLS:** TOON for agents, JSON when CI or a build tool must parse it. `--both` is cheap.

### TOON syntax reference

```toon
name: Button                        # primitive
user:                               # nested object
  id: 123
tags[3]: react,typescript,ui        # primitive array
items[2]{id,name,price}:            # tabular array (uniform objects)
1,Widget,9.99
2,Gadget,14.50
```

---

## The Three Things Teams Skip

An index that stops at "components + direct imports" is a phone book.

### 1 · Deep tracing (recursive resolution)
*"Which atoms appear on the Motor Insurance quote screen?"*

The screen imports organisms; organisms import molecules; molecules import atoms. A one-level lookup answers **wrongly** — it returns organisms and stops. Correct resolution walks the graph to its leaves, tracking visited nodes so cycles terminate.

### 2 · Instance counting (imports ≠ usage)
`Button` imported into a file **once** may be rendered **five times**.

- **Import count** → *adoption*: how many files depend on this?
- **Instance count** → *load*: how heavily is it actually used?

A component imported by 3 files but instantiated 40 times is a critical dependency wearing a small hat. Conflating the two systematically underweights the busiest components — the ones whose APIs deserve the most caution. The `instances` column carries this.

### 3 · Query protocols
The index is data. A query protocol is the written instruction set that makes reading it reproducible:

> **Impact of a change to component `X`:**
> 1. Read `relationships/component-usage.toon`
> 2. Find the row where `name == X`
> 3. Collect `usedBy`
> 4. For each entry, repeat 2–3 until `usedBy` is empty
> 5. Return the accumulated set where `type == page`

Without the protocol, two agents given the same index take two different traversals. The protocol is what makes the answer reproducible — which is the entire point. **This is the bridge from Layer 3 into Layer 4.**

---

## Relationship to Layer 2 Metadata

Complementary. Never overlapping.

| | **Component Metadata** (Layer 2) | **Codebase Index** (Layer 3) |
|---|---|---|
| Question | *How do I USE this?* | *WHERE is this used?* |
| Contains | props, variants, do/don't, a11y, intent | paths, `uses`/`usedBy`, instances, statistics |
| Authored | **manually** — human design intent | **auto-generated** — parsed from code |
| Update trigger | a design decision changes | any commit |
| Source of truth | the design team | the repository |
| Staleness risk | high — needs discipline | low — regenerated by CI |

**Never hand-write relationship data into a metadata file.** Anything derivable from code is generated; anything representing human intent is written. The two meet at the `hasMetadata` flag — the index reports Layer 2 coverage, which is how the layers audit each other.

---

## Generation Pipeline

```
1. DETECT     package.json → framework
2. DISCOVER   walk source dirs → component files
3. CLASSIFY   path pattern → component type
4. PARSE      extract static + dynamic imports, require()
5. RESOLVE    tsconfig/jsconfig path aliases → real paths
6. GRAPH      build uses / usedBy; count JSX instances
7. AUDIT      check for sibling .metadata.json
8. COMPUTE    statistics + coverage + hubs + orphans
9. EMIT       TOON (and/or JSON)
```

Path-alias resolution (step 5) is the step most implementations skip, and it is where relationships silently go missing in a real codebase.

---

## Keeping It Alive

An index generated once is worse than none: it is a **confident wrong answer**. Regeneration is automatic or it does not count.

**Git hook:**
```bash
# .husky/post-merge
#!/bin/sh
python scripts/index_codebase.py . --format toon
git add src/.ai/
```

**CI:**
```yaml
name: Update Codebase Index
on:
  push:
    branches: [main]
jobs:
  index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: python scripts/index_codebase.py . --format toon
      - run: |
          git add src/.ai/
          git commit -m "chore: update codebase index" || true
          git push
```

Cost: 1–5s for 50–200 components; 10–30s beyond 500. Output 30–150 KB in TOON. There is no reason not to run it on every merge.

---

## Reading the Index (for agents)

1. **`index.toon`** — always first. Shape of the system + statistics.
2. **`relationships/component-usage.toon`** — inventory and graph.
3. **`relationships/dependencies.toon`** — packages, utilities, tokens.
4. **`relationships/data-flow.toon`** — where data enters.

Check the declared row count (`components[N]`) against the rows received. A mismatch means truncation — re-read before answering, never estimate.

---

## Verification Checklist

Run this the first time, and after any change to the generator.

- [ ] Component count verified **by hand** against the real library — no silent misses
- [ ] `uses` / `usedBy` spot-checked on a three-level chain (e.g. `ThoughtCard → CopyButton → Tooltip`)
- [ ] Instance counts differ from import counts where they should
- [ ] Path aliases (`@/components/...`) resolve — no orphaned relationships
- [ ] `hasMetadata` reflects actual Layer 2 file presence
- [ ] Statistics include coverage percentage
- [ ] TOON row counts match actual rows
- [ ] Output committed under `src/.ai/`

---

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| No components found | source dirs missing, or extensions don't match the detected framework |
| Wrong framework | pass `--framework`; check `package.json` |
| Relationships missing | path aliases unresolved — verify `tsconfig.json` `paths`; dynamic imports with computed specifiers cannot be detected |
| Utilities empty | no `lib/`, `utils/`, or `helpers/` directory; `.d.ts` files are skipped by design |
| Duplicate names collapsed | same filename in two folders — the indexer disambiguates as `parentDir/Name` |
| TOON "parse errors" | TOON is for agent consumption; use `--format json` for tooling |

---

## Tawuniya DLS Adoption Sequence

| Step | Action | Outcome |
|---|---|---|
| 1 | Run the indexer on the DLS repo | Baseline inventory + true component count |
| 2 | Read the statistics block | Metadata coverage baseline established |
| 3 | Commit `src/.ai/` | Index becomes reviewable in PRs |
| 4 | Add the CI job | Index can no longer go stale |
| 5 | Write Tawuniya query protocols | Deterministic, repeatable agent answers |
| 6 | Feed statistics into ARC *Audit* | Layer 3 becomes the input to governance |

### What it unlocks for us specifically

**Governance** — coverage becomes a tracked number, not a manual audit.
**Impact analysis** — the full recursive set of affected screens before touching a shared atom.
**Onboarding** — one entry point instead of a week of discovery.
**Duplicate detection** — near-identical names with non-overlapping `usedBy` are the signature.
**Bilingual surface** — deep tracing identifies exactly which atoms carry RTL responsibility for Arabic screens.
**Deprecation with a finish line** — N usages, tracked to zero, verified by regeneration.

---

## The Economics

Layer 3 costs real effort up front: writing the generator, resolving aliases, wiring CI, verifying the first output by hand.

What it buys is an **accuracy premium that compounds**. Every agent interaction afterwards starts from a complete, deterministic picture. The alternative is not "no cost" — it is the slow accumulation of decisions made against incomplete information: the duplicate nobody knew existed, the breaking change nobody traced, the deprecation that never finished.

That debt has an unusual property: **it grows faster the more you use AI on the codebase.** Indexing inverts the curve.

---

## Credits

- **TOON format** — [toon-format/toon](https://github.com/toon-format/toon)
- **Concept** — *Codebase indexing for design system agents*, Cristian Morales Achiardi, Design Systems Collective
- **Companion doc** — `layer-3-codebase-indexing.md` (the Layer 3 concept)

---

# Bundled Script

Save the block below as `scripts/index_codebase.py` next to this skill. Requires Python 3.8+, no third-party packages.

```bash
mkdir -p scripts
# paste the block below into scripts/index_codebase.py
chmod +x scripts/index_codebase.py
python scripts/index_codebase.py /path/to/tawuniya-dls --both
```

<!-- BEGIN scripts/index_codebase.py -->
```python
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
```
<!-- END scripts/index_codebase.py -->

---

*Tawuniya Design System · Agentic Infrastructure · Layer 3 — Indexing / Mapping*
