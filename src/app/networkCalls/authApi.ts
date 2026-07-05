import apiClient from './apiClinet';
import { ENDPOINTS } from './endpoint';
import { LoginRequest, LoginResponse } from './types';

export const login = (
  loginRequest: LoginRequest
) => {
  return apiClient.post<LoginResponse>(ENDPOINTS.LOGIN, loginRequest);
};