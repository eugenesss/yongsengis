import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_TO_DO,
  NEW_TO_DO,
  UPDATE_TO_DO,
  DELETE_TO_DO
} from "./TodoListTypes";
import {
  getToDoSuccess,
  getToDoFailure,
  newToDoSuccess,
  newToDoFailure,
  updateToDoSuccess,
  updateToDoFailure,
  deleteToDoSuccess,
  deleteToDoFailure
} from "./TodoListActions";

import api from "Api";

//=========================
// To Do
//=========================
const getToDoRequest = async () => {
  const result = await api.get("/todolist/show");
  return result.data;
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
  const result = await api.post("/todolist/save", data);
  return result.data;
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
  const result = await api.post(`/todolist/update/${data.uid}`, data);
  return result.data;
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
const deleteToDoRequest = async id => {
  const result = await api.post(`/todolist/delete/${id}`);
  // return result.data.data;
  return result;
};
function* deleteToDo({ payload }) {
  try {
    yield call(deleteToDoRequest, payload);
    yield put(deleteToDoSuccess(payload));
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
