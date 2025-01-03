import { createSlice } from "@reduxjs/toolkit";

// Load Cart from Local Storage
const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Could not load cart from local storage", error);
    return [];
  }
};

const saveCartToLocalStorage = (state) => {
  try {
    const simplifiedCart = state.map((course) => ({
      id: course._id, 
      title: course.title,
      price: course.price,
      image: course.image,
    }));
    localStorage.setItem("cart", JSON.stringify(simplifiedCart));
  } catch (error) {
    console.error("Could not save cart to local storage", error);
  }
};

const initialState = {
  courses: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
      saveCartToLocalStorage(state.courses);
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload._id
      );
      saveCartToLocalStorage(state.courses);
    },
    clearCart: (state) => {
      state.courses = [];
      saveCartToLocalStorage(state.courses);
    },
  },
});

export const { addCourse, removeCourse, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
