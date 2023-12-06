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
