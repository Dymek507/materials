import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types/model";

interface UiState {
  menuIsVisible: boolean;
  logged: boolean;
  userData: UserData;
}

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuIsVisible: false,
    logged: false,
    userData: {
      login: "",
      uId: null,
    },
  } as UiState,

  reducers: {
    login(
      state,
      action: PayloadAction<{ logged: boolean; userData: UserData }>
    ) {
      state.logged = action.payload.logged;
      state.userData = action.payload.userData;
    },
    logout(state) {
      state.logged = false;
      state.userData = {
        login: "",
        uId: null,
      };
    },
    toggle(state) {
      state.menuIsVisible = !state.menuIsVisible;
    },
    hideMenu(state) {
      state.menuIsVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
