import { NotificationManager } from "react-notifications";
import * as types from "./InventoryTypes";

/**
 * initial auth user
 */
const INIT_STATE = {
  inventoryList: {
    tableData: [],
    loading: false,
    totalCount: 0,
  },
  itemToView: {
    item: null,
    loading: false,
  },
  inventoryForm: {
    loading: false,
    modalLoading: false,
    item: {
      name: "",
      price: 0,
      code: "",
      material: "",
      category: "",
      unit: 0,
      quantity: 0,
      perBox: 0,
      rack: "",
      warehouse: "",
      description: "",
    },
  },
  massUpdate: { populatedData: [], loading: false },
};

export default (state = INIT_STATE, action) => {
  function updateInvList(item) {
    var allInv = Object.assign([], state.inventoryList.tableData).map((inv) =>
      inv.pid == item.pid ? (inv = item) : inv
    );
    return allInv;
  }

  switch (action.type) {
    //=========================
    //  API FAILURE
    //=========================
    case types.INVENTORY_API_FAILURE:
      NotificationManager.error("Inventory API Error");
      return INIT_STATE;

    //=========================
    //  GET ALL INVENTORY
    //=========================
    case types.GET_ALL_INVENTORY:
      return {
        ...state,
        inventoryList: { ...state.inventoryList, loading: true },
      };
    case types.GET_ALL_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryList: {
          ...state.inventoryList,
          loading: false,
          tableData: action.payload.results[0],
          totalCount: action.payload.count,
        },
      };

    //=========================
    //  VIEW INVENTORY
    //=========================
    case types.GET_INVENTORY:
      return { ...state, itemToView: { loading: true } };
    case types.GET_INVENTORY_SUCCESS:
      return { ...state, itemToView: { loading: false, item: action.payload } };

    //=========================
    //  New INVENTORY
    //=========================
    case types.SUBMIT_INVENTORY_FORM:
      return {
        ...state,
        inventoryForm: { ...state.inventoryForm, loading: true },
      };
    case types.SUBMIT_INVENTORY_SUCCESS:
      NotificationManager.success("Successfully created Item");
      var newInv = updateInvList(action.payload);
      return {
        ...state,
        inventoryList: { ...state.inventoryList, tableData: newInv },
        inventoryForm: {
          ...state.inventoryForm,
          loading: false,
          item: INIT_STATE.inventoryForm.item,
        },
      };
    case types.SUBMIT_INVENTORY_FAILURE:
      NotificationManager.error("Error in POST api");
      console.log(action.payload);
      return {
        ...state,
        inventoryForm: { ...state.inventoryForm, loading: false },
      };
    case types.CLEAR_INVENTORY_FORM:
      return { ...state, inventoryForm: INIT_STATE.inventoryForm };
    case types.HANDLE_INV_FORM_CHANGE:
      return {
        ...state,
        inventoryForm: {
          ...state.inventoryForm,
          item: {
            ...state.inventoryForm.item,
            [action.payload.field]: action.payload.value,
          },
        },
      };

    //=========================
    //  Edit INVENTORY
    //=========================
    case types.START_EDIT_INVENTORY:
      return {
        ...state,
        inventoryForm: { ...state.inventoryForm, modalLoading: true },
      };
    case types.START_EDIT_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryForm: {
          ...state.inventoryForm,
          modalLoading: false,
          item: action.payload,
        },
      };
    case types.START_EDIT_INVENTORY_FAILURE:
      NotificationManager.error("Error in fetching Item");
      console.log(action.payload);
      return {
        ...state,
        inventoryForm: { ...state.inventoryForm, modalLoading: false },
      };

    case types.EDIT_INVENTORY:
      return {
        ...state,
        inventoryForm: { ...state.inventoryForm, modalLoading: true },
      };
    case types.EDIT_INVENTORY_SUCCESS:
      NotificationManager.success("Successfully edit item");
      var list = updateInvList(action.payload);
      return {
        ...state,
        inventoryList: { ...state.inventoryList, tableData: list },
        inventoryForm: {
          ...state.inventoryForm,
          modalLoading: false,
          item: action.payload,
        },
        itemToView: {
          item: action.payload,
        },
      };
    case types.EDIT_INVENTORY_FAILURE:
      NotificationManager.error("Error in edit item");
      console.log(action.payload);
      return {
        ...state,
        inventoryForm: { ...state.inventoryForm, modalLoading: false },
      };

    //=========================
    //  Delete INVENTORY
    //=========================
    case types.DELETE_INVENTORY:
      return {
        ...state,
        inventoryList: { ...state.inventoryList, loading: true },
      };
    case types.DELETE_INVENTORY_SUCCESS:
      NotificationManager.success("Item deleted");
      var deleteInv = Object.assign([], state.inventoryList.tableData).filter(
        (inv) => inv.pid !== action.payload
      );
      return {
        ...state,
        inventoryList: {
          ...state.inventoryList,
          tableData: deleteInv,
          loading: false,
        },
      };
    case types.DELETE_INVENTORY_FAILURE:
      NotificationManager.error("Error in deleting item");
      console.log(action.payload);
      return {
        ...state,
        inventoryList: { ...state.inventoryList, loading: false },
      };

    //=========================
    //  MASS UPDATE
    //=========================
    case types.MASS_UPDATE_FILTER_INVENTORY:
      return { ...state, massUpdate: { ...state.massUpdate, loading: true } };
    case types.MASS_UPDATE_FILTER_INVENTORY_SUCCESS:
      return {
        ...state,
        massUpdate: { populatedData: action.payload, loading: false },
      };
    case types.MASS_UPDATE_FILTER_INVENTORY_FAILURE:
      NotificationManager.error("Error in filter");
      return { ...state, massUpdate: { ...state.massUpdate, loading: false } };
    case types.CLEAR_UPDATE_FILTER_INVENTORY:
      return { ...state, massUpdate: INIT_STATE.massUpdate };

    case types.REMOVE_FROM_INV_LIST:
      var removedFromMassUpdate = Object.assign(
        [],
        state.massUpdate.populatedData
      ).filter((inv) => inv.pid != action.payload);
      return {
        ...state,
        massUpdate: {
          ...state.massUpdate,
          populatedData: removedFromMassUpdate,
        },
      };

    case types.MASS_UPDATE_INVENTORY:
      return { ...state, massUpdate: { ...state.massUpdate, loading: true } };
    case types.MASS_UPDATE_INVENTORY_SUCCESS:
      NotificationManager.success("Items Updated!");
      return { ...state, massUpdate: { ...state.massUpdate, loading: false } };
    case types.MASS_UPDATE_INVENTORY_FAILURE:
      NotificationManager.error("Error");
      console.log(action.payload);
      return { ...state, massUpdate: { ...state.massUpdate, loading: false } };

    //=========================
    // Stock update
    //=========================
    case types.INV_STOCK_UPDATE:
      return {
        ...state,
        inventoryList: { ...state.inventoryList, loading: true },
      };
    case types.INV_STOCK_UPDATE_SUCCESS:
      NotificationManager.success("Stock count updated");
      var invStockUpdate = updateInvList(action.payload);
      return {
        ...state,
        inventoryList: {
          ...state.inventoryList,
          loading: false,
          tableData: invStockUpdate,
        },
      };
    case types.INV_STOCK_UPDATE_FAILURE:
      NotificationManager.error("Error in updating stock count");
      console.log(action.payload);
      return {
        ...state,
        inventoryList: { ...state.inventoryList, loading: false },
      };

    //=================================
    // Show all Inventory without filter
    //=================================
    case types.SHOW_ALL_INVENTORY:
      return { ...state, inventoryList: { loading: true } };
    case types.SHOW_ALL_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryList: { loading: false, tableData: action.payload },
      };
    case types.SHOW_ALL_INVENTORY_FAILURE:
      NotificationManager.error("Error in showing inventory");
      return { ...state, inventoryList: { loading: false } };

    default:
      return { ...state };
  }
};
