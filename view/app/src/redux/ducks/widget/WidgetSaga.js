import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_TO_DO,
  NEW_TO_DO,
  UPDATE_TO_DO,
  DELETE_TO_DO
} from "./WidgetTypes";
import {
  getToDoSuccess,
  getToDoFailure,
  newToDoSuccess,
  newToDoFailure,
  updateToDoSuccess,
  updateToDoFailure,
  deleteToDoSuccess,
  deleteToDoFailure
} from "./WidgetActions";

import api from "Api";

//=========================
// To Do
//=========================
const getToDoRequest = async () => {
  // const result = await api.get("/widgets/crmsummary");
  // return result.data.data;
  return {};
};
function* getToDo() {
  try {
    const data = yield call(getToDoRequest);
    yield put(getToDoSuccess(data));
  } catch (error) {
    yield put(getToDoFailure(error));
  }
}
// New To Do
const newToDoRequest = async data => {
  // const result = await api.get("/widgets/crmsummary");
  // return result.data.data;
  return {};
};
function* newToDo({ payload }) {
  try {
    const data = yield call(newToDoRequest, payload);
    yield put(newToDoSuccess(data));
  } catch (error) {
    yield put(newToDoFailure(error));
  }
}
// Update To do
const updateToDoRequest = async data => {
  // const result = await api.get("/widgets/crmsummary");
  // return result.data.data;
  return {};
};
function* updateToDo({ payload }) {
  try {
    const data = yield call(updateToDoRequest, payload);
    yield put(updateToDoSuccess(data));
  } catch (error) {
    yield put(updateToDoFailure(error));
  }
}
// Delete To Do
const deleteToDoRequest = async data => {
  // const result = await api.get("/widgets/crmsummary");
  // return result.data.data;
  return {};
};
function* deleteToDo() {
  try {
    const data = yield call(deleteToDoRequest, data);
    yield put(deleteToDoSuccess(data));
  } catch (error) {
    yield put(deleteToDoFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getToDoWatcher() {
  yield takeEvery(GET_TO_DO, getToDo);
}
export function* newToDoWatcher() {
  yield takeEvery(NEW_TO_DO, newToDo);
}
export function* updateToDoWatcher() {
  yield takeEvery(UPDATE_TO_DO, updateToDo);
}
export function* deleteToDoWatcher() {
  yield takeEvery(DELETE_TO_DO, deleteToDo);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getToDoWatcher),
    fork(newToDoWatcher),
    fork(updateToDoWatcher),
    fork(deleteToDoWatcher)
  ]);
}
