import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: "hidden",
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    searchToggle: (state) => {
      if (state.display === "hidden") {
        state.display = "flex";
      } else {
        state.display = "hidden";
      }
    },
  },
});

export const { searchToggle } = displaySlice.actions;

export default displaySlice.reducer;
