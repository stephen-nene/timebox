import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  config.headers["X-Frontend-Host"] = window.location.origin;
  return config;
});

export default apiClient