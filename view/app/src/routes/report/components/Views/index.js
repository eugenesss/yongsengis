import React from "react";
import { ReportDefaultMessage } from "../DefaultMessages";

// Report Components

// Edit History
import InventoryHistory from "./EditHistory/InventoryHistory";
import LoctiteHistory from "./EditHistory/LoctiteHistory";

const ReportRender = ({ componentToRender }) => {
  switch (componentToRender) {
    //===================
    // Edit History
    //===================
    case "editHistoryInv":
      return <InventoryHistory />;
    case "editHistoryLoctite":
      return <LoctiteHistory />;

    default:
      return <ReportDefaultMessage />;
  }
};

export default ReportRender;
