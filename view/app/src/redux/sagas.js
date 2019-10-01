/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

//  crm
import {
  LeadSaga,
  CustomerSaga,
  AccountSaga,
  DealSaga,
  CrmFieldSaga
} from "Ducks/crm";

// settings
import { UserManagementSaga, RolesSaga } from "Ducks/setting";

// calendar
import { CalendarSaga } from "Ducks/calendar";

// auth
import loginSagas from "./auth/Login";
import registerSagas from "./auth/Register";

// reports
import { ReportSaga } from "Ducks/report";

// widgets
import { WidgetSaga } from "Ducks/widget";

export default function* rootSaga(getState) {
  yield all([
    // CRM
    LeadSaga(),
    CustomerSaga(),
    AccountSaga(),
    DealSaga(),
    CrmFieldSaga(),

    // Auth
    loginSagas(),
    registerSagas(),

    // System
    ReportSaga(),
    WidgetSaga(),
    // Calendar
    CalendarSaga(),

    // Settings
    RolesSaga(),
    UserManagementSaga()
  ]);
}
