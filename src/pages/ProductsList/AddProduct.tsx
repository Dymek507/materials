import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormControlLabel, Checkbox, Grid, Box, Avatar, Button, CssBaseline, TextField, Typography, Container, Modal } from "@mui/material";
import { IProduct } from "../../types/model";
import getCords from "../../utils/getCords";
import addProduct from "./utils/addProduct";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { setLastProduct } from "../../store/lastProductSlice";

function Copyright(props: any) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        Materials
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

interface IAddProductProps {
  open: boolean,
  handleClose: () => void
}

export default function AddProduct({ open, handleClose }: IAddProductProps) {

  const lastProduct = useAppSelector((state) => state.lastProduct)
  console.log(lastProduct)
  const dispatch = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('company') && data.get('category') === "") return

    const product: IProduct = {
      id: uuidv1(),
      company: data.get('company') as string,
      category: data.get('category') as string,
      material: data.get('material') as string,
      price: Number(data.get('price')) as number,
      unit: data.get('unit') as string,
      adress: data.get('adress') as string,
      date: new Date().toLocaleDateString(),
      cords_storage: await getCords(data.get('adress') as string)
    }
    addProduct(product)
    dispatch(setLastProduct(product))
    handleClose()
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Container component="main" maxWidth="xs" sx={{
        backgroundColor: "white",
      }}>
        <CssBaseline />
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
              defaultValue={lastProduct.company}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              type="text"
              label="Kategoria"
              name="category"
              defaultValue={lastProduct.category}
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
              defaultValue={lastProduct.adress}
              autoFocus
            />

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamiętaj mnie"
            /> */}
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
        <Copyright sx={{ mt: 2, pb: 4 }} />
      </Container>
    </Modal>
  );
}
