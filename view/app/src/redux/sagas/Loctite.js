import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_LOCTITE,
  VIEW_LOCTITE,
  START_EDIT_LOCTITE,
  SUBMIT_LOCTITE_FORM
} from "Types/LoctiteTypes";
import {
  loctiteApiFailure,
  getAllLoctiteSuccess,
  viewLoctiteSuccess,
  startEditLoctiteSuccess,
  startEditLoctiteFailure
} from "Actions";

import api from "Api";

import { loctiteList, loctite } from "Components/dummydata";

//=========================
// REQUESTS
//=========================
const getLoctiteReq = async () => {
  //const result = await api.get("/show_items");
  const result = loctiteList;
  return result;
};
const viewLoctiteReq = async id => {
  console.log(`fetching ${id}`);
  const result = loctite;
  return result;
};
const startEditLoctiteReq = async id => {
  console.log(`fetching ${id}`);
  const result = loctite;
  return result;
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

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllLoctiteWatcher),
    fork(viewLoctiteWatcher),
    fork(startEditLoctiteWatcher)
  ]);
}
