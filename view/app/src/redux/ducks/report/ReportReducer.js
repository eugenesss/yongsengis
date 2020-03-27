import { NotificationManager } from "react-notifications";
import * as types from "./ReportTypes";

const INIT_STATE = {
  editHistory: {
    inventory: { loading: false, data: null },
    loctite: { loading: false, data: null }
  }
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    //=====================
    // Reports Failure
    //=====================
    case types.GET_REPORT_FAILURE:
      NotificationManager.error("Error in fetching Report");
      return INIT_STATE;

    //=====================
    // Edit History Reports
    //=====================

    // Inventory
    case types.GET_EDIT_HISTORY_INV:
      return {
        ...state,
        editHistory: {
          ...state.editHistory,
          inventory: {
            ...state.editHistory.inventory,
            loading: true
          }
        }
      };
    case types.GET_EDIT_HISTORY_INV_SUCCESS:
      return {
        ...state,
        editHistory: {
          ...state.editHistory,
          inventory: {
            ...state.editHistory.inventory,
            loading: false,
            data: action.payload
          }
        }
      };

    // Loctite
    case types.GET_EDIT_HISTORY_LOC:
      return {
        ...state,
        editHistory: {
          ...state.editHistory,
          loctite: {
            ...state.editHistory.loctite,
            loading: true
          }
        }
      };
    case types.GET_EDIT_HISTORY_LOC_SUCCESS:
      return {
        ...state,
        editHistory: {
          ...state.editHistory,
          loctite: {
            ...state.editHistory.loctite,
            loading: false,
            data: action.payload
          }
        }
      };

    default:
      return { ...state };
  }
};
