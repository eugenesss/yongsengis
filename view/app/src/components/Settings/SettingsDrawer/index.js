import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import DrawerListCollapsible from "./DrawerComponent/DrawerListCollapsible";
import DrawerListItem from "./DrawerComponent/DrawerListItem";

const styles = theme => ({
  drawerPaper: {
    zIndex: 90,
    position: "relative",
    height: "100%"
  }
});

const SettingsDrawer = ({
  activeView,
  nestedView,
  openNestedView,
  changeReportView,
  classes
}) => {
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <List>
        <DrawerListCollapsible
          icon="zmdi-case"
          title="User Settings"
          state={nestedView.user}
          openNested={() => openNestedView("user")}
        >
          <DrawerListItem
            onClickListItem={() => changeReportView("userManagement")}
            title="User Management"
            secondary
            selected={activeView == "userManagement"}
          />
          <DrawerListItem
            onClickListItem={() => changeReportView("newUser")}
            title="New Users"
            secondary
            selected={activeView == "newUser"}
          />
        </DrawerListCollapsible>
        <DrawerListCollapsible
          icon="zmdi-case"
          title="General Settings"
          state={nestedView.general}
          openNested={() => openNestedView("general")}
        >
          <DrawerListItem
            onClickListItem={() => changeReportView("dealsPipeline")}
            title=""
            secondary
            selected={activeView == "dealsPipeline"}
          />
        </DrawerListCollapsible>
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(SettingsDrawer);
