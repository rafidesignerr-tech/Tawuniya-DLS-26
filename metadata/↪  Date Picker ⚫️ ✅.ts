/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Date Picker" (1277:35371)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Date Picker Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Date Picker" (1277:35371)
// =============================================================================
//
// Documentation:
//   "A datepicker is an input control that allows users to select a date
//    (or date range) from a calendar UI, rather than typing it manually."
//
// =============================================================================

export const MobileDatePickerFieldMetadata = {
  component: {
    name: "Mobile/Date Picker Field",
    category: "molecules",
    description: "Date input field that opens a calendar picker. Supports Default, Opened, Error, Focused, and Disabled states.",
    type: "input",
    figmaId: "1311:62441",
    totalVariants: 5,
  },
  variants: {
    State: { options: ["Date Picker Field", "Opened", "Error", "Focused", "Disabled"], default: "Date Picker Field" },
  },
  aiHints: { priority: "high", keywords: ["date picker", "date field", "date input", "calendar input"] },
};

export const MobileDateToggleFieldMetadata = {
  component: {
    name: "Mobile/Date Toggle Field",
    category: "molecules",
    description: "Date toggle field with Hijri/Gregorian calendar support. 8 variants covering all states and calendar types.",
    type: "input",
    figmaId: "4623:74574",
    totalVariants: 8,
  },
  variants: {
    State: { options: ["Date Picker Field", "Error", "Focused", "Opened", "Filled", "Disabled"], default: "Date Picker Field" },
    Hijri: { options: ["False", "True"], default: "True" },
  },
  aiHints: { priority: "high", keywords: ["date toggle", "hijri date", "gregorian date", "calendar toggle"] },
};

export const MobileDatePickerSheetMetadata = {
  component: {
    name: "Mobile/Date Picker Sheet",
    category: "organisms",
    description: "Calendar sheet overlay for date selection. Supports Day view, Month/Year picker, Hour picker, and One Line modes.",
    type: "overlay",
    figmaId: "1324:73219",
    totalVariants: 4,
  },
  variants: {
    Type: { options: ["Day", "Month/Year", "Hour", "One Line"], default: "Day" },
  },
  aiHints: { priority: "high", keywords: ["date picker sheet", "calendar", "date selector", "calendar sheet"] },
};

export const OneLineNestedMetadata = {
  component: { name: "One Line / Nested", figmaId: "10993:136254", totalVariants: 2, category: "atoms" },
  variants: { Type: { options: ["Hijri", "Gergorian"], default: "Gergorian" } },
};

export const DatePickerAtoms = {
  calendarDayItems: { name: "_Atoms/Date picker calendar day items", figmaId: "1311:61620", totalVariants: 9, states: ["Today", "Selected", "Hover", "Focus", "Day in range", "Day end range", "Previous + Next month day", "Day", "Disabled"] },
  gregorianHijri: { name: "_Atoms/gregorian-hijri", figmaId: "1324:70895", totalVariants: 2, states: ["hijri", "gregorian"] },
  monthPagination: { name: "_Atoms/Date picker month pagination", figmaId: "1311:61639", totalVariants: 4 },
  monthYear: { name: "_Atoms/Date picker month year", figmaId: "1311:61648", totalVariants: 2 },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const DatePickerPageSummary = {
  pageName: "Date Picker",
  pageId: "1277:35371",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 8,
  totalStandaloneComponents: 4,
  totalVariantsAcrossAll: 36,

  componentIndex: [
    { name: "Mobile/Date Picker Field", id: "1311:62441", variants: 5, category: "molecules" },
    { name: "Mobile/Date Toggle Field", id: "4623:74574", variants: 8, category: "molecules" },
    { name: "Mobile/Date Picker Sheet", id: "1324:73219", variants: 4, category: "organisms" },
    { name: "One Line / Nested", id: "10993:136254", variants: 2, category: "atoms" },
    { name: "_Atoms/Date picker calendar day items", id: "1311:61620", variants: 9, category: "atoms" },
    { name: "_Atoms/gregorian-hijri", id: "1324:70895", variants: 2, category: "atoms" },
    { name: "_Atoms/Date picker month pagination", id: "1311:61639", variants: 4, category: "atoms" },
    { name: "_Atoms/Date picker month year", id: "1311:61648", variants: 2, category: "atoms" },
  ],

  calendarSupport: ["Gregorian", "Hijri"],
};
