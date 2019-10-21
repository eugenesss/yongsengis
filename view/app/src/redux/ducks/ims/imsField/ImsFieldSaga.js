import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_WAREHOUSE, GET_CATEGORIES } from "./ImsFieldTypes";
import {
  getWarehouseFailure,
  getWarehouseSuccess,
  getCategoriesFailure,
  getCategoriesSuccess
} from "./ImsFieldActions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getWarehouseReq = async () => {
  const result = await api.get("/show_warehouse");
  return result.data;
};
const getCategoriesReq = async () => {
  const result = await api.get("/show_category");
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
function* getCategories() {
  try {
    const data = yield call(getCategoriesReq);
    yield put(getCategoriesSuccess(data));
  } catch (error) {
    yield put(getCategoriesFailure(error));
  }
}
//=========================
// WATCHERS
//=========================
export function* getWarehouseWatcher() {
  yield takeEvery(GET_WAREHOUSE, getWarehouse);
}
export function* getCategoriesWatcher() {
  yield takeEvery(GET_CATEGORIES, getCategories);
}
//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(getWarehouseWatcher), fork(getCategoriesWatcher)]);
}
