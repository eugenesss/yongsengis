import React from "react";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";

export default function StockCountList(props) {
  const { columns, tableData } = props;

  const options = Object.assign({}, listOptions, {
    setTableProps: () => ({ size: "small" })
  });

  return <RecordsList columns={columns} data={tableData} options={options} />;
}
