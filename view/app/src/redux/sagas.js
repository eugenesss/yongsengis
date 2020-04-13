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
import { TodoListSaga } from "Ducks/widget";

// Import
import { ImportSaga } from "Ducks/import";

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
    ImportSaga(),

    // Settings
    UserManagementSaga(),
    CategorySaga(),
    WarehouseSaga(),
  ]);
}
