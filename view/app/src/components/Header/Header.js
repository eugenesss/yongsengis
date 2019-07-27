/**
 * App Header
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { withRouter } from "react-router-dom";
// intl messages
import UserBlock from "./UserBlock";

const Header = () => {
  return (
    <AppBar position="static" className="rct-header bg-secondary">
      <Toolbar className="d-flex justify-content-between w-100 pl-0">
        <div className="d-flex align-items-center">
          <div className="site-logo">
            <Link to="/" className="logo-mini">
              <img
                src={require("Assets/img/ys-logo-trans.png")}
                alt="site logo"
                width="35"
                height="35"
              />
            </Link>
          </div>

          <ul className="list-inline mb-0 navbar-left">
            <h1 className="mb-0">Yong Seng Inventory System</h1>
          </ul>
        </div>
        <ul className="navbar-right list-inline mb-0">
          {/* <Notifications /> */}
          <li className="list-inline-item">
            <Tooltip title="Settings" placement="bottom">
              <IconButton aria-label="settings" href="/app/settings">
                <i className={"zmdi zmdi-settings text-white"} />
              </IconButton>
            </Tooltip>
          </li>
          <UserBlock />
        </ul>
      </Toolbar>
    </AppBar>
  );
};

// map state to props
const mapStateToProps = ({ settings }) => {
  return settings;
};

export default withRouter(connect(mapStateToProps)(Header));
