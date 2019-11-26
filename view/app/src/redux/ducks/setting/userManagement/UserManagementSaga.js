import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_USERS,
  ADD_USER,
  EDIT_USER,
  GET_USER_PROFILE,
  DELETE_USER
} from "./UserManagementTypes";
import {
  getAllUsersSuccess,
  addUserSuccess,
  addUserFailure,
  editUserSuccess,
  editUserFailure,
  getUserProfileSuccess,
  getUserFailure,
  deleteUserSuccess,
  deleteUserFailure
} from "./UserManagementActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllUsersRequest = async () => {
  const result = await api.get("/show_users");
  return result.data;
};

const addUserRequest = async newUser => {
  const result = await api.post("/create_user", newUser);
  return newUser;
};
const updateUserRequest = async data => {
  const result = await api.post(`/update_user/${data.id}`, data);
  return result.data;
};
const getUserProfileRequest = async userID => {
  const result = await api.get(`/users/${userID}`, userID);
  return result.data;
};
const deleteUserRequest = async id => {
  const result = await api.post(`/delete_user/${id}`);
  return result;
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
function* deleteUser({ payload }) {
  try {
    yield call(deleteUserRequest, payload);
    yield put(deleteUserSuccess(payload));
  } catch (error) {
    yield put(deleteUserFailure(error));
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
export function* deleteUserWatcher() {
  yield takeEvery(DELETE_USER, deleteUser);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllUsersWatcher),
    fork(addUserWatcher),
    fork(editUserWatcher),
    fork(getUserProfileWatcher),
    fork(deleteUserWatcher)
  ]);
}
