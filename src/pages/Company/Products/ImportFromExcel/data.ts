const IMPORT_FIELDS = [
  {
    // Visible in table header and when matching columns.
    label: "First Name",
    // This is the key used for this field when we call onSubmit.
    key: "firstname",
    // Allows for better automatic column matching. Optional.
    alternateMatches: ["first name", "first"],
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "Stephanie",
    // Can have multiple validations that are visible in Validation Step table.
    validations: [
      {
        // Can be "required" / "unique" / "regex"
        rule: "required",
        errorMessage: "Name is required",
        // There can be "info" / "warning" / "error" levels. Optional. Default "error".
        level: "error",
      },
    ],
  },
  {
    label: "Last Name",
    key: "lastname",
    alternateMatches: ["last name", "second name", "last"],
    fieldType: {
      type: "input",
    },
    example: "Fox",
    validations: [
      {
        rule: "required",
        errorMessage: "Name is required",
        level: "error",
      },
    ],
  },
];
