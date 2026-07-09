import { call, takeLatest, put } from "redux-saga/effects";
import { getAllCoursesData } from "../../api/coursesApi";
import { allCourses, getAllCoursesError, requestAllCourses } from "../slices/courseSlicer";



function* coursesWorker(): Generator {
    try {
        const response = yield call(getAllCoursesData)
        console.log("courses respons is "+ JSON.stringify(response.data))
        if (response) {
            yield put(allCourses(response.data))
        }
    } catch (err) {
        yield put(getAllCoursesError(err?.message ?? "sorry something went wrong"))
    }
}


function* coursesWatcher() {
    yield takeLatest(
        requestAllCourses.type,
        coursesWorker
    )
}

export default function* coursesSaga() {
    yield coursesWatcher()
}