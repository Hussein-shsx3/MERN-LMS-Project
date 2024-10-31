import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import courseSlice from "./redux/courseSlice";
import lectureSlice from "./redux/lectureSlice";
import userSlice from "./redux/userSlice";
import cartSlice from "./redux/cartSlice";

export const storeApp = configureStore({
  reducer: {
    auth: authSlice,
    course: courseSlice,
    lecture: lectureSlice,
    user: userSlice,
    cart: cartSlice,
  },
});
