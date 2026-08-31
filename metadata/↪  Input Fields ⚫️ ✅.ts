/**
 * Tawuniya DLS 4.0 — Component Metadata
 * Page: "Input Fields" (160:112457)
 * Figma file: ydDjnPsHFoe8baKAw1w9eY
 * Generated: 2026-08-30
 */

// =============================================================================
// Input Fields Page Component Metadata
// Generated from Figma file: ydDjnPsHFoe8baKAw1w9eY
// Page: "Input Fields" (160:112457)
// =============================================================================
//
// Documentation found on page:
//   "Input fields are interactive elements that allow users to enter and edit
//    text or data. They are fundamental components in forms and user interfaces,
//    enabling users to provide information such as names, email addresses,
//    passwords, and other relevant data."
//
//   Design notes: "Inner label as default label style.
//    Icons with hint/support text are removed."
//
// =============================================================================

// -----------------------------------------------------------------------------
// 1. MOBILE/GENERAL INPUT FIELD
// -----------------------------------------------------------------------------
export const MobileGeneralInputFieldMetadata = {
  component: {
    name: "Mobile/General Input Field",
    category: "molecules",
    description:
      "General-purpose single-line text input for forms. Supports inner and outer labels, optional/mandatory indicators, leading/trailing icons, hint messages, error/success feedback, and a calendar toggle. The foundational input component from which specialized fields derive their pattern.",
    type: "form",
    figmaId: "307:36125",
    totalVariants: 7,
  },

  usage: {
    useCases: [
      "Name, email, address, and other free-text form fields",
      "Search input with leading icon",
      "Date input with calendar toggle",
      "Any single-line data entry with validation feedback",
    ],
    commonPatterns: [
      {
        name: "Basic labeled input with hint",
        description: "Inner label with optional message hint below",
        composition: `<GeneralInputField state="Default" labelInside={true} optionalMessage={true} />`,
      },
      {
        name: "Required field with outer label",
        description: "Outer label with mandatory indicator",
        composition: `<GeneralInputField state="Default" labelOutside={true} mandatory={true} />`,
      },
      {
        name: "Error state with message",
        description: "Field showing validation error with error message below",
        composition: `<GeneralInputField state="Error Filled" />`,
      },
    ],
    antiPatterns: [
      {
        scenario: "Using General Input Field for multi-line text",
        reason: "Single-line input truncates content; users cannot see full text",
        alternative: "Use Mobile/Text Area for multi-line content",
      },
      {
        scenario: "Using General Input Field for passwords",
        reason: "Missing show/hide toggle for password visibility",
        alternative: "Use Mobile/Password Field with built-in visibility toggle",
      },
      {
        scenario: "Using General Input Field for phone numbers",
        reason: "Missing country code prefix dropdown",
        alternative: "Use Mobile/Phone Number Field with prefix selector",
      },
    ],
  },

  variants: {
    State: {
      options: ["Default", "Typing", "Filled", "Focused", "Error Filled", "Success Filled", "Disabled"],
      default: "Default",
      purpose: {
        Default: "Empty resting state with inner label visible as placeholder",
        Typing: "Active text entry with cursor; inner label floats up, input text visible. Border uses brand-primary/focused.",
        Filled: "Input completed with value displayed; label floated above value",
        Focused: "Focused but not yet typing; double-border treatment (outer focus ring + inner border)",
        "Error Filled": "Validation failed; red error border + error message visible below. Error text uses text/feedback/error.",
        "Success Filled": "Validation passed; green success border + success message visible below. Success text uses text/feedback/success.",
        Disabled: "Non-interactive; background uses fill/base/disabled, text uses text/base/disabled",
      },
    },
  },

  properties: {
    "Input Content": { type: "string", default: "Inpu|", description: "Placeholder/typing cursor text for the input" },
    "Input content filled": { type: "string", default: "Input", description: "The filled/completed input value" },
    "Label Name": { type: "string", default: "Label Name", description: "Label text for the input field" },
    "Label Inside": { type: "boolean", default: true, description: "Show label inside the input field (floats up on focus/fill)" },
    "Label Outside": { type: "boolean", default: false, description: "Show label above the input field as a static label" },
    "Optional Message": { type: "boolean", default: true, description: "Show hint/helper message below the input" },
    "O/M Content": { type: "string", default: "Optional Message / Hint", description: "Helper message text content" },
    "E/M Content": { type: "string", default: "Error Message", description: "Error message text content (shown in Error Filled state)" },
    "Leading Icon": { type: "boolean", default: false, description: "Show icon on the left side of input" },
    "Change Leading Icon": { type: "instance-swap", default: "icon component", description: "Swap the leading icon instance" },
    "Trailing Icon": { type: "boolean", default: true, description: "Show icon button on the right side (clear/action)" },
    "*mandatory": { type: "boolean", default: false, description: "Show mandatory/required indicator (*)" },
    "Calendar Toggle": { type: "boolean", default: false, description: "Show calendar date-picker toggle button" },
  },

  composition: {
    structure:
      "Vertical auto-layout: optional outer [Label and Requirement] → main content frame containing [Input field (56px height) → optional Invalid input message → optional Optional Message hint].",
    children: [
      {
        name: "Label and Requirement (outer label)",
        type: "layout",
        conditional: "Visible when 'Label Outside' is true",
        children: [
          { name: "User Details Label", type: "text", description: "12px Tawuniya Medium, text/base/tertiary" },
          { name: "*Mandatory", type: "instance", conditional: "Visible when '*mandatory' is true" },
        ],
      },
      {
        name: "Main content frame",
        type: "layout",
        description: "Vertical auto-layout, itemSpacing: 8px",
        children: [
          {
            name: "Input field",
            type: "layout",
            description: "Horizontal auto-layout, 56px height, cornerRadius: 8px, padding: 12px top/bottom, 12px left, 4px right. 1px inside stroke.",
            children: [
              { name: "icon-24/component (Leading)", type: "instance", conditional: "Visible when 'Leading Icon' is true" },
              {
                name: "I/F content",
                type: "layout",
                description: "Vertical auto-layout containing inner label + input text",
                children: [
                  {
                    name: "Label and Requirement (inner)",
                    type: "layout",
                    description: "Inner label row with optional mandatory indicator",
                    children: [
                      { name: "User Details Label", type: "text", description: "12px Tawuniya Medium, text/base/tertiary" },
                    ],
                  },
                  { name: "Input User Details", type: "text", description: "14px Tawuniya Medium. Hidden in Default, visible when typing/filled." },
                ],
              },
              { name: "Mobile/Toggle", type: "instance", conditional: "Hidden by default (calendar toggle)" },
              { name: "Mobile/Icon Button", type: "instance", component: "Mobile/Icon Button (Tertiary, Medium)", description: "Trailing action button (clear, etc.)" },
            ],
          },
          {
            name: "Invalid input",
            type: "layout",
            conditional: "Visible in Error Filled and Success Filled states",
            children: [
              { name: "icon-16/info-circle", type: "instance" },
              { name: "Error/Success Message", type: "text", description: "12px Tawuniya Regular" },
            ],
          },
          {
            name: "Optional Message",
            type: "layout",
            conditional: "Visible when 'Optional Message' is true (hidden in Error/Success states)",
            children: [
              { name: "icon-16/info-circle", type: "instance" },
              { name: "Optional Message / Hint", type: "text", description: "12px Tawuniya Regular, text/base/secondary" },
            ],
          },
        ],
      },
    ],
  },

  layout: {
    outerComponent: {
      layoutMode: "VERTICAL",
      layoutSizingHorizontal: "FIXED",
      layoutSizingVertical: "HUG",
      itemSpacing: 4,
      width: 361,
    },
    inputField: {
      layoutMode: "HORIZONTAL",
      height: 56,
      cornerRadius: 8,
      padding: { top: 12, bottom: 12, left: 12, right: 4 },
      itemSpacing: 8,
      strokeWeight: 1,
      strokeAlign: "INSIDE",
    },
    contentFrame: {
      layoutMode: "VERTICAL",
      itemSpacing: 8,
    },
  },

  designTokens: {
    spacing: {
      outerLabelToField: "4px",
      fieldToMessage: "8px",
      innerLabelToInput: "4px",
      iconToContent: "8px",
      inputFieldPadding: "12px top/bottom, 12px left, 4px right",
    },
    typography: {
      fontFamily: "Tawuniya",
      outerLabel: { style: "Medium", fontSize: "12px", color: "text/base/tertiary" },
      innerLabel: { style: "Medium", fontSize: "12px", color: "text/base/tertiary" },
      inputText: { style: "Medium", fontSize: "14px", colorDefault: "text/base/secondary", colorTyping: "text/base/primary" },
      hintMessage: { style: "Regular", fontSize: "12px", color: "text/base/secondary" },
      errorMessage: { style: "Regular", fontSize: "12px", color: "text/feedback/error" },
      successMessage: { style: "Regular", fontSize: "12px", color: "text/feedback/success" },
    },
    colors: {
      inputField: {
        Default: { fill: "background/secondary", stroke: "border/base/tertiary" },
        Typing: { fill: "background/secondary", stroke: "button/border/brand-primary/focused" },
        Filled: { fill: "background/secondary", stroke: "border/base/tertiary" },
        Focused: { fill: "background/secondary", stroke: "border/base/tertiary", outerStroke: "border/base/focused" },
        "Error Filled": { fill: "background/secondary", stroke: "fill/feedback/error" },
        "Success Filled": { fill: "background/secondary", stroke: "fill/feedback/success" },
        Disabled: { fill: "fill/base/disabled", stroke: "border/base/tertiary" },
      },
      hintText: "text/base/secondary",
      disabledText: "text/base/disabled",
    },
  },

  accessibility: {
    role: "textbox",
    wcag: "AA",
    keyboardSupport: "Tab to focus, type to enter text, Tab to move to next field",
    screenReader: "Label announced on focus; error/success messages announced as live regions",
    notes: [
      "Contrast (Minimum) Level AA",
      "Non-text Contrast Level AA",
      "Content on Hover or Focus Level AA",
      "Inner label must remain visible as a floating label when input has value",
      "Error messages must be programmatically associated with the input",
      "Disabled state must not be focusable",
      "Mandatory indicator must be announced by screen readers",
    ],
  },

  aiHints: {
    priority: "high",
    keywords: ["input", "text field", "form field", "text input", "name", "email", "address", "search"],
    selectionCriteria: {
      Default: "Empty input awaiting user interaction",
      Typing: "User is actively entering text",
      Filled: "Input has been completed with a value",
      Focused: "Input has keyboard focus but no typing yet",
      "Error Filled": "Input value failed validation",
      "Success Filled": "Input value passed validation",
      Disabled: "Input is not interactive",
    },
    considerations: [
      "Use specialized field variants for passwords, phone numbers, currency, and OTP",
      "Inner label is the default label style — use outer label only when design requires it",
      "Always provide error messages for Error Filled state",
      "Consider hint text to guide users on expected input format",
    ],
  },
};

