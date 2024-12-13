import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";

const cookies = new Cookies();
const token = cookies.get("token");

// Create a reusable Axios instance for consistent configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json", // Default headers for all requests
  },
});

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** React Query APIs */

// Fetch all users (admin-only)
export const useGetAllUsers = () =>
  useQuery(["getAllUsers"], async () => {
    if (!token) throw new Error("Authentication token is missing.");
    const { data } = await api.get("/api/user/getAllUsers");
    return data;
  });

// Fetch a single user
export const useGetUser = () =>
  useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      if (!token) throw new Error('Authentication token is missing.');
      const { data } = await api.get('/api/user/getUser');
      return data;
    },
  });


/** Redux Toolkit APIs */

// Update user data (text fields)
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token is missing.");
    }
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
    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token is missing.");
    }
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
    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token is missing.");
    }
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
