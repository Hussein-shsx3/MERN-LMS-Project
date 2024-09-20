import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import displaySlice from "./redux/searchSlice";
import productSlice from "./redux/productSlice";

export const storeApp = configureStore({
  reducer: {
    auth: authSlice,
    search: displaySlice,
    product: productSlice,
  },
});
