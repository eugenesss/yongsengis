/**
 * App Reducers
 */
import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";

// session
import { AuthReducer } from "Ducks/session/auth";

// account
import {
  CreditNoteReducer,
  InvoiceReducer,
  PaymentReducer,
  QuotationReducer
} from "Ducks/accounting";

// crm
import {
  LeadReducer,
  CustomerReducer,
  AccountReducer,
  DealReducer,
  CrmFieldReducer
} from "Ducks/crm";

//settings
import { UserManagementReducer, RolesReducer } from "Ducks/setting";

// system
import { ReportReducer } from "Ducks/report";
import { CalendarReducer } from "Ducks/calendar";
import { WidgetReducer } from "Ducks/widget";

const reducers = combineReducers({
  sessionState: combineReducers({
    authState: AuthReducer
  }),
  crmState: combineReducers({
    leadState: LeadReducer,
    customerState: CustomerReducer,
    accountState: AccountReducer,
    dealState: DealReducer,
    crmField: CrmFieldReducer
  }),
  accountingState: combineReducers({
    quotationState: QuotationReducer,
    invoiceState: InvoiceReducer,
    creditNoteState: CreditNoteReducer,
    paymentState: PaymentReducer
    // accountState: AccountingReducer
  }),
  widgetState: WidgetReducer,
  reportState: ReportReducer,
  calendarState: CalendarReducer,
  usersState: UserManagementReducer,
  rolesState: RolesReducer,
  modal
});

export default reducers;
