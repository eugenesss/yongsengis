import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_USERS,
  ADD_USER,
  EDIT_USER,
  GET_USER_PROFILE
} from "./UserManagementTypes";
import {
  getAllUsersSuccess,
  addUserSuccess,
  addUserFailure,
  editUserSuccess,
  editUserFailure,
  getUserProfileSuccess,
  getUserFailure
} from "./UserManagementActions";
import api from "Api";

import { user } from "./dummydata";

//=========================
// REQUESTS
//=========================
const getAllUsersRequest = async () => {
  // const result = await api.get("/users");
  // return result.data;
  return [user];
};

const addUserRequest = async newUser => {
  // const result = await api.post("/users", newUser);
  console.log(newUser);
  const result = newUser;
  return result;
};
const updateUserRequest = async data => {
  console.log(data);
  const result = data;
  return result;
};
const getUserProfileRequest = async userID => {
  const result = await api.get(`/users/${userID}`, userID);
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllUsersFromDB() {
  try {
    const data = yield call(getAllUsersRequest);
    yield put(getAllUsersSuccess(data));
  } catch (err) {
    yield put(getUserFailure(err));
  }
}
function* addUserToDB({ payload }) {
  try {
    const data = yield call(addUserRequest, payload);
    yield put(addUserSuccess(data));
  } catch (err) {
    yield put(addUserFailure(err));
  }
}
function* editUser({ payload }) {
  try {
    const data = yield call(updateUserRequest, payload);
    yield put(editUserSuccess(data));
  } catch (err) {
    yield put(editUserFailure(err));
  }
}
function* getUserProfileFromDB({ payload }) {
  try {
    const data = yield call(getUserProfileRequest, payload);
    yield put(getUserProfileSuccess(data));
  } catch (err) {
    yield put(getUserFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllUsersWatcher() {
  yield takeEvery(GET_ALL_USERS, getAllUsersFromDB);
}
export function* addUserWatcher() {
  yield takeEvery(ADD_USER, addUserToDB);
}
export function* editUserWatcher() {
  yield takeEvery(EDIT_USER, editUser);
}
export function* getUserProfileWatcher() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllUsersWatcher),
    fork(addUserWatcher),
    fork(editUserWatcher),
    fork(getUserProfileWatcher)
  ]);
}
