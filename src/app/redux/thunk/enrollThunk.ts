import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEnrollResponse, postEnrollRequest, postEnrollResponse } from "../../api/types";
import axios from "axios";
import { enrollToCousre, getAllENrolleCousrses } from "../../api/enrollApi";

export const enrollIntoCousre = createAsyncThunk<
    postEnrollResponse,
    postEnrollRequest,
    {
        rejectValue: string
    }
>(
    "enrollIntoCousre/add",
    async (request, { rejectWithValue }) => {
        try {
            const response = await enrollToCousre(request)
            console.log("enroll is",response)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data.error ??
                    "Unable to fetch instructor"
                )
            }
            console.log("eroolent add error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)

export const getEnrolledCourse = createAsyncThunk<
    getEnrollResponse,
    void,
    {
        rejectValue: string
    }
>(
    "getEnrolledCourse/fetch",
    async (request, { rejectWithValue }) => {
        try {
            const response = await getAllENrolleCousrses()
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data.error ??
                    "Unable to fetch instructor"
                )
            }
            console.log("eroolent add error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)