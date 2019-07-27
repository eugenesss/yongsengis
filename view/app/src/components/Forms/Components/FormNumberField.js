import React from "react";
import TextField from "@material-ui/core/TextField";

const FormNumberField = ({ label, value, handleChange, target }) => {
  return (
    <TextField
      label={label}
      defaultValue={value}
      onChange={handleChange}
      fullWidth
      margin="dense"
      type="number"
      step="1"
      variant="filled"
    />
  );
};

export default FormNumberField;
