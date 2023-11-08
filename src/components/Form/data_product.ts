import { IProduct } from "../../types/model";
import { TextFieldType } from "./types/formTypes";

export const productData = (defaultData?: IProduct): TextFieldType[] => {
  return [
    {
      id: "type",
      label: "Typ",
      defaultValue: defaultData?.type,
    },
    {
      id: "material",
      label: "Materiał",
      defaultValue: defaultData?.material,
    },
    {
      id: "transport",
      label: "Transport",
      defaultValue: defaultData?.transport,
    },
    {
      id: "price",
      label: "Cena",
      type: "number",
      defaultValue: defaultData?.price,
    },
    {
      id: "date",
      label: "Data",
      type: "date",
    },
    {
      id: "masa",
      label: "Masa",
      defaultValue: defaultData?.masa,
    },
  ];
};
