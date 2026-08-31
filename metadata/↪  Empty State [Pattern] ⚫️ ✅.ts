/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Empty State [Pattern]" (11006:36136)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Empty State [Pattern] Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Empty State [Pattern]" (11006:36136)
// =============================================================================
//
// Documentation:
//   "Bottom sheets are UI surfaces that slide up from the bottom of the screen
//    to display additional content without navigating away from the current view."
//   (Note: This page reuses Bottom Sheet components for empty state patterns)
//
// =============================================================================

export const EmptyStateBottomSheetMetadata = {
  component: {
    name: "Mobile/Bottom Sheet",
    category: "organisms",
    description:
      "Bottom sheet configured for empty state patterns — displays contextual empty state content within a half-screen or full-screen overlay.",
    type: "overlay",
    figmaId: "11006:36174",
    totalVariants: 2,
  },

  variants: {
    Type: { options: ["Half Screen", "Full Screen"], default: "Half Screen" },
  },

  properties: {
    "Show Header": { type: "boolean", default: true },
    "Primary action": { type: "boolean", default: true },
    "Secondary action": { type: "boolean", default: true },
  },

  aiHints: {
    priority: "medium",
    keywords: ["empty state", "no data", "no results", "blank state", "zero state"],
  },
};

export const EmptyStateProgressMetadata = {
  component: {
    name: "progress",
    category: "atoms",
    description: "Progress indicator atom used within empty state upload flows.",
    type: "indicator",
    figmaId: "11006:36215",
    totalVariants: 3,
  },
  variants: { State: { options: ["100%", "0%", "50%"], default: "0%" } },
};

export const EmptyStateUploadingIconMetadata = {
  component: {
    name: "Uploading Icon",
    category: "atoms",
    description: "Upload status icon for empty state upload patterns.",
    type: "indicator",
    figmaId: "11006:36239",
    totalVariants: 4,
  },
  variants: { Satat: { options: ["Done", "Failure", "Processing", "Uploading"], default: "Uploading" } },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const EmptyStatePageSummary = {
  pageName: "Empty State [Pattern]",
  pageId: "11006:36136",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 3,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 9,

  componentIndex: [
    { name: "Mobile/Bottom Sheet", id: "11006:36174", variants: 2, category: "organisms" },
    { name: "progress", id: "11006:36215", variants: 3, category: "atoms" },
    { name: "Uploading Icon", id: "11006:36239", variants: 4, category: "atoms" },
  ],
};
