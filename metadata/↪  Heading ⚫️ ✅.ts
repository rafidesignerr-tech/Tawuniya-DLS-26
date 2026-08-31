/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Heading" (830:8587)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Heading Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Heading" (830:8587)
// =============================================================================
//
// Documentation found on page:
//   "Headings are typographic elements used to organize and structure content
//    hierarchically. They help users understand the layout of information and
//    assist screen readers in navigating a page effectively."
//
// Accessibility notes from page documentation:
//   - Contrast (Minimum) Level AA
//   - Non-text Contrast Level AA
//   - Content on Hover or Focus Level AA
//
// =============================================================================

// -----------------------------------------------------------------------------
// 1. MOBILE/HEADING
// -----------------------------------------------------------------------------
export const MobileHeadingMetadata = {
  component: {
    name: "Mobile/Heading",
    category: "molecules",
    description:
      "Typographic heading component for organizing and structuring content hierarchically across mobile screens. Includes an optional description, optional text button (hyperlink), and optional chevron icon. Five heading levels cover page titles down to footer notes.",
    type: "display",
    figmaId: "830:126921",
    totalVariants: 5,
  },

  usage: {
    useCases: [
      "Page-level title with optional description (Main Page Title)",
      "Section headers within scrollable content (Section Title)",
      "Category grouping labels in grids or lists (Category Title)",
      "Sub-section dividers inside a section (Sub-section Title)",
      "Footer or fine-print annotations (Footer Note)",
    ],
    commonPatterns: [
      {
        name: "Page header with description and action",
        description:
          "Main Page Title with description text and a hyperlink CTA for navigation",
        composition: `<Heading type="Main Page Title" showDescription={true} showTextButton={true} showChevron={true}>\n  Our Products\n</Heading>`,
      },
      {
        name: "Section header with 'View All' link",
        description:
          "Section Title paired with a hyperlink to navigate to a full listing",
        composition: `<Heading type="Section Title" showDescription={false} showTextButton={true} showChevron={true}>\n  Popular Plans\n</Heading>`,
      },
      {
        name: "Simple sub-section label",
        description:
          "Sub-section Title used as a plain label without accessories",
        composition: `<Heading type="Sub-section Title" showDescription={false} showTextButton={false} showChevron={false}>\n  Coverage Details\n</Heading>`,
      },
      {
        name: "Centered footer note",
        description:
          "Footer Note used at the bottom of a page for fine-print or legal copy",
        composition: `<Heading type="Footer Note" showDescription={true}>\n  Terms & Conditions\n</Heading>`,
      },
    ],
    antiPatterns: [
      {
        scenario: "Using Main Page Title for section-level headings",
        reason:
          "32px Light weight is designed for the top-level page title only; using it for sections breaks the visual hierarchy",
        alternative: "Use Section Title (24px Medium) for sections within a page",
      },
      {
        scenario: "Skipping heading levels (e.g. Main Page Title directly to Sub-section Title)",
        reason:
          "Breaks semantic heading hierarchy (h1 > h2 > h3) and harms screen reader navigation",
        alternative:
          "Follow the heading level order: Main Page Title > Section Title > Category Title > Sub-section Title",
      },
      {
        scenario: "Using Sub-section Title or Footer Note as a primary page header",
        reason: "Insufficient visual weight for page-level prominence",
        alternative: "Use Main Page Title for page-level headings",
      },
      {
        scenario: "Enabling chevron/hyperlink on Footer Note",
        reason:
          "Footer Note is a caption-level element; interactive accessories create confusing hierarchy",
        alternative:
          "Use inline hyperlinks within the description text instead, or use a higher heading level",
      },
    ],
  },

  variants: {
    Type: {
      options: [
        "Main Page Title",
        "Section Title",
        "Category Title",
        "Sub-section Title",
        "Footer Note",
      ],
      default: "Main Page Title",
      purpose: {
        "Main Page Title":
          "Top-level page heading (h1). Largest and lightest weight. 32px Tawuniya Light, left-aligned, with optional chevron icon button and hyperlink.",
        "Section Title":
          "Primary content section heading (h2). 24px Tawuniya Medium, left-aligned, with optional chevron icon button and hyperlink.",
        "Category Title":
          "Category or group heading within a section (h3). 20px Tawuniya Medium, left-aligned, with optional chevron icon button and hyperlink.",
        "Sub-section Title":
          "Minor sub-section heading (h4). 16px Tawuniya Medium, left-aligned. No chevron or hyperlink — text only with optional description.",
        "Footer Note":
          "Footer-level annotation or fine-print heading (h5/h6). 14px Tawuniya Medium, center-aligned. No chevron or hyperlink. Description uses tertiary text color.",
      },
      details: {
        "Main Page Title": {
          fontSize: 32,
          fontWeight: "Light",
          lineHeight: "40px",
          titleColor: "text/base/primary",
          alignment: "LEFT",
          hasChevron: true,
          hasHyperlink: true,
          height: 80,
        },
        "Section Title": {
          fontSize: 24,
          fontWeight: "Medium",
          lineHeight: "30px",
          titleColor: "text/base/primary",
          alignment: "LEFT",
          hasChevron: true,
          hasHyperlink: true,
          height: 72,
        },
        "Category Title": {
          fontSize: 20,
          fontWeight: "Medium",
          lineHeight: "26px",
          titleColor: "text/base/primary",
          alignment: "LEFT",
          hasChevron: true,
          hasHyperlink: true,
          height: 72,
        },
        "Sub-section Title": {
          fontSize: 16,
          fontWeight: "Medium",
          lineHeight: "20px",
          titleColor: "text/base/primary",
          alignment: "LEFT",
          hasChevron: false,
          hasHyperlink: false,
          height: 60,
        },
        "Footer Note": {
          fontSize: 14,
          fontWeight: "Medium",
          lineHeight: "18px",
          titleColor: "text/base/secondary",
          alignment: "LEFT (title) / CENTER (description)",
          hasChevron: false,
          hasHyperlink: false,
          height: 58,
        },
      },
    },
  },

  properties: {
    "Show description": {
      type: "boolean",
      default: true,
      description:
        "Toggle visibility of the description text below the title. When hidden, only the title row is shown.",
    },
    "Show Text Button": {
      type: "boolean",
      default: true,
      description:
        "Toggle visibility of the hyperlink action (e.g. 'View All') to the right of the title. Only applicable on Main Page Title, Section Title, and Category Title.",
    },
    "Show Chevron": {
      type: "boolean",
      default: true,
      description:
        "Toggle visibility of the chevron icon button to the right of the title text. Only applicable on Main Page Title, Section Title, and Category Title.",
    },
  },

  composition: {
    structure:
      "Outer COMPONENT with vertical auto-layout wraps a 'Title and Desc' frame containing a 'Title and Chevron' row and an optional description text node.",
    children: [
      {
        name: "Title and Desc",
        type: "layout",
        description:
          "Vertical auto-layout frame containing the title row and description text. itemSpacing: 4px.",
        children: [
          {
            name: "Title and Chevron",
            type: "layout",
            description:
              "Horizontal auto-layout row containing the title text frame, optional chevron icon button, and optional hyperlink.",
            children: [
              {
                name: "Frame (title text wrapper)",
                type: "layout",
                description:
                  "Horizontal frame wrapping the title TEXT node. itemSpacing: 4px.",
                children: [
                  {
                    name: "Our products (title text)",
                    type: "text",
                    description: "The heading title text node",
                  },
                ],
              },
              {
                name: "Mobile/Icon Button",
                type: "instance",
                component: "Mobile/Icon Button (Type=Tertiary, Size=Extra Small)",
                conditional:
                  "Present on Main Page Title, Section Title, Category Title. Controlled by 'Show Chevron'.",
              },
              {
                name: "Mobile/Hyperlink",
                type: "instance",
                component: "Mobile/Hyperlink (Type=Default, Size=Medium)",
                conditional:
                  "Present on Main Page Title, Section Title, Category Title. Controlled by 'Show Text Button'.",
              },
            ],
          },
          {
            name: "Description text",
            type: "text",
            conditional: "Visible when 'Show description' is true",
            description:
              "Supporting description text below the title. 14px Tawuniya Regular.",
          },
        ],
      },
    ],
  },

  layout: {
    outerComponent: {
      layoutMode: "VERTICAL",
      primaryAxisAlignItems: "MIN",
      counterAxisAlignItems: "MIN",
      layoutSizingHorizontal: "FILL",
      layoutSizingVertical: "HUG",
      itemSpacing: 4,
      padding: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    titleAndDescFrame: {
      layoutMode: "VERTICAL",
      itemSpacing: 4,
    },
    titleAndChevronRow: {
      layoutMode: "HORIZONTAL",
      note: "Space-between layout achieved via itemSpacing pushing hyperlink/chevron to the right",
    },
    footerNoteOverride: {
      primaryAxisAlignItems: "CENTER",
      counterAxisAlignItems: "CENTER",
      note: "Footer Note variant centers its content unlike other variants which are left-aligned",
    },
  },

  designTokens: {
    spacing: {
      titleToDescription: "4px (itemSpacing between title row and description)",
      titleToChevron: "4px (itemSpacing within title text frame)",
    },
    typography: {
      fontFamily: "Tawuniya",
      title: {
        "Main Page Title": {
          style: "Light",
          fontSize: "32px",
          lineHeight: "40px",
        },
        "Section Title": {
          style: "Medium",
          fontSize: "24px",
          lineHeight: "30px",
        },
        "Category Title": {
          style: "Medium",
          fontSize: "20px",
          lineHeight: "26px",
        },
        "Sub-section Title": {
          style: "Medium",
          fontSize: "16px",
          lineHeight: "20px",
        },
        "Footer Note": {
          style: "Medium",
          fontSize: "14px",
          lineHeight: "18px",
        },
      },
      description: {
        allVariants: {
          style: "Regular",
          fontSize: "14px",
          lineHeight: "18px",
        },
      },
    },
    colors: {
      title: {
        "Main Page Title": "text/base/primary",
        "Section Title": "text/base/primary",
        "Category Title": "text/base/primary",
        "Sub-section Title": "text/base/primary",
        "Footer Note": "text/base/secondary",
      },
      description: {
        default: "text/base/secondary",
        footerNote: "text/base/tertiary",
      },
    },
  },

  accessibility: {
    role: "heading",
    wcag: "AA",
    keyboardSupport:
      "Tab to focus interactive elements (chevron icon button and hyperlink) within the heading row",
    screenReader:
      "Heading announced with appropriate level (h1–h5 depending on Type). Description text announced as associated content.",
    notes: [
      "Contrast (Minimum) Level AA — verified per page documentation",
      "Non-text Contrast Level AA — verified per page documentation",
      "Content on Hover or Focus Level AA — verified per page documentation",
      "Heading levels must follow semantic order (h1 > h2 > h3 > h4) — do not skip levels",
      "Main Page Title maps to h1, Section Title to h2, Category Title to h3, Sub-section Title to h4, Footer Note to h5/h6",
      "Only one Main Page Title (h1) per page for proper document outline",
      "Interactive children (chevron, hyperlink) must be independently focusable",
    ],
  },

  aiHints: {
    priority: "high",
    keywords: [
      "heading",
      "title",
      "section header",
      "page title",
      "category title",
      "sub-section",
      "footer note",
      "h1",
      "h2",
      "h3",
      "h4",
      "typography",
      "content hierarchy",
    ],
    selectionCriteria: {
      "Main Page Title":
        "Top of a page or screen. The largest heading. Use exactly once per page. Maps to h1.",
      "Section Title":
        "Primary content sections within a page (e.g. 'Our Products', 'Popular Plans'). Maps to h2.",
      "Category Title":
        "Category groupings within a section (e.g. product categories, filter groups). Maps to h3.",
      "Sub-section Title":
        "Minor divisions within a category or section. No interactive accessories. Maps to h4.",
      "Footer Note":
        "Bottom-of-page annotations, disclaimers, or fine-print. Center-aligned. Maps to h5/h6.",
    },
    considerations: [
      "Follow semantic heading hierarchy — never skip levels",
      "Only one Main Page Title (h1) per page",
      "Sub-section Title and Footer Note do NOT support chevron or hyperlink — use a higher level if you need interactive accessories",
      "Footer Note uses center alignment and tertiary color — distinct from all other variants",
      "Main Page Title uses Light weight (thinner) while all other levels use Medium weight",
      "Description text is always 14px Regular regardless of heading level",
      "The component fills its container width (layoutSizingHorizontal: FILL) — it stretches to the parent's width",
    ],
  },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const HeadingPageSummary = {
  pageName: "Heading",
  pageId: "830:8587",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 1,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 5,

  componentIndex: [
    {
      name: "Mobile/Heading",
      id: "830:126921",
      variants: 5,
      category: "molecules",
    },
  ],

  documentationNotes: {
    definition:
      "Headings are typographic elements used to organize and structure content hierarchically. They help users understand the layout of information and assist screen readers in navigating a page effectively.",
    accessibilityCompliance: [
      "Contrast (Minimum) Level AA",
      "Non-text Contrast Level AA",
      "Content on Hover or Focus Level AA",
    ],
    status: "Base component designed",
  },

  typographyScale: {
    "Main Page Title": "32px / 40px — Tawuniya Light",
    "Section Title": "24px / 30px — Tawuniya Medium",
    "Category Title": "20px / 26px — Tawuniya Medium",
    "Sub-section Title": "16px / 20px — Tawuniya Medium",
    "Footer Note": "14px / 18px — Tawuniya Medium",
    description: "14px / 18px — Tawuniya Regular (all variants)",
  },

  colorTokens: {
    titlePrimary: "text/base/primary (Main Page Title through Sub-section Title)",
    titleSecondary: "text/base/secondary (Footer Note title)",
    descriptionSecondary: "text/base/secondary (all variants except Footer Note)",
    descriptionTertiary: "text/base/tertiary (Footer Note description)",
  },

  nestedComponents: [
    {
      name: "Mobile/Icon Button",
      usage: "Chevron/expand icon (Tertiary, Extra Small)",
      presentIn: ["Main Page Title", "Section Title", "Category Title"],
    },
    {
      name: "Mobile/Hyperlink",
      usage: "Text action link (Default, Medium) e.g. 'View All'",
      presentIn: ["Main Page Title", "Section Title", "Category Title"],
    },
  ],

  headingHierarchy: {
    "Main Page Title": { semanticLevel: "h1", maxPerPage: 1 },
    "Section Title": { semanticLevel: "h2", maxPerPage: "unlimited" },
    "Category Title": { semanticLevel: "h3", maxPerPage: "unlimited" },
    "Sub-section Title": { semanticLevel: "h4", maxPerPage: "unlimited" },
    "Footer Note": { semanticLevel: "h5/h6", maxPerPage: "unlimited" },
  },
};
