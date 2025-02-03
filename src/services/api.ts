import { setAuthToken } from "@/lib/utils";
import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL as string,
});

api.interceptors.request.use((config) => {
  config.paramsSerializer = (params) =>
    qs.stringify(params, { arrayFormat: "indices" });

  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authPaths = [
      "/login",
      "/reset-password",
      "/request-password-reset",
    ].includes(error.config.url);

    if (!authPaths && error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
        setAuthToken(null);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
