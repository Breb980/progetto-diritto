import axios from "axios";

// URL base del backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
