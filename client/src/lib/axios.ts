import axios, { AxiosInstance } from "axios";

const axiosConnection: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    Accept: "application/json",
  },
});

export default axiosConnection;
