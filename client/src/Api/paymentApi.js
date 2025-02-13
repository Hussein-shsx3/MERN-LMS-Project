import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create a reusable Axios instance for consistent configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set the base URL for all requests
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Create Checkout Session Thunk
export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async ({ courseId, courseName, price, userId }, thunkAPI) => {
    try {
      // Make a POST request to your backend to create a checkout session
      const response = await api.post("/api/payments/create-checkout-session", {
        courseId,
        courseName,
        price,
        userId,
      });
      // Return the response data (e.g., the session URL)
      return response.data;
    } catch (error) {
      // Handle errors by rejecting with a value
      return thunkAPI.rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);
