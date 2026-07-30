import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { authStorage } from '../utils/AuthToken';

// const apiClient = axios.create({
//   baseURL: 'https://reqres.in/api',
//   // timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export const apiClient = axios.create({
  baseURL: "http://192.168.1.5:3000",
  headers: {
    'Content-Type': 'application/json',
  }
})

apiClient.interceptors.request.use(
  async (config) => {

    // console.log("URL:", config.baseURL + config.url);
    const token = await authStorage.getToken()

    if (token) {
      // Correct way to assign headers in modern Axios
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token attached successfully");
    }
    console.log("Headers:", config.headers);
    console.log("Body:", config.data);

    return config;
  },
  (error) => {
    // Handle request configuration errors
    console.error('Request Setup Error:', error);
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    console.log("Response Status:", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.error('Response Error:', error);
    if (error.response?.status === 401) {
      // && !originalRequest._retry) {
      //  originalRequest._retry = true;      
      //  await authStorage.clearToken();
      // // Handle 401 Unauthorized error
      // console.log("Unauthorized access. Redirecting to login...");
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default apiClient;