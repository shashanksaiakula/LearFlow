import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { authStorage } from '../utils/AuthToken';

const apiClient = axios.create({
  baseURL: 'https://reqres.in/api',
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClikent2 = axios.create({
  baseURL : "http://192.168.1.8:3000",
  headers :{
    'Content-Type': 'application/json',
  }
})

apiClient.interceptors.request.use(
  (config) => {
        config.headers["x-api-key"] = "pub_fc34cc293ca14bcb77514b80534a5b82571fcfcec35f220777d8c7c4f74580e9";

    // console.log("URL:", config.baseURL + config.url);
    console.log("Headers:", config.headers);
    console.log("Body:", config.data);
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request Error:', error);
      console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.log("Message:", error.message);
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
    if(error.response?.status === 401){
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