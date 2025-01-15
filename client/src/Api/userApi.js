import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";

const cookies = new Cookies();

// Create a reusable Axios instance for consistent configuration
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

/** React Query APIs */

// Fetch all users (admin-only)
export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      const token = cookies.get("token");
      if (!token) throw new Error("Authentication token is missing.");
      const { data } = await api.get("/api/user/getAllUsers");
      return data;
    },
    enabled: !!cookies.get("token"),
  });

// Fetch a single user
export const useGetUser = () =>
  useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const token = cookies.get("token");
      if (!token) throw new Error("Authentication token is missing.");
      const { data } = await api.get("/api/user/getUser");
      return data;
    },
    enabled: !!cookies.get("token"),
  });

// Fetch a single user by id without token
export const useGetUserById = (userId) =>
  useQuery({
    queryKey: ["getUserById", userId], 
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required.");
      const { data } = await api.get(`/api/user/getUserById/${userId}`); 
      return data;
    },
    enabled: !!userId, 
  });


/** Redux Toolkit APIs */

// Update user data (text fields)
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    const token = cookies.get("token");
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
    const token = cookies.get("token");
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
    const token = cookies.get("token");
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
