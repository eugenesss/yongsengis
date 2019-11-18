import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

/**
 * User Management
 */
export const userManagement = Loadable({
  loader: () => import("./userManagement"),
  loading: () => <RctPageLoader />
});
/**
 * Inventory Management
 */
export const warehouseManagement = Loadable({
  loader: () => import("./Inventory/warehouse"),
  loading: () => <RctPageLoader />
});
export const categoriesManagement = Loadable({
  loader: () => import("./Inventory/categories"),
  loading: () => <RctPageLoader />
});
