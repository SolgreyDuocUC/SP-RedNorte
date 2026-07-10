import axios from "axios";

export const specialtiesApi = axios.create({
  baseURL: "/proxy/centros/api/v1/specialties",
});

specialtiesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
