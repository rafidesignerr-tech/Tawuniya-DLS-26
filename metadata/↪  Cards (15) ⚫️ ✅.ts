/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Cards (15)" (156:133700)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Cards Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Cards (15)" (156:133700)
// =============================================================================
//
// Documentation:
//   "Cards are flexible, contained surfaces used to group related content and
//    actions in a visually distinct block."
//
// =============================================================================

// --- PRIMARY CARD COMPONENTS ---

export const MobileProductCardMetadata = {
  component: { name: "Mobile/Product Card", figmaId: "1889:5761", totalVariants: 3, category: "molecules", description: "Product display card with Primary, Secondary, and Outline variants." },
  variants: { Variant: { options: ["Primary", "Secondary", "Outline"], default: "Primary" } },
};

export const MobileImageProductCardMetadata = {
  component: { name: "Mobile/Image Product Card", figmaId: "1889:7308", totalVariants: 2, category: "molecules", description: "Product card with prominent image area. Primary and Secondary styles with optional tag." },
  variants: { Variant: { options: ["Primary", "Secondary"], default: "Primary" } },
  properties: { Tag: { type: "boolean", default: true } },
};

export const MobilePolicyCardMetadata = {
  component: { name: "Mobile/Policy Card", figmaId: "4766:29591", totalVariants: 3, category: "molecules", description: "Insurance policy card showing LoB, policy type, member count. Primary, Expired, and Draft states. Optional VIP tag, discount tag, three-dot menu, and details." },
  variants: { Variant: { options: ["Primary", "Expired", "Draft"], default: "Primary" } },
  properties: {
    "VIP tag": { type: "boolean", default: true },
    "Discount tag": { type: "boolean", default: false },
    "Three dots": { type: "boolean", default: false },
    "LOB name": { type: "text", default: "LOB" },
    "Policy Type": { type: "text", default: "Type Name" },
    "Policy Members": { type: "text", default: "3 Members" },
    Details: { type: "boolean", default: false },
  },
};

export const MobileHelpCardMetadata = {
  component: { name: "Mobile/Help Card", figmaId: "1902:2580", totalVariants: 2, category: "molecules", description: "Support/help card with customizable title and description." },
  variants: { Variant: { options: ["Primary", "Secondary"], default: "Primary" } },
  properties: {
    Description: { type: "text", default: "Our support team is ready to assist you..." },
    Title: { type: "text", default: "Need Help?\nWe're Here for You!" },
  },
};

export const MobileGeneralCardMetadata = {
  component: { name: "Mobile/General Card", figmaId: "1902:2917", totalVariants: 2, category: "molecules", description: "General-purpose card with optional header. Built on Card Header + Content + Footer atoms." },
  variants: { Variant: { options: ["Primary", "Secondary"], default: "Primary" } },
  properties: { "Show Header": { type: "boolean", default: true } },
};

export const MobileWalletCardMetadata = {
  component: { name: "Mobile/Wallet Card", figmaId: "1904:12735", totalVariants: 2, category: "molecules", description: "Wallet balance card showing Points or Riyal values." },
  variants: { Type: { options: ["Points", "Riyal"], default: "Points" } },
};

export const MobileClaimCardMetadata = {
  component: { name: "Mobile/Claim Card", figmaId: "3221:33445", totalVariants: 3, category: "molecules", description: "Insurance claim card with Tag, No Tag, and Select variants." },
  variants: { Type: { options: ["Tag", "No Tag", "Select"], default: "Tag" } },
};

export const MobileInsuranceCardMetadata = {
  component: { name: "Mobile/Insurance Card", figmaId: "3329:54474", totalVariants: 8, category: "molecules", description: "Insurance product selection card with Default, Error, Selected, and Hover states. Includes Indemnity variants and optional VIP tag and sub-text." },
  variants: { State: { options: ["Default", "Error", "Selected", "Hover", "Error - Indemnity", "Selected - Indemnity", "Default - Indemnity", "Hover - Indemnity"], default: "Default" } },
  properties: { "Sub-text": { type: "boolean", default: true }, Title: { type: "text", default: "Health Insurance" }, "VIP Tag": { type: "boolean", default: false } },
};

export const MobileOfferCardMetadata = {
  component: { name: "Mobile/Offer Card", figmaId: "3621:10335", totalVariants: 4, category: "molecules", description: "Insurance offer card with expandable benefits. Default/Selected states, Collapsed/Expanded views, optional tag and messages." },
  variants: { Variant: { options: ["Selected", "Default"], default: "Default" }, State: { options: ["Collapsed", "Expanded"], default: "Collapsed" } },
  properties: { Tag: { type: "boolean", default: true }, Benefits: { type: "boolean", default: true }, "Message 1": { type: "boolean", default: true }, "Message 2": { type: "boolean", default: true } },
};

