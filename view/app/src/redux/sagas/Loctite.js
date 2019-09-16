import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  GET_ALL_LOCTITE,
  VIEW_LOCTITE,
  START_EDIT_LOCTITE,
  SUBMIT_LOCTITE_FORM,
  EDIT_LOCTITE,
  DELETE_LOCTITE
} from "Types/LoctiteTypes";
import {
  loctiteApiFailure,
  getAllLoctiteSuccess,
  viewLoctiteSuccess,
  startEditLoctiteSuccess,
  startEditLoctiteFailure,
  submitLoctiteSuccess,
  submitLoctiteFailure,
  editLoctiteSuccess,
  editLoctiteFailure,
  deleteLoctiteSuccess,
  deleteLoctiteFailure
} from "Actions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getLoctiteReq = async () => {
  const result = await api.get("/show_loctites");
  return result.data;
};
const viewLoctiteReq = async id => {
  const result = await api.get(`/update_loctite/${id}`);
  return result.data;
};
const startEditLoctiteReq = async id => {
  const result = await api.get(`/update_loctite/${id}`);
  return result.data;
};
const submitLoctiteFormRequest = async data => {
  const result = await api.post(`/save_loctite`, data);
  return result.data;
};
const editLocReq = async item => {
  const result = await api.post(`/update_loctite/${item.pid}`, item);
  return result.data;
};
const deleteLocReq = async id => {
  const result = await api.post(`/delete_loctite/${id}`);
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllLoctiteFromDB() {
  try {
    const inv = yield call(getLoctiteReq);
    yield put(getAllLoctiteSuccess(inv));
  } catch (error) {
    yield put(loctiteApiFailure(error));
  }
}
function* viewLoctiteFromDB({ payload }) {
  try {
    const inv = yield call(viewLoctiteReq, payload);
    yield put(viewLoctiteSuccess(inv));
  } catch (error) {
    yield put(loctiteApiFailure(error));
  }
}
function* startLoctiteEdit({ payload }) {
  try {
    const inv = yield call(startEditLoctiteReq, payload);
    yield put(startEditLoctiteSuccess(inv));
  } catch (error) {
    yield put(startEditLoctiteFailure(error));
  }
}
function* submitLoctiteForm({ payload }) {
  try {
    const data = yield call(submitLoctiteFormRequest, payload);
    yield put(submitLoctiteSuccess(data));
  } catch (error) {
    yield put(submitLoctiteFailure(error));
  }
}
function* editLoc({ payload }) {
  try {
    const data = yield call(editLocReq, payload);
    yield delay(500);
    yield put(editLoctiteSuccess(data));
  } catch (error) {
    yield put(editLoctiteFailure(error));
  }
}
function* deleteLoc({ payload }) {
  try {
    yield call(deleteLocReq, payload);
    yield delay(500);
    yield put(deleteLoctiteSuccess(payload));
  } catch (error) {
    yield put(deleteLoctiteFailure(error));
  }
}

//=========================
// WATCHERS
//=========================
export function* getAllLoctiteWatcher() {
  yield takeEvery(GET_ALL_LOCTITE, getAllLoctiteFromDB);
}
export function* viewLoctiteWatcher() {
  yield takeEvery(VIEW_LOCTITE, viewLoctiteFromDB);
}
export function* startEditLoctiteWatcher() {
  yield takeEvery(START_EDIT_LOCTITE, startLoctiteEdit);
}
export function* submitLoctiteFormWatcher() {
  yield takeEvery(SUBMIT_LOCTITE_FORM, submitLoctiteForm);
}
export function* editLoctiteWatcher() {
  yield takeEvery(EDIT_LOCTITE, editLoc);
}
export function* deleteLoctiteWatcher() {
  yield takeEvery(DELETE_LOCTITE, deleteLoc);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllLoctiteWatcher),
    fork(viewLoctiteWatcher),
    fork(startEditLoctiteWatcher),
    fork(submitLoctiteFormWatcher),
    fork(editLoctiteWatcher),
    fork(deleteLoctiteWatcher)
  ]);
}
