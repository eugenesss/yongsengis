import { NotificationManager } from "react-notifications";
import * as types from "./LoctiteTypes";

/**
 * initial auth user
 */
const INIT_STATE = {
  loctiteList: {
    loading: false,
    tableData: []
  },
  loctiteToView: {
    loading: false,
    loctite: null
  },
  loctiteForm: {
    loading: false,
    modalLoading: false,
    loctite: {
      name: "",
      description: "",
      totalStock: 0,
      batchNum: 0,
      batch: 0,
      expiry: ""
    }
  },
  massUpdate: { populatedData: [], loading: false }
};

export default (state = INIT_STATE, action) => {
  function updateInvList(item) {
    var allInv = Object.assign([], state.loctiteList.tableData).map(inv =>
      inv.pid == item.pid ? (inv = item) : inv
    );
    return allInv;
  }

  switch (action.type) {
    //=========================
    //  API FAILURE
    //=========================
    case types.LOCTITE_API_FAILURE:
      NotificationManager.error("Loctite API Error");
      console.log(action.payload);
      return INIT_STATE;
    //=========================
    //  GET ALL LOCTITE
    //=========================
    case types.GET_ALL_LOCTITE:
      return { ...state, loctiteList: { ...state.loctiteList, loading: true } };
    case types.GET_ALL_LOCTITE_SUCCESS:
      return {
        ...state,
        loctiteList: {
          ...state.loctiteList,
          loading: false,
          tableData: action.payload
        }
      };
    //=========================
    //  VIEW LOCTITE
    //=========================
    case types.VIEW_LOCTITE:
      return {
        ...state,
        loctiteToView: { ...state.loctiteToView, loading: true }
      };
    case types.VIEW_LOCTITE_SUCCESS:
      return {
        ...state,
        loctiteToView: {
          ...state.loctiteToView,
          loading: false,
          loctite: action.payload
        }
      };

    //=========================
    //  New LOCTITE
    //=========================
    case types.SUBMIT_LOCTITE_FORM:
      return {
        ...state,
        loctiteForm: { ...state.loctiteForm, loading: true }
      };
    case types.SUBMIT_LOCTITE_SUCCESS:
      NotificationManager.success("Success");
      return {
        ...state,
        loctiteForm: {
          ...state.loctiteForm,
          loctite: action.payload,
          loading: false
        }
      };
    case types.SUBMIT_LOCTITE_FAILURE:
      NotificationManager.danger("Error in POST api");
      console.log(action.payload);
      return {
        ...state,
        loctiteForm: { ...state.loctiteForm, loading: false }
      };
    case types.CLEAR_LOCTITE_FORM:
      return { ...state, loctiteForm: INIT_STATE.loctiteForm };
    case types.HANDLE_LOCTITE_FORM:
      return {
        ...state,
        loctiteForm: {
          ...state.loctiteForm,
          loctite: {
            ...state.loctiteForm.loctite,
            [action.payload.field]: action.payload.value
          }
        }
      };

    //=========================
    //  Edit LOCTITE
    //=========================
    case types.START_EDIT_LOCTITE:
      return {
        ...state,
        loctiteForm: { ...state.loctiteForm, modalLoading: true }
      };
    case types.START_EDIT_LOCTITE_SUCCESS:
      return {
        ...state,
        loctiteForm: {
          ...state.loctiteForm,
          modalLoading: false,
          loctite: action.payload
        }
      };
    case types.START_EDIT_LOCTITE_FAILURE:
      NotificationManager.error("Error in fetching loctite");
      return {
        ...state,
        loctiteForm: { ...state.loctiteForm, modalLoading: false }
      };

    case types.EDIT_LOCTITE:
      return {
        ...state,
        loctiteForm: { ...state.loctiteForm, modalLoading: true }
      };
    case types.EDIT_LOCTITE_SUCCESS:
      NotificationManager.success("Successfully edit item");
      var list = updateInvList(action.payload);
      return {
        ...state,
        loctiteList: { ...state.loctiteList, tableData: list },
        loctiteForm: {
          ...state.loctiteForm,
          modalLoading: false,
          loctite: action.payload
        }
      };
    case types.EDIT_LOCTITE_FAILURE:
      NotificationManager.error("Error in edit item");
      console.log(action.payload);
      return {
        ...state,
        loctiteForm: { ...state.loctiteForm, modalLoading: false }
      };
    //=========================
    //  Delete Loctite
    //=========================
    case types.DELETE_LOCTITE:
      return {
        ...state,
        loctiteList: { ...state.loctiteList, loading: true }
      };
    case types.DELETE_LOCTITE_SUCCESS:
      NotificationManager.success("Item deleted");
      var deleteLoc = Object.assign([], state.loctiteList.tableData).filter(
        inv => inv.pid !== action.payload
      );
      return {
        ...state,
        loctiteList: {
          ...state.loctiteList,
          tableData: deleteLoc,
          loading: false
        }
      };
    case types.DELETE_LOCTITE_FAILURE:
      NotificationManager.error("Error in deleting item");
      console.log(action.payload);
      return {
        ...state,
        loctiteList: { ...state.loctiteList, loading: false }
      };

    //=========================
    //  MASS UPDATE
    //=========================
    case types.MASS_UPDATE_FILTER_LOCTITE:
      return { ...state, massUpdate: { ...state.massUpdate, loading: true } };
    case types.MASS_UPDATE_FILTER_LOCTITE_SUCCESS:
      return {
        ...state,
        massUpdate: { populatedData: action.payload, loading: false }
      };
    case types.MASS_UPDATE_FILTER_LOCTITE_FAILURE:
      NotificationManager.error("Error in filter");
      return { ...state, massUpdate: { ...state.massUpdate, loading: false } };
    case types.CLEAR_UPDATE_FILTER_LOCTITE:
      return { ...state, massUpdate: INIT_STATE.massUpdate };

    case types.REMOVE_FROM_LOC_LIST:
      var removedFromMassUpdate = Object.assign(
        [],
        state.massUpdate.populatedData
      ).filter(inv => inv.pid != action.payload);
      return {
        ...state,
        massUpdate: {
          ...state.massUpdate,
          populatedData: removedFromMassUpdate
        }
      };

    case types.MASS_UPDATE_LOCTITE:
      return { ...state, massUpdate: { ...state.massUpdate, loading: true } };
    case types.MASS_UPDATE_LOCTITE_SUCCESS:
      NotificationManager.success("Items Updated!");
      return { ...state, massUpdate: { ...state.massUpdate, loading: false } };
    case types.MASS_UPDATE_LOCTITE_FAILURE:
      NotificationManager.erorr("Error");
      console.log(action.payload);
      return { ...state, massUpdate: { ...state.massUpdate, loading: false } };

    default:
      return { ...state };
  }
};
