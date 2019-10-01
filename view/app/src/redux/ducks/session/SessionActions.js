import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE
} from "./SessionTypes";

/**
 * Login
 */
export const login = user => ({
  type: LOGIN_USER,
  payload: user
});
export const loginSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});
export const loginFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: error
});

/**
 * Logout
 */
export const logout = id => ({
  type: LOGOUT_USER,
  payload: id
});
export const logoutSuccess = () => ({
  type: LOGOUT_USER_SUCCESS
});
export const logoutFailure = error => ({
  type: LOGOUT_USER_FAILURE,
  payload: error
});

/**
 * Get Current User
 */

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER
});
export const getCurrentUserSuccess = data => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: data
});
export const getCurrentUserFailure = error => ({
  type: GET_CURRENT_USER_FAILURE,
  payload: error
});
