import axios from "axios";

export const facilitiesApi = axios.create({
  baseURL: "/proxy/centros/api/v1",
});
