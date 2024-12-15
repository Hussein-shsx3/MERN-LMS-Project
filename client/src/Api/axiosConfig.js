// axiosConfig.js
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Ensure this is set in your .env file
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
