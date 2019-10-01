/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// dashboard
export const AsyncHomebaseComponent = Loadable({
  loader: () => import("Routes/dashboard"),
  loading: () => <RctPageLoader />
});

// report
export const Async_report_component = Loadable({
  loader: () => import("Routes/report"),
  loading: () => <RctPageLoader />
});

// calendar
export const Async_calendar_component = Loadable({
  loader: () => import("Routes/calendar"),
  loading: () => <RctPageLoader />
});
