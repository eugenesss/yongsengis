import {
  GET_WAREHOUSE,
  GET_WAREHOUSE_SUCCESS,
  GET_WAREHOUSE_FAILURE
} from "Types";
import { NotificationManager } from "react-notifications";

const INIT_STATE = {
  loading: false,
  warehouse: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WAREHOUSE:
      return { ...state, loading: true };
    case GET_WAREHOUSE_SUCCESS:
      return { ...state, warehouse: action.payload, loading: false };
    case GET_WAREHOUSE_FAILURE:
      NotificationManager.error("Error in getting warehouse");
      console.log(action.payload);
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