// -----------------------------------------------------------------------------
// 2. MOBILE/PASSWORD FIELD
// -----------------------------------------------------------------------------
export const MobilePasswordFieldMetadata = {
  component: {
    name: "Mobile/Password Field",
    category: "molecules",
    description:
      "Password input field with built-in show/hide visibility toggle. Specialized variant of the input field pattern for secure text entry.",
    type: "form",
    figmaId: "921:41607",
    totalVariants: 8,
  },

  usage: {
    useCases: [
      "Login password entry",
      "Registration password creation",
      "Change/reset password forms",
    ],
    antiPatterns: [
      {
        scenario: "Using General Input Field for passwords",
        reason: "No visibility toggle; users can't verify their input",
        alternative: "Always use Password Field for password entry",
      },
    ],
  },

  variants: {
    State: {
      options: ["Password Field", "Typing", "Filled", "Focused", "Error Filled", "Success Filled", "Disabled", "Password Visible"],
      default: "Password Field",
      purpose: {
        "Password Field": "Default empty state with masked input",
        Typing: "User actively entering password (masked)",
        Filled: "Password entered and masked",
        Focused: "Input has focus, awaiting entry",
        "Error Filled": "Password validation failed",
        "Success Filled": "Password validation passed",
        Disabled: "Non-interactive password field",
        "Password Visible": "Password text shown in plain text (toggle activated)",
      },
    },
  },

  properties: {},

  composition: {
    structure: "Same as General Input Field with a trailing show/hide toggle button instead of generic trailing icon.",
  },

  accessibility: {
    role: "textbox",
    wcag: "AA",
    notes: [
      "Input type must be 'password' with toggle to switch to 'text'",
      "Show/hide toggle must be announced by screen readers",
      "Password requirements should be communicated via hint text",
    ],
  },

  aiHints: {
    priority: "high",
    keywords: ["password", "secret", "login", "secure", "pin"],
    selectionCriteria: {
      "Password Field": "Default masked password entry",
      "Password Visible": "User has toggled password visibility on",
    },
  },
};

