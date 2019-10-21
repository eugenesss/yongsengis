import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

/**
 * Lead Routes
 */
export const ims_inventory_list = Loadable({
  loader: () => import("./inventory"),
  loading: () => <RctPageLoader />
});
export const ims_inventory_view = Loadable({
  loader: () => import("./inventory/view"),
  loading: () => <RctPageLoader />
});
export const ims_inventory_new = Loadable({
  loader: () => import("./inventory/new"),
  loading: () => <RctPageLoader />
});
export const ims_inventory_edit = Loadable({
  loader: () => import("./inventory/edit"),
  loading: () => <RctPageLoader />
});

/**
 * Customer Routes
 */
export const ims_loctite_list = Loadable({
  loader: () => import("./loctite"),
  loading: () => <RctPageLoader />
});
export const ims_loctite_view = Loadable({
  loader: () => import("./loctite/view"),
  loading: () => <RctPageLoader />
});
export const ims_loctite_new = Loadable({
  loader: () => import("./loctite/new"),
  loading: () => <RctPageLoader />
});
export const ims_loctite_edit = Loadable({
  loader: () => import("./loctite/edit"),
  loading: () => <RctPageLoader />
});
