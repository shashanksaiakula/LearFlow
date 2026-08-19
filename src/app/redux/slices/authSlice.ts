import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    isInitializing: true,
    user: null,
    token: null,
    error: null,
    loading: false,
    iskeepMeLogin: false,
    message: null,
    resendEmailLoding: false,
    resendEmailMessage: null,
    verifyEmailLoding: false,
    verifyEmailMessage: null,
    isEmailverified: false,
    resetPasswordLoading: false,
    resetPasswordMessage: null,
    resetPasswordError: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

        loginRequested: (state, action) => {
            state.loading = true
        },

        logoutRequested: (state) => {
            state.loading = true
        },

        loadingStarted: (state) => {
            state.loading = true
        },

        loginFailed: (state, action) => {
            console.log(JSON.stringify(action.payload))
            state.loading = false
            state.isLoggedIn = false
            state.error = action.payload
        },

        registerRequest: (state, action) => {
            state.loading = true
        },
        registeFailed: (state, action) => {
            state.loading = false
            state.isLoggedIn = false
            state.error = action.payload
        },
        registerSucess: (state, action) => {
            state.message = action.payload.message
            state.loading = false
            state.error = null
        },

        loginSuccess: (state, action) => {
            state.token = action.payload.token
            state.error = null
        },
        profileSucess: (state, action) => {
            state.isLoggedIn = true
            console.log("check",action.payload.user.isEmailVerified)
            state.user = action.payload.user
            state.isEmailverified = action.payload.user.isEmailVerified
            state.loading = false
            state.error = null
        },

        logout: (state) => {
            console.log("logout called ")
            state.loading = false
            state.isLoggedIn = false
            state.token = null
            state.user = null
        },
        LogoutRequrst: (state) => {
            state.loading = true
        },

        logoutFail: (state, action) => {
            state.loading = false
            state.isLoggedIn = false
            state.error = action.payload
        },

        initializationComplete: (state) => {
            state.isInitializing = false
        },

        checkAuthenticationRequested: (state) => {
            state.loading = true
        },
        changePasswordRequest: (state, action) => {
            state.loading = true
        },
        changePasswordFailed: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        changePasswordSuccess: (state, action) => {
            state.loading = false,
                state.message = action.payload.message
        },
        editProfileRequest: (state, action) => {
            state.loading = true
        },
        editProfileSucess: (state, action) => {
            state.loading = false,
                state.user = action.payload
        },
        editProfileFailed: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        emailVerifyRequest: (state, action) => {
            console.log("slice is ", action.payload)
            state.verifyEmailLoding = true
        },
        emailVerifyError: (state, action) => {
            state.verifyEmailLoding = false
            state.error = action.payload
        },
        emailVerifySuccess: (state, action) => {
            state.verifyEmailLoding = false
            state.verifyEmailMessage = action.payload.message
             state.isEmailverified = true
        },
        resendEmailRequest: (state, action) => {
            state.resendEmailLoding = true
        },
        resendEmailError: (state, action) => {
            state.resendEmailLoding = false
            state.error = action.payload
        },
        resendEmailSuccess: (state, action) => {
            state.resendEmailLoding = false
            state.resendEmailMessage = action.payload.message
        },
        forgotPasswordRequest: (state, action) => {
            state.loading = true
            state.error = null
            state.message = null
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.error = null
        },
        forgotPasswordFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.message = null
        },
        resetPasswordRequest: (state, action) => {
            state.resetPasswordLoading = true
            state.resetPasswordError = null
            state.resetPasswordMessage = null
        },
        resetPasswordSuccess: (state, action) => {
            state.resetPasswordLoading = false
            state.resetPasswordMessage = action.payload.message
            state.resetPasswordError = null
        },
        resetPasswordFailed: (state, action) => {
            state.resetPasswordLoading = false
            state.resetPasswordError = action.payload
            state.resetPasswordMessage = null
        }

    }
}
)

export const {
    loginSuccess,
    logout,
    initializationComplete,
    loadingStarted,
    loginFailed,
    loginRequested,
    logoutRequested,
    checkAuthenticationRequested,
    registerRequest,
    registeFailed,
    registerSucess,
    profileSucess,
    LogoutRequrst,
    logoutFail,
    changePasswordFailed,
    changePasswordRequest,
    changePasswordSuccess,
    editProfileFailed,
    editProfileRequest,
    editProfileSucess,
    emailVerifyError,
    emailVerifyRequest,
    emailVerifySuccess,
    resendEmailError,
    resendEmailRequest,
    resendEmailSuccess,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailed,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailed,
} = authSlice.actions
export default authSlice.reducer