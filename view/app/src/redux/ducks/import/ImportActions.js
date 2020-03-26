import * as types from "./ImportTypes";
/**
 * Import
 */
export const importRecord = (model, fileData) => ({
  type: types.IMPORT_RECORD,
  payload: { model, fileData }
});
export const importRecordSuccess = data => ({
  type: types.IMPORT_RECORD_SUCCESS,
  payload: data
});
export const importRecordFailure = error => ({
  type: types.IMPORT_RECORD_FAILURE,
  payload: error
});
