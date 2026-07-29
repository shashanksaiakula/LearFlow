import { takeLatest, put, call, all } from "redux-saga/effects";
import { checkAuthenticationRequested, initializationComplete, loginFailed, loginRequested, loginSuccess, logout, logoutRequested, profileSucess, registerRequest, registerSucess } from "../slices/authSlice";
import { login, profile, register } from "../../api/authApi";
import { authStorage } from "../../utils/AuthToken";

function* loginWorker(action: ReturnType<typeof loginRequested>): Generator<any, void, any> {

    try {
        const response = yield call(login, action.payload);

        const { iskeepMeLogin } = action.payload
        console.log("save ",response.data.token)
        // if (iskeepMeLogin) {
            yield call(
                authStorage.saveToken, response.data.token
            )
        // }


        yield put(loginSuccess({
            token: response.data.token
        })
        )
        const profileReponse = yield call(profile)
        console.log("profile response ", profileReponse.data.data)
        yield put(profileSucess({
            user : profileReponse.data.data
        }))
    } catch (err) {
        yield put(loginFailed(err?.message ?? 'Something went wrong'));
    }
}

function* logoutWorker(): Generator<any, void, any> {
    try {
        console.log('Logout Worker called');
        yield call(authStorage.clearToken);
        yield put(logout());
    } catch (err) {
        console.error('Logout Error:', err);
    }
}

function* checkAuthenticationWorker(): Generator<any, void, any> {

    try {
        const token = yield call(authStorage.getToken);
        if (token) {
            yield put(loginSuccess({
                token: token
            }));
        }
        const profileReponse = yield call(profile)
        console.log("profile response ", profileReponse.data.data)
        yield put(profileSucess({
            user : profileReponse.data.data
        }))
    } catch (err) {
        yield put(logout());
    } finally {
        yield put(initializationComplete());
    }
}

function* registerRequestWorker(action: ReturnType<typeof registerRequest>): Generator<any, void, any> {
    try {
        const response = yield call(register, action.payload)
        console.log("request", response)
        yield put(registerSucess({
            message: response.message
        }))
    } catch (error) {
        yield put(loginFailed(err?.message ?? 'Something went wrong'));
    }
}


function* loginWatcher() {
    yield takeLatest(
        loginRequested.type,
        loginWorker
    )
}

function* logoutWatcher() {
    console.log('Logout Watcher called');
    yield takeLatest(
        logoutRequested.type,
        logoutWorker
    )
}

function* checkAuthenticationWatcher() {
    yield takeLatest(
        checkAuthenticationRequested.type,
        checkAuthenticationWorker
    )
}

function* registerWatcher() {
    yield takeLatest(
        registerRequest.type,
        registerRequestWorker
    )
}

export default function* authSaga() {
    yield all([
        loginWatcher(),
        logoutWatcher(),
        checkAuthenticationWatcher(),
        registerWatcher()
    ])
}