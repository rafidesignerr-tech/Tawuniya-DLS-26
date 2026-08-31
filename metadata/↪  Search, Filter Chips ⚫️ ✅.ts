/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Search, Filter Chips" (921:44027)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Search, Filter Chips Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Search, Filter Chips" (921:44027)
// =============================================================================
//
// Documentation:
//   "A search input field allows users to enter keywords or queries to find
//    specific content or filter data within a system."
//   "Chips are compact, interactive elements used to represent inputs,
//    attributes, actions, or selections."
//
// =============================================================================

// -----------------------------------------------------------------------------
// 1. MOBILE/SEARCH FIELD
// -----------------------------------------------------------------------------
export const MobileSearchFieldMetadata = {
  component: {
    name: "Mobile/Search Field",
    category: "molecules",
    description:
      "Search input field that allows users to enter keywords or queries to find specific content or filter data. Supports back navigation, filter toggle, and voice input accessories.",
    type: "input",
    figmaId: "3155:6823",
    totalVariants: 7,
  },

  usage: {
    useCases: [
      "Global search bar at the top of search screens",
      "In-page content filtering",
      "Product or service lookup within the store",
    ],
    antiPatterns: [
      {
        scenario: "Using Search Field for form text input",
        reason: "Search Field has search-specific accessories (filter, voice) that don't belong in forms",
        alternative: "Use Mobile/General Input Field for standard form fields",
      },
    ],
  },

  variants: {
    State: {
      options: ["Default", "Typing", "Filled", "Focused - Field", "Focused - Microphone", "Disabled", "Active"],
      default: "Default",
    },
  },

  properties: {
    "Show Back": { type: "boolean", default: true, description: "Toggle back navigation button" },
    "Show Filter": { type: "boolean", default: true, description: "Toggle filter icon button" },
    "Show Voice Input": { type: "boolean", default: true, description: "Toggle voice input microphone" },
  },

  accessibility: {
    role: "search",
    wcag: "AA",
    notes: ["Content on Hover or Focus Level AA"],
  },

  aiHints: {
    priority: "high",
    keywords: ["search", "search bar", "search field", "find", "lookup", "query", "filter"],
  },
};

// -----------------------------------------------------------------------------
// 2. MOBILE/SEARCH HEADER
// -----------------------------------------------------------------------------
export const MobileSearchHeaderMetadata = {
  component: {
    name: "Mobile/Search Header",
    category: "organisms",
    description:
      "Combines Search Field and Chips into a drag-and-drop header component for building search screens.",
    type: "composite",
    figmaId: "3161:5288",
    totalVariants: 2,
  },

  variants: {
    State: {
      options: ["Default", "Filter On"],
      default: "Default",
    },
  },

  aiHints: {
    priority: "medium",
    keywords: ["search header", "search with chips", "filter header"],
  },
};

// -----------------------------------------------------------------------------
// 3. MOBILE/SEARCH RESULT CELL
// -----------------------------------------------------------------------------
export const MobileSearchResultCellMetadata = {
  component: {
    name: "Mobile/Search Result Cell",
    category: "atoms",
    description:
      "List item used to showcase individual search results with optional description and leading icon.",
    type: "display",
    figmaId: "3188:2697",
    totalVariants: 3,
  },

  variants: {
    Position: {
      options: ["top", "mid", "bottom"],
      default: "top",
      purpose: "Controls border radius position for stacked list rendering",
    },
  },

  properties: {
    "Show Description": { type: "boolean", default: true },
    "Show Leading Icon": { type: "boolean", default: true },
    Title: { type: "text", default: "Motor Insurance" },
    Description: { type: "text", default: "Full coverage for accidents, theft, fire, and liability for cars and motorcycles." },
  },

  aiHints: {
    priority: "medium",
    keywords: ["search result", "result cell", "search list item"],
  },
};

