/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Button" (159:112453)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Button Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Button" (159:112453)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. MOBILE/BUTTON
// -----------------------------------------------------------------------------
export const MobileButtonMetadata = {
  component: {
    name: "Mobile/Button",
    category: "atoms",
    description:
      "Primary interactive button for mobile interfaces. Supports brand-colored Primary, outlined Secondary, and text-only Tertiary types across four sizes with full state coverage.",
    type: "interactive",
    figmaId: "640:325167",
    totalVariants: 60, // 3 types x 4 sizes x 5 states
  },

  usage: {
    useCases: [
      "Form submission (sign up, log in, checkout)",
      "Primary call-to-action on a screen",
      "Secondary or alternative actions alongside a primary button",
      "Inline tertiary actions (cancel, skip, learn more)",
    ],
    commonPatterns: [
      {
        name: "Primary CTA",
        description: "Single prominent action the user should take",
        composition: `<Button type="Primary" size="Large">Continue</Button>`,
      },
      {
        name: "Primary + Secondary pair",
        description: "Main action with a less prominent alternative",
        composition: `<Button type="Primary" size="Large">Submit</Button>\n<Button type="Secondary" size="Large">Cancel</Button>`,
      },
      {
        name: "Icon + Label",
        description: "Button with leading or trailing icon for added context",
        composition: `<Button type="Primary" size="Medium" showLeadingIcon={true}>Upload</Button>`,
      },
      {
        name: "Icon-only (use Mobile/Icon Button instead)",
        description:
          "When only an icon is needed, prefer Mobile/Icon Button component",
        composition: `<IconButton type="Primary" size="Large" icon="close" />`,
      },
    ],
    antiPatterns: [
      {
        scenario: "Using Tertiary for the main CTA",
        reason:
          "Tertiary has no background fill and low visual weight; users may miss it",
        alternative: "Use Primary for the main action",
      },
      {
        scenario: "Stacking more than two buttons side by side",
        reason: "Creates decision overload and touch-target confusion on mobile",
        alternative:
          "Use one Primary + one Secondary; move extras to a menu or tertiary links",
      },
      {
        scenario: "Using Extrasmall in isolation as a page-level CTA",
        reason: "Too small for comfortable tapping as a standalone action",
        alternative:
          "Use Large or Medium for standalone CTAs; reserve Extrasmall for inline/tag-like contexts",
      },
    ],
  },

  variants: {
    Type: {
      options: ["Primary", "Secondary", "Tertiary"],
      default: "Primary",
      purpose: {
        Primary:
          "Main action the user should take. Solid filled background with inverted text.",
        Secondary:
          "Alternative or supporting action. Outlined with stroke border, no fill.",
        Tertiary:
          "Low-emphasis action (cancel, skip, learn more). Text-only, no fill or border.",
      },
    },
    Size: {
      options: ["Large", "Medium", "Small", "Extrasmall"],
      default: "Large",
      purpose: {
        Large: "Default mobile CTA size (height 56px, font 16px)",
        Medium: "Secondary placement or compact layouts (height 48px, font 14px)",
        Small: "Tight spaces like table rows or cards (height 40px, font 12px)",
        Extrasmall:
          "Inline pill-style actions, tags, or compact UI (height 32px, font 12px, pill radius)",
      },
    },
    State: {
      options: ["Default", "Hover", "Pressed", "Focused", "Disabled"],
      default: "Default",
      purpose: {
        Default: "Resting interactive state",
        Hover: "Pointer hover feedback",
        Pressed: "Active/tap feedback",
        Focused: "Keyboard or accessibility focus ring",
        Disabled: "Non-interactive, reduced opacity",
      },
    },
  },

  properties: {
    "Leading Icon": {
      type: "instance-swap",
      default: "icon-16/component (Type=Linetone)",
      description: "Icon displayed before the button text",
    },
    "Trailing Icon": {
      type: "instance-swap",
      default: "icon-16/component (Type=Line)",
      description: "Icon displayed after the button text",
    },
    "Show Leading Icon": {
      type: "boolean",
      default: true,
      description: "Toggle visibility of the leading icon",
    },
    "Show Trailing Icon": {
      type: "boolean",
      default: true,
      description: "Toggle visibility of the trailing icon",
    },
    "Show Text": {
      type: "boolean",
      default: true,
      description: "Toggle visibility of the button label text",
    },
    "Button Text": {
      type: "string",
      default: "Button Text",
      description: "The label text displayed inside the button",
    },
  },

  composition: {
    structure:
      "Outer COMPONENT wraps a _Button-Master FRAME which contains an optional leading icon, text label, and optional trailing icon in a horizontal auto-layout.",
    children: [
      {
        name: "_Button-Master",
        type: "layout",
        description:
          "Inner frame with horizontal auto-layout, centered alignment, and all visual styling (fill, corner radius, padding)",
        children: [
          {
            name: "icon-16/component (Leading)",
            type: "instance",
            component: "icon-16/component",
            conditional: "Visible when 'Show Leading Icon' is true",
          },
          {
            name: "Button Text",
            type: "text",
            conditional: "Visible when 'Show Text' is true",
          },
          {
            name: "icon-16/component (Trailing)",
            type: "instance",
            component: "icon-16/component",
            conditional: "Visible when 'Show Trailing Icon' is true",
          },
        ],
      },
    ],
  },

  layout: {
    _ButtonMaster: {
      layoutMode: "HORIZONTAL",
      primaryAxisAlignItems: "CENTER",
      counterAxisAlignItems: "CENTER",
      itemSpacing: 8,
      sizingHorizontal: "HUG",
      sizingVertical: "FIXED",
    },
    sizeSpecs: {
      Large: {
        height: 56,
        cornerRadius: 16,
        padding: { top: 16, bottom: 16, left: 24, right: 24 },
        fontSize: 16,
        lineHeight: 20,
      },
      Medium: {
        height: 48,
        cornerRadius: 16,
        padding: { top: 16, bottom: 16, left: 16, right: 16 },
        fontSize: 14,
      },
      Small: {
        height: 40,
        cornerRadius: 16,
        padding: { top: 12, bottom: 12, left: 16, right: 16 },
        fontSize: 12,
      },
      Extrasmall: {
        height: 32,
        cornerRadius: 9999, // pill shape
        padding: { top: 0, bottom: 0, left: 12, right: 12 },
        fontSize: 12,
      },
    },
  },

  designTokens: {
    spacing: {
      itemSpacing: "8px between icon and text",
      "padding-large": "16px vertical, 24px horizontal",
      "padding-medium": "16px vertical, 16px horizontal",
      "padding-small": "12px vertical, 16px horizontal",
      "padding-extrasmall": "0px vertical, 12px horizontal",
    },
    typography: {
      fontFamily: "Tawuniya",
      fontStyle: "Regular",
      sizes: {
        Large: "16px / 20px line-height",
        Medium: "14px",
        Small: "12px",
        Extrasmall: "12px",
      },
    },
    colors: {
      "Primary/Default": {
        fill: "button/fill/brand-primary/active",
        text: "button/text/brand-primary/Invert",
      },
      "Primary/Hover": {
        fill: "button/fill/brand-primary/hover",
        text: "button/text/brand-primary/Invert",
      },
      "Primary/Pressed": {
        fill: "button/fill/brand-primary/pressed",
        text: "button/text/brand-primary/Invert",
      },
      "Primary/Focused": {
        fill: "button/fill/brand-primary/focused",
        text: "button/text/brand-primary/Invert",
      },
      "Primary/Disabled": {
        fill: "button/fill/brand-primary/disabled",
        text: "button/text/brand-primary/disabled",
      },
      "Secondary/Default": {
        fill: "none",
        text: "button/text/brand-secondary/active",
        stroke: "button/border/brand-primary/active",
      },
      "Secondary/Hover": {
        fill: "button/fill/brand-secondary/background",
        text: "button/text/brand-secondary/hover",
        stroke: "button/border/brand-secondary/hover",
      },
      "Secondary/Pressed": {
        fill: "button/fill/brand-secondary/outline-pressed",
        text: "button/text/brand-secondary/pressed",
        stroke: "button/border/brand-secondary/pressed",
      },
      "Secondary/Focused": {
        fill: "none",
        text: "button/text/brand-secondary/focused",
        stroke: "button/border/brand-secondary/focused",
      },
      "Secondary/Disabled": {
        fill: "button/fill/brand-secondary/disabled",
        text: "button/text/brand-secondary/disabled",
        stroke: "button/border/brand-secondary/disabled",
      },
      "Tertiary/Default": {
        fill: "none",
        text: "text/brand-primary/active",
      },
      "Tertiary/Hover": {
        fill: "button/fill/brand-primary/background",
        text: "button/text/brand-primary/hover",
      },
      "Tertiary/Pressed": {
        fill: "button/fill/brand-primary/outline-pressed",
        text: "button/text/brand-primary/pressed",
      },
      "Tertiary/Focused": {
        fill: "none",
        text: "button/text/brand-primary/focused",
      },
      "Tertiary/Disabled": {
        fill: "button/fill/brand-primary/disabled",
        text: "button/text/brand-primary/disabled",
      },
    },
  },

  accessibility: {
    role: "button",
    wcag: "AA",
    keyboardSupport: "Tab to focus, Enter/Space to activate",
    screenReader: "Announced as button with label text; disabled state announced",
    notes: [
      "Disabled state must not be focusable in production",
      "Leading/trailing icons should be decorative (aria-hidden) when text is visible",
      "When 'Show Text' is false, icon must have an accessible label",
    ],
  },

  aiHints: {
    priority: "high",
    keywords: [
      "button",
      "cta",
      "action",
      "submit",
      "click",
      "tap",
      "primary",
      "secondary",
      "tertiary",
    ],
    selectionCriteria: {
      Primary: "Main action the user should take on the screen",
      Secondary:
        "Supporting or alternative action shown alongside a Primary button",
      Tertiary:
        "Low-emphasis actions like cancel, skip, or inline text-style links",
      Large: "Default size for standalone mobile CTAs",
      Medium: "Compact layouts or secondary placements",
      Small: "Constrained spaces like table rows or card footers",
      Extrasmall: "Inline pill-style or tag-like compact actions",
    },
    considerations: [
      "Always pair with at most one Primary per logical section",
      "Use consistent sizing within a button group",
      "Prefer Mobile/Icon Button when no text label is needed",
      "Prefer Mobile/Hyperlink for navigation-style text links",
    ],
  },
};

