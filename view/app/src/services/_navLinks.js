// // crm routes
// import {
//   leadListPage,
//   customerListPage,
//   accountListPage,
//   dealListPage
// } from "Helpers/crmURL";
// // acct routes
// import {
//   quoteListPage,
//   invoiceListPage,
//   crednoteListPage,
//   paymentPage
// } from "Helpers/accountingURL";
// ims routes
import { inventoryListPage, loctiteListPage } from "Helpers/imsURL";

export default [
  {
    url: "/app/dashboard",
    baseUrl: "/app/dashboard",
    name: "Dashboard",
    child_routes: []
  },
  // {
  //   url: "/app/calendar",
  //   baseUrl: "/app/calendar",
  //   name: "Calendar",
  //   child_routes: []
  // },
  // {
  //   url: "/app/crm/leads",
  //   baseUrl: "/app/crm",
  //   name: "CRM",
  //   child_routes: [
  //     {
  //       title: "sidebar.leads",
  //       path: leadListPage
  //     },
  //     {
  //       title: "sidebar.customers",
  //       path: customerListPage
  //     },
  //     {
  //       title: "sidebar.accounts",
  //       path: accountListPage
  //     },
  //     {
  //       title: "sidebar.deals",
  //       path: dealListPage
  //     }
  //   ]
  // },
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
  // {
  //   url: "/app/acct/quotations",
  //   baseUrl: "/app/acct",
  //   name: "Accounting",
  //   child_routes: [
  //     {
  //       title: "sidebar.quotations",
  //       path: quoteListPage
  //     },
  //     {
  //       title: "sidebar.invoices",
  //       path: invoiceListPage
  //     },
  //     {
  //       title: "sidebar.payment",
  //       path: paymentPage
  //     },
  //     {
  //       title: "sidebar.credit_note",
  //       path: crednoteListPage
  //     }
  //   ]
  // },
  {
    url: "/app/reports",
    baseUrl: "/app/reports",
    name: "Reports",
    child_routes: []
  }
];
