import React from "react";
import MUIDataTable from "mui-datatables";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import AccessComponent from "Components/AccessComponent";

// style
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiTableCell: {
        body: {
          fontSize: "0.9rem"
        }
      }
    }
  });

const InventoryList = ({
  title,
  data,
  loading,
  handleEdit,
  handleView,
  handleDelete
}) => {
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
      label: "Quantity",
      name: "quantity",
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
      label: "Actions",
      name: "pid",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <React.Fragment>
              <AccessComponent>
                <Tooltip id="tooltip-icon" title="Edit">
                  <IconButton
                    className="text-primary mr-2"
                    aria-label="Edit"
                    onClick={() => {
                      handleEdit(value);
                    }}
                  >
                    <i className="zmdi zmdi-edit" />
                  </IconButton>
                </Tooltip>
                <Tooltip id="tooltip-icon" title="Delete">
                  <IconButton
                    className="text-danger mr-2"
                    aria-label="Delete"
                    onClick={() => {
                      handleDelete(value, tableMeta.rowData[1]);
                    }}
                  >
                    <i className="zmdi zmdi-delete" />
                  </IconButton>
                </Tooltip>
              </AccessComponent>
            </React.Fragment>
          );
        }
      }
    }
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    download: false,
    print: false,
    selectableRows: "none",
    rowsPerPage: 50,
    rowsPerPageOptions: [20, 50, 100, data.length],
    textLabels: { body: { noMatch: "No data to display" } }
  };

  return (
    <React.Fragment>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
      {loading && <RctSectionLoader />}
    </React.Fragment>
  );
};

export default InventoryList;
