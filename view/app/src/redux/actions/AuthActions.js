import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE
} from "Types";

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
