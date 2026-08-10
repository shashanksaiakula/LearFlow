import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCoursesResponse, getInsructorRequest, getInsructorResponse, getLessonsByCourseCodeRequest, getLessonsByCourseCodeResponse, getReviewsRequest, getReviewsResponse } from "../../api/types";
import { getAllCoursesData, getInstructorInfoApi, getLessonByCourseApi, getReviewsApi, } from "../../api/coursesApi";
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
                    "Unable to fetch cousre"
                )
            }
            console.log("leson error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)

export const fetchLessonsByCousre = createAsyncThunk<
    getLessonsByCourseCodeResponse,
    getLessonsByCourseCodeRequest,
    {
        rejectValue: string
    }
>(
    "lessonByCourse/fetch",
    async (request, { rejectWithValue }) => {
        try {
            const response = await getLessonByCourseApi(request)
            console.log("lesson api call", response)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.error ??
                    "Unable to fetch all lesson by cousreCode"
                )
            }
            console.log("leson error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)

export const fetchCourseReviews = createAsyncThunk<
    getReviewsResponse,
    getReviewsRequest,
    {
        rejectValue: string
    }
>(
    "fetchReviewsByCourses/fetch",
    async (request, { rejectWithValue }) => {
        try {
            const response = await getReviewsApi(request)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data.error ??
                    "Unable to fetch reviews"
                )
            }
            console.log("leson error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)

export const fetchCourseInsrtuctor = createAsyncThunk<
    getInsructorResponse,
    getInsructorRequest,
    {
        rejectValue: string
    }
>(
    "fetchinstructorByCourses/fetch",
    async (request, { rejectWithValue }) => {
        try {
            const response = await getInstructorInfoApi(request)
            console.log("sffsdfsfsfsdf",response.data)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data.error ??
                    "Unable to fetch instructor"
                )
            }
            console.log("instructor error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)