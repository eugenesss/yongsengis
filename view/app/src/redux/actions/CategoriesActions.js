import * as types from "Types";

export const getCategories = () => ({
  type: types.GET_CATEGORIES
});
export const getCategoriesSuccess = data => ({
  type: types.GET_CATEGORIES_SUCCESS,
  payload: data
});
export const getCategoriesFailure = error => ({
  type: types.GET_CATEGORIES,
  payload: error
});
