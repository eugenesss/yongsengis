import React from "react";
import RecordsList from "Components/RecordsList";
import { IconButton, Button } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

function WarehouseList({ data, editWh, newWh, deleteWh }) {
  const columns = [
    { label: "Wid", name: "wid" },
    { label: "Name", name: "wh_name" },
    { label: "Location", name: "location" },
    {
      name: "wid",
      label: "Action",
      options: {
        customBodyRender: (value) => (
          <React.Fragment>
            <IconButton size="small" onClick={() => editWh(value)}>
              <Edit style={{ fontSize: "1rem" }} />
            </IconButton>
            <IconButton
              className="ml-10 text-danger"
              size="small"
              onClick={() => deleteWh(value)}
            >
              <Delete style={{ fontSize: "1rem" }} />
            </IconButton>
          </React.Fragment>
        ),
        filter: false,
        search: false,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scrollFullHeight",
    download: false,
    print: false,
    viewColumns: false,
    elevation: 0,
    selectableRows: "none",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 30, 50],
    textLabels: { body: { noMatch: "No Warehouse" } },
    customToolbar: () => {
      return (
        <Button onClick={newWh} variant="contained">
          New Warehouse
        </Button>
      );
    },
    setTableProps: () => ({ size: "small" }),
  };
  return (
    <RecordsList
      title={"All Warehouse"}
      columns={columns}
      data={data}
      options={options}
    />
  );
}

export default WarehouseList;
