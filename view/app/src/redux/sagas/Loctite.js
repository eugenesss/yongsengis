import { all, call, fork, put, takeEvery, delay } from "redux-saga/effects";
import {
  GET_ALL_LOCTITE,
  VIEW_LOCTITE,
  START_EDIT_LOCTITE,
  SUBMIT_LOCTITE_FORM,
  EDIT_LOCTITE,
  DELETE_LOCTITE
} from "Types/LoctiteTypes";
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
  deleteLoctiteFailure
} from "Actions";

import api from "Api";

const loctite = {
  pid: 1,
  name: "LOCTITE Novasil 207 Clear Sealant (300ML)",
  quantity: 20,
  description:
    "LOCTITE® Novasil 207™ Clear Sealant is a one component, neutral (non-acidic) silicone sealants for polycarbonate, GE Plastics, mirrors, metals, concrete and ceramic materials; adhesion and weather resistance are excellent. Suitable for power machinery, automobiles, engineering machinery, internal combustion engines, mining machinery, and electrical equipment stamping seal. Storage: Store this glue in the unopened original packaging in a cool dry place memory. Optimal Storage: 8°-21°C. Material removed from containers may be contaminated while in use. To prevent contamination of unused product, do not return any material to the original package. Use Guide: This glue is sensitive to moisture. Contact with air is recommended to be avoided during operations and storage . To get the best performance bond, surfaces should be clean and free of grease. Curing speed depends on the ambient humidity and temperature.",
  batch: 3,
  price: null,
  expiry_date: "2019-11-16",
  file: null
};

const loctiteList = [loctite, loctite];

//=========================
// REQUESTS
//=========================
const getLoctiteReq = async () => {
  //const result = await api.get("/show_loctites");
  const result = loctiteList;
  return result;
};
const viewLoctiteReq = async id => {
  // const result = await api.get(`/update_loctite/${id}`)
  const result = loctite;
  return result;
};
const startEditLoctiteReq = async id => {
  // const result = await api.get(`/update_loctite/${id}`)
  const result = loctite;
  return result;
};
const submitLoctiteFormRequest = async data => {
  // const result = await api.post(`/save_loctite`, data)
  const result = loctite;
  return result;
};
const editLocReq = async item => {
  // const result = await api.get(`/update_loctite/${item.id}`, item)
  const result = loctite;
  return result;
};
const deleteLocReq = async id => {
  //const result = await api.post(`/delete_loctite/${id}`);
  const result = {};
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
function* submitLoctiteForm({ payload }) {
  try {
    const data = yield call(submitLoctiteFormRequest, payload);
    yield put(submitLoctiteSuccess(data));
  } catch (error) {
    yield put(submitLoctiteFailure(error));
  }
}
function* editLoc({ payload }) {
  try {
    const data = yield call(editLocReq, payload);
    yield delay(500);
    yield put(editLoctiteSuccess(data));
  } catch (error) {
    yield put(editLoctiteFailure(error));
  }
}
function* deleteLoc({ payload }) {
  try {
    yield call(deleteLocReq, payload);
    yield delay(500);
    yield put(deleteLoctiteSuccess(payload));
  } catch (error) {
    yield put(deleteLoctiteFailure(error));
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
    fork(deleteLoctiteWatcher)
  ]);
}
