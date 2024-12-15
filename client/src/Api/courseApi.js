import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch all courses
export const useFetchCourses = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get("/api/course");
      return data;
    },
  });

// Fetch a single course by ID
export const useFetchCourseById = (courseId) =>
  useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const { data } = await api.get(`/api/course/${courseId}`);
      return data;
    },
    enabled: !!courseId, // Ensures the query only runs if courseId is provided
  });

// reduxThunks.js
// Create a new course (Admin only)
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
