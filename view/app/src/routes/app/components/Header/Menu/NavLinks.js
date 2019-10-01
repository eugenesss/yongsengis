// crm routes
import {
  leadListPage,
  customerListPage,
  accountListPage,
  dealListPage,
  teamListPage
} from "Helpers/url/crm";
// acct routes
import {
  quoteListPage,
  invoiceListPage,
  crednoteListPage,
  paymentPage
} from "Helpers/url/accounting";

export default [
  {
    url: "/app/dashboard",
    baseUrl: "/app/dashboard",
    name: "HomeBase",
    child_routes: []
  },
  {
    url: "/app/calendar",
    baseUrl: "/app/calendar",
    name: "Calendar",
    child_routes: []
  },
  {
    url: "/app/crm/leads",
    baseUrl: "/app/crm",
    name: "CRM",
    child_routes: [
      {
        title: "sidebar.leads",
        path: leadListPage
      },
      {
        title: "sidebar.customers",
        path: customerListPage
      },
      {
        title: "sidebar.accounts",
        path: accountListPage
      },
      {
        title: "sidebar.deals",
        path: dealListPage
      }
      // {
      //   title: "sidebar.teams",
      //   path: teamListPage
      // }
    ]
  },
  {
    url: "/app/acct/quotations",
    baseUrl: "/app/acct",
    name: "Accounting",
    child_routes: [
      {
        title: "sidebar.quotations",
        path: quoteListPage
      },
      {
        title: "sidebar.invoices",
        path: invoiceListPage
      },
      {
        title: "sidebar.payment",
        path: paymentPage
      },
      {
        title: "sidebar.credit_note",
        path: crednoteListPage
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
