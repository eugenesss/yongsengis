import React from "react";
import { Select, MenuItem } from "@material-ui/core";

export default function RangeSelector(props) {
  const { onChange, fields, value } = props;
  return (
    <Select id="range-selector" value={value ? value : ""} onChange={onChange}>
      {fields &&
        fields.map((field, key) => (
          <MenuItem key={key} dense value={field}>
            {field}
          </MenuItem>
        ))}
    </Select>
  );
}
