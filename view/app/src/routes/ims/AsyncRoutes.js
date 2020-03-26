import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

/**
 * Inventory Routes
 */
export const ims_inventory_list = Loadable({
  loader: () => import("./inventory"),
  loading: () => <RctPageLoader />
});
export const ims_inventory_new = Loadable({
  loader: () => import("./inventory/new"),
  loading: () => <RctPageLoader />
});
export const ims_inventory_massupdate = Loadable({
  loader: () => import("./inventory/massUpdate"),
  loading: () => <RctPageLoader />
});
export const ims_inventory_import = Loadable({
  loader: () => import("./inventory/import"),
  loading: () => <RctPageLoader />
});

/**
 * Loctite Routes
 */
export const ims_loctite_list = Loadable({
  loader: () => import("./loctite"),
  loading: () => <RctPageLoader />
});
export const ims_loctite_new = Loadable({
  loader: () => import("./loctite/new"),
  loading: () => <RctPageLoader />
});
export const ims_loctite_massupdate = Loadable({
  loader: () => import("./loctite/massUpdate"),
  loading: () => <RctPageLoader />
});
export const ims_loctite_import = Loadable({
  loader: () => import("./loctite/import"),
  loading: () => <RctPageLoader />
});
