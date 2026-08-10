import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../../models/Lesson";
import { fetchLesson } from "../thunk/lessonThunk";
import { LessonByIdResponse } from "../../api/types";


export interface LessonState {
    loading : boolean
    lesson : Lesson | null
    error : string | null
}

const initialState : LessonState ={
    loading : false,
    lesson : null,
    error : null
}


const LessonSlicce = createSlice({
    name : 'lesson',
    initialState : initialState,
    reducers :{},
    extraReducers :(builder) =>{
        builder.addCase(fetchLesson.pending, (state) =>{
            state.loading = true
        })
        .addCase(fetchLesson.fulfilled, (state,action) =>{
            state.loading = false
            state.lesson = action.payload.data
        })
        .addCase(fetchLesson.rejected, (state,action) =>{
            state.loading = false
            state.error = action.payload ?? "Some thing went wrong"
        })
    }

})

export default LessonSlicce.reducer
