import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Retrieve the token once to avoid redundant calls
const token = cookies.get("token");

// Global Axios configuration for authorization headers
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Fetch all courses
export const fetchCourses = createAsyncThunk(
  "course/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/course");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Unknown error occurred"
      );
    }
  }
);

// Fetch a single course by ID
export const fetchCourseById = createAsyncThunk(
  "course/fetchCourseById",
  async (courseId, thunkAPI) => {
    try {
      const response = await api.get(`/api/course/${courseId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Unknown error occurred"
      );
    }
  }
);

// Create a new course (admin only)
export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (courseData, thunkAPI) => {
    try {
      const response = await api.post("/api/course", courseData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Unknown error occurred"
      );
    }
  }
);

// Enroll in a course
export const enrollInCourse = createAsyncThunk(
  "course/enrollInCourse",
  async (courseId, thunkAPI) => {
    try {
      const response = await api.post(`/api/course/enroll/${courseId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Unknown error occurred"
      );
    }
  }
);

// Update a course
export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async ({ courseId, courseData }, thunkAPI) => {
    try {
      const response = await api.put(`/api/course/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Unknown error occurred"
      );
    }
  }
);

// Update course image
export const updateCourseImage = createAsyncThunk(
  "course/updateCourseImage",
  async ({ courseId, imageFile }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await api.put(`/api/course/image/${courseId}`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Unknown error occurred"
      );
    }
  }
);

// Delete a course
export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (courseId, thunkAPI) => {
    try {
      const response = await api.delete(`/api/course/${courseId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Unknown error occurred"
      );
    }
  }
);
