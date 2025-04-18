// services/httpService.js
import axios from 'axios'
const baseUrl = import.meta.env.VITE_API_URL
// Create instance
const http = axios.create({
  baseURL: baseUrl, 
  headers: {
    'Content-Type': 'application/json',
  },
})


http.interceptors.request.use(
  config => {
    
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor (for global error handling)
http.interceptors.response.use(
  response => response,
  error => {
   
    if (error.response?.status === 401) {
     
    }
    return Promise.reject(error)
  }
)

export default http
