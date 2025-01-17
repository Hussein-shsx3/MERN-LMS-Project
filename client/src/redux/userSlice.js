import { createSlice } from "@reduxjs/toolkit";
import { updateUser, deleteUser, updateUserImage } from "../Api/userApi";

const initialState = {
  fetchStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  updateImageStatus: "idle", // Add status for updating the user image
  error: null,
  user: null,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Clear user data on logout
    clearUser: (state) => {
      state.fetchStatus = "idle";
      state.updateStatus = "idle";
      state.deleteStatus = "idle";
      state.updateImageStatus = "idle"; // Reset image update status
      state.error = null;
    },

    // Clear error message
    clearError: (state) => {
      state.error = null;
    },

    // Clear all statuses
    clearStatus: (state) => {
      state.fetchStatus = "idle";
      state.updateStatus = "idle";
      state.deleteStatus = "idle";
      state.updateImageStatus = "idle"; // Reset image update status
    },
  },
  extraReducers: (builder) => {
    // Update a user
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.user = action.payload;
        state.users = state.users?.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });

    // Delete a user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });

    // Update user image
    builder
      .addCase(updateUserImage.pending, (state) => {
        state.updateImageStatus = "loading";
        state.error = null;
      })
      .addCase(updateUserImage.fulfilled, (state, action) => {
        state.updateImageStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserImage.rejected, (state, action) => {
        state.updateImageStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError, clearStatus, clearUser } = userSlice.actions;

export default userSlice.reducer;
