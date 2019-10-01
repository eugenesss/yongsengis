import React, { Component } from "react";
import { connect } from "react-redux";
import UsersList from "Components/Setting/UserControl/Users/UsersList";

// Dialogs
import AddUserDialog from "Components/Setting/UserControl/Users/AddUserDialog";
// import UserControlDialog from "Components/Setting/UserControl/Users/UserControlDialog";

// Actions
import { getAllUsers } from "Ducks/setting/userManagement";

class UsersLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addUserDialog: false,
      userControlDialog: false,
      userToEdit: ""
    };
    this.openAddUserDialog = this.openAddUserDialog.bind(this);
    this.openUserControlDialog = this.openUserControlDialog.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  openAddUserDialog() {
    this.setState({ addUserDialog: !this.state.addUserDialog });
  }

  openUserControlDialog(id) {
    this.setState({
      userControlDialog: !this.state.userControlDialog,
      userToEdit: id
    });
  }

  render() {
    const { userList, usersLoading } = this.props;
    const { addUserDialog, userControlDialog, userToEdit } = this.state;
    return (
      <React.Fragment>
        <UsersList
          action={{
            openAddUserDialog: this.openAddUserDialog,
            openUserControlDialog: this.openUserControlDialog
          }}
          tableData={userList}
          loading={usersLoading}
        />
        <AddUserDialog
          show={addUserDialog}
          handleClose={this.openAddUserDialog}
        />
        {/* <UserControlDialog
          show={userControlDialog}
          handleClose={this.openUserControlDialog}
          userToEdit={userToEdit}
        /> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ usersState }) => {
  const { userList, usersLoading } = usersState;
  return { userList, usersLoading };
};

export default connect(
  mapStateToProps,
  { getAllUsers }
)(UsersLayout);
