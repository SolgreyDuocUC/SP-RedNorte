import axios from "axios";

export const practitionerApi = axios.create({
  baseURL: "/proxy/usuarios/api/v2/practitioner",
});

practitionerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
