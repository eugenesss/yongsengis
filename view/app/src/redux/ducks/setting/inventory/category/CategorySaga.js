import { all, call, fork, put, takeEvery } from "redux-saga/effects";
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
  const result = await api.get("/show_category");
  return result.data;
};
const newCategoriesRequest = async data => {
  return {};
};
const editCategoriesRequest = async data => {
  return {};
};
const deleteCategoriesRequest = async id => {
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
function* deleteCategories({ payload }) {
  try {
    yield call(deleteCategoriesRequest, payload);
    yield put(deleteCategoriesSuccess(payload));
  } catch (error) {
    yield put(deleteCategoriesFailure(error));
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
export function* deleteCategoryWatcher() {
  yield takeEvery(DELETE_CATEGORIES, deleteCategories);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    fork(getCategoriesWatcher),
    fork(newCategoriesWatcher),
    fork(editCategoriesWatcher),
    fork(deleteCategoryWatcher)
  ]);
}
