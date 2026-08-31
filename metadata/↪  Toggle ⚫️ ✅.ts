/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Toggle" (870:24274)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Toggle Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Toggle" (870:24274)
// =============================================================================
//
// Documentation:
//   "Toggles are used to switch between two states, such as on/off or
//    enable/disable. They represent immediate changes to a setting."
//
// =============================================================================

export const MobileToggleMetadata = {
  component: {
    name: "Mobile/Toggle",
    category: "molecules",
    description:
      "Toggle switch for binary on/off actions that take effect immediately. Supports active and disabled states with optional label.",
    type: "input",
    figmaId: "997:110484",
    totalVariants: 4,
  },

  variants: {
    Active: { options: ["False", "True"], default: "False" },
    Disabled: { options: ["False", "True"], default: "False" },
  },

  properties: {
    Text: { type: "text", default: "Toggle Button Label" },
    "Show Label": { type: "boolean", default: true },
  },

  accessibility: {
    role: "switch",
    wcag: "AA",
    notes: ["Content on Hover or Focus Level AA", "Immediate effect — no submit required"],
  },

  aiHints: {
    priority: "high",
    keywords: ["toggle", "switch", "on off", "toggle switch", "binary switch"],
  },
};

export const ToggleSwitchAtom = {
  component: { name: "_Atoms/Toggle Switch", figmaId: "1116:31443", totalVariants: 10, category: "atoms" },
  variants: {
    "Property 1": { options: ["Default", "Selected"], default: "Selected" },
    "Property 2": { options: ["Disabled", "Active", "Hover", "Pressed", "Focused"], default: "Active" },
  },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const TogglePageSummary = {
  pageName: "Toggle",
  pageId: "870:24274",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 2,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 14,

  componentIndex: [
    { name: "Mobile/Toggle", id: "997:110484", variants: 4, category: "molecules" },
    { name: "_Atoms/Toggle Switch", id: "1116:31443", variants: 10, category: "atoms" },
  ],
};
