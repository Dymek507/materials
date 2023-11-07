import React from "react";
import { v1 as uuidv1 } from "uuid";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import addProduct from "./utils/addProduct";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { ICompany, IProduct } from "../../../types/model";
import getCords from "../../../utils/getCords";
import { setLastProduct } from "../../../store/lastProductSlice";
import SingleSelect from "../../../components/Select";


interface IAddProductProps {
  open: boolean,
  handleClose: () => void,
  companyData: ICompany
}

export default function AddProduct({ handleClose, companyData }: IAddProductProps) {
  const { id, category: companyCategory, group, company, adress, cords } = companyData

  const [category, setCategory] = React.useState<string>("")

  const lastProduct = useAppSelector((state) => state.lastProduct)
  const dispatch = useAppDispatch()

  const selectCategories = (e: string) => {
    setCategory(e)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('company') && data.get('category') === "") return

    const product: IProduct = {
      id: uuidv1(),
      company: company,
      category: category,
      material: data.get('material') as string,
      price: Number(data.get('price')) as number,
      type: data.get('type') as string,
      transport: "",
      key: id,
      unit: data.get('unit') as string,
      adress: adress,
      date: new Date().toLocaleDateString(),
      cords: cords
    }
    addProduct(product)
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
            defaultValue={company}
            disabled
            autoFocus
          />
          <SingleSelect selectCategories={selectCategories} defaultValue={companyCategory[0]} />
          <TextField
            margin="normal"
            required
            fullWidth
            id="type"
            type="text"
            label="Type"
            name="type"
            defaultValue={lastProduct.type}
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
            defaultValue={lastProduct.material}
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
            defaultValue={lastProduct.price}
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
            defaultValue={lastProduct.unit}
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
            defaultValue={adress}
            disabled
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            DODAJ
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
