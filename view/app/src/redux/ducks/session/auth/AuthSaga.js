import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER, GET_CURRENT_USER } from "./AuthTypes";
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  getCurrentUserSuccess,
  getCurrentUserFailure
} from "./AuthActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const loginUserRequest = async data => {
  const result = await api.post("login", data);
  return result.data;
};
const logoutUserRequest = async id => {
  localStorage.removeItem("ysis_token");
};
const getCurrentUserRequest = async () => {
  const result = await api.get("/currentuser");
  return result.data.logged_in_as;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* loginUser({ payload }) {
  const { data, history } = payload;
  try {
    const user = yield call(loginUserRequest, data);
    // console.log(user);
    // console.log(history);
    localStorage.setItem("ysis_token", user.token);
    delete user.token;

    yield put(loginSuccess(user));
    history.push("/");
  } catch (error) {
    yield put(loginFailure(error));
  }
}
function* logoutUser({ payload }) {
  try {
    yield call(logoutUserRequest, payload);
    window.location.replace("/");
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure());
  }
}
function* getCurrentUser() {
  try {
    const user = yield call(getCurrentUserRequest);
    yield put(getCurrentUserSuccess(user));
  } catch (error) {
    yield put(getCurrentUserFailure(error));
  }
}

//=========================
// WATCHERS
//=========================
export function* loginUserWatcher() {
  yield takeEvery(LOGIN_USER, loginUser);
}
export function* logoutUserWatcher() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}
export function* getCurrentUserWatcher() {
  yield takeEvery(GET_CURRENT_USER, getCurrentUser);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(loginUserWatcher),
    fork(logoutUserWatcher),
    fork(getCurrentUserWatcher)
  ]);
}
