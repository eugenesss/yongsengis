/**
 * Initialise Modules
 */

import HomebaseComponent from "Routes/dashboard/AsyncRoutes";
import ReportComponent from "Routes/report/AsyncRoutes";

import ims from "Routes/ims";
import Setting from "Routes/setting";

export default [
  {
    path: "dashboard",
    component: HomebaseComponent
  },
  { path: "ims", component: ims },
  {
    path: "reports",
    component: ReportComponent
  },
  {
    path: "settings",
    component: Setting
  }
];
