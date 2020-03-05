import * as types from "./WarehouseHealthTypes";

export const getWarehouseHealth = () => ({
  type: types.GET_WAREHOUSE_HEALTH
});
export const getWarehouseHealthSuccess = data => ({
  type: types.GET_WAREHOUSE_HEALTH_SUCCESS,
  payload: data
});
export const getWarehouseHealthFailure = error => ({
  type: types.GET_WAREHOUSE_HEALTH_FAILURE,
  payload: error
});
