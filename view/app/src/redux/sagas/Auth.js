import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER } from "Types";
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure
} from "Actions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const loginUserRequest = async (email, password) => {
  const result = await api.post("login", { email, password });
  return result.data;
};

const logoutUserRequest = async id => {
  localStorage.removeItem("ysis_user");
  localStorage.removeItem("ysis_token");
};
//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* loginUser({ payload }) {
  const { email, password } = payload;
  try {
    const user = yield call(loginUserRequest, email, password);
    localStorage.setItem("ysis_token", user.token);
    delete user.token;
    localStorage.setItem("ysis_user", JSON.stringify(user));
    window.location.replace("/");
    yield put(loginSuccess(user));
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

//=========================
// WATCHERS
//=========================
export function* loginUserWatcher() {
  yield takeEvery(LOGIN_USER, loginUser);
}
export function* logoutUserWatcher() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(loginUserWatcher), fork(logoutUserWatcher)]);
}
