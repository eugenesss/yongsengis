import React from "react";
import AccessComponent from "Auth/AccessComponent";

//Page req
import RecordsList from "Components/RecordsList";
import { listOptions, getTheDate } from "Helpers/helpers";
import QtyAdjust from "./QtyAdjust";

const LoctiteList = ({ tableData, title, handleView }) => {
  const columns = [
    {
      label: "ID",
      name: "pid",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      label: "Name",
      name: "name",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <a
              className="text-primary"
              onClick={() => handleView(tableMeta.rowData[0])}
            >
              {value}
            </a>
          );
        }
      }
    },
    { label: "Quantity", name: "quantity" },
    {
      label: "Batch Number",
      name: "batch"
    },
    {
      label: "Expiration Date",
      name: "expiry_date",
      options: {
        customBodyRender: value => getTheDate(value)
      }
    },
    {
      label: "Adjust Qty",
      name: "pid",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <AccessComponent>
              <QtyAdjust pid={value} name={tableMeta.rowData[1]} />
            </AccessComponent>
          );
        }
      }
    }
  ];

  const options = Object.assign({}, listOptions, {
    setTableProps: () => ({ size: "small" })
  });

  return (
    <RecordsList
      title={title}
      columns={columns}
      data={tableData}
      options={options}
    />
  );
};

export default LoctiteList;
