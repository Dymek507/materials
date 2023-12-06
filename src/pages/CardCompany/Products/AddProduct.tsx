import React from "react";
import { v1 as uuidv1 } from "uuid";
import addProduct from "../../../utils/productUtils/addProduct";
import { ICompany, IProduct } from "../../../types/model";
import Form from "../../../components/Form/root";
import { productFormData } from "../../CardProduct/UpdateProductForm/data/data_product";


interface IAddProductProps {
  handleClose: () => void,
  companyData: ICompany
}

export default function AddProduct({ handleClose, companyData }: IAddProductProps) {
  const { id, company, adress, cords } = companyData

  const handleSubmit = async (categories: string[], event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('company') && data.get('category') === "") return

    const product: IProduct = {
      id: uuidv1(),
      company: company,
      category: categories,
      material: data.get('material') as string,
      price: Number(data.get('price')) as number,
      type: data.get('type') as string,
      key: id,
      unit: data.get('unit') as string,
      adress: adress,
      date: data.get('date') as string,
      cords: cords
    }
    addProduct(product)
    handleClose()
  };
  return (
    <Form inputData={productFormData()} getData={handleSubmit} />
  );
}
