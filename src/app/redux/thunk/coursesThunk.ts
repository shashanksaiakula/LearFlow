import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCoursesResponse } from "../../api/types";
import { getAllCoursesData } from "../../api/coursesApi";
import axios from "axios";

export const fetchCourses = createAsyncThunk<
    getAllCoursesResponse,
    void,
    {
        rejectValue: string
    }
>(
    "courses/fetch",
    async (request, { rejectWithValue }) => {
        try {

            const response = await getAllCoursesData()
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.error ??
                    "Unable to fetch lesson"
                )
            }
            console.log("leson error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)