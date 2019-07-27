import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

const DrawerListCollapsible = ({
  icon,
  title,
  state,
  openNested,
  children
}) => {
  return (
    <React.Fragment>
      <ListItem button onClick={openNested}>
        <ListItemText primary={title} />
        {state ? (
          <i className="zmdi zmdi-chevron-down zmdi-hc-lg" />
        ) : (
          <i className="zmdi zmdi-chevron-up zmdi-hc-lg" />
        )}
      </ListItem>
      <Collapse component="li" in={state} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default DrawerListCollapsible;