// -----------------------------------------------------------------------------
// 3. MOBILE/TEXT AREA
// -----------------------------------------------------------------------------
export const MobileTextAreaMetadata = {
  component: {
    name: "Mobile/Text Area",
    category: "molecules",
    description:
      "Multi-line text input for longer free-form content such as comments, messages, or descriptions. Unlike single-line inputs, it expands vertically to accommodate larger content.",
    type: "form",
    figmaId: "3566:36877",
    totalVariants: 7,
  },

  usage: {
    useCases: [
      "Comment or feedback forms",
      "Message composition",
      "Descriptions and notes",
      "Medical notes or incident reports",
    ],
    antiPatterns: [
      {
        scenario: "Using Text Area for short single-line inputs",
        reason: "Wastes vertical space; visual mismatch with other form fields",
        alternative: "Use General Input Field for single-line content",
      },
    ],
  },

  variants: {
    State: {
      options: ["Default", "Typing", "Filled", "Focused", "Error Filled", "Success Filled", "Disabled"],
      default: "Default",
      purpose: {
        Default: "Empty multi-line input",
        Typing: "User actively entering text",
        Filled: "Text area has content",
        Focused: "Focused awaiting input",
        "Error Filled": "Validation failed",
        "Success Filled": "Validation passed",
        Disabled: "Non-interactive",
      },
    },
  },

  properties: {
    "Input Content": { type: "string", default: "Patient sustained a right forearm fracture after slippi|", description: "Multi-line input text" },
    "Optional Message": { type: "boolean", default: true, description: "Show hint below" },
    "Label Outside": { type: "boolean", default: false, description: "Outer label" },
    "Label Inside": { type: "boolean", default: true, description: "Inner floating label" },
    "Label Name": { type: "string", default: "Label Name", description: "Label text" },
    "O/M Content": { type: "string", default: "Optional Message / Hint", description: "Helper text" },
    "E/M Content": { type: "string", default: "Error Message", description: "Error text" },
    "Trailing Icon": { type: "boolean", default: false, description: "Trailing icon (off by default for text areas)" },
    "Leading Icon": { type: "boolean", default: false, description: "Leading icon (off by default)" },
    "Change Leading Icon": { type: "instance-swap", default: "icon component", description: "Swap leading icon" },
    "*mandatory": { type: "boolean", default: false, description: "Required indicator" },
  },

  accessibility: {
    role: "textbox",
    wcag: "AA",
    notes: ["Must support multiline attribute", "Character count or limits should be communicated"],
  },

  aiHints: {
    priority: "medium",
    keywords: ["textarea", "multi-line", "comment", "message", "description", "notes", "long text"],
    selectionCriteria: {
      Default: "Multi-line text entry needed",
    },
  },
};

