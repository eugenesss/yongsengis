import React, { Component } from "react";

import UserList from "Components/YSIS/UserList";

class UserManagement extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3>User Management</h3>
        <UserList />
      </div>
    );
  }
}

export default UserManagement;
