import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import TextField from "@material-ui/core/TextField";

const DescriptionFormInput = ({ handleChange, description }) => {
  return (
    <TableRow>
      <TableCell
        style={{ borderBottom: "none", width: "15%" }}
        padding="dense"
        align="right"
      >
        Description
      </TableCell>
      <TableCell colSpan={3} style={{ borderBottom: "none" }} padding="dense">
        <TextField
          multiline
          fullWidth
          rows="6"
          defaultValue={description}
          onChange={handleChange}
          margin="dense"
          variant="outlined"
        />
      </TableCell>
    </TableRow>
  );
};

export default DescriptionFormInput;
