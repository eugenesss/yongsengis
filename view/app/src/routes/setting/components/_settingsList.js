import { userManagement, categoriesManagement } from "../AsyncRoutes";

export default [
  {
    title: "Inventory Management",
    stateName: "inv",
    links: [
      {
        title: "Categories",
        asyncComponent: categoriesManagement,
        path: "/inventory/categories"
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
