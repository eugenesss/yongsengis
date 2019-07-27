import {
  GET_WAREHOUSE,
  GET_WAREHOUSE_SUCCESS,
  GET_WAREHOUSE_FAILURE
} from "Types";

export const getWarehouse = () => ({
  type: GET_WAREHOUSE
});
export const getWarehouseSuccess = data => ({
  type: GET_WAREHOUSE_SUCCESS,
  payload: data
});
export const getWarehouseFailure = error => ({
  type: GET_WAREHOUSE_FAILURE,
  payload: error
});