// -----------------------------------------------------------------------------
// 2. MOBILE/DESTRUCTIVE BUTTON
// -----------------------------------------------------------------------------
export const MobileDestructiveButtonMetadata = {
  component: {
    name: "Mobile/Destructive Button",
    category: "atoms",
    description:
      "Danger-semantics button for destructive actions (delete, remove, revoke). Mirrors Mobile/Button structure with danger color tokens.",
    type: "interactive",
    figmaId: "3359:46234",
    totalVariants: 60,
  },

  usage: {
    useCases: [
      "Delete confirmation dialogs",
      "Remove item from list or cart",
      "Revoke access or permissions",
      "Account deletion or data erasure",
    ],
    commonPatterns: [
      {
        name: "Destructive confirmation",
        description:
          "Destructive Primary paired with a safe Secondary to confirm a dangerous action",
        composition: `<DestructiveButton type="Primary" size="Large">Delete Account</DestructiveButton>\n<Button type="Secondary" size="Large">Cancel</Button>`,
      },
    ],
    antiPatterns: [
      {
        scenario: "Using destructive button for non-destructive negative actions",
        reason: "Red color implies data loss or irreversibility",
        alternative:
          "Use standard Secondary or Tertiary button for cancel/dismiss actions",
      },
    ],
  },

  variants: {
    Type: {
      options: ["Primary", "Secondary", "Tertiary"],
      default: "Primary",
      purpose: {
        Primary: "Prominent destructive action with solid danger fill",
        Secondary: "Outlined destructive action with danger stroke",
        Tertiary: "Text-only destructive action, lowest emphasis",
      },
    },
    Size: {
      options: ["Large", "Medium", "Small", "Extrasmall"],
      default: "Large",
      purpose: {
        Large: "Default destructive CTA (56px height)",
        Medium: "Compact destructive action (48px)",
        Small: "Inline destructive action (40px)",
        Extrasmall: "Pill-style destructive tag (32px)",
      },
    },
    State: {
      options: ["Default", "Hover", "Pressed", "Focused", "Disabled"],
      default: "Default",
      purpose: {
        Default: "Resting state",
        Hover: "Pointer hover",
        Pressed: "Active/tap",
        Focused: "Keyboard focus",
        Disabled: "Non-interactive",
      },
    },
  },

  properties: {
    "Leading Icon": { type: "instance-swap", default: "icon-16/component (Type=Linetone)", description: "Icon before text" },
    "Trailing Icon": { type: "instance-swap", default: "icon-16/component (Type=Line)", description: "Icon after text" },
    "Show Leading Icon": { type: "boolean", default: true, description: "Toggle leading icon" },
    "Show Trailing Icon": { type: "boolean", default: true, description: "Toggle trailing icon" },
  },

  composition: {
    structure: "Identical to Mobile/Button: outer component wraps _Button-Master frame with [icon, text, icon] horizontal layout.",
    children: [
      { name: "_Button-Master", type: "layout", description: "Same structure as Mobile/Button, with danger color tokens" },
    ],
  },

  layout: { note: "Shares identical sizing/layout specs with Mobile/Button (see MobileButtonMetadata.layout)" },

  designTokens: {
    colors: {
      "Primary/Default": { fill: "button/fill/danger/active", text: "button/text/base/default" },
      "Secondary/Default": { fill: "none", text: "button/text/danger/active", stroke: "button/border/danger/active" },
      "Tertiary/Default": { fill: "none", text: "button/text/danger/active" },
    },
    typography: { note: "Same as Mobile/Button (Tawuniya Regular)" },
  },

  accessibility: {
    role: "button",
    wcag: "AA",
    notes: [
      "Danger semantics must be communicated beyond color alone (icon or explicit label like 'Delete')",
      "Consider requiring a confirmation step for destructive Primary actions",
    ],
  },

  aiHints: {
    priority: "medium",
    keywords: ["delete", "remove", "destroy", "danger", "destructive", "revoke", "erase"],
    selectionCriteria: {
      Primary: "Irreversible or high-impact destructive actions requiring clear visual warning",
      Secondary: "Destructive action presented as a secondary option",
      Tertiary: "Low-emphasis destructive text link",
    },
    considerations: [
      "Never use as a generic negative button (use standard Secondary instead)",
      "Always pair with a safe escape option (Cancel/Keep)",
      "Consider confirmation dialogs for Primary destructive actions",
    ],
  },
};

