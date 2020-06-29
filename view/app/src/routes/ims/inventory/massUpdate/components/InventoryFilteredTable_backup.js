import React from "react";

//Page req
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import RecordsList from "Components/RecordsList";

const InventoryFilteredTable = ({ data, handleSelect }) => {
  const columns = [
    {
      label: "Name",
      name: "name",
    },
    { label: "Code", name: "code", options: { filter: false } },
    {
      label: "Material",
      name: "material",
    },
    {
      label: "Category",
      name: "cat_name",
    },
    {
      label: "Unit Code",
      name: "unit_code",
      options: { filter: false },
    },
    {
      label: "Quantity",
      name: "quantity",
      options: { filter: false },
    },
    {
      label: "Quantity Per Box",
      name: "perbox",
      options: { display: false, filter: false },
    },
    {
      label: "Rack",
      name: "rack",
      options: { filter: false },
    },
    {
      label: "Warehouse",
      name: "wh_name",
    },
    {
      label: "Add to update list",
      name: "pid",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <IconButton
              className="mr-2 p-5"
              aria-label="Edit"
              onClick={() => {
                handleSelect(value);
              }}
            >
              <Add className="text-success" fontSize="small" />
            </IconButton>
          );
        },
      },
    },
  ];

  const listOptions = {
    filterType: "multiselect",
    responsive: "scrollFullHeight",
    download: false,
    print: false,
    filter: false,
    search: false,
    viewColumns: false,
    customToolbar: false,
    title: false,
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
    textLabels: { body: { noMatch: "No filtered data" } },
  };

  return <RecordsList columns={columns} data={data} options={listOptions} />;
};

export default InventoryFilteredTable;
