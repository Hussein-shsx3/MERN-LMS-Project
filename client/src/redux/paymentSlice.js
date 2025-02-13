import { createSlice } from "@reduxjs/toolkit";
import { createCheckoutSession } from "../Api/paymentApi"; 

const initialState = {
  loading: false,
  sessionUrl: null,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // Optional: Action to reset payment state (useful after a redirect or on unmount)
    resetPayment: (state) => {
      state.loading = false;
      state.sessionUrl = null;
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
        // Assuming the API returns an object with a "url" property for the Stripe Checkout session
        state.sessionUrl = action.payload.url;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
