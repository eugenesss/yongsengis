import React from "react";

//Page req
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import RecordsList from "Components/RecordsList";
import { getTheDate } from "Helpers/helpers";

const LoctiteFilteredTable = ({ data, handleSelect }) => {
  const columns = [
    {
      label: "Name",
      name: "name"
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
      label: "Add to update list",
      name: "pid",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
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
        }
      }
    }
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
    textLabels: { body: { noMatch: "No filtered data" } }
  };

  return <RecordsList columns={columns} data={data} options={listOptions} />;
};

export default LoctiteFilteredTable;