// -----------------------------------------------------------------------------
// 3. MOBILE/SUCCESS BUTTON
// -----------------------------------------------------------------------------
export const MobileSuccessButtonMetadata = {
  component: {
    name: "Mobile/Success Button",
    category: "atoms",
    description:
      "Success-semantics button for positive/confirmatory actions (approve, confirm, complete). Mirrors Mobile/Button structure with success color tokens.",
    type: "interactive",
    figmaId: "3359:47550",
    totalVariants: 60,
  },

  usage: {
    useCases: [
      "Approve or accept actions",
      "Complete or finish workflows",
      "Confirm positive outcomes",
      "Save or publish actions with positive connotation",
    ],
    antiPatterns: [
      {
        scenario: "Using success button as the default CTA",
        reason: "Green semantics imply completion/approval; generic actions should use brand Primary",
        alternative: "Use Mobile/Button Primary for standard CTAs",
      },
    ],
  },

  variants: {
    Type: {
      options: ["Primary", "Secondary", "Tertiary"],
      default: "Primary",
      purpose: {
        Primary: "Prominent success action with solid green fill",
        Secondary: "Outlined success action with green stroke",
        Tertiary: "Text-only success action",
      },
    },
    Size: {
      options: ["Large", "Medium", "Small", "Extrasmall"],
      default: "Large",
      purpose: { Large: "56px", Medium: "48px", Small: "40px", Extrasmall: "32px pill" },
    },
    State: {
      options: ["Default", "Hover", "Pressed", "Focused", "Disabled"],
      default: "Default",
    },
  },

  properties: {
    "Leading Icon": { type: "instance-swap", default: "icon-16/component (Type=Linetone)", description: "Icon before text" },
    "Trailing Icon": { type: "instance-swap", default: "icon-16/component (Type=Line)", description: "Icon after text" },
    "Show Leading Icon": { type: "boolean", default: true, description: "Toggle leading icon" },
    "Show Trailing Icon": { type: "boolean", default: true, description: "Toggle trailing icon" },
  },

  composition: {
    structure: "Identical to Mobile/Button with success color tokens.",
  },

  layout: { note: "Shares identical sizing/layout specs with Mobile/Button" },

  designTokens: {
    colors: {
      "Primary/Default": { fill: "button/fill/success/active", text: "button/text/base/default" },
      "Secondary/Default": { fill: "none", text: "button/text/success/active", stroke: "button/border/success/active" },
      "Tertiary/Default": { fill: "none", text: "button/text/success/active" },
    },
  },

  accessibility: {
    role: "button",
    wcag: "AA",
    notes: ["Success semantics should be reinforced by label text, not color alone"],
  },

  aiHints: {
    priority: "medium",
    keywords: ["approve", "confirm", "complete", "success", "accept", "done", "finish"],
    selectionCriteria: {
      Primary: "Positive confirmatory actions (approve, complete)",
      Secondary: "Secondary positive actions",
      Tertiary: "Low-emphasis positive text action",
    },
    considerations: [
      "Reserve for actions with genuinely positive/success semantics",
      "Do not use as a generic primary CTA replacement",
    ],
  },
};

