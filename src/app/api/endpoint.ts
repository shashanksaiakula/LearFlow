export const ENDPOINTS = {
    LOGIN: '/auth/login',
    LOGOUT: 'auth/logout',
    REGISTER: 'auth/register',
    GET_USER: 'auth/profile',
    UPDATE_PASSWORD: '/update-password',
    FORGOT_PASSWORD: '/forgot-password',
    GETALLCOURSES : '/courses',
    GETCOURSEBYID : '/course',
    HOME: '/home',
    GETLESSSONBYID : '/course',
    TRANSCRIPT : '/transcript'
} as const;