import React, { Component } from "react";
import { connect } from "react-redux";
// Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// Sub Components
import RctSectionLoader from "Components/RctSectionLoader";
import InventoryFilter from "./components/InventoryFilter";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button
} from "@material-ui/core";
import InvAdjustmentRow from "./components/InvAdjustmentRow";
// Actions
import {
  getAllInventory,
  removeFromInvList,
  massUpdateInventory
} from "Ducks/ims/inventory";

class ims_inventory_massupdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.removeFromAdjustment = this.removeFromAdjustment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAdjust = this.onAdjust.bind(this);
  }
  componentDidMount() {
    this.props.getAllInventory();
  }
  handleSelect(val) {
    const newState = Object.assign([], this.state.selected);
    const inv = this.props.tableData.find(inv => inv.pid == val);
    newState.push(inv);
    this.setState({ selected: newState });
    this.props.removeFromInvList(val);
  }

  removeFromAdjustment(val) {
    const newState = Object.assign([], this.state.selected).filter(
      inv => inv.pid != val
    );
    this.setState({ selected: newState });
  }

  onAdjust(field, val, key) {
    const newState = Object.assign([], this.state.selected);
    const item = newState[key];
    item[field] = val;
    this.setState({ selected: newState });
  }

  handleSubmit() {
    this.props.massUpdateInventory(this.state.selected);
  }

  render() {
    const { loading } = this.props;
    const { selected } = this.state;
    return (
      <React.Fragment>
        <div className="mb-50">
          <Helmet>
            <title>YSIS | Mass Update Inventory</title>
          </Helmet>
          <PageTitleBar title="Mass Update Inventory" />
          {loading && <RctSectionLoader />}
          <InventoryFilter handleSelect={this.handleSelect} />
          <hr />
          <div className="row mb-30">
            <div className="col-md-12">
              <div className="d-flex justify-content-between">
                <h3>Adjustment List</h3>
                <Button
                  onClick={this.handleSubmit}
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
                  {selected.length > 0 ? (
                    selected.map((item, key) => (
                      <InvAdjustmentRow
                        key={key}
                        index={key}
                        item={item}
                        adjust={this.onAdjust}
                        remove={this.removeFromAdjustment}
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
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ imsState }) => {
  const { inventoryState } = imsState;
  const { inventoryList } = inventoryState;
  const { loading, tableData } = inventoryList;
  return { loading, tableData };
};

export default connect(mapStateToProps, {
  getAllInventory,
  removeFromInvList,
  massUpdateInventory
})(ims_inventory_massupdate);
