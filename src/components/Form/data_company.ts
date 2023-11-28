import { IProduct } from "../../types/model";

export type TextFieldType = {
  id: string;
  type?: string;
  label: string;
  defaultValue?: string;
  disabled?: boolean;
};

export const productData = (defaultData: IProduct): TextFieldType[] => {
  return [
    {
      id: "company",
      label: "Firma",
      defaultValue: defaultData.company,
    },
    {
      id: "key",
      label: "Klucz",
      defaultValue: defaultData.key,
    },
    {
      id: "adress",
      label: "Adres",
      defaultValue: defaultData.adress,
    },
    {
      id: "comment",
      label: "Komentarz",
    },
    {
      id: "mail",
      label: "Mail",
    },
    {
      id: "person",
      label: "Osoba",
    },
    {
      id: "phone",
      label: "Telefon",
    },
    {
      id: "siding",
      label: "Bocznica",
    },
    {
      id: "date",
      label: "Data",
    },
  ];
};
