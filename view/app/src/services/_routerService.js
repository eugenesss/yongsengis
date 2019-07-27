// routes
import Dashboard from "Routes/dashboard";
import Inventory from "Routes/inventory";
import Loctite from "Routes/loctite";
import Warehouse from "Routes/warehouse";
import { AsyncSettingPage } from "Components/AsyncComponent/AsyncComponent";

export default [
  {
    path: "dashboard",
    component: Dashboard
  },
  {
    path: "inventory",
    component: Inventory
  },
  {
    path: "loctite",
    component: Loctite
  },
  { path: "warehouse", component: Warehouse },
  { path: "settings", component: AsyncSettingPage }
];