// -----------------------------------------------------------------------------
// 4. MOBILE/CURRENCY FIELD
// -----------------------------------------------------------------------------
export const MobileCurrencyFieldMetadata = {
  component: {
    name: "Mobile/Currency Field",
    category: "molecules",
    description:
      "Currency amount input field with integrated currency type dropdown (SAR/USD). Specialized for monetary value entry with proper formatting.",
    type: "form",
    figmaId: "911:35540",
    totalVariants: 7,
  },

  usage: {
    useCases: [
      "Payment amount entry",
      "Insurance premium input",
      "Transfer amount fields",
      "Price/cost entry forms",
    ],
    antiPatterns: [
      {
        scenario: "Using General Input Field for currency amounts",
        reason: "Missing currency prefix dropdown and formatting",
        alternative: "Use Currency Field for all monetary inputs",
      },
    ],
  },

  variants: {
    State: {
      options: ["Default", "Typing", "Filled", "Focused", "Error Filled", "Success Filled", "Disabled"],
      default: "Default",
    },
  },

  properties: {
    "Input Content": { type: "string", default: "Inpu|", description: "Currency amount text" },
    "Optional Message": { type: "boolean", default: true, description: "Show hint" },
    "Label Outside": { type: "boolean", default: false, description: "Outer label" },
    "Label Inside": { type: "boolean", default: true, description: "Inner label" },
    "Label Name": { type: "string", default: "Label Name", description: "Label text" },
    "O/M Content": { type: "string", default: "Optional Message / Hint", description: "Helper text" },
    "E/M Content": { type: "string", default: "Error Message", description: "Error text" },
    "Leading Icon": { type: "boolean", default: false, description: "Leading icon" },
    "Change Leading Icon": { type: "instance-swap", default: "icon component", description: "Swap leading icon" },
    "*mandatory": { type: "boolean", default: false, description: "Required indicator" },
  },

  composition: {
    structure: "Same as General Input Field with a Currency Dropdown atom integrated as a prefix showing the selected currency (SAR/USD).",
    nestedComponents: [
      { name: "Currency Dropdown", figmaId: "921:39620", description: "Currency type selector (Default, Focused, Disabled, Expanded states)" },
      { name: "Currency icon", figmaId: "9795:12735", description: "Currency symbol icon (Riyal or Dollar)" },
    ],
  },

  accessibility: {
    role: "textbox",
    wcag: "AA",
    notes: ["Currency symbol must be announced", "Input should accept numeric values only"],
  },

  aiHints: {
    priority: "medium",
    keywords: ["currency", "money", "amount", "payment", "price", "SAR", "USD", "riyal"],
    selectionCriteria: {
      Default: "Monetary value entry with currency prefix",
    },
  },
};

