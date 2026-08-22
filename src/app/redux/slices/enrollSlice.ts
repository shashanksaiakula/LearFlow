import { createSlice } from "@reduxjs/toolkit";
import { Enrollment } from "../../models/Enrollment";
import { enrollIntoCourse, getEnrolledCourse, updateEnrollmentThunk } from "../thunk/enrollThunk";

interface enrollSlicProps {
    loading: boolean,
    error: string | null
    enrollments: Enrollment[] | null,
    enrolled: Enrollment | null
}

const initialState: enrollSlicProps = {
    loading: false,
    error: null,
    enrollments: null,
    enrolled: null
}

const enrollSlicer = createSlice({
    name: "enroll",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        // enroll to course
        builder.addCase(enrollIntoCourse.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(enrollIntoCourse.fulfilled, (state, action) => {
                state.loading = false
                state.enrolled = action.payload
            }),
            builder.addCase(enrollIntoCourse.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Something went wrong"
            })

        // get emrolled data

        builder.addCase(getEnrolledCourse.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getEnrolledCourse.fulfilled, (state, action) => {
                state.loading = false
                state.enrollments = action.payload.data
            }),
            builder.addCase(getEnrolledCourse.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Something went wrong"
            })

            // update enrolled data
            .addCase(updateEnrollmentThunk.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(updateEnrollmentThunk.fulfilled, (state, action) => {
                state.loading = false
                state.enrolled = action.payload
            }),
            builder.addCase(updateEnrollmentThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? "Something went wrong"
            })
    },
})

export default enrollSlicer.reducer