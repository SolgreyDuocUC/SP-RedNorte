import axios from "axios";

export const patientApi = axios.create({
  baseURL: "http://localhost:8002",
});
