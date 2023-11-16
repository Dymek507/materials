import React from "react";
import { v1 as uuidv1 } from "uuid";
import { IProduct } from "../../types/model";
import getCords from "../../utils/getCords";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { setLastProduct } from "../../store/lastProductSlice";
import updateProduct from "./helpers/updateProduct";
import { productFormData } from "../../data/data_product";
import Form from "../../components/Form/root";

type UpdateProductProps = {
  handleClose: () => void,
  productData: IProduct
}

const UpdateProduct = ({ handleClose, productData }: UpdateProductProps) => {
  const { company, id, adress, key, cords } = productData

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
      transport: data.get('transport') as string,
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
    <Form inputData={productFormData(productData)} getData={handleSubmit} />
  );
}

export default UpdateProduct
