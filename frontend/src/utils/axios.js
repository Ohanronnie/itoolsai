import _axios from "axios";

console.log(88,import.meta.env["VITE_BACKEND_URL"], null, 992233);
export const axios = _axios.create({
  baseURL: import.meta.env["VITE_BACKEND_URL"] || 'https://api.itoolsai.com/',
  withCredentials: true,
  timeout: 1000 * 60 * 60 * 24,
});
axios.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("X-AUTH-TOKEN")}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
console.log(import.meta.env["VITE_BACKEND_URL"]);