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
export const submitLoctite = data => ({
  type: types.SUBMIT_LOCTITE_FORM,
  payload: data
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
