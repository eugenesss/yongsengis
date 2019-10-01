// routes
import {
  AsyncHomebaseComponent,
  Async_proj_component,
  Async_report_component,
  Async_task_component,
  Async_reminder_component,
  Async_calendar_component,
  Async_chat_component
} from "Components/AsyncComponent/AsyncComponent";
import Crm from "Routes/crm";
import Accounting from "Routes/accounting";
import Setting from "Routes/setting";

export default [
  {
    path: "homebase",
    component: AsyncHomebaseComponent
  },
  {
    path: "crm",
    component: Crm
  },
  {
    path: "proj",
    component: Async_proj_component
  },
  {
    path: "acct",
    component: Accounting
  },
  {
    path: "reports",
    component: Async_report_component
  },
  {
    path: "tasks",
    component: Async_task_component
  },
  {
    path: "reminders",
    component: Async_reminder_component
  },
  {
    path: "calendar",
    component: Async_calendar_component
  },
  {
    path: "settings",
    component: Setting
  },
  {
    path: "chat",
    component: Async_chat_component
  }
];
