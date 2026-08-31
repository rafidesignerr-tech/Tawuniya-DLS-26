/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Cart" (3981:18476)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Cart Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Cart" (3981:18476)
// =============================================================================
//
// Documentation:
//   "The cart component displays selected items for purchase, allowing users
//    to review products before checkout."
//
// =============================================================================

export const MobileCartMetadata = {
  component: {
    name: "Mobile/Cart",
    category: "organisms",
    description:
      "Shopping cart component displaying selected items for purchase. Supports Collapsed summary, Expanded with closed content, and fully Expanded states.",
    type: "interactive",
    figmaId: "3982:22509",
    totalVariants: 3,
  },

  variants: {
    State: { options: ["Collapsed", "Expanded - Closed Content", "Expanded"], default: "Collapsed" },
  },

  aiHints: {
    priority: "high",
    keywords: ["cart", "shopping cart", "checkout", "basket", "order summary"],
  },
};

export const CartAtoms = {
  cartContent: { name: "_Molecule/Cart Content", figmaId: "3982:22693", totalVariants: 4, types: ["Expanded", "Divider", "Default", "Collapsed"] },
  cartHeader: { name: "_Atoms/Cart Header", figmaId: "3983:22701", totalVariants: 2, states: ["Collapsed", "Expanded"] },
  cartFooter: { name: "_Molecule/Cart Footer", figmaId: "3983:32215", totalVariants: 2, states: ["Expanded", "Collapsed"] },
  contentSubItem: { name: "_Atoms/Content Sub-Item", figmaId: "3983:32309", totalVariants: 3, types: ["Primary", "Secondary", "Footer"] },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const CartPageSummary = {
  pageName: "Cart",
  pageId: "3981:18476",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 5,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 14,

  componentIndex: [
    { name: "Mobile/Cart", id: "3982:22509", variants: 3, category: "organisms" },
    { name: "_Molecule/Cart Content", id: "3982:22693", variants: 4, category: "molecules" },
    { name: "_Atoms/Cart Header", id: "3983:22701", variants: 2, category: "atoms" },
    { name: "_Molecule/Cart Footer", id: "3983:32215", variants: 2, category: "molecules" },
    { name: "_Atoms/Content Sub-Item", id: "3983:32309", variants: 3, category: "atoms" },
  ],
};
