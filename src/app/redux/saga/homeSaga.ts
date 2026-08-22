import { takeLatest,put, call } from "redux-saga/effects";
import { homeError, homeRequest, homeSuccess } from "../slices/homeSlicer";
import { home } from "../../api/homeApi";


function* homeWorker(): Generator{
    try{
       const response =  yield call(home)
       yield put(homeSuccess(response.data))
    } catch (err) {
        console.log("home error is "+err.message)
        yield put(homeError(err?.message ?? "Sorry, something went wrong"))
    }
}

function* homeWatcher() {
    console.log("home watcher")
    yield takeLatest(
        homeRequest.type,
        homeWorker
    )
}

export default function* homeSaga() {
    yield homeWatcher()
    
}