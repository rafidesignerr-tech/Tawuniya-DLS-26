/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Lists" (1061:27524)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Lists Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Lists" (1061:27524)
// =============================================================================
//
// Documentation:
//   "List items are individual elements within a list, used to display grouped
//    content or actions in a structured format."
//
// =============================================================================

// -----------------------------------------------------------------------------
// 1. MOBILE/LIST ITEM
// -----------------------------------------------------------------------------
export const MobileListItemMetadata = {
  component: {
    name: "Mobile/List Item",
    category: "molecules",
    description:
      "Static list item for displaying grouped content with subtitle, tags, trailing text, divider, and leading item. Available in Outline, Ghost, and Solid styles.",
    type: "display",
    figmaId: "1203:21907",
    totalVariants: 6,
  },
  variants: {
    State: { options: ["Disabled", "Default"], default: "Default" },
    Style: { options: ["Outline", "Ghost", "Solid"], default: "Outline" },
  },
  properties: {
    Subtitle: { type: "boolean", default: true },
    "Trailing Tag": { type: "boolean", default: true },
    "Trailing Text": { type: "boolean", default: true },
    Divider: { type: "boolean", default: true },
    "Leading Item": { type: "boolean", default: true },
    "Middle Tag": { type: "boolean", default: false },
  },
  aiHints: { priority: "high", keywords: ["list item", "list row", "list cell", "static list"] },
};

// -----------------------------------------------------------------------------
// 2. MOBILE/INTERACTIVE LIST ITEM
// -----------------------------------------------------------------------------
export const MobileInteractiveListItemMetadata = {
  component: {
    name: "Mobile/Interactive List Item",
    category: "molecules",
    description:
      "Interactive list item with trailing controls (toggle, checkbox, radio, icon, button, or multi-action). Supports info button, tags, and leading icon.",
    type: "interactive",
    figmaId: "1209:23296",
    totalVariants: 6,
  },
  variants: {
    State: { options: ["Disabled", "Default"], default: "Default" },
    Style: { options: ["Outline", "Ghost", "Solid"], default: "Outline" },
  },
  properties: {
    Subtitle: { type: "boolean", default: true },
    Divider: { type: "boolean", default: true },
    "Info Button": { type: "boolean", default: true },
    "Tag 1": { type: "boolean", default: false },
    "Tag 2": { type: "boolean", default: false },
    Title: { type: "boolean", default: true },
    "Leading Icon": { type: "boolean", default: true },
  },
  aiHints: { priority: "high", keywords: ["interactive list", "toggle list", "settings list", "switch list"] },
};

// -----------------------------------------------------------------------------
// 3. MOBILE/PAYMENT LIST ITEM V1
// -----------------------------------------------------------------------------
export const MobilePaymentListItemV1Metadata = {
  component: {
    name: "Mobile/Payment List Item v1",
    category: "molecules",
    description: "Payment-specific list item with info button, title, subtitle, and divider. Three visual styles.",
    type: "interactive",
    figmaId: "3986:17105",
    totalVariants: 6,
  },
  variants: {
    State: { options: ["Disabled", "Default"], default: "Default" },
    Style: { options: ["Outline", "Ghost", "Solid"], default: "Outline" },
  },
  aiHints: { priority: "medium", keywords: ["payment list", "payment item", "billing list"] },
};

// -----------------------------------------------------------------------------
// 4. MOBILE/PAYMENT LIST ITEM V2
// -----------------------------------------------------------------------------
export const MobilePaymentListItemV2Metadata = {
  component: {
    name: "Mobile/Payment List Item v2",
    category: "molecules",
    description: "Alternate payment list item with Logo, Icon + Title, and Type3 variants.",
    type: "interactive",
    figmaId: "3986:17692",
    totalVariants: 3,
  },
  variants: {
    Type: { options: ["Icon + Title", "Logo", "Type3"], default: "Logo" },
  },
  aiHints: { priority: "medium", keywords: ["payment list v2", "payment logo item"] },
};

