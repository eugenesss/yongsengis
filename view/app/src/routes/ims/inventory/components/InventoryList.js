import React from "react";
import AccessComponent from "Auth/AccessComponent";

//Page req
import { IconButton } from "@material-ui/core";
import { Input } from "@material-ui/icons";
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";

import QtyAdjust from "./QtyAdjust";

export default function InventoryList({ tableData, title, handleView }) {
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
        filter: false,
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
    { label: "Code", name: "code", options: { filter: false } },
    {
      label: "Material",
      name: "material"
    },
    {
      label: "Category",
      name: "cat_name"
    },
    {
      label: "Unit Code",
      name: "unit_code",
      options: { filter: false }
    },
    {
      label: "Quantity Per Box",
      name: "perbox",
      options: { display: false, filter: false }
    },
    {
      label: "Rack",
      name: "rack",
      options: { filter: false }
    },
    {
      label: "Warehouse",
      name: "wh_name"
    },
    {
      label: "Quantity",
      name: "quantity",
      options: {
        filter: false
      }
    },
    {
      label: "Adjust Qty",
      name: "pid",
      options: {
        sort: false,
        filter: false,
        search: false,
        customBodyRender: (value, tableMeta) => (
          <AccessComponent>
            <QtyAdjust pid={value} name={tableMeta.rowData[1]} />
          </AccessComponent>
        )
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
}
