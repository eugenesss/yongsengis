import { NotificationManager } from "react-notifications";
import * as types from "./CategoryTypes";

const INIT_STATE = {
  allCategory: [],
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Get all Categories
     */
    case types.GET_ALL_CATEGORIES:
      return { ...state, loading: true };
    case types.GET_ALL_CATEGORIES_SUCCESS:
      return { ...state, loading: false, allCategory: action.payload };
    case types.GET_ALL_CATEGORIES_FAILURE:
      NotificationManager.error("Error in retrieving data");
      return { ...state, loading: false };

    /**
     * New Categories
     */
    case types.NEW_CATEGORIES:
      return { ...state, loading: true };
    case types.NEW_CATEGORIES_SUCCESS:
      var newCat = Object.assign([], state.allCategory);
      newCat.push(action.payload);
      return { ...state, loading: false, allCategory: newCat };
    case types.NEW_CATEGORIES_FAILURE:
      NotificationManager.error("Error in creating Category");
      return { ...state, loading: false };

    /**
     * Edit Categories
     */
    case types.EDIT_CATEGORIES:
      return { ...state, loading: true };
    case types.EDIT_CATEGORIES_SUCCESS:
      var editCat = Object.assign([], state.allCategory);
      editCat.map(cat =>
        cat.id == action.payload.id ? (cat = action.payload) : cat
      );
      return { ...state, loading: false, allCategory: editCat };
    case types.EDIT_CATEGORIES_FAILURE:
      NotificationManager.error("Error in editing Category");
      return { ...state, loading: false };

    /**
     * Delete Categories
     */
    case types.DELETE_CATEGORIES:
      return { ...state, loading: true };
    case types.DELETE_CATEGORIES_SUCCESS:
      var deleteCat = Object.assign([], state.allCategory).filter(
        cat => cat.pid !== action.payload
      );
      return { ...state, loading: false, allCategory: deleteCat };
    case types.DELETE_CATEGORIES_FAILURE:
      NotificationManager.error("Error in editing Category");
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
