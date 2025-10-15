import axios from "axios";
import { getToken, clearAuthData } from "../util/tokenManager";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // <- enable cookies to be sent
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to include token in headers
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 500) {
      // Don't redirect for getUserAddress route as it's used for auth checking
      const isAuthCheckRoute = error.config?.url?.includes("getUserAddress");

      if (!isAuthCheckRoute) {
        // Clear any stored auth data including token
        clearAuthData();
        // Redirect to login page
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
