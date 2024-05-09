import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://soft-sarina-ccab-30cf46cd.koyeb.app/";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
