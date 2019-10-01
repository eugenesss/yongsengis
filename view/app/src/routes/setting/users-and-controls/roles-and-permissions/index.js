import React, { Component } from "react";
import { connect } from "react-redux";

// Role Components
import RolesList from "Components/Setting/UserControl/Roles/RolesList";
import RolesManager from "Components/Setting/UserControl/Roles/RolesManager";

// New Role Dialog
import NewRoleDialog from "Components/Setting/UserControl/Roles/NewRoleDialog";

import { getAllRoles, updateRole } from "Ducks/setting/roles";

class RolesLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRole: null,
      newRoleDialog: false,
      selectedRoleAccess: []
    };
    this.onSelectRole = this.onSelectRole.bind(this);
    this.handleNewRoleDialog = this.handleNewRoleDialog.bind(this);
    this.handleAccessChange = this.handleAccessChange.bind(this);
    this.onEditRole = this.onEditRole.bind(this);
  }
  componentDidMount() {
    this.props.getAllRoles();
  }

  onSelectRole(selectedRole) {
    this.setState({
      selectedRole,
      selectedRoleAccess: selectedRole.accessRights
    });
  }
  handleAccessChange(access, catKey, actionKey, methodKey) {
    const updatedAccess = Object.assign(
      [],
      this.state.selectedRole.accessRights
    );
    methodKey != null
      ? // Crud
        (updatedAccess[catKey].accessRights[actionKey].method[
          methodKey
        ].access = access)
      : // custom method
        (updatedAccess[catKey].accessRights[actionKey].method.access = access);
    this.setState({
      selectedRole: { ...this.state.selectedRole, accessRights: updatedAccess }
    });
  }
  onEditRole() {
    console.log("edit");
    console.log(this.state.selectedRole);
  }

  handleNewRoleDialog() {
    this.setState({ newRoleDialog: !this.state.newRoleDialog });
  }

  render() {
    const { loading } = this.props;
    const { selectedRole, newRoleDialog, selectedRoleAccess } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <RolesList
              handleDialog={this.handleNewRoleDialog}
              selectRole={this.onSelectRole}
              loading={loading}
            />
          </div>
          {selectedRole && (
            <div className="col-md-6">
              <RolesManager
                handleAccessChange={this.handleAccessChange}
                selectedRole={selectedRole}
                saveAccess={() => this.onEditRole()}
              />
            </div>
          )}
        </div>
        <NewRoleDialog
          show={newRoleDialog}
          handleHide={this.handleNewRoleDialog}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ rolesState }) => {
  const { loading, allRoles } = rolesState;
  return { loading, allRoles };
};

export default connect(
  mapStateToProps,
  { getAllRoles }
)(RolesLayout);
