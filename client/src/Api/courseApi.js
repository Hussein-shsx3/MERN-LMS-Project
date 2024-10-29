import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const authHeaders = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// Fetch all courses
const fetchCourses = createAsyncThunk(
  "course/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/course`,
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch a single course by ID
const fetchCourseById = createAsyncThunk(
  "course/fetchCourseById",
  async (courseId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/course/${courseId}`,
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create a new course (admin only)
const createCourse = createAsyncThunk(
  "course/createCourse",
  async (courseData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/course`,
        courseData,
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Enroll in a course
const enrollInCourse = createAsyncThunk(
  "course/enrollInCourse",
  async (courseId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/course/enroll/${courseId}`,
        {},
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create a new course (admin only)
const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async ({ courseId, courseData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/course/${courseId}`,
        courseData,
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update course image
const updateCourseImage = createAsyncThunk(
  "course/updateCourseImage",
  async ({ courseId, imageFile }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/course/image/${courseId}`,
        formData,
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a course
const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (courseId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/course/${courseId}`,
        {},
        authHeaders
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export {
  fetchCourses,
  fetchCourseById,
  createCourse,
  enrollInCourse,
  deleteCourse,
  updateCourseImage,
  updateCourse,
};
