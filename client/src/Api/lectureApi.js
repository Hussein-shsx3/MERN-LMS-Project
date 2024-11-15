import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create a reusable Axios instance for consistent configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set the base URL for all requests
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Add an interceptor to include token in headers dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token securely
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create a new lecture
export const createLecture = createAsyncThunk(
  "lecture/createLecture",
  async ({ courseId, lectureData }, thunkAPI) => {
    try {
      const response = await api.post(
        `/api/lecture/courses/${courseId}/lectures`,
        lectureData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

// Update a lecture
export const updateLecture = createAsyncThunk(
  "lecture/updateLecture",
  async ({ courseId, lectureId, lectureData }, thunkAPI) => {
    try {
      const response = await api.put(
        `/api/lecture/courses/${courseId}/lectures/${lectureId}`,
        lectureData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

// Delete a lecture
export const deleteLecture = createAsyncThunk(
  "lecture/deleteLecture",
  async ({ courseId, lectureId }, thunkAPI) => {
    try {
      const response = await api.delete(
        `/api/lecture/courses/${courseId}/lectures/${lectureId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);