// -----------------------------------------------------------------------------
// 4. MOBILE/HYPERLINK
// -----------------------------------------------------------------------------
export const MobileHyperlinkMetadata = {
  component: {
    name: "Mobile/Hyperlink",
    category: "atoms",
    description:
      "Text-style link button for navigation or inline actions. No background fill, behaves like a hyperlink with optional leading/trailing icons.",
    type: "interactive",
    figmaId: "3958:12434",
    totalVariants: 15,
  },

  usage: {
    useCases: [
      "Inline navigation links within body text or forms",
      "Tertiary actions like 'Learn more', 'View details', 'Forgot password?'",
      "Breadcrumb or back-navigation links",
    ],
    antiPatterns: [
      {
        scenario: "Using Hyperlink as a primary CTA",
        reason: "No visual weight; users may not recognize it as the main action",
        alternative: "Use Mobile/Button Primary for CTAs",
      },
    ],
  },

  variants: {
    Type: {
      options: ["Default"],
      default: "Default",
      purpose: { Default: "Standard hyperlink appearance" },
    },
    Size: {
      options: ["Large", "Medium", "Extrasmall"],
      default: "Large",
      purpose: {
        Large: "Body-text-sized link (font 16px, height 28px)",
        Medium: "Slightly smaller inline link (font 14px, height 28px)",
        Extrasmall: "Caption-sized link (font 12px, height 20px)",
      },
    },
    State: {
      options: ["Default", "Hover", "Pressed", "Focused", "Disabled"],
      default: "Default",
    },
  },

  properties: {
    "Leading Icon": { type: "instance-swap", default: "icon-16/component (Type=Linetone)", description: "Icon before link text" },
    "Trailing Icon": { type: "instance-swap", default: "icon-16/component (Type=Line)", description: "Icon after link text" },
    "Show Leading Icon": { type: "boolean", default: true, description: "Toggle leading icon" },
    "Show Trailing Icon": { type: "boolean", default: false, description: "Toggle trailing icon (off by default)" },
  },

  composition: {
    structure: "Outer component wraps _Button-Master with horizontal auto-layout: [optional icon, text, optional icon]. No fill, hugs content.",
  },

  layout: {
    layoutMode: "HORIZONTAL",
    sizing: "HUG content (both axes)",
    itemSpacing: 8,
    sizeSpecs: {
      Large: { height: 28, fontSize: 16 },
      Medium: { height: 28, fontSize: 14 },
      Extrasmall: { height: 20, fontSize: 12 },
    },
  },

  designTokens: {
    colors: {
      "Default": { text: "button/text/brand-primary/active" },
    },
    typography: { fontFamily: "Tawuniya", fontStyle: "Regular" },
  },

  accessibility: {
    role: "link",
    wcag: "AA",
    keyboardSupport: "Tab to focus, Enter to activate",
    notes: [
      "Should navigate rather than perform in-page actions (use Tertiary button for actions)",
      "Link text must be descriptive (avoid 'click here')",
    ],
  },

  aiHints: {
    priority: "medium",
    keywords: ["link", "hyperlink", "navigate", "learn more", "view details", "text link"],
    selectionCriteria: {
      Default: "Inline text-style link for navigation or low-emphasis actions",
    },
    considerations: [
      "Use for navigation; use Tertiary button for in-page actions",
      "Trailing icon off by default unlike standard buttons",
    ],
  },
};

