/**
 * Horizontal Menu
 */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import navLinks from "./NavLinks";

import NavMenuItem from "./NavMenuItem";

class HorizontalMenu extends Component {
  render() {
    return (
      <div className="horizontal-menu">
        <ul className="list-unstyled nav">
          <li className="nav-item">
            <NavLink
              to="/app/dashboard/"
              className="nav-link no-arrow"
              activeClassName="active"
            >
              <i className="zmdi zmdi-view-dashboard" />
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0);" className="nav-link">
              <i className="zmdi zmdi-lamp" />
              <span className="menu-title">Inventory</span>
            </a>
            <ul className="list-unstyled sub-menu">
              {navLinks.inventory.map((menu, key) => (
                <NavMenuItem menu={menu} key={key} />
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0);" className="nav-link">
              <i className="zmdi zmdi-roller" />
              <span className="menu-title">Loctite</span>
            </a>
            <ul className="list-unstyled sub-menu">
              {navLinks.loctite.map((menu, key) => (
                <NavMenuItem menu={menu} key={key} />
              ))}
            </ul>
          </li>
          {/* <li className="nav-item">
            <a href="javascript:void(0);" className="nav-link">
              <i className="zmdi zmdi-city-alt" />
              <span className="menu-title">Warehouse</span>
            </a>
            <ul className="list-unstyled sub-menu">
              {navLinks.warehouse.map((menu, key) => (
                <NavMenuItem menu={menu} key={key} />
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0);" className="nav-link">
              <i className="zmdi zmdi-file-text" />
              <span className="menu-title">Quote</span>
            </a>
            <ul className="list-unstyled sub-menu">
              {navLinks.quote.map((menu, key) => (
                <NavMenuItem menu={menu} key={key} />
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <a href="javascript:void(0);" className="nav-link">
              <i className="zmdi zmdi-chart" />
              <span className="menu-title">Reports</span>
            </a>
            <ul className="list-unstyled sub-menu">
              {navLinks.reports.map((menu, key) => (
                <NavMenuItem menu={menu} key={key} />
              ))}
            </ul>
          </li> */}
        </ul>
      </div>
    );
  }
}

export default HorizontalMenu;
