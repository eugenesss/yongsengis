import React from "react";
import RecordsList from "Components/RecordsList";
import { IconButton, Button } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

function CategoriesTable({ data, editCat, newCat, deleteCat }) {
  const columns = [
    { label: "Cid", name: "cid" },
    { label: "Name", name: "cat_name" },
    {
      name: "cid",
      label: "Action",
      options: {
        customBodyRender: (value) => (
          <React.Fragment>
            <IconButton size="small" onClick={() => editCat(value)}>
              <Edit style={{ fontSize: "1rem" }} />
            </IconButton>
            <IconButton
              className="ml-10 text-danger"
              size="small"
              onClick={() => deleteCat(value)}
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
    textLabels: { body: { noMatch: "No Categories" } },
    customToolbar: () => {
      return (
        <Button onClick={newCat} variant="contained">
          New Categories
        </Button>
      );
    },
    setTableProps: () => ({ size: "small" }),
  };
  return (
    <RecordsList
      title={"All Categories"}
      columns={columns}
      data={data}
      options={options}
    />
  );
}

export default CategoriesTable;
