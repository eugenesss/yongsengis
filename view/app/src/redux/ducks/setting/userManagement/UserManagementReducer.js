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
     * GET All Users
     */
    case types.GET_ALL_USERS:
      return {
        ...state,
        usersLoading: true
      };

    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        userList: action.payload
      };

    /**
     * ADD User
     */
    case types.ADD_USER:
      return {
        ...state,
        usersLoading: true
      };
    case types.ADD_USER_SUCCESS:
      var allUsers = Object.assign([], state.userList);
      allUsers.unshift(action.payload);
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
    case types.EDIT_USER:
      return { ...state, usersLoading: true };
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

    // case types.UPDATE_USER_START:
    //   return {
    //     ...state,
    //     userUpdate: action.payload
    //   };
    // case types.ON_CHANGE_UPDATE_USER:
    //   return {
    //     ...state,
    //     userUpdate: {
    //       ...state.userUpdate,
    //       [action.payload.field]: action.payload.value
    //     }
    //   };
    // case types.UPDATE_USER:
    //   return {
    //     ...state,
    //     profileLoading: true
    //   };
    // case types.UPDATE_USER_SUCCESS:
    //   NotificationManager.success("User Updated");
    //   return {
    //     ...state,
    //     profileLoading: false,
    //     userUpdate: action.payload
    //   };
    // case types.UPDATE_USER_FAILURE:
    //   NotificationManager.error("Failed to Update User");
    //   return {
    //     ...state,
    //     profileLoading: false
    //   };
    // case types.ON_CHANGE_UPDATE_USER_RIGHTS:
    //   var userRightsObject = {
    //     userid: action.payload.userid,
    //     username: action.payload.username,
    //     groups: []
    //   };
    //   for (const grp of action.payload.groups) {
    //     var grpObject = { id: grp.id, name: grp.name, roles: [] };
    //     for (const role of grp.roles) {
    //       grpObject.roles.push({
    //         id: role.id,
    //         roleId: role.roleId,
    //         name: role.name,
    //         tier: role.tier
    //       });
    //     }
    //     userRightsObject.groups.push(grpObject);
    //   }

    //   return {
    //     ...state,
    //     userSettings: userRightsObject
    //   };
    // case types.UPDATE_USER_RIGHTS:
    //   return {
    //     ...state,
    //     usersLoading: true
    //   };
    // case types.UPDATE_USER_RIGHTS_SUCCESS:
    //   NotificationManager.success("User Updated");
    //   return {
    //     ...state,
    //     usersLoading: false
    //   };

    /**
     * GET_USER_FAILURE
     */
    case types.GET_USER_FAILURE:
      NotificationManager.warning("Error in fetching User Data");
      return INIT_STATE;

    default:
      return { ...state };
  }
};
