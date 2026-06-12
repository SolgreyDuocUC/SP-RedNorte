import axios from "axios";

export const facilitiesApi = axios.create({
  baseURL: "/proxy/centros/api/v1",
});

facilitiesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

