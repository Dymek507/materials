// export interface ICompany {
//   category: string[];
//   adress: string;
//   cords: Cords;
//   mail: string | string[];
//   person: string | string[];
//   phone: string[];
//   siding: string;
//   comment: string;
//   date?: string;
//   update?: string;
// }

export const IMPORT_COMPANIES_FIELDS = [
  {
    label: "Grupa",
    key: "group",
    alternateMatches: ["Korporacja", "grupa", "group", "korporacja"],
    fieldType: {
      type: "input",
    },
    example: "Eurovia",
    validations: [
      {
        rule: "required",
        errorMessage: "Grupa jest wymagana",
        level: "error",
      },
    ],
  },
  {
    label: "Zakład",
    key: "company",
    alternateMatches: ["kopalnia", "cementownia", "zakład", "company"],
    fieldType: {
      type: "input",
    },
    example: "Kopalnia Wapienia Czatkowice",
    validations: [
      {
        rule: "required",
        errorMessage: "Firma jest wymagany",
        level: "error",
      },
    ],
  },
  {
    label: "NIP",
    key: "nip",
    alternateMatches: ["Nip"],
    fieldType: {
      type: "input",
    },
    example: "9669001514",
    validations: [],
  },
  {
    label: "ID",
    key: "id",
    alternateMatches: ["Id", "id", "index"],
    fieldType: {
      type: "input",
    },
    example: "asd456-564asad-465a1s-16asd5",
    validations: [],
  },
  {
    label: "Kategoria",
    key: "category",
    alternateMatches: ["category", "kategoria"],
    fieldType: {
      type: "input",
    },
    example: "kopalnia",
    validations: [
      {
        rule: "required",
        errorMessage: "Kategoria jest wymagana",
        level: "error",
      },
    ],
  },
  {
    label: "Cena",
    key: "price",
    alternateMatches: ["cena", "cena netto"],
    fieldType: {
      type: "input",
    },
    example: "100",
    validations: [
      {
        rule: "required",
        errorMessage: "Cena jest wymagana",
        level: "error",
      },
    ],
  },
  {
    label: "Masa",
    key: "masa",
    alternateMatches: ["Masa"],
    fieldType: {
      type: "input",
    },
    example: "2/5",
    validations: [],
  },
];

// {
//   // Visible in table header and when matching columns.
//   label: "First Name",
//   // This is the key used for this field when we call onSubmit.
//   key: "firstname",
//   // Allows for better automatic column matching. Optional.
//   alternateMatches: ["first name", "first"],
//   // Used when editing and validating information.
//   fieldType: {
//     // There are 3 types - "input" / "checkbox" / "select".
//     type: "input",
//   },
//   // Used in the first step to provide an example of what data is expected in this field. Optional.
//   example: "Stephanie",
//   // Can have multiple validations that are visible in Validation Step table.
//   validations: [
//     {
//       // Can be "required" / "unique" / "regex"
//       rule: "required",
//       errorMessage: "Name is required",
//       // There can be "info" / "warning" / "error" levels. Optional. Default "error".
//       level: "error",
//     },
//   ],
// },
