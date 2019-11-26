import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

// Components
import UsersList from "./components/UsersList";

// Dialogs
import AddUserDialog from "./components/dialogs/AddUserDialog";

// Actions
import { getAllUsers, deleteUser } from "Ducks/setting/userManagement";

class Setting_UserManagement extends Component {
  constructor(props) {
    super(props);
    this.newUser = this.newUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUserDialog = this.deleteUserDialog.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  newUser() {
    this.props.show("add_user");
  }

  editUser(id) {
    const toEdit = this.props.userList.find(user => user.id == id);
    this.props.show("add_user", { edit: toEdit });
  }

  deleteUserDialog(id) {
    this.props.show("alert_delete", {
      action: () => this.props.deleteUser(id)
    });
  }

  render() {
    const { userList, usersLoading } = this.props;
    return (
      <React.Fragment>
        <UsersList
          editUser={this.editUser}
          newUser={this.newUser}
          deleteUser={this.deleteUserDialog}
          tableData={userList}
          loading={usersLoading}
        />
        <AddUserDialog />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ usersState }) => {
  const { userList, usersLoading } = usersState;
  return { userList, usersLoading };
};

export default connect(mapStateToProps, { getAllUsers, show, deleteUser })(
  Setting_UserManagement
);
