import { createSlice } from "@reduxjs/toolkit";
import { createLecture, updateLecture, deleteLecture } from "../Api/lectureApi"; // Adjust the path to your API functions

const initialState = {
  lectures: [],
  lecture: null,
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null,
};

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearStatus: (state) => {
      state.createStatus = "idle";
      state.updateStatus = "idle";
      state.deleteStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // Create Lecture
    builder
      .addCase(createLecture.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createLecture.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.lectures.push(action.payload);
      })
      .addCase(createLecture.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      });

    // Update Lecture
    builder
      .addCase(updateLecture.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateLecture.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.lectures.findIndex(
          (lecture) => lecture._id === action.payload._id
        );
        if (index !== -1) {
          state.lectures[index] = action.payload;
        }
      })
      .addCase(updateLecture.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });

    // Delete Lecture
    builder
      .addCase(deleteLecture.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteLecture.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.lectures = state.lectures.filter(
          (lecture) => lecture._id !== action.payload._id
        );
      })
      .addCase(deleteLecture.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError, clearStatus } = lectureSlice.actions;

export default lectureSlice.reducer;
