import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE
} from "Types";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  loading: false,
  categories: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, loading: true };
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, loading: false };
    case GET_CATEGORIES_FAILURE:
      NotificationManager.error("Error in getting categories");
      console.log(action.payload);
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
