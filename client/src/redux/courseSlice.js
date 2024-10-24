import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCourses,
  fetchCourseById,
  createCourse,
  enrollInCourse,
  deleteCourse,
} from "../Api/courseApi"; // Adjust the path to your API functions

const initialState = {
  courses: [],
  course: null,
  status: "idle",
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Fetch course by ID
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.course = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Create a new course
    builder
      .addCase(createCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Enroll in a course
    builder
      .addCase(enrollInCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Delete a course
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload._id
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = courseSlice.actions;

export default courseSlice.reducer;
