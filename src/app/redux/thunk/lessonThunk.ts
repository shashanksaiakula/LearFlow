import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLessonByIdApi } from "../../api/lessonAPi";
import { LessonByIdRequest, LessonByIdResponse } from "../../api/types";
import axios from "axios";

export const fetchLesson = createAsyncThunk<
    LessonByIdResponse,
    LessonByIdRequest,
    {
        rejectValue : string
    }
>(
    "lesson/fetchLesson",

    async (request, {rejectWithValue }) => {
        try{
        const response = await getLessonByIdApi(request)
            console.log("response is "+ JSON.stringify(response))
        return response.data
        } catch(error){
            if (axios.isAxiosError(error)){
                return rejectWithValue(
                    error.response?.data?.error ?? 
                    "Unable to fetch lesson"
                )
            }
            console.log("leson error is "+ error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)