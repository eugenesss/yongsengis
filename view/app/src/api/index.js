import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 8000
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("ysis_token");
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
});

export default api;
