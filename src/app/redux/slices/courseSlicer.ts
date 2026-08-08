import { createSlice } from "@reduxjs/toolkit";
import { Course } from "../../models/course";
import { fetchCourses } from "../thunk/coursesThunk";
import { getAllCoursesResponse } from "../../api/types";



export interface CousrseState {
    courses: Course[] | null,
    loading: boolean,
    error: string | null
}



const initialState : CousrseState = {
    courses: null,
    loading: false,
    error: null
}


const courseSlicer = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {

        requestAllCourses: (state) => {
            state.loading = true
        },

        requestCoueseById:(state,action) => {
            state.loading = true
        },

        allCourses: (state, action) => {
            state.loading = false
            state.courses = action.payload
        },

        getCourseById: (state, action)=>{
            state.loading = false
            state.courses = action.payload
        },
        getCourseByIdError : (state,action)=>{
            state.loading = false
            state.error = action.payload
        },

        getAllCoursesError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCourses.pending, (state) =>{
            state.loading = true
        }),
        builder.addCase(fetchCourses.fulfilled, (state,action)=>{
            state.loading = false,
            state.courses = action.payload
        }),
        builder.addCase(fetchCourses.rejected,(state, action)=>{
            state.loading = false
            state.error = action.payload ?? "Something went wrong";
        })
    },

})

export const { requestAllCourses, allCourses, getAllCoursesError,requestCoueseById,getCourseById,getCourseByIdError } = courseSlicer.actions
export default courseSlicer.reducer