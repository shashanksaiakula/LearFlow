import { takeLatest, put, call, all } from "redux-saga/effects";
import { changePasswordFailed, changePasswordRequest, changePasswordSuccess, checkAuthenticationRequested, editProfileFailed, editProfileRequest, editProfileSucess, emailVerifyError, emailVerifyRequest, emailVerifySuccess, forgotPasswordFailed, forgotPasswordRequest, forgotPasswordSuccess, initializationComplete, loginFailed, loginRequested, loginSuccess, logout, logoutFail, logoutRequested, profileSucess, registerRequest, registerSucess, resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess, resendEmailError, resendEmailRequest, resendEmailSuccess } from "../slices/authSlice";
import { login, profile, register, logoutApi, changePasswordApi, editProfileApi, emailVerify, resendEmailVerifcation, forgotPasswordApi, resetPasswordApi } from "../../api/authApi";
import { authStorage } from "../../utils/AuthToken";
import { AxiosError } from "axios";

function* loginWorker(action: ReturnType<typeof loginRequested>): Generator<any, void, any> {

    try {
        const response = yield call(login, action.payload);

        console.log("save ", response)
        yield call(authStorage.saveAccessToken, response.data.accessToken,)

        yield call(authStorage.saveRefreshToken, response.data.refreshToken)


        yield put(loginSuccess({
            token: response.data.token
        })
        )

        const profileReponse = yield call(profile)
        console.log("profile response ", profileReponse.data.data)
        console.log("profile response 2", profileReponse.data.data.isEmailVerified)
        yield put(profileSucess({
            user: profileReponse.data.data
        }))
    } catch (err) {
        console.log("error is ", err)
        // yield put(loginFailed(err?.message ?? 'Something went wrong'));
        const error = err as AxiosError<{
            // statusCode: number;
            success: boolean;
            message: string;
        }>;

        console.log("Full Error:", error.response?.data);

        yield put(
            loginFailed(
                error.response?.data?.message ?? "Something went wrong"
            )
        );
    }
}

function* logoutWorker(): Generator<any, void, any> {
    try {

        const response = yield call(logoutApi)
        console.log("request", JSON.stringify(response.data))
        yield call(authStorage.clearTokens);
        yield put(logout());
    } catch (err) {
        yield put(logoutFail(err?.message ?? 'Something went wrong'));
    }
}

function* checkAuthenticationWorker(): Generator<any, void, any> {

    try {
        const token = yield call(authStorage.getAccessToken);
        if (token) {
            yield put(loginSuccess({
                token: token
            }));
        }
        const profileReponse = yield call(profile)
        console.log("profile response ", profileReponse.data.data)
        yield put(profileSucess({
            user: profileReponse.data.data
        }))
    } catch (err) {
        // yield call(logoutApi)
        console.log("logout is calling ?")
        yield put(logout());
    } finally {
        yield put(initializationComplete());
    }
}

function* registerRequestWorker(action: ReturnType<typeof registerRequest>): Generator<any, void, any> {
    try {
        const response = yield call(register, action.payload)
        console.log("request", JSON.stringify(response))
        yield put(registerSucess({
            message: response.message
        }))
    } catch (error) {
        console.log("reeor is ", error?.message)
        yield put(loginFailed(error?.message ?? 'Something went wrong'));
    }
}

function* chanagePasswordWorker(action: ReturnType<typeof changePasswordRequest>): Generator<any, void, any> {

    try {
        const response = yield call(changePasswordApi, action.payload)
        yield put(changePasswordSuccess({
            message: response.message
        }))

    } catch (err) {
        const error = err as AxiosError<{
            // statusCode: number;
            success: boolean;
            message: string;
        }>;
        console.log("error is ", error?.response?.data)
        yield put(changePasswordFailed(error?.message ?? 'Something went wrong'));
    }
}

function* chagePasswordWatcher() {
    yield takeLatest(
        changePasswordRequest.type,
        chanagePasswordWorker
    )
}

function* editProfileWorker(action: ReturnType<typeof editProfileRequest>): Generator<any, void, any> {

    try {
        const response = yield call(editProfileApi, action.payload)
        console.log(response.data.message)
        yield put(editProfileSucess({
            message: response.data.message,
            user: response.data.user
        }))
    } catch (err) {
        const error = err as AxiosError<{
            success: boolean;
            message: string
        }>
        console.log("error is ", error?.response?.data)
        yield put(editProfileFailed(error.response?.data.message ?? "Something went wrong"))
    }
}

function* emailVerifyWorker(action: ReturnType<typeof emailVerifyRequest>): Generator<any, void, any> {
    try {
        const response = yield call(emailVerify, action.payload)
        console.log("email ", JSON.stringify(response))
        yield put(emailVerifySuccess({
            success: response.data.success,
            message: response.data.message
        }))
    } catch (err) {
        const error = err as AxiosError<{
            success: boolean;
            message: string
        }>

        yield put(emailVerifyError(error.response?.data.message ?? "Something went wrong"))
    }
}

function* resendEmailWorker(action: ReturnType<typeof resendEmailRequest>): Generator<any, void, any> {
    try {
        const response = yield call(resendEmailVerifcation, action.payload)
        yield put(resendEmailSuccess({
            success: response.data.success,
            message: response.data.message
        }))
    } catch (err) {
        const error = err as AxiosError<{
            success: boolean;
            message: string
        }>

        yield put(resendEmailError(error.response?.data.message ?? "Something went wrong"))
    }
}

function* emailVerifyWatcher() {
    yield takeLatest(
        emailVerifyRequest.type,
        emailVerifyWorker
    )
}

function* resendEmailWatcher() {
    yield takeLatest(
        resendEmailRequest.type,
        resendEmailWorker
    )
}


function* editProfileWatcher() {
    yield takeLatest(
        editProfileRequest.type,
        editProfileWorker
    )
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

function* forgotPasswordWorker(action: ReturnType<typeof forgotPasswordRequest>): Generator<any, void, any> {
    try {
        const response = yield call(forgotPasswordApi, action.payload)
        yield put(forgotPasswordSuccess({
            message: response.data.message
        }))
    } catch (err) {
        const error = err as AxiosError<{
            success: boolean;
            message: string
        }>
        console.log("error is ", error?.response?.data)
        yield put(forgotPasswordFailed(error?.response?.data?.message ?? "Something went wrong"))
    }
}

function* forgotPasswordWatcher() {
    yield takeLatest(
        forgotPasswordRequest.type,
        forgotPasswordWorker
    )
}

function* resetPasswordWorker(action: ReturnType<typeof resetPasswordRequest>): Generator<any, void, any> {
    try {
        const response = yield call(resetPasswordApi, action.payload)
        yield put(resetPasswordSuccess({
            message: response.data.message
        }))
    } catch (err) {
        const error = err as AxiosError<{
            success: boolean;
            message: string
        }>
        console.log("error is ", error?.response?.data)
        yield put(resetPasswordFailed(error?.response?.data?.message ?? "Something went wrong"))
    }
}

function* resetPasswordWatcher() {
    yield takeLatest(
        resetPasswordRequest.type,
        resetPasswordWorker
    )
}


export default function* authSaga() {
    yield all([
        loginWatcher(),
        logoutWatcher(),
        checkAuthenticationWatcher(),
        registerWatcher(),
        chagePasswordWatcher(),
        editProfileWatcher(),
        emailVerifyWatcher(),
        resendEmailWatcher(),
        forgotPasswordWatcher(),
        resetPasswordWatcher()
    ])
}