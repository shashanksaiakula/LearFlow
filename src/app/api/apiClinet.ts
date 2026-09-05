import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { authStorage } from '../utils/AuthToken';
import { ENDPOINTS } from './endpoint';

// const apiClient = axios.create({
//   baseURL: 'https://reqres.in/api',
//   // timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
export const BASE_URL = 'http://192.168.1.13:3000';
// export const BASE_URL = 'https://learnflow-backend-express-js-git-350451054562.europe-west1.run.app';
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

apiClient.interceptors.request.use(
  async (config) => {

    // console.log("URL:", config.baseURL + config.url);
    const token = await authStorage.getAccessToken()

    if (token) {
      // Attach bearer token when available
      (config.headers as any).Authorization = `Bearer ${token}`;
      (config.headers as any).Authorization = `Bearer ${token}`;
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
  response => {
    console.log(
      "API SUCCESS:",
      response.config.url,
      response.status
    );

    return response;
  },

  async error => {

    console.log(
      "API ERROR:",
      error.config?.url,
      error.response?.status,
      error.response?.data
    );

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      console.log("401 → Trying refresh token");

      originalRequest._retry = true;

      try {

        const refreshToken =
          await authStorage.getRefreshToken();

        console.log(
          "Refresh token exists:",
          !!refreshToken
        );

        if (!refreshToken) {
          console.log("NO REFRESH TOKEN");

          await authStorage.clearTokens();
          store.dispatch(logout());

          return Promise.reject(error);
        }

        console.log("Calling refresh API");

        const response = await axios.post(
          `${BASE_URL}${ENDPOINTS.REFRESH_TOKEN}`,
          {
            refreshToken,
          }
        );

        console.log(
          "REFRESH RESPONSE:",
          response.status,
          response.data
        );

        const newAccessToken =
          response.data.accessToken;

        if (!newAccessToken) {
          throw new Error(
            "No accessToken returned from refresh API"
          );
        }

        await authStorage.saveAccessToken(
          newAccessToken
        );

        console.log(
          "New access token saved"
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        console.log(
          "Retrying:",
          originalRequest.url
        );

        return apiClient(originalRequest);

      } catch (refreshError: any) {

        console.log(
          "REFRESH FAILED:",
          refreshError.response?.status,
          refreshError.response?.data,
          refreshError.message
        );

        await authStorage.clearTokens();

        store.dispatch(logout());

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;