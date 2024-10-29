import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCourses,
  fetchCourseById,
  createCourse,
  enrollInCourse,
  deleteCourse,
  updateCourseImage,
  updateCourse,
} from "../Api/courseApi";

const initialState = {
  courses: [],
  course: null,
  fetchStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  enrollStatus: "idle",
  deleteStatus: "idle",
  updateImageStatus: "idle", // Separate status for image update
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearStatus: (state, action) => {
      const { statusType } = action.payload;
      if (statusType) {
        state[statusType] = "idle";
      } else {
        state.fetchStatus = "idle";
        state.createStatus = "idle";
        state.updateStatus = "idle";
        state.updateImageStatus = "idle";
        state.enrollStatus = "idle";
        state.deleteStatus = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch all courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      });

    // Fetch course by ID
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.course = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      });

    // Create a new course
    builder
      .addCase(createCourse.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      });

    // Update a course
    builder
      .addCase(updateCourse.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.courses = state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });

    // Update course image
    builder
      .addCase(updateCourseImage.pending, (state) => {
        state.updateImageStatus = "loading";
        state.error = null;
      })
      .addCase(updateCourseImage.fulfilled, (state, action) => {
        state.updateImageStatus = "succeeded";
        const updatedCourse = state.courses.find(
          (course) => course._id === action.payload._id
        );
        if (updatedCourse) updatedCourse.image = action.payload.image;
      })
      .addCase(updateCourseImage.rejected, (state, action) => {
        state.updateImageStatus = "failed";
        state.error = action.payload;
      });

    // Enroll in a course
    builder
      .addCase(enrollInCourse.pending, (state) => {
        state.enrollStatus = "loading";
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state) => {
        state.enrollStatus = "succeeded";
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.enrollStatus = "failed";
        state.error = action.payload;
      });

    // Delete a course
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload._id
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError, clearStatus } = courseSlice.actions;

export default courseSlice.reducer;
