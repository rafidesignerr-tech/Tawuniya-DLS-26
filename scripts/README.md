# scripts/ — Query Engines

> Python 3.8+, no third-party dependencies. **Every query must be deterministic**: same input, same answer, every time.

| Script | Layer | Purpose |
|---|---|---|
| [`token_query.py`](token_query.py) | [1](../layers/01-tokens.md) | Query and audit [`../tokens/tokens.json`](../tokens/tokens.json) |
| [`metadata_query.py`](metadata_query.py) | [2](../layers/02-metadata.md) | Coverage, field depth and gaps in [`../metadata/`](../metadata/README.md) |
| [`arc_query.py`](arc_query.py) | [3](../layers/03-indexing.md) + [4](../layers/04-orchestration.md) | The ARC Audit engine — components, tokens, legacy bindings, [gaps](../audit/README.md) |
| [`index_codebase.py`](index_codebase.py) | [3](../layers/03-indexing.md) | Generate an index from a **code** repository |

## Usage

```bash
# Layer 1
python scripts/token_query.py stats | audit | orphans | modes
python scripts/token_query.py find "button"
python scripts/token_query.py show "background/primary"
python scripts/token_query.py aliases "colors/grey/50"

# Layer 3 / 4
IDX=index/relationships/component-usage.toon
python scripts/arc_query.py --index $IDX stats
python scripts/arc_query.py --index $IDX impact "Mobile/Button"
python scripts/arc_query.py --index $IDX trace "Mobile/Accordion" --category atom
python scripts/arc_query.py --index $IDX similar "copy to clipboard"
python scripts/arc_query.py --index $IDX orphans | duplicates | hubs

# Layer 3 — generate an index from code
python scripts/index_codebase.py /path/to/repo --both
```

Add `--json` to any query for machine-readable output.

## The Figma extractor

The index is produced by walking the Figma document through the **plugin API** (`figma.root` → pages → `findAllWithCriteria` → recursive `boundVariables`), not the REST API — so it carries no Enterprise requirement and no expiring token.

That extraction is currently run as an ad-hoc plugin script rather than a committed file. Committing it is the remaining gap: until it lives here, regeneration depends on someone re-deriving it.

---

*[← README](../README.md)*
