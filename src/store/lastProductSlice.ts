import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types/model";

const initialState: IProduct = {
  company: "",
  type: "",
  key: "",
  cords: {
    lat: 0,
    lng: 0,
  },
  category: [],
  material: "",
  price: 0,
  unit: "",
  adress: "",
};

export const lastProductSlice = createSlice({
  name: "cargos",
  initialState,
  reducers: {
    setLastProduct: (state, action: PayloadAction<IProduct>) => {
      state.company = action.payload.company;
      state.category = action.payload.category;
      state.material = action.payload.material;
      state.price = action.payload.price;
      state.unit = action.payload.unit;
      state.adress = action.payload.adress;
    },
    getLastProduct: (state) => {
      return state;
    },
  },
});

export const { setLastProduct, getLastProduct } = lastProductSlice.actions;

export default lastProductSlice.reducer;