// -----------------------------------------------------------------------------
// 5. MOBILE/APPLE PAY BUTTON
// -----------------------------------------------------------------------------
export const MobileApplePayButtonMetadata = {
  component: {
    name: "Mobile/Apple Pay Button",
    category: "atoms",
    description:
      "Apple Pay branded payment button. Fixed-width, single size, single type with standard interaction states.",
    type: "interactive",
    figmaId: "3673:23496",
    totalVariants: 5,
  },

  usage: {
    useCases: [
      "Apple Pay checkout flow",
      "Express payment option on cart or product pages",
    ],
    antiPatterns: [
      {
        scenario: "Customizing the Apple Pay button's branding or layout",
        reason: "Apple brand guidelines prohibit modifications to the Apple Pay mark",
        alternative: "Use the component as-is without visual changes",
      },
    ],
  },

  variants: {
    Type: { options: ["Default"], default: "Default" },
    Size: { options: ["Large"], default: "Large" },
    State: {
      options: ["Default", "Hover", "Pressed", "Focused", "Disabled"],
      default: "Default",
    },
  },

  properties: {},

  composition: {
    structure: "Outer component wraps _Button-Master (361x56) containing a 'Pay' text element with Apple Pay mark.",
  },

  layout: {
    layoutMode: "HORIZONTAL",
    sizing: "FIXED (361 x 56)",
    cornerRadius: 16,
  },

  designTokens: {
    colors: {
      "Default": { fill: "button/fill/base/active" },
    },
  },

  accessibility: {
    role: "button",
    wcag: "AA",
    screenReader: "Announced as 'Pay with Apple Pay'",
    notes: ["Must follow Apple's HIG for Apple Pay buttons"],
  },

  aiHints: {
    priority: "low",
    keywords: ["apple pay", "payment", "checkout", "pay"],
    selectionCriteria: {
      Default: "Apple Pay checkout integration only",
    },
    considerations: [
      "Only use when Apple Pay is a supported payment method",
      "Do not modify branding or add custom icons",
      "Fixed width - does not resize to content",
    ],
  },
};

