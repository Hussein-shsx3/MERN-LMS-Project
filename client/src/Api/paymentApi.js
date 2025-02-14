import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Create a reusable Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("🔹 No token found in cookies. Request may fail.");
  }

  return config;
});

/** Create Stripe Checkout Session */
export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async (courseData, { rejectWithValue }) => {
    try {
      console.log("🔹 Initiating Payment Request...");

      const token = cookies.get("token");
      if (!token) {
        console.error("🔹 No token found. Authorization will fail.");
        return rejectWithValue("No token found. Please log in.");
      }

      console.log("🔹 Token:", token);
      console.log("🔹 Course Data:", courseData);

      const response = await api.post(
        "/api/payment/create-checkout-session",
        courseData
      );

      console.log("🔹 Payment Response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "🔹 Payment Error:",
        error.response?.data || "Unknown Error"
      );

      // Return a meaningful error message
      return rejectWithValue(error.response?.data || "Payment request failed.");
    }
  }
);
