import { NotificationManager } from "react-notifications";
import * as types from "./WarehouseTypes";

const INIT_STATE = {
  allWarehouse: [],
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Get all Warehouse
     */
    case types.GET_ALL_WAREHOUSE:
      return { ...state, loading: true };
    case types.GET_ALL_WAREHOUSE_SUCCESS:
      return { ...state, loading: false, allWarehouse: action.payload };
    case types.GET_ALL_WAREHOUSE_FAILURE:
      NotificationManager.error("Error in retrieving data");
      return { ...state, loading: false };

    /**
     * New Warehouse
     */
    case types.NEW_WAREHOUSE:
      return { ...state, loading: true };
    case types.NEW_WAREHOUSE_SUCCESS:
      NotificationManager.success("Added Warehouse Successfully");
      var newCat = Object.assign([], state.allWarehouse);
      newCat.push(action.payload);
      return { ...state, loading: false, allWarehouse: newCat };
    case types.NEW_WAREHOUSE_FAILURE:
      NotificationManager.error("Error in creating Warehouse");
      return { ...state, loading: false };

    /**
     * Edit Warehouse
     */
    case types.EDIT_WAREHOUSE:
      return { ...state, loading: true };
    case types.EDIT_WAREHOUSE_SUCCESS:
      NotificationManager.success("Edited Warehouse Successfully");
      var editCat = Object.assign([], state.allWarehouse).map(cat =>
        cat.wid == action.payload.wid ? action.payload : cat
      );
      return { ...state, loading: false, allWarehouse: editCat };
    case types.EDIT_WAREHOUSE_FAILURE:
      NotificationManager.error("Error in editing Warehouse");
      return { ...state, loading: false };

    /**
     * Delete Warehouse
     */
    case types.DELETE_WAREHOUSE:
      return { ...state, loading: true };
    case types.DELETE_WAREHOUSE_SUCCESS:
      NotificationManager.success("Deleted Warehouse Successfully");
      var deleteCat = Object.assign([], state.allWarehouse).filter(
        cat => cat.wid !== action.payload
      );
      return { ...state, loading: false, allWarehouse: deleteCat };
    case types.DELETE_WAREHOUSE_FAILURE:
      NotificationManager.error("Error in deleting Warehouse");
      console.log(action.payload);
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