// -----------------------------------------------------------------------------
// 6. MOBILE/ICON BUTTON
// -----------------------------------------------------------------------------
export const MobileIconButtonMetadata = {
  component: {
    name: "Mobile/Icon Button",
    category: "atoms",
    description:
      "Icon-only button for actions where the icon is self-explanatory (close, menu, search, share). No text label. Brand color tokens.",
    type: "interactive",
    figmaId: "640:326743",
    totalVariants: 60,
  },

  usage: {
    useCases: [
      "Close/dismiss modals and sheets",
      "Navigation bar actions (back, menu, search)",
      "Toolbar actions (share, bookmark, filter)",
      "Inline row actions in lists or tables",
    ],
    antiPatterns: [
      {
        scenario: "Using icon button for actions that need a text label",
        reason: "Icon meaning may be ambiguous without text context",
        alternative: "Use Mobile/Button with icon + text for unclear actions",
      },
    ],
  },

  variants: {
    Type: {
      options: ["Primary", "Secondary", "Tertiary"],
      default: "Primary",
      purpose: {
        Primary: "Prominent icon action with solid brand fill",
        Secondary: "Outlined icon action",
        Tertiary: "Ghost icon action, no fill or border",
      },
    },
    Size: {
      options: ["Large", "Medium", "Small", "Extra Small"],
      default: "Large",
      purpose: {
        Large: "56x56px container, 24px icon",
        Medium: "48x48px container, 24px icon",
        Small: "40x40px container, 16px icon",
        "Extra Small": "32x32px container, 16px icon",
      },
    },
    State: {
      options: ["Default", "Hover", "Pressed", "Focused", "Disabled"],
      default: "Default",
    },
  },

  properties: {
    "Change Icon": {
      type: "instance-swap",
      default: "icon-16/component (Type=Line)",
      description: "The icon displayed inside the button",
    },
  },

  composition: {
    structure: "Outer component wraps _Button-Master with centered auto-layout containing a single icon instance.",
    children: [
      {
        name: "_Button-Master",
        type: "layout",
        children: [
          { name: "icon-16/component", type: "instance", component: "icon-16/component" },
        ],
      },
    ],
  },

  layout: {
    layoutMode: "HORIZONTAL",
    alignment: "CENTER / CENTER",
    cornerRadius: 16,
    sizing: "FIXED (square)",
    sizeSpecs: {
      Large: { width: 56, height: 56, padding: 24, iconSize: 24 },
      Medium: { width: 48, height: 48, padding: 16, iconSize: 24 },
      Small: { width: 40, height: 40, padding: 16, iconSize: 16 },
      "Extra Small": { width: 32, height: 32, padding: 12, iconSize: 16 },
    },
  },

  designTokens: {
    colors: { note: "Shares brand token set with Mobile/Button (see MobileButtonMetadata.designTokens.colors)" },
  },

  accessibility: {
    role: "button",
    wcag: "AA",
    keyboardSupport: "Tab to focus, Enter/Space to activate",
    screenReader: "Must have an accessible label (aria-label) describing the action",
    notes: [
      "Icon-only buttons MUST have aria-label in production",
      "Tooltip recommended on hover for non-obvious icons",
    ],
  },

  aiHints: {
    priority: "high",
    keywords: ["icon button", "close", "menu", "search", "share", "back", "action icon"],
    selectionCriteria: {
      Primary: "Prominent icon actions (FAB-style, primary toolbar actions)",
      Secondary: "Outlined icon actions in headers or toolbars",
      Tertiary: "Ghost icon buttons for subtle inline actions",
      Large: "Standalone icon actions or FAB",
      Medium: "Navigation bar or toolbar icons",
      Small: "List row or card inline actions",
      "Extra Small": "Compact inline actions or tag dismiss buttons",
    },
    considerations: [
      "Always ensure the icon is universally understood or provide a tooltip",
      "Use Mobile/Button with text when the action is ambiguous",
    ],
  },
};

