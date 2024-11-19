import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Create a reusable Axios instance for consistent configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json", // Default headers for all requests
  },
});

api.interceptors.request.use((config) => {
  const token = cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch all users (admin-only)
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/user/getAllUsers");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

// Fetch a single user
export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const response = await api.get("/api/user/getUser");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "An unknown error occurred"
    );
  }
});

// Update user data (text fields)
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.put("/api/user", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

// Update user image
export const updateUserImage = createAsyncThunk(
  "user/updateUserImage",
  async (imageFile, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("picture", imageFile);

      const response = await api.put("/api/user/image", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

// Delete a user (admin-only)
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const response = await api.delete(`/api/user/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);
