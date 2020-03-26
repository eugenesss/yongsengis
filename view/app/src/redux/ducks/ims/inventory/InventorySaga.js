import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_INVENTORY,
  ON_CHANGE_INVENTORY_LIST,
  GET_INVENTORY,
  SUBMIT_INVENTORY_FORM,
  START_EDIT_INVENTORY,
  EDIT_INVENTORY,
  DELETE_INVENTORY,
  MASS_UPDATE_FILTER_INVENTORY,
  MASS_UPDATE_INVENTORY,
  INV_STOCK_UPDATE
} from "./InventoryTypes";
import {
  inventoryApiFailure,
  getAllInventorySuccess,
  getInventorySuccess,
  submitInventorySuccess,
  submitInventoryFailure,
  startEditInventorySuccess,
  startEditInventoryFailure,
  editInventorySuccess,
  editInventoryFailure,
  deleteInventorySuccess,
  deleteInventoryFailure,
  filterInventorySuccess,
  filterInventoryFailure,
  massUpdateInventorySuccess,
  massUpdateInventoryFailure,
  invStockUpdateSuccess,
  invStockUpdateFailure
} from "./InventoryActions";

import { inventoryListPage } from "Helpers/imsURL";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllInventoryReq = async () => {
  const result = await api.get("/show_items");
  return result.data;
};
const getWarehouseInventory = async wid => {
  const result = await api.get(`/warehouse/${wid}`);
  return result.data;
};
const postInventoryReq = async data => {
  const result = await api.post("/save_item", data);
  return result.data;
};
const startEditInvReq = async id => {
  const result = await api.get(`update_item/${id}`);
  return result.data;
};
const editInvReq = async item => {
  const result = await api.post(`update_item/${item.pid}`, item);
  return result.data;
};
const deleteInvReq = async id => {
  const result = await api.post(`/delete_item/${id}`);
  return result.data;
};
const massUpdateInvRequest = async data => {
  const result = await api.post("/update_items", data);
  return result.data;
};
const invStockUpdateRequest = async data => {
  console.log(data);
  // const result = await api.post("/update_items", data);
  // return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllInventoryFromDB() {
  try {
    const inv = yield call(getAllInventoryReq);
    yield put(getAllInventorySuccess(inv));
  } catch (error) {
    yield put(inventoryApiFailure(error));
  }
}
function* changeInvList({ payload }) {
  let data;
  const { wid } = payload;
  try {
    if (wid == "") {
      // All Leads
      data = yield call(getAllInventoryReq);
      yield put(getAllInventorySuccess(data));
    } else {
      data = yield call(getWarehouseInventory, wid);
    }
  } catch (error) {
    yield put(inventoryApiFailure(error));
  }
}
function* getInventoryFromDB({ payload }) {
  try {
    //const inv = yield call(getInventoryReq, payload);
    const invList = state =>
      state.imsState.inventoryState.inventoryList.tableData;
    const tableData = yield select(invList);
    const inv = tableData.find(inv => inv.pid === payload);
    yield put(getInventorySuccess(inv));
  } catch (error) {
    yield put(inventoryApiFailure(error));
  }
}
function* submitInvToDB({ payload }) {
  const { data, redirect, history } = payload;
  try {
    const inv = yield call(postInventoryReq, data);
    if (redirect) {
      history.push(inventoryListPage);
    }
    yield put(submitInventorySuccess(inv));
  } catch (error) {
    yield put(submitInventoryFailure(error));
  }
}
function* startEditInv({ payload }) {
  try {
    const data = yield call(startEditInvReq, payload);
    yield put(startEditInventorySuccess(data));
  } catch (error) {
    yield put(startEditInventoryFailure(error));
  }
}
function* editInv({ payload }) {
  try {
    const data = yield call(editInvReq, payload);
    yield put(editInventorySuccess(data));
  } catch (error) {
    yield put(editInventoryFailure(error));
  }
}
function* deleteInv({ payload }) {
  try {
    yield call(deleteInvReq, payload);
    yield put(deleteInventorySuccess(payload));
  } catch (error) {
    yield put(deleteInventoryFailure(error));
  }
}
function* filterInv({ payload }) {
  const { field, keyword } = payload;
  const invList = state =>
    state.imsState.inventoryState.inventoryList.tableData;
  try {
    //filter object
    const tableData = yield select(invList);
    const data = tableData.filter(inv =>
      inv[field].toLowerCase().includes(keyword.toLowerCase())
    );
    yield put(filterInventorySuccess(data));
  } catch (error) {
    yield put(filterInventoryFailure(error));
  }
}
function* massUpdateInv({ payload }) {
  try {
    const data = yield call(massUpdateInvRequest, payload);
    yield put(massUpdateInventorySuccess(data));
  } catch (error) {
    yield put(massUpdateInventoryFailure(error));
  }
}
function* invStockUpdate({ payload }) {
  try {
    const data = yield call(invStockUpdateRequest, payload);
    yield put(invStockUpdateSuccess(data));
  } catch (error) {
    yield put(invStockUpdateFailure(error));
  }
}

//=========================
// WATCHERS
//=========================
export function* getAllInventoryWatcher() {
  yield takeEvery(GET_ALL_INVENTORY, getAllInventoryFromDB);
}
export function* changeInvListWatcher() {
  yield takeEvery(ON_CHANGE_INVENTORY_LIST, changeInvList);
}
export function* getInventoryWatcher() {
  yield takeEvery(GET_INVENTORY, getInventoryFromDB);
}
export function* submitInventoryWatcher() {
  yield takeEvery(SUBMIT_INVENTORY_FORM, submitInvToDB);
}
export function* startEditInventoryWatcher() {
  yield takeEvery(START_EDIT_INVENTORY, startEditInv);
}
export function* editInventoryWatcher() {
  yield takeEvery(EDIT_INVENTORY, editInv);
}
export function* deleteInventoryWatcher() {
  yield takeEvery(DELETE_INVENTORY, deleteInv);
}
export function* filterInvWatcher() {
  yield takeEvery(MASS_UPDATE_FILTER_INVENTORY, filterInv);
}
export function* massUpdateInvWatcher() {
  yield takeEvery(MASS_UPDATE_INVENTORY, massUpdateInv);
}
export function* invStockUpdateWatcher() {
  yield takeEvery(INV_STOCK_UPDATE, invStockUpdate);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getAllInventoryWatcher),
    fork(changeInvListWatcher),
    fork(getInventoryWatcher),
    fork(submitInventoryWatcher),
    fork(startEditInventoryWatcher),
    fork(editInventoryWatcher),
    fork(deleteInventoryWatcher),
    fork(filterInvWatcher),
    fork(massUpdateInvWatcher),
    fork(invStockUpdateWatcher)
  ]);
}
