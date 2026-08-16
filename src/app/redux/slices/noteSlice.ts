import { createSlice } from "@reduxjs/toolkit";
import { Notes } from "../../models/Notes";
import { deleteNotes, getNotes, postNotes, updateNotes } from "../thunk/notesThunk";


export interface NoteSliceProps {
    // Structure: { [courseId]: { [lessonId]: Notes[] } }
    // records: Record<number, Record<number, Notes[]>>;
    lodingEdit: boolean,
    lodingDelete: boolean,
    loding: boolean
    error: string | null,
    noteslist: Notes[] | null,
    note: Notes | null
}

const initialState: NoteSliceProps = {
    // records: {}, // Starts completely empty
    lodingEdit: false,
    lodingDelete: false,
    loding : false,
    error: null,
    noteslist: null,
    note: null
};

const noteSlice = createSlice({
    name: "Notes",
    initialState: initialState,
    reducers: {
        // addNote: (state, action) => {
        //     const { courseId, lessonId, note } = action.payload;

        //     // if (!state.records[courseId]) {
        //     //     state.records[courseId] = {};
        //     // }

        //     // if (!state.records[courseId][lessonId]) {
        //     //     state.records[courseId][lessonId] = [];
        //     // }

        //     // state.records[courseId][lessonId].push(note);
        // },
    },
    extraReducers(builder) {
        // get note
        builder.addCase(getNotes.pending, (state) => {
            state.loding = true
        }).addCase(getNotes.fulfilled, (state, action) => {
            state.loding = false
            state.noteslist = action.payload.data ?? []
        }).addCase(getNotes.rejected, (state, action) => {
            console.log("error gte notes", action.payload)
            state.loding = false
              state.noteslist = null
            state.error = action.payload ?? "Something went wrong"
        })

            // add note
            .addCase(postNotes.pending, (state) => {
                state.loding = true
            }).addCase(postNotes.fulfilled, (state, action) => {
                state.loding = false
                state.note = action.payload.note
            }).addCase(postNotes.rejected, (state, action) => {
                state.loding = false
                state.error = action.payload ?? "Something went wrong"
            })

            // put note
            .addCase(updateNotes.pending, (state) => {
                state.lodingEdit = true
            }).addCase(updateNotes.fulfilled, (state, action) => {
                state.lodingEdit = false
                state.note = action.payload.note
            }).addCase(updateNotes.rejected, (state, action) => {
                state.lodingEdit = false
                state.error = action.payload ?? "Something went wrong"
            })

            // delete note
            .addCase(deleteNotes.pending, (state) => {
                state.lodingDelete = true
            }).addCase(deleteNotes.fulfilled, (state, action) => {
                state.lodingDelete = false
                state.note = action.payload.note
            }).addCase(deleteNotes.rejected, (state, action) => {
                state.lodingDelete = false
                state.error = action.payload ?? "Something went wrong"
            })
    },

})

// export const { addNote } = noteSlice.actions
export default noteSlice.reducer