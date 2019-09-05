import React from "react";
import TextField from "@material-ui/core/TextField";

const FormTextField = ({ label, value, handleChange }) => {
  return (
    <TextField
      label={label}
      defaultValue={value}
      onChange={handleChange}
      fullWidth
      margin="dense"
      variant="filled"
    />
  );
};

export default FormTextField;
