import apiClient from './apiClinet';
import { ENDPOINTS } from './endpoint';
import { ChangePasswordRequest, ChangePasswordResponse, EditPriofileRequest, EditPriofileResponse, emailVerifyRequest, emailVerifyResponse, LoginRequest, LoginResponse, LogoutResponse, RegisterRequest, RegisterResponse, resendEmailVerifyRequest, resendEmailVerifyResponse, User } from './types';

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

export const changePasswordApi =(request : ChangePasswordRequest) =>{
  return apiClient.post<ChangePasswordResponse>(ENDPOINTS.UPDATE_PASSWORD, request)
}

export const logoutApi =()=>{
  return apiClient.post<LogoutResponse>(ENDPOINTS.LOGOUT)
}

export const editProfileApi =(
  request : EditPriofileRequest
)=>{
  return apiClient.put<EditPriofileResponse>(ENDPOINTS.EDIT_USER, request)
}

export const emailVerify =(
  request : emailVerifyRequest
)=>{
  return apiClient.post<emailVerifyResponse>(ENDPOINTS.EMAIL_VERIFY, request)
}

export const resendEmailVerifcation =(
  request : resendEmailVerifyRequest
)=>{
  return apiClient.post<resendEmailVerifyResponse>(ENDPOINTS.RESEND_EMAIL_VERIFY, request)
}