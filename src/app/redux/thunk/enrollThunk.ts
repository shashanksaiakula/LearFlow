import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEnrollResponse, postEnrollRequest, postEnrollResponse, updateEnrollmentRequest, updateEnrollmentResponse } from "../../api/types";
import axios from "axios";
import { enrollToCousre, getAllENrolleCousrses, updateEnrollment } from "../../api/enrollApi";

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
            console.log(JSON.stringify(request))
            const response = await enrollToCousre(request)
            console.log("enroll is", response)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data.error ??
                    "Unable to enroll into course"
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
                    "Unable to fetch emrolled details"
                )
            }
            console.log("eroolent add error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)

export const updateEnrollent = createAsyncThunk<
    updateEnrollmentResponse,
    updateEnrollmentRequest,
    {
        rejectValue: string
    }
>(
    "updateEnrollment/update",
    async (request, { rejectWithValue }) => {
        try {
            const response = await updateEnrollment(request)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data.error ??
                    "Unable to update enrolled cousre"
                )
            }
            console.log("eroolent add error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)