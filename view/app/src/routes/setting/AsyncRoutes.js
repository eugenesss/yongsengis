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
 * Roles
 */
export const roles = Loadable({
  loader: () => import("./roles"),
  loading: () => <RctPageLoader />
});
