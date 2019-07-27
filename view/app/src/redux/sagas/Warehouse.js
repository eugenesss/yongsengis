import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_WAREHOUSE } from "Types";
import { getWarehouseFailure, getWarehouseSuccess } from "Actions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getWarehouseReq = async () => {
  const result = await api.get("/show_warehouse");
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getWarehouse() {
  try {
    const data = yield call(getWarehouseReq);
    yield put(getWarehouseSuccess(data));
  } catch (error) {
    yield put(getWarehouseFailure(error));
  }
}
//=========================
// WATCHERS
//=========================
export function* getWarehouseWatcher() {
  yield takeEvery(GET_WAREHOUSE, getWarehouse);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(getWarehouseWatcher)]);
}
