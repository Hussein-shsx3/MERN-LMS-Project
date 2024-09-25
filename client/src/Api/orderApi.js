import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

// Async thunk to create an order
const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        orderData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch orders
const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete an order
const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return orderId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export { createOrder, fetchOrders, deleteOrder };
