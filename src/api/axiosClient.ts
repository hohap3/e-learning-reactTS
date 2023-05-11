import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants";
import { Status } from "../models";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse<any>) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const { status } = error.response;
    if (status === Status.UNAUTHORIZED) return Promise.reject("");
    return Promise.reject(error);
  }
);

export default axiosClient;
