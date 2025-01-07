import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Load Cart from Local Storage
const loadCartFromLocalStorage = () => {
  try {
    const token = cookies.get("token");
    if (!token) return [];

    const cartData = JSON.parse(localStorage.getItem(`cart_${token}`));
    if (!cartData) return [];

    const currentTime = new Date().getTime();
    if (currentTime > cartData.expiresAt) {
      localStorage.removeItem(`cart_${token}`);
      return [];
    }

    return cartData.cart || [];
  } catch (error) {
    console.error("Could not load cart from local storage", error);
    return [];
  }
};

const saveCartToLocalStorage = (state) => {
  try {
    const token = cookies.get("token");
    if (!token) return;

    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000); // 1 hour

    const cartData = {
      cart: state.courses.map((course) => ({
        id: course._id,
        title: course.title,
        price: course.price,
        image: course.image,
      })),
      expiresAt: expirationTime.getTime(),
    };

    localStorage.setItem(`cart_${token}`, JSON.stringify(cartData));
  } catch (error) {
    console.error("Could not save cart to local storage", error);
  }
};

const initialState = {
  courses: loadCartFromLocalStorage(),
  totalPrice: loadCartFromLocalStorage().reduce(
    (total, course) => total + course.price,
    0
  ),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
      state.totalPrice += action.payload.price;
      saveCartToLocalStorage(state);
    },
    removeCourse: (state, action) => {
      const removedCourse = state.courses.find(
        (course) => course._id === action.payload._id
      );
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload._id
      );
      if (removedCourse) {
        state.totalPrice -= removedCourse.price;
      }
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.courses = [];
      state.totalPrice = 0;
      saveCartToLocalStorage(state);
    },
  },
});

export const { addCourse, removeCourse, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