// -----------------------------------------------------------------------------
// 4. MOBILE/CHIPS
// -----------------------------------------------------------------------------
export const MobileChipsMetadata = {
  component: {
    name: "Mobile/Chips",
    category: "atoms",
    description:
      "Compact, interactive chip elements for search-related filtering and categorization.",
    type: "interactive",
    figmaId: "3159:4449",
    totalVariants: 2,
  },

  variants: {
    Type: {
      options: ["Chips for search", "Chips"],
      default: "Chips for search",
    },
  },

  aiHints: {
    priority: "medium",
    keywords: ["chip", "chips", "filter chip", "search chip", "pill"],
  },
};

// -----------------------------------------------------------------------------
// 5. MOBILE/CLAIMCHIPS
// -----------------------------------------------------------------------------
export const MobileClaimChipsMetadata = {
  component: {
    name: "Mobile/ClaimChips",
    category: "atoms",
    description:
      "Specialized chips for filtering claims by line of business (Health, Motor, General, Protection & Saving).",
    type: "interactive",
    figmaId: "17456:38556",
    totalVariants: 5,
  },

  variants: {
    Type: {
      options: ["Defult", "Health", "Motor", "General", "Protection & Saving"],
      default: "Defult",
    },
  },

  aiHints: {
    priority: "medium",
    keywords: ["claim chips", "claim filter", "lob filter"],
  },
};

// -----------------------------------------------------------------------------
// 6. ATOMS/FILTER CHIPS
// -----------------------------------------------------------------------------
export const AtomsFilterChipsMetadata = {
  component: {
    name: "Atoms/Filter Chips",
    category: "atoms",
    description:
      "Filter chip atom with counter badge, leading/trailing icons, and multiple selection states.",
    type: "interactive",
    figmaId: "3155:10351",
    totalVariants: 5,
  },

  variants: {
    State: {
      options: ["Selected", "Default", "Disabled", "Focused", "Selected[Outline]"],
      default: "Default",
    },
  },

  properties: {
    "Show Counter": { type: "boolean", default: false },
    "Show Leading Icon": { type: "boolean", default: false },
    "Show Trailing Icon": { type: "boolean", default: false },
    Text: { type: "text", default: "Label" },
    "Right Icon": { type: "instanceSwap", default: "1325:103409" },
  },

  aiHints: {
    priority: "medium",
    keywords: ["filter chip", "chip atom", "selectable chip", "filter pill"],
  },
};

// -----------------------------------------------------------------------------
// 7. _ATOMS/VOICE INPUT
// -----------------------------------------------------------------------------
export const AtomsVoiceInputMetadata = {
  component: {
    name: "_Atoms/Voice Input",
    category: "atoms",
    description: "Voice input indicator atom with on/off states for the search field microphone.",
    type: "indicator",
    figmaId: "11040:15961",
    totalVariants: 2,
  },

  variants: {
    State: { options: ["off", "on"], default: "off" },
  },

  aiHints: {
    priority: "low",
    keywords: ["voice input", "microphone", "voice search"],
  },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const SearchFilterChipsPageSummary = {
  pageName: "Search, Filter Chips",
  pageId: "921:44027",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 7,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 26,

  componentIndex: [
    { name: "Mobile/Search Field", id: "3155:6823", variants: 7, category: "molecules" },
    { name: "Mobile/Search Header", id: "3161:5288", variants: 2, category: "organisms" },
    { name: "Mobile/Search Result Cell", id: "3188:2697", variants: 3, category: "atoms" },
    { name: "Mobile/Chips", id: "3159:4449", variants: 2, category: "atoms" },
    { name: "Mobile/ClaimChips", id: "17456:38556", variants: 5, category: "atoms" },
    { name: "Atoms/Filter Chips", id: "3155:10351", variants: 5, category: "atoms" },
    { name: "_Atoms/Voice Input", id: "11040:15961", variants: 2, category: "atoms" },
  ],

  documentationNotes: {
    searchField: "Search input with back, filter, and voice accessories",
    chips: "Compact interactive elements for filtering and categorization",
    searchHeader: "Combines Search Field + Chips as drag-and-drop header",
    searchResultCell: "List items for displaying search results",
    accessibilityCompliance: ["Content on Hover or Focus Level AA"],
  },
};
