import axios from "axios";

export const patientApi = axios.create({
  baseURL: "/proxy/pacientes",
});

patientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

