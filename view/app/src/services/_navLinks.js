import { inventoryListPage, loctiteListPage } from "Helpers/imsURL";

export default [
  {
    url: "/app/dashboard",
    baseUrl: "/app/dashboard",
    name: "Dashboard",
    child_routes: []
  },
  {
    url: "/app/ims/inventory",
    baseUrl: "/app/ims",
    name: "IMS",
    child_routes: [
      {
        title: "sidebar.inventory",
        path: inventoryListPage
      },
      {
        title: "sidebar.loctite",
        path: loctiteListPage
      }
    ]
  },

  {
    url: "/app/reports",
    baseUrl: "/app/reports",
    name: "Reports",
    child_routes: []
  }
];
