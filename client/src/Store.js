import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";

export const storeApp = configureStore({
  reducer: {
    auth: authSlice,
  },
});