// -----------------------------------------------------------------------------
// 5. MOBILE/COUNTER FIELD
// -----------------------------------------------------------------------------
export const MobileCounterFieldMetadata = {
  component: {
    name: "Mobile/Counter Field",
    category: "molecules",
    description:
      "Numeric input with increment/decrement buttons for adjusting quantities or values within a range. Available in Primary Fill and Secondary Fill styles.",
    type: "form",
    figmaId: "3550:18584",
    totalVariants: 14, // 7 states x 2 styles
  },

  usage: {
    useCases: [
      "Quantity selection (shopping cart, insurance dependents)",
      "Numeric value adjustment within a range",
      "Unit/amount counters",
    ],
    antiPatterns: [
      {
        scenario: "Using Counter Field for free-form numeric input",
        reason: "Counter is designed for bounded increments, not arbitrary numbers",
        alternative: "Use General Input Field with numeric keyboard for free-form numbers",
      },
    ],
  },

  variants: {
    State: {
      options: ["Default", "Typing", "Filled", "Focused", "Error Filled", "Success Filled", "Disabled"],
      default: "Default",
    },
    Style: {
      options: ["Primary Fill", "Secondary Fill"],
      default: "Secondary Fill",
      purpose: {
        "Primary Fill": "Prominent counter with filled increment/decrement buttons",
        "Secondary Fill": "Subtle counter with secondary-styled buttons",
      },
    },
  },

  properties: {
    "Input Content": { type: "string", default: "1|", description: "Counter value" },
    "Label Name": { type: "string", default: "Amount", description: "Label text" },
    "Optional Message": { type: "boolean", default: true, description: "Show hint" },
    "Label Outside": { type: "boolean", default: false, description: "Outer label" },
    "Label Inside": { type: "boolean", default: true, description: "Inner label" },
    "O/M Content": { type: "string", default: "Optional Message / Hint", description: "Helper text" },
    "E/M Content": { type: "string", default: "Error Message", description: "Error text" },
    "Leading Icon": { type: "boolean", default: false, description: "Leading icon" },
    "Change Leading Icon": { type: "instance-swap", default: "icon component", description: "Swap leading icon" },
    "*mandatory": { type: "boolean", default: false, description: "Required indicator" },
  },

  accessibility: {
    role: "spinbutton",
    wcag: "AA",
    keyboardSupport: "Arrow Up/Down to increment/decrement, direct numeric entry",
    notes: ["Min/max bounds must be communicated", "Current value must be announced"],
  },

  aiHints: {
    priority: "medium",
    keywords: ["counter", "stepper", "increment", "decrement", "quantity", "amount", "plus minus"],
    selectionCriteria: {
      "Primary Fill": "Prominent counter in forms",
      "Secondary Fill": "Subtle counter for secondary placement",
    },
  },
};

// -----------------------------------------------------------------------------
// 6. MOBILE/PHONE NUMBER FIELD
// -----------------------------------------------------------------------------
export const MobilePhoneNumberFieldMetadata = {
  component: {
    name: "Mobile/Phone Number Field",
    category: "molecules",
    description:
      "Phone number input with integrated country code prefix dropdown. Two component sets exist: one with 8 states (including State8) at 921:40276, and one with 7 standard states at 16873:3894.",
    type: "form",
    figmaIds: ["921:40276", "16873:3894"],
    totalVariants: 15, // 8 + 7
  },

  usage: {
    useCases: [
      "Registration phone number entry",
      "Contact information forms",
      "OTP delivery number input",
      "Emergency contact fields",
    ],
    antiPatterns: [
      {
        scenario: "Using General Input Field for phone numbers",
        reason: "Missing country code prefix selector",
        alternative: "Use Phone Number Field with built-in prefix dropdown",
      },
    ],
  },

  variants: {
    State: {
      options: ["Default", "Typing", "Filled", "Focused", "Error Filled", "Success Filled", "Disabled"],
      default: "Default",
    },
  },

  properties: {
    "Input Content": { type: "string", default: "Inpu|", description: "Phone number text" },
    "Label Name": { type: "string", default: "Phone Number", description: "Label text" },
    "Optional Message": { type: "boolean", default: true, description: "Show hint" },
    "Label Outside": { type: "boolean", default: false, description: "Outer label" },
    "Label Inside": { type: "boolean", default: true, description: "Inner label" },
    "O/M Content": { type: "string", default: "Optional Message / Hint", description: "Helper text" },
    "E/M Content": { type: "string", default: "Error Message", description: "Error text" },
    "Leading Icon": { type: "boolean", default: false, description: "Leading icon" },
    "Trailing Icon": { type: "boolean", default: false, description: "Trailing icon" },
    "Change Leading Icon": { type: "instance-swap", default: "icon component", description: "Swap leading icon" },
    "*mandatory": { type: "boolean", default: false, description: "Required indicator" },
  },

  composition: {
    nestedComponents: [
      { name: "_Atoms/Prefix Dropdown", figmaId: "921:40927", description: "Country code prefix selector (Default, Focused, Disabled, Expanded)" },
    ],
  },

  accessibility: {
    role: "textbox",
    wcag: "AA",
    notes: ["Country code selector must be keyboard accessible", "Phone format hint recommended"],
  },

  aiHints: {
    priority: "high",
    keywords: ["phone", "telephone", "mobile number", "country code", "prefix"],
    selectionCriteria: {
      Default: "Phone number entry with country code prefix",
    },
  },
};