// -----------------------------------------------------------------------------
// 7. MOBILE/DESTRUCTIVE ICON BUTTON
// -----------------------------------------------------------------------------
export const MobileDestructiveIconButtonMetadata = {
  component: {
    name: "Mobile/Destructive Icon Button",
    category: "atoms",
    description:
      "Icon-only button with danger/destructive semantics. Same structure as Mobile/Icon Button with danger color tokens.",
    type: "interactive",
    figmaId: "3359:47105",
    totalVariants: 60,
  },

  usage: {
    useCases: [
      "Delete row action in lists",
      "Remove item icon in cards",
      "Close/dismiss with destructive connotation",
    ],
  },

  variants: {
    Type: { options: ["Primary", "Secondary", "Tertiary"], default: "Primary" },
    Size: { options: ["Large", "Medium", "Small", "Extra Small"], default: "Large" },
    State: { options: ["Default", "Hover", "Pressed", "Focused", "Disabled"], default: "Default" },
  },

  properties: {
    "Change Icon": { type: "instance-swap", default: "icon-16/component (Type=Line)", description: "The destructive action icon" },
  },

  composition: { structure: "Identical to Mobile/Icon Button with danger color tokens." },
  layout: { note: "Shares sizing specs with Mobile/Icon Button" },

  designTokens: {
    colors: { note: "Shares danger token set with Mobile/Destructive Button" },
  },

  accessibility: {
    role: "button",
    wcag: "AA",
    notes: ["aria-label must describe the destructive action (e.g. 'Delete item')"],
  },

  aiHints: {
    priority: "medium",
    keywords: ["delete icon", "remove icon", "trash", "destructive icon"],
    selectionCriteria: {
      Primary: "Prominent destructive icon action (delete, remove)",
      Tertiary: "Subtle inline destructive icon (dismiss, remove tag)",
    },
  },
};

