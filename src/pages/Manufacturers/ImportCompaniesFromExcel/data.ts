export const IMPORT_COMPANIES_FIELDS = [
  {
    label: "Grupa",
    key: "group",
    alternateMatches: ["Korporacja", "grupa", "group", "korporacja"],
    fieldType: {
      type: "input",
    },
    example: "Eurovia",
    validations: [],
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
    label: "Adres",
    key: "adress",
    alternateMatches: ["adres", "adress"],
    fieldType: {
      type: "input",
    },
    example: "ul. Wapienna 1, 32-020 Wieliczka",
    validations: [],
  },
  {
    label: "Cords",
    key: "cords",
    alternateMatches: ["cords", "cord", "koordynaty", "koordynaty"],
    fieldType: {
      type: "input",
    },
    example: "2/5",
    validations: [],
  },
  {
    label: "Email",
    key: "mail",
    alternateMatches: ["email", "mail"],
    fieldType: {
      type: "input",
    },
    example: "pawlica@pawlica.com.pl",
    validations: [],
  },
  {
    label: "Osoba",
    key: "person",
    alternateMatches: ["osoba do kontaktu", "osoba", "Person", "Osoba"],
    fieldType: {
      type: "input",
    },
    example: "Jan Kowalski",
    validations: [],
  },
  {
    label: "Phone",
    key: "phone",
    alternateMatches: ["telefon", "Telefon", "phone"],
    fieldType: {
      type: "input",
    },
    example: "123 321 123",
    validations: [],
  },
  {
    label: "Bocznica",
    key: "siding",
    alternateMatches: ["bocznica", "Siding"],
    fieldType: {
      type: "input",
    },
    example: "Tak",
    validations: [],
  },
  {
    label: "Komentarz",
    key: "comment",
    alternateMatches: ["komentarz", "comment"],
    fieldType: {
      type: "input",
    },
    example: "Brak",
    validations: [],
  },
];