// -----------------------------------------------------------------------------
// 7. MOBILE/OTP FIELD
// -----------------------------------------------------------------------------
export const MobileOTPFieldMetadata = {
  component: {
    name: "Mobile/OTP Field",
    category: "molecules",
    description:
      "One-time password input with 4 individual digit cells. Each cell is an _Atoms/OTP Cell instance. Used for SMS/email verification codes.",
    type: "form",
    figmaId: "321:28581",
    totalVariants: 7,
  },

  usage: {
    useCases: [
      "SMS verification code entry",
      "Email verification code",
      "Two-factor authentication input",
    ],
    antiPatterns: [
      {
        scenario: "Using individual General Input Fields for OTP digits",
        reason: "Loses auto-advance behavior and visual cohesion of OTP cells",
        alternative: "Use OTP Field with its 4 connected cells",
      },
    ],
  },

  variants: {
    State: {
      options: ["Default", "Typing", "Filled", "Focused", "Error Filled", "Success Filled", "Disabled"],
      default: "Default",
    },
  },

  properties: {
    "Show Optional Message": { type: "boolean", default: false, description: "Show hint message below the OTP cells" },
  },

  composition: {
    structure: "Horizontal row of 4 _Atoms/OTP Cell instances (74x64px each, 8px spacing) with optional message below.",
    children: [
      {
        name: "OTP Cells Row",
        type: "layout",
        description: "Horizontal auto-layout, itemSpacing: 8px",
        children: [
          { name: "_Atoms/OTP Cell (x4)", type: "instance", component: "_Atoms/OTP Cell", description: "Individual digit cell, 74x64px" },
        ],
      },
      {
        name: "Optional Message",
        type: "layout",
        conditional: "Visible when 'Show Optional Message' is true",
        children: [
          { name: "icon-24/info-circle", type: "instance" },
          { name: "Optional Message / Hint", type: "text", description: "12px Tawuniya Regular, text/base/secondary" },
        ],
      },
    ],
  },

  layout: {
    width: 321,
    cellSize: { width: 74, height: 64 },
    cellSpacing: 8,
  },

  accessibility: {
    role: "textbox",
    wcag: "AA",
    keyboardSupport: "Auto-advance to next cell on digit entry, Backspace to previous cell",
    notes: [
      "Each cell should accept exactly one digit",
      "Auto-advance focus to next cell after entry",
      "Paste support for full OTP code",
      "Timer/resend link should be associated",
    ],
  },

  aiHints: {
    priority: "high",
    keywords: ["otp", "verification code", "one-time password", "SMS code", "2FA", "pin code"],
    selectionCriteria: {
      Default: "4-digit OTP/verification code entry",
    },
  },
};

// -----------------------------------------------------------------------------
// 8. MOBILE/CREDIT CARD FIELDS
// -----------------------------------------------------------------------------
export const MobileCreditCardFieldsMetadata = {
  component: {
    name: "Mobile/Credit Card Fields",
    category: "molecules",
    description:
      "Specialized input group for credit card information entry. Single state component.",
    type: "form",
    figmaId: "321:28659",
    totalVariants: 1,
  },

  usage: {
    useCases: [
      "Payment card number entry",
      "Checkout credit card form",
    ],
  },

  variants: {
    State: {
      options: ["Default"],
      default: "Default",
    },
  },

  accessibility: {
    role: "textbox",
    wcag: "AA",
    notes: ["Card number should be masked/formatted", "Must support auto-fill"],
  },

  aiHints: {
    priority: "medium",
    keywords: ["credit card", "payment card", "card number", "checkout"],
  },
};

