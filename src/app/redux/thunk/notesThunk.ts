import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteNoteRequest, deleteNoteResponse, getNoteRequest, getNoteResponse, postNoteRequest, postNoteResponse, updateNoteRequest, updateNoteResponse } from "../../api/types";
import axios from "axios";
import { deleteNotesApi, getNotesAPi, postNotesApi, updateNotesApi } from "../../api/notesApi";

export const getNotes = createAsyncThunk<
    getNoteResponse,
    getNoteRequest,
    {
        rejectValue: string
    }
>(
    "getNotes/fetch",
    async (request, { rejectWithValue }) => {
        try {
            const response = await getNotesAPi(request)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.error ??
                    "Unable to get notes"
                )
            }
            console.log("leson error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)

export const postNotes = createAsyncThunk<
    postNoteResponse,
    postNoteRequest,
    {
        rejectValue: string
    }
>(
    "addNotes/add",
    async (request, { rejectWithValue }) => {
        try {
            const response = await postNotesApi(request)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.error ??
                    "Unable to add notes"
                )
            }
            console.log("leson error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)

export const updateNotes = createAsyncThunk<
    updateNoteResponse,
    updateNoteRequest,
    {
        rejectValue: string
    }
>(
    "updateNotes/update",
    async (request, { rejectWithValue }) => {
        try {
            const response = await updateNotesApi(request)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.error ??
                    "Unable to update the note"
                )
            }
            console.log("leson error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)

export const deleteNotes = createAsyncThunk<
    deleteNoteResponse,
    deleteNoteRequest,
    {
        rejectValue: string
    }
>(
    "deleteNotes/delete",
    async (request, { rejectWithValue }) => {
        try {
            const response = await deleteNotesApi(request)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.error ??
                    "Unable to update the note"
                )
            }
            console.log("leson error is " + error?.message)
            return rejectWithValue("Something went wrong")
        }
    }
)