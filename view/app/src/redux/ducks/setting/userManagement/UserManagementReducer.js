/**
 * Users Reducers
 */
import { NotificationManager } from "react-notifications";
import * as types from "./UserManagementTypes";

const INIT_STATE = {
  userList: [],
  usersLoading: false,

  isUserControl: false,
  userControl: {},

  userUpdate: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Init loading state
     */
    case types.GET_ALL_USERS:
    case types.ADD_USER:
    case types.EDIT_USER:
    case types.DELETE_USER:
      return { ...state, usersLoading: true };

    /**
     * GET All Users
     */
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        userList: action.payload
      };
    case types.GET_USER_FAILURE:
      NotificationManager.warning("Error in fetching User Data");
      return INIT_STATE;

    /**
     * ADD User
     */

    case types.ADD_USER_SUCCESS:
      var allUsers = Object.assign([], state.userList);
      allUsers.push(action.payload);
      NotificationManager.success("User Added");
      return {
        ...state,
        usersLoading: false,
        userList: allUsers
      };

    case types.ADD_USER_FAILURE:
      NotificationManager.error("Failed to Add User");
      return {
        ...state,
        usersLoading: false
      };

    /**
     * UPDATE User
     */
    case types.EDIT_USER_SUCCESS:
      var editUser = Object.assign([], state.userList);
      var editIndex = editUser.findIndex(user => user.id == action.payload.id);
      editUser[editIndex] = action.payload;
      NotificationManager.success("User Edited");
      return {
        ...state,
        usersLoading: false,
        userList: editUser
      };
    case types.EDIT_USER_FAILURE:
      NotificationManager.error("Failed to Edit User");
      return {
        ...state,
        usersLoading: false
      };

    /**
     * DELETE user
     */
    case types.DELETE_USER_SUCCESS:
      const deleteUser = Object.assign([], state.userList).filter(
        user => user.id !== action.payload
      );
      console.log(action.payload);
      NotificationManager.success("User Deleted");
      console.log(deleteUser);
      return { usersLoading: false, userList: deleteUser };
    case types.DELETE_USER_FAILURE:
      NotificationManager.error("Failed to Delete User");
      return { ...state, usersLoading: false };

    default:
      return { ...state };
  }
};
