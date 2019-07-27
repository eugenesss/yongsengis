import React from "react";
import MUIDataTable from "mui-datatables";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { getTheDate } from "Helpers/helpers";

const LoctiteList = ({
  data,
  loading,
  handleEdit,
  handleDelete,
  handleView
}) => {
  const columns = [
    {
      label: "ID",
      name: "id",
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
    { label: "Total Stock", name: "totalStock" },
    {
      label: "Batch Number",
      name: "batchNum"
    },
    {
      label: "Quantity",
      name: "batch"
    },
    {
      label: "Expiration Date",
      name: "expiry"
      // options: {
      //   customBodyRender: value => getTheDate(value)
      // }
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
            </React.Fragment>
          );
        }
      }
    }
  ];
  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    download: false,
    print: false,
    selectableRows: "none",
    textLabels: { body: { noMatch: "No Loctite to display" } }
  };
  return (
    <React.Fragment>
      <MUIDataTable
        title={"Loctite list"}
        data={data}
        columns={columns}
        options={options}
      />
      {loading && <RctSectionLoader />}
    </React.Fragment>
  );
};

export default LoctiteList;
