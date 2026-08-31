/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Payment" (10954:133543)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Payment Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Payment" (10954:133543)
// =============================================================================
//
// =============================================================================

export const PaymentMetadata = {
  component: {
    name: "Payment",
    category: "molecules",
    description:
      "Payment method selector supporting 6 payment types: Default, Credit, Tamara (BNPL), stc pay, SADAD, and Credit Card / Add.",
    type: "interactive",
    figmaId: "10954:134296",
    totalVariants: 6,
  },

  variants: {
    "Payment type": {
      options: ["Default", "Credit", "Tamara", "stc pay", "SADAD", "Credit Card / Add"],
      default: "Default",
      purpose: {
        Default: "Generic payment method placeholder",
        Credit: "Credit card payment option",
        Tamara: "Buy Now Pay Later via Tamara",
        "stc pay": "stc pay digital wallet",
        SADAD: "SADAD billing system payment",
        "Credit Card / Add": "Add new credit card option",
      },
    },
  },

  aiHints: {
    priority: "high",
    keywords: ["payment", "payment method", "pay", "credit card", "tamara", "sadad", "stc pay", "checkout"],
  },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const PaymentPageSummary = {
  pageName: "Payment",
  pageId: "10954:133543",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 1,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 6,

  componentIndex: [
    { name: "Payment", id: "10954:134296", variants: 6, category: "molecules" },
  ],
};
