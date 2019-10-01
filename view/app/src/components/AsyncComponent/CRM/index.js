import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// crm
export const crm_lead_list = Loadable({
  loader: () => import("Routes/crm/lead"),
  loading: () => <RctPageLoader />
});
export const crm_customer_list = Loadable({
  loader: () => import("Routes/crm/customer"),
  loading: () => <RctPageLoader />
});
export const crm_account_list = Loadable({
  loader: () => import("Routes/crm/account"),
  loading: () => <RctPageLoader />
});
export const crm_deal_list = Loadable({
  loader: () => import("Routes/crm/deal"),
  loading: () => <RctPageLoader />
});
export const crm_team_component = Loadable({
  loader: () => import("Routes/crm/team"),
  loading: () => <RctPageLoader />
});

// crm_view
export const crm_single_lead = Loadable({
  loader: () => import("Routes/crm/lead/view"),
  loading: () => <RctPageLoader />
});
export const crm_single_customer = Loadable({
  loader: () => import("Routes/crm/customer/view"),
  loading: () => <RctPageLoader />
});
export const crm_single_account = Loadable({
  loader: () => import("Routes/crm/account/view"),
  loading: () => <RctPageLoader />
});
export const crm_single_deal = Loadable({
  loader: () => import("Routes/crm/deal/view"),
  loading: () => <RctPageLoader />
});

// crm_new
export const crm_new_lead = Loadable({
  loader: () => import("Routes/crm/lead/new"),
  loading: () => <RctPageLoader />
});
export const crm_new_customer = Loadable({
  loader: () => import("Routes/crm/customer/new"),
  loading: () => <RctPageLoader />
});
export const crm_new_account = Loadable({
  loader: () => import("Routes/crm/account/new"),
  loading: () => <RctPageLoader />
});
export const crm_new_deal = Loadable({
  loader: () => import("Routes/crm/deal/new"),
  loading: () => <RctPageLoader />
});

// crm_edit
export const crm_edit_lead = Loadable({
  loader: () => import("Routes/crm/lead/edit"),
  loading: () => <RctPageLoader />
});
export const crm_edit_customer = Loadable({
  loader: () => import("Routes/crm/customer/edit"),
  loading: () => <RctPageLoader />
});
export const crm_edit_account = Loadable({
  loader: () => import("Routes/crm/account/edit"),
  loading: () => <RctPageLoader />
});
export const crm_edit_deal = Loadable({
  loader: () => import("Routes/crm/deal/edit"),
  loading: () => <RctPageLoader />
});

// crm_import
export const crm_import_lead = Loadable({
  loader: () => import("Routes/crm/lead/import"),
  loading: () => <RctPageLoader />
});
export const crm_import_customer = Loadable({
  loader: () => import("Routes/crm/customer/import"),
  loading: () => <RctPageLoader />
});
export const crm_import_account = Loadable({
  loader: () => import("Routes/crm/account/import"),
  loading: () => <RctPageLoader />
});
export const crm_import_deal = Loadable({
  loader: () => import("Routes/crm/deal/import"),
  loading: () => <RctPageLoader />
});
