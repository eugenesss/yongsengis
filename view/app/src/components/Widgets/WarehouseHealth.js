import React from "react";

function WarehouseHealth(props) {
  return (
    <div>
      <p>tabs to show all/warehouse1/warehouse2/warehouse/3</p>
      <p>pie chart => green (stock count > 10 )</p>
      <p>pie chart => yellow (stock count > 5 )</p>
      <p>pie chart => red (stock count = 0 )</p>
    </div>
  );
}

export default WarehouseHealth;
