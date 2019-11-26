/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// ims
import { InventorySaga, LoctiteSaga, ImsFieldSaga } from "Ducks/ims";

// settings
import { UserManagementSaga, CategorySaga } from "Ducks/setting";

// session
import AuthSaga from "Ducks/session/auth/AuthSaga";

// reports
import { ReportSaga } from "Ducks/report";

// widgets
import { WidgetSaga } from "Ducks/widget";

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
    WidgetSaga(),

    // Calendar

    // Settings
    UserManagementSaga(),
    CategorySaga()
  ]);
}