// -----------------------------------------------------------------------------
// 9. VOICE INPUT FIELD
// -----------------------------------------------------------------------------
export const VoiceInputFieldMetadata = {
  component: {
    name: "Voice input field",
    category: "molecules",
    description:
      "Voice recording input for capturing spoken content. Supports recording states from initiation through completion.",
    type: "form",
    figmaId: "16892:4268",
    totalVariants: 3,
  },

  usage: {
    useCases: [
      "Voice note recording in chat",
      "Speech-to-text input",
      "Audio message capture",
    ],
  },

  variants: {
    Status: {
      options: ["Voice message", "mid reco", "end reco"],
      default: "Voice message",
      purpose: {
        "Voice message": "Ready to record / idle state",
        "mid reco": "Currently recording / mid-recognition",
        "end reco": "Recording complete / end-recognition",
      },
    },
  },

  properties: {
    "Label Inside": { type: "boolean", default: true, description: "Inner label" },
    "Optional Message": { type: "boolean", default: true, description: "Show hint" },
    "Input Content": { type: "string", default: "Inpu|", description: "Input text" },
    "Label Name": { type: "string", default: "Record Voice Note", description: "Label" },
  },

  accessibility: {
    role: "button",
    wcag: "AA",
    notes: ["Recording state must be announced", "Stop/start controls must be keyboard accessible"],
  },

  aiHints: {
    priority: "low",
    keywords: ["voice", "recording", "audio", "speech", "microphone"],
  },
};

// -----------------------------------------------------------------------------
// 10. CHAT AUDIO PLAYER
// -----------------------------------------------------------------------------
export const ChatAudioPlayerMetadata = {
  component: {
    name: "Chat Audio Player",
    category: "molecules",
    description:
      "Audio playback component for playing recorded voice notes in chat. Supports start, mid, and end playback positions.",
    type: "interactive",
    figmaId: "16892:4693",
    totalVariants: 3,
  },

  usage: {
    useCases: [
      "Playing back voice notes in chat",
      "Audio message playback",
    ],
  },

  variants: {
    "Property 1": {
      options: ["-Start", "-Mid", "-End"],
      default: "-Start",
      purpose: {
        "-Start": "Beginning of playback",
        "-Mid": "Mid-playback position",
        "-End": "End of playback",
      },
    },
  },

  accessibility: {
    role: "audio player",
    wcag: "AA",
    keyboardSupport: "Space to play/pause, arrow keys to seek",
    notes: ["Duration and progress must be announced"],
  },

  aiHints: {
    priority: "low",
    keywords: ["audio player", "voice playback", "chat audio"],
  },
};

// -----------------------------------------------------------------------------
// ATOM COMPONENTS (Supporting)
// -----------------------------------------------------------------------------
export const OTPCellAtomMetadata = {
  component: {
    name: "_Atoms/OTP Cell",
    category: "atoms",
    description: "Individual OTP digit cell. Used as a building block inside Mobile/OTP Field. Not intended for standalone use.",
    type: "form",
    figmaId: "755:33430",
    totalVariants: 20, // 4 interaction states x 5 content types (some combos)
  },

  variants: {
    "Property 1": {
      options: ["Default", "Hover", "Focused", "Disabled"],
      default: "Default",
    },
    Type: {
      options: ["Empty", "Filled", "Typing", "Missing Value", "Success", "Error"],
      default: "Empty",
    },
  },

  aiHints: {
    priority: "low",
    keywords: ["otp cell", "digit cell"],
    considerations: ["Use Mobile/OTP Field instead of assembling cells manually"],
  },
};

export const CurrencyDropdownAtomMetadata = {
  component: {
    name: "Currency Dropdown",
    category: "atoms",
    description: "Currency type selector dropdown used inside Mobile/Currency Field.",
    type: "form",
    figmaId: "921:39620",
    totalVariants: 4,
  },
  variants: {
    State: { options: ["Default", "Focused", "Disabled", "Expanded"], default: "Default" },
  },
  aiHints: { priority: "low", keywords: ["currency selector", "currency dropdown"] },
};

export const PrefixDropdownAtomMetadata = {
  component: {
    name: "_Atoms/Prefix Dropdown",
    category: "atoms",
    description: "Country code prefix dropdown used inside Mobile/Phone Number Field.",
    type: "form",
    figmaId: "921:40927",
    totalVariants: 4,
  },
  variants: {
    State: { options: ["Default", "Focused", "Disabled", "Expanded"], default: "Default" },
  },
  aiHints: { priority: "low", keywords: ["prefix", "country code", "phone prefix"] },
};

