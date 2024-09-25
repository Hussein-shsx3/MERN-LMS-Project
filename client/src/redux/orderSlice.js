// features/order/orderSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchOrders, deleteOrder } from "../Api/orderApi";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload.order);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = orderSlice.actions;

export default orderSlice.reducer;
