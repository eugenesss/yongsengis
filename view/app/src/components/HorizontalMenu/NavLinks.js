// horizontal nav links
export default {
  category1: [
    {
      menu_title: "Dashboard",
      menu_icon: "zmdi zmdi-coffee",
      path: "/app/dashboard",
      child_routes: null
    }
  ],
  inventory: [
    {
      menu_title: "View All",
      menu_icon: "zmdi zmdi-eye",
      path: "/app/inventory/all",
      child_routes: null
    },
    {
      menu_title: "New Item",
      menu_icon: "zmdi zmdi-plus",
      path: "/app/inventory/new",
      child_routes: null
    },
    {
      menu_title: "Stock Adjustments",
      menu_icon: "zmdi zmdi-plus",
      path: "/app/inventory/adjustments",
      child_routes: null
    }
  ],
  warehouse: [
    {
      menu_title: "Warehouse 1",
      menu_icon: "zmdi zmdi-home",
      child_routes: [
        {
          menu_title: "View Inventory",
          menu_icon: "zmdi zmdi-eye",
          path: "/app/warehouse/warehouse_1",
          new_item: false
        },
        {
          menu_title: "Report",
          menu_icon: "zmdi zmdi-progress",
          path: "/app/dashboard/ecommerce",
          new_item: false
        }
      ]
    },
    {
      menu_title: "Warehouse 2",
      menu_icon: "zmdi zmdi-home",
      child_routes: [
        {
          menu_title: "View Inventory",
          menu_icon: "zmdi zmdi-eye",
          path: "/app/warehouse/warehouse_2",
          new_item: false
        },
        {
          menu_title: "Report",
          menu_icon: "zmdi zmdi-progress",
          path: "/app/dashboard/ecommerce",
          new_item: false
        }
      ]
    },
    {
      menu_title: "Warehouse 3",
      menu_icon: "zmdi zmdi-home",
      child_routes: [
        {
          menu_title: "View Inventory",
          menu_icon: "zmdi zmdi-eye",
          path: "/app/warehouse/warehouse_3",
          new_item: false
        },
        {
          menu_title: "Report",
          menu_icon: "zmdi zmdi-progress",
          path: "/app/dashboard/ecommerce",
          new_item: false
        }
      ]
    }
  ],
  quote: [
    {
      menu_title: "View All",
      menu_icon: "zmdi zmdi-eye",
      path: "/app/dashboard/ecommerce",
      child_routes: null
    },
    {
      menu_title: "Create New",
      menu_icon: "zmdi zmdi-plus",
      path: "/app/dashboard/ecommerce",
      child_routes: null
    }
  ],
  loctite: [
    {
      menu_title: "View All",
      menu_icon: "zmdi zmdi-eye",
      path: "/app/loctite/all",
      child_routes: null
    },
    {
      menu_title: "New Item",
      menu_icon: "zmdi zmdi-plus",
      path: "/app/loctite/new",
      child_routes: null
    },
    {
      menu_title: "Stock Adjustments",
      menu_icon: "zmdi zmdi-plus",
      path: "/app/loctite/adjustments",
      child_routes: null
    }
  ],
  reports: [
    {
      menu_title: "Warehouse 1",
      menu_icon: "zmdi zmdi-home",
      path: "/app/warehouse/warehouse_1",
      child_routes: null
    },
    {
      menu_title: "Warehouse 2",
      menu_icon: "zmdi zmdi-home",
      path: "/app/warehouse/warehouse_2",
      child_routes: null
    },
    {
      menu_title: "Warehouse 3",
      menu_icon: "zmdi zmdi-home",
      path: "/app/warehouse/warehouse_3",
      child_routes: null
    }
  ]
};
