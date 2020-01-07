import * as types from "./TodoListTypes";

/**
 * To Do List
 */
export const getToDo = () => ({
  type: types.GET_TO_DO
});
export const getToDoSuccess = data => ({
  type: types.GET_TO_DO_SUCCESS,
  payload: data
});
export const getToDoFailure = error => ({
  type: types.GET_TO_DO_FAILURE,
  payload: error
});

export const newToDo = data => ({
  type: types.NEW_TO_DO,
  payload: data
});
export const newToDoSuccess = data => ({
  type: types.NEW_TO_DO_SUCCESS,
  payload: data
});
export const newToDoFailure = error => ({
  type: types.NEW_TO_DO_FAILURE,
  payload: error
});

export const updateToDo = data => ({
  type: types.UPDATE_TO_DO,
  payload: data
});
export const updateToDoSuccess = data => ({
  type: types.UPDATE_TO_DO_SUCCESS,
  payload: data
});
export const updateToDoFailure = error => ({
  type: types.UPDATE_TO_DO_FAILURE,
  payload: error
});

export const deleteToDo = data => ({
  type: types.DELETE_TO_DO,
  payload: data
});
export const deleteToDoSuccess = data => ({
  type: types.DELETE_TO_DO_SUCCESS,
  payload: data
});
export const deleteToDoFailure = error => ({
  type: types.DELETE_TO_DO_FAILURE,
  payload: error
});
