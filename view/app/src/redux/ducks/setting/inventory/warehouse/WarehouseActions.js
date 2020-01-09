import * as types from "./WarehouseTypes";

// read
export const getAllWarehouse = () => ({
  type: types.GET_ALL_WAREHOUSE
});
export const getAllWarehouseSuccess = data => ({
  type: types.GET_ALL_WAREHOUSE_SUCCESS,
  payload: data
});
export const getAllWarehouseFailure = error => ({
  type: types.GET_ALL_WAREHOUSE_FAILURE,
  payload: error
});

// create
export const newWarehouse = data => ({
  type: types.NEW_WAREHOUSE,
  payload: data
});
export const newWarehouseSuccess = data => ({
  type: types.NEW_WAREHOUSE_SUCCESS,
  payload: data
});
export const newWarehouseFailure = error => ({
  type: types.NEW_WAREHOUSE_FAILURE,
  payload: error
});

// update
export const editWarehouse = data => ({
  type: types.EDIT_WAREHOUSE,
  payload: data
});
export const editWarehouseSuccess = data => ({
  type: types.EDIT_WAREHOUSE_SUCCESS,
  payload: data
});
export const editWarehouseFailure = error => ({
  type: types.EDIT_WAREHOUSE_FAILURE,
  payload: error
});

// delete
export const deleteWarehouse = wh_id => ({
  type: types.DELETE_WAREHOUSE,
  payload: wh_id
});
export const deleteWarehouseSuccess = wh_id => ({
  type: types.DELETE_WAREHOUSE_SUCCESS,
  payload: wh_id
});
export const deleteWarehouseFailure = error => ({
  type: types.DELETE_WAREHOUSE_FAILURE,
  payload: error
});
