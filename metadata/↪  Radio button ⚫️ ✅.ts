/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Radio button" (160:112458)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Radio Button Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Radio button" (160:112458)
// =============================================================================
//
// Documentation:
//   "Radio buttons allow users to select one option from a predefined set.
//    They are ideal for mutually exclusive choices."
//
// =============================================================================

export const MobileRadioButtonMetadata = {
  component: {
    name: "Mobile/Radio Button",
    category: "molecules",
    description:
      "Radio button for mutually exclusive single-option selection. Supports Default and Outlined styles, 5 interaction states, optional label and leading icon.",
    type: "input",
    figmaId: "577:804",
    totalVariants: 20,
  },

  variants: {
    Type: { options: ["Default", "Selected"], default: "Default" },
    State: { options: ["Default", "Hover", "Pressed", "Focused", "Disabled"], default: "Default" },
    Style: { options: ["Default", "Outlined"], default: "Default" },
  },

  properties: {
    Text: { type: "text", default: "Radio Button Label" },
    "Show Label": { type: "boolean", default: true },
    "Leading Icon": { type: "boolean", default: false },
    Icon: { type: "instanceSwap", default: "547:20541" },
  },

  accessibility: {
    role: "radio",
    wcag: "AA",
    notes: ["Content on Hover or Focus Level AA", "Part of a radiogroup — only one selectable at a time"],
  },

  aiHints: {
    priority: "high",
    keywords: ["radio", "radio button", "radio input", "single select", "option select"],
  },
};

export const RadioIconAtom = {
  component: { name: "_Atoms/Radio Icon", figmaId: "547:20540", totalVariants: 10, category: "atoms" },
  variants: {
    Property: { options: ["Default", "Selected"], default: "Default" },
    State: { options: ["Default", "Hover", "Pressed", "Focused", "Disabled"], default: "Default" },
  },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const RadioButtonPageSummary = {
  pageName: "Radio button",
  pageId: "160:112458",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 2,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 30,

  componentIndex: [
    { name: "Mobile/Radio Button", id: "577:804", variants: 20, category: "molecules" },
    { name: "_Atoms/Radio Icon", id: "547:20540", variants: 10, category: "atoms" },
  ],
};
