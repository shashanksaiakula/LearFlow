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

const homeSlicer = createSlice({
    name: 'home',
    initialState : initialState,
    reducers:{
        homeRequest: (state)=>{
            state.loading = true
        },
        homeSucess : (state,action) =>{
            state.loading = false
            state.homeResponse = action.payload
        },
        homeError:(state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {homeRequest, homeSucess, homeError } = homeSlicer.actions
export default homeSlicer.reducer