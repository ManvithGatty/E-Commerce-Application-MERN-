import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api", // Backend API base URL
});

// Automatically add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
