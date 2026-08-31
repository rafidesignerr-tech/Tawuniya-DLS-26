/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Progress Steps" (1151:3640)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Progress Steps Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Progress Steps" (1151:3640)
// =============================================================================
//
// Documentation:
//   "A progress steps component is a series of milestones that provides an
//    overview of a complex process or multistep flow."
//
// =============================================================================

export const MobileProgressStepsMetadata = {
  component: {
    name: "Mobile/Progress Steps",
    category: "molecules",
    description:
      "Milestone-based progress indicator for complex multistep flows (e.g. account creation). Shows current step, next step labels, optional sub-steps, and supports 2–6 total stages.",
    type: "indicator",
    figmaId: "3081:1233",
    totalVariants: 25,
  },

  variants: {
    Stage: {
      options: [
        "02-1", "02-2", "02-Completed",
        "03-1", "03-2", "03-3", "03-Completed",
        "04-1", "04-2", "04-3", "04-4", "04-Completed",
        "05-1", "05-2", "05-3", "05-4", "05-5", "05-Completed",
        "06-1", "06-2", "06-3", "06-4", "06-5", "06-6", "06-Completed",
      ],
      default: "02-1",
      naming: "Format: {totalSteps}-{currentStep} or {totalSteps}-Completed",
    },
  },

  properties: {
    "Show Labels": { type: "boolean", default: true },
    "Current step": { type: "text", default: "Current step" },
    "Next step": { type: "text", default: "Next: Next step" },
    "Show Sub-steps": { type: "boolean", default: false },
  },

  aiHints: {
    priority: "high",
    keywords: ["progress steps", "stepper", "wizard", "multi-step", "milestone", "step indicator"],
    considerations: ["At least two steps required", "Supports 2 to 6 total steps"],
  },
};

export const ProgressStepsAtoms = {
  tail: { name: "_Atoms/Tail", figmaId: "3081:1211", variants: 2, states: ["Active", "Disabled"] },
  stepCell: { name: "_Molecule/Step Cell", figmaId: "3081:1269", variants: 9, stages: ["Beginning", "End", "Middle"], states: ["Disabled", "Current", "Completed"] },
  stepLimbs: { name: "_Atoms/Step Limbs", figmaId: "3527:7280", variants: 5, types: ["Body Center", "Left", "Right Connected", "Left Connected", "Right"] },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const ProgressStepsPageSummary = {
  pageName: "Progress Steps",
  pageId: "1151:3640",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 4,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 41,

  componentIndex: [
    { name: "Mobile/Progress Steps", id: "3081:1233", variants: 25, category: "molecules" },
    { name: "_Atoms/Tail", id: "3081:1211", variants: 2, category: "atoms" },
    { name: "_Molecule/Step Cell", id: "3081:1269", variants: 9, category: "atoms" },
    { name: "_Atoms/Step Limbs", id: "3527:7280", variants: 5, category: "atoms" },
  ],
};
