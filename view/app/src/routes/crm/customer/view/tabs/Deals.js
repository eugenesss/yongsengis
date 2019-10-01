import React from "react";
import DealList from "Components/CRM/Deal/DealList";

function CustomerDealsTab(props) {
  const { deals } = props;

  return (
    <div className="row">
      <div className="col">
        <DealList title="Related Deals" tableData={deals} noRelated />
      </div>
    </div>
  );
}

export default CustomerDealsTab;
