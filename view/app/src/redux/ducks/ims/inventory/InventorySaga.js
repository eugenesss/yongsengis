import {
  all,
  call,
  fork,
  put,
  takeEvery,
  delay,
  select
} from "redux-saga/effects";
import {
  GET_ALL_INVENTORY,
  ON_CHANGE_INVENTORY_LIST,
  GET_INVENTORY,
  SUBMIT_INVENTORY_FORM,
  START_EDIT_INVENTORY,
  EDIT_INVENTORY,
  DELETE_INVENTORY
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
  deleteInventoryFailure
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
const getAMKInventory = async () => {
  const result = await api.get("/warehouse/1");
  return result.data;
};
const getJSInventory = async () => {
  const result = await api.get("/warehouse/3");
  return result.data;
};
const getAICInventory = async () => {
  const result = await api.get("/warehouse/2");
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

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllInventoryFromDB() {
  try {
    const inv = yield call(getAllInventoryReq);
    yield delay(500);
    yield put(getAllInventorySuccess(inv));
  } catch (error) {
    yield put(inventoryApiFailure(error));
  }
}
function* changeInvList({ payload }) {
  let data;
  try {
    if (payload == "All Inventory") {
      // All Leads
      data = yield call(getAllInventoryReq);
      yield delay(500);
      yield put(getAllInventorySuccess(data));
    } else if (payload == "JOOSENG #1") {
      data = yield call(getJSInventory);
      yield delay(500);
      yield put(getAllInventorySuccess(data));
    } else if (payload == "AIC #2") {
      data = yield call(getAICInventory);
      yield delay(500);
      yield put(getAllInventorySuccess(data));
    } else if (payload == "AMK #3") {
      data = yield call(getAMKInventory);
      yield delay(500);
      yield put(getAllInventorySuccess(data));
    } else {
      yield delay(500);
      data = yield call(getAllInventoryReq);
      yield put(getAllInventorySuccess(data));
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
      yield delay(400);
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
    yield delay(500);
    yield put(startEditInventorySuccess(data));
  } catch (error) {
    yield put(startEditInventoryFailure(error));
  }
}
function* editInv({ payload }) {
  try {
    const data = yield call(editInvReq, payload);
    yield delay(500);
    yield put(editInventorySuccess(data));
  } catch (error) {
    yield put(editInventoryFailure(error));
  }
}
function* deleteInv({ payload }) {
  try {
    yield call(deleteInvReq, payload);
    yield delay(500);
    yield put(deleteInventorySuccess(payload));
  } catch (error) {
    yield put(deleteInventoryFailure(error));
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
    fork(deleteInventoryWatcher)
  ]);
}
