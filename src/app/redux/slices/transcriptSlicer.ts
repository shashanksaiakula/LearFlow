import { createSlice } from "@reduxjs/toolkit";
import { fetchTranscript } from "../thunk/transcriptThunk";
import { TranscriptResponse } from "../../api/types";



export interface TranscriptState {
    loading : boolean
    transcript : TranscriptResponse | null
    error : string | null
}

const initialState : TranscriptState ={
    loading : false,
    transcript : null,
    error : null

}

const transcriptSlice = createSlice({
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
            console.log("Transcript error:", action.payload)
            state.loading = false
            state.error = action.payload ?? "Something went wrong"
        })
    }
})

export default transcriptSlice.reducer