import { createSlice } from "@reduxjs/toolkit";
import { createLecture, updateLecture, deleteLecture } from "../Api/lectureApi"; // Adjust the path to your API functions

const initialState = {
  lectures: [],
  lecture: null,
  status: "idle",
  error: null,
};

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLecture.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createLecture.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lectures.push(action.payload);
      })
      .addCase(createLecture.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(updateLecture.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateLecture.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.lectures.findIndex(
          (lecture) => lecture._id === action.payload._id
        );
        if (index !== -1) {
          state.lectures[index] = action.payload;
        }
      })
      .addCase(updateLecture.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(deleteLecture.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteLecture.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lectures = state.lectures.filter(
          (lecture) => lecture._id !== action.payload._id
        );
      })
      .addCase(deleteLecture.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = lectureSlice.actions;

export default lectureSlice.reducer;
