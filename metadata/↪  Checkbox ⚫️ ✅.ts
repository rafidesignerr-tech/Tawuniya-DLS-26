/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Checkbox" (884:10788)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Checkbox Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Checkbox" (884:10788)
// =============================================================================
//
// Documentation:
//   "Checkboxes allow users to select one or more options from a list.
//    Best used for independent choices where multiple selections are permitted."
//
// =============================================================================

export const MobileCheckboxMetadata = {
  component: {
    name: "Mobile/Checkbox",
    category: "molecules",
    description:
      "Checkbox for multi-option selection. Supports Default, Selected, and Intermediate (indeterminate) types with 6 interaction states and optional label.",
    type: "input",
    figmaId: "916:12192",
    totalVariants: 15,
  },

  variants: {
    Type: { options: ["Default", "Selected", "Intermediate"], default: "Default" },
    State: { options: ["Dafault", "Hover", "Pressed", "Focused", "Disabled", "Selected"], default: "Dafault" },
  },

  properties: {
    Text: { type: "text", default: "Check Box Label" },
    "Show Label": { type: "boolean", default: true },
  },

  accessibility: {
    role: "checkbox",
    wcag: "AA",
    notes: [
      "Content on Hover or Focus Level AA",
      "Supports aria-checked: true, false, mixed (Intermediate)",
    ],
  },

  aiHints: {
    priority: "high",
    keywords: ["checkbox", "check box", "multi select", "tick box", "checkmark"],
    selectionCriteria: {
      Intermediate: "Use for 'select all' parent checkbox when only some children are selected",
    },
  },
};

export const CheckBoxIconAtom = {
  component: { name: "Atoms/Check Box Icon", figmaId: "916:12464", totalVariants: 15, category: "atoms" },
  variants: {
    Property: { options: ["Default", "Selected", "Intermediate"], default: "Default" },
    State: { options: ["Default", "Pressed", "Hover", "Focused", "Disabled"], default: "Default" },
  },
};

export const CheckboxContainerAtom = {
  component: { name: "Checkbox container", figmaId: "17741:8841", totalVariants: 10, category: "atoms" },
  variants: {
    State: { options: ["Default", "Selected"], default: "Default" },
    "Property 2": { options: ["Default", "Hover", "Pressed", "Focused", "Disabled"], default: "Default" },
  },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const CheckboxPageSummary = {
  pageName: "Checkbox",
  pageId: "884:10788",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 3,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 40,

  componentIndex: [
    { name: "Mobile/Checkbox", id: "916:12192", variants: 15, category: "molecules" },
    { name: "Atoms/Check Box Icon", id: "916:12464", variants: 15, category: "atoms" },
    { name: "Checkbox container", id: "17741:8841", variants: 10, category: "atoms" },
  ],
};
