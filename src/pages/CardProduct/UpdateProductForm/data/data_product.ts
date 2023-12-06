import { IProduct } from "../../../../types/model";
import { TextFieldType } from "../../../../components/Form/types/formTypes";

export const productFormData = (defaultData?: IProduct): TextFieldType[] => {
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
      id: "price",
      label: "Cena",
      type: "number",
      defaultValue: defaultData?.price,
    },
    {
      id: "unit",
      label: "Jednostka",
      defaultValue: defaultData?.unit,
    },
    {
      id: "date",
      label: "Data",
      type: "date",
      defaultValue: "2023-11-16",
    },
    {
      id: "masa",
      label: "Masa",
      defaultValue: defaultData?.masa,
    },
  ];
};
