import apiClient from './apiClinet';
import { ENDPOINTS } from './endpoint';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from './types';

export const login = (
  loginRequest: LoginRequest
) => {
  return apiClient.post<LoginResponse>(ENDPOINTS.LOGIN, loginRequest);
};

export const register =(
  request : RegisterRequest
) => {
  return apiClient.post<RegisterResponse>(ENDPOINTS.REGISTER, request)
}

export const profile = () => {
  return apiClient.get<User>(ENDPOINTS.GET_USER)
}