// -----------------------------------------------------------------------------
// 8. MOBILE/SUCCESS ICON BUTTON
// -----------------------------------------------------------------------------
export const MobileSuccessIconButtonMetadata = {
  component: {
    name: "Mobile/Success Icon Button",
    category: "atoms",
    description:
      "Icon-only button with success/positive semantics. Same structure as Mobile/Icon Button with success color tokens.",
    type: "interactive",
    figmaId: "3359:47897",
    totalVariants: 60,
  },

  usage: {
    useCases: [
      "Approve/accept icon action",
      "Check/complete icon in task lists",
      "Positive confirmation icon",
    ],
  },

  variants: {
    Type: { options: ["Primary", "Secondary", "Tertiary"], default: "Primary" },
    Size: { options: ["Large", "Medium", "Small", "Extra Small"], default: "Large" },
    State: { options: ["Default", "Hover", "Pressed", "Focused", "Disabled"], default: "Default" },
  },

  properties: {
    "Change Icon": { type: "instance-swap", default: "icon-16/component (Type=Line)", description: "The success action icon" },
  },

  composition: { structure: "Identical to Mobile/Icon Button with success color tokens." },
  layout: { note: "Shares sizing specs with Mobile/Icon Button" },

  designTokens: {
    colors: { note: "Shares success token set with Mobile/Success Button" },
  },

  accessibility: {
    role: "button",
    wcag: "AA",
    notes: ["aria-label must describe the positive action (e.g. 'Approve request')"],
  },

  aiHints: {
    priority: "low",
    keywords: ["approve icon", "accept icon", "check icon", "success icon"],
    selectionCriteria: {
      Primary: "Prominent positive icon action (approve, accept)",
      Tertiary: "Subtle inline positive icon",
    },
  },
};

// -----------------------------------------------------------------------------
// 9. STANDALONE: MOBILE/ICON BUTTON/SOLID/LARGE/DEFAULT
// -----------------------------------------------------------------------------
export const MobileIconButtonSolidStandaloneMetadata = {
  component: {
    name: "Mobile/Icon Button/Solid/Large/Default",
    category: "atoms",
    description:
      "Standalone single-variant icon button (solid large default). Likely a legacy component or specific-use shortcut outside the main Icon Button component set.",
    type: "interactive",
    figmaId: "891:19230",
    totalVariants: 1,
  },

  properties: {
    "Change Icon": { type: "instance-swap", description: "The icon displayed" },
  },

  layout: { width: 56, height: 56 },

  aiHints: {
    priority: "low",
    keywords: ["solid icon button"],
    considerations: [
      "Prefer Mobile/Icon Button component set for full variant and state coverage",
      "This standalone component may be legacy - verify before using",
    ],
  },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const ButtonPageSummary = {
  pageName: "Button",
  pageId: "159:112453",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 8,
  totalStandaloneComponents: 1,
  totalVariantsAcrossAll: 380,

  componentIndex: [
    { name: "Mobile/Button", id: "640:325167", variants: 60, semantic: "brand" },
    { name: "Mobile/Destructive Button", id: "3359:46234", variants: 60, semantic: "danger" },
    { name: "Mobile/Success Button", id: "3359:47550", variants: 60, semantic: "success" },
    { name: "Mobile/Hyperlink", id: "3958:12434", variants: 15, semantic: "brand" },
    { name: "Mobile/Apple Pay Button", id: "3673:23496", variants: 5, semantic: "neutral" },
    { name: "Mobile/Icon Button", id: "640:326743", variants: 60, semantic: "brand" },
    { name: "Mobile/Destructive Icon Button", id: "3359:47105", variants: 60, semantic: "danger" },
    { name: "Mobile/Success Icon Button", id: "3359:47897", variants: 60, semantic: "success" },
  ],

  sharedPatterns: {
    structure: "All buttons share a wrapper > _Button-Master > [icons, text] pattern",
    sizingScale: "Large (56px) > Medium (48px) > Small (40px) > Extrasmall (32px pill)",
    typeHierarchy: "Primary (filled) > Secondary (outlined) > Tertiary (text-only)",
    stateSet: "Default > Hover > Pressed > Focused > Disabled",
    semanticVariants: "Brand (default) | Destructive (danger) | Success (positive)",
    typography: "Tawuniya Regular across all buttons",
    cornerRadius: "16px standard, 9999px for Extrasmall pill",
    iconSpacing: "8px between icon and text",
  },

  tokenNamespace: {
    fills: "button/fill/{semantic}/{state}",
    text: "button/text/{semantic}/{state}",
    borders: "button/border/{semantic}/{state}",
    semantics: ["brand-primary", "brand-secondary", "danger", "success", "base"],
  },
};
