import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IConstructionSite } from "../types/model";

interface IInitialState {
  constructionSite: IConstructionSite;
}

const initialState: IInitialState = {
  constructionSite: {
    id: "1",
    name: "Budowa",
    adress: "Wybierz",
    cords: { lat: 50.06768134642127, lng: 21.69435960991312 },
    dist_arr: [],
  },
};

export const constructionSlice = createSlice({
  name: "cargos",
  initialState,
  reducers: {
    addConstructionSite: (state, action: PayloadAction<IConstructionSite>) => {
      state.constructionSite = action.payload;
    },
    setConstructionSite: (state, action: PayloadAction<IConstructionSite>) => {
      state.constructionSite = action.payload;
    },
  },
});

export const { addConstructionSite, setConstructionSite } =
  constructionSlice.actions;

export default constructionSlice.reducer;
