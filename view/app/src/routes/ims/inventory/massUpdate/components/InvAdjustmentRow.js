import React from "react";
import { TableRow, TableCell, Button } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

// form component
import { Input } from "reactstrap";

function InvAdjustmentRow(props) {
  const { item, remove, adjust, index } = props;

  return (
    <TableRow>
      <TableCell>
        <Clear
          fontSize="small"
          className="text-danger"
          onClick={() => remove(item.pid)}
        />
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.code}</TableCell>
      <TableCell>{item.cat_name}</TableCell>
      <TableCell>{item.unit_code}</TableCell>
      <TableCell>{item.rack}</TableCell>
      <TableCell>{item.wh_name}</TableCell>
      <TableCell align="center">
        <div className="d-flex justify-content-around">
          <Button
            variant="outlined"
            onClick={() => adjust("quantity", item.quantity + 10, index)}
          >
            +10
          </Button>
          <Button
            variant="outlined"
            onClick={() => adjust("quantity", item.quantity + 1, index)}
          >
            +
          </Button>
          <Input
            onChange={e => adjust("quantity", e.target.value, index)}
            value={item.quantity ? item.quantity : 0}
            className="w-20"
            type="number"
          />
          <Button
            variant="outlined"
            onClick={() => adjust("quantity", item.quantity - 1, index)}
          >
            -
          </Button>
          <Button
            variant="outlined"
            onClick={() => adjust("quantity", item.quantity - 10, index)}
          >
            -10
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default InvAdjustmentRow;
