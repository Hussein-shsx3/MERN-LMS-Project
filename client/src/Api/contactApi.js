import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Uses environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

// Async thunk to send contact message
export const sendContactMessage = createAsyncThunk(
  "contact/sendMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/contact", formData);
      return response.data; // Return response data on success
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);
