# Intent-Driven Context

> **Used by:** [Layer 2 — Metadata](../layers/02-metadata.md) · **Informs:** [CLAUDE.md router](../CLAUDE.md)
> **Related:** [Agentic Design Systems](agentic-design-systems.md) · [ARC](arc-protocol.md)

---

## The Volume Paradox

The instinct when an agent produces poor output is to give it more documentation. It doesn't work, and often makes things worse.

The variable is not volume — it is **classification**. Undifferentiated context makes a hard constraint and a stylistic preference look identical, so the agent weights them identically. Four thousand words of flat documentation is not four thousand words of guidance; it is four thousand words the agent must first sort, badly, on its own.

> The question is not *how much context* an agent gets.
> It is *what kind*, and *when*.

---

## Four Categories

Every piece of context an agent receives is one of these. Classifying it decides how it should be delivered.

### 1 · Constraints — must obey
Rules where violation is a defect. Non-negotiable, and ideally machine-checkable.

*Tawuniya examples:* every component must support RTL. Colour values must come from [tokens](../layers/01-tokens.md), never raw hex. Touch targets meet the minimum size. Semantic tokens must alias a primitive.

**Delivery:** enforced, not suggested. A linter, a schema, a CI check. If it can only be stated in prose, it is probably a guideline wearing a constraint's clothes.

### 2 · Guidelines — should prefer
Strong defaults where deviation is allowed but needs a reason.

*Tawuniya examples:* prefer `Mobile/Button` over a custom control. Prefer extending a variant over creating a component. Prefer semantic tokens over primitives at the component level.

**Delivery:** surfaced at authoring time, when the choice is being made — not in a document read once during onboarding.

### 3 · Framing — should understand
Background that shapes judgement without dictating any specific action.

*Tawuniya examples:* the DLS serves three surfaces — Super App (iOS), Aamal Portal (web), Website v4. The system is bilingual, and Arabic is not an afterthought. `Mobile/Button` carries 57 dependents, so its API is effectively frozen.

**Delivery:** loaded as context for the task at hand. Framing is what makes an agent's judgement match a senior designer's on questions no rule covers.

### 4 · Workflow — should follow
Procedure. Ordered steps toward a defined output.

*Tawuniya examples:* [ARC](arc-protocol.md) — Audit, then Report, then Compose. The metadata authoring sequence. Index regeneration.

**Delivery:** executed step by step, with the order enforced. A workflow delivered as prose becomes a suggestion, and gets skipped.

---

## Classification Matrix

| Intent | Category | Delivery | Failure if misclassified |
|---|---|---|---|
| Must obey | Constraint | Enforced check | Treated as optional, quietly violated |
| Should prefer | Guideline | Surfaced at decision point | Blocks legitimate exceptions |
| Should understand | Framing | Loaded as context | Agent's judgement misses the local reality |
| Should follow | Workflow | Executed in order | Steps skipped, order lost |

**Misclassification costs more than omission.** A guideline treated as a constraint blocks work that should proceed. A constraint treated as a guideline gets ignored exactly when it matters.

---

## Applied to Layer 2

This is why [component metadata](../layers/02-metadata.md) is not "documentation in JSON". Each field belongs to a category, and the category determines how the field is used:

| Metadata field | Category |
|---|---|
| Token permissions | Constraint |
| Prohibited combinations | Constraint |
| Accessibility obligations | Constraint |
| Preferred variant | Guideline |
| Anti-patterns | Guideline |
| Purpose / when not to use | Framing |
| Composition rules | Framing |
| Usage examples | Workflow |

A metadata record that does not distinguish these is a flat document again, in a different syntax.

---

## Applied to the Router

[`CLAUDE.md`](../CLAUDE.md) is this framework at the infrastructure level. It is a router, not a knowledge base — its non-negotiables are constraints, its route table is workflow, and everything else is loaded only when the path in play calls for it.

Pouring the whole system into `CLAUDE.md` reproduces the Volume Paradox one level up.

---

*[← ARC Protocol](arc-protocol.md) · [Agentic Design Systems →](agentic-design-systems.md)*
