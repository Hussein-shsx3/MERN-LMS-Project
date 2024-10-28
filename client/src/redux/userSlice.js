import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUser, updateUser, deleteUser } from "../Api/userApi"; // Adjust the path to your API functions

const initialState = {
  users: [],
  user: null,
  fetchStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearStatus: (state) => {
      state.fetchStatus = "idle";
      state.updateStatus = "idle";
      state.deleteStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // Fetch all users
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      });

    // Fetch a single user
    builder
      .addCase(getUser.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      });

    // Update a user
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.user = action.payload;
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

export const { clearError, clearStatus } = userSlice.actions;

export default userSlice.reducer;
