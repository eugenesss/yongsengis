import React from "react";
import AccessComponent from "Auth/AccessComponent";

import BgCard from "Components/BgCard";
import RecordsList from "Components/RecordsList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { PersonAdd, Edit, Delete } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip";

import RctSectionLoader from "Components/RctSectionLoader";

const UsersList = ({ tableData, loading, editUser, newUser, deleteUser }) => {
  const columns = [
    {
      label: "First Name",
      name: "first_name"
    },
    {
      label: "Last Name",
      name: "last_name"
    },
    { label: "Email", name: "email" },
    {
      label: "Is Admin",
      name: "access",
      options: {
        customBodyRender: value =>
          value == 2 ? (
            <Chip
              className="bg-success text-white"
              size="small"
              label="Admin"
            />
          ) : (
            " "
          )
      }
    },
    {
      label: "Actions",
      name: "id",
      options: {
        filter: false,
        customBodyRender: value => {
          return (
            <AccessComponent>
              <Tooltip id="tooltip-icon" title="Edit Role">
                <IconButton
                  aria-label="More Options"
                  style={{ padding: 6 }}
                  onClick={() => editUser(value)}
                >
                  <Edit style={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
              <Tooltip id="tooltip-icon" title="Edit Role">
                <IconButton
                  aria-label="More Options"
                  style={{ padding: 6, marginLeft: 10 }}
                  onClick={() => deleteUser(value)}
                >
                  <Delete className="text-danger" style={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </AccessComponent>
          );
        }
      }
    }
  ];

  const options = {
    filterType: "multiselect",
    responsive: "scrollMaxHeight",
    download: false,
    print: false,
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 15,
    viewColumns: false,
    rowsPerPageOptions: [15, 30, 60, 100],
    textLabels: { body: { noMatch: "No data to display" } },
    customToolbar: () => (
      <AccessComponent>
        <Tooltip id="tooltip-icon" title="Add User">
          <IconButton
            className="mr-2"
            aria-label="Add User"
            onClick={() => newUser()}
          >
            <PersonAdd />
          </IconButton>
        </Tooltip>
      </AccessComponent>
    )
  };

  return (
    <BgCard fullBlock>
      <RecordsList
        title={"All Users"}
        columns={columns}
        data={tableData}
        options={options}
      />
      {loading && <RctSectionLoader />}
    </BgCard>
  );
};

export default UsersList;
