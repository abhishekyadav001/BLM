import axios from "axios";

// Axios instance with cookie support
export const api = axios.create({
  baseURL: process.env.VITE_REACT_APP_API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // <--- Important!
});

// Optional: request interceptor (not needed for cookies)
api.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);
