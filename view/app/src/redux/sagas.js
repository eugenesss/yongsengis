/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// ims
import { InventorySaga, LoctiteSaga, ImsFieldSaga } from "Ducks/ims";

// settings
import { UserManagementSaga, CategorySaga, WarehouseSaga } from "Ducks/setting";

// session
import AuthSaga from "Ducks/session/auth/AuthSaga";

// reports
import { ReportSaga } from "Ducks/report";

// widgets
import { TodoListSaga, WarehouseHealthSaga } from "Ducks/widget";

export default function* rootSaga() {
  yield all([
    // IMS
    InventorySaga(),
    LoctiteSaga(),
    ImsFieldSaga(),

    // Session
    AuthSaga(),

    // System
    ReportSaga(),
    TodoListSaga(),
    WarehouseHealthSaga(),

    // Settings
    UserManagementSaga(),
    CategorySaga(),
    WarehouseSaga()
  ]);
}
