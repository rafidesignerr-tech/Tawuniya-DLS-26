# skills/ — Invocable Capabilities

> Each skill states its layer and its required inputs. See [`../CLAUDE.md`](../CLAUDE.md) for when to invoke which.

| Skill | Layer | Does | Input |
|---|---|---|---|
| [`figma-variables-generator/`](figma-variables-generator/SKILL.md) | [1](../layers/01-tokens.md) | Authors Figma variable JSON from token descriptions | Token descriptions or existing JSON |
| [`ai-component-metadata/`](ai-component-metadata/SKILL.md) | [2](../layers/02-metadata.md) | Generates component metadata records | A component + human intent |
| [`tawuniya-dls-codebase-index.skill.md`](tawuniya-dls-codebase-index.skill.md) | [3](../layers/03-indexing.md) | Generates the relationship index | A code repository |
| [`tawuniya-dls-arc.skill.md`](tawuniya-dls-arc.skill.md) | [4](../layers/04-orchestration.md) | Runs Audit → Report → Compose | [The index](../index/README.md) |

**Authored, not generated.** Edit these by hand.

The two bundled skills (`figma-variables-generator`, `ai-component-metadata`) are by Cris Achiardi — see each `SKILL.md` for licence and origin. The two `tawuniya-dls-*` skills are adapted to this system and carry their scripts inline.

---

*[← README](../README.md)*
