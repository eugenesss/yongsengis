import React from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";

export default function ListViewSelector(props) {
  const {
    options,
    nowShowing,
    onChangeValue,
    optLabel,
    optValue,
    ...others
  } = props;

  return (
    <FormControl variant="outlined">
      <Select
        id="demo-simple-select-outlined"
        value={nowShowing}
        onChange={onChangeValue}
        label="Age"
        displayEmpty
        variant="standard"
        SelectDisplayProps={{ size: "small" }}
        {...others}
      >
        {options.map((opt) => (
          <MenuItem key={opt[optValue]} dense value={opt[optValue]}>
            {opt[optLabel]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
