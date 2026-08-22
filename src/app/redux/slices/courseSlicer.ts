import { createSlice } from "@reduxjs/toolkit";
import { Course } from "../../models/course";
import { fetchCourseInstructor, fetchCourseReviews, fetchCourses, fetchLessonsByCourse } from "../thunk/coursesThunk";
import { Lesson } from "../../models/Lesson";
import { Review } from "../../models/Reviews";
import { Instructor } from "../../models/Instructor";



export interface CousrseState {
    courses: Course[] | null,
    loading: boolean,
    error: string | null,
    course : Course | null,
    lessons : Lesson[] |null,
    reviews : Review[] | null,
    instructor : Instructor | null
}



const initialState : CousrseState = {
    courses: null,
    loading: false,
    error: null,
    course : null,
    lessons : null,
    reviews : null,
    instructor : null
}


const courseSlicer = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {

        requestAllCourses: (state) => {
            state.loading = true
        },

        requestCourseById:(state,action) => {
            state.loading = true
        },

        allCourses: (state, action) => {
            state.loading = false
            state.courses = action.payload
        },

        getCourseById: (state, action)=>{
            state.loading = false
            state.course = action.payload
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
        }),

        //fetch lesson by cousres
        builder.addCase(fetchLessonsByCourse.pending, (state) =>{
             state.loading = true
        }),
        builder.addCase(fetchLessonsByCourse.fulfilled, (state,action)=>{
            console.log("lessons", action.payload)
            state.loading = false,
            state.lessons = action.payload
        }),
        builder.addCase(fetchLessonsByCourse.rejected, (state,action) =>{
             state.loading = false,
            state.error = action.payload ?? "Something went wrong";
        })
        
        //fetch instructor by cousres
         builder.addCase(fetchCourseInstructor.pending, (state)=>{
             state.loading = true
        }),
        builder.addCase(fetchCourseInstructor.fulfilled, (state,action)=>{
            console.log("instructor paylod", action.payload.data)
            state.loading = false,
            state.instructor = action.payload.data
        }),
        builder.addCase(fetchCourseInstructor.rejected, (state,action) =>{
             state.loading = false,
            state.error = action.payload ?? "Something went wrong";
        })

         //fetch reviews by cousres
          builder.addCase(fetchCourseReviews.pending, (state)=>{
             state.loading = true
        }),
        builder.addCase(fetchCourseReviews.fulfilled, (state,action)=>{
            console.log("reviews", action.payload)
            state.loading = false,
            state.reviews = action.payload.data
        }),
        builder.addCase(fetchCourseReviews.rejected, (state,action) =>{
             state.loading = false,
            state.error = action.payload ?? "Something went wrong";
        })
    },

})

export const { requestAllCourses, allCourses, getAllCoursesError,requestCourseById,getCourseById,getCourseByIdError } = courseSlicer.actions
export default courseSlicer.reducer