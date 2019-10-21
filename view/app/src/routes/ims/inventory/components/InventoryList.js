import React from "react";
import AccessComponent from "Auth/AccessComponent";

//Page req
import { IconButton, Tooltip } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import RctSectionLoader from "Components/RctSectionLoader";

const InventoryList = ({
  tableData,
  loading,
  title,
  handleView,
  handleEdit,
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
                    className="mr-2 p-5"
                    aria-label="Edit"
                    onClick={() => {
                      handleEdit(value);
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip id="tooltip-icon" title="Delete">
                  <IconButton
                    className="text-danger p-5 mr-2"
                    aria-label="Delete"
                    onClick={() => {
                      handleDelete(value, tableMeta.rowData[1]);
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </AccessComponent>
            </React.Fragment>
          );
        }
      }
    }
  ];

  // listOptions.onRowClick = rowData => onRowClick(rowData[0]);
  listOptions.customToolbarSelect = (
    selectedRows,
    displayData,
    setSelectRows
  ) =>
    // delete multiple function
    null;

  return (
    <div className="rct-block">
      <RecordsList
        title={title}
        columns={columns}
        data={tableData}
        options={listOptions}
      />
      {loading && <RctSectionLoader />}
    </div>
  );
};

export default InventoryList;
