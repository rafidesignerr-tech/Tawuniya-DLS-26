/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Accordions" (159:112454)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Accordions Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Accordions" (159:112454)
// =============================================================================
//
// Documentation:
//   "Accordions are UI components that allow users to expand and collapse
//    sections of related content. They help organize information in a
//    space-efficient way."
//
// =============================================================================

export const MobileAccordionMetadata = {
  component: {
    name: "Mobile/Accordion",
    category: "molecules",
    description:
      "Expandable/collapsible content section for organizing information space-efficiently. Supports leading icon, review star rating, and content toggle.",
    type: "interactive",
    figmaId: "188:77283",
    totalVariants: 2,
  },

  variants: {
    Property: {
      options: ["Collapsed with Icon", "Expanded with Icon"],
      default: "Collapsed with Icon",
    },
  },

  properties: {
    "Leading Icon": { type: "boolean", default: true },
    isReview: { type: "boolean", default: false, description: "Enable star rating display" },
    Content: { type: "boolean", default: true, description: "Toggle expanded content area" },
  },

  accessibility: {
    role: "region",
    wcag: "AA",
    notes: ["Content on Hover or Focus Level AA"],
  },

  aiHints: {
    priority: "high",
    keywords: ["accordion", "expandable", "collapsible", "expand", "collapse", "FAQ", "disclosure"],
  },
};

export const AccordionWrapperMetadata = {
  component: { name: "Accordion", figmaId: "924:25360", totalVariants: 2, category: "atoms" },
  variants: { Status: { options: ["False", "True"], default: "False" } },
};

export const ReviewStarAtom = {
  component: { name: "_Atoms/Review Star", figmaId: "3784:43467", totalVariants: 2, category: "atoms" },
  variants: { "Property 1": { options: ["Fill", "Outline"], default: "Fill" } },
};

export const RatingBarAtom = {
  component: { name: "_Atoms/Rating Bar", figmaId: "3784:43598", totalVariants: 6, category: "atoms" },
  variants: { "Property 1": { options: ["0", "1", "2", "3", "4", "5"], default: "0" } },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const AccordionsPageSummary = {
  pageName: "Accordions",
  pageId: "159:112454",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 4,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 12,

  componentIndex: [
    { name: "Mobile/Accordion", id: "188:77283", variants: 2, category: "molecules" },
    { name: "Accordion", id: "924:25360", variants: 2, category: "atoms" },
    { name: "_Atoms/Review Star", id: "3784:43467", variants: 2, category: "atoms" },
    { name: "_Atoms/Rating Bar", id: "3784:43598", variants: 6, category: "atoms" },
  ],
};
