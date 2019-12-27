import { NotificationManager } from "react-notifications";
import * as types from "./WidgetTypes";

const INIT_STATE = {
  todoList: {
    loading: false,
    list: []
  }
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
      return { ...state, todoList: { ...state.todoList, loading: true } };

    case types.GET_TO_DO_FAILURE:
    case types.NEW_TO_DO_FAILURE:
    case types.UPDATE_TO_DO_FAILURE:
    case types.DELETE_TO_DO_FAILURE:
      NotificationManager.error("Error in To do");
      return { ...state, todoList: { ...state.todoList, loading: false } };

    // Get Todo
    case types.GET_TO_DO_SUCCESS:
      return {
        ...state,
        todoList: { ...state.todoList, loading: false, list: action.payload }
      };
    // New Todo
    case types.NEW_TO_DO_SUCCESS:
      var newTodo = Object.assign([], state.todoList.list);
      newTodo.push(action.payload);
      return {
        ...state,
        todoList: { ...state.todoList, loading: false, list: newTodo }
      };
    // Update Todo
    case types.UPDATE_TO_DO_SUCCESS:
      var updateTodo = Object.assign([], state.todoList.list);
      updateTodo.map(todo =>
        todo.id == action.payload.id ? action.payload : todo
      );
      return {
        ...state,
        todoList: { ...state.todoList, loading: false, list: updateTodo }
      };
    // Delete Todo
    case types.DELETE_TO_DO_SUCCESS:
      var deleteTodo = Object.assign([], state.todoList.list);
      deleteTodo.filter(todo => todo.id !== action.payload.id);
      return {
        ...state,
        todoList: { ...state.todoList, loading: false, list: deleteTodo }
      };

    default:
      return { ...state };
  }
};
