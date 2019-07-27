/**
 * App Reducers
 */
import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";
import settings from "./settings";
import inventoryReducer from "./InventoryReducer";
import authUserReducer from "./AuthUserReducer";
import loctiteReducer from "./LoctiteReducer";
import WarehouseReducer from "./WarehouseReducer";
import CategoriesReducer from "./CategoriesReducer";

const reducers = combineReducers({
  settings,
  authUser: authUserReducer,
  inventoryState: inventoryReducer,
  loctiteState: loctiteReducer,
  warehouseState: WarehouseReducer,
  categoriesState: CategoriesReducer,
  modal
});

export default reducers;
