import { NotificationManager } from "react-notifications";
import * as types from "./ImportTypes";

const INIT_STATE = {
  loading: false,
  mappingData: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    /**
     * Import Record
     */
    case types.IMPORT_RECORD:
      return { ...state, loading: true };
    case types.IMPORT_RECORD_SUCCESS:
      return { ...state, loading: false };
    case types.IMPORT_RECORD_FAILURE:
      NotificationManager.error("Error in Importing Records");
      console.log(action.payload);
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
