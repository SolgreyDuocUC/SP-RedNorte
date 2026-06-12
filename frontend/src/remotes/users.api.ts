import axios from "axios";

export const usersApi = axios.create({
  baseURL: "/proxy/usuarios/api/v1",
});

usersApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
