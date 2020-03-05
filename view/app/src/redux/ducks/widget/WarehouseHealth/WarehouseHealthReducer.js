import { NotificationManager } from "react-notifications";
import * as types from "./WarehouseHealthTypes";

const INIT_STATE = {
  loading: false,
  data: []
  // warehouse: [{ name: "", totalInventory: 0, low: 0, mid: 0, high: 0 }]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.GET_WAREHOUSE_HEALTH:
      return { ...state, loading: true };
    case types.GET_WAREHOUSE_HEALTH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.GET_WAREHOUSE_HEALTH_FAILURE:
      NotificationManager.error("Error in fetching warehouse health");
      console.log(action.payload);
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
