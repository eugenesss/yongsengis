import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import { IMPORT_RECORD } from "./ImportTypes";
import { importRecordSuccess, importRecordFailure } from "./ImportActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const importRecordRequest = async (model, fileData) => {
  const result = await api.post(`/${model}/import`, fileData);
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* importRecordToDB({ payload }) {
  const { model, fileData } = payload;
  try {
    const data = yield call(importRecordRequest, model, fileData);
    yield delay(500);
    yield put(importRecordSuccess(data));
  } catch (error) {
    yield put(importRecordFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* importRecordWatcher() {
  yield takeEvery(IMPORT_RECORD, importRecordToDB);
}
//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(importRecordWatcher)]);
}
