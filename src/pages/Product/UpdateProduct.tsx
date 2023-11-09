import React from "react";
import { v1 as uuidv1 } from "uuid";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { IProduct } from "../../types/model";
import getCords from "../../utils/getCords";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { setLastProduct } from "../../store/lastProductSlice";
import updateProduct from "./helpers/updateProduct";
import SingleSelect from "../../components/Select";
import { Form } from "react-router-dom";

type UpdateProductProps = {
  handleClose: () => void,
  productData: IProduct
}

const EditProduct = ({ handleClose, productData }: UpdateProductProps) => {
  const dispatch = useAppDispatch()

  const [category, setCategory] = React.useState<string>(productData.category ?? "")
  const selectCategories = (e: string) => {
    setCategory(e)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('company') && data.get('category') === "") return

    // Get company name from this
    const product: IProduct = {
      id: productData.id,
      company: productData.company ?? "",
      category: category as string,
      material: data.get('material') as string,
      price: Number(data.get('price')) as number,
      type: data.get('type') as string,
      transport: "",
      key: productData.key ?? "",
      unit: data.get('unit') as string,
      adress: productData.adress,
      date: new Date().toLocaleDateString(),
      cords: productData.cords,
    }
    updateProduct(product)
    dispatch(setLastProduct(product))
    handleClose()
  };

  return (

    <Form inputData={productData()} getData={handleSubmit} />

  );
}

export default EditProduct
