import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const DrawerListItem = ({
  onClickListItem,
  title,
  icon,
  secondary,
  selected
}) => {
  return (
    <ListItem selected={selected} button onClick={onClickListItem}>
      {secondary ? (
        <ListItemText secondary={title} />
      ) : (
        <ListItemText primary={title} />
      )}
    </ListItem>
  );
};

export default DrawerListItem;
