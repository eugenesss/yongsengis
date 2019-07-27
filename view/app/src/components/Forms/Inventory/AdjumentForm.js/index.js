import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  Fab,
  TableRow,
  TableFooter
} from "@material-ui/core";

class AdjustmentForm extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%" }} />
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Stock Count</TableCell>
              <TableCell style={{ width: "15%" }} />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>img</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Stock Count</TableCell>
              <TableCell>
                <Fab
                  size="small"
                  variant="round"
                  className="text-white bg-success mr-15 mb-10"
                >
                  <i className="zmdi zmdi-plus" />
                </Fab>
                <Fab
                  size="small"
                  variant="round"
                  className="text-white bg-danger mr-15 mb-10"
                >
                  <i className="zmdi zmdi-minus" />
                </Fab>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Add New Item</TableCell>
              <TableCell colSpan={4}>Selection</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </React.Fragment>
    );
  }
}

export default AdjustmentForm;
