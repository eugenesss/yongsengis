import * as types from "./ReportTypes";

//=====================
// Reports Failure
//=====================
export const getReportFailure = error => ({
  type: types.GET_REPORT_FAILURE,
  payload: error
});

//=====================
// EDIT HISTORY REPORT
//=====================

// Inventory
export const getEditHistoryInv = () => ({
  type: types.GET_EDIT_HISTORY_INV
});
export const getEditHistoryInvSuccess = data => ({
  type: types.GET_EDIT_HISTORY_INV_SUCCESS,
  payload: data
});
// Loctite
export const getEditHistoryLoc = () => ({
  type: types.GET_EDIT_HISTORY_LOC
});
export const getEditHistoryLocSuccess = data => ({
  type: types.GET_EDIT_HISTORY_LOC_SUCCESS,
  payload: data
});
