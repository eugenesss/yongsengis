import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_LOCTITE,
  VIEW_LOCTITE,
  START_EDIT_LOCTITE,
  SUBMIT_LOCTITE_FORM,
  EDIT_LOCTITE,
  DELETE_LOCTITE,
  MASS_UPDATE_FILTER_LOCTITE,
  MASS_UPDATE_LOCTITE,
  LOC_STOCK_UPDATE
} from "./LoctiteTypes";
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
  deleteLoctiteFailure,
  filterLoctiteSuccess,
  filterLoctiteFailure,
  massUpdateLoctiteSuccess,
  massUpdateLoctiteFailure,
  locStockUpdateFailure,
  locStockUpdateSuccess
} from "./LoctiteActions";

import { loctiteListPage } from "Helpers/imsURL";

import api from "Api";
import moment from "moment";

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
const saveLocImageReq = async ({ id, data }) => {
  const result = await api.post(`/loctite/upload_image/${id}`, data);
  return result.data;
};
const deleteLocReq = async id => {
  const result = await api.post(`/delete_loctite/${id}`);
  return result.data;
};
const massUpdateLocRequest = async data => {
  const result = await api.post("/update_loctites", data);
  return result.data;
};
const locStockUpdateRequest = async data => {
  const result = await api.post("/loctite/adjustment", data);
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
  const {
    data: { file, ...other },
    redirect,
    history
  } = payload;
  try {
    const inv = yield call(submitLoctiteFormRequest, other);
    if (file) {
      yield call(saveLocImageReq, { id: inv.pid, data: file });
    }
    if (redirect) {
      history.push(loctiteListPage);
    }
    yield put(submitLoctiteSuccess(inv));
  } catch (error) {
    yield put(submitLoctiteFailure(error));
  }
}
function* editLoc({ payload }) {
  let data;
  const { expiry_date, file, ...others } = payload;
  try {
    const loctite = {
      expiry_date: moment(expiry_date).format("YYYY-MM-DD"),
      ...others
    };
    data = yield call(editLocReq, loctite);
    if (file) {
      data = yield call(saveInvImageReq, { id: others.pid, data: file });
    }
    yield put(editLoctiteSuccess(data));
  } catch (error) {
    yield put(editLoctiteFailure(error));
  }
}
function* deleteLoc({ payload }) {
  try {
    yield call(deleteLocReq, payload);
    yield put(deleteLoctiteSuccess(payload));
  } catch (error) {
    yield put(deleteLoctiteFailure(error));
  }
}
function* filterLoc({ payload }) {
  const { field, keyword } = payload;
  const invList = state => state.imsState.loctiteState.loctiteList.tableData;
  try {
    //filter object
    const tableData = yield select(invList);
    const data = tableData.filter(inv => {
      if (typeof inv[field] == "number") {
        return inv[field].toString().includes(keyword);
      }
      return inv[field].toLowerCase().includes(keyword.toLowerCase());
    });
    yield put(filterLoctiteSuccess(data));
  } catch (error) {
    yield put(filterLoctiteFailure(error));
  }
}
function* massUpdateLoc({ payload }) {
  try {
    const data = yield call(massUpdateLocRequest, payload);
    yield put(massUpdateLoctiteSuccess(data));
  } catch (error) {
    yield put(massUpdateLoctiteFailure(error));
  }
}
function* locStockUpdate({ payload }) {
  try {
    const data = yield call(locStockUpdateRequest, payload);
    yield put(locStockUpdateSuccess(data));
  } catch (error) {
    yield put(locStockUpdateFailure(error));
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
export function* filterLocWatcher() {
  yield takeEvery(MASS_UPDATE_FILTER_LOCTITE, filterLoc);
}
export function* massUpdateLocWatcher() {
  yield takeEvery(MASS_UPDATE_LOCTITE, massUpdateLoc);
}
export function* locStockUpdateWatcher() {
  yield takeEvery(LOC_STOCK_UPDATE, locStockUpdate);
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
    fork(deleteLoctiteWatcher),
    fork(filterLocWatcher),
    fork(massUpdateLocWatcher),
    fork(locStockUpdateWatcher)
  ]);
}