// -----------------------------------------------------------------------------
// 5. MOBILE/ENTRY LIST ITEM
// -----------------------------------------------------------------------------
export const MobileEntryListItemMetadata = {
  component: {
    name: "Mobile/Entry List Item",
    category: "molecules",
    description:
      "Navigable entry list item supporting subtitle, tags, leading icon, amount badge, trailing button, and interactive leading item. Five interaction states.",
    type: "interactive",
    figmaId: "1209:24032",
    totalVariants: 15,
  },
  variants: {
    State: { options: ["Disabled", "Default", "Hover", "Focused", "Pressed"], default: "Default" },
    Style: { options: ["Outline", "Ghost", "Solid"], default: "Outline" },
  },
  properties: {
    Subtitle: { type: "boolean", default: true },
    Divider: { type: "boolean", default: true },
    "Leading Interactive Item": { type: "boolean", default: false },
    "Tag 1": { type: "boolean", default: false },
    "Tag 2": { type: "boolean", default: false },
    "Leading Icon": { type: "boolean", default: true },
    "Amount Badge": { type: "boolean", default: false },
    "Trailing Button": { type: "boolean", default: false },
  },
  aiHints: { priority: "high", keywords: ["entry list", "navigable list", "clickable list", "tappable list"] },
};

// -----------------------------------------------------------------------------
// 6. MOBILE/LOYALTY ENTRY LIST
// -----------------------------------------------------------------------------
export const MobileLoyaltyEntryListMetadata = {
  component: {
    name: "Mobile/Loyalty Entry List",
    category: "molecules",
    description: "Specialized entry list for Vitality and Drive loyalty programs with ON/OFF states.",
    type: "interactive",
    figmaId: "4766:32642",
    totalVariants: 4,
  },
  variants: {
    Variant: { options: ["Drive OFF", "Vitality OFF", "Vitality ON", "Drive ON"], default: "Vitality OFF" },
  },
  aiHints: { priority: "medium", keywords: ["loyalty list", "vitality list", "drive list", "rewards list"] },
};

// -----------------------------------------------------------------------------
// ATOMS
// -----------------------------------------------------------------------------
export const InteractiveListTrailingItemAtom = {
  component: { name: "_Atoms/Interactive List Trailing Item", figmaId: "1203:22537", totalVariants: 6, category: "atoms" },
  variants: { Type: { options: ["Toggle Switch", "Button", "Check Box Icon", "Radio Icon", "Icon", "Actions"], default: "Toggle Switch" } },
};

export const ListLeadingItemAtom = {
  component: { name: "_Atoms/List Leading Item", figmaId: "3443:63980", totalVariants: 2, category: "atoms" },
  variants: { Type: { options: ["Icon", "Image"], default: "Icon" } },
};

export const AmountBadgeAtom = {
  component: { name: "_Atoms/Amount Badge", figmaId: "3947:60919", totalVariants: 5, category: "atoms" },
  variants: { "Property 1": { options: ["Warning", "Draft", "Ongoing", "Disabled", "New"], default: "Draft" } },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const ListsPageSummary = {
  pageName: "Lists",
  pageId: "1061:27524",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 9,
  totalStandaloneComponents: 1,
  totalVariantsAcrossAll: 51,

  componentIndex: [
    { name: "Mobile/List Item", id: "1203:21907", variants: 6, category: "molecules" },
    { name: "Mobile/Interactive List Item", id: "1209:23296", variants: 6, category: "molecules" },
    { name: "Mobile/Payment List Item v1", id: "3986:17105", variants: 6, category: "molecules" },
    { name: "Mobile/Payment List Item v2", id: "3986:17692", variants: 3, category: "molecules" },
    { name: "Mobile/Entry List Item", id: "1209:24032", variants: 15, category: "molecules" },
    { name: "Mobile/Loyalty Entry List", id: "4766:32642", variants: 4, category: "molecules" },
    { name: "_Atoms/Interactive List Trailing Item", id: "1203:22537", variants: 6, category: "atoms" },
    { name: "_Atoms/List Leading Item", id: "3443:63980", variants: 2, category: "atoms" },
    { name: "_Atoms/Amount Badge", id: "3947:60919", variants: 5, category: "atoms" },
  ],

  listStyles: ["Outline", "Ghost", "Solid"],
  trailingItemTypes: ["Toggle Switch", "Button", "Check Box Icon", "Radio Icon", "Icon", "Actions"],
};
