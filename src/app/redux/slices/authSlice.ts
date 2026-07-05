import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    isLoggedIn : false,
    isInitializing : true,
    user : null,
    token : null,
    error : null,
    loading : false
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

        
        loginSuccess: (state, action) =>{
            state.isLoggedIn = true
            state.token = action.payload.token
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

export  const {loginSuccess, logout, initializationComplete, loadingStarted, loginFailed, loginRequested, logoutRequested, checkAuthenticationRequested} = authSlice.actions
export default authSlice.reducer