import { NotificationManager } from "react-notifications";
import * as types from "./TodoListTypes";

const INIT_STATE = {
  loading: false,
  list: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * To Do List
     */
    case types.GET_TO_DO:
    case types.NEW_TO_DO:
    case types.UPDATE_TO_DO:
    case types.DELETE_TO_DO:
      return { ...state, loading: true };

    case types.GET_TO_DO_FAILURE:
    case types.NEW_TO_DO_FAILURE:
    case types.UPDATE_TO_DO_FAILURE:
    case types.DELETE_TO_DO_FAILURE:
      console.log(action.payload);
      NotificationManager.error("Error in To do");
      return { ...state, loading: false };

    // Get Todo
    case types.GET_TO_DO_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload
      };
    // New Todo
    case types.NEW_TO_DO_SUCCESS:
      var newTodo = Object.assign([], state.list);
      newTodo.push(action.payload);
      NotificationManager.success("To do created");
      return {
        ...state,
        loading: false,
        list: newTodo
      };
    // Update Todo
    case types.UPDATE_TO_DO_SUCCESS:
      var updateTodo = Object.assign([], state.list).map(todo =>
        todo.uid == action.payload.uid ? action.payload : todo
      );
      NotificationManager.success("To do updated");
      return {
        ...state,
        loading: false,
        list: updateTodo
      };
    // Delete Todo
    case types.DELETE_TO_DO_SUCCESS:
      var deleteTodo = Object.assign([], state.list).filter(
        todo => todo.uid !== action.payload
      );
      NotificationManager.success("To do deleted");

      return {
        ...state,
        loading: false,
        list: deleteTodo
      };

    default:
      return { ...state };
  }
};
