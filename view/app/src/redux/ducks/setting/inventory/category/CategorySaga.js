import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_ALL_CATEGORIES,
  NEW_CATEGORIES,
  EDIT_CATEGORIES,
  DELETE_CATEGORIES
} from "./CategoryTypes";
import {
  getAllCategoriesSuccess,
  getAllCategoriesFailure,
  newCategoriesSuccess,
  newCategoriesFailure,
  editCategoriesSuccess,
  editCategoriesFailure,
  deleteCategoriesSuccess,
  deleteCategoriesFailure
} from "./CategoryActions";
import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllCategoriesRequest = async () => {
  // const result = await api.get("/users");
  // return result.data;
  return [];
};
const newCategoriesRequest = async data => {
  return {};
};
const editCategoriesRequest = async data => {
  return {};
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllCategories() {
  try {
    const data = yield call(getAllCategoriesRequest);
    yield put(getAllCategoriesSuccess(data));
  } catch (err) {
    yield put(getAllCategoriesFailure(err));
  }
}
function* newCategories({ payload }) {
  try {
    const data = yield call(newCategoriesRequest, payload);
    yield put(newCategoriesSuccess(data));
  } catch (error) {
    yield put(newCategoriesFailure(error));
  }
}
function* editCategories({ payload }) {
  try {
    const data = yield call(editCategoriesRequest, payload);
    yield put(editCategoriesSuccess(data));
  } catch (error) {
    yield put(editCategoriesFailure(error));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getCategoriesWatcher() {
  yield takeEvery(GET_ALL_CATEGORIES, getAllCategories);
}
export function* newCategoriesWatcher() {
  yield takeEvery(NEW_CATEGORIES, newCategories);
}
export function* editCategoriesWatcher() {
  yield takeEvery(EDIT_CATEGORIES, editCategories);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getCategoriesWatcher),
    fork(newCategoriesWatcher),
    fork(editCategoriesWatcher)
  ]);
}
