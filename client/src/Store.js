import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import displaySlice from "./redux/searchSlice";
import productSlice from "./redux/productSlice";
import cartSlice from "./redux/cartSlice";
import orderSlice from "./redux/orderSlice";

export const storeApp = configureStore({
  reducer: {
    auth: authSlice,
    search: displaySlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});
