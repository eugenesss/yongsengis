import React from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    fontWeight: 600
  }
});

const InventoryDetails = ({ item }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6 align-items-start">
          <div>
            <h3>Inventory Details</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.title}>Name</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Category</TableCell>
                  <TableCell align="right">{item.cat_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Material</TableCell>
                  <TableCell align="right">{item.material}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Quantity</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Qty Per Box</TableCell>
                  <TableCell align="right">{item.perbox}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Unit Code</TableCell>
                  <TableCell align="right">{item.unit_code}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="col-md-6 align-items-start">
          <div>
            <h3>Inventory Details</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.title}>Code</TableCell>
                  <TableCell align="right">{item.code}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Location</TableCell>
                  <TableCell align="right">{item.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Warehouse</TableCell>
                  <TableCell align="right">{item.wh_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.title}>Rack</TableCell>
                  <TableCell align="right">{item.rack}</TableCell>
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

export default InventoryDetails;
