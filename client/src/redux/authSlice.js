import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "../Api/authApi";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Cookie options
const cookieOptions = {
  path: "/",
  secure: true,
  sameSite: "strict",
  maxAge: 3600,
};

const initialState = {
  user: null,
  token: cookies.get("token") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      cookies.remove("token", { path: "/" });
      cookies.remove("role", { path: "/" });
    },
    clearStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Registration failed. Please try again.";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        cookies.set("token", action.payload.token, cookieOptions);
        cookies.set("role", action.payload.user.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Login failed. Please check your credentials.";
      });
  },
});

export const { logout, clearStatus, clearError } = authSlice.actions;

export default authSlice.reducer;
