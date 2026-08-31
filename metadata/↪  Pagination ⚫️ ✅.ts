/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Pagination" (1053:7426)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Pagination Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Pagination" (1053:7426)
// =============================================================================
//
// Documentation:
//   "Pagination initiate app-specific actions, have customizable backgrounds,
//    and can include a title or an icon."
//
// =============================================================================

export const MobilePaginationMetadata = {
  component: {
    name: "Mobile/Pagination",
    category: "molecules",
    description:
      "Step indicator dots for paginated content (carousels, onboarding). Supports Light and Dark backgrounds, up to 5 steps, in Medium and Small sizes.",
    type: "indicator",
    figmaId: "1092:2456",
    totalVariants: 20,
  },

  variants: {
    Step: {
      options: [
        "on Dark/Step 1", "on Dark/Step 2", "on Dark/Step 3", "on Dark/Step 4", "on Dark/Step 5",
        "on Light/Step 1", "on Light/Step 2", "on Light/Step 3", "on Light/Step 4", "on Light/Step 5",
      ],
      default: "on Light/Step 1",
    },
    Size: { options: ["Medium", "Small"], default: "Medium" },
  },

  properties: {
    "Show 4th": { type: "boolean", default: true, description: "Show 4th pagination dot" },
    "Show 5th": { type: "boolean", default: true, description: "Show 5th pagination dot" },
  },

  aiHints: {
    priority: "medium",
    keywords: ["pagination", "page dots", "step indicator", "carousel dots", "page indicator"],
  },
};

export const PaginationStepAtom = {
  component: { name: "_Atoms/Pagination Step", figmaId: "1122:109297", totalVariants: 6, category: "atoms" },
  variants: {
    Property: { options: ["Default", "Selected-Light", "Selected-Dark"], default: "Default" },
    Size: { options: ["Medium", "Small"], default: "Medium" },
  },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const PaginationPageSummary = {
  pageName: "Pagination",
  pageId: "1053:7426",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 2,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 26,

  componentIndex: [
    { name: "Mobile/Pagination", id: "1092:2456", variants: 20, category: "molecules" },
    { name: "_Atoms/Pagination Step", id: "1122:109297", variants: 6, category: "atoms" },
  ],
};
