import { IProduct } from "../../../types/model";
import { getFrancoPrice } from "../../../utils/getFrancoPrice";

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
      distance = 0,
    } = item as IProduct;
    return {
      adress,
      category,
      company,
      id,
      key,
      material,
      price,
      franco: getFrancoPrice(price, distance, category),
      type,
      unit,
    };
  });
  return newData;
};
