import React from "react";
import { ReportDefaultMessage } from "../DefaultMessages";

// Report Components

// Edit History
import InventoryHistory from "./EditHistory/InventoryHistory";
import LoctiteHistory from "./EditHistory/LoctiteHistory";

const reportRender = {
  editHistoryInv: InventoryHistory,
  editHistoryLoctite: LoctiteHistory
};

export default ({ componentToRender }) => {
  const Handler = reportRender[componentToRender] || ReportDefaultMessage;
  return <Handler />;
};
