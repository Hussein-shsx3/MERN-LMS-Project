import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getProducts, deleteProduct } from "../Api/ProductApi";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    statusGet: "idle",
    statusDelete: "idle",
    error: null,
  },
  reducers: {
    setStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.statusGet = "loading";
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.statusGet = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.statusGet = "failed";
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.statusDelete = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.statusDelete = "succeeded";
        state.products = state.products.filter(
          (product) => product._id !== action.meta.arg //?
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.statusDelete = "failed";
        state.error = action.payload;
      });
  },
});

export const { setStatus } = productSlice.actions;

export default productSlice.reducer;

//?  action.meta.arg =>
//?  When you dispatch a thunk action like deleteProduct(productId), the argument productId is stored in action.meta.arg.
//?  This allows you to access the productId within the reducer to know which product was targeted for deletion.
