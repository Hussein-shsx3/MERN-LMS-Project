import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

// Create a new lecture
const createLecture = createAsyncThunk(
  "lecture/createLecture",
  async ({ courseId, lectureData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/lecture/courses/${courseId}/lectures`,
        lectureData,
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

// Update a lecture
const updateLecture = createAsyncThunk(
  "lecture/updateLecture",
  async ({ courseId, lectureId, lectureData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/lecture/courses/${courseId}/lectures/${lectureId}`,
        lectureData,
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

// Delete a lecture
const deleteLecture = createAsyncThunk(
  "lecture/deleteLecture",
  async ({ courseId, lectureId }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/lecture/courses/${courseId}/lectures/${lectureId}`,
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

export { createLecture, updateLecture, deleteLecture };
