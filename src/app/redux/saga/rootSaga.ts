import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import coursesSaga from "./coursesSaga";
import homeSage from "./homeSaga";


export default function* rootSaga() {
    yield all([
        authSaga(),
        coursesSaga(),
        homeSage()
    ])
}