import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_WAREHOUSE,
  NEW_WAREHOUSE,
  EDIT_WAREHOUSE,
  DELETE_WAREHOUSE
} from "./WarehouseTypes";
import {
  getAllWarehouseSuccess,
  getAllWarehouseFailure,
  newWarehouseSuccess,
  newWarehouseFailure,
  editWarehouseSuccess,
  editWarehouseFailure,
  deleteWarehouseSuccess,
  deleteWarehouseFailure
} from "./WarehouseActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllWarehouseRequest = async () => {
  const result = await api.get("/show_warehouse");
  return result.data;
};
const newWarehouseRequest = async data => {
  const result = await api.post("/add_warehouse", data);
  return result.data;
};
const editWarehouseRequest = async data => {
  const result = await api.post(`/update_warehouse/${data.wid}`, data);
  return result.data;
};
const deleteWarehouseRequest = async wid => {
  const result = await api.delete(`/delete_warehouse/${wid}`);
  return result;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllWarehouse() {
  try {
    const data = yield call(getAllWarehouseRequest);
    yield put(getAllWarehouseSuccess(data));
  } catch (err) {
    yield put(getAllWarehouseFailure(err));
  }
}
function* newWarehouse({ payload }) {
  try {
    const data = yield call(newWarehouseRequest, payload);
    yield put(newWarehouseSuccess(data));
  } catch (error) {
    yield put(newWarehouseFailure(error));
  }
}
function* editWarehouse({ payload }) {
  try {
    const data = yield call(editWarehouseRequest, payload);
    yield put(editWarehouseSuccess(data));
  } catch (error) {
    yield put(editWarehouseFailure(error));
  }
}
function* deleteWarehouse({ payload }) {
  try {
    yield call(deleteWarehouseRequest, payload);
    yield put(deleteWarehouseSuccess(payload));
  } catch (error) {
    yield put(deleteWarehouseFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getWarehouseWatcher() {
  yield takeEvery(GET_ALL_WAREHOUSE, getAllWarehouse);
}
export function* newWarehouseWatcher() {
  yield takeEvery(NEW_WAREHOUSE, newWarehouse);
}
export function* editWarehouseWatcher() {
  yield takeEvery(EDIT_WAREHOUSE, editWarehouse);
}
export function* deleteWarehouseWatcher() {
  yield takeEvery(DELETE_WAREHOUSE, deleteWarehouse);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getWarehouseWatcher),
    fork(newWarehouseWatcher),
    fork(editWarehouseWatcher),
    fork(deleteWarehouseWatcher)
  ]);
}
