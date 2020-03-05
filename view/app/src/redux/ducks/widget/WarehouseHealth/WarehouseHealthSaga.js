import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import { GET_WAREHOUSE_HEALTH } from "./WarehouseHealthTypes";
import {
  getWarehouseHealthSuccess,
  getWarehouseHealthFailure
} from "./WarehouseHealthActions";

import api from "Api";

import { data } from "./dummydata";

//=========================
// To Do
//=========================
const getWarehouseHealthRequest = async () => {
  // const result = await api.get("/todolist/show");
  // return result.data;
  return data;
};
function* getWarehouseHealth() {
  try {
    const data = yield call(getWarehouseHealthRequest);
    yield delay(500);
    yield put(getWarehouseHealthSuccess(data));
  } catch (error) {
    yield put(getWarehouseHealthFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getWarehouseHealthWatcher() {
  yield takeEvery(GET_WAREHOUSE_HEALTH, getWarehouseHealth);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(getWarehouseHealthWatcher)]);
}
