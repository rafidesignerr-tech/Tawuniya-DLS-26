/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Damage Map" (3991:12723)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Damage Map Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Damage Map" (3991:12723)
// =============================================================================
//
// Documentation:
//   "Damage Map is an interactive component used to highlight and communicate
//    vehicle damage spots and their statuses."
//
// =============================================================================

export const MobileDamageMapMetadata = {
  component: {
    name: "Mobile/Damage Map",
    category: "organisms",
    description: "Interactive vehicle damage map for highlighting and reporting damage spots. Standalone component (393×412).",
    type: "interactive",
    figmaId: "3991:19199",
    isStandalone: true,
    dimensions: { width: 361, height: 412 },
  },
  aiHints: { priority: "high", keywords: ["damage map", "vehicle damage", "car damage", "accident report", "damage spots"] },
};

export const DamagePinAtom = {
  component: { name: "_Atoms/Damage Pin", figmaId: "3990:20540", totalVariants: 4, category: "atoms", description: "Pin marker for damage spots with Default, Selected, Complete, and Timed states." },
  variants: { "Property 1": { options: ["Default", "Selected", "Complete", "Timed"], default: "Default" } },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const DamageMapPageSummary = {
  pageName: "Damage Map",
  pageId: "3991:12723",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 1,
  totalStandaloneComponents: 1,
  totalVariantsAcrossAll: 4,

  componentIndex: [
    { name: "Mobile/Damage Map", id: "3991:19199", variants: 1, category: "organisms", standalone: true },
    { name: "_Atoms/Damage Pin", id: "3990:20540", variants: 4, category: "atoms" },
  ],
};
