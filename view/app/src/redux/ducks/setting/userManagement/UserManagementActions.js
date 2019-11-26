/**
 * User Management Actions
 */
import * as types from "./UserManagementTypes";

/**
 * GET All Users
 */
export const getAllUsers = () => ({
  type: types.GET_ALL_USERS
});
export const getAllUsersSuccess = data => ({
  type: types.GET_ALL_USERS_SUCCESS,
  payload: data
});

/**
 * ADD User
 */
export const onChangeAddUser = (field, value) => ({
  type: types.ON_CHANGE_ADD_USER,
  payload: { field, value }
});
export const addUser = data => ({
  type: types.ADD_USER,
  payload: data
});
export const addUserSuccess = user => ({
  type: types.ADD_USER_SUCCESS,
  payload: user
});
export const addUserFailure = err => ({
  type: types.ADD_USER_FAILURE,
  payload: err
});

/**
 * UPDATE User
 */
export const editUser = data => ({
  type: types.EDIT_USER,
  payload: data
});
export const editUserSuccess = user => ({
  type: types.EDIT_USER_SUCCESS,
  payload: user
});
export const editUserFailure = err => ({
  type: types.EDIT_USER_FAILURE,
  payload: err
});

/**
 * GET User Failure
 */
export const getUserFailure = err => ({
  type: types.GET_USER_FAILURE,
  payload: err
});