export const CurrencyIconAtomMetadata = {
  component: {
    name: "Currency icon",
    category: "atoms",
    description: "Currency symbol icon (Riyal or Dollar) used inside Currency Dropdown.",
    type: "display",
    figmaId: "9795:12735",
    totalVariants: 2,
  },
  variants: {
    Type: { options: ["Riyal", "dollar"], default: "Riyal" },
  },
  aiHints: { priority: "low", keywords: ["currency icon", "riyal", "dollar"] },
};

// =============================================================================
// PAGE-LEVEL SUMMARY
// =============================================================================
export const InputFieldsPageSummary = {
  pageName: "Input Fields",
  pageId: "160:112457",
  fileKey: "ydDjnPsHFoe8baKAw1w9eY",
  totalComponentSets: 15,
  totalStandaloneComponents: 0,
  totalVariantsAcrossAll: 97,

  componentIndex: [
    { name: "Mobile/General Input Field", id: "307:36125", variants: 7, category: "molecules", semantic: "general" },
    { name: "Mobile/Password Field", id: "921:41607", variants: 8, category: "molecules", semantic: "password" },
    { name: "Mobile/Text Area", id: "3566:36877", variants: 7, category: "molecules", semantic: "multiline" },
    { name: "Mobile/Currency Field", id: "911:35540", variants: 7, category: "molecules", semantic: "currency" },
    { name: "Mobile/Counter Field", id: "3550:18584", variants: 14, category: "molecules", semantic: "counter" },
    { name: "Mobile/Phone Number Field (v1)", id: "921:40276", variants: 8, category: "molecules", semantic: "phone" },
    { name: "Mobile/Phone Number Field (v2)", id: "16873:3894", variants: 7, category: "molecules", semantic: "phone" },
    { name: "Mobile/OTP Field", id: "321:28581", variants: 7, category: "molecules", semantic: "otp" },
    { name: "Mobile/Credit Card Fields", id: "321:28659", variants: 1, category: "molecules", semantic: "payment" },
    { name: "Voice input field", id: "16892:4268", variants: 3, category: "molecules", semantic: "voice" },
    { name: "Chat Audio Player", id: "16892:4693", variants: 3, category: "molecules", semantic: "audio" },
    { name: "_Atoms/OTP Cell", id: "755:33430", variants: 20, category: "atoms", semantic: "otp-cell" },
    { name: "Currency Dropdown", id: "921:39620", variants: 4, category: "atoms", semantic: "currency-selector" },
    { name: "Currency icon", id: "9795:12735", variants: 2, category: "atoms", semantic: "currency-icon" },
    { name: "_Atoms/Prefix Dropdown", id: "921:40927", variants: 4, category: "atoms", semantic: "prefix-selector" },
  ],

  documentation: {
    generalInputField: "Input fields are interactive elements that allow users to enter and edit text or data. They are fundamental components in forms and user interfaces.",
    currencyField: "Currency fields are interactive elements that allow users to enter and edit currency amounts.",
    phoneNumberField: "Phone Number fields are interactive elements that allow users to enter and edit phone numbers.",
    otpField: "OTP fields are interactive elements that allow users to enter and edit temporary one-time-password digits.",
    counterField: "A counter field allows users to increment or decrement a numeric value, typically using plus (+) and minus (-) buttons.",
    textArea: "A text area is a multi-line input field used for entering longer, free-form text, such as comments, messages, or descriptions.",
    designNotes: "Inner label as default label style. Icons with hint/support text are removed.",
    accessibilityCompliance: [
      "Contrast (Minimum) Level AA",
      "Non-text Contrast Level AA",
      "Content on Hover or Focus Level AA",
    ],
  },

  sharedPatterns: {
    stateSet: "Default > Typing > Filled > Focused > Error Filled > Success Filled > Disabled",
    labelModes: "Inner label (default, floats on focus) or Outer label (static above field)",
    inputFieldHeight: "56px for all standard input fields",
    cornerRadius: "8px",
    typography: "Tawuniya — Medium for labels/input, Regular for messages",
    messagePattern: "Optional hint below field; error/success messages replace hint in validation states",
  },

  tokenNamespace: {
    fills: "background/secondary (default), fill/base/disabled (disabled)",
    strokes: {
      default: "border/base/tertiary",
      focused: "border/base/focused (outer ring), button/border/brand-primary/focused (typing)",
      error: "fill/feedback/error",
      success: "fill/feedback/success",
    },
    text: {
      label: "text/base/tertiary",
      input: "text/base/secondary (placeholder) → text/base/primary (value)",
      hint: "text/base/secondary",
      error: "text/feedback/error",
      success: "text/feedback/success",
      disabled: "text/base/disabled",
    },
  },
};
