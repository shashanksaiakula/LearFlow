import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBookmaekRequest, addBookmarkResponse, deleteBookmarkRequest, deleteBookmarkResponse, getBookmarkResponse } from "../../api/types";
import { addtoBookmarkApi, deleteBookmarkApi, getBookmarkApi } from "../../api/bookmarkApi";
import axios from "axios";

export const addBookmark = createAsyncThunk<
    addBookmarkResponse,
    addBookmaekRequest,
    {
        rejectValue: string
    }
>(
    "addBookmark/add",
    async (request, { rejectWithValue }) => {
        try {
            const addedBookarkres = await addtoBookmarkApi(request)
            return addedBookarkres.data
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

export const getBookmark = createAsyncThunk<
    getBookmarkResponse,
    void,
    {
        rejectValue: string
    }
>(
    "getBookmark/fetch",
    async (request, { rejectWithValue }) => {
        try {
            const getBookmarkres = await getBookmarkApi()
            return getBookmarkres.data
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

export const deleteBookmark = createAsyncThunk<
    deleteBookmarkResponse,
    deleteBookmarkRequest,
    {
        rejectValue: string
    }
>(
    "deleteBookmark/fetch",
    async (request, { rejectWithValue }) => {
        try {
            const deleteBookmarkres = await deleteBookmarkApi(request)
            return deleteBookmarkres.data
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