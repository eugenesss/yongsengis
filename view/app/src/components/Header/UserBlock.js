import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Actions
import { logout } from "Actions";

class UserBlock extends Component {
  handleProfile() {
    console.log("profile");
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <UncontrolledDropdown nav className="list-inline-item cart-dropdown">
        <DropdownToggle nav className="p-0">
          <Tooltip title="User" placement="bottom">
            <IconButton aria-label="user">
              <i className="zmdi zmdi-face text-white" />
            </IconButton>
          </Tooltip>
        </DropdownToggle>
        <DropdownMenu>
          <div className="dropdown-content">
            <div className="lazy-up">
              <div className="card p-20">
                <div className="media">
                  <div className="media-body">
                    <span className="mb-5 text-primary fs-14 d-block">
                      Hello!
                    </span>
                    <h4 className="mb-5">Admin</h4>
                    <span className="text-muted fs-12 mb-15 d-block">
                      <i>Member since 4 hours ago</i>
                    </span>
                  </div>
                </div>
                <div className="card-foot d-flex align-self-end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.handleLogout()}
                    className="btn-warning mb-10 text-white"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user } = authUser;
  return { user };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(UserBlock)
);
