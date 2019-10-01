import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// General
export const gen_companyDetails = Loadable({
  loader: () => import("Routes/setting/general/companyDetails"),
  loading: () => <RctPageLoader />
});
export const gen_myProfile = Loadable({
  loader: () => import("Routes/setting/general/myProfile"),
  loading: () => <RctPageLoader />
});
// User & Controls
export const user_usersList = Loadable({
  loader: () => import("Routes/setting/users-and-controls/users"),
  loading: () => <RctPageLoader />
});
export const user_rolesPermissions = Loadable({
  loader: () =>
    import("Routes/setting/users-and-controls/roles-and-permissions"),
  loading: () => <RctPageLoader />
});
export const user_groups = Loadable({
  loader: () => import("Routes/setting/users-and-controls/groups"),
  loading: () => <RctPageLoader />
});
// CRM
export const crm_team = Loadable({
  loader: () => import("Routes/setting/crm/team"),
  loading: () => <RctPageLoader />
});
// Accounting
export const acc_creditNote = Loadable({
  loader: () => import("Routes/setting/accounting/creditNote"),
  loading: () => <RctPageLoader />
});
export const acc_general = Loadable({
  loader: () => import("Routes/setting/accounting/general"),
  loading: () => <RctPageLoader />
});
export const acc_invoice = Loadable({
  loader: () => import("Routes/setting/accounting/invoice"),
  loading: () => <RctPageLoader />
});
export const acc_quotation = Loadable({
  loader: () => import("Routes/setting/accounting/quotation"),
  loading: () => <RctPageLoader />
});
// Cron Job
export const cron_leadReminders = Loadable({
  loader: () => import("Routes/setting/reminders/leadReminders"),
  loading: () => <RctPageLoader />
});
export const cron_quotationReminders = Loadable({
  loader: () => import("Routes/setting/reminders/quotationReminders"),
  loading: () => <RctPageLoader />
});
