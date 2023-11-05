import { configureStore } from "@reduxjs/toolkit";
import constructionReducer from "./constructionSlice";
import lastProductReducer from "./lastProductSlice";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: {
    construction: constructionReducer,
    lastProduct: lastProductReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
