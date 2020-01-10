import * as types from "./CategoryTypes";

// read
export const getAllCategories = () => ({
  type: types.GET_ALL_CATEGORIES
});
export const getAllCategoriesSuccess = data => ({
  type: types.GET_ALL_CATEGORIES_SUCCESS,
  payload: data
});
export const getAllCategoriesFailure = error => ({
  type: types.GET_ALL_CATEGORIES_FAILURE,
  payload: error
});

// create
export const newCategories = data => ({
  type: types.NEW_CATEGORIES,
  payload: data
});
export const newCategoriesSuccess = data => ({
  type: types.NEW_CATEGORIES_SUCCESS,
  payload: data
});
export const newCategoriesFailure = error => ({
  type: types.NEW_CATEGORIES_FAILURE,
  payload: error
});

// update
export const editCategories = data => ({
  type: types.EDIT_CATEGORIES,
  payload: data
});
export const editCategoriesSuccess = data => ({
  type: types.EDIT_CATEGORIES_SUCCESS,
  payload: data
});
export const editCategoriesFailure = error => ({
  type: types.EDIT_CATEGORIES_FAILURE,
  payload: error
});

// delete
export const deleteCategories = cat_id => ({
  type: types.DELETE_CATEGORIES,
  payload: cat_id
});
export const deleteCategoriesSuccess = cat_id => ({
  type: types.DELETE_CATEGORIES_SUCCESS,
  payload: cat_id
});
export const deleteCategoriesFailure = error => ({
  type: types.DELETE_CATEGORIES_FAILURE,
  payload: error
});
