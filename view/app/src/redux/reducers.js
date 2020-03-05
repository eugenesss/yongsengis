/**
 * App Reducers
 */
import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";

// session
import { AuthReducer } from "Ducks/session/auth";

//settings
import {
  UserManagementReducer,
  CategoryReducer,
  WarehouseReducer
} from "Ducks/setting";

// system
import { ReportReducer } from "Ducks/report";
import { CalendarReducer } from "Ducks/calendar";
import { TodoListReducer, WarehouseHealthReducer } from "Ducks/widget";

// ims
import { InventoryReducer, LoctiteReducer, ImsFieldReducer } from "Ducks/ims";

const reducers = combineReducers({
  sessionState: combineReducers({
    authState: AuthReducer
  }),
  imsState: combineReducers({
    inventoryState: InventoryReducer,
    loctiteState: LoctiteReducer,
    imsField: ImsFieldReducer
  }),
  settingState: combineReducers({
    categoryState: CategoryReducer,
    warehouseState: WarehouseReducer
  }),
  widgetState: combineReducers({
    todoList: TodoListReducer,
    warehouseHealth: WarehouseHealthReducer
  }),
  reportState: ReportReducer,
  calendarState: CalendarReducer,
  usersState: UserManagementReducer,
  modal
});

export default reducers;
