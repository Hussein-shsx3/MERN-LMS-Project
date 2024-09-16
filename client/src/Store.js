import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import displaySlice from "./redux/searchSlice";

export const storeApp = configureStore({
  reducer: {
    auth: authSlice,
    search: displaySlice,
  },
});
