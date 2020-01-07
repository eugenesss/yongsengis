import {
  userManagement,
  categoriesManagement,
  warehouseManagement
} from "../AsyncRoutes";

export default [
  {
    title: "Inventory Management",
    stateName: "inv",
    links: [
      {
        title: "Categories",
        asyncComponent: categoriesManagement,
        path: "/inventory/categories"
      },
      {
        title: "Warehouses",
        asyncComponent: warehouseManagement,
        path: "/inventory/warehouse"
      }
    ]
  },
  {
    title: "Users & Control",
    stateName: "user",
    links: [
      {
        title: "User Management",
        asyncComponent: userManagement,
        path: "/users-control/user-management"
      }
    ]
  }
];
