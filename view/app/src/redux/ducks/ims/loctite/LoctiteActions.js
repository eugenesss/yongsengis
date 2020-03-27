import * as types from "./LoctiteTypes";

/**
 * Loctite API failure
 */
export const loctiteApiFailure = error => ({
  type: types.LOCTITE_API_FAILURE,
  payload: error
});

/**
 * GET ALL Loctite
 */
export const getAllLoctite = () => ({
  type: types.GET_ALL_LOCTITE
});
export const getAllLoctiteSuccess = Loctite => ({
  type: types.GET_ALL_LOCTITE_SUCCESS,
  payload: Loctite
});

/**
 * View Loctite
 */

export const viewLoctite = id => ({
  type: types.VIEW_LOCTITE,
  payload: id
});
export const viewLoctiteSuccess = inv => ({
  type: types.VIEW_LOCTITE_SUCCESS,
  payload: inv
});

/**
 * New Loctite
 */
export const submitLoctite = (data, redirect, history) => ({
  type: types.SUBMIT_LOCTITE_FORM,
  payload: { data, redirect, history }
});
export const submitLoctiteSuccess = data => ({
  type: types.SUBMIT_LOCTITE_SUCCESS,
  payload: data
});
export const submitLoctiteFailure = error => ({
  type: types.SUBMIT_LOCTITE_FAILURE,
  payload: error
});

// Edit
export const startEditLoctite = id => ({
  type: types.START_EDIT_LOCTITE,
  payload: id
});
export const startEditLoctiteSuccess = data => ({
  type: types.START_EDIT_LOCTITE_SUCCESS,
  payload: data
});
export const startEditLoctiteFailure = error => ({
  type: types.START_EDIT_LOCTITE_FAILURE,
  payload: error
});

export const editLoctite = data => ({
  type: types.EDIT_LOCTITE,
  payload: data
});
export const editLoctiteSuccess = data => ({
  type: types.EDIT_LOCTITE_SUCCESS,
  payload: data
});
export const editLoctiteFailure = error => ({
  type: types.EDIT_LOCTITE_FAILURE,
  payload: error
});

// Delete
export const deleteLoctite = id => ({
  type: types.DELETE_LOCTITE,
  payload: id
});
export const deleteLoctiteSuccess = id => ({
  type: types.DELETE_LOCTITE_SUCCESS,
  payload: id
});
export const deleteLoctiteFailure = error => ({
  type: types.DELETE_LOCTITE_FAILURE,
  payload: error
});

// Mass update
export const massUpdateLoctite = data => ({
  type: types.MASS_UPDATE_LOCTITE,
  payload: data
});
export const massUpdateLoctiteSuccess = data => ({
  type: types.MASS_UPDATE_LOCTITE_SUCCESS,
  payload: data
});
export const massUpdateLoctiteFailure = error => ({
  type: types.MASS_UPDATE_LOCTITE_FAILURE,
  payload: error
});

// filter mass update
export const filterLoctite = (field, keyword) => ({
  type: types.MASS_UPDATE_FILTER_LOCTITE,
  payload: { field, keyword }
});
export const filterLoctiteSuccess = data => ({
  type: types.MASS_UPDATE_FILTER_LOCTITE_SUCCESS,
  payload: data
});
export const filterLoctiteFailure = error => ({
  type: types.MASS_UPDATE_FILTER_LOCTITE_FAILURE,
  payload: error
});
export const clearFilterLoctite = () => ({
  type: types.CLEAR_UPDATE_FILTER_LOCTITE
});

export const removeFromLocList = id => ({
  type: types.REMOVE_FROM_LOC_LIST,
  payload: id
});

// Stock update
export const locStockUpdate = data => ({
  type: types.LOC_STOCK_UPDATE,
  payload: data
});
export const locStockUpdateSuccess = data => ({
  type: types.LOC_STOCK_UPDATE_SUCCESS,
  payload: data
});
export const locStockUpdateFailure = error => ({
  type: types.LOC_STOCK_UPDATE_FAILURE,
  payload: error
});
