import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const authHeaders = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// Fetch all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/getAllUsers`,
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch a single user
export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/getUser`,
      authHeaders
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Update user data (supports text fields, not images)
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user`,
        userData,
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update user image (new function to match /api/user/image route)
export const updateUserImage = createAsyncThunk(
  "user/updateUserImage",
  async (imageFile, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("picture", imageFile);

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/image`,
        formData,
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a user (admin-only)
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
