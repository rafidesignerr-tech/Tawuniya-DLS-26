/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Alshamel" (4681:47463)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Alshamel Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Alshamel" (4681:47463)
// =============================================================================
//
// Documentation:
//   "Series of components that serve to compose Alshamel flows and chat
//    interactions."
//
// =============================================================================

export const MobileChatBubbleMetadata = {
  component: {
    name: "Mobile/Chat Bubble",
    category: "molecules",
    description: "Chat message bubble for Alshamel AI chat. Supports AI bubbles (system messages) and User bubbles (responses). Optional hyperlink, edit icon, and message indicator.",
    type: "display",
    figmaId: "4685:13678",
    totalVariants: 4,
  },
  variants: { Variant: { options: ["AI Bubble - 1", "AI Bubble - 2", "User - 1", "User - 2"], default: "AI Bubble - 1" } },
  properties: {
    Hyperlink: { type: "boolean", default: true },
    Text: { type: "text", default: "We hope you're safe and everything is okay." },
    "Edit icon": { type: "boolean", default: true },
    Message: { type: "boolean", default: false },
  },
  aiHints: { priority: "high", keywords: ["chat bubble", "message bubble", "alshamel", "chat message", "ai chat"] },
};

export const MobileDateSeparatorMetadata = {
  component: { name: "Mobile/Date Separator", figmaId: "4685:16295", totalVariants: 2, category: "atoms", description: "Date separator and title separator for chat timeline." },
  variants: { Variant: { options: ["Date Separator", "Title"], default: "Date Separator" } },
  properties: { Date: { type: "text", default: "Monday, 8 Jan 2023" } },
};

export const MobileChatContentMetadata = {
  component: {
    name: "Mobile/Chat Content",
    category: "organisms",
    description: "Rich chat content cards for Alshamel flows. 14 variants covering contact info, driver location, estimates, reports, request numbers, claim tracking, payments, and more.",
    type: "display",
    figmaId: "4689:25193",
    totalVariants: 14,
  },
  variants: {
    State: { options: ["Contact", "Driver Location", "Estimate", "Location - AI Chat", "Location - User", "Report", "Request Number", "Total Loss Claim", "Tracker", "driver is on the Way", "Total Loss", "Your Approval", "rejected claim", "Payment Details"], default: "Location - User" },
  },
  properties: {
    Button: { type: "boolean", default: true },
    Content: { type: "boolean", default: true },
    "Show Mobile/Button": { type: "boolean", default: false },
  },
};

export const MobileAlshamelAlertMetadata = {
  component: { name: "Mobile/Alshamel Alert", figmaId: "4689:25386", totalVariants: 2, category: "molecules", description: "In-chat alert with Progress and CTA variants." },
  variants: { "Property 1": { options: ["Progress", "CTA"], default: "CTA" } },
};

export const MobileAlshamelRequestProgressRecallMetadata = {
  component: { name: "Mobile/Alshamel Request Progress Recall", figmaId: "4725:63351", totalVariants: 6, category: "molecules", description: "Request progress recall card showing completion status (In Progress/Completed) at various progress levels." },
  variants: { Status: { options: ["In Progress", "Completed"], default: "Completed" }, Progress: { options: ["100", "80", "50", "20", "0"], default: "100" } },
};

export const AlshamelAtoms = {
  dateSeparator: { name: "Date Separator", figmaId: "12431:31354", totalVariants: 1 },
  state: { name: "State", figmaId: "12432:60151", totalVariants: 6, states: ["Unpaid", "paid", "Under Review", "Accepted", "Missing Documents", "Draft"] },
  missingDocument: { name: "Missing Document", figmaId: "12446:1491", totalVariants: 3 },
  states: { name: "states", figmaId: "12448:1182", totalVariants: 2, states: ["success", "warning"] },
  carLogo: { name: "Car logo", figmaId: "5414:35741", totalVariants: 2 },
  vehicleSelectionCard: { name: "Vehicle selection card", figmaId: "5414:35747", totalVariants: 4, states: ["Default", "Selected", "Disabled", "Disabled2"] },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const AlshamelPageSummary = {
  pageName: "Alshamel",
  pageId: "4681:47463",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 11,
  totalStandaloneComponents: 1,
  totalVariantsAcrossAll: 52,

  componentIndex: [
    { name: "Mobile/Chat Bubble", id: "4685:13678", variants: 4, category: "molecules" },
    { name: "Mobile/Date Separator", id: "4685:16295", variants: 2, category: "atoms" },
    { name: "Mobile/Chat Content", id: "4689:25193", variants: 14, category: "organisms" },
    { name: "Mobile/Alshamel Alert", id: "4689:25386", variants: 2, category: "molecules" },
    { name: "Mobile/Alshamel Request Progress Recall", id: "4725:63351", variants: 6, category: "molecules" },
    { name: "Date Separator", id: "12431:31354", variants: 1, category: "atoms" },
    { name: "State", id: "12432:60151", variants: 6, category: "atoms" },
    { name: "Missing Document", id: "12446:1491", variants: 3, category: "atoms" },
    { name: "states", id: "12448:1182", variants: 2, category: "atoms" },
    { name: "Car logo", id: "5414:35741", variants: 2, category: "atoms" },
    { name: "Vehicle selection card", id: "5414:35747", variants: 4, category: "atoms" },
  ],

  spacingGuidelines: {
    sameSender: "12px gap between consecutive messages from same sender",
    differentSender: "24px gap when message is from a different sender",
    newDay: "24px gap if message follows info notification or new day",
  },
};
