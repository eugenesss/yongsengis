import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_EDIT_HISTORY_INV, GET_EDIT_HISTORY_LOC } from "./ReportTypes";

import {
  getReportFailure,
  getEditHistoryInvSuccess,
  getEditHistoryLocSuccess
} from "./ReportActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getEditHistoryInvRequest = async () => {
  const result = await api.get("/inventory/auditlog");
  return result.data;
};
const getEditHistoryLocRequest = async () => {
  const result = await api.get("/loctite/auditlog");
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getEditHistoryInv() {
  try {
    const data = yield call(getEditHistoryInvRequest);
    yield put(getEditHistoryInvSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}
function* getEditHistoryLoc() {
  try {
    const data = yield call(getEditHistoryLocRequest);
    yield put(getEditHistoryLocSuccess(data));
  } catch (error) {
    yield put(getReportFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================

export function* getEditHistoryInvWatcher() {
  yield takeEvery(GET_EDIT_HISTORY_INV, getEditHistoryInv);
}
export function* getEditHistoryLocWatcher() {
  yield takeEvery(GET_EDIT_HISTORY_LOC, getEditHistoryLoc);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(getEditHistoryInvWatcher), fork(getEditHistoryLocWatcher)]);
}
