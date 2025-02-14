import { createSlice } from "@reduxjs/toolkit";
import { createCheckoutSession } from "../Api/paymentApi"; 

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    sessionId: null,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.sessionId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionId = action.payload.sessionId;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
