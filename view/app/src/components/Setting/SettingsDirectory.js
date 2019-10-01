import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Side Drawer
import SideDrawer from "Components/Everyday/SideDrawer";
import DrawerListCollapsible from "Components/Everyday/SideDrawer/DrawerListCollapsible";
import DrawerListItem from "Components/Everyday/SideDrawer/DrawerListItem";

// import { accessControlHelper } from "Helpers/accessControlHelper";

class SettingsDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: true,
      user: true,
      crm: true,
      accounting: true,
      reminder: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  handleClick = item => {
    this.setState({ [item]: !this.state[item] });
  };

  handleClickItem(path) {
    this.props.history.push(path);
  }

  render() {
    const { location } = this.props;
    const { general, user, crm, accounting, reminder } = this.state;
    return (
      <SideDrawer>
        <DrawerListCollapsible
          title="General"
          state={general}
          openNested={() => this.handleClick("general")}
        >
          <DrawerListItem
            onClickListItem={() =>
              this.handleClickItem("/app/settings/general/my-profile")
            }
            title="My Profile"
            secondary
            selected={location.pathname === "/app/settings/general/my-profile"}
          />
          {/* <DrawerListItem
            onClickListItem={() =>
              this.handleClickItem("/app/settings/general/company-details")
            }
            title="Company Details"
            secondary
            selected={
              location.pathname === "/app/settings/general/company-details"
            }
          /> */}
        </DrawerListCollapsible>

        <DrawerListCollapsible
          title={"User & Control"}
          state={user}
          openNested={() => this.handleClick("user")}
        >
          <DrawerListItem
            onClickListItem={() =>
              this.handleClickItem("/app/settings/users-and-controls/users")
            }
            title="Users"
            secondary
            selected={
              location.pathname === "/app/settings/users-and-controls/users"
            }
          />
          <DrawerListItem
            onClickListItem={() =>
              this.handleClickItem(
                "/app/settings/users-and-controls/roles-and-permissions"
              )
            }
            title={"Roles & Permissions"}
            secondary
            selected={
              location.pathname ===
              "/app/settings/users-and-controls/roles-and-permissions"
            }
          />
          {/* <DrawerListItem
            onClickListItem={() =>
              this.handleClickItem("/app/settings/users-and-controls/groups")
            }
            title={"Groups"}
            secondary
            selected={
              location.pathname === "/app/settings/users-and-controls/groups"
            }
          /> */}
        </DrawerListCollapsible>

        {/* <ListItem button onClick={() => this.handleClick("crm")}>
              <ListItemText
                inset
                primary={"CRM"}
                className={classes.listItem}
              />
              {this.state.crm ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.crm} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => this.handleClickItem("/app/settings/crm/team")}
                  selected={location.pathname === "/app/settings/crm/team"}
                >
                  <ListItemText inset secondary={"Team"} />
                </ListItem>
              </List>
            </Collapse> */}

        {/* <ListItem button onClick={() => this.handleClick("accounting")}>
              <ListItemText
                inset
                primary={"Accounting"}
                className={classes.listItem}
              />
              {this.state.accounting ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.accounting} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() =>
                    this.handleClickItem("/app/settings/accounting/general")
                  }
                  selected={
                    location.pathname === "/app/settings/accounting/general"
                  }
                >
                  <ListItemText inset secondary={"General"} />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() =>
                    this.handleClickItem("/app/settings/accounting/quotation")
                  }
                  selected={
                    location.pathname === "/app/settings/accounting/quotation"
                  }
                >
                  <ListItemText inset secondary={"Quotation"} />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() =>
                    this.handleClickItem("/app/settings/accounting/invoice")
                  }
                  selected={
                    location.pathname === "/app/settings/accounting/invoice"
                  }
                >
                  <ListItemText inset secondary={"Invoice"} />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() =>
                    this.handleClickItem("/app/settings/accounting/credit-note")
                  }
                  selected={
                    location.pathname === "/app/settings/accounting/credit-note"
                  }
                >
                  <ListItemText inset secondary={"Credit Note"} />
                </ListItem>
              </List>
            </Collapse> */}

        {/* <ListItem button onClick={() => this.handleClick("reminder")}>
              <ListItemText
                inset
                primary={"Reminders"}
                className={classes.listItem}
              />
              {this.state.reminder ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.reminder} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() =>
                    this.handleClickItem(
                      "/app/settings/reminders/lead-reminders"
                    )
                  }
                  selected={
                    location.pathname ===
                    "/app/settings/reminders/lead-reminders"
                  }
                >
                  <ListItemText inset secondary={"Lead Reminders"} />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() =>
                    this.handleClickItem(
                      "/app/settings/reminders/quotation-reminders"
                    )
                  }
                  selected={
                    location.pathname ===
                    "/app/settings/reminders/quotation-reminders"
                  }
                >
                  <ListItemText inset secondary={"Quotation Reminders"} />
                </ListItem>
              </List>
            </Collapse> */}
      </SideDrawer>
    );
  }
}

export default withRouter(SettingsDirectory);
