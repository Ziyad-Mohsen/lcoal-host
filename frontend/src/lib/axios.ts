import axios from "axios";

export const apiBaseUrl = "http://192.168.1.21:3000/api/v1";

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});
