import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const register = createAsyncThunk("register", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/register`,
      userData
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const auth = createAsyncThunk("auth", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth`,
      userData
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export { register, auth };
