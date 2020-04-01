import React from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";

export default function ListViewSelector(props) {
  const { options, nowShowing, onChangeValue, optLabel, optValue } = props;

  return (
    <FormControl variant="outlined">
      <Select
        id="demo-simple-select-outlined"
        value={nowShowing}
        onChange={onChangeValue}
        label="Age"
        displayEmpty
      >
        {options.map(opt => (
          <MenuItem key={opt[optValue]} dense value={opt[optValue]}>
            {opt[optLabel]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
