import React from "react";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const columns = [
  {
    label: "Name",
    name: "name"
  },
  {
    label: "Email",
    name: "warehouse"
  },
  {
    label: "Actions",
    name: "pid",
    options: {
      filter: false,
      sort: false,
      customBodyRender: value => {
        return (
          <Tooltip id="tooltip-icon" title="Edit">
            <IconButton
              className="text-primary mr-2"
              aria-label="Edit"
              //   onClick={() => {
              //     handleEdit(value);
              //   }}
            >
              <i className="zmdi zmdi-edit" />
            </IconButton>
          </Tooltip>
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
  filter: false,
  selectableRows: "none",
  textLabels: { body: { noMatch: "No users to display" } }
};

function UserList(props) {
  return <MUIDataTable data={props.data} columns={columns} options={options} />;
}

export default UserList;
