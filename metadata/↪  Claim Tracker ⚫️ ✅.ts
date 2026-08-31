/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Claim Tracker" (4165:51046)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Claim Tracker Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Claim Tracker" (4165:51046)
// =============================================================================
//
// Documentation:
//   "Claim Tracker is an accordion-like component used to track claims statuses,
//    providing user information regarding completion states, technical logs
//    and useful recommendations."
//
// =============================================================================

export const MobileClaimTrackerMetadata = {
  component: {
    name: "Mobile/Claim Tracker",
    category: "organisms",
    description:
      "Accordion-like tracker for insurance claims. Shows claim status, content sections, requested services, compensation amount, and outer CTAs. Supports Collapsed, Expanded, Upcoming, and Focused states.",
    type: "interactive",
    figmaId: "3596:25572",
    totalVariants: 4,
  },

  variants: {
    Property: { options: ["Collapsed", "Expanded", "Upcoming", "Focused"], default: "Collapsed" },
  },

  properties: {
    "Leading Icon": { type: "boolean", default: false },
    Description: { type: "boolean", default: false },
    "Content 1": { type: "boolean", default: true },
    "content 2": { type: "boolean", default: true },
    "Content 3": { type: "boolean", default: true },
    "Content 4": { type: "boolean", default: true },
    "Content 5": { type: "boolean", default: true },
    "Change Title": { type: "text", default: "Title" },
    "Outer CTAs": { type: "boolean", default: true },
    "Outer CTA 1": { type: "boolean", default: true },
    "Outer CTA 2": { type: "boolean", default: true },
    "Show Requested services": { type: "boolean", default: true },
    "Title Block 3": { type: "text", default: "Requested services" },
    "Item block 3": { type: "text", default: "X-Ray" },
    "Item 2 Block 3": { type: "text", default: "Ultrasound scan" },
    "Item 3 Block 3": { type: "text", default: "CBC test" },
    "Show Compensation amount": { type: "boolean", default: true },
  },

  aiHints: {
    priority: "high",
    keywords: ["claim tracker", "claims", "tracker", "claim status", "insurance claim", "claim progress"],
  },
};

export const ClaimTrackerDraftMetadata = {
  component: {
    name: "Mobile/Claim Tracker/ draft",
    category: "organisms",
    description: "Draft variant of the Claim Tracker with identical structure for work-in-progress claims.",
    type: "interactive",
    figmaId: "15748:18218",
    totalVariants: 4,
  },
  variants: { Property: { options: ["Collapsed", "Expanded", "Upcoming", "Focused"], default: "Collapsed" } },
};

export const ClaimTrackerAtoms = {
  trackerContent: { name: "_Atoms/Tracker Content", figmaId: "3606:4019", totalVariants: 6, types: ["Expenses", "Text + Timestamp", "Text + CTA", "Illustration + Text", "Expenses date", "Compensation amount"] },
  trackerLine: { name: "_Atoms/tracker_line", figmaId: "3606:4031", totalVariants: 11, percentages: ["0", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"] },
  amountStatus: { name: "_Atoms/Amount Status Content", figmaId: "3596:18501", totalVariants: 4, statuses: ["Success", "Pending", "Error", "Total"] },
  trackerTag: { name: "_Atoms/Tracker Tag", figmaId: "3768:14572", totalVariants: 4, types: ["Upcoming", "In Progress", "Completed", "Rejected"] },
  trackerIllustrations: { name: "_Atoms/Tracker Illustrations", figmaId: "10784:2618", totalVariants: 3, types: ["Reject", "Document", "success"] },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const ClaimTrackerPageSummary = {
  pageName: "Claim Tracker",
  pageId: "4165:51046",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 7,
  totalStandaloneComponents: 1,
  totalVariantsAcrossAll: 32,

  componentIndex: [
    { name: "Mobile/Claim Tracker", id: "3596:25572", variants: 4, category: "organisms" },
    { name: "Mobile/Claim Tracker/ draft", id: "15748:18218", variants: 4, category: "organisms" },
    { name: "_Atoms/Tracker Content", id: "3606:4019", variants: 6, category: "atoms" },
    { name: "_Atoms/tracker_line", id: "3606:4031", variants: 11, category: "atoms" },
    { name: "_Atoms/Amount Status Content", id: "3596:18501", variants: 4, category: "atoms" },
    { name: "_Atoms/Tracker Tag", id: "3768:14572", variants: 4, category: "atoms" },
    { name: "_Atoms/Tracker Illustrations", id: "10784:2618", variants: 3, category: "atoms" },
  ],
};
