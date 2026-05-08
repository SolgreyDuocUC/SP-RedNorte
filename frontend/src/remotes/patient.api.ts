import axios from "axios";

export const patientApi = axios.create({
  baseURL: "/proxy/pacientes",
});
