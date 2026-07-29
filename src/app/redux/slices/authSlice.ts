import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    isLoggedIn : false,
    isInitializing : true,
    user : null,
    token : null,
    error : null,
    loading : false,
    iskeepMeLogin : false,
    message : null
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
            state.isLoggedIn = false
            state.token = null
            state.user = null
        },

        initializationComplete: (state) =>{
            state.isInitializing = false
        },

        checkAuthenticationRequested: (state) =>{
            state.loading = true
        }

    }
}
)

export  const {loginSuccess, logout, initializationComplete, loadingStarted, loginFailed, loginRequested, logoutRequested, checkAuthenticationRequested,
    registerRequest,
    registeFailed,
    registerSucess,
    profileSucess
} = authSlice.actions
export default authSlice.reducer