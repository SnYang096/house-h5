/* eslint-disable @typescript-eslint/no-explicit-any */
 
import axios from 'axios';



export interface ApiResponse<T = any> {
  code: number;
  result: T;
  message: string;
}

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

http.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  // config.headers['Authorization'] = `Bearer ${localStorage.getItem(TOKEN_STORAGE) ?? ''}`;
  return config;
});

http.interceptors.response.use(
  (response) => {
    if (response.data.code !== 0) {
      const { config } = response as any;

      if (config.showCustomError && response.data.code === 500) {
        return null;
      }
      return Promise.reject(response.data);
    } 
    
    return response.data;
  },
  (reason) => {
    if (reason.response?.data) {
      return Promise.reject(reason.response.data);
    }
    return Promise.reject(reason);
  },
);
export default http;
