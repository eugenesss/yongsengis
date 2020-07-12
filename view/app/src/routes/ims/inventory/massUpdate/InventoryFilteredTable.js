import React from "react";

//Page req
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const InventoryFilteredTable = ({ data, handleSelect }) => {
  const classes = useStyles();

  const columns = [
    {
      label: "Name",
      name: "name",
    },
    { label: "Code", name: "code" },
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
    },
    {
      label: "Quantity",
      name: "quantity",
    },
    {
      label: "Quantity Per Box",
      name: "perbox",
    },
    {
      label: "Rack",
      name: "rack",
    },
    {
      label: "Warehouse",
      name: "wh_name",
    },
    {
      label: "Add to update list",
      name: "pid",
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
  ];

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, key) => (
                <TableCell key={key}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, key) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                  {columns.map((column, colKey) => {
                    const value = row[column.name];

                    return (
                      <TableCell key={colKey}>
                        {column.customBodyRender
                          ? column.customBodyRender(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default InventoryFilteredTable;
