import { createSlice } from "@reduxjs/toolkit";
import { fetchTranscript } from "../thunk/transcriptThunk";
import { TranscriptResponse } from "../../api/types";



export interface transcriptState {
    loading : boolean
    transcript : TranscriptResponse | null
    error : string | null
}

const initialState : transcriptState ={
    loading : false,
    transcript : null,
    error : null

}

const transcriptSclicer  = createSlice({
    name : 'transcript',
    initialState : initialState,
    reducers: {},
    extraReducers :(builder) =>{
        builder.addCase(fetchTranscript.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchTranscript.fulfilled, (state, action) =>{
            state.loading = false
            state.transcript = action.payload
        })
        .addCase(fetchTranscript.rejected, (state, action) =>{
            state.loading = false
            state.error = action.payload ?? "some thing went wrong"
        })
    }
})

export default transcriptSclicer.reducer