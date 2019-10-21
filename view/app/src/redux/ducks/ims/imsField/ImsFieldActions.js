import * as types from "./ImsFieldTypes";

// Warehouse
export const getWarehouse = () => ({
  type: types.GET_WAREHOUSE
});
export const getWarehouseSuccess = data => ({
  type: types.GET_WAREHOUSE_SUCCESS,
  payload: data
});
export const getWarehouseFailure = error => ({
  type: types.GET_WAREHOUSE_FAILURE,
  payload: error
});

// Categories
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