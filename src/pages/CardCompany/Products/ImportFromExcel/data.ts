// interface IProduct {
//   id?: string;
//   company?: string;
//   category: string[];
//   type: string;
//   material: string;
//   transport: string;
//   unit: string;
//   price: number;
//   key: string;
//   adress?: string;
//   cords: Cords;
//   date?: string;
//   distance?: number;
//   masa?: string;
// }

export const IMPORT_FIELDS = [
  {
    label: "Kategoria",
    key: "category",
    alternateMatches: ["kategoria"],
    fieldType: {
      type: "input",
    },
    example: "kruszywo",
    validations: [
      {
        rule: "required",
        errorMessage: "Kategoria jest wymagana",
        level: "error",
      },
    ],
  },
  {
    label: "Typ",
    key: "type",
    alternateMatches: ["typ", "podkategoria"],
    fieldType: {
      type: "input",
    },
    example: "0/31,5",
    validations: [
      {
        rule: "required",
        errorMessage: "Typ jest wymagany",
        level: "error",
      },
    ],
  },
  {
    label: "Pełna nazwa",
    key: "material",
    alternateMatches: ["materiał", "material", "nazwa", "Pełna nazwa"],
    fieldType: {
      type: "input",
    },
    example: "Wapienne 0/31,5 C90/3",
    validations: [
      {
        rule: "required",
        errorMessage: "Nazwa jest wymagana",
        level: "error",
      },
    ],
  },
  {
    label: "Środek transportu",
    key: "transport",
    alternateMatches: ["Środek transportu", "transport"],
    fieldType: {
      type: "input",
    },
    example: "patelnia",
    validations: [
      {
        rule: "required",
        errorMessage: "Środek transportu jest wymagany",
        level: "error",
      },
    ],
  },
  {
    label: "Jednostka",
    key: "unit",
    alternateMatches: ["jednostka", "jednostka miary"],
    fieldType: {
      type: "input",
    },
    example: "t",
    validations: [
      {
        rule: "required",
        errorMessage: "Jednostka jest wymagana",
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
