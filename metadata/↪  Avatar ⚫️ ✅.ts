/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Avatar" (3329:54677)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Avatar Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Avatar" (3329:54677)
// =============================================================================
//
// Documentation:
//   "Avatars are small, visual representations of a user or entity, typically
//    displayed as a circular image, initials, or icon."
//
// =============================================================================

// -----------------------------------------------------------------------------
// 1. MOBILE/AVATAR
// -----------------------------------------------------------------------------
export const MobileAvatarMetadata = {
  component: {
    name: "Mobile/Avatar",
    category: "molecules",
    description:
      "Visual representation of a user or entity displayed as a circular image or initials. Supports name label, role label, and multiple interaction states. Available in two sizes (72px and 64px).",
    type: "display",
    figmaId: "3328:53221",
    totalVariants: 10,
  },

  variants: {
    State: {
      options: ["Default", "Myself", "Selected", "Hover", "Disabled"],
      default: "Default",
    },
    Size: {
      options: ["72", "64"],
      default: "72",
    },
  },

  properties: {
    Name: { type: "boolean", default: true, description: "Toggle visibility of user name below avatar" },
    Role: { type: "boolean", default: true, description: "Toggle visibility of role label below name" },
    "Role Name": { type: "text", default: "Myself" },
  },

  accessibility: {
    role: "img",
    wcag: "AA",
    notes: ["Content on Hover or Focus Level AA"],
  },

  aiHints: {
    priority: "high",
    keywords: ["avatar", "profile picture", "user image", "profile", "user icon", "initials"],
    selectionCriteria: {
      "72": "Default size for prominent avatar displays (profile headers, member lists)",
      "64": "Compact size for inline avatar usage (list items, chat bubbles)",
    },
  },
};

// -----------------------------------------------------------------------------
// 2. _PROFILE (Internal)
// -----------------------------------------------------------------------------
export const ProfileAtomMetadata = {
  component: {
    name: "_Profile",
    category: "atoms",
    description: "Internal profile image atom supporting human and vehicle avatars with selection and remaining-requests states.",
    type: "display",
    figmaId: "4827:5762",
    totalVariants: 7,
  },

  variants: {
    "Property 1": {
      options: ["Default", "Profile Selected", "Vehicle - Default", "Vehicle - Selected", "Vehicle selected - remaining requests", "Vehicle default - remaining requests", "Vehicle disabled - remaining requests"],
      default: "Default",
    },
  },

  aiHints: { priority: "low", keywords: ["profile atom", "avatar inner"] },
};

// -----------------------------------------------------------------------------
// 3. _ATOMS/AVATAR SLOT
// -----------------------------------------------------------------------------
export const AvatarSlotAtomMetadata = {
  component: {
    name: "_Atoms/Avatar Slot",
    category: "atoms",
    description: "Avatar slot atom switching between user initials (AA) and car logo representations.",
    type: "display",
    figmaId: "4887:54365",
    totalVariants: 2,
  },

  variants: {
    "Property 1": { options: ["AA", "Car Logos"], default: "AA" },
  },

  aiHints: { priority: "low", keywords: ["avatar slot", "initials", "car logo"] },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const AvatarPageSummary = {
  pageName: "Avatar",
  pageId: "3329:54677",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 3,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 19,

  componentIndex: [
    { name: "Mobile/Avatar", id: "3328:53221", variants: 10, category: "molecules" },
    { name: "_Profile", id: "4827:5762", variants: 7, category: "atoms" },
    { name: "_Atoms/Avatar Slot", id: "4887:54365", variants: 2, category: "atoms" },
  ],

  sizes: { "72": "Default/prominent", "64": "Compact/inline" },
};
