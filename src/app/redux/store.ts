import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import coursesReducer from './slices/courseSlicer'
import homeReducer from './slices/homeSlicer'
import lessonReducer from './slices/lessonSlicer'
import createSagaMiddleware from "redux-saga";
import transcriptReducer from './slices/transcriptSlicer'
import notesReducer from './slices/noteSlice'
import enrollReducer from './slices/enrollSlice'
import rootSaga from "./saga/rootSaga";
import { useDispatch } from "react-redux";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer :{
        auth : authReducer,
        courses : coursesReducer,
        home : homeReducer,
        lesson : lessonReducer,
        transcript : transcriptReducer,
        note : notesReducer,
        enroll : enrollReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
