import { createSlice } from "@reduxjs/toolkit";

export interface Notes {
    id: string
    timeStamp: string
    text: string
}
export interface NoteSliceProps {
    // Structure: { [courseId]: { [lessonId]: Notes[] } }
    records: Record<number, Record<number, Notes[]>>;
}

const initialState: NoteSliceProps = {
    records: {}, // Starts completely empty
};

const noteSlice = createSlice({
    name: "Notes",
    initialState: initialState,
    reducers: {
        addNote: (state, action) => {
            const { courseId, lessonId, note } = action.payload;

            if (!state.records[courseId]) {
                state.records[courseId] = {};
            }

            if (!state.records[courseId][lessonId]) {
                state.records[courseId][lessonId] = [];
            }

            state.records[courseId][lessonId].push(note);
        },
    },

})

export const { addNote } = noteSlice.actions
export default noteSlice.reducer