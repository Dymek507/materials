import { configureStore } from "@reduxjs/toolkit";
import constructionReducer from "./constructionSlice";
import lastProductReducer from "./lastProductSlice";

const store = configureStore({
  reducer: {
    construction: constructionReducer,
    lastProduct: lastProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
