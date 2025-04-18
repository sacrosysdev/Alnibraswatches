import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.status === 401) {
//       localStorage.clear();
//       window.location.href = "/auth/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default API;
