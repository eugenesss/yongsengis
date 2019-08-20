/**
 * Auth User Reducers
 */
import { NotificationManager } from "react-notifications";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE
} from "Types";

/**
 * initial auth user
 */
const INIT_STATE = {
  user: localStorage.getItem("ysis_user"),
  loading: false,
  currentUser: {}
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    //======================
    // LOGIN USER
    //======================
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("ysis_user", action.payload);
      console.log(action.payload);
      return { ...state, loading: false /* user: action.payload */ };
    case LOGIN_USER_FAILURE:
      NotificationManager.error("Error in Logging In");
      return { ...state, loading: false };

    //======================
    // LOGOUT USER
    //======================
    case LOGOUT_USER:
      return { ...state };
    case LOGOUT_USER_SUCCESS:
      localStorage.clear();
      return { ...state };
    case LOGOUT_USER_FAILURE:
      NotificationManager.error("Error in Logging Out");
      return { ...state };

    //======================
    // Get Current User
    //======================
    case GET_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: action.payload };
    case GET_CURRENT_USER_FAILURE:
      NotificationManager.error("Error in retrieving logged in user");
      return { ...state };
    default:
      return { ...state };
  }
};
