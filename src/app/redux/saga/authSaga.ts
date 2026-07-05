import { takeLatest, put, call, all } from "redux-saga/effects";
import { checkAuthenticationRequested, initializationComplete, loadingStarted, loginFailed, loginRequested, loginSuccess, logout, logoutRequested } from "../slices/authSlice";
import { login } from "../../networkCalls/authApi";
import { authStorage } from "../../utils/AuthToken";

function* loginWorker(action: ReturnType<typeof loginRequested>): Generator<any, void, any> {

    try {
        const response = yield call(login, action.payload);

        yield call(
            authStorage.saveToken, response.data.token
        )

        yield put(loginSuccess({
            user: {
                id: 1,
                name: "shashank",
                age: 27
            },
            token: response.data.token
        })
        )
    } catch (err) {
        yield put(loginFailed(err?.message ?? 'Something went wrong'));
    }
}

function* logoutWorker(): Generator<any, void, any> {
    try{
        console.log('Logout Worker called');
        yield call(authStorage.clearToken);
        yield put(logout());
    } catch(err){
        console.error('Logout Error:', err);
    }
}

function* checkAuthenticationWorker(): Generator<any, void, any> {

    try {
    const token = yield call(authStorage.getToken);
    if (token) {
        yield put(loginSuccess({
            user: {
                id: 1,
                name: "shashank",
                age: 27
            },
            token: token
        }));
    }
} catch (err) {
        yield put(logout());
    } finally {
        yield put(initializationComplete());
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

export default function* authSaga() {
   yield all([
    loginWatcher(),
    logoutWatcher(),
    checkAuthenticationWatcher()
   ])
}