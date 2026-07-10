import axios from "axios";

export const clinicalHistoryApi = axios.create({
  baseURL: "/proxy/ficha-clinica/api/v1",
});

clinicalHistoryApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
