import React from "react";
import InvAdjustmentRow from "./InvAdjustmentRow";

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
} from "@material-ui/core";

export default function AdjustmentTable({
  update,
  onAdjust,
  remove,
  tableData,
}) {
  return (
    <div className="row mb-30">
      <div className="col-md-12">
        <div className="d-flex justify-content-between">
          <h3>Adjustment List</h3>
          <Button
            onClick={update}
            variant="contained"
            className="btn-success text-white"
          >
            Update
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Unit Code</TableCell>
              <TableCell>Rack</TableCell>
              <TableCell>Warehouse</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData ? (
              tableData.map((item, key) => (
                <InvAdjustmentRow
                  key={item.pid}
                  index={key}
                  item={item}
                  adjust={onAdjust}
                  remove={remove}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Items in list
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
