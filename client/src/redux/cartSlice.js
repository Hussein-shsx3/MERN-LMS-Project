import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.courses = [];
    },
  },
});

export const { addCourse, removeCourse, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
