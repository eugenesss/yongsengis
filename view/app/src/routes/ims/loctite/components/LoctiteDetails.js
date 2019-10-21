import React from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    fontWeight: 600
  }
});

import { getTheDate } from "Helpers/helpers";

const LoctiteDetails = ({ item }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6 align-items-start">
          <div>
            <h3>Loctite Details</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.title}>Name</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Quantity</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="col-md-6 align-items-start">
          <div>
            <h3>Expiry Details</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.title}>Batch No.</TableCell>
                  <TableCell align="right">{item.batch}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Expiry Date</TableCell>
                  <TableCell align="right">
                    {getTheDate(item.expiry_date)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 align-items-start">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.title}>Description</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoctiteDetails;
