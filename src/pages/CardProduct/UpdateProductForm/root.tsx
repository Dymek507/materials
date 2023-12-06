import React from "react";

import { IProduct } from "../../../types/model";
import updateProduct from "../../../utils/productUtils/updateProduct";
import { productFormData } from "./data/data_product";
import Form from "../../../components/Form/root";

type UpdateProductProps = {
  handleClose: () => void,
  productData: IProduct
}

const UpdateProductForm = ({ handleClose, productData }: UpdateProductProps) => {
  const { company, category, id, adress, key, cords } = productData

  const handleSubmit = async (categories: string[], event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('company') && data.get('category') === "") return

    const product: IProduct = {
      id: id,
      company: company,
      category: categories,
      material: data.get('material') as string,
      price: Number(data.get('price')) as number,
      type: data.get('type') as string,
      key: key,
      unit: data.get('unit') as string,
      adress: adress,
      date: data.get('date') as string,
      cords: cords
    }
    updateProduct(product)
    handleClose()
  };

  return (
    <Form inputData={productFormData(productData)} defaultCategory={category} getData={handleSubmit} />
  );
}

export default UpdateProductForm
