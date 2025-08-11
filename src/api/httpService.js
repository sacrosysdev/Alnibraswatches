import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // <- enable cookies to be sent
  headers: {
    "Content-Type": "application/json",
  },
});
// Request interceptor to dynamically add clientId, branchId, and Authorization token
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     const clientId = localStorage.getItem("clientId");
//     const branchId = localStorage.getItem("branchId");

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     if (clientId) {
//       config.headers["clientID"] = clientId;
//     }
//     if (branchId) {
//       config.headers["branchID"] = branchId;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Interceptor for handling errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Don't redirect for getUserAddress route as it's used for auth checking
      const isAuthCheckRoute = error.config?.url?.includes("getUserAddress");

      if (!isAuthCheckRoute) {
        // Clear any stored auth data
        localStorage.clear();
        // Redirect to login page
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
