/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Toast" (255:42740)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Toast Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Toast" (255:42740)
// =============================================================================
//
// Documentation:
//   "Toasts are brief, unobtrusive notifications that appear temporarily,
//    typically near the bottom or corner of the screen."
//
// =============================================================================

export const MobileToastMetadata = {
  component: {
    name: "Mobile/Toast",
    category: "molecules",
    description:
      "Brief, unobtrusive notification that appears temporarily to provide non-critical feedback. Supports 6 semantic types (Error, Warning, Success, Info, Primary, Purple) in Short and Expanded formats. Includes optional header, button, leading icon, trailing text, and close icon.",
    type: "feedback",
    figmaId: "828:21815",
    totalVariants: 11,
  },

  variants: {
    Type: {
      options: ["Error", "Warning", "Success", "Info", "Primary", "Purple"],
      default: "Error",
    },
    "Alert Type": {
      options: ["Short", "Expanded"],
      default: "Short",
    },
  },

  properties: {
    Text: { type: "text", default: "Alert Notification" },
    "Close Icon": { type: "boolean", default: false },
    "Header Name": { type: "text", default: "Header" },
    Button: { type: "boolean", default: true },
    Header: { type: "boolean", default: true },
    "Show Leading Icon": { type: "boolean", default: true },
    "Trailing Text": { type: "boolean", default: false },
    Icon: { type: "instanceSwap", default: "10775:135281" },
    "16 PX Icons": { type: "boolean", default: false },
    "Button master": { type: "boolean", default: false },
  },

  accessibility: {
    role: "alert",
    wcag: "AA",
    notes: ["Content on Hover or Focus Level AA", "Auto-dismiss after timeout", "aria-live polite for non-critical, assertive for errors"],
  },

  aiHints: {
    priority: "high",
    keywords: ["toast", "notification", "snackbar", "alert", "feedback", "message bar"],
  },
};

export const MobileClockToastMetadata = {
  component: {
    name: "Mobile/Clock Toast",
    category: "molecules",
    description: "Time-sensitive toast notification with ETA countdown display. Supports Error, Warning, and Success types.",
    type: "feedback",
    figmaId: "3708:15885",
    totalVariants: 3,
  },
  variants: { Type: { options: ["Error", "Warning", "Success"], default: "Error" } },
  properties: { ETA: { type: "text", default: "ETA: 1 day" } },
  aiHints: { priority: "medium", keywords: ["clock toast", "eta toast", "timer notification", "countdown"] },
};

export const ToastIconsAtom = {
  component: { name: "_Atoms/Toast Icons", figmaId: "10775:135285", totalVariants: 6, category: "atoms" },
  variants: {
    "type and color": { options: ["info - red", "clock yellow", "info yellow", "success green", "placholder black", "primary"], default: "info - red" },
  },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const ToastPageSummary = {
  pageName: "Toast",
  pageId: "255:42740",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 3,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 20,

  componentIndex: [
    { name: "Mobile/Toast", id: "828:21815", variants: 11, category: "molecules" },
    { name: "Mobile/Clock Toast", id: "3708:15885", variants: 3, category: "molecules" },
    { name: "_Atoms/Toast Icons", id: "10775:135285", variants: 6, category: "atoms" },
  ],
};