export const MobileRewardCardMetadata = {
  component: { name: "Mobile/Reward card", figmaId: "4402:11587", totalVariants: 4, category: "molecules", description: "Loyalty reward card for Vitality and Drive programs with ON/OFF states." },
  variants: { Variant: { options: ["Vit ON", "drive ON", "Vit OFF", "Drive OFF"], default: "Vit ON" } },
  properties: { "Current amount": { type: "text", default: "0" }, Description: { type: "text", default: "Nostrud veniam do laborum est nulla ut." }, "Display Value": { type: "text", default: "9.999" }, "Show Display Value": { type: "boolean", default: true } },
};

export const MobileHeroAlertCardMetadata = {
  component: { name: "Mobile/Hero Alert Card", figmaId: "4426:10467", totalVariants: 8, category: "molecules", description: "Prominent alert card with progress bar, icon, label, link, body, CTAs, and vehicle badge. 8 semantic states." },
  variants: { Satae: { options: ["Success", "Warning", "Error", "General", "Limited time", "expired", "apple pay", "Onboarding"], default: "Success" } },
  properties: {
    "Show Mobile/Progress Bar": { type: "boolean", default: true },
    "Show Leading Icon": { type: "boolean", default: true },
    "Show Label": { type: "boolean", default: true },
    "Show Link": { type: "boolean", default: true },
    "Show Body": { type: "boolean", default: true },
    "Show CTAs": { type: "boolean", default: true },
    "Show Primary CTA": { type: "boolean", default: true },
    "Show Secondary CTA": { type: "boolean", default: true },
    "Show vehicle badge": { type: "boolean", default: true },
  },
};

export const MobileInlineMessageMetadata = {
  component: { name: "Mobile/Inline Message", figmaId: "3350:45624", totalVariants: 6, category: "molecules", description: "Inline message banner with 6 types: Disclaimer, AI, Percentage, Message, Message-Brand, Primary Disclaimer. Supports title, description, icon, CTA, timestamp, and close." },
  variants: { Type: { options: ["Disclaimer", "AI", "Percentage", "Message", "Message-Brand", "Primary Disclaimer"], default: "Disclaimer" } },
  properties: {
    Content: { type: "text", default: "Elit occaecat reprehenderit aute tempor commodo aliquip cillum do." },
    "Change Title Copy": { type: "text", default: "Title" },
    CTA: { type: "boolean", default: false },
    Timestamp: { type: "boolean", default: true },
    Title: { type: "boolean", default: true },
    Description: { type: "boolean", default: true },
    "Leading Icon": { type: "boolean", default: true },
    "Close Button": { type: "boolean", default: false },
  },
};

export const MobileNotificationCardMetadata = {
  component: { name: "Mobile/Notification Card", figmaId: "3187:2897", totalVariants: 2, category: "molecules", description: "Notification card with Default and Illustrated variants. Supports title, description, tags, CTA, button, and styled icon." },
  variants: { Type: { options: ["Illustrated", "Default"], default: "Default" } },
  properties: {
    Description: { type: "text", default: "Korem ipsum dolor sit amet..." },
    Title: { type: "text", default: "Title" },
    "Tag 2": { type: "boolean", default: true },
    "Tag 1": { type: "boolean", default: true },
    CTA: { type: "boolean", default: true },
    Button: { type: "boolean", default: false },
    Concluded: { type: "boolean", default: false },
    "Styled Icon": { type: "boolean", default: true },
  },
};

export const CouponCardMetadata = {
  component: { name: "Coupon Card", figmaId: "12437:9213", totalVariants: 3, category: "molecules", description: "Coupon/promo card with New, Disabled, and Applied states." },
  variants: { State: { options: ["New", "Disabled", "Applied"], default: "New" } },
  properties: { Title: { type: "text", default: "Coupon Name" }, Description: { type: "text", default: "Valid until 10, Sep 2025" } },
};

export const ProcessingDocumentsCardMetadata = {
  component: { name: "Processing documents card", figmaId: "10034:36873", totalVariants: 3, category: "molecules", description: "Document processing status card with Processing, Complete, and Failed states." },
  variants: { Stats: { options: ["Processing", "Complete", "Failed"], default: "Processing" } },
};

export const MobilePricingsMetadata = {
  component: { name: "Mobile/Pricings", figmaId: "4189:53220", totalVariants: 8, category: "atoms", description: "Price display component in 8 size/weight combinations." },
  variants: { Size: { options: ["16M", "14M", "12M", "16R", "14R", "12R", "24M", "20M"], default: "16M" } },
  properties: { "show /yr": { type: "boolean", default: true }, Value: { type: "text", default: "9999" }, "Decimal Value": { type: "text", default: ".00" } },
};

