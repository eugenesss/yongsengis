import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_WAREHOUSE_FIELD,
  GET_WAREHOUSE_FIELD_SUCCESS,
  GET_WAREHOUSE_FIELD_FAILURE
} from "./ImsFieldTypes";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  categories: [],
  warehouse: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // Get Categories
    case GET_CATEGORIES:
      return { ...state };
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case GET_CATEGORIES_FAILURE:
      NotificationManager.error("Error in getting categories");
      return { ...state };

    // Get Warehouse
    case GET_WAREHOUSE_FIELD:
      return { ...state };
    case GET_WAREHOUSE_FIELD_SUCCESS:
      return { ...state, warehouse: action.payload };
    case GET_WAREHOUSE_FIELD_FAILURE:
      NotificationManager.error("Error in getting warehouse");
      console.log(action.payload);
      return { ...state };

    default:
      return { ...state };
  }
};
