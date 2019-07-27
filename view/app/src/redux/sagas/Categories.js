import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_CATEGORIES } from "Types";
import { getCategoriesFailure, getCategoriesSuccess } from "Actions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getCategoriesReq = async () => {
  const result = await api.get("/show_category");
  return result.data;
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
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
export function* getCategoriesWatcher() {
  yield takeEvery(GET_CATEGORIES, getCategories);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([fork(getCategoriesWatcher)]);
}
