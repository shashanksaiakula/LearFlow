import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courses: [],
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

        allCourses: (state, action) => {
            state.loading = false
            state.courses = action.payload
        },

        getAllCoursesError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }

})

export const { requestAllCourses, allCourses, getAllCoursesError } = courseSlicer.actions
export default courseSlicer.reducer