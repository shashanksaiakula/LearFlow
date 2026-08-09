import { createSlice } from "@reduxjs/toolkit";
import { Enrollment } from "../../models/Enrollment";
import { enrollIntoCousre, getEnrolledCourse } from "../thunk/enrollThunk";

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
        builder.addCase(enrollIntoCousre.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(enrollIntoCousre.fulfilled, (state, action) => {
                state.loading = false
                state.enrolled = action.payload
            }),
            builder.addCase(enrollIntoCousre.rejected, (state, action) => {
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
    },
})

export default enrollSlicer.reducer