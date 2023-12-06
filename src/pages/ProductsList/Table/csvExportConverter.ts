import { IProduct } from "../../../types/model";

export const csvExportConverter = (data: IProduct[]) => {
  const newData = data.map((item: IProduct) => {
    const {
      adress = "",
      category = [],
      company = "",
      id,
      key = "",
      material,
      price,
      type,
      unit,
    } = item as IProduct;
    return {
      adress,
      category,
      company,
      id,
      key,
      material,
      price,
      type,
      unit,
    };
  });
  return newData;
};