export const AppleWalletPassMetadata = {
  component: { name: "Apple Wallet Pass", figmaId: "14264:25912", totalVariants: 4, category: "molecules", description: "Apple Wallet pass card for insurance policies by LoB." },
  variants: { LoB: { options: ["General", "Health", "Motor", "Life"], default: "General" } },
  properties: { "Show Najm": { type: "boolean", default: false } },
};

export const RequestStatusMetadata = {
  component: { name: "Request Status", figmaId: "16127:157749", totalVariants: 21, category: "atoms", description: "Request/claim status indicator covering 21 states including RSA-specific provider statuses." },
  variants: { State: { options: ["(RSA)WaitingForProvider", "(RSA)WaitingForPayment", "ActionRequired", "InProgress", "Pending", "(RSA)ProviderOnTheWay", "(RSA)ProviderInService", "(RSA)ProviderArrived", "Completed", "Approved", "Active", "(RSA)Confirmed", "(RSA)CancelledByUser", "(RSA)CancelledByProvider", "(RSA)CancelledBySystem", "Cancelled", "Rejected", "Expired", "(RSA)NoProviderFound", "(RSA)NoProviderAccepted", "(RSA)Others"], default: "(RSA)WaitingForProvider" } },
};

// --- CARD ATOMS ---

export const CardAtoms = {
  cardFooter: { name: "_Atoms/Card Footer", ids: ["1889:7115", "14040:31648"], totalVariants: 4, types: ["Full Width", "Compressed", "Chevron", "Button"] },
  cardHeader: { name: "_Atoms/Card Header", figmaId: "1904:10190", totalVariants: 2, types: ["Invert", "Default"] },
  cardContent: { name: "_Atoms/Card Content", figmaId: "1904:10527", totalVariants: 3, types: ["Riyal", "Points", "Title + Description"] },
  styledIcon: { name: "_Atoms/Styled Icon", figmaId: "3188:2687", totalVariants: 1 },
  discountTag: { name: "Discount Tag", figmaId: "4934:14588", totalVariants: 2 },
  expiryTag: { name: "_Atoms/Expiry tag", figmaId: "4934:18163", totalVariants: 2 },
  lobTag: { name: "LOB Tag", figmaId: "9293:7737", totalVariants: 10, lobs: ["Health", "General", "Motor", "Default", "Life"], sizes: ["Default", "Medium"] },
  claimsCardHeader: { name: "_Atoms/Claims Card Header", figmaId: "3221:31941", totalVariants: 2 },
  claimsInsuranceCardStatus: { name: "_Atoms/Claims-Insurance Card Status", figmaId: "3221:33176", totalVariants: 6, types: ["Rejected", "In Progress", "Action Required", "Pending", "Active", "Expired"] },
  identificationBadge: { name: "_Atoms/Identification badge", figmaId: "3311:46715", totalVariants: 6 },
  balanceBadge: { name: "_Atoms/Balance Badge", figmaId: "3784:46678", totalVariants: 1 },
  inlineMessageContent: { name: "_Atoms/Inline Message Content", figmaId: "3350:46714", totalVariants: 2 },
  benefitsAccordion: { name: "_Molecule/Benefits Accordion", figmaId: "4463:28013", totalVariants: 2 },
  benefitList: { name: "_Atoms/Benefit List", figmaId: "4469:28264", totalVariants: 2 },
  paymentMode: { name: "_Molecule/Payment Mode", figmaId: "4470:11093", totalVariants: 1 },
  aiBubble: { name: "AI Bubble", figmaId: "10260:5584", totalVariants: 10 },
  gamificationTier: { name: "Mobile- Gamification-Tier", figmaId: "14610:53324", totalVariants: 5, tiers: ["Platinum", "Old - silver", "Bronze", "Gold", "Silver"] },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const CardsPageSummary = {
  pageName: "Cards (15)",
  pageId: "156:133700",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 37,
  totalStandaloneComponents: 13,
  totalVariantsAcrossAll: 168,

  primaryCards: [
    "Mobile/Product Card", "Mobile/Image Product Card", "Mobile/Policy Card",
    "Mobile/Help Card", "Mobile/General Card", "Mobile/Wallet Card",
    "Mobile/Claim Card", "Mobile/Insurance Card", "Mobile/Offer Card",
    "Mobile/Reward card", "Mobile/Hero Alert Card", "Mobile/Inline Message",
    "Mobile/Notification Card", "Coupon Card", "Processing documents card",
  ],
};
