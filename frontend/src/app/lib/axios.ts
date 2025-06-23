import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
axiosInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("Auth-Token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
