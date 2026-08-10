import { createSlice } from "@reduxjs/toolkit";
import { Bookmark } from "../../models/Bookmark";
import { addBookmark, deleteBookmark, getBookmark } from "../thunk/thunkBookmark";

export interface bookmarkSlicePops {
    loading: boolean,
    error: string | null
    bookmarks: Bookmark[] | null
    bookmark: Bookmark | any
}

const initialState: bookmarkSlicePops = {
    loading: false,
    error: null,
    bookmarks: null,
    bookmark: null

}

const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        // add bookmark
        builder.addCase(addBookmark.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addBookmark.fulfilled, (state, action) => {
            state.loading = false
            state.bookmark = action.payload
        }),
        builder.addCase(addBookmark.rejected, (state, action) => {
            state.error = action.payload ?? "something went worng"
        }),
        // get bookmark
        builder.addCase(getBookmark.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getBookmark.fulfilled, (state, action) => {
            state.loading = false
            state.bookmarks = action.payload.data
        }),
        builder.addCase(getBookmark.rejected, (state, action) => {
            state.error = action.payload ?? "something went worng"
        }),
        // deletebookmark
        builder.addCase(deleteBookmark.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(deleteBookmark.fulfilled, (state, action) => {
            state.loading = false
            state.bookmark = action.payload
        }),
        builder.addCase(deleteBookmark.rejected, (state, action) => {
            state.error = action.payload ?? "something went worng"
        })
    },
})

export default bookmarkSlice.reducer