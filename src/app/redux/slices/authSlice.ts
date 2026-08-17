import { createSlice } from "@reduxjs/toolkit"
import { emailVerify } from "../../api/authApi"

const initialState ={
    isLoggedIn : false,
    isInitializing : true,
    user : null,
    token : null,
    error : null,
    loading : false,
    iskeepMeLogin : false,
    message : null,
    resendEmailLoding : false,
    resendEmailMessage : null,
    verifyEmailLoding : false,
    verifyEmailMessage : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState : initialState,
    reducers :{

        loginRequested: (state, action) => {
            state.loading = true
        },

        logoutRequested: (state) => {
            state.loading = true
        },

        loadingStarted: (state) =>{
            state.loading = true
        },

        loginFailed: (state, action) =>{
            console.log(JSON.stringify(action.payload))
            state.loading = false
            state.isLoggedIn = false
            state.error = action.payload
        },

        registerRequest: (state, action) =>{
            state.loading = true
        },
        registeFailed: (state, action) =>{
            state.loading = false
            state.isLoggedIn = false
            state.error = action.payload
        },
        registerSucess : (state,action) =>{
            state.message = action.payload.message
            state.loading = false
            state.error = null
        },
        
        loginSuccess: (state, action) =>{
            state.token = action.payload.token
            state.error = null
        },
        profileSucess : (state, action) =>{
            console.log("payload is ",JSON.stringify(action.payload))
            state.isLoggedIn = true
            state.user = action.payload.user
            state.loading = false
            state.error = null
        },

        logout : (state) =>{
            console.log("logout called ")
            state.loading = false
            state.isLoggedIn = false
            state.token = null
            state.user = null
        },
        LogoutRequrst : (state) =>{
            state.loading = true
        },

        logoutFail :(state, action) =>{
            state.loading = false
            state.isLoggedIn = false
            state.error = action.payload
        },

        initializationComplete: (state) =>{
            state.isInitializing = false
        },

        checkAuthenticationRequested: (state) =>{
            state.loading = true
        },
        changePasswordRequest: (state, action) =>{
            state.loading = true
        },
        changePasswordFailed :(state, action)=>{
            state.loading = false,
             state.error = action.payload
        },
        changePasswordSuccess :(state , action)=>{
            state.loading = false,
            state.message = action.payload.message
        },
        editProfileRequest : (state,action) =>{
            state.loading = true
        },
        editProfileSucess: (state,action)=>{
            state.loading = false,
            state.user = action.payload
        },
        editProfileFailed :(state,action) =>{
            state.loading = false,
             state.error = action.payload
        },
        emailVerifyRequest :(state, action) =>{
            console.log("slice is ",action.payload)
            state.verifyEmailLoding = true
        },
        emailVerifyError :(state, action) =>{
            state.verifyEmailLoding = false
            state.error = action.payload 
        },
        emailVerifySuccess :(state, action) =>{
            state.verifyEmailLoding = false
            state.verifyEmailMessage = action.payload
        },
        resendEmailRequest :(state, action) =>{
            state.resendEmailLoding = true
        },
        resendEmailError :(state, action) =>{
            state.resendEmailLoding = false
            state.error = action.payload 
        },
        resendEmailSuccess :(state, action) =>{
            state.resendEmailLoding = false
            state.resendEmailMessage = action.payload
        }

    }
}
)

export  const {
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
} = authSlice.actions
export default authSlice.reducer