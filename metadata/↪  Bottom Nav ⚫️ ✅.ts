/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Bottom Nav" (213:196)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Bottom Nav Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Bottom Nav" (213:196)
// =============================================================================
//
// Documentation:
//   "It provides users with easy access to the main sections and functionalities
//    of an application or website. Positioned at the bottom of the screen."
//
// =============================================================================

export const MobileBottomNavigationMetadata = {
  component: {
    name: "Mobile/Bottom Navigation",
    category: "organisms",
    description:
      "Primary bottom tab bar providing persistent access to the app's 5 main sections: Home, Policies, Activities/Requests, Store, and More. Each tab highlights the active section.",
    type: "navigation",
    figmaId: "806:5313",
    totalVariants: 5,
  },

  variants: {
    Type: {
      options: ["Home", "Policies", "Activities", "Store", "More"],
      default: "Home",
      purpose: {
        Home: "Home tab active — main dashboard",
        Policies: "Policies tab active — insurance policies listing",
        Activities: "Activities/Requests tab active — claims and requests",
        Store: "Store tab active — product marketplace",
        More: "More tab active — settings and additional options",
      },
    },
  },

  accessibility: {
    role: "tablist",
    wcag: "AA",
    notes: [
      "Content on Hover or Focus Level AA",
      "Each tab announced with its label and active/inactive state",
      "Only visible on Level 1 (top-level) pages",
    ],
  },

  aiHints: {
    priority: "high",
    keywords: ["bottom nav", "tab bar", "bottom navigation", "bottom tabs", "main navigation"],
    considerations: [
      "Only shown on Level 1 pages (controlled by Top Nav Level)",
      "Exactly 5 fixed tabs: Home, Policies, Activities, Store, More",
      "Each tab has Line (inactive) and Fill (active) icon variants",
    ],
  },
};

// Tab button atoms (5 tabs × 2 states each = 10 variants)
export const BottomNavTabAtoms = {
  tabs: [
    { name: "_Atoms/Home Button", id: "352:25214", label: "Home" },
    { name: "_Atoms/Policies Button", id: "352:25225", label: "Policies" },
    { name: "_Atoms/Activities Button", id: "352:25236", label: "Requests" },
    { name: "_Atoms/Store Button", id: "352:25247", label: "Store" },
    { name: "_Atoms/More Button", id: "352:25258", label: "More" },
  ],
  sharedProperties: {
    Label: { type: "boolean", default: true },
    "Icon Text": { type: "text" },
    State: { options: ["Active", "Inactive"], default: "Active" },
  },
};

// Navigation icon sets (24px and 16px variants, Line and Fill)
export const BottomNavIconSets = {
  icons24: [
    "icon-24/navigation_home", "icon-24/navigation_claim", "icon-24/navigation_requests",
    "icon-24/navigation_performance", "icon-24/navigation_shop", "icon-24/navigation_more",
    "icon-24/more", "icon-24/thunder", "icon-24/notifications",
    "icon-24/inside_ksa", "icon-24/outside_ksa",
  ],
  icons16: [
    "icon-16/navigation_home", "icon-16/navigation_claim", "icon-16/navigation_requests",
    "icon-16/navigation_shop", "icon-16/navigation_more",
    "icon-16/more", "icon-16/thunder", "icon-16/notifications",
    "icon-16/inside_ksa", "icon-16/outside_ksa",
  ],
  sharedVariants: { Type: { options: ["Line", "Fill"], default: "Line" } },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const BottomNavPageSummary = {
  pageName: "Bottom Nav",
  pageId: "213:196",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 27,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 59,

  componentIndex: [
    { name: "Mobile/Bottom Navigation", id: "806:5313", variants: 5, category: "organisms" },
    { name: "_Atoms/Home Button", id: "352:25214", variants: 2, category: "atoms" },
    { name: "_Atoms/Policies Button", id: "352:25225", variants: 2, category: "atoms" },
    { name: "_Atoms/Activities Button", id: "352:25236", variants: 2, category: "atoms" },
    { name: "_Atoms/Store Button", id: "352:25247", variants: 2, category: "atoms" },
    { name: "_Atoms/More Button", id: "352:25258", variants: 2, category: "atoms" },
  ],

  mainTabs: ["Home", "Policies", "Activities/Requests", "Store", "More"],
};
