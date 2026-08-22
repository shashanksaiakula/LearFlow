import { createSlice } from "@reduxjs/toolkit";
import { homeResponse } from "../../api/types";


interface HomeState {
    loading: boolean;
    homeResponse: homeResponse | null;
    error: string | null;
}

const initialState: HomeState = {
    loading: false,
    homeResponse: null,
    error: null
};

const homeSlice = createSlice({
    name: 'home',
    initialState : initialState,
    reducers:{
        homeRequest: (state)=>{
            state.loading = true
        },
        homeSuccess : (state,action) =>{
            state.loading = false
            state.homeResponse = action.payload
        },
        homeError:(state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {homeRequest, homeSuccess, homeError } = homeSlice.actions
export default homeSlice.reducer