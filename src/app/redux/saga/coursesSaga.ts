import { call, takeLatest, put,all } from "redux-saga/effects";
import { getAllCoursesData, getCourseByIdApi } from "../../api/coursesApi";
import { allCourses, getAllCoursesError, getCourseById, requestAllCourses, requestCourseById } from "../slices/courseSlicer";



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

function* getCourseByIdrWorker(action : ReturnType<typeof getCourseById>) :Generator {
     try{
        const response = yield call(getCourseByIdApi, action.payload)
         console.log("call api", response)
        yield put(getCourseById(response.data))

     } catch(err){
        yield put(getAllCoursesError(err?.message ?? "sorry something went wrong"))
     }
}


function* coursesWatcher() {
    yield takeLatest(
        requestAllCourses.type,
        coursesWorker
    )
}

function* getCourseByIdWatcher(){
    yield takeLatest(
        requestCourseById.type,
        getCourseByIdrWorker
    )
}

export default function* coursesSaga() {
    yield all([
        coursesWatcher(),
        getCourseByIdWatcher()
])
    
}