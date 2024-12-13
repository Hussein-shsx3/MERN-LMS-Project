import { createSlice } from "@reduxjs/toolkit";
import { updateUser, deleteUser } from "../Api/userApi"; // Adjust the path to your API functions

const initialState = {
  fetchStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null,
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
      state.error = null;
    },

    // Clear error message
    clearError: (state) => {
      state.error = null;
    },

    // Clear all status (useful to reset the state)
    clearStatus: (state) => {
      state.fetchStatus = "idle";
      state.updateStatus = "idle";
      state.deleteStatus = "idle";
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
        // Update user in the users list if necessary
        state.users = state.users.map((user) =>
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
  },
});

export const { clearError, clearStatus, clearUser } = userSlice.actions;

export default userSlice.reducer;
