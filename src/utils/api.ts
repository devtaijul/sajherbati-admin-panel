// utils/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// API base URL - আপনার backend URL এখানে বসাবেন
const BASE_URL = "http://localhost:5000/api";

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - আগে থেকেই কিছু যোগ করতে চাইলে
api.interceptors.request.use(
  (config) => {
    // এখানে আপনি authorization token যোগ করতে পারেন
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Form data হলে Content-Type পরিবর্তন করুন
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - response হ্যান্ডল করার জন্য
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Error handling logic
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          console.error("Unauthorized access");
          // window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error("Forbidden access");
          break;
        case 404:
          // Not found
          console.error("Resource not found");
          break;
        case 500:
          // Server error
          console.error("Server error");
          break;
        default:
          console.error("API Error:", error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Helper functions for common HTTP methods
const apiHelper = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config).then((response) => response.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config).then((response) => response.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config).then((response) => response.data),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.patch<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then((response) => response.data),

  // Upload file helper
  upload: (
    url: string,
    formData: FormData,
    onProgress?: (progressEvent: any) => void
  ) => {
    return api
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: onProgress,
      })
      .then((response) => response.data);
  },
};

export default api;
export { apiHelper };
