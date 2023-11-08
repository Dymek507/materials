import React from "react";
import { v1 as uuidv1 } from "uuid";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { IProduct } from "../../types/model";
import getCords from "../../utils/getCords";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { setLastProduct } from "../../store/lastProductSlice";
import updateProduct from "./helpers/updateProduct";
import SingleSelect from "../../components/Select";

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
    <Container component="main" maxWidth="xs" sx={{
      backgroundColor: "white",
    }}>
      {/* <CssBaseline /> */}
      <Box
        sx={{
          paddingTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Dodaj produkt
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="company"
            type="text"
            label="Nazwa firmy"
            name="company"
            defaultValue={productData.company}
            autoFocus
          />
          <SingleSelect selectCategories={selectCategories} defaultValue={category} />
          <TextField
            margin="normal"
            required
            fullWidth
            id="type"
            type="text"
            label="Type"
            name="type"
            defaultValue={productData.type}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="material"
            type="text"
            label="Materiał"
            name="material"
            defaultValue={productData.material}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            type="number"
            label="Cena"
            name="price"
            defaultValue={productData.price}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="unit"
            type="text"
            label="Jednostka"
            name="unit"
            defaultValue={productData.unit}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="adress"
            type="text"
            label="Adres"
            name="adress"
            defaultValue={productData.adress}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zapisz
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditProduct
