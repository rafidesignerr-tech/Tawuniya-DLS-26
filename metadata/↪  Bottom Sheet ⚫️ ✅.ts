/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Bottom Sheet" (1279:37010)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Bottom Sheet Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Bottom Sheet" (1279:37010)
// =============================================================================
//
// Documentation:
//   "Bottom sheets are UI surfaces that slide up from the bottom of the screen
//    to display additional content without navigating away from the current view."
//
// =============================================================================

// -----------------------------------------------------------------------------
// 1. MOBILE/BOTTOM SHEET
// -----------------------------------------------------------------------------
export const MobileBottomSheetMetadata = {
  component: {
    name: "Mobile/Bottom Sheet",
    category: "organisms",
    description:
      "Overlay surface that slides up from the bottom of the screen to display additional content, actions, or selections. Supports half-screen and full-screen modes with optional header and action buttons.",
    type: "overlay",
    figmaId: "1279:52842",
    totalVariants: 2,
  },

  variants: {
    Type: {
      options: ["Half Screen", "Full Screen"],
      default: "Half Screen",
    },
  },

  properties: {
    "Show Header": { type: "boolean", default: true },
    "Primary action": { type: "boolean", default: true },
    "Secondary action": { type: "boolean", default: true },
  },

  accessibility: {
    role: "dialog",
    wcag: "AA",
    notes: ["Content on Hover or Focus Level AA"],
  },

  aiHints: {
    priority: "high",
    keywords: ["bottom sheet", "sheet", "drawer", "modal sheet", "action sheet", "overlay"],
  },
};

// -----------------------------------------------------------------------------
// 2. STANDALONE: MOBILE/UPLOADINGSHEET
// -----------------------------------------------------------------------------
export const MobileUploadingSheetMetadata = {
  component: {
    name: "Mobile/UploadingSheet",
    category: "organisms",
    description: "Specialized bottom sheet for file upload progress with progress bar, body content, and upload status icon.",
    type: "overlay",
    figmaId: "9601:24244",
    isStandalone: true,
    dimensions: { width: 393, height: 509 },
  },

  properties: {
    Progress: { type: "boolean", default: true },
    "Sheet Body": { type: "boolean", default: true },
    "Uploading Icon": { type: "boolean", default: true },
  },

  aiHints: {
    priority: "medium",
    keywords: ["upload sheet", "upload progress", "file uploading"],
  },
};

// -----------------------------------------------------------------------------
// 3. STANDALONE: NOTESHEET
// -----------------------------------------------------------------------------
export const NoteSheetMetadata = {
  component: {
    name: "NoteSheet",
    category: "organisms",
    description: "Bottom sheet variant for notes and confirmations with title, subtitle, text content, multiple buttons, and optional checkbox.",
    type: "overlay",
    figmaId: "9629:9448",
    isStandalone: true,
    dimensions: { width: 393, height: 370 },
  },

  properties: {
    "Title": { type: "boolean", default: true },
    "Subtitle": { type: "boolean", default: true },
    "Button 1": { type: "boolean", default: true },
    "Button 2": { type: "boolean", default: true },
    "Button 4": { type: "boolean", default: true },
    Text: { type: "boolean", default: true },
    Checkbox: { type: "boolean", default: false },
  },

  aiHints: {
    priority: "medium",
    keywords: ["note sheet", "confirmation sheet", "info sheet"],
  },
};

// -----------------------------------------------------------------------------
// 4. _ATOMS/SHEET HEADER (Standalone)
// -----------------------------------------------------------------------------
export const SheetHeaderAtomMetadata = {
  component: {
    name: "_Atoms/Sheet Header",
    category: "atoms",
    description: "Reusable header atom for bottom sheets with back/close buttons, title, description, subheading, and optional icon and CTA.",
    type: "layout",
    figmaId: "1279:52778",
    isStandalone: true,
    dimensions: { width: 361, height: 74 },
  },

  properties: {
    Description: { type: "boolean", default: false },
    "Back Button": { type: "boolean", default: true },
    "Close Button": { type: "boolean", default: true },
    Title: { type: "boolean", default: true },
    "Show Header Icon": { type: "boolean", default: true },
    "Show header CTA": { type: "boolean", default: false },
    Subheading: { type: "boolean", default: true },
  },

  aiHints: { priority: "low", keywords: ["sheet header", "bottom sheet header"] },
};

// -----------------------------------------------------------------------------
// 5. PROGRESS (Component Set)
// -----------------------------------------------------------------------------
export const ProgressAtomMetadata = {
  component: {
    name: "progress",
    category: "atoms",
    description: "Progress indicator for upload flows with 0%, 50%, and 100% states.",
    type: "indicator",
    figmaId: "9601:61579",
    totalVariants: 3,
  },
  variants: { State: { options: ["0%", "50%", "100%"], default: "0%" } },
};

// -----------------------------------------------------------------------------
// 6. UPLOADING ICON (Component Set)
// -----------------------------------------------------------------------------
export const UploadingIconAtomMetadata = {
  component: {
    name: "Uploading Icon",
    category: "atoms",
    description: "Upload status icon with Uploading, Done, Failure, and Processing states.",
    type: "indicator",
    figmaId: "9623:16633",
    totalVariants: 4,
  },
  variants: { Satat: { options: ["Uploading", "Done", "Failure", "Processing"], default: "Uploading" } },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const BottomSheetPageSummary = {
  pageName: "Bottom Sheet",
  pageId: "1279:37010",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 3,
  totalStandaloneComponents: 5,
  totalVariantsAcrossAll: 9,

  componentIndex: [
    { name: "Mobile/Bottom Sheet", id: "1279:52842", variants: 2, category: "organisms" },
    { name: "Mobile/UploadingSheet", id: "9601:24244", variants: 1, category: "organisms", standalone: true },
    { name: "NoteSheet", id: "9629:9448", variants: 1, category: "organisms", standalone: true },
    { name: "_Atoms/Sheet Header", id: "1279:52778", variants: 1, category: "atoms", standalone: true },
    { name: "_Atoms/Content Area", id: "1324:68841", variants: 1, category: "atoms", standalone: true },
    { name: "_Atoms/Sheet Body", id: "9601:62293", variants: 1, category: "atoms", standalone: true },
    { name: "progress", id: "9601:61579", variants: 3, category: "atoms" },
    { name: "Uploading Icon", id: "9623:16633", variants: 4, category: "atoms" },
  ],
};